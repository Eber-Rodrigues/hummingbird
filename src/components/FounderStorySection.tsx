import React from 'react';
import { Linkedin, Music, Guitar, Quote, ExternalLink, Heart } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface FounderStorySectionProps {
  t: Translations['founder'];
}

export const FounderStorySection: React.FC<FounderStorySectionProps> = ({ t }) => {
  return (
    <section id="why-hummingbird" className="py-24 bg-[#023047] text-white relative overflow-hidden border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#ffb703]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#219ebc]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-medium text-[#8ecae6] mb-4">
            <Heart className="w-3.5 h-3.5 text-[#ffb703]" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] [text-wrap:balance]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Liquid Glass Founder Feature Card */}
        <div className="liquid-glass-dark rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left: Founder Profile Avatar & Identity */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
              
              {/* Profile Picture Placeholder with Acoustic Framing */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#219ebc] to-[#ffb703] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
                
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-[#012538] border-2 border-white/20 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-3">
                  {/* Stylized Acoustic Avatar Placeholder */}
                  <div className="w-20 h-20 rounded-full bg-[#023047] border border-white/20 flex items-center justify-center text-[#ffb703] shadow-inner mb-2">
                    <Music className="w-9 h-9" />
                  </div>
                  <span className="text-[11px] font-mono text-white/60 tracking-wider uppercase">
                    Founder Portrait
                  </span>
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#219ebc] text-white shadow-md">
                    <Guitar className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Founder Info */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white">
                  Founder & Creator
                </h3>
                <p className="text-xs text-[#8ecae6] font-medium">
                  {t.role}
                </p>
              </div>

              {/* LinkedIn Button */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass text-xs font-semibold text-white hover:bg-white/20 transition-all active:scale-95 shadow-md"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#8ecae6]" />
                <span>{t.connectLinkedIn}</span>
                <ExternalLink className="w-3 h-3 text-white/50" />
              </a>

            </div>

            {/* Right: The Personal Story Narrative */}
            <div className="md:col-span-8 space-y-5 text-sm sm:text-base text-white/85 leading-relaxed font-normal">
              
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-[#8ecae6] flex items-center gap-2.5">
                <Quote className="w-4 h-4 text-[#ffb703] shrink-0" />
                <span className="italic">"I joined my morning sleep struggle with my greatest musical passion."</span>
              </div>

              <p>
                {t.storyP1}
              </p>

              <p>
                {t.storyP2}
              </p>

              <p>
                {t.storyP3}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-white/60">
                <span className="w-2 h-2 rounded-full bg-[#ffb703]" />
                <span>Developed with Flutter + Dart for 100% on-device local execution</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
