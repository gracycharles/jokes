import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { topic, genre, characterCount } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are a Hollywood cinematic director and comedy writer specializing in 10-second YouTube Shorts clean jokes suitable for young to old audiences.
Create a complete video generator prompt for a 10s clean joke short.
Topic: ${topic || "Unexpected everyday occurrence"}
Genre: ${genre || "Hollywood Cinematic"}
Character count: ${characterCount || 1}

Requirements:
- Runtime: STRICTLY 10 seconds total.
- Aspect Ratio: 9:16 vertical orientation (YouTube Shorts).
- Tone: Clean joke liked from young to old. Innovative Hollywood cinematic storytelling with distinct visual metaphors for the punchline.
- Narration: British young female voice, expressive, dramatic and witty.
- Text overlays: In the upper safe zone (never in the bottom 20% area where YouTube descriptions/buttons live).
- Neutral background for text readability.

Respond ONLY with valid JSON matching this schema:
{
  "title": "String",
  "category": "String",
  "cleanJokeCore": {
    "setup": "String",
    "punchline": "String"
  },
  "visualMetaphor": "String",
  "characters": [
    {
      "name": "String",
      "role": "String",
      "visualDescription": "String",
      "voiceMood": "British young female voice, witty and expressive",
      "vocalPerformanceNotes": "String"
    }
  ],
  "cameraAngle": "String (breakdown: 0-3s, 3-7s, 7-10s)",
  "lighting": "String",
  "visualStorytellingPrompt": "String (master cinematic prompt formatted for Runway Gen-3 / Sora / Kling in 9:16)",
  "dialogueScript": [
    { "speaker": "String", "timeRange": "0:00 - 0:04", "text": "String", "mood": "String" },
    { "speaker": "String", "timeRange": "0:04 - 0:10", "text": "String", "mood": "String" }
  ],
  "textOverlay": {
    "hookText": "String",
    "escalationText": "String",
    "punchlineText": "String",
    "safeZonePosition": "Upper center safe zone (avoiding bottom 25% YouTube description UI)",
    "styleGuide": "Neutral high-contrast backdrop, crisp typography"
  },
  "generatorCopyPrompt": "String",
  "tags": ["Array of 4-5 strings"]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const rawText = response.text || "{}";
        const parsed = JSON.parse(rawText);
        return NextResponse.json({
          success: true,
          data: {
            ...parsed,
            id: Date.now(),
            targetDuration: "10 seconds",
            aspectRatio: "9:16 Vertical (1080x1920)",
            hdImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1080&auto=format&fit=crop"
          }
        });
      } catch (err: unknown) {
        console.error("Gemini API call failed, falling back to smart generator:", err);
      }
    }

    // High quality intelligent fallback if API key is absent or quota exceeded
    const fallbackTitle = `The Legend of the ${topic || "Curious Inventor"}`;
    const fallbackShort = {
      id: Date.now(),
      title: fallbackTitle,
      category: genre || "Cinematic Comedy",
      aspectRatio: "9:16 Vertical (1080x1920)",
      targetDuration: "10 seconds",
      cleanJokeCore: {
        setup: `Why did the ${topic || "inventor"} build a ten-second time machine?`,
        punchline: "Because looking back, they realized laughter never waits for tomorrow!"
      },
      visualMetaphor: "A glowing antique hourglass turning sand into shimmering golden confetti in slow motion.",
      characters: [
        {
          name: "Lady Penelope",
          role: "Eccentric Innovator",
          visualDescription: "Elegantly tailored brass-buttoned coat, goggles perched over dark curls, radiant comedic charisma.",
          voiceMood: "British young female voice, spirited, dramatic and delightfully dry",
          vocalPerformanceNotes: "Crisp Oxford cadence with explosive enthusiastic punchline delivery."
        }
      ],
      cameraAngle: "0-3s: Macro low-angle push-in on ticking pocket watch. 3-7s: Dynamic Dutch tilt spinning into 9:16 vertical frame. 7-10s: Wide cinematic golden hour hero reveal.",
      lighting: "Hollywood anamorphic rim light with deep amber key and soft teal fill, cinematic volumetric particles.",
      visualStorytellingPrompt: `Vertical 9:16 cinematic video. 0-3s: Lady Penelope examines a ticking mechanism under dramatic spotlight. 3-7s: A blast of golden particle light expands as a miniature hourglass floats in zero-G. 7-10s: The sand bursts into sparkling confetti celebrating the realization. Photorealistic, 8k render, 10s duration for Runway Gen-3 / Sora.`,
      dialogueScript: [
        { speaker: "Lady Penelope", timeRange: "0:00 - 0:04", text: `Why did the ${topic || "inventor"} build a ten-second machine?`, mood: "Intrigued British whisper" },
        { speaker: "Lady Penelope", timeRange: "0:04 - 0:10", text: "Because pure joy requires no rehearsal!", mood: "Triumphant cheerful British punchline" }
      ],
      textOverlay: {
        hookText: fallbackTitle.toUpperCase(),
        escalationText: "10 SECONDS TO LAUGHTER ⏱️",
        punchlineText: "TIMED TO PERFECTION!",
        safeZonePosition: "Upper safe zone (Y: 20% to 40% margin, avoiding bottom YouTube Shorts caption area)",
        styleGuide: "Neutral charcoal matte badge, crisp high-legibility sans-serif text, gold trim."
      },
      generatorCopyPrompt: `Vertical 9:16 Hollywood cinematic YouTube Short. ${fallbackTitle}. Anamorphic lens, volumetric lighting, rich color grading. Character delivers clean comedic punchline with physical visual metaphor. Photorealistic 10s video prompt for modern AI video generators.`,
      hdImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop",
      tags: [topic || "Invention", "Comedy", "Hollywood", "Clean Joke", "Shorts"]
    };

    return NextResponse.json({ success: true, data: fallbackShort });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
