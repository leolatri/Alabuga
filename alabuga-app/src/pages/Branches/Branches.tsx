import React from "react";
import st from './branches.module.scss';
import Title from "../../components/Title/Title.tsx";
import rocket from '../../imgs/rocket.svg';

const Branches = () => {
    return (
        <div className={st.branches}>
            <Title text={'ВЕТКИ'} className={st.branches__title}/>
            <img src={rocket} alt=''/>
        </div>
    )
}

export default React.memo(Branches);