import React from "react";
import Title from "../../components/Title/Title.tsx";
import st from "./profile.module.scss";
import astronaut from '../../imgs/astronaut.svg';
import Block from "../../components/Block/Block.tsx";

const Profile = () => (
  <div className={st.profile}>
    <header>
      <Title className={st.profile__title} text={'ПРОФИЛЬ'}/>
      <img src={astronaut} alt="" />
    </header>
    <div className={st.profile__container}>
      <Block title={'ПРОФИЛЬ'} className={st.profile__block} classBox={st.profile__box}/>
    </div>
  </div>
);

export default React.memo(Profile);