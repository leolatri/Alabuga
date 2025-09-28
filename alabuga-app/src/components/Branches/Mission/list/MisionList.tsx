// MissionList.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { BranchModel } from '../../../../models/branches/types';

interface MissionListProps {
  branches?: BranchModel[];
}

const MissionList = ({ branches = [] }: MissionListProps) => {
  const { branchId } = useParams<{ branchId: string }>();

  const currentBranch = branches.find(branch => 
    branch.branch.id.toString() === branchId
  );
  
  const missions = currentBranch?.missions || [];

  if (!branchId) {
    return <div>ID ветки не указан</div>;
  }

  if (!currentBranch) {
    return <div>Ветка не найдена</div>;
  }

  return (
    <div>
      <h2>Миссии ветки: {currentBranch.branch.name}</h2>
      <p>{currentBranch.branch.description}</p>
      
      <div className={''}>
        {missions.map(mission => (
          <div key={mission.id} className={''}>
            <h3>{mission.name}</h3>
            <p>{mission.description}</p>
            <p>Опыт: {mission.experience}</p>
            <p>Мана: {mission.mana}</p>
            <span>Статус: {mission.status === 1 ? 'Активна' : 'Неактивна'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionList;