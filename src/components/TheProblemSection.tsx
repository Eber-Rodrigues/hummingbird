import React from 'react';
import { Brain, ShieldX, CheckCircle } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface TheProblemSectionProps {
  t: Translations['science'];
}

export const TheProblemSection: React.FC<TheProblemSectionProps> = ({ t }) => {
  return (
    <section id="how-it-works" className="py-24 bg-[#023047] text-white relative overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#219ebc]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-medium text-[#8ecae6] mb-4">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] [text-wrap:balance]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75 leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Side-by-Side Liquid Glass Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: The Status Quo */}
          <div className="liquid-glass-dark rounded-3xl p-8 space-y-5 border border-white/10 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                {t.problemTitle}
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                <ShieldX className="w-4 h-4" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold font-['Outfit',sans-serif]">
              {t.problemTitle}
            </h3>

            <p className="text-sm text-white/70 leading-relaxed">
              {t.problemBody}
            </p>

            <div className="space-y-3 pt-2 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                <span>{t.problemBullet1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                <span>{t.problemBullet2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">✕</span>
                <span>{t.problemBullet3}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Hummingbird Mechanism */}
          <div className="liquid-glass-dark rounded-3xl p-8 space-y-5 border border-[#8ecae6]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#219ebc]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8ecae6] uppercase tracking-wider">
                {t.solutionTitle}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#219ebc]/20 text-[#8ecae6] flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
            </div>

            <h3 className="text-2xl font-bold font-['Outfit',sans-serif]">
              {t.solutionTitle}
            </h3>

            <p className="text-sm text-white/80 leading-relaxed">
              {t.solutionBody}
            </p>

            <div className="space-y-3 pt-2 text-xs text-white">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.solutionBullet1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.solutionBullet2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.solutionBullet3}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Proof Card */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs text-[#ffb703] font-semibold tracking-wide uppercase">
              Sleep Science
            </div>
            <div className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-white">
              {t.proofHeadline}
            </div>
            <p className="text-xs text-white/70 max-w-xl">
              {t.proofBody}
            </p>
          </div>

          <div className="flex items-center gap-8 shrink-0">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-[#8ecae6] font-['Outfit',sans-serif] tabular-nums">
                57%
              </div>
              <div className="text-[11px] text-white/60">{t.stat1Label}</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-[#ffb703] font-['Outfit',sans-serif] tabular-nums">
                100%
              </div>
              <div className="text-[11px] text-white/60">{t.stat2Label}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
