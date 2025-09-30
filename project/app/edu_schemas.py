from pydantic import BaseModel
from typing import Optional, List

class PersonDTO(BaseModel):
    id: int
    mana: int
    place: int
    fullName: str
    experience: int

class ArtifactDTO(BaseModel):
    id: int
    img: str
    name: str
    rarity: int  # 0/1

class LeaderDTO(BaseModel):
    id: int
    name: str
    index: int
    experience: int
    isCurrentUser: bool

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
