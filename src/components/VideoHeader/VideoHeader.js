import React, { useEffect, useRef, useState } from 'react';
import style from './VideoHeader.module.css';
import { useTranslation } from 'react-i18next';

const VideoHeader = () => {


  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDone(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current && overlayRef.current && animationDone) {
        const scrollPosition = window.scrollY;
        const maxScroll = window.innerHeight;

        const translateY = Math.min((scrollPosition / maxScroll) * 500, 500);
        const textOpacity = Math.max(1 - scrollPosition / maxScroll, 0);
        textRef.current.style.transform = `translateY(${translateY}px)`;
        textRef.current.style.opacity = textOpacity;

        const overlayStart = maxScroll / 2;
        const overlayOpacity = scrollPosition > overlayStart
          ? Math.min(0.5 + ((scrollPosition - overlayStart) / (maxScroll - overlayStart)) * 0.5, 1)
          : 0.5;
        overlayRef.current.style.opacity = overlayOpacity;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationDone]);

  return (
    <div className="position-relative w-100" style={{ height: 'calc(100vh)', overflow: 'hidden' }}>
      <video
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        src="/assets/video/isotex_video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 bg-black ${style.video_header__container}`}
        ref={overlayRef}
        style={{ opacity: '0.5' }}
      />
      <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-center px-4 ${style.video_header}`}>
        <div
          className={`${style.text_content} ${animationDone ? style.animation_done : ''}`}
          ref={textRef}
        >
          <h1 className={style.isotex_title}>Isotex Group</h1>
          <h2 className={style.isotex_subtitle}>
            <span className={style.typed_text}>{t('VideoHeader.description')}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VideoHeader;