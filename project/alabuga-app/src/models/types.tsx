import { BranchModel } from "./branches/types";
import { ProfileModel } from "./personal/types";

export interface DataModel {
    personData: ProfileModel;
    branchData: BranchModel[];
}