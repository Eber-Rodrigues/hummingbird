import { VocalRange, Melody } from '../types';
import { NOTE_FREQUENCIES } from '../utils/audio';

export const VOCAL_RANGES: VocalRange[] = [
  {
    id: 'soprano',
    name: 'Soprano',
    voiceType: 'Female',
    rangeNote: 'C4 - A5',
    frequencyRange: '261 Hz - 880 Hz',
    description: 'Higher female register. Melodies are transposed to bright, comfortable mid-high keys without forced head-voice strain.',
    recommendedKey: 'Key of C / G Major',
    sampleFrequency: NOTE_FREQUENCIES['E5']
  },
  {
    id: 'alto',
    name: 'Alto',
    voiceType: 'Female',
    rangeNote: 'F3 - D5',
    frequencyRange: '174 Hz - 587 Hz',
    description: 'Lower, warm female register. Melodies centered around comfortable chest-voice frequencies so morning hums are effortless.',
    recommendedKey: 'Key of F / A Minor',
    sampleFrequency: NOTE_FREQUENCIES['A4']
  },
  {
    id: 'tenor',
    name: 'Tenor',
    voiceType: 'Male',
    rangeNote: 'C3 - A4',
    frequencyRange: '130 Hz - 440 Hz',
    description: 'Higher male register. Melodies avoid deep vocal fry and allow natural melodic contour without morning vocal constriction.',
    recommendedKey: 'Key of D / G Major',
    sampleFrequency: NOTE_FREQUENCIES['D4']
  },
  {
    id: 'bass',
    name: 'Bass',
    voiceType: 'Male',
    rangeNote: 'E2 - C4',
    frequencyRange: '82 Hz - 261 Hz',
    description: 'Deep resonant male register. Optimized for natural low-register resonance without requiring falsetto or pitch over-extension.',
    recommendedKey: 'Key of E / A Minor',
    sampleFrequency: NOTE_FREQUENCIES['G3']
  }
];

export const SAMPLE_MELODIES: Melody[] = [
  {
    id: 'melody-dawn',
    name: 'Morning Arpeggio',
    difficulty: 'Easy',
    noteCount: 3,
    description: 'A classic rising triad that gently guides your vocal cords into waking alignment.',
    baseKey: 'C Major',
    notes: [
      { note: 'C4', freq: NOTE_FREQUENCIES['C4'], duration: 0.55 },
      { note: 'E4', freq: NOTE_FREQUENCIES['E4'], duration: 0.55 },
      { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.75 }
    ]
  },
  {
    id: 'melody-sparrow',
    name: 'Brisk Sparrow',
    difficulty: 'Easy',
    noteCount: 3,
    description: 'Three alternating stepping tones designed for quick melodic recognition upon waking.',
    baseKey: 'G Major',
    notes: [
      { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.5 },
      { note: 'A4', freq: NOTE_FREQUENCIES['A4'], duration: 0.5 },
      { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.7 }
    ]
  },
  {
    id: 'melody-sunrise',
    name: 'Sunrise Step',
    difficulty: 'Medium',
    noteCount: 4,
    description: 'A cheerful stepwise scalar pattern stimulating active pitch differentiation.',
    baseKey: 'F Major',
    notes: [
      { note: 'C4', freq: NOTE_FREQUENCIES['C4'], duration: 0.45 },
      { note: 'E4', freq: NOTE_FREQUENCIES['E4'], duration: 0.45 },
      { note: 'F4', freq: NOTE_FREQUENCIES['F4'], duration: 0.45 },
      { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.65 }
    ]
  },
  {
    id: 'melody-cascade',
    name: 'Harmonic Cascade',
    difficulty: 'Medium',
    noteCount: 5,
    description: 'A five-note balanced phrase combining ascending jump and smooth stepwise descent.',
    baseKey: 'A Minor',
    notes: [
      { note: 'C4', freq: NOTE_FREQUENCIES['C4'], duration: 0.4 },
      { note: 'E4', freq: NOTE_FREQUENCIES['E4'], duration: 0.4 },
      { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.4 },
      { note: 'F4', freq: NOTE_FREQUENCIES['F4'], duration: 0.4 },
      { note: 'E4', freq: NOTE_FREQUENCIES['E4'], duration: 0.65 }
    ]
  },
  {
    id: 'melody-hummingbird',
    name: 'Flight of the Hummingbird',
    difficulty: 'Hard',
    noteCount: 6,
    description: 'Six distinct interval steps requiring attentive auditory recall and sustained vocal control.',
    baseKey: 'Pentatonic',
    notes: [
      { note: 'C4', freq: NOTE_FREQUENCIES['C4'], duration: 0.38 },
      { note: 'D4', freq: NOTE_FREQUENCIES['D4'], duration: 0.38 },
      { note: 'E4', freq: NOTE_FREQUENCIES['E4'], duration: 0.38 },
      { note: 'G4', freq: NOTE_FREQUENCIES['G4'], duration: 0.38 },
      { note: 'A4', freq: NOTE_FREQUENCIES['A4'], duration: 0.38 },
      { note: 'C5', freq: NOTE_FREQUENCIES['C5'], duration: 0.65 }
    ]
  }
];
