import React from "react";
import st from "./profile.module.scss";
import astronaut from '../../imgs/astronaut.svg';
import Block from "../../components/Block/Block.tsx";
import Title from "../../components/Title/Title.tsx";
import ArtifactList from "../../components/Personal/Artifact/Artifact.tsx";
import PersonData from "../../components/Personal/PersonData/PersonData.tsx";
import useProfileData from "../../hooks/useProfileData.tsx";
import LeaderBord from '../../components/Personal/LeaderBord/LeaderBord.tsx';


const Profile = () => {
  const data = useProfileData();
  if(!data) return <section/>
  return (
    <div className={st.profile}>
      <header>
        <Title className={st.profile__title} text={'ПРОФИЛЬ'} />
        <img src={astronaut} alt="" />
      </header>
      <div className={st.profile__container}>
        <Block
          classBox={st.profile__box}
          className={st.profile__block}
          child={
            <PersonData personData={data.personData} />}
        />
        <Block
          title={'АРТЕФАКТЫ'}
          classBox={st.profile__box}
          className={st.profile__block}
          child={
            <ArtifactList artifacts={data.artifacts} />}
        />
        <Block
          title={`ДОСКА РЕЙТИНГА`}
          classBox={st.profile__box}
          className={st.profile__block}
          child={
            <LeaderBord leaders={data.leaderBord} userId={data.personData.id} />}
        />
      </div>
    </div>
  )

};

export default React.memo(Profile);