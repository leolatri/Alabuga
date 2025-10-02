import st from './input.module.scss';
import search from '../../imgs/search.svg';
import React from 'react';

const SearchInput = ({ input, setInput }: { input: string; setInput: (v: string) => void }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className={st.inputBlock}>
            <img src={search} alt='Search icon' />
            <input 
                className={st.inputBlock__input}
                value={input}
                onChange={handleInputChange}
                placeholder="Поиск"
            />
        </div>
    );
};

export default SearchInput;