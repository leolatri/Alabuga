import React from "react";
import st from './liderBord.module.scss';
import cx from 'classnames';
import { LiderProps } from "../../../models/personal/types";

const LiderItem = ({ lider, idPerson }: {lider: LiderProps; idPerson: number }) => {
    const isUserName = lider.id === idPerson;
    return (
        <div className={cx(st.liderItem, isUserName ? st[`liderItem-name`]: '')}>
            <h1 className={lider.index && lider.index < 4 ? st[`liderItem-top`] : ''}>{lider.index}</h1>
            <div className={st.liderItem__text}>
                {lider.name.toUpperCase()}
                <p>{lider.counts}</p>
            </div>
        </div>
    )
}

const LiderBord = ({ liders, userId }: { liders: LiderProps[]; userId: number }) => {
    const lidersList = liders
        .sort((a, b) => b.counts - a.counts)
        .slice(0, 10)
        .map((el, index) => ({
            ...el,
            index: index + 1
        }));

    return (
        <div className={st.liderList}>
            {lidersList.map((el: LiderProps) => (
                <LiderItem
                    key={el.id}
                    lider={el}
                    idPerson={userId}
                />
            ))}
        </div>
    )
}

    export default React.memo(LiderBord);