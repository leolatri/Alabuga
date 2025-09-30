import React, { useState } from "react";
import st from './options.module.scss';
import cx from 'classnames';

const Options = ({activeOption, setActive}: {activeOption: number, setActive: (num: number) => void}) => { 
    const options = [
        { id: 0, label: 'В процессе' },
        { id: 1, label: 'Завершенные' },
    ];
    
    return (
        <div className={st.options}>
            {options.map((op) => (
                <div
                    key={op.id}
                    className={cx(st.option, activeOption === op.id ? st[`option-active`] : '')}
                    onClick={() => setActive(op.id)}
                >
                    <label>{op.label}</label>
                </div>
            ))}
        </div>
    );
}
export default Options;