import { BranchModel } from "../models/branches/types";
import { ProfileModel } from "../models/personal/types";

export enum Permissios {
    USER,
    ADMIN,
}

export interface DataProps {
    userPermissions: Permissios;
    profileData?: ProfileModel;
    branchData?: BranchModel[];
    loading: boolean;
}