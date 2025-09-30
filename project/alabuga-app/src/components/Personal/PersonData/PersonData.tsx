import React from "react";
import st from './person.module.scss';
import manaImg from '../../../imgs/mana.svg';
import pedestal from '../../../imgs/pedestal.svg';
import rank0 from '../../../imgs/rank-0.svg';
import rank1 from '../../../imgs/rank-1.svg';
import rank2 from '../../../imgs/rank-2.svg';
import rank3 from '../../../imgs/rank-3.svg';
import ProgressBar from "../../ProgressBar/ProgressBar.tsx";
import Source from "../../Source/Source.tsx";
import { PersonProps } from "../../../models/personal/types.tsx";

const rankMap: { [key: number]: { img: any; text: string; maxXP: number } } = {
  0: { img: rank0, text: 'ИСКАТЕЛЬ', maxXP: 100 },
  1: { img: rank1, text: 'ПИЛОТ-КАНДИДАТ', maxXP: 300 },
  2: { img: rank2, text: 'ЧЛЕН КОМАНДЫ', maxXP: 500 },
  3: { img: rank3, text: 'ПИЛОТ-ИСПЫТАТЕЛЬ', maxXP: 1000 },
};

const getCurrentRank = (experience: number): number => {
  if (experience < 100) return 0;
  if (experience < 300) return 1;
  if (experience < 500) return 2;
  return 3;
};

const getRankProgress = (experience: number, rank: number) => {
  const currentRankXP = rankMap[rank].maxXP;
  const previousRankXP = rank > 0 ? rankMap[rank - 1].maxXP : 0;
  
  const xpInCurrentRank = experience - previousRankXP;
  const xpNeededForRank = currentRankXP - previousRankXP;
  
  const percent = Math.min(Math.floor((xpInCurrentRank / xpNeededForRank) * 100), 100);
  
  return {
    currentXP: xpInCurrentRank,
    maxXP: xpNeededForRank,
    percent
  };
};

const Rank = ({ rank }: { rank: number }) => {
  return (
    <div className={st.rank}>
      <img src={rankMap[rank].img} alt={rankMap[rank].text} />
      <p>{rankMap[rank].text}</p>
    </div>
  );
};

const PersonData = ({ personData }: {personData: PersonProps}) => {
    const currentRank = getCurrentRank(personData.experience);
    const progress = getRankProgress(personData.experience, currentRank);

    return (
        <div className={st.person}>
            <h1>{personData.fullName}</h1>
            <Rank rank={currentRank} />
            <div className={st.person__progress}>
                <ProgressBar currentXP={progress.currentXP} maxXP={progress.maxXP} />
                <div className={st.person__progress__text}>
                    {`${progress.percent}%`}
                    <p>{`${personData.experience}/${progress.maxXP} XP`}</p>
                </div>
            </div>
            <div className={st.person__sourse}>
                <Source num={personData.mana} img={manaImg} />
                <Source num={personData.place} img={pedestal} />
            </div>
        </div>
    );
};

export default React.memo(PersonData);