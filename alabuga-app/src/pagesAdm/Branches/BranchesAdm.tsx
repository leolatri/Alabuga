import React, { useState } from "react";
import st from './branches.module.scss';
import Title from "../../components/Title/Title.tsx";
import useBranchData from "../../hooks/useBranchData.tsx";
import NavigationButton from "../../components/Button/Button.tsx";
import BranchList from "../../components/Branches/Branch/list/BranchList.tsx";
import { pathes } from "../../pathes.tsx";

const BranchesAdm = () => {
    const data = useBranchData();
    return (
        <div className={st.branches}>
            <div className={st.branches__header}>
                <Title text={'ВЕТКИ'} className={st.branches__title} />
                <NavigationButton to={pathes.admin.createBranch} label='Создать' />
            </div>
            <div className={st.branches__container}>
                <BranchList branches={data} />
            </div>
        </div>
    )
}

export default React.memo(BranchesAdm);