from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

BaseEdu = declarative_base()

class EduUser(BaseEdu):
    __tablename__ = "users"
    __table_args__ = {"schema": "edu"}
    id = Column(Integer, primary_key=True)
    full_name = Column(String(255), nullable=False)
    mana = Column(Integer, nullable=False, default=0)
    experience = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

class EduArtifact(BaseEdu):
    __tablename__ = "artifacts"
    __table_args__ = {"schema": "edu"}
    id = Column(Integer, primary_key=True)
    img = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    rarity = Column(Integer, nullable=False)  # 0=COMMON, 1=RARE

class EduUserArtifact(BaseEdu):
    __tablename__ = "user_artifacts"
    __table_args__ = {"schema": "edu"}
    user_id = Column(Integer, ForeignKey("edu.users.id", ondelete="CASCADE"), primary_key=True)
    artifact_id = Column(Integer, ForeignKey("edu.artifacts.id", ondelete="CASCADE"), primary_key=True)

class EduContent(BaseEdu):
    __tablename__ = "content"
    __table_args__ = {"schema": "edu"}
    id = Column(Integer, primary_key=True)
    type = Column(String(50), nullable=False)
    name = Column(String(255), nullable=False)
    status = Column(Integer, nullable=False, default=0)
    experience = Column(Integer, nullable=False, default=0)
    description = Column(Text)
    duration = Column(Integer)
    progress = Column(Integer)
    order = Column("order", Integer, nullable=False)
    mana = Column(Integer, nullable=False, default=0)
    parent_id = Column(Integer, ForeignKey("edu.content.id", ondelete="CASCADE"))

class EduContentReq(BaseEdu):
    __tablename__ = "content_requirements"
    __table_args__ = {"schema": "edu"}
    content_id = Column(Integer, ForeignKey("edu.content.id", ondelete="CASCADE"), primary_key=True)
    required_content_id = Column(Integer, ForeignKey("edu.content.id", ondelete="CASCADE"), primary_key=True)

class EduContentRewards(BaseEdu):
    __tablename__ = "content_rewards"
    __table_args__ = {"schema": "edu"}
    content_id = Column(Integer, ForeignKey("edu.content.id", ondelete="CASCADE"), primary_key=True)
    mana = Column(Integer, nullable=False, default=0)
    experience = Column(Integer, nullable=False, default=0)

class EduContentRewardArtifact(BaseEdu):
    __tablename__ = "content_reward_artifacts"
    __table_args__ = {"schema": "edu"}
    content_id = Column(Integer, ForeignKey("edu.content.id", ondelete="CASCADE"), primary_key=True)
    artifact_id = Column(Integer, ForeignKey("edu.artifacts.id", ondelete="CASCADE"), primary_key=True)

class EduUserProgress(BaseEdu):
    __tablename__ = "user_progress"
    __table_args__ = {"schema": "edu"}
    user_id = Column(Integer, ForeignKey("edu.users.id", ondelete="CASCADE"), primary_key=True)
    content_id = Column(Integer, ForeignKey("edu.content.id", ondelete="CASCADE"), primary_key=True)
    status = Column(Integer, nullable=False, default=0)
    progress = Column(Integer, nullable=False, default=0)
