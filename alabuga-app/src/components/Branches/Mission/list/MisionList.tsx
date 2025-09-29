import { useParams } from 'react-router-dom';
import useBranchData from '../../../../hooks/useBranchData.tsx';
import Title from '../../../Title/Title.tsx';
import st from '../missions.module.scss';
import MissionItem from '../item/MissionItem.tsx';


const MissionList = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const data = useBranchData();

  const currentBranch = data?.find(branch => 
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
    <div className={st.missionList}>
      <Title text={`${currentBranch.branch.name.toUpperCase()} • МИССИИ`} className={st.missionList__text}/>
        {missions.map(mission => (
          <MissionItem
            dataMission={mission}
          />
        ))}
    </div>
  );
};

export default MissionList;