"use client";

import { useRef, useState } from "react";

export function HeroProductVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) void videoRef.current.play();
    }
  };

  return (
    <div className="heroImage heroVideo">
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="metadata"
        poster="/images/editorial/home-product-showcase-poster-v1.webp"
        aria-label="San Bakes product collection slideshow"
      >
        <source src="/video/san-bakes-product-collection.mp4" type="video/mp4" />
        <track kind="captions" src="/video/san-bakes-product-collection.en.vtt" srcLang="en" label="English product names" />
      </video>
      <button className="heroSoundToggle" type="button" onClick={toggleSound} aria-pressed={!muted}>
        <span aria-hidden="true">{muted ? "♪" : "♫"}</span>
        {muted ? "Play music" : "Mute music"}
      </button>
    </div>
  );
}
