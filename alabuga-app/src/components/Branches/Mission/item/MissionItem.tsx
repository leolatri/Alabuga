import st from '../missions.module.scss';
import Content, { ContentProps } from "../../Content/Content.tsx";
import NavigationButton from "../../../Button/Button.tsx";
import Block from '../../../Block/Block.tsx';

const MissionItem = ({ dataMission }: { dataMission: ContentProps }) => {
  const path = `/mission/${dataMission.id}`;
  return (
    <div className={st.missionItem}>
      <Block
        classBox={st.missionItem__box}
        className={st.missionItem__block}
        child={
          <>
            <Content
              id={dataMission.id}
              mana={dataMission.mana}
              name={dataMission.name}
              status={dataMission.status}
              experience={dataMission.experience}
              description={dataMission.description}
              type={dataMission.type}
            />
            <NavigationButton to={path} label="Выполнить" />
          </>}
      />
    </div>
  )
}

export default MissionItem;