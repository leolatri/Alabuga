import React from "react";
import st from './skeleton.module.scss';

interface SkeletonCircleProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const SkeletonCircle: React.FC<SkeletonCircleProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  return (
    <div className={`${st.spinner} ${st[size]} ${className}`}>
      <div className={st.spinner__circle}></div>
    </div>
  );
};

export default SkeletonCircle;