import React, { useState } from 'react';
import { Mic, Volume2, Check } from 'lucide-react';
import { VOCAL_RANGES } from '../data/mockData';
import { VocalRangeId, VocalRange } from '../types';
import { playTone } from '../utils/audio';
import { Translations } from '../i18n/translations';

interface VocalCalibrationSectionProps {
  t: Translations['vocal'];
}

export const VocalCalibrationSection: React.FC<VocalCalibrationSectionProps> = ({ t }) => {
  const [selectedGender, setSelectedGender] = useState<'Female' | 'Male'>('Female');
  const [activeRangeId, setActiveRangeId] = useState<VocalRangeId>('soprano');
  const [isTestingVoice, setIsTestingVoice] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResult, setTestResult] = useState<VocalRange | null>(null);

  const filteredRanges = VOCAL_RANGES.filter(
    (r) => r.voiceType === selectedGender
  );

  const handleHearRegister = async (freq: number) => {
    await playTone(freq, 0.6);
  };

  const handleRunVoiceTest = () => {
    if (isTestingVoice) return;
    setIsTestingVoice(true);
    setTestProgress(0);
    setTestResult(null);

    const interval = setInterval(() => {
      setTestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTestingVoice(false);
          const detected = selectedGender === 'Female' ? VOCAL_RANGES[1] : VOCAL_RANGES[2];
          setTestResult(detected);
          setActiveRangeId(detected.id);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <section id="vocal-calibration" className="py-24 bg-[#023047] text-white relative overflow-hidden border-b border-white/10">
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
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Deck: Category Grid & Interactive Test */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Gender Filter & 4 Vocal Registers */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Gender Segmented Control */}
            <div className="flex items-center p-1 liquid-glass rounded-2xl max-w-xs">
              <button
                onClick={() => {
                  setSelectedGender('Female');
                  setActiveRangeId('soprano');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedGender === 'Female'
                    ? 'bg-[#ffb703] text-[#023047] shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t.femaleVoices}
              </button>
              <button
                onClick={() => {
                  setSelectedGender('Male');
                  setActiveRangeId('tenor');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedGender === 'Male'
                    ? 'bg-[#ffb703] text-[#023047] shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t.maleVoices}
              </button>
            </div>

            {/* Vocal Range Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredRanges.map((range) => {
                const isSelected = activeRangeId === range.id;
                return (
                  <div
                    key={range.id}
                    onClick={() => setActiveRangeId(range.id)}
                    className={`p-6 rounded-3xl transition-all cursor-pointer ${
                      isSelected
                        ? 'liquid-glass border-[#8ecae6]/60 shadow-xl ring-1 ring-[#8ecae6]/40'
                        : 'liquid-glass-dark hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#8ecae6] uppercase tracking-wider">
                        {range.voiceType}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHearRegister(range.sampleFrequency);
                        }}
                        aria-label={`Hear tone for ${range.name}`}
                        className="p-2 rounded-xl bg-white/10 hover:bg-[#ffb703] hover:text-[#023047] text-white transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-xl font-bold font-['Outfit',sans-serif]">
                      {range.name}
                    </h3>
                    
                    <div className="text-xs font-mono text-[#ffb703] mt-1">
                      {range.rangeNote} ({range.frequencyRange})
                    </div>

                    <p className="text-xs text-white/75 mt-3 leading-relaxed">
                      {range.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Voice Test Simulator */}
          <div className="lg:col-span-5">
            <div className="liquid-glass-dark rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#219ebc] flex items-center justify-center text-white">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold font-['Outfit',sans-serif]">
                    {t.voiceTestTitle}
                  </span>
                </div>
                <span className="text-[11px] text-[#ffb703] font-mono font-bold">
                  {isTestingVoice ? t.statusCalibrating : t.statusReady}
                </span>
              </div>

              {/* Waveform Visualization */}
              <div className="h-28 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center gap-1.5 px-4 overflow-hidden relative">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-150 ${
                      isTestingVoice
                        ? 'bg-gradient-to-t from-[#219ebc] to-[#ffb703]'
                        : 'bg-white/20'
                    }`}
                    style={{
                      height: isTestingVoice
                        ? `${20 + Math.sin((i + testProgress) * 0.7) * 45 + Math.random() * 20}px`
                        : '12px'
                    }}
                  />
                ))}

                {isTestingVoice && (
                  <div className="absolute inset-0 bg-[#023047]/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-[#ffb703]">
                      {t.listeningHum} {testProgress}%
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button & Result Display */}
              {!testResult ? (
                <div className="space-y-3">
                  <button
                    onClick={handleRunVoiceTest}
                    disabled={isTestingVoice}
                    className="w-full py-3.5 bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] hover:text-white font-bold text-xs rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{t.btnRunTest}</span>
                  </button>
                  <p className="text-[11px] text-white/60 text-center">
                    {t.testNotice}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-emerald-500/15 border border-emerald-400/30 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span>{t.testSuccessTitle} {testResult.name}</span>
                  </div>
                  <div className="text-xs text-white/80">
                    {t.testSuccessOptimal} <span className="font-mono text-[#ffb703]">{testResult.rangeNote}</span> ({testResult.frequencyRange}).
                  </div>
                  <div className="text-[11px] text-white/60">
                    {t.testSuccessKey} {testResult.recommendedKey}.
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
