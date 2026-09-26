import { ShortPrompt, DEFAULT_SCOTTISH_TAGS } from "./shorts-data";

export interface GeneratePromptParams {
  topic?: string;
  genre?: string;
  characterCount?: number;
}

export function generateShortPromptClient({
  topic = "Unexpected everyday occurrence",
  genre = "Hollywood Cinematic",
  characterCount = 1,
}: GeneratePromptParams): ShortPrompt {
  const cleanTopic = topic.trim() || "Everyday Mystery";
  const id = Date.now();
  const fallbackTitle = `The Legend of the ${cleanTopic}`;

  return {
    id,
    title: fallbackTitle,
    category: genre || "Hollywood Comedy",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: `Why did the ${cleanTopic.toLowerCase()} decide to take a 10-second pause?`,
      punchline: "Because timing is everything when making everyone smile!",
    },
    visualMetaphor: `A glowing, high-contrast visual metaphor of ${cleanTopic} turning into a burst of golden cinematic confetti in slow motion.`,
    characters: [
      {
        name: "Lady Penelope",
        role: "Lead Storyteller",
        visualDescription: "Elegantly styled British creator with witty comedic charisma.",
        voiceMood: "British young female voice, witty, expressive, dramatic",
        vocalPerformanceNotes: "Crisp Oxford cadence with cheerful, well-timed punchline delivery.",
      },
    ],
    cameraAngle: `[CONTINUOUS 10S TAKE] 0.0s-3.5s: Smooth low-angle push-in establishing ${cleanTopic} in unbroken 9:16 framing. 3.5s-6.5s: Seamless tracking sweep following the action. 6.5s-10.0s: Golden hour pedestal tilt locking onto the punchline payoff.`,
    lighting: "Hollywood anamorphic rim lighting with warm key light, uniform shadow continuity, and subtle volumetric particles.",
    visualStorytellingPrompt: `[UNBROKEN 10-SECOND SINGLE TAKE - 9:16 VERTICAL] 0.0s-3.5s: In a continuous medium frame, establish Lady Penelope and ${cleanTopic} under dramatic cinematic lighting. 3.5s-6.5s: Without cutting or scene jumping, camera smoothly glides closer as ${cleanTopic} turns into a burst of golden cinematic confetti in slow motion. 6.5s-10.0s: In the same unbroken scene space, Lady Penelope delivers the triumphant punchline with charming comedic timing. Photorealistic 8K render, 100% subject persistence, zero jump cuts.`,
    dialogueScript: [
      {
        speaker: "Lady Penelope",
        timeRange: "0:00 - 0:03.5",
        text: `Why did the ${cleanTopic.toLowerCase()} take a 10-second pause?`,
        mood: "Intrigued British whisper",
      },
      {
        speaker: "Lady Penelope",
        timeRange: "0:04.5 - 0:10.0",
        text: "Because timing is everything when making everyone smile!",
        mood: "Cheerful triumphant British punchline",
      },
    ],
    textOverlay: {
      hookText: fallbackTitle.toUpperCase(),
      escalationText: "10 SECONDS TO LAUGHTER ⏱️",
      punchlineText: "TIMED TO PERFECTION!",
      safeZonePosition: "Upper safe zone (Y: 20% to 40% margin, avoiding bottom YouTube Shorts caption area)",
      styleGuide: "Neutral charcoal matte badge, crisp high-legibility sans-serif text, gold trim.",
    },
    generatorCopyPrompt: `[CONTINUOUS SINGLE-TAKE 10s 9:16 CINEMATIC SHOT — ZERO JUMP CUTS, HIGH TEMPORAL STABILITY] Establishing ${fallbackTitle} in rich ${genre} cinematography. 0.0s-3.5s: Lady Penelope grounded in setting with setup dialogue. 3.5s-6.5s: Smooth unbroken tracking motion as golden confetti particles expand. 6.5s-10.0s: Direct physical comedic punchline payoff with consistent character identity, uniform lighting, and sharp focus. Masterful 8K photorealistic render for Runway Gen-3 / Sora / Kling / Luma.`,
    hdImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop",
    tags: Array.from(
      new Set([
        ...DEFAULT_SCOTTISH_TAGS,
        cleanTopic,
        "Comedy",
        "Hollywood",
        "Clean Joke"
      ])
    ),
  };
}
