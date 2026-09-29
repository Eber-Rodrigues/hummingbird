export type VocalRangeId = 'soprano' | 'alto' | 'tenor' | 'bass';

export interface VocalRange {
  id: VocalRangeId;
  name: string;
  voiceType: 'Female' | 'Male';
  rangeNote: string;
  frequencyRange: string;
  description: string;
  recommendedKey: string;
  sampleFrequency: number;
}

export interface MelodyNote {
  note: string;
  freq: number;
  duration: number; // in seconds
}

export interface Melody {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  noteCount: number;
  description: string;
  notes: MelodyNote[];
  baseKey: string;
}

export interface AlarmConfig {
  time: string;
  label: string;
  repeatDays: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tolerance: 'Forgiving' | 'Strict';
  melodyId: string;
  enabled: boolean;
}
