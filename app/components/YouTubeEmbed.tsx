'use client'

import { useState, useEffect } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  baseSrc: string;
}

export default function YouTubeEmbed({ videoId, baseSrc }: YouTubeEmbedProps) {
  const [embedSrc, setEmbedSrc] = useState(baseSrc);

  useEffect(() => {
    // Append the origin only on the client-side
    setEmbedSrc(prevSrc => `${prevSrc}&origin=${window.location.origin}`);
  }, []); // Re-run if baseSrc changes (though unlikely here)

  return (
    <iframe
      title={`YouTube video player - ${videoId}`}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      src={embedSrc}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
    />
  );
} 