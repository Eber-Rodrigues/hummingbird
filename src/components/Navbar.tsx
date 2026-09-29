import React from 'react';
import { Language, Translations } from '../i18n/translations';

interface NavbarProps {
  onOpenDownload: () => void;
  lang: Language;
  onToggleLang: (lang: Language) => void;
  t: Translations['nav'];
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, lang, onToggleLang, t }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#023047]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Wordmark Logo with Blue Background (seamless with dark navbar) */}
        <a href="#" className="flex items-center hover:opacity-90 transition-opacity">
          <img
            src="/src/assets/images/wordmarkbluebg(Wletters).svg"
            alt="Hummingbird"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-white/80">
          <a href="#why-hummingbird" className="hover:text-white transition-colors">
            {t.founder}
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            {t.howItWorks}
          </a>
          <a href="#interactive-demo" className="hover:text-white transition-colors">
            {t.demo}
          </a>
          <a href="#vocal-calibration" className="hover:text-white transition-colors">
            {t.voiceRange}
          </a>
          <a href="#alarm-builder" className="hover:text-white transition-colors">
            {t.alarmBuilder}
          </a>
        </nav>

        {/* Zone 3: Language Toggle (EN | PT) & Primary CTA */}
        <div className="flex items-center gap-3">
          
          {/* L18N / i18n English & Portuguese Toggle */}
          <div className="flex items-center liquid-glass rounded-xl p-0.5 border border-white/20">
            <button
              onClick={() => onToggleLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#ffb703] text-[#023047] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => onToggleLang('pt')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'pt'
                  ? 'bg-[#ffb703] text-[#023047] shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
              aria-label="Mudar para Português"
            >
              PT
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenDownload}
            className="px-4 py-2 text-xs font-bold text-[#023047] bg-[#ffb703] hover:bg-[#fb8500] hover:text-white rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
          >
            {t.downloadApk}
          </button>

        </div>

      </div>
    </header>
  );
};
