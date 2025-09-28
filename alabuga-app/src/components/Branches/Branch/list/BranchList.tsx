import React from "react";
import st from '../branch.module.scss';
import { ContentProps } from "../../Content/Content.tsx";
import BranchItem from "../item/BranchItem.tsx";


export interface BranchListProps {
  branches: ContentProps[]; 
  activeOption: number;
}

const BranchList = ({ branches, activeOption }: BranchListProps) => {
  const items = activeOption ? branches.filter((el) => el.status === 1) : branches.filter((el) => el.status === 0);
  return (
    <div className={st.branchList}>
      {items.map((el: ContentProps) => (
        <BranchItem
          key={el.id}
          dataBranch={el}
        />
      ))}
    </div>
  )
}

export default React.memo(BranchList);  