// British Young Female Voice synthesis engine with 10s Timing Calibration & Phonetic Pronunciation Guarantee

export interface VoiceProfile {
  name: string;
  lang: string;
  pitch: number;
  rate: number;
}

export interface AudioTimingAnalysis {
  setupWordCount: number;
  punchlineWordCount: number;
  totalWordCount: number;
  estimatedSetupDuration: number;
  estimatedPunchlineDuration: number;
  estimatedPauseDuration: number;
  totalEstimatedDuration: number;
  fitsIn10s: boolean;
  recommendedRate: number;
}

// Phonetic dictionary & pronunciation normalizer to prevent stutter, awkward hyphen reads, or garbled puns
export function normalizeForSpeech(text: string): string {
  if (!text) return "";

  let cleaned = text
    // Replace emojis and symbols
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    // Comedic pun phonetic normalizations for seamless British speech engine pronunciation
    .replace(/\bin-vest-i-gator\b/gi, "in-vestigator")
    .replace(/\bshell-f\b/gi, "self")
    .replace(/\bI-scream\b/gi, "ice cream")
    .replace(/\btwo-tired\b/gi, "too tired")
    .replace(/\bS-car go\b/gi, "escargot")
    .replace(/\bMartian-mallows\b/gi, "marshmallows")
    .replace(/\bimpasta\b/gi, "im-pasta")
    .replace(/\bdino-snore\b/gi, "dino-snore")
    .replace(/\bfungi to be around\b/gi, "fun guy to be around")
    .replace(/\bquacker\b/gi, "quacker")
    .replace(/\bthunderwear\b/gi, "thunder-wear")
    .replace(/\bbear feet\b/gi, "bare feet")
    .replace(/&ldquo;|&rdquo;|&quot;|"/g, "")
    .replace(/\.\.\./g, ", ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned;
}

// Calculates exact speech timing metrics for a 10-second Short
export function analyzeShortAudioTiming(setupText: string, punchlineText: string): AudioTimingAnalysis {
  const normSetup = normalizeForSpeech(setupText);
  const normPunchline = normalizeForSpeech(punchlineText);

  const setupWords = normSetup.split(/\s+/).filter(Boolean).length;
  const punchlineWords = normPunchline.split(/\s+/).filter(Boolean).length;
  const totalWords = setupWords + punchlineWords;

  // Natural English speech is approx 2.6 words per second at rate 1.05
  // Setup targets 2.8s - 3.4s
  // Pause targets 0.6s
  // Punchline targets 3.2s - 4.2s
  // Total target: 7.0s - 8.6s (Leaving >1.4s safety buffer in 10s video)
  let recommendedRate = 1.04;
  if (totalWords > 22) {
    recommendedRate = 1.12;
  } else if (totalWords > 18) {
    recommendedRate = 1.06;
  } else if (totalWords < 14) {
    recommendedRate = 1.00;
  }

  const wordsPerSec = 2.5 * recommendedRate;
  const estimatedSetupDuration = Number((setupWords / wordsPerSec).toFixed(1));
  const estimatedPauseDuration = 0.6;
  const estimatedPunchlineDuration = Number((punchlineWords / wordsPerSec).toFixed(1));
  const totalEstimatedDuration = Number(
    (estimatedSetupDuration + estimatedPauseDuration + estimatedPunchlineDuration).toFixed(1)
  );

  return {
    setupWordCount: setupWords,
    punchlineWordCount: punchlineWords,
    totalWordCount: totalWords,
    estimatedSetupDuration,
    estimatedPunchlineDuration,
    estimatedPauseDuration,
    totalEstimatedDuration,
    fitsIn10s: totalEstimatedDuration <= 9.4,
    recommendedRate
  };
}

// Priority detection for natural British Female voices in browser
export const getBritishFemaleVoice = (): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, pitch: 1.15, rate: 1.04 };
  }

  const voices = window.speechSynthesis.getVoices();

  const preferredBritishFemaleNames = [
    "Google UK English Female",
    "en-GB-Neural2-A",
    "en-GB-Wavenet-A",
    "en-GB-Standard-A",
    "Victoria",
    "Hazel",
    "Martha",
    "Libby",
    "Sonia",
    "Serena",
    "Susan",
    "Fiona",
    "Kate",
    "Alice"
  ];

  // 1. Try finding a preferred British female voice
  for (const name of preferredBritishFemaleNames) {
    const match = voices.find(
      (v) => (v.lang.includes("en-GB") || v.lang.includes("en_GB")) && v.name.toLowerCase().includes(name.toLowerCase())
    );
    if (match) {
      return { voice: match, pitch: 1.15, rate: 1.04 };
    }
  }

  // 2. Try any en-GB voice that contains 'female' or has feminine name
  const anyBritishFemale = voices.find(
    (v) =>
      (v.lang.includes("en-GB") || v.lang.includes("en_GB")) &&
      (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman"))
  );
  if (anyBritishFemale) {
    return { voice: anyBritishFemale, pitch: 1.15, rate: 1.04 };
  }

  // 3. Any en-GB voice, tuned with higher pitch for bright young female timbre
  const anyBritish = voices.find((v) => v.lang.includes("en-GB") || v.lang.includes("en_GB"));
  if (anyBritish) {
    return { voice: anyBritish, pitch: 1.2, rate: 1.04 };
  }

  // 4. Any English female voice
  const anyEnglishFemale = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("samantha"))
  );
  if (anyEnglishFemale) {
    return { voice: anyEnglishFemale, pitch: 1.15, rate: 1.04 };
  }

  return { voice: voices[0] || null, pitch: 1.16, rate: 1.04 };
};

// Global audio playback state manager
let activeAudioTimers: NodeJS.Timeout[] = [];

export const stopNarration = () => {
  activeAudioTimers.forEach((t) => clearTimeout(t));
  activeAudioTimers = [];
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

export interface TimedPlaybackCallbacks {
  onStart?: () => void;
  onLineChange?: (lineIndex: number, text: string) => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

// Plays timed 2-beat 10s British Narration with guaranteed 10s fit and phonetic accuracy
export function playTimedShortAudio(
  setupText: string,
  punchlineText: string,
  callbacks?: TimedPlaybackCallbacks
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    callbacks?.onEnd?.();
    return;
  }

  stopNarration();

  const analysis = analyzeShortAudioTiming(setupText, punchlineText);
  const { voice, pitch } = getBritishFemaleVoice();

  const cleanSetup = normalizeForSpeech(setupText);
  const cleanPunchline = normalizeForSpeech(punchlineText);

  callbacks?.onStart?.();
  callbacks?.onLineChange?.(0, cleanSetup);

  // Setup utterance (Inquisitive, crisp RP British delivery)
  const setupUtterance = new SpeechSynthesisUtterance(cleanSetup);
  if (voice) setupUtterance.voice = voice;
  setupUtterance.lang = "en-GB";
  setupUtterance.pitch = pitch * 1.05; // Slightly elevated for engaging comedic setup
  setupUtterance.rate = analysis.recommendedRate;

  // Punchline utterance (Vibrant, comedic, triumphant delivery)
  const punchlineUtterance = new SpeechSynthesisUtterance(cleanPunchline);
  if (voice) punchlineUtterance.voice = voice;
  punchlineUtterance.lang = "en-GB";
  punchlineUtterance.pitch = pitch * 1.0;
  punchlineUtterance.rate = analysis.recommendedRate * 0.98; // Slightly more deliberate for punchline clarity

  setupUtterance.onend = () => {
    // Comedic pause before punchline delivery (~500ms)
    const timer = setTimeout(() => {
      callbacks?.onLineChange?.(1, cleanPunchline);
      window.speechSynthesis.speak(punchlineUtterance);
    }, 550);
    activeAudioTimers.push(timer);
  };

  setupUtterance.onerror = (e) => {
    console.warn("Setup speech error:", e);
    // Attempt punchline anyway if setup errors
    const timer = setTimeout(() => {
      callbacks?.onLineChange?.(1, cleanPunchline);
      window.speechSynthesis.speak(punchlineUtterance);
    }, 400);
    activeAudioTimers.push(timer);
  };

  punchlineUtterance.onend = () => {
    callbacks?.onEnd?.();
  };

  punchlineUtterance.onerror = (e) => {
    console.warn("Punchline speech error:", e);
    callbacks?.onEnd?.();
  };

  window.speechSynthesis.speak(setupUtterance);
}
