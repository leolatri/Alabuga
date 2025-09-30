import React from 'react';
import st from './content.module.scss';
import Block from '../../Block/Block.tsx';
import Source from '../../Source/Source.tsx';
import manaImg from '../../../imgs/mana.svg';

// staus = 0 - Active
// staus = 1 - Finished


export interface ContentProps {
    id: number;
    mana?: number;
    type: string;
    name: string;
    status: number;
    experience?: number;
    description: string;
    // buttonToRoute?: string; 
}


const Content = ({ id, mana, type, name, status, experience, description }: ContentProps) => {
    return (
        <div className={st.content}>
            <div className={st.content__header}>
                <div className={st.content__text}>
                    {`${experience} XP`}
                    {mana && <Source num={mana} img={manaImg} />}
                </div>
                {type.toUpperCase()}
            </div>
            <div className={st.content__body}>
                <h1>{name.toUpperCase()}</h1>
                {description}
            </div>
        </div>
    )
};

export default React.memo(Content);