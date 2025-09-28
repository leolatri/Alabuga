import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import st from './mission.module.scss';
import { MissionProps } from '../item/Mission.tsx';

interface MissionListProps {
  missions: MissionProps[];
}

const MissionList = ({ missions }: MissionListProps) => {
  const navigate = useNavigate();
  const { branchName } = useParams();

  const handleMissionClick = (missionId: number) => {
    navigate(`/mission-${missionId}`);
  };

  return (
    <div className={st.missionList}>
      <h1>Список миссий - {branchName}</h1>
      
      <div className={st.missionList__grid}>
        {missions.map(mission => (
          <div key={mission.content.id} className={st.missionCard}>
            <h3>{mission.content.name}</h3>
            <p>{mission.content.description}</p>
            <div className={st.missionCard__status}>
              Статус: {mission.content.status === 1 ? 'Активна' : 'Завершена'}
            </div>
            <button 
              className={st.missionCard__button}
              onClick={() => handleMissionClick(mission.content.id)}
            >
              Перейти к миссии
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionList;