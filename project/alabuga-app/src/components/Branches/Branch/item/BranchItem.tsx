import st from '../branch.module.scss';
import Content, { ContentProps } from "../../Content/Content.tsx";
import NavigationButton from "../../../Button/Button.tsx";
import Block from '../../../Block/Block.tsx';

const BranchItem = ({ dataBranch }: { dataBranch: ContentProps }) => {
  const path = `/branch/${dataBranch.id}/missionList`;
  return (
    <div className={st.branchItem}>
      <Block
        classBox={st.branchItem__box}
        className={st.branchItem__block}
        child={
          <>
            <Content
              id={dataBranch.id}
              mana={dataBranch.mana}
              name={dataBranch.name}
              status={dataBranch.status}
              experience={dataBranch.experience}
              description={dataBranch.description}
              type={dataBranch.type}
            />
            <NavigationButton to={path} label="Перейти" />
          </>}
      />
    </div>
  )
}

export default BranchItem;