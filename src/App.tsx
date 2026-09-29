import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FounderStorySection } from './components/FounderStorySection';
import { TheProblemSection } from './components/TheProblemSection';
import { InteractiveHumDemo } from './components/InteractiveHumDemo';
import { VocalCalibrationSection } from './components/VocalCalibrationSection';
import { AlarmSimulatorSection } from './components/AlarmSimulatorSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { Language, translations } from './i18n/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const t = translations[lang];

  const scrollToDemo = () => {
    const demoElement = document.getElementById('interactive-demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#023047] text-white flex flex-col selection:bg-[#8ecae6] selection:text-[#023047]">
      {/* Navbar with Wordmark Logo & EN/PT Toggle */}
      <Navbar
        onOpenDownload={() => setIsDownloadOpen(true)}
        lang={lang}
        onToggleLang={setLang}
        t={t.nav}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with 100% Opacity Background & Centered Content */}
        <Hero
          onOpenDownload={() => setIsDownloadOpen(true)}
          onScrollToDemo={scrollToDemo}
          t={t.hero}
        />

        {/* 2. Founder Story: Why Hummingbird Was Built */}
        <FounderStorySection t={t.founder} />

        {/* 3. The Science of Waking (The Problem vs Solution) */}
        <TheProblemSection t={t.science} />

        {/* 4. Interactive Browser Web Pitch Demo */}
        <InteractiveHumDemo t={t.demo} />

        {/* 5. Vocal Calibration & Morning Voice Range */}
        <VocalCalibrationSection t={t.vocal} />

        {/* 6. Configure Your Alarm Routine & Melody Library */}
        <AlarmSimulatorSection t={t.alarm} />
      </main>

      {/* Quiet Apple-Style Footer */}
      <Footer
        onOpenDownload={() => setIsDownloadOpen(true)}
        t={t.footer}
      />

      {/* Download APK / Release Notification Modal */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        t={t.modal}
      />
    </div>
  );
}
