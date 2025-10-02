import React, { useState } from "react";
import st from "./bord.module.scss";
import Title from "../../components/Title/Title.tsx";
import SearchInput from "../../components/SearchInput/SearchInput.tsx";
import Table from "../../components/Table/Table.tsx";


const PeopleBord = () => {
  const [inputValue, setValue] = useState<string>('');
  return (
    <div className={st.bord}>
      <Title text="ПОЛЬЗОВАТЕЛИ" className={st.bord__title}/>
      <div className={st.bord__container}>
        <SearchInput input={inputValue} setInput={setValue}/>
        <Table value={inputValue}/>
      </div>

    </div>
  )

};

export default React.memo(PeopleBord);