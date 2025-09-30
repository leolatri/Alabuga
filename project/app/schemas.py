from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
import base64

def to_b64(b: Optional[bytes]) -> Optional[str]:
    return base64.b64encode(b).decode() if b else None

class ArtifactOut(BaseModel):
    name: str
    img: Optional[str] = None
    description: Optional[str] = None

class UserTopItem(BaseModel):
    name: str
    exp: int

class ProfileOut(BaseModel):
    name: str
    rank: int
    exp: int
    mana: int
    artifacts: List[ArtifactOut]
    usersTop: List[UserTopItem]

class StoreItemOut(BaseModel):
    id: UUID
    image: Optional[str]
    Name: str
    description: Optional[str]
    price: int
    quantity: int

class MissionOut(BaseModel):
    Id: UUID
    Name: str
    Description: Optional[str]
    ExpGain: int
    ManaGain: int
    ArtifactId: Optional[UUID]
    categoryid: Optional[UUID]
    RequiredRankId: Optional[UUID]
    isPublished: bool
    image: Optional[str]

class MissionCreate(BaseModel):
    Name: str
    Description: Optional[str] = None
    ExpGain: int = 0
    ManaGain: int = 0
    ArtifactId: Optional[UUID] = None
    categoryid: Optional[UUID] = None
    RequiredRankId: Optional[UUID] = None
    isPublished: bool = False
    image: Optional[str] = None

class MissionUpdate(MissionCreate):
    id: UUID
