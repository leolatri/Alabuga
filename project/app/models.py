from sqlalchemy import Boolean, Column, Integer, Text, LargeBinary, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship
import datetime as dt

Base = declarative_base()

class Rank(Base):
    __tablename__ = "ranks"
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text)
    required_experience = Column(Integer, nullable=False, default=0)
    order = Column("order", Integer, nullable=False)

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True)
    first_name = Column(Text)
    second_name = Column(Text)
    middle_name = Column(Text)
    role_model_id = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), nullable=False, default=dt.datetime.utcnow)
    created_by = Column(UUID(as_uuid=True), nullable=False)
    updated_at = Column(DateTime(timezone=True), nullable=False, default=dt.datetime.utcnow)
    updated_by = Column(UUID(as_uuid=True), nullable=False)
    rank_id = Column(UUID(as_uuid=True), ForeignKey("ranks.id", ondelete="RESTRICT"), nullable=False)
    exp = Column(Integer, nullable=False, default=0)
    mana = Column(Integer, nullable=False, default=0)

    rank = relationship("Rank")

class Artifact(Base):
    __tablename__ = "artifacts"
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)
    image = Column(LargeBinary, nullable=False)
    description = Column(Text)
    rarity = Column(Text)

class UserArtifact(Base):
    __tablename__ = "user_artifacts"
    id = Column(UUID(as_uuid=True), primary_key=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    artifact_id = Column(UUID(as_uuid=True), ForeignKey("artifacts.id", ondelete="CASCADE"), nullable=False)

    artifact = relationship("Artifact")

class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)

class Mission(Base):
    __tablename__ = "missions"
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text, nullable=False)
    description = Column(Text)
    exp_gain = Column(Integer, nullable=False, default=0)
    mana_gain = Column(Integer, nullable=False, default=0)
    artifact_id = Column(UUID(as_uuid=True), ForeignKey("artifacts.id", ondelete="SET NULL"))
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id", ondelete="SET NULL"))
    required_rank_id = Column(UUID(as_uuid=True), ForeignKey("ranks.id", ondelete="SET NULL"))
    is_published = Column(Boolean, nullable=False, default=False)
    image = Column(LargeBinary)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="RESTRICT"), nullable=False)

    artifact = relationship("Artifact")
    category = relationship("Category")
    required_rank = relationship("Rank", foreign_keys=[required_rank_id])

class StoreItem(Base):
    __tablename__ = "store_items"
    id = Column(UUID(as_uuid=True), primary_key=True)
    image = Column(LargeBinary)
    name = Column(Text, nullable=False)
    description = Column(Text)
    price = Column(Integer, nullable=False)
    is_available = Column(Boolean, nullable=False, default=True)
    is_deleted = Column(Boolean, nullable=False, default=False)
    quantity = Column(Integer, nullable=False, default=0)
