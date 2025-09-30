import React from 'react';

interface ArtifactImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ArtifactImage: React.FC<ArtifactImageProps> = ({ src, alt, className }) => {
  if (src.startsWith('data:')) {
    return <img src={src} alt={alt} className={className} />;
  } else if (src.startsWith('/img/')) {
    return <img src={src} alt={alt} className={className} />;
  } else {
    return <img src={src} alt={alt} className={className} />;
  }
};