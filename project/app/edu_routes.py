from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from db import SessionLocal
from edu_models import (
    EduUser, EduArtifact, EduUserArtifact, EduContent, EduContentReq,
    EduContentRewards, EduContentRewardArtifact, EduUserProgress
)
from edu_schemas import (
    PersonDTO, ArtifactDTO, LeaderDTO, ContentDTO, ContentRewardsDTO,
    BranchDTO, BranchStatsDTO, PermissionEnum
)

router = APIRouter(prefix="/edu", tags=["edu"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_id(x_user_id: str | None) -> int | None:
    return int(x_user_id) if x_user_id else None

# GET /edu/profile -> PersonDTO
@router.get("/profile", response_model=PersonDTO)
def profile(x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(401, "X-User-Id required (int)")
    uid = get_user_id(x_user_id)

    rows = db.execute(
        select(
            EduUser.id, EduUser.full_name, EduUser.mana, EduUser.experience, EduUser.permission,
            func.rank().over(order_by=[EduUser.experience.desc(), EduUser.id.asc()]).label("place")
        ).order_by(EduUser.experience.desc(), EduUser.id.asc())
    ).all()

    row = next((r for r in rows if r.id == uid), None)
    if not row:
        raise HTTPException(404, "User not found")

    return PersonDTO(
        id=row.id,
        mana=row.mana,
        place=row.place,
        fullName=row.full_name,
        experience=row.experience,
        permissions=PermissionEnum(row.permission)
    )

# GET /edu/leaderboard -> LeaderDTO[]
@router.get("/leaderboard", response_model=list[LeaderDTO])
def leaderboard(x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    cid = get_user_id(x_user_id) if x_user_id else None
    rows = db.execute(
        select(
            EduUser.id,
            EduUser.full_name.label("name"),
            func.rank().over(order_by=[EduUser.experience.desc(), EduUser.id.asc()]).label("index"),
            EduUser.experience.label("experience")
        ).order_by(EduUser.experience.desc(), EduUser.id.asc())
    ).all()
    return [
        LeaderDTO(id=r.id, name=r.name, index=r.index, experience=r.experience, isCurrentUser=(cid == r.id))
        for r in rows
    ]

# PUT /edu/profile -> PersonDTO
@router.put("/profile", response_model=PersonDTO)
def update_profile(body: PersonDTO, db: Session = Depends(get_db)):
    u = db.get(EduUser, body.id)
    if not u:
        raise HTTPException(404, "User not found")

    u.full_name = body.fullName
    u.mana = body.mana
    u.experience = body.experience
    # Обновляем permissions — при необходимости тут можно ввести проверку прав
    u.permission = int(body.permissions)

    db.commit()
    db.refresh(u)

    # вычислить место заново
    rows = db.execute(
        select(
            EduUser.id,
            func.rank().over(order_by=[EduUser.experience.desc(), EduUser.id.asc()]).label("place")
        ).order_by(EduUser.experience.desc(), EduUser.id.asc())
    ).all()
    place = next((r.place for r in rows if r.id == u.id), 0)

    return PersonDTO(
        id=u.id,
        mana=u.mana,
        place=place,
        fullName=u.full_name,
        experience=u.experience,
        permissions=PermissionEnum(u.permission)
    )

# GET /edu/artifacts -> ArtifactDTO[]
@router.get("/artifacts", response_model=list[ArtifactDTO])
def my_artifacts(x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(401, "X-User-Id required")
    uid = get_user_id(x_user_id)

    rows = db.execute(
        select(EduArtifact.id, EduArtifact.img, EduArtifact.name, EduArtifact.rarity)
        .join(EduUserArtifact, EduUserArtifact.artifact_id == EduArtifact.id)
        .where(EduUserArtifact.user_id == uid)
        .order_by(EduArtifact.id.asc())
    ).all()
    return [ArtifactDTO(id=r.id, img=r.img, name=r.name, rarity=r.rarity) for r in rows]

# --- Helpers ---
def build_content_dto(db: Session, c: EduContent, uid: int | None) -> ContentDTO:
    # требования
    req_ids = [r.required_content_id for r in db.execute(
        select(EduContentReq.required_content_id).where(EduContentReq.content_id == c.id)
    ).all()]

    # награды
    rw = db.execute(
        select(EduContentRewards.mana, EduContentRewards.experience).where(EduContentRewards.content_id == c.id)
    ).first()
    mana_r = rw.mana if rw else 0
    exp_r = rw.experience if rw else 0

    art_ids = [a.artifact_id for a in db.execute(
        select(EduContentRewardArtifact.artifact_id).where(EduContentRewardArtifact.content_id == c.id)
    ).all()]

    # пользовательский прогресс (если передан user)
    status = c.status
    progress = c.progress
    if uid is not None:
        up = db.get(EduUserProgress, (uid, c.id))  # composite PK
        if up:
            status = up.status
            progress = up.progress

    return ContentDTO(
        id=c.id, mana=c.mana, type=c.type, name=c.name, status=status,
        experience=c.experience, description=c.description, duration=c.duration,
        progress=progress, order=c.order, requirements=(req_ids or None),
        rewards=ContentRewardsDTO(artifact=(art_ids or None), mana=mana_r, experience=exp_r)
    )

# GET /edu/branches -> BranchDTO[]
@router.get("/branches", response_model=list[BranchDTO])
def branches(x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    uid = get_user_id(x_user_id) if x_user_id else None

    branches = db.execute(
        select(EduContent).where(EduContent.type == 'branch').order_by(EduContent.order.asc())
    ).scalars().all()

    out: list[BranchDTO] = []
    for b in branches:
        missions = db.execute(
            select(EduContent).where(EduContent.parent_id == b.id).order_by(EduContent.order.asc())
        ).scalars().all()

        missions_dto = [build_content_dto(db, m, uid) for m in missions]

        total = len(missions)
        totalExp = sum(m.experience for m in missions)
        totalMana = sum(m.mana for m in missions)
        if uid is not None:
            completed = db.execute(
                select(func.count()).select_from(EduUserProgress)
                .where(EduUserProgress.user_id == uid,
                       EduUserProgress.content_id.in_([m.id for m in missions]),
                       EduUserProgress.status == 1)
            ).scalar_one()
        else:
            completed = sum(1 for m in missions if m.status == 1)

        out.append(BranchDTO(
            branch=build_content_dto(db, b, uid),
            missions=missions_dto,
            stats=BranchStatsDTO(totalMissions=total, completedMissions=completed,
                                 totalExperience=totalExp, totalMana=totalMana)
        ))
    return out

# GET /edu/branches/{id}
@router.get("/branches/{branch_id}", response_model=BranchDTO)
def branch(branch_id: int, x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    uid = get_user_id(x_user_id) if x_user_id else None
    b = db.get(EduContent, branch_id)
    if not b or b.type != 'branch':
        raise HTTPException(404, "Branch not found")

    missions = db.execute(
        select(EduContent).where(EduContent.parent_id == b.id).order_by(EduContent.order.asc())
    ).scalars().all()

    missions_dto = [build_content_dto(db, m, uid) for m in missions]
    total = len(missions)
    totalExp = sum(m.experience for m in missions)
    totalMana = sum(m.mana for m in missions)

    if uid is not None:
        completed = db.execute(
            select(func.count()).select_from(EduUserProgress)
            .where(EduUserProgress.user_id == uid,
                   EduUserProgress.content_id.in_([m.id for m in missions]),
                   EduUserProgress.status == 1)
        ).scalar_one()
    else:
        completed = sum(1 for m in missions if m.status == 1)

    return BranchDTO(
        branch=build_content_dto(db, b, uid),
        missions=missions_dto,
        stats=BranchStatsDTO(totalMissions=total, completedMissions=completed,
                             totalExperience=totalExp, totalMana=totalMana)
    )

# GET /edu/branches/{id}/missionsList
@router.get("/branches/{branch_id}/missionsList", response_model=list[ContentDTO])
def branch_missions(branch_id: int, x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    uid = get_user_id(x_user_id) if x_user_id else None
    missions = db.execute(
        select(EduContent).where(EduContent.parent_id == branch_id).order_by(EduContent.order.asc())
    ).scalars().all()
    return [build_content_dto(db, m, uid) for m in missions]

# GET /edu/mission/{id}
@router.get("/mission/{content_id}", response_model=ContentDTO)
def mission(content_id: int, x_user_id: str | None = Header(default=None), db: Session = Depends(get_db)):
    uid = get_user_id(x_user_id) if x_user_id else None
    c = db.get(EduContent, content_id)
    if not c:
        raise HTTPException(404, "Content not found")
    return build_content_dto(db, c, uid)
