import React from 'react';
import { Download, Mic, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Translations } from '../i18n/translations';

interface HeroProps {
  onOpenDownload: () => void;
  onScrollToDemo: () => void;
  t: Translations['hero'];
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onScrollToDemo, t }) => {
  return (
    <section className="relative overflow-hidden min-h-[95dvh] sm:min-h-[92vh] flex flex-col justify-center items-center py-16 sm:py-32 bg-[#023047] text-white">
      
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#023047]">
        
        {/* Mobile Phone Background: Dedicated Vertical Hummingbird Image with Bottom Placement */}
        <div className="block sm:hidden w-full h-full">
          <img
            src="/src/assets/images/Gemini_Generated_Image_cne3d8cne3d8cne3.jfif"
            alt="Hummingbird phone hero background"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Desktop & Tablet Background: Auto-Looped Muted High Quality 1080p Video */}
        <div className="hidden sm:block w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/src/assets/images/Gemini_Generated_Image_cne3d8cne3d8cne3.jfif"
            className="w-full h-full object-cover object-center [transform:translateZ(0)] [backface-visibility:hidden] contrast-[1.03] brightness-[1.02]"
          >
            <source src="/src/assets/images/gemini_generated_video_hero_hq.mp4" type="video/mp4" />
            <source src="/src/assets/images/gemini_generated_video_217a4c94.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Soft edge gradient at the bottom to blend smoothly into the following section */}
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-[#023047] via-[#023047]/80 to-transparent pointer-events-none z-20" />
      </div>

      {/* Main Centered Content (Pure text & CTAs directly on the background) */}
      <div className="max-w-4xl mx-auto px-6 w-full relative z-30 flex flex-col items-center justify-center text-center">
        
        {/* Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-[1.08] [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] text-white"
        >
          {t.headlinePart1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ecae6] via-[#219ebc] to-[#ffb703]">
            {t.headlinePart2}
          </span>
        </motion.h1>

        {/* Centered Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-6 text-base sm:text-2xl text-white/95 max-w-2xl mx-auto leading-relaxed [text-wrap:balance] font-medium drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
        >
          {t.subtext}
        </motion.p>

        {/* Centered Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-[#023047] bg-[#ffb703] hover:bg-[#fb8500] hover:text-white rounded-2xl transition-all shadow-[0_10px_35px_rgba(255,183,3,0.45)] hover:shadow-[0_15px_45px_rgba(251,133,0,0.55)] flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            <span>{t.ctaDownload}</span>
          </button>

          <button
            onClick={onScrollToDemo}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-[#023047]/85 hover:bg-[#023047] border border-white/30 hover:border-white/50 rounded-2xl transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <Mic className="w-5 h-5 text-[#8ecae6]" />
            <span>{t.ctaDemo}</span>
            <ArrowRight className="w-4 h-4 text-white/70" />
          </button>
        </motion.div>

      </div>

    </section>
  );
};
