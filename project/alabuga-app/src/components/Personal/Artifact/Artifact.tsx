import React from "react";
import st from './artifact.module.scss';
import cx from 'classnames';
import { ArtifactProps } from "../../../models/personal/types";


const Artifact = ({ artifacts }: { artifacts: ArtifactProps }) => (
    <div className={cx(st.artifact, artifacts.rarity ? st[`artifact-rarity`] : null)}>
        <img src={artifacts.img} alt="" />
        <div className={st.artifact__text}>
            <h1>{artifacts.name.toUpperCase()}</h1>
            {artifacts.description}
        </div>
    </div>
)

const ArtifactList = ({ artifacts }: { artifacts: ArtifactProps[] }) => {
    return (
        <div className={st.artifactList}>
            {artifacts.map((el: ArtifactProps) => (
                <Artifact artifacts={el} />
            ))}
        </div>
    );
};

export default React.memo(ArtifactList);