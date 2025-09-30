import React from "react";
import cx from 'classnames';
import st from './artifact.module.scss';
import { ArtifactImage } from "./ArtifactImage.tsx";
import { ArtifactProps } from "../../../models/personal/types";

const Artifact = ({ artifacts }: { artifacts: ArtifactProps }) => {
    return (
        <div className={cx(st.artifact, artifacts.rarity ? st[`artifact-rarity`] : null)}>
            <ArtifactImage
                src={artifacts.img}
                alt={artifacts.name}
            />
            <div className={st.artifact__text}>
                <h1>{artifacts.name.toUpperCase()}</h1>
                {artifacts.description}
            </div>
        </div>
    );
}

const ArtifactList = ({ artifacts }: { artifacts: ArtifactProps[] }) => {
    return (
        <div className={st.artifactList}>
            {artifacts.map((el: ArtifactProps, index) => (
                <Artifact key={el.id || index} artifacts={el} />
            ))}
        </div>
    );
};

export default React.memo(ArtifactList);