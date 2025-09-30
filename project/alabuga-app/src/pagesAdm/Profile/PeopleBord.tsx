import React from "react";
import st from "./profile.module.scss";
import astronaut from '../../imgs/astronaut.svg';
import Block from "../../components/Block/Block.tsx";
import Title from "../../components/Title/Title.tsx";
import LiderList from "../../components/Personal/LiderBord/LiderBord.tsx";
import ArtifactList from "../../components/Personal/Artifact/Artifact.tsx";
import PersonData from "../../components/Personal/PersonData/PersonData.tsx";
import useProfileData from "../../hooks/useProfileData.tsx";


const PeopleBord = () => {
  return (
    <div className={st.profile}>
    333
    </div>
  )

};

export default React.memo(PeopleBord);