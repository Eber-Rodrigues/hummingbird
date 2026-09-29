import React, { useState } from 'react';
import { Clock, Play, Volume2, Calendar, Shield } from 'lucide-react';
import { SAMPLE_MELODIES } from '../data/mockData';
import { Melody } from '../types';
import { playMelodyNotes } from '../utils/audio';
import { Translations } from '../i18n/translations';

interface AlarmSimulatorSectionProps {
  t: Translations['alarm'];
}

export const AlarmSimulatorSection: React.FC<AlarmSimulatorSectionProps> = ({ t }) => {
  const [alarmTime, setAlarmTime] = useState('06:45');
  const [alarmLabel, setAlarmLabel] = useState('Workday Wake-Up');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [tolerance, setTolerance] = useState<'Forgiving' | 'Strict'>('Forgiving');
  const [selectedMelodyId, setSelectedMelodyId] = useState<string>('melody-dawn');
  const [playingMelodyId, setPlayingMelodyId] = useState<string | null>(null);
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const filteredMelodies = SAMPLE_MELODIES.filter((m) => {
    if (difficulty === 'Easy') return m.difficulty === 'Easy';
    if (difficulty === 'Medium') return m.difficulty === 'Medium';
    return m.difficulty === 'Hard';
  });

  const handlePlayMelody = async (melody: Melody) => {
    if (playingMelodyId) return;
    setPlayingMelodyId(melody.id);
    setSelectedMelodyId(melody.id);
    await playMelodyNotes(melody.notes, (idx) => setActiveNoteIdx(idx));
    setActiveNoteIdx(null);
    setPlayingMelodyId(null);
  };

  return (
    <section id="alarm-builder" className="py-24 bg-[#023047] text-white relative overflow-hidden border-b border-white/10">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Alarm Editor */}
          <div className="lg:col-span-6 liquid-glass-dark p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {t.cardTitle}
              </span>
              <span className="text-xs text-[#ffb703] font-mono font-semibold">
                {t.scheduledText} {alarmTime} AM
              </span>
            </div>

            {/* Time Picker Display */}
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-2">
                {t.timeLabel}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="time"
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xl font-bold font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#219ebc]"
                />
                <input
                  type="text"
                  value={alarmLabel}
                  onChange={(e) => setAlarmLabel(e.target.value)}
                  placeholder="Alarm label"
                  className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-xs font-medium text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#219ebc]"
                />
              </div>
            </div>

            {/* Repeat Days Selector */}
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-2">
                {t.repeatLabel}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {daysOfWeek.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#ffb703] text-[#023047] shadow-md'
                          : 'liquid-glass text-white/70 hover:text-white'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-white/70">
                  {t.difficultyLabel}
                </label>
                <span className="text-[11px] text-[#8ecae6] font-mono">
                  {difficulty === 'Easy' && '3 Notes - Gentle rising arpeggio'}
                  {difficulty === 'Medium' && '4-5 Notes - Scalar stepping pattern'}
                  {difficulty === 'Hard' && '6 Notes - Interval jumping phrase'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Easy', 'Medium', 'Hard'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setDifficulty(lvl);
                      const match = SAMPLE_MELODIES.find((m) => m.difficulty === lvl);
                      if (match) setSelectedMelodyId(match.id);
                    }}
                    className={`py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      difficulty === lvl
                        ? 'bg-[#ffb703] border-[#ffb703] text-[#023047] shadow-md'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Tolerance Level */}
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-2">
                {t.toleranceLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTolerance('Forgiving')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    tolerance === 'Forgiving'
                      ? 'liquid-glass border-[#8ecae6]/60 shadow-md ring-1 ring-[#8ecae6]/40'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Forgiving (±1.5 st)</div>
                  <div className="text-[11px] text-white/60 mt-0.5">
                    Recommended for groggy mornings
                  </div>
                </button>

                <button
                  onClick={() => setTolerance('Strict')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    tolerance === 'Strict'
                      ? 'liquid-glass border-[#8ecae6]/60 shadow-md ring-1 ring-[#8ecae6]/40'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Strict (±0.8 st)</div>
                  <div className="text-[11px] text-white/60 mt-0.5">
                    High precision for musicians
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Predefined Melody Library Explorer */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit',sans-serif]">
                  {t.libraryTitle}
                </h3>
                <p className="text-xs text-white/60">
                  {t.librarySubtitle}
                </p>
              </div>
              <span className="text-xs font-mono text-[#ffb703] font-bold">
                {t.libraryBadge}
              </span>
            </div>

            <div className="space-y-3">
              {filteredMelodies.map((melody) => {
                const isSelected = selectedMelodyId === melody.id;
                const isPlaying = playingMelodyId === melody.id;

                return (
                  <div
                    key={melody.id}
                    onClick={() => setSelectedMelodyId(melody.id)}
                    className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'liquid-glass border-[#8ecae6]/60 shadow-lg ring-1 ring-[#8ecae6]/30'
                        : 'liquid-glass-dark hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            {melody.name}
                          </span>
                          <span className="text-[11px] font-mono text-[#8ecae6]">
                            {melody.noteCount} notes / {melody.baseKey}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 mt-1">
                          {melody.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayMelody(melody);
                        }}
                        disabled={isPlaying}
                        aria-label={`Play ${melody.name}`}
                        className="w-10 h-10 rounded-full bg-[#ffb703] text-[#023047] hover:bg-[#fb8500] hover:text-white flex items-center justify-center transition-all shrink-0 shadow-md disabled:opacity-50 cursor-pointer active:scale-95"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </button>
                    </div>

                    {/* Note chips */}
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/10">
                      {melody.notes.map((n, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                            isPlaying && activeNoteIdx === idx
                              ? 'bg-[#fb8500] text-white font-bold'
                              : 'bg-white/10 text-white/80'
                          }`}
                        >
                          {n.note}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scientific Audio Optimization Note */}
            <div className="p-4 liquid-glass rounded-2xl text-xs text-white/80">
              <span className="font-bold text-[#ffb703]">{t.acousticNoteTitle}</span>
              <p className="mt-0.5 text-white/70">
                {t.acousticNoteBody}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
