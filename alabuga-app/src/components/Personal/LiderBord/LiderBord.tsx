import React from "react";
import st from './liderBord.module.scss';
import cx from 'classnames';


export interface LiderProps {
    id: number;
    index?: number;
    name: string;
    counts: number;
}

const LiderItem = ({ id, index, name, counts, idPerson }: LiderProps &  { idPerson: number }) => {
    const isUserName= id === idPerson;
    return (
        <div className={cx(st.liderItem, isUserName && st[`liderItem-name`])}>
            <h1 className={index && index < 4 && st[`liderItem-top`]}>{index}</h1>
            <div className={st.liderItem__text}>
                {name.toUpperCase()}
                <p>{counts}</p>
            </div>
        </div>
    )
}

const LiderBord = ({ liders, userId }: { liders: LiderProps[]; userId: number }) => {
    const lidersList = liders.sort((a, b) => b.counts - a.counts).slice(0, 10);
    return (
        <div className={st.liderList}>
            {lidersList.map((el: LiderProps, index: number) => (
                <LiderItem
                    id={el.id}
                    key={el.id}
                    index={index + 1}
                    name={el.name}
                    counts={el.counts}
                    idPerson={userId}
                />
            ))}
        </div>
    )
}

    export default React.memo(LiderBord);