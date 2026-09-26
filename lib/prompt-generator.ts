import { ShortPrompt } from "./shorts-data";

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
    cameraAngle: "0-3s: Low-angle dramatic push-in. 3-7s: Dynamic 9:16 vertical sweep. 7-10s: Wide cinematic golden hour hero reveal.",
    lighting: "Hollywood anamorphic rim lighting with warm key light and subtle volumetric particles.",
    visualStorytellingPrompt: `Vertical 9:16 cinematic scene. 0-3s: Close-up on ${cleanTopic} under dramatic spotlight. 3-7s: Particle light expands in 9:16 frame. 7-10s: Hero reveal with golden light. Photorealistic 8k render, 10s duration for Runway Gen-3 / Sora.`,
    dialogueScript: [
      {
        speaker: "Lady Penelope",
        timeRange: "0:00 - 0:04",
        text: `Why did the ${cleanTopic.toLowerCase()} take a 10-second pause?`,
        mood: "Intrigued British whisper",
      },
      {
        speaker: "Lady Penelope",
        timeRange: "0:04 - 0:10",
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
    generatorCopyPrompt: `Vertical 9:16 Hollywood cinematic YouTube Short. ${fallbackTitle}. Anamorphic lens, volumetric lighting, rich color grading. Character delivers clean comedic punchline with physical visual metaphor. Photorealistic 10s video prompt for modern AI video generators.`,
    hdImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop",
    tags: [cleanTopic, "Comedy", "Hollywood", "Clean Joke", "Shorts"],
  };
}
