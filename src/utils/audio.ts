// Web Audio tone synthesizer & pitch detection utility

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Frequencies for common notes (A4 = 440Hz)
export const NOTE_FREQUENCIES: Record<string, number> = {
  'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50
};

// Play a single tone with a warm acoustic marimba/flute envelope
export function playTone(freq: number, duration: number = 0.5, type: OscillatorType = 'sine'): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Warm overtone for harmonic clarity (fundamental + subtle 2nd harmonic)
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      const now = ctx.currentTime;
      // Attack: 0.04s, Decay: 0.1s, Sustain: 0.8, Release: 0.15s
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.28, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.20, now + 0.15);
      gain.gain.setValueAtTime(0.20, now + Math.max(0.16, duration - 0.12));
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      overtoneGain.gain.setValueAtTime(0.0001, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.8);

      osc.connect(gain);
      overtone.connect(overtoneGain);
      gain.connect(ctx.destination);
      overtoneGain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);

      osc.stop(now + duration + 0.05);
      overtone.stop(now + duration + 0.05);

      setTimeout(() => {
        resolve();
      }, duration * 1000);
    } catch {
      resolve();
    }
  });
}

// Play a sequence of notes
export async function playMelodyNotes(
  notes: { note: string; freq: number; duration: number }[],
  onNoteStart?: (index: number) => void
): Promise<void> {
  for (let i = 0; i < notes.length; i++) {
    if (onNoteStart) {
      onNoteStart(i);
    }
    await playTone(notes[i].freq, notes[i].duration);
    // Tiny gap between notes
    await new Promise((r) => setTimeout(r, 60));
  }
}

// Autocorrelation pitch detector (browser equivalent of YIN algorithm)
export function autoCorrelate(buf: Float32Array, sampleRate: number): number {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // Noise gate threshold: if signal is too quiet, return -1
  if (rms < 0.015) {
    return -1;
  }

  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }

  const trimmedBuf = buf.slice(r1, r2);
  const c = new Array(trimmedBuf.length).fill(0);
  for (let i = 0; i < trimmedBuf.length; i++) {
    for (let j = 0; j < trimmedBuf.length - i; j++) {
      c[i] = c[i] + trimmedBuf[j] * trimmedBuf[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < trimmedBuf.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;
  if (T0 < 2 || T0 >= trimmedBuf.length - 1) return -1;

  // Parabolic interpolation for fine frequency resolution
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) {
    T0 = T0 - b / (2 * a);
  }

  return sampleRate / T0;
}

// Convert frequency to closest note name and semitone deviation
export function frequencyToNote(freq: number): { note: string; cents: number; semitonesAway: number } {
  if (freq <= 0) return { note: '--', cents: 0, semitonesAway: 0 };
  const noteNum = 12 * (Math.log(freq / 440) / Math.log(2));
  const rounded = Math.round(noteNum) + 69;
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteName = noteNames[rounded % 12];
  const octave = Math.floor(rounded / 12) - 1;
  const cents = Math.floor((noteNum - Math.round(noteNum)) * 100);
  return {
    note: `${noteName}${octave}`,
    cents,
    semitonesAway: Math.abs(noteNum - Math.round(noteNum))
  };
}
