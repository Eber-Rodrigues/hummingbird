import React, { useState, useEffect, useRef } from 'react';
import { Play, Mic, MicOff, RefreshCw, CheckCircle2, Volume2, ShieldAlert } from 'lucide-react';
import { getAudioContext, playTone, autoCorrelate, frequencyToNote, NOTE_FREQUENCIES } from '../utils/audio';
import { Translations } from '../i18n/translations';

interface InteractiveHumDemoProps {
  t: Translations['demo'];
}

type DemoStep = 'idle' | 'listening_melody' | 'awaiting_hum' | 'success' | 'failed';

const TARGET_SEQUENCE = [
  { note: 'C4', freq: NOTE_FREQUENCIES['C4'], duration: 0.5 },
  { note: 'E4', freq: NOTE_FREQUENCIES['E4'], duration: 0.5 },
  { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.75 }
];

export const InteractiveHumDemo: React.FC<InteractiveHumDemoProps> = ({ t }) => {
  const [step, setStep] = useState<DemoStep>('idle');
  const [activePlayIndex, setActivePlayIndex] = useState<number | null>(null);
  const [currentMatchedIndex, setCurrentMatchedIndex] = useState<number>(0);
  const [failureCount, setFailureCount] = useState<number>(0);
  const [toleranceMode, setToleranceMode] = useState<'Forgiving' | 'Strict'>('Forgiving');
  const [feedbackMessage, setFeedbackMessage] = useState<string>(t.standby);
  
  // Microphone & Live pitch state
  const [isMicActive, setIsMicActive] = useState(false);
  const [liveFreq, setLiveFreq] = useState<number | null>(null);
  const [liveNote, setLiveNote] = useState<string>('--');
  const [liveCents, setLiveCents] = useState<number>(0);

  const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Play target melody
  const handlePlayTargetMelody = async () => {
    setStep('listening_melody');
    setCurrentMatchedIndex(0);
    setFeedbackMessage(t.playing);

    for (let i = 0; i < TARGET_SEQUENCE.length; i++) {
      setActivePlayIndex(i);
      await playTone(TARGET_SEQUENCE[i].freq, TARGET_SEQUENCE[i].duration);
      await new Promise((r) => setTimeout(r, 80));
    }

    setActivePlayIndex(null);
    setStep('awaiting_hum');
    setFeedbackMessage(t.awaiting);
  };

  // Toggle real microphone
  const toggleMicrophone = async () => {
    if (isMicActive) {
      stopMicrophone();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = getAudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioSourceRef.current = source;
      analyserRef.current = analyser;
      setIsMicActive(true);

      const buffer = new Float32Array(analyser.fftSize);

      const detectLoop = () => {
        analyser.getFloatTimeDomainData(buffer);
        const pitch = autoCorrelate(buffer, ctx.sampleRate);
        if (pitch > 0 && pitch < 1200) {
          setLiveFreq(Math.round(pitch));
          const noteInfo = frequencyToNote(pitch);
          setLiveNote(noteInfo.note);
          setLiveCents(noteInfo.cents);

          evaluateLivePitch(noteInfo.note, pitch);
        } else {
          setLiveFreq(null);
          setLiveNote('--');
          setLiveCents(0);
        }
        animationFrameRef.current = requestAnimationFrame(detectLoop);
      };

      detectLoop();
    } catch {
      setFeedbackMessage('Microphone access unavailable. Use the instant simulation buttons below.');
    }
  };

  const stopMicrophone = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioSourceRef.current) audioSourceRef.current.disconnect();
    setIsMicActive(false);
    setLiveFreq(null);
    setLiveNote('--');
    setLiveCents(0);
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  const evaluateLivePitch = (detectedNote: string, detectedFreq: number) => {
    if (step !== 'awaiting_hum') return;

    const expected = TARGET_SEQUENCE[currentMatchedIndex];
    if (!expected) return;

    const semitonesDiff = Math.abs(12 * Math.log2(detectedFreq / expected.freq));
    const allowedSemitones = toleranceMode === 'Forgiving' ? 1.8 : 1.0;

    if (semitonesDiff <= allowedSemitones) {
      const nextIndex = currentMatchedIndex + 1;
      setCurrentMatchedIndex(nextIndex);

      if (nextIndex >= TARGET_SEQUENCE.length) {
        setStep('success');
        setFeedbackMessage(t.silenced);
      } else {
        setFeedbackMessage(`Note ${nextIndex} matched. Next target: ${TARGET_SEQUENCE[nextIndex].note}`);
      }
    }
  };

  const handleSimulateHumNote = async (noteKey: string) => {
    if (step !== 'awaiting_hum') {
      setFeedbackMessage(t.awaiting);
      return;
    }

    const freq = NOTE_FREQUENCIES[noteKey] || 300;
    await playTone(freq, 0.45, 'triangle');

    const expected = TARGET_SEQUENCE[currentMatchedIndex];
    if (expected && noteKey === expected.note) {
      const nextIndex = currentMatchedIndex + 1;
      setCurrentMatchedIndex(nextIndex);
      if (nextIndex >= TARGET_SEQUENCE.length) {
        setStep('success');
        setFeedbackMessage(t.silenced);
      } else {
        setFeedbackMessage(`Good hum. Matched ${noteKey}. Now hum note ${TARGET_SEQUENCE[nextIndex].note}.`);
      }
    } else {
      const newFails = failureCount + 1;
      setFailureCount(newFails);
      setFeedbackMessage(`Hummed ${noteKey}, but expected ${expected?.note || ''}. Pitch deviation detected.`);
      if (newFails >= 5) {
        setStep('failed');
      }
    }
  };

  const handleSimulateFullSuccess = async () => {
    setStep('awaiting_hum');
    setCurrentMatchedIndex(0);
    setFeedbackMessage('Simulating accurate humming C4 -> E4 -> G4...');
    
    for (let i = 0; i < TARGET_SEQUENCE.length; i++) {
      await new Promise((r) => setTimeout(r, 350));
      await playTone(TARGET_SEQUENCE[i].freq, 0.4, 'triangle');
      setCurrentMatchedIndex(i + 1);
    }
    setStep('success');
    setFeedbackMessage(t.silenced);
  };

  const handleSimulateMistake = async () => {
    setStep('awaiting_hum');
    setCurrentMatchedIndex(0);
    setFeedbackMessage('Simulating off-pitch flat hum...');
    await playTone(NOTE_FREQUENCIES['C4'] * 0.85, 0.4, 'sawtooth');
    const newFails = failureCount + 1;
    setFailureCount(newFails);
    setFeedbackMessage(`Pitch missed by 2.8 semitones. ${newFails}/5 attempts used.`);
    if (newFails >= 5) {
      setStep('failed');
    }
  };

  const handleReset = () => {
    setStep('idle');
    setCurrentMatchedIndex(0);
    setFeedbackMessage(t.standby);
  };

  return (
    <section id="interactive-demo" className="py-24 bg-[#023047] text-white relative overflow-hidden border-b border-white/10">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ffb703]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#219ebc]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass-pill text-xs font-medium text-[#8ecae6] mb-4">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-['Outfit',sans-serif] [text-wrap:balance]">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/75">
            {t.subtitle}
          </p>
        </div>

        {/* Apple Studio Liquid Glass Container */}
        <div className="liquid-glass-dark rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header Row: Mascot, State & Tolerance */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/logo.svg"
                alt="Hummingbird mascot"
                className="w-8 h-8 rounded-xl object-contain bg-[#013252] p-1 border border-white/15"
              />
              <span className="text-sm font-semibold tracking-wide">
                {step === 'idle' && t.standby}
                {step === 'listening_melody' && t.playing}
                {step === 'awaiting_hum' && t.awaiting}
                {step === 'success' && t.silenced}
                {step === 'failed' && t.failed}
              </span>
            </div>

            {/* Tolerance Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white/60">{t.tolerance}</span>
              <div className="flex items-center p-0.5 bg-white/10 rounded-xl">
                <button
                  onClick={() => setToleranceMode('Forgiving')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    toleranceMode === 'Forgiving'
                      ? 'bg-[#219ebc] text-white font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t.forgiving}
                </button>
                <button
                  onClick={() => setToleranceMode('Strict')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    toleranceMode === 'Strict'
                      ? 'bg-[#219ebc] text-white font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t.strict}
                </button>
              </div>
            </div>
          </div>

          {/* Stave / Note Matching Display */}
          <div className="py-8">
            <div className="text-xs font-medium text-[#8ecae6] mb-4 text-center">
              {t.targetMelody}
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {TARGET_SEQUENCE.map((item, idx) => {
                const isPlayed = activePlayIndex === idx;
                const isMatched = currentMatchedIndex > idx;
                const isCurrentTarget = currentMatchedIndex === idx && step === 'awaiting_hum';

                return (
                  <div
                    key={item.note}
                    className={`relative p-5 rounded-2xl border text-center transition-all duration-300 ${
                      isMatched
                        ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-lg'
                        : isPlayed
                        ? 'bg-[#ffb703] border-[#ffb703] text-[#023047] scale-105 shadow-xl font-bold'
                        : isCurrentTarget
                        ? 'bg-[#219ebc]/30 border-[#8ecae6] text-white ring-2 ring-[#8ecae6]/50 animate-pulse'
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    <div className="text-[11px] font-mono mb-1 text-white/50">Note {idx + 1}</div>
                    <div className="text-2xl font-extrabold font-['Outfit',sans-serif]">
                      {item.note}
                    </div>
                    <div className="text-[11px] font-mono mt-1 opacity-70">
                      {Math.round(item.freq)} Hz
                    </div>

                    {isMatched && (
                      <div className="absolute top-2 right-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Pitch Feedback Gauge */}
          <div className="max-w-lg mx-auto p-4 bg-white/5 rounded-2xl border border-white/10 mb-6">
            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Volume2 className="w-4 h-4 text-[#ffb703]" />
                {t.detectedFreq}
              </span>
              <span className="font-mono text-sm font-bold text-[#8ecae6] tabular-nums">
                {liveFreq ? `${liveFreq} Hz (${liveNote})` : t.awaitingHum}
              </span>
            </div>

            {/* Tolerance Pitch Bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#219ebc] to-[#ffb703] transition-all duration-150"
                style={{
                  width: liveFreq ? `${Math.min(100, Math.max(10, (liveFreq / 600) * 100))}%` : '0%'
                }}
              />
            </div>
            
            <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
              <span>Low (100 Hz)</span>
              <span>Target Center (330 Hz)</span>
              <span>High (600 Hz)</span>
            </div>
          </div>

          {/* Feedback Banner */}
          <div className={`p-4 rounded-2xl text-center text-sm font-medium mb-6 transition-colors ${
            step === 'success'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
              : step === 'failed'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
              : 'bg-white/5 text-white/90 border border-white/10'
          }`}>
            {feedbackMessage}
          </div>

          {/* Action Deck */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left Deck: Play & Mic */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
              <div className="text-xs font-semibold text-[#8ecae6]">
                Alarm Sequence Control
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePlayTargetMelody}
                  disabled={step === 'listening_melody'}
                  className="flex-1 py-3 px-4 bg-[#ffb703] hover:bg-[#fb8500] text-[#023047] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.btnPlayMelody}</span>
                </button>

                <button
                  onClick={toggleMicrophone}
                  className={`py-3 px-4 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                    isMicActive
                      ? 'bg-rose-500 text-white hover:bg-rose-600'
                      : 'liquid-glass text-white hover:bg-white/20'
                  }`}
                >
                  {isMicActive ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isMicActive ? t.btnMuteMic : t.btnUseMic}</span>
                </button>
              </div>
            </div>

            {/* Right Deck: Simulation Buttons */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8ecae6]">
                <span>{t.simTitle}</span>
                <span className="text-[11px] text-white/40">{t.simBadge}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSimulateHumNote('C4')}
                  className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold rounded-xl border border-white/10 cursor-pointer active:scale-95"
                >
                  Hum C4
                </button>
                <button
                  onClick={() => handleSimulateHumNote('E4')}
                  className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold rounded-xl border border-white/10 cursor-pointer active:scale-95"
                >
                  Hum E4
                </button>
                <button
                  onClick={() => handleSimulateHumNote('G4')}
                  className="py-2 px-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold rounded-xl border border-white/10 cursor-pointer active:scale-95"
                >
                  Hum G4
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSimulateFullSuccess}
                  className="flex-1 py-1.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium rounded-xl border border-emerald-500/30 cursor-pointer active:scale-95"
                >
                  {t.btnAutoMatch}
                </button>
                <button
                  onClick={handleSimulateMistake}
                  className="flex-1 py-1.5 px-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-medium rounded-xl border border-rose-500/30 cursor-pointer active:scale-95"
                >
                  {t.btnSimMiss}
                </button>
                <button
                  onClick={handleReset}
                  aria-label="Reset alarm state"
                  className="py-1.5 px-2.5 bg-white/10 hover:bg-white/20 text-white/80 text-xs rounded-xl cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Safety rule notice */}
          {failureCount >= 5 && (
            <div className="mt-4 p-3.5 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>{t.safetyNotice}</span>
              </div>
              <button
                onClick={handleReset}
                className="px-3 py-1 bg-amber-400 text-[#023047] font-bold rounded-xl cursor-pointer"
              >
                {t.btnDismiss}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
