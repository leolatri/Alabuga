import React from 'react';
import st from './progress.module.scss';

interface ProgressBarProps {
    currentXP: number;
    maxXP: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentXP, maxXP }) => {
    const percentage = currentXP === maxXP ? 0 : (currentXP / maxXP) * 100;

    return (
        <div className={st.progressBar}>
            <div
                style={{
                    width: `${percentage}%`,
                    height: '10px',
                    backgroundColor: '#F0C419',
                    transition: 'width 0.5s ease-in-out',
                }}
            />
        </div>
    );
};

export default ProgressBar;