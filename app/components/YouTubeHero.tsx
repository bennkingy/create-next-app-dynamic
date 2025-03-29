'use client';

import { useEffect, useState } from 'react';

interface YouTubeHeroProps {
  videoId: string;
}

export default function YouTubeHero({ videoId }: YouTubeHeroProps) {
  const [src, setSrc] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSrc(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}&iv_load_policy=3&disablekb=1`);
  }, [videoId]);

  return (
    <div className="relative w-full pt-[56.25%] mt-4">
      {isMounted && (
        <iframe
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      )}
    </div>
  );
}

