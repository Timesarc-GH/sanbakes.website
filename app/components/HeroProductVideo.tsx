"use client";

import { useEffect, useRef } from "react";

export function HeroProductVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => void videoRef.current?.play(), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="heroImage heroVideo">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/images/editorial/home-product-showcase-poster-v1.webp"
        aria-label="San Bakes product collection slideshow"
      >
        <source src="/video/san-bakes-product-collection.mp4" type="video/mp4" />
        <track kind="captions" src="/video/san-bakes-product-collection.en.vtt" srcLang="en" label="English product names" />
      </video>
    </div>
  );
}
