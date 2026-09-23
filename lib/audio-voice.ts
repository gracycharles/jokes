// British Young Female Voice synthesis engine using Web Speech API

export interface VoiceProfile {
  name: string;
  lang: string;
  pitch: number;
  rate: number;
}

export const getBritishFemaleVoice = (): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, pitch: 1.15, rate: 1.02 };
  }

  const voices = window.speechSynthesis.getVoices();

  // Priority order for British female voices
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
      return { voice: match, pitch: 1.15, rate: 1.02 };
    }
  }

  // 2. Try any en-GB voice that contains 'female' or has feminine name
  const anyBritishFemale = voices.find(
    (v) =>
      (v.lang.includes("en-GB") || v.lang.includes("en_GB")) &&
      (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman"))
  );
  if (anyBritishFemale) {
    return { voice: anyBritishFemale, pitch: 1.15, rate: 1.02 };
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
    return { voice: anyEnglishFemale, pitch: 1.15, rate: 1.02 };
  }

  return { voice: voices[0] || null, pitch: 1.18, rate: 1.02 };
};

export const playBritishNarration = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  moodModifier: number = 1.0
): SpeechSynthesisUtterance | null => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return null;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  const { voice, pitch, rate } = getBritishFemaleVoice();
  const utterance = new SpeechSynthesisUtterance(text);

  if (voice) {
    utterance.voice = voice;
  }
  utterance.lang = "en-GB";
  utterance.pitch = Math.min(2.0, pitch * moodModifier);
  utterance.rate = rate;

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = (e) => {
    console.warn("Speech synthesis notice:", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const stopNarration = () => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};
