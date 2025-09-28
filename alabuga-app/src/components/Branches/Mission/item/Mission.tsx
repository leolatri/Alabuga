import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import st from './mission.module.scss';
import { ContentProps } from '../../Content/Content';
import { ArtifactProps } from '../../../Personal/Artifact/Artifact';

export interface MissionProps {
  content: ContentProps;
  artifact: ArtifactProps;
}

const Mission = ({ content, artifact }: MissionProps) => {
  const { missionId } = useParams();
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      console.log('Загружаем файл:', file.name);
    }
  };

  return (
    <div className={st.mission}>
      <div className={st.mission__header}>
        <h1>{content.name}</h1>
        <div className={st.mission__meta}>
          <span>Опыт: {content.experience}</span>
          <span>Мана: {content.mana}</span>
          <span>Тип: {content.type}</span>
        </div>
      </div>

      <div className={st.mission__content}>
        <div className={st.mission__description}>
          <h2>Описание задания</h2>
          <p>{content.description}</p>
        </div>

        {artifact && (
          <div className={st.mission__artifact}>
            <h3>Артефакт</h3>
            <p>{artifact.name}</p>
          </div>
        )}

        <div className={st.mission__upload}>
          <h3>Загрузка решения</h3>
          <input 
            type="file" 
            onChange={handleFileUpload}
            className={st.mission__fileInput}
          />
          <button 
            onClick={handleSubmit}
            disabled={!file}
            className={st.mission__submitButton}
          >
            Загрузить решение
          </button>
          {file && (
            <p className={st.mission__fileName}>Выбран файл: {file.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mission;