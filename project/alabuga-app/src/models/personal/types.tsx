export interface PersonProps {
    id: number;
    mana: number;
    place: number;
    fullName: string;
    experience: number;
}

export interface ArtifactProps {
    id: number,
    name: string,
    img: string,
    description: string,
    rarity: number,
}

export interface LiderProps {
    id: number;
    index?: number;
    name: string;
    counts: number;
}


export interface ProfileModel {
    personData: PersonProps;
    artifacts: ArtifactProps[];
    liderBord: LiderProps[];
}