import { PermissionEnum } from "../../api/types";

export interface PersonProps {
    id: number;
    mana: number;
    place: number;
    fullName: string;
    experience: number;
    permissions: PermissionEnum;
}

export interface ArtifactProps {
    id: number,
    name: string,
    img: string,
    description: string,
    rarity: number,
}

export interface LeaderProps {
    id: number;
    index?: number;
    name: string;
    experience: number;
    isCurrentUser?: boolean;
}


export interface ProfileModel {
    personData: PersonProps;
    artifacts: ArtifactProps[];
    leaderBord: LeaderProps[];
}