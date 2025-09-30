export interface ContentProps {
    id: number;
    mana?: number;
    type: string;
    name: string;
    status: number;
    experience?: number;
    description: string;
    // buttonToRoute?: string; 
}

export interface BranchModel {
    branch: ContentProps;
    missions: ContentProps[];
}
