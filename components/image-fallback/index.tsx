'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ImageFallback({
  name,
  src,
  width,
  height,
  className,
  alt = 'Superhero',
}: {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="mr-2 w-8 h-8 rounded-full flex bg-blue-700 items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {name.substring(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      className={className}
      src={src}
      width={width}
      height={width}
      alt={alt}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
}
