// BranchList.tsx
import React from "react";
import st from '../branch.module.scss';
import BranchItem from "../item/BranchItem.tsx";
import { BranchModel } from "../../../../models/branches/types.tsx";

export interface BranchListProps {
  branches?: BranchModel[]; 
  activeOption?: number;
}

const BranchList = ({ branches, activeOption }: BranchListProps) => {
  if (!branches || !Array.isArray(branches)) {
    return <div>Нет данных о ветках</div>;
  }

  const validBranches = branches.filter(branch => branch?.branch);
  
  const items = activeOption === undefined 
    ? validBranches 
    : activeOption 
      ? validBranches.filter((el) => el.branch?.status === 1) 
      : validBranches.filter((el) => el.branch?.status === 0);

  if (items.length === 0) {
    return <div className={st.branchList}>Нет доступных веток</div>;
  }

  return (
    <div className={st.branchList}>
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