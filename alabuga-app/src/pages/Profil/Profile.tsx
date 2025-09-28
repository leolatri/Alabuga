import React from "react";
import st from "./profile.module.scss";
import astronaut from '../../imgs/astronaut.svg';
import Block from "../../components/Block/Block.tsx";
import Title from "../../components/Title/Title.tsx";
import LiderList from "../../components/Personal/LiderBord/LiderBord.tsx";
import ArtifactList from "../../components/Personal/Artifact/Artifact.tsx";
import PersonData from "../../components/Personal/PersonData/PersonData.tsx";

import { data, Artifacts, Liders } from "../../test.tsx";


const Profile = () => (
  <div className={st.profile}>
    <header>
      <Title className={st.profile__title} text={'ПРОФИЛЬ'}/>
      <img src={astronaut} alt="" />
    </header>
    <div className={st.profile__container}>
      <Block
        classBox={st.profile__box}
        className={st.profile__block}
        child={
          <PersonData
            mana={data.mana}
            place={data.place}
            fullName={data.fullName}
            experience={data.experience}
          />}
      />
       <Block
        title={'АРТЕФАКТЫ'}
        classBox={st.profile__box}
        className={st.profile__block}
        child={
          <ArtifactList artifacts={Artifacts}/>}
      />
      <Block
        title={`ДОСКА РЕЙТИНГА`}
        classBox={st.profile__box}
        className={st.profile__block}
        child={
          <LiderList liders={Liders} userId={data.id}/>}
      />
    </div>
    <div style={{height: '70px', width: '100%'}}/>
  </div>
);

export default React.memo(Profile);