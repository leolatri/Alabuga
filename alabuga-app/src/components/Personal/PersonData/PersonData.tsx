import React from "react";
import st from './person.module.scss';
import manaImg from '../../../imgs/mana.svg';
import pedestal from '../../../imgs/pedestal.svg';
import rank0 from '../../../imgs/rank-0.svg';
import rank1 from '../../../imgs/rank-1.svg';
import rank2 from '../../../imgs/rank-2.svg';
import rank3 from '../../../imgs/rank-3.svg';
import ProgressBar from "../../ProgressBar/ProgressBar.tsx";

interface DataProps {
  mana: number;
  place: number;
  fullName: string;
  experience: number;
}

const rankMap: { [key: number]: { img: any; text: string; maxXP: number } } = {
  0: { img: rank0, text: 'ИСКАТЕЛЬ', maxXP: 100 },
  1: { img: rank1, text: 'ПИЛОТ-КАНДИДАТ', maxXP: 300 },
  2: { img: rank2, text: 'ЧЛЕН КОМАНДЫ', maxXP: 500 },
  3: { img: rank3, text: 'ПИЛОТ-ИСПЫТАТЕЛЬ', maxXP: 1000 },
};

const Source = ({ num, img }: { num: number; img: string }) => (
  <div className={st.sourse}>
    <img src={img} alt="" />
    {num}
  </div>
);

const Rank = ({ rank }: { rank: number }) => {
  return (
    <div className={st.rank}>
      <img src={rankMap[rank].img} alt={rankMap[rank].text} />
      <p>{rankMap[rank].text}</p>
    </div>
  );
};

const PersonData = ({ mana, place, fullName, experience }: DataProps) => {
    const currentRank = Math.floor(experience / rankMap[0].maxXP) - 1;
    const maxRank = Math.min(currentRank, Object.keys(rankMap).length - 1);
    const maxXP = rankMap[maxRank].maxXP;

    const percent = Math.min(Math.floor((experience / maxXP) * 100), 100); 

    return (
        <div className={st.person}>
            <h1>{fullName}</h1>
            <Rank rank={maxRank} />
            <div className={st.person__progress}>
                <ProgressBar currentXP={experience} maxXP={maxXP} />
                <div className={st.person__progress__text}>
                    {`${percent}%`}
                    <p>{`${maxXP} XP`}</p>
                </div>
            </div>
            <div className={st.person__sourse}>
                <Source num={mana} img={manaImg} />
                <Source num={place} img={pedestal} />
            </div>
        </div>
    );
};

export default React.memo(PersonData);
