import React from 'react';
import star from '../../../imgs/star.svg';

interface ArtifactImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ArtifactImage: React.FC<ArtifactImageProps> = ({ src, alt, className }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = star;
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={handleError}
    />
  );
};