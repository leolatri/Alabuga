import React from "react";
import st from './leaderBord.module.scss';
import cx from 'classnames';
import { LeaderProps } from "../../../models/personal/types";

const LeaderItem = ({ leader, idPerson }: {leader: LeaderProps; idPerson: number }) => {
    const isUserName = leader.isCurrentUser ;
    return (
        <div className={cx(st.leaderItem, isUserName ? st[`leaderItem-name`]: '')}>
            <h1 className={leader.index && leader.index < 4 ? st[`leaderItem-top`] : ''}>{leader.index}</h1>
            <div className={st.leaderItem__text}>
                {leader.name.toUpperCase()}
                <p>{leader.experience}</p>
            </div>
        </div>
    )
}

const LeaderBord = ({ leaders, userId }: { leaders: LeaderProps[]; userId: number }) => {
    const leadersList = leaders
        .sort((a, b) => b.experience - a.experience)
        .slice(0, 10)
        .map((el, index) => ({
            ...el,
            index: index + 1
        }));

    return (
        <div className={st.leaderList}>
            {leadersList.map((el: LeaderProps) => (
                <LeaderItem
                    key={el.id}
                    leader={el}
                    idPerson={userId}
                />
            ))}
        </div>
    )
}

    export default React.memo(LeaderBord);