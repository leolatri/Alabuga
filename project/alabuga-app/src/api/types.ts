export enum Rarity {
  COMMON = 0,
  RARE = 1,
}

export enum Status {
  IN_PROGRESS = 0,
  COMPLETED = 1,
}

export enum PermissionEnum {
    USER = 0,
    ADMIN = 1
}
// export enum ContentType {
//   LESSON = "lesson",
//   PRACTICE = "practice",
//   QUIZ = "quiz",
//   PROJECT = "project"
// }

export interface PersonDTO {
    id: number;
    mana: number;
    place: number;
    fullName: string;
    experience: number;
    permissions: PermissionEnum;
}

export interface ArtifactDTO {
    id: number;
    img: string;
    name: string;
    rarity: Rarity;
}

export interface LeaderDTO {
    id: number;
    name: string;
    index: number | 0;
    experience: number;
    isCurrentUser: boolean;
}

export interface ProfileDTO {
    leaderBord: LeaderDTO[];
    personData: PersonDTO;
    artifacts: ArtifactDTO[];
}

export interface ContentDTO {
    id: number;
    mana: number | 0;
    type: string;
    name: string;
    status: Status;
    experience: number;
    description: string;
    duration: number | null;
    progress: number | null;
    order: number;
    requirements: number[] | null;
    rewards: {
        artifact: number[] | null;
        mana: number;
        experience: number;
    };
}

export interface BranchDTO {
    branch: ContentDTO;
    missions: ContentDTO[];
    stats: {
        totalMissions: number;
        completedMissions: number;
        totalExperience: number;
        totalMana: number;
    };
}

export interface DataDTO {
    profile: ProfileDTO;
    branches: BranchDTO[];
}