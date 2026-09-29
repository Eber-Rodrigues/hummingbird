import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Translations } from '../i18n/translations';

interface FooterProps {
  onOpenDownload: () => void;
  t: Translations['footer'];
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, t }) => {
  return (
    <footer className="bg-[#023047] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column with Wordmark Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-block p-1 rounded-xl bg-white/95 shadow-sm">
              <img
                src="/src/assets/images/wordmarkwhitebg.svg"
                alt="Hummingbird"
                className="h-7 w-auto object-contain"
              />
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              {t.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#8ecae6]">
              <ShieldCheck className="w-4 h-4 text-[#ffb703]" />
              <span>{t.privacyPill}</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-[#8ecae6] uppercase tracking-wider">
              {t.navTitle}
            </div>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#why-hummingbird" className="hover:text-white transition-colors">
                  Why It Was Built
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  The Science of Waking
                </a>
              </li>
              <li>
                <a href="#interactive-demo" className="hover:text-white transition-colors">
                  Web Browser Demo
                </a>
              </li>
              <li>
                <a href="#vocal-calibration" className="hover:text-white transition-colors">
                  Voice Range Engine
                </a>
              </li>
              <li>
                <a href="#alarm-builder" className="hover:text-white transition-colors">
                  Alarm Builder Simulator
                </a>
              </li>
            </ul>
          </div>

          {/* APK & Development Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-[#8ecae6] uppercase tracking-wider">
              {t.releaseTitle}
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              {t.releaseText}
            </p>
            <div>
              <button
                onClick={onOpenDownload}
                className="px-4 py-2.5 bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] hover:text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {t.btnDownload}
              </button>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Hummingbird Alarm. {t.rights}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white/80 transition-colors cursor-pointer">
              {t.privacyLink}
            </span>
            <span>/</span>
            <span className="hover:text-white/80 transition-colors cursor-pointer">
              {t.specsLink}
            </span>
            <span>/</span>
            <span className="hover:text-white/80 transition-colors cursor-pointer">
              {t.manifestLink}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
