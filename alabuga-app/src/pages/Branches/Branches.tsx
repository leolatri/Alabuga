import React, { useState } from "react";
import st from './branches.module.scss';
import Title from "../../components/Title/Title.tsx";
import rocket from '../../imgs/rocket.svg';
import Options from "../../components/Options/Options.tsx";
import BranchList from "../../components/Branches/Branch/list/BranchList.tsx";
import { ContentProps } from "../../components/Branches/Content/Content.tsx";
import { BranchModel } from "../../models/branches/types.tsx";

const Branches = ({branches}: {branches: BranchModel[]}) => {
    const [activeOption, setActiveOption] = useState(0);
    return (
        <div className={st.branches}>
            <Title text={'ВЕТКИ'} className={st.branches__title}/>
            <img src={rocket} alt=''/>
            <div className={st.branches__container}>
                <Options activeOption={activeOption} setActive={setActiveOption}/>
                <BranchList activeOption={activeOption} branches={branches}/>
            </div>
        </div>
    )
}

export default React.memo(Branches);