# app/edu_schemas.py
from pydantic import BaseModel
from typing import Optional, List
from enum import IntEnum

class PermissionEnum(IntEnum):
    USER = 0
    ADMIN = 1

class PersonDTO(BaseModel):
    id: int
    mana: int
    place: int
    fullName: str
    experience: int
    permissions: PermissionEnum

class ArtifactDTO(BaseModel):
    id: int
    img: str
    name: str
    rarity: int  # 0/1

# Каноничное имя DTO лидерборда
class LeaderDTO(BaseModel):
    id: int
    name: str
    index: int
    expirience: int
    isCurrentUser: bool

# Совместимость со старым именем
LiderDTO = LeaderDTO

class ContentRewardsDTO(BaseModel):
    artifact: Optional[List[int]] = None
    mana: int
    experience: int

class ContentDTO(BaseModel):
    id: int
    mana: int
    type: str
    name: str
    status: int
    experience: int
    description: Optional[str] = None
    duration: Optional[int] = None
    progress: Optional[int] = None
    order: int
    requirements: Optional[List[int]] = None
    rewards: ContentRewardsDTO

class BranchStatsDTO(BaseModel):
    totalMissions: int
    completedMissions: int
    totalExperience: int
    totalMana: int

class BranchDTO(BaseModel):
    branch: ContentDTO
    missions: List[ContentDTO]
    stats: BranchStatsDTO
