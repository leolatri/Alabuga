import React from "react";
import st from '../branch.module.scss';
import BranchItem from "../item/BranchItem.tsx";
import { BranchModel } from "../../../../models/branches/types.tsx";
import EmptyPage from "../../../EmptyPage/EmpytyPage.tsx";

export interface BranchListProps {
  branches?: BranchModel[]; 
  activeOption?: number;
}

const BranchList = ({ branches, activeOption }: BranchListProps) => {
  if (!branches || !Array.isArray(branches)) {
    return <>Ничего нет</>;
  }

  const validBranches = branches.filter(branch => branch?.branch);
  
  const items = activeOption === undefined 
    ? validBranches 
    : activeOption 
      ? validBranches.filter((el) => el.branch?.status === 1) 
      : validBranches.filter((el) => el.branch?.status === 0);


  return (
    <div className={st.branchList}>
      {items.length < 1 && <EmptyPage />}
      {items.map((el: BranchModel) => (
        <BranchItem
          key={el.branch.id} 
          dataBranch={el.branch}
        />
      ))}
    </div>
  )
}

export default React.memo(BranchList);