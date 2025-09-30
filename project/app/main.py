from fastapi import FastAPI, Depends, Header, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from uuid import UUID as UUID_t
import base64

from db import SessionLocal
from models import User, Rank, UserArtifact, Artifact, Mission, StoreItem
from schemas import ProfileOut, ArtifactOut, UserTopItem, StoreItemOut, MissionOut, MissionCreate, MissionUpdate

app = FastAPI(title="GameApp API")

# Если запускаешь фронт отдельно на 3000 — раскомментируй CORS:
# from fastapi.middleware.cors import CORSMiddleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
#     allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
# )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(db: Session, x_user_id: str | None) -> User:
    if not x_user_id:
        raise HTTPException(401, "X-User-Id header required")
    try:
        uid = UUID_t(x_user_id)
    except Exception:
        raise HTTPException(400, "Invalid X-User-Id")
    user = db.get(User, uid)
    if not user:
        raise HTTPException(401, "User not found")
    return user

def require_hr(user: User):
    if user.role_model_id != 1:
        raise HTTPException(403, "HR role required")

# ---------- 1) Профиль GET ----------
@app.get("/profile/{user_id}", response_model=ProfileOut)
def profile(user_id: UUID_t, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(404, "User not found")

    fio = " ".join(filter(None, [user.second_name, user.first_name, user.middle_name]))
    rank_order = user.rank.order if user.rank else 0

    ua = (
        db.query(UserArtifact)
        .filter(UserArtifact.user_id == user_id)
        .join(Artifact)
        .all()
    )
    artifacts = [
        ArtifactOut(
            name=u.artifact.name,
            img=base64.b64encode(u.artifact.image).decode() if u.artifact.image else None,
            description=u.artifact.description,
        )
        for u in ua
    ]

    top_rows = db.query(User).order_by(User.exp.desc()).limit(10).all()
    usersTop = [
        UserTopItem(
            name=" ".join(filter(None, [t.second_name, t.first_name, t.middle_name])),
            exp=t.exp
        )
        for t in top_rows
    ]

    return ProfileOut(
        name=fio or "",
        rank=rank_order,
        exp=user.exp,
        mana=user.mana,
        artifacts=artifacts,
        usersTop=usersTop
    )

# ---------- 2) Магазин GET ----------
@app.get("/store", response_model=list[StoreItemOut])
def store(db: Session = Depends(get_db)):
    items = (
        db.query(StoreItem)
        .filter(StoreItem.is_deleted == False, StoreItem.is_available == True)
        .order_by(StoreItem.name.asc())
        .all()
    )
    return [
        StoreItemOut(
            id=i.id,
            image=base64.b64encode(i.image).decode() if i.image else None,
            Name=i.name,
            description=i.description,
            price=i.price,
            quantity=i.quantity
        ) for i in items
    ]

# ---------- 3) Таски GET ----------
@app.get("/missions", response_model=list[MissionOut])
def missions(db: Session = Depends(get_db)):
    rows = db.query(Mission).filter(Mission.is_published == True).order_by(Mission.name.asc()).all()
    return [
        MissionOut(
            Id=m.id, Name=m.name, Description=m.description,
            ExpGain=m.exp_gain, ManaGain=m.mana_gain,
            ArtifactId=m.artifact_id, categoryid=m.category_id,
            RequiredRankId=m.required_rank_id, isPublished=m.is_published,
            image=base64.b64encode(m.image).decode() if m.image else None
        ) for m in rows
    ]

# ---------- 4) HR создаёт миссию POST ----------
@app.post("/missions", response_model=MissionOut)
def create_mission(
    body: MissionCreate,
    db: Session = Depends(get_db),
    x_user_id: str | None = Header(default=None)
):
    user = get_current_user(db, x_user_id); require_hr(user)
    m = Mission(
        name=body.Name,
        description=body.Description,
        exp_gain=body.ExpGain,
        mana_gain=body.ManaGain,
        artifact_id=body.ArtifactId,
        category_id=body.categoryid,
        required_rank_id=body.RequiredRankId,
        is_published=body.isPublished,
        image=base64.b64decode(body.image) if body.image else None,
        created_by=user.id
    )
    db.add(m); db.commit(); db.refresh(m)
    return MissionOut(
        Id=m.id, Name=m.name, Description=m.description,
        ExpGain=m.exp_gain, ManaGain=m.mana_gain,
        ArtifactId=m.artifact_id, categoryid=m.category_id,
        RequiredRankId=m.required_rank_id, isPublished=m.is_published,
        image=base64.b64encode(m.image).decode() if m.image else None
    )

# ---------- 5) HR редактирует миссию PUT ----------
@app.put("/missions", response_model=MissionOut)
def update_mission(
    body: MissionUpdate,
    db: Session = Depends(get_db),
    x_user_id: str | None = Header(default=None)
):
    user = get_current_user(db, x_user_id); require_hr(user)
    m = db.get(Mission, body.id)
    if not m:
        raise HTTPException(404, "Mission not found")

    m.name = body.Name
    m.description = body.Description
    m.exp_gain = body.ExpGain
    m.mana_gain = body.ManaGain
    m.artifact_id = body.ArtifactId
    m.category_id = body.categoryid
    m.required_rank_id = body.RequiredRankId
    m.is_published = body.isPublished
    m.image = base64.b64decode(body.image) if body.image else None

    db.commit(); db.refresh(m)
    return MissionOut(
        Id=m.id, Name=m.name, Description=m.description,
        ExpGain=m.exp_gain, ManaGain=m.mana_gain,
        ArtifactId=m.artifact_id, categoryid=m.category_id,
        RequiredRankId=m.required_rank_id, isPublished=m.is_published,
        image=base64.b64encode(m.image).decode() if m.image else None
    )

# ---------- 6) HR: товары магазина ----------
@app.post("/store", response_model=StoreItemOut)
def create_store_item(
    Name: str = Form(...),
    price: int = Form(...),
    description: str | None = Form(None),
    quantity: int = Form(0),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    x_user_id: str | None = Header(default=None)
):
    user = get_current_user(db, x_user_id); require_hr(user)
    data = image.file.read() if image else None
    item = StoreItem(name=Name, price=price, description=description, quantity=quantity, image=data)
    db.add(item); db.commit(); db.refresh(item)
    return StoreItemOut(
        id=item.id, image=base64.b64encode(item.image).decode() if item.image else None,
        Name=item.name, description=item.description, price=item.price, quantity=item.quantity
    )

@app.put("/store/{item_id}", response_model=StoreItemOut)
def update_store_item(
    item_id: UUID_t,
    Name: str = Form(...),
    price: int = Form(...),
    description: str | None = Form(None),
    quantity: int = Form(0),
    isAvailable: bool = Form(True),
    isDeleted: bool = Form(False),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    x_user_id: str | None = Header(default=None)
):
    user = get_current_user(db, x_user_id); require_hr(user)
    item = db.get(StoreItem, item_id)
    if not item:
        raise HTTPException(404, "Item not found")

    item.name = Name
    item.price = price
    item.description = description
    item.quantity = quantity
    item.is_available = isAvailable
    item.is_deleted = isDeleted
    if image:
        item.image = image.file.read()

    db.commit(); db.refresh(item)
    return StoreItemOut(
        id=item.id, image=base64.b64encode(item.image).decode() if item.image else None,
        Name=item.name, description=item.description, price=item.price, quantity=item.quantity
    )

# ---------- Подключаем EDU-модуль ----------
from edu_routes import router as edu_router
app.include_router(edu_router)
