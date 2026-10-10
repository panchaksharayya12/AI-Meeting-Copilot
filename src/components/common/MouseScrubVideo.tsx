import React, { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const SENSITIVITY = 0.8;

export const MouseScrubVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial frame once metadata loads
    const handleLoadedMetadata = () => {
      targetTimeRef.current = Math.min(1.0, video.duration * 0.1);
      video.currentTime = targetTimeRef.current;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const performSeek = () => {
      if (!video || !video.duration) return;
      if (isSeekingRef.current) return;

      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        try {
          video.currentTime = targetTimeRef.current;
        } catch {
          isSeekingRef.current = false;
        }
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      // If targetTime moved while we were seeking, queue next seek
      if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        performSeek();
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      let newTarget = targetTimeRef.current + timeOffset;

      // Clamp between 0 and duration
      newTarget = Math.max(0, Math.min(newTarget, video.duration));
      targetTimeRef.current = newTarget;

      performSeek();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 object-cover w-full h-full pointer-events-none"
        style={{
          objectPosition: '70% center',
        }}
      />
      {/* Cinematic dark tint and vignette overlays for pristine legibility */}
      <div className="fixed inset-0 z-0 bg-black/60 pointer-events-none" />
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(8,9,10,0.3) 0%, rgba(8,9,10,0.85) 75%, #08090a 100%)',
        }}
      />
    </>
  );
};
