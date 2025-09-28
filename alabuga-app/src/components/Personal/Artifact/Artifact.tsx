import React from "react";
import st from './artifact.module.scss';
import cx from 'classnames';

export interface ArtifactProps {
    id: number,
    name: string,
    img: string,
    description: string,
    rarity: number,
}

const Artifact = ({ id, name, img, description, rarity }: ArtifactProps) => (
    <div className={cx(st.artifact, rarity ? st[`artifact-rarity`] : null)}>
        <img src={img} alt="" />
        <div className={st.artifact__text}>
            <h1>{name.toUpperCase()}</h1>
            {description}
        </div>
    </div>
)

const ArtifactList = ({ artifacts }: { artifacts: ArtifactProps[] }) => {
    return (
        <div className={st.artifactList}>
            {artifacts.map((el: ArtifactProps) => (
                <Artifact
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    img={el.img}
                    description={el.description}
                    rarity={el.rarity}
                />
            ))}
        </div>
    );
};

export default React.memo(ArtifactList);