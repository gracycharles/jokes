export interface Character {
  name: string;
  role: string;
  visualDescription: string;
  voiceMood: string;
  vocalPerformanceNotes: string;
}

export interface DialogueLine {
  speaker: string;
  timeRange: string;
  text: string;
  mood: string;
}

export interface ShortPrompt {
  id: number;
  title: string;
  category: string;
  aspectRatio: string;
  targetDuration: string;
  cleanJokeCore: {
    setup: string;
    punchline: string;
  };
  visualMetaphor: string;
  characters: Character[];
  cameraAngle: string;
  lighting: string;
  visualStorytellingPrompt: string;
  dialogueScript: DialogueLine[];
  textOverlay: {
    hookText: string;
    escalationText: string;
    punchlineText: string;
    safeZonePosition: string;
    styleGuide: string;
  };
  generatorCopyPrompt: string;
  hdImage: string;
  tags: string[];
}

export const DEFAULT_SCOTTISH_TAGS: string[] = [
  "Glasgow",
  "Scotland",
  "United Kingdom",
  "UK",
  "Glasgow Scotland",
  "United Kingdom UK",
  "Edinburgh",
  "Edinburgh Scotland",
  "Scotland Facts",
  "Glasgow History",
  "Edinburgh Facts",
  "Visit Scotland",
  "Scottish Humour",
  "Scottish Nostalgia",
  "Scottish History",
  "Shorts"
];

export const DEFAULT_SCOTTISH_HASHTAGS: string[] = [
  "#Glasgow",
  "#Scotland",
  "#UnitedKingdom",
  "#UK",
  "#GlasgowScotland",
  "#Edinburgh",
  "#Shorts",
  "#ScottishHistory"
];

export function getYouTubeTitle(short: ShortPrompt): string {
  const cleanTitle = short.title.replace(/^The\s+/i, "");
  return `${cleanTitle}! 🎬😂 #Shorts`;
}

export function getYouTubeDescription(short: ShortPrompt): string {
  const categoryHashtag = "#" + short.category.replace(/[^a-zA-Z0-9]/g, "");
  const hashtagSet = new Set([
    ...DEFAULT_SCOTTISH_HASHTAGS,
    categoryHashtag,
    "#ScottishHumour",
    "#ScottishNostalgia",
    "#CleanJokes",
    "#Comedy"
  ]);
  const tagsList = Array.from(hashtagSet).join(" ");

  return `${short.cleanJokeCore.setup}
${short.cleanJokeCore.punchline}

━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 10s Hollywood Clean Joke Short: ${short.title}
✨ Visual Metaphor: ${short.visualMetaphor}
🎙️ Audio Voice: British Young Female Voice (Expressive comedic timing)
📐 Format: 9:16 Vertical (1080x1920)
━━━━━━━━━━━━━━━━━━━━━━━━━━

${tagsList}`;
}

export function getYouTubeTags(short: ShortPrompt): string {
  const combined = [
    ...DEFAULT_SCOTTISH_TAGS,
    short.category,
    ...short.tags
  ];

  const seen = new Set<string>();
  const uniqueTags: string[] = [];
  for (const tag of combined) {
    const key = tag.toLowerCase().trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueTags.push(tag.trim());
    }
  }
  return uniqueTags.join(", ");
}

export function getFullVideoGeneratorPrompt(short: ShortPrompt): string {
  return `[VIDEO & AUDIO GENERATION PROMPT - 10s VERTICAL 9:16]
FORMAT: 9:16 Vertical (1080x1920), 10.0 seconds runtime, 30fps.
STYLE: Hollywood cinematic, photorealistic 8k, anamorphic lens, high-contrast color grade.

VISUAL STORYTELLING (10-SECOND BEATS):
${short.visualStorytellingPrompt}

VISUAL METAPHOR:
${short.visualMetaphor}

CAMERA CHOREOGRAPHY:
${short.cameraAngle}

LIGHTING & ATMOSPHERE:
${short.lighting}

CHARACTERS & STYLING:
${short.characters.map((c) => `- ${c.name} (${c.role}): ${c.visualDescription}`).join("\n")}

AUDIO / VOICE SPECIFICATION:
Target Voice: British young female voice, expressive, dramatic comedic timing, crisp RP cadence.
Dialogue Script:
${short.dialogueScript.map((d) => `[${d.timeRange}] ${d.speaker} (${d.mood}): "${d.text}"`).join("\n")}

ON-SCREEN TEXT OVERLAY (UPPER SAFE ZONE 15%-45% Y):
- 0-3s Hook: "${short.textOverlay.hookText}"
- 3-7s Escalation: "${short.textOverlay.escalationText}"
- 7-10s Punchline: "${short.textOverlay.punchlineText}"
- Backdrop: Neutral high-contrast matte container (protects bottom 22% YouTube Shorts UI).`;
}

// 75 Universally Understandable, Clean, Classic & Hollywood Visual Joke Prompts
export const SHORTS_DATABASE: ShortPrompt[] = [
  {
    id: 1,
    title: "The Atom Conspiracy",
    category: "Sci-Fi Cinema",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they literally make up everything!"
    },
    visualMetaphor: "In a high-tech quantum particle accelerator, lab equipment and floating clipboards dissolve into glowing neon pixels that spell out 'WE MAKE UP EVERYTHING'.",
    characters: [
      {
        name: "Dr. Clara Sterling",
        role: "Quantum Physicist",
        visualDescription: "Brilliant young scientist in a sleek cybernetic lab coat and illuminated holographic safety goggles.",
        voiceMood: "British young female voice, witty, intellectual, playfully suspicious",
        vocalPerformanceNotes: "Crisp academic cadence shifting into comedic dramatic revelation."
      }
    ],
    cameraAngle: "0-3s: Vertical macro push-in on glowing atomic sphere. 3-7s: Dynamic Dutch tilt spinning 180°. 7-10s: Wide cinematic laboratory reveal.",
    lighting: "Blade Runner cyber-neon lighting with electric cyan rim lights and glowing magenta particle beams.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: Dr. Clara examines a floating glowing atom in a dark neon lab. 3-7s: The atom multiplies rapidly, assembling into floating coffee mugs and lab tools. 7-10s: The entire room dissolves into sparkling digital confetti as Clara raises an eyebrow. Photorealistic 8K, 10s video.",
    dialogueScript: [
      { speaker: "Dr. Clara", timeRange: "0:00 - 0:04", text: "Never trust an atom in this laboratory...", mood: "Intriguing British whisper" },
      { speaker: "Dr. Clara", timeRange: "0:04 - 0:10", text: "They literally make up everything around us!", mood: "Witty triumphant comedic delivery" }
    ],
    textOverlay: {
      hookText: "WHY SCIENTISTS CAN NEVER TRUST ATOMS ⚛️",
      escalationText: "SCANNING QUANTUM PARTICLES...",
      punchlineText: "THEY LITERALLY MAKE UP EVERYTHING!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Neutral matte container, high-contrast white text, cyan border."
    },
    generatorCopyPrompt: "Vertical 9:16 Hollywood cinematic video. 10 seconds. Female scientist in neon futuristic lab examining glowing atomic spheres. 0-3s push-in, 3-7s atoms transform into floating objects, 7-10s cinematic punchline reveal with holographic text. 8k, photorealistic, cinematic anamorphic lighting.",
    hdImage: "",
    tags: ["SciFi", "Science", "Atoms", "Physics", "CleanJokes", "ViralComedy"]
  },
  {
    id: 2,
    title: "The Outstanding Scarecrow",
    category: "Epic Drama",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why did the scarecrow win an Academy Award?",
      punchline: "Because he was outstanding in his field!"
    },
    visualMetaphor: "A golden wheat field transforms into a red-carpet Hollywood gala where paparazzi crows in miniature tuxedos snap camera flashes as a scarecrow accepts a golden trophy.",
    characters: [
      {
        name: "Lady Barnaby",
        role: "Gala Presenter",
        visualDescription: "Glamorous British presenter holding an envelope in a sunlit golden wheat field.",
        voiceMood: "British young female voice, aristocratic, theatrically prestigious",
        vocalPerformanceNotes: "Oscar ceremony announcer voice with grand theatrical flair."
      }
    ],
    cameraAngle: "0-3s: Cinematic crane shot sweeping through golden wheat stalks. 3-7s: Rapid low-angle tracking shot along red carpet. 7-10s: Hero low-angle pedestal reveal.",
    lighting: "Golden hour sunset with blinding camera flashbulbs and warm volumetric sunbeams.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: Golden wheat field waving in the breeze. 3-7s: A red carpet unrolls between the crops as black crows wearing tuxedos flash vintage cameras. 7-10s: A stylish straw scarecrow in a silk bow tie hoists a sparkling golden award triumphantly. 10s photorealistic video.",
    dialogueScript: [
      { speaker: "Lady Barnaby", timeRange: "0:00 - 0:04", text: "And the Oscar for Lifetime Achievement goes to...", mood: "Grand dramatic pause" },
      { speaker: "Lady Barnaby", timeRange: "0:04 - 0:10", text: "The Scarecrow! For being outstanding in his field!", mood: "Enthusiastic British celebration" }
    ],
    textOverlay: {
      hookText: "THE SCARECROW'S BIG HOLLYWOOD NIGHT 🏆",
      escalationText: "AND THE NOMINEES ARE...",
      punchlineText: "HE WAS OUTSTANDING IN HIS FIELD!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Dark charcoal backdrop, gold foil typography, clean margins."
    },
    generatorCopyPrompt: "Vertical 9:16 Hollywood cinematic video. 10 seconds. Golden wheat field with Oscar red carpet and tuxedo-wearing crows flashing cameras. Elegant scarecrow holding a gold trophy at sunset. 35mm film grain, 8k, cinematic color grade.",
    hdImage: "",
    tags: ["Hollywood", "Scarecrow", "Awards", "CleanHumor", "ViralShorts"]
  },
  {
    id: 3,
    title: "The Exhausted Bicycle",
    category: "Action Blockbuster",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why did the titanium racing bicycle fall over?",
      punchline: "Because it was simply two-tired!"
    },
    visualMetaphor: "A sleek carbon-fiber racing bike screeching around a high-speed Formula 1 corner dramatically pulls a velvet sleeping eye-mask over its handlebars and collapses onto a silk pillow.",
    characters: [
      {
        name: "Gemma Pit-Chief",
        role: "Race Team Director",
        visualDescription: "High-energy race engineer with wireless headset and carbon-fiber clipboard.",
        voiceMood: "British young female voice, urgent, frantic pit-crew energy shifting into warm chuckle",
        vocalPerformanceNotes: "Fast-paced radio transmission into deadpan comedy punchline."
      }
    ],
    cameraAngle: "0-3s: High-speed ground-level tracking shot. 3-7s: 120fps slow-motion drift. 7-10s: Dramatic top-down comedic freeze frame.",
    lighting: "High-octane stadium floodlights reflecting off glossy wet racetrack asphalt.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: A futuristic titanium bicycle speeds down a neon racetrack with roaring engine sounds. 3-7s: Smoke billows from both tires in extreme slow motion. 7-10s: The bicycle sighs, deploys a tiny velvet pillow beneath its kickstand, and flops over peacefully. Photorealistic 8K, 10s video.",
    dialogueScript: [
      { speaker: "Gemma", timeRange: "0:00 - 0:04", text: "Telemetry alert! Why has the bike crashed on turn four?!", mood: "Frantic pit-lane headset urgency" },
      { speaker: "Gemma", timeRange: "0:04 - 0:10", text: "Diagnostics confirmed... it was completely two-tired!", mood: "Cheeky British punchline chuckling" }
    ],
    textOverlay: {
      hookText: "DRAMATIC RACETRACK MALFUNCTION 🚴💨",
      escalationText: "TIRE PRESSURE CRITICAL...",
      punchlineText: "BECAUSE IT WAS TWO-TIRED!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Matte carbon-fiber container, bold yellow race typography."
    },
    generatorCopyPrompt: "Vertical 9:16 Michael Bay action cinematic video. 10 seconds. Sleek racing bicycle speeding on wet neon racetrack, extreme slow-motion tire smoke, bike gracefully falling onto a plush velvet pillow. 8K photorealistic, cinematic camera flare.",
    hdImage: "",
    tags: ["Action", "Bicycle", "Racetrack", "SportsComedy", "Shorts"]
  },
  {
    id: 4,
    title: "The Imposter Pasta",
    category: "Crime Noir",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "What do you call a fake noodle pretending to be authentic?",
      punchline: "An impasta!"
    },
    visualMetaphor: "In a smoky 1940s interrogation room, a gritty detective fork tears off a fake string mustache from a disguised plastic noodle sitting under an interrogation lamp.",
    characters: [
      {
        name: "Detective Miller",
        role: "Pasta Squad Inspector",
        visualDescription: "Sharp 1940s noir detective in a trench coat holding a magnifying glass.",
        voiceMood: "British young female voice, sultry, gritty, deadpan crime thriller",
        vocalPerformanceNotes: "Low atmospheric noir voiceover with sharp punchline delivery."
      }
    ],
    cameraAngle: "0-3s: Moody shadow-drenched side profile. 3-7s: Dramatic overhead table zoom. 7-10s: Extreme close-up on peeling mustache.",
    lighting: "Chiaroscuro high-contrast noir lighting with single tungsten swinging pendant lamp.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: A dark police interrogation room filled with cigarette smoke. 3-7s: A golden bowl of fettuccine sits under a harsh spotlight wearing sunglasses. 7-10s: A silver fork unmasks the noodle, revealing a plastic toy imposter. Film noir aesthetic, 10s video.",
    dialogueScript: [
      { speaker: "Detective Miller", timeRange: "0:00 - 0:04", text: "We've had our eye on this noodle for three weeks...", mood: "Gritty noir whisper" },
      { speaker: "Detective Miller", timeRange: "0:04 - 0:10", text: "He wasn't authentic Italian at all. An absolute impasta!", mood: "Dry British punchline revelation" }
    ],
    textOverlay: {
      hookText: "THE POLICE LINEUP INTERROGATION 🍝🕵️",
      escalationText: "REMOVING THE DISGUISE...",
      punchlineText: "AN ABSOLUTE IMPASTA!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Dark noir matte backing, bold white typewriter font."
    },
    generatorCopyPrompt: "Vertical 9:16 classic film noir cinema. 10 seconds. 1940s police interrogation room, tungsten swinging lamp. Silver fork pulling fake mustache off a plastic noodle imposter in a bowl. 8k, high contrast black-and-amber grading.",
    hdImage: "",
    tags: ["FilmNoir", "Pasta", "Detective", "FoodComedy", "CleanHumor"]
  },
  {
    id: 5,
    title: "The Honeycomb Hair Salon",
    category: "Fantasy Comedy",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why do bees always have sticky, glossy hair?",
      punchline: "Because they only use honeycombs!"
    },
    visualMetaphor: "A bustling miniature Beverly Hills hair salon inside a hollow oak tree where honeybee stylists blow-dry fluffy golden fuzz using combs dripping with glowing golden honey.",
    characters: [
      {
        name: "Queen Beatrice",
        role: "Hive Stylist",
        visualDescription: "Chic bee queen in tiny gold sunglasses holding a miniature hairdryer.",
        voiceMood: "British young female voice, posh, sassy salon director",
        vocalPerformanceNotes: "Vibrant high-fashion British accent with infectious charm."
      }
    ],
    cameraAngle: "0-3s: Macro dolly through oak tree bark. 3-7s: 360° orbital spin around salon chair. 7-10s: Glamour wind-machine hero shot.",
    lighting: "Golden amber backlight with sparkling honey droplets reflecting radiant warm sunshine.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: Camera enters a glowing luxury salon built from golden wax. 3-7s: Bees with fabulous voluminous hair spin in salon chairs. 7-10s: Stylist pulls out a golden honeycomb brush, styling fluffy bumblebee fuzz to perfection. 10s photorealistic macro video.",
    dialogueScript: [
      { speaker: "Queen Beatrice", timeRange: "0:00 - 0:04", text: "Darling, how does every bee in London keep such fabulous volume?", mood: "Posh British salon flair" },
      { speaker: "Queen Beatrice", timeRange: "0:04 - 0:10", text: "Simple, sweetie! We always brush with honeycombs!", mood: "Sparkling sassy British delivery" }
    ],
    textOverlay: {
      hookText: "THE SECRET TO PERFECT BEE HAIR 🐝✨",
      escalationText: "ENTERING THE LUXURY HIVE SALON...",
      punchlineText: "THEY ONLY USE HONEYCOMBS!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Warm honey-tinted matte container, glossy gold text."
    },
    generatorCopyPrompt: "Vertical 9:16 whimsical cinematic video. 10 seconds. Macro luxury bee salon inside glowing golden beehive. Cute bumblebees with fluffy styled hair, golden honeycombs used as hairbrushes, sparkling warm light, 8k resolution.",
    hdImage: "",
    tags: ["Bees", "Nature", "Salon", "CuteAnimals", "FamilyComedy"]
  },
  {
    id: 6,
    title: "The Blushing Tomato",
    category: "Culinary Cinema",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why did the giant heirloom tomato turn bright red?",
      punchline: "Because it saw the salad dressing!"
    },
    visualMetaphor: "A high-fashion Paris runway where a bottle of Italian vinaigrette in a silk dressing gown struts down the catwalk, causing a green tomato in the front row to blush glowing crimson red.",
    characters: [
      {
        name: "Chef Vivienne",
        role: "Fashion Food Critic",
        visualDescription: "Haute-couture fashionista with dramatic oversized sunglasses taking notes.",
        voiceMood: "British young female voice, sophisticated, witty fashion commentator",
        vocalPerformanceNotes: "Elegant runway commentary with delightful comedic gasp."
      }
    ],
    cameraAngle: "0-3s: Runway tracking shot pushing down the catwalk. 3-7s: Quick cut to tomato in audience. 7-10s: Dramatic crimson glow bloom effect.",
    lighting: "High-fashion strobe lights and sparkling crystal chandeliers over a mirrored runway.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: A glittering runway where lettuce and cucumbers applaud. 3-7s: An Italian salad dressing bottle glides down wearing a silk robe. 7-10s: A green tomato in the VIP row gasps and turns glowing bright crimson red with steam puffing from its stem. 10s video.",
    dialogueScript: [
      { speaker: "Chef Vivienne", timeRange: "0:00 - 0:04", text: "Look at the front row! Why has that green tomato turned so scarlet?", mood: "Curious high-fashion whisper" },
      { speaker: "Chef Vivienne", timeRange: "0:04 - 0:10", text: "Because it just caught the salad dressing!", mood: "Witty laughing British punchline" }
    ],
    textOverlay: {
      hookText: "THE MOST EMBARRASSED VEGETABLE EVER 🍅👗",
      escalationText: "RUNWAY CATWALK REVEAL...",
      punchlineText: "BECAUSE IT SAW THE SALAD DRESSING!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Dark charcoal backdrop, ruby red accent trim."
    },
    generatorCopyPrompt: "Vertical 9:16 high fashion culinary video. 10 seconds. Paris runway with vegetables in the audience, vinaigrette bottle walking catwalk, green tomato blushing bright red with steam. 8k photorealistic, cinematic studio lighting.",
    hdImage: "",
    tags: ["Food", "Fashion", "Cooking", "CleanJokes", "Viral"]
  },
  {
    id: 7,
    title: "The Dinosaur Slumber",
    category: "Jurassic Adventure",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "What do you call a sleeping Tyrannosaurus Rex in the jungle?",
      punchline: "A dino-snore!"
    },
    visualMetaphor: "A colossal T-Rex wearing a gigantic polka-dot nightcap snuggled under a canopy of giant ferns, blowing enormous floating dream bubbles that vibrate the Jurassic earth.",
    characters: [
      {
        name: "Dr. Evelyn Drake",
        role: "Jurassic Explorer",
        visualDescription: "Adventurous paleontologist in safari gear with binoculars hiding behind tropical fronds.",
        voiceMood: "British young female voice, whispery David Attenborough nature documentary style",
        vocalPerformanceNotes: "Tense jungle whisper breaking into joyful warm giggle."
      }
    ],
    cameraAngle: "0-3s: Jungle foliage wipe into deep prehistoric clearing. 3-7s: Ground-shaking rumble zoom. 7-10s: Wide comedic reveal of giant nightcap.",
    lighting: "Misty Jurassic moonlight with bioluminescent fireflies illuminating prehistoric mist.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: Explorer peeks through massive prehistoric jungle leaves. 3-7s: The earth shakes with heavy resonant snores. 7-10s: Camera reveals a friendly massive T-Rex sleeping peacefully with a nightcap and teddy bear, snoring floating bubbles. 10s photorealistic video.",
    dialogueScript: [
      { speaker: "Dr. Evelyn", timeRange: "0:00 - 0:04", text: "Careful now... what do you call a ten-ton prehistoric beast sound asleep?", mood: "Hushed suspenseful documentary tone" },
      { speaker: "Dr. Evelyn", timeRange: "0:04 - 0:10", text: "A dino-snore, of course!", mood: "Delighted cheerful British whisper" }
    ],
    textOverlay: {
      hookText: "SURVIVING A SLEEPING JURASSIC MONSTER 🦖💤",
      escalationText: "GROUND VIBRATIONS DETECTED...",
      punchlineText: "IT'S A DINO-SNORE!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Deep jungle green container, bold amber typography."
    },
    generatorCopyPrompt: "Vertical 9:16 Jurassic cinematic video. 10 seconds. Misty prehistoric jungle at night, giant photorealistic T-Rex sleeping with a nightcap, floating glowing bubbles, camera push-in through ferns. 8k, cinematic movie grade.",
    hdImage: "",
    tags: ["Dinosaurs", "Jurassic", "KidsComedy", "Adventure", "Shorts"]
  },
  {
    id: 8,
    title: "The Hospital Cookie",
    category: "Medical Drama",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why was the chocolate chip cookie rushed to the emergency room?",
      punchline: "Because it was feeling so crummy!"
    },
    visualMetaphor: "An intense Grey's Anatomy style hospital hallway where doctors push a giant chocolate chip cookie on a gurney while a tiny biscuit nurse hooks up a glass pitcher of cold milk as an IV drip.",
    characters: [
      {
        name: "Surgeon Sarah",
        role: "Chief Bakery Physician",
        visualDescription: "Intense medical surgeon in blue scrubs and surgical mask running beside the gurney.",
        voiceMood: "British young female voice, intense ER urgency into dry humorous diagnosis",
        vocalPerformanceNotes: "Rapid medical jargon cadence shifting into warm punchline."
      }
    ],
    cameraAngle: "0-3s: Rapid tracking shot running down hospital corridor. 3-7s: Low-angle gurney push. 7-10s: Close-up on heart monitor showing chocolate chip pulses.",
    lighting: "Sterile cool hospital fluorescent lights with warm emergency flashing strobes.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: Doctors rush down a bright hospital corridor pushing a gurney. 3-7s: On the gurney is a warm golden chocolate chip cookie with a thermometer. 7-10s: Doctor checks the chart and declares the cookie is just feeling crummy, administering a glass of cold milk. 10s video.",
    dialogueScript: [
      { speaker: "Surgeon Sarah", timeRange: "0:00 - 0:04", text: "Clear the hallway! What's the patient's condition?!", mood: "High-octane ER panic" },
      { speaker: "Surgeon Sarah", timeRange: "0:04 - 0:10", text: "Doctor, he's losing chips! He's feeling completely crummy!", mood: "Dramatic British medical punchline" }
    ],
    textOverlay: {
      hookText: "CODE RED IN THE BAKERY EMERGENCY ROOM 🍪🚨",
      escalationText: "VITAL SIGNS DROPPING...",
      punchlineText: "BECAUSE HE FELT CRUMMY!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Clean sterile white matte, emergency red border."
    },
    generatorCopyPrompt: "Vertical 9:16 hospital drama cinematic video. 10 seconds. Fast-paced medical hallway, doctors pushing a giant chocolate chip cookie on a gurney, milk IV drip, heart monitor with cookie chips. 8k, cinematic anamorphic lenses.",
    hdImage: "",
    tags: ["Medical", "Baking", "Cookies", "CleanHumor", "ViralVideo"]
  },
  {
    id: 9,
    title: "The Selfish Nacho",
    category: "Western Showdown",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "What do you call a plate of melted cheddar cheese that doesn't belong to you?",
      punchline: "Nacho cheese!"
    },
    visualMetaphor: "A dusty 1880s Wild West saloon showdown where a cowboy tortilla chip in a leather Stetson draws twin salsa pistols to guard a bubbling pot of melted cheese.",
    characters: [
      {
        name: "Sheriff Clementine",
        role: "Frontier Marshal",
        visualDescription: "Tough Western sheriff in duster coat and silver badge squinting under the desert sun.",
        voiceMood: "British young female voice, gritty cowboy western drawl with crisp British clarity",
        vocalPerformanceNotes: "Ennio Morricone spaghetti western grit into triumphant laugh."
      }
    ],
    cameraAngle: "0-3s: Extreme close-up on squinting eyes. 3-7s: Low-angle holster camera move. 7-10s: Wide saloon bar standoff.",
    lighting: "Harsh dusty high-noon desert sunlight through wooden saloon slatted blinds.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: Tumbleweeds roll through a dusty Western saloon. 3-7s: A tortilla chip wearing a sheriff badge stares down rival crackers. 7-10s: The chip slams his hand on the melted cheddar skillet shouting 'That's nacho cheese!'. 10s cinematic video.",
    dialogueScript: [
      { speaker: "Sheriff Clementine", timeRange: "0:00 - 0:04", text: "Keep your hands off that skillet, stranger...", mood: "Low gritty Western threat" },
      { speaker: "Sheriff Clementine", timeRange: "0:04 - 0:10", text: "Because this platter is NACHO cheese!", mood: "Booming triumphant punchline" }
    ],
    textOverlay: {
      hookText: "HIGH NOON AT THE CHIP SALOON 🧀🤠",
      escalationText: "FINGERS ON THE HOLSTER...",
      punchlineText: "THAT'S NACHO CHEESE!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Rustic desert leather backdrop, bold gold Western font."
    },
    generatorCopyPrompt: "Vertical 9:16 Spaghetti Western cinema. 10 seconds. Dusty saloon, cowboy tortilla chip with badge and dual revolvers guarding sizzling skillet of cheddar cheese, intense close-ups, 8k film grain.",
    hdImage: "",
    tags: ["Western", "Nachos", "Cheese", "Cowboys", "FoodComedy"]
  },
  {
    id: 10,
    title: "The Seagull Flight Path",
    category: "Coastal Adventure",
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: "Why do seagulls only fly over the open sea?",
      punchline: "Because if they flew over the bay, they'd be bagels!"
    },
    visualMetaphor: "A majestic Top Gun fighter jet flight squadron of seagulls soaring over breaking ocean waves, suddenly banking away from San Francisco Bay as giant sesame seed bagels hover in the clouds.",
    characters: [
      {
        name: "Flight Commander Piper",
        role: "Seagull Squadron Leader",
        visualDescription: "Aviator pilot with leather jacket and silver sunglasses speaking into cockpit radio.",
        voiceMood: "British young female voice, Top Gun military pilot cool",
        vocalPerformanceNotes: "Radio-filtered cockpit urgency into hilarious tactical punchline."
      }
    ],
    cameraAngle: "0-3s: Cockpit first-person POV soaring above waves. 3-7s: Barrel-roll dynamic horizon tilt. 7-10s: Wide aerial sunset fly-by.",
    lighting: "Glistening ocean sunset with radiant orange and turquoise horizon reflections.",
    visualStorytellingPrompt: "Vertical 9:16 cinema frame. 0-3s: A flock of seagulls flies in precision V-formation like fighter jets over sparkling ocean waters. 3-7s: The radar screen alerts 'ENTERING BAY AREA'. 7-10s: The birds veer hard right to avoid transforming into toasted sesame bagels floating in the sky. 10s video.",
    dialogueScript: [
      { speaker: "Flight Commander Piper", timeRange: "0:00 - 0:04", text: "Squadron alert! Why do we never fly over the bay?", mood: "Crisp tactical flight radio" },
      { speaker: "Flight Commander Piper", timeRange: "0:04 - 0:10", text: "Because if we did, we'd all turn into bagels!", mood: "Laughing British aviation punchline" }
    ],
    textOverlay: {
      hookText: "TOP SECRET SEAGULL FLIGHT PROTOCOL 🌊🦅",
      escalationText: "APPROACHING THE BAY AREA...",
      punchlineText: "BECAUSE THEY'D BE BAGELS!",
      safeZonePosition: "Upper safe zone (15% to 45% Y)",
      styleGuide: "Deep navy ocean container, bright sky-blue typography."
    },
    generatorCopyPrompt: "Vertical 9:16 Top Gun aviation cinematic video. 10 seconds. Seagulls flying like fighter jets over sparkling ocean sunset, radar map, avoiding giant floating golden bagels in clouds, 8k photorealistic.",
    hdImage: "",
    tags: ["Ocean", "Seagulls", "Aviation", "Bagels", "CleanJokes"]
  }
];

// Reusable generator template for Prompts 11 to 75 (guaranteeing full 75 prompts)
interface JokeTemplate {
  title: string;
  category: string;
  setup: string;
  punchline: string;
  metaphor: string;
  hook: string;
  tags: string[];
}

const EXTENDED_JOKES_LIST: JokeTemplate[] = [
  {
    title: "The Computer Cold",
    category: "Cyber Comedy",
    setup: "Why did the high-tech supercomputer catch a bad winter cold?",
    punchline: "Because it left all its Windows open!",
    metaphor: "A glowing blue server room where computer monitors sneeze out pixelated ice crystals while blowing their floppy drives with giant tissues.",
    hook: "SUPERCOMPUTER VIRUS OUTBREAK 💻❄️",
    tags: ["Tech", "Computers", "Windows", "SciFi"]
  },
  {
    title: "The Detective Alligator",
    category: "Crime Mystery",
    setup: "What do you call a cool alligator in a tailored tweed vest?",
    punchline: "An in-vest-i-gator!",
    metaphor: "A foggy London street where a suave alligator in a Sherlock Holmes tweed vest and deerstalker pipe examines clues with a giant magnifying glass.",
    hook: "SCOTLAND YARD'S WILDEST DETECTIVE 🐊🔍",
    tags: ["Mystery", "Animals", "London", "Sherlock"]
  },
  {
    title: "The Sad Math Book",
    category: "Academic Cinema",
    setup: "Why did the calculus textbook look so terribly sad and depressed?",
    punchline: "Because it had far too many problems of its own!",
    metaphor: "In an ancient grand library, a massive leatherbound math textbook cries tears of glowing quadratic equations into a cup of chamomile tea.",
    hook: "THE MOST EMOTIONAL BOOK IN THE LIBRARY 📚😭",
    tags: ["Math", "School", "Library", "Comedy"]
  },
  {
    title: "The Golfer's Spare Pants",
    category: "Sports Comedy",
    setup: "Why did the championship golfer wear two pairs of trousers to the tournament?",
    punchline: "Just in case he got a hole in one!",
    metaphor: "A dramatic final putt on the 18th green where an ecstatic golfer sinks the shot, and fireworks shoot out of his spare plaid trousers.",
    hook: "THE SECRET GOLF TOURNAMENT STRATEGY ⛳👖",
    tags: ["Golf", "Sports", "Fashion", "Tournament"]
  },
  {
    title: "The Penguin Icebreaker",
    category: "Arctic Adventure",
    setup: "How does a master architect penguin build his winter home?",
    punchline: "He igloos it together with ice-cold precision!",
    metaphor: "In a shimmering Antarctic wonderland, tuxedo penguins with tiny blueprints use glowing ice mortars to snap together crystal igloo castles.",
    hook: "ANTARCTIC ARCHITECTURE SECRETS 🐧❄️",
    tags: ["Penguins", "Arctic", "Winter", "CuteAnimals"]
  },
  {
    title: "The Anti-Gravity Bestseller",
    category: "Sci-Fi Fantasy",
    setup: "Why was the new book about anti-gravity an instant worldwide bestseller?",
    punchline: "Because it was literally impossible to put down!",
    metaphor: "A cozy bookstore where a floating glowing book pulls the reader right up to the ceiling as pages flip autonomously in zero-gravity.",
    hook: "THE BOOKSTORE'S ZERO-G EXPERIMENT 📖🚀",
    tags: ["Books", "SciFi", "Magic", "Space"]
  },
  {
    title: "The Time Flying Clock",
    category: "Time Travel",
    setup: "Why did the quirky inventor throw her antique grandfather clock out the window?",
    punchline: "Because she simply wanted to see time fly!",
    metaphor: "A Victorian clock sprouts mechanical brass eagle wings, sonic-booming through the London sky leaving trails of glittering clock hands.",
    hook: "HOW TO MAKE TIME REALLY FLY ⏰🦅",
    tags: ["Steampunk", "TimeTravel", "Inventions", "London"]
  },
  {
    title: "The Musical Fish",
    category: "Undersea Symphony",
    setup: "What kind of soundtrack music should you play while fishing in the deep ocean?",
    punchline: "Something extremely catchy!",
    metaphor: "A deep coral reef disco where dolphins and tuna wearing glitter headphones dance to glowing neon fishing lures pulsing with bass.",
    hook: "UNDERWATER DISCO CONCERT 🐠🎵",
    tags: ["Ocean", "Music", "Fish", "Party"]
  },
  {
    title: "The Skeleton Battle",
    category: "Halloween Cinema",
    setup: "Why will you never see two skeletons fight each other in a duel?",
    punchline: "Because they just don't have the guts!",
    metaphor: "A dramatic medieval castle courtyard where two knight skeletons raise swords, realize their ribcages are empty, and clink ribs for a high-five.",
    hook: "THE SKELETON KNIGHT STANDOFF 💀⚔️",
    tags: ["Halloween", "Skeletons", "Knights", "Medieval"]
  },
  {
    title: "The Elevator Career",
    category: "Corporate Satire",
    setup: "Why was the glass skyscraper elevator so satisfied with its career?",
    punchline: "Because its job was truly uplifting on every single level!",
    metaphor: "A hyper-speed glass elevator rocketing up a golden skyscraper with party lights, confetti cannons, and disco balls on every floor.",
    hook: "THE WORLD'S HAPPIEST ELEVATOR 🛗✨",
    tags: ["Architecture", "City", "Career", "Comedy"]
  },
  {
    title: "The Falling Autumn Tree",
    category: "Nature Comedy",
    setup: "What did the romantic oak tree whisper to the maple tree in October?",
    punchline: "Leaf me alone, I'm already falling for you!",
    metaphor: "A cinematic autumn forest where golden leaves form giant heart shapes and drift in slow-motion between two blushing oak trees.",
    hook: "AUTUMN LOVE STORY IN THE FOREST 🍁❤️",
    tags: ["Autumn", "Nature", "Forest", "Romance"]
  },
  {
    title: "The Astronaut Party",
    category: "Cosmic Cinema",
    setup: "How do NASA astronauts organize the greatest dance party in outer space?",
    punchline: "They planet months in advance!",
    metaphor: "Astronauts floating around a disco-ball Saturn with rings spinning neon beats while Earth and Mars dance in cosmic alignment.",
    hook: "THE GREATEST PARTY IN THE GALAXY 🪐🎉",
    tags: ["Space", "NASA", "Planets", "Astronauts"]
  },
  {
    title: "The Mugged Coffee",
    category: "Morning Comedy",
    setup: "Why did the steaming espresso cup rush to the precinct to file a report?",
    punchline: "Because it got completely mugged!",
    metaphor: "A ceramic coffee cup wearing a detective fedora drinking cream while showing the police a picture of a giant porcelain mug suspect.",
    hook: "COFFEE SHOP CRIME SCENE ☕🚨",
    tags: ["Coffee", "Breakfast", "Morning", "Detective"]
  },
  {
    title: "The Dedicated Postage Stamp",
    category: "Mail Adventure",
    setup: "Why was the little royal postage stamp so successful in life?",
    punchline: "Because it always stuck to one thing until it reached its destination!",
    metaphor: "A miniature royal stamp with a jetpack clinging bravely to an envelope flying through thunderous clouds to land in a palace mailbox.",
    hook: "THE MOST DETERMINED HERO EVER 📮🚀",
    tags: ["Mail", "Adventure", "Inspiration", "Cute"]
  },
  {
    title: "The Spotted Cheetah",
    category: "Savannah Comedy",
    setup: "Why are wild cheetahs notoriously awful at playing hide-and-seek?",
    punchline: "Because they are always spotted!",
    metaphor: "A stylish cheetah trying to hide behind a tiny blade of savannah grass while high-tech searchlights instantly pinpoint every glowing polka-dot spot.",
    hook: "THE WORST HIDE AND SEEK PLAYER 🐆👀",
    tags: ["Safari", "Animals", "Savannah", "Gaming"]
  },
  {
    title: "The Wise Duck",
    category: "School Comedy",
    setup: "What do you call an Oxford duck that graduates at the top of her class?",
    punchline: "A real wise quacker!",
    metaphor: "A grand Oxford graduation hall where a white duck in a mortarboard cap quacks an eloquent speech as professors give a standing ovation.",
    hook: "VALEDICTORIAN DUCK SPEECH 🦆🎓",
    tags: ["School", "Graduation", "Oxford", "CuteAnimals"]
  },
  {
    title: "The Locked-Out Piano",
    category: "Music Cinema",
    setup: "Why was the grand concert piano stranded outside in the rain?",
    punchline: "Because all of its keys were locked on the inside!",
    metaphor: "A shiny black Steinway piano knocking on a concert hall door with a golden key ring while 88 piano keys giggle inside the lid.",
    hook: "CONCERT HALL PIANO LOCKOUT 🎹🔑",
    tags: ["Music", "Piano", "Concert", "Theater"]
  },
  {
    title: "The Bright Battery",
    category: "Energy Comedy",
    setup: "Why was the pocket flashlight always in such a remarkably good mood?",
    punchline: "Because it was fully charged with bright positive ideas!",
    metaphor: "A gold-plated battery glowing with electric rainbow sparks, projecting holographic light bulbs that illuminate an entire dark stadium.",
    hook: "THE MOST ENERGETIC BATTERY EVER 🔋💡",
    tags: ["Energy", "Tech", "Gadgets", "Positive"]
  },
  {
    title: "The Dancing Coconut",
    category: "Tropical Cinema",
    setup: "Why did the tropical coconut enroll in Royal Ballet school?",
    punchline: "To dramatically improve its shell-f confidence!",
    metaphor: "A coconut in a pink satin tutu performing a flawless pirouette atop a palm tree while tropical parrots toss flower bouquets.",
    hook: "BALLET DANCER OF THE TROPICS 🥥🩰",
    tags: ["Tropical", "Ballet", "Dancing", "Island"]
  },
  {
    title: "The Spacebar Key",
    category: "Sci-Fi Comedy",
    setup: "What is an astronaut's absolute favorite button on the computer keyboard?",
    punchline: "The spacebar, of course!",
    metaphor: "A mechanical keyboard where pressing the spacebar launches a miniature Apollo rocket with smoke and thrusters directly into orbit.",
    hook: "LAUNCHING FROM THE KEYBOARD ⌨️🚀",
    tags: ["Space", "Computers", "Gaming", "Shorts"]
  },
  {
    title: "The Oscar Onion",
    category: "Culinary Drama",
    setup: "Why did the master chef burst into dramatic tears while slicing an onion?",
    punchline: "Because the onion gave an Oscar-winning dramatic performance!",
    metaphor: "A purple red onion holding a dramatic theater mask under a spotlight, bowing gracefully as five-star Michelin chefs weep with applause.",
    hook: "AN OSCAR WINNING ONION 🧅🎭",
    tags: ["Cooking", "Chef", "Theater", "Drama"]
  },
  {
    title: "The Tennis Racket",
    category: "Wimbledon Action",
    setup: "Why is professional tennis considered such a loud, boisterous sport?",
    punchline: "Because every single player raises an enormous racket!",
    metaphor: "Center Court at Wimbledon where a tennis racket amplifies sound like a stadium rock concert guitar with neon soundwaves bursting into the sky.",
    hook: "THE LOUDEST SPORT ON EARTH 🎾🎸",
    tags: ["Tennis", "Wimbledon", "Sports", "Rock"]
  },
  {
    title: "The Labracadabrador",
    category: "Magic Pets",
    setup: "What do you call a golden retriever puppy who graduates from wizard school?",
    punchline: "A Labracadabrador!",
    metaphor: "A fluffy golden retriever puppy in a starry wizard hat waving a magic stick wand, making flying tennis balls appear out of thin air.",
    hook: "MEET THE WIZARD PUPPY 🐕✨",
    tags: ["Dogs", "Magic", "CutePets", "Wizard"]
  },
  {
    title: "The Snowman's Bank",
    category: "Winter Wonderland",
    setup: "Where do wealthy snowmen store all their frozen gold and cash?",
    punchline: "In the local snowbank!",
    metaphor: "A sparkling Swiss alpine village where a top-hat snowman enters an ornate ice vault counting icicle coins and snowy banknotes.",
    hook: "INSIDE THE SNOWMAN'S VAULT ⛄💰",
    tags: ["Winter", "Snowman", "Money", "Holidays"]
  },
  {
    title: "The Polite Volcano",
    category: "Epic Nature",
    setup: "What did the Hawaiian volcano roar to the neighboring mountain?",
    punchline: "I lava you with all my volcanic heart!",
    metaphor: "A majestic volcano erupting sparkling heart-shaped pink lava fireworks into the starry night sky over the Pacific ocean.",
    hook: "THE WORLD'S WARMEST LOVE LETTER 🌋❤️",
    tags: ["Volcano", "Hawaii", "Nature", "Love"]
  },
  {
    title: "The Watchmaker's Holiday",
    category: "Steampunk Cinema",
    setup: "Why did the Swiss watchmaker take an extended tropical holiday?",
    punchline: "To unwind and give himself a few second chances!",
    metaphor: "A gold mechanical pocket watch opening on a sunny beach lounger, sipping a coconut mocktail while gears spin peacefully in the breeze.",
    hook: "THE WATCHMAKER'S SECRET RETREAT ⏱️🏖️",
    tags: ["Steampunk", "Watches", "Vacation", "Relax"]
  },
  {
    title: "The Ghost Elevator",
    category: "Haunted Comedy",
    setup: "Why do Victorian mansion ghosts always insist on riding the elevator?",
    punchline: "Because it always lifts their supernatural spirits!",
    metaphor: "A spooky gothic elevator where friendly floating translucent ghosts float upward with glowing party hats and floating tea sets.",
    hook: "THE HAUNTED ELEVATOR RIDE 👻🛗",
    tags: ["Ghosts", "Haunted", "Halloween", "Fun"]
  },
  {
    title: "The Sharp Pencil",
    category: "Studio Art",
    setup: "Why did the graphite pencil erase all of its past drawing errors?",
    punchline: "Because it was determined to always stay sharp!",
    metaphor: "A pencil doing martial arts flips on a sketchpad, sharpening its tip with laser precision and drawing a photorealistic masterpiece.",
    hook: "TRAINING OF A MASTER PENCIL ✏️🥋",
    tags: ["Art", "Drawing", "Pencil", "Animation"]
  },
  {
    title: "The Hungry February",
    category: "Calendar Comedy",
    setup: "Why was the month of February always feeling so hungry and rushed?",
    punchline: "Because its days were always strictly numbered!",
    metaphor: "A giant wall calendar where day 28 sprint-finishes across a marathon finish line into March with confetti cheering crowds.",
    hook: "THE SHORTEST MONTH'S MARATHON 📅🏃",
    tags: ["Calendar", "Time", "Winter", "Humor"]
  },
  {
    title: "The Cloud's Thunderwear",
    category: "Weather Cinema",
    setup: "What does a stormy thundercloud wear underneath its rainy coat?",
    punchline: "Its finest pair of thunderwear!",
    metaphor: "A smiling storm cloud opening its rain trench coat to reveal glowing golden lightning-bolt boxer shorts lighting up the sky.",
    hook: "WHAT'S UNDER THE STORM CLOUD? ☁️⚡",
    tags: ["Weather", "Rain", "Sky", "Cartoon"]
  },
  {
    title: "The Racing Snail",
    category: "Formula Snail",
    setup: "Why did the ambitious garden snail paint a giant 'S' on his sports car?",
    punchline: "So everyone on the track would shout, 'Look at that S-car go!'",
    metaphor: "A tiny snail driving a miniature red Ferrari hitting nitro thrusters and zooming past astonished cheetahs on a Grand Prix track.",
    hook: "THE FASTEST SNAIL IN HISTORY 🐌🏎️",
    tags: ["Racing", "Cars", "Snails", "Speed"]
  },
  {
    title: "The School of Fish",
    category: "Ocean Academy",
    setup: "Why did the little clownfish stay after class for extra study hours?",
    punchline: "Because she wanted to swim with the highest current affairs!",
    metaphor: "An underwater coral classroom where baby clownfish in graduation caps write with squids on seashell chalkboards.",
    hook: "TOP OF THE REEF CLASSROOM 🐠📚",
    tags: ["Ocean", "Fish", "School", "Kids"]
  },
  {
    title: "The Banana Clinic",
    category: "Fruit Comedy",
    setup: "Why did the yellow banana book an appointment with the doctor?",
    punchline: "Because it was simply not peeling very well!",
    metaphor: "A cheerful banana sitting on a doctor's examination table in a warm yellow sweater sipping lemon tea.",
    hook: "THE BANANA'S CHECKUP 🍌🩺",
    tags: ["Fruit", "Health", "Doctor", "KidsComedy"]
  },
  {
    title: "The Twelve-Inch Nose",
    category: "Body Comedy",
    setup: "Why can a human nose never be twelve inches long?",
    punchline: "Because then it would literally be a foot!",
    metaphor: "A funny cartoon sketch where a Pinocchio nose stretches out, turns into a tap-dancing leather shoe, and starts rhythmically dancing.",
    hook: "THE 12-INCH NOSE MYSTERY 👃👞",
    tags: ["Cartoon", "Fun", "Magic", "Dance"]
  },
  {
    title: "The Dinghy Boat",
    category: "Nautical Cinema",
    setup: "Why did the wooden fishing boat pull into the harbor for a quick afternoon nap?",
    punchline: "Because it was feeling a little dinghy!",
    metaphor: "A cute wooden boat pulling up a blue ocean blanket in a calm turquoise bay, rocking gently as seagulls sing lullabies.",
    hook: "THE SLEEPY FISHING BOAT ⛵💤",
    tags: ["Boats", "Ocean", "Calm", "Cute"]
  },
  {
    title: "The Detective Shoe",
    category: "Shoe Mystery",
    setup: "What did the master detective shoe declare at the crime scene?",
    punchline: "I have sole custody of this entire investigation!",
    metaphor: "A leather oxford dress shoe wearing a fedora looking at muddy footprints with a glowing ultraviolet flashlight in the rain.",
    hook: "THE DETECTIVE WITH SOLE 👞🔍",
    tags: ["Shoes", "Mystery", "Detective", "Noir"]
  },
  {
    title: "The Over-Swept Broom",
    category: "Cleaning Comedy",
    setup: "Why was the magic broom twenty minutes late for its morning shift?",
    punchline: "Because it completely over-swept!",
    metaphor: "A magic broom sleeping in a cozy broom closet with a tiny eye mask while alarm clocks ring frantically around it.",
    hook: "WHEN THE MAGIC BROOM SLEEPS IN 🧹⏰",
    tags: ["Magic", "Home", "Broom", "Morning"]
  },
  {
    title: "The Pouch Potato",
    category: "Outback Adventure",
    setup: "What do you call a baby kangaroo who refuses to hop out of the pouch all day?",
    punchline: "A real pouch potato!",
    metaphor: "An Australian outback scene where a joey sits in his mother's pouch with a miniature TV and bowl of eucalyptus popcorn.",
    hook: "THE LAZIEST KANGAROO IN AUSTRALIA 🦘🍿",
    tags: ["Kangaroo", "Australia", "Animals", "Cute"]
  },
  {
    title: "The Meteorite Sandwich",
    category: "Space Culinary",
    setup: "Why did the cosmic astronaut wrap two slices of sourdough around the asteroid?",
    punchline: "To create a magnificent meteorite sandwich!",
    metaphor: "Astronaut in orbit slicing a giant glowing asteroid like roast beef between two giant bakery buns floating over the Earth.",
    hook: "THE MOST MASSIVE LUNCH IN THE UNIVERSE 🥪☄️",
    tags: ["Space", "Food", "Astronaut", "Epic"]
  },
  {
    title: "The Barefoot Bears",
    category: "Forest Wildlife",
    setup: "Why will you never see grizzly bears wearing hiking boots in the national park?",
    punchline: "Because they strictly prefer walking around with bear feet!",
    metaphor: "A group of cheerful brown bears walking along a sunny mountain trail admiring their giant fuzzy paws with pedometers ticking.",
    hook: "WHY BEARS DON'T WEAR BOOTS 🐻🐾",
    tags: ["Bears", "Wildlife", "Forest", "Hiking"]
  },

  // 25 BRAND NEW HIGH-IMPACT PROMPTS (51 to 75)
  {
    title: "The Pirate's Alphabet",
    category: "High Seas Adventure",
    setup: "What is a legendary pirate captain's true favorite letter of the alphabet?",
    punchline: "You'd think it be R, but his true love always be the C!",
    metaphor: "A pirate captain on the bow of a galleon steering toward a giant glowing emerald ocean shaped like a gigantic crystalline letter 'C'.",
    hook: "THE PIRATE CAPTAIN'S TRUE LOVE 🏴‍☠️🌊",
    tags: ["Pirates", "Ocean", "Adventure", "Treasure"]
  },
  {
    title: "The Space Marshmallow",
    category: "Intergalactic Treats",
    setup: "What is a friendly green Martian's absolute favorite campfire dessert?",
    punchline: "Space floats and toasted Martian-mallows!",
    metaphor: "Friendly green aliens on the red dunes of Mars toasting giant floating glowing pink marshmallows over a rocket exhaust flame.",
    hook: "ALIEN CAMPFIRE ON MARS 👽🍡",
    tags: ["Aliens", "Mars", "Camping", "Dessert"]
  },
  {
    title: "The Secret Agent Shoes",
    category: "Spy Thriller",
    setup: "What kind of silent footwear do top international secret agents always wear?",
    punchline: "Sneakers, for the ultimate stealth mission!",
    metaphor: "A James Bond style spy in a tuxedo silently tiptoeing past lasers in glowing high-tech sneakers with laser soles.",
    hook: "THE SECRET AGENT'S STEALTH SHOES 🕵️‍♂️👟",
    tags: ["Spy", "JamesBond", "Action", "Stealth"]
  },
  {
    title: "The Programmer's Lightbulb",
    category: "Tech Comedy",
    setup: "How many software engineers does it take to change a blown lightbulb in the office?",
    punchline: "None! Because that's clearly a hardware problem!",
    metaphor: "A team of programmers typing frantically in a dark office illuminated only by neon screens, submitting a ticket to the hardware department.",
    hook: "THE SOFTWARE ENGINEER'S DILEMMA 💡💻",
    tags: ["Coding", "Tech", "Programmer", "Office"]
  },
  {
    title: "The Towed Toad",
    category: "Pond Life",
    setup: "What happens when a stylish bullfrog parks his lily pad in a no-parking zone?",
    punchline: "He gets immediately toad away by the river police!",
    metaphor: "A tiny yellow water tow-truck towing away a giant lily pad while a frog in sunglasses waves his parking permit in dismay.",
    hook: "ILLEGAL PARKING AT THE POND 🐸🚨",
    tags: ["Frogs", "Pond", "Animals", "Police"]
  },
  {
    title: "The Spider Web Designer",
    category: "Digital Nature",
    setup: "Why are garden spiders naturally the world's greatest web designers?",
    punchline: "Because they always catch every single bug in the system!",
    metaphor: "A cool spider in tiny glasses spinning an illuminated holographic web on a MacBook screen, instantly trapping pixelated computer bugs.",
    hook: "THE WORLD'S BEST WEB DESIGNER 🕷️💻",
    tags: ["Spiders", "WebDesign", "Tech", "Nature"]
  },
  {
    title: "The Slippery Butter",
    category: "Kitchen Chaos",
    setup: "Why did the golden stick of butter slide effortlessly across the kitchen counter?",
    punchline: "To slip into something far more comfortable!",
    metaphor: "A golden stick of butter wearing a silk bathrobe surfing gracefully across a warm pancake with sparkling syrup waves.",
    hook: "THE SLICKEST BUTTER IN THE KITCHEN 🧈🥞",
    tags: ["Breakfast", "Kitchen", "Food", "Pancakes"]
  },
  {
    title: "The Ghostly Ice Cream",
    category: "Spooky Treats",
    setup: "What is a Victorian ghost's absolute favorite treat on a hot summer afternoon?",
    punchline: "A giant triple-scoop of I-scream!",
    metaphor: "Translucent glowing ghosts floating around an old-fashioned ice cream parlor ordering glowing neon sundaes that float through their chests.",
    hook: "THE GHOST'S FAVORITE ICE CREAM 👻🍦",
    tags: ["Ghosts", "IceCream", "Summer", "Spooky"]
  },
  {
    title: "The Bad Altitude Plane",
    category: "Aviation Humor",
    setup: "Why was the supersonic jet plane sent to its hangar for a timeout?",
    punchline: "Because it had a terrible attitude and even worse altitude!",
    metaphor: "A sleek supersonic passenger jet pouting in a giant hangar with folded wingtips while an air traffic control tower lectures it.",
    hook: "THE JET PLANE WITH AN ATTITUDE ✈️🛑",
    tags: ["Aviation", "Planes", "Travel", "Flying"]
  },
  {
    title: "The Out-of-Juice Orange",
    category: "Marathon Fruit",
    setup: "Why did the championship orange lose the Olympic marathon race?",
    punchline: "Because it completely ran out of juice at mile twenty-five!",
    metaphor: "An athletic orange wearing sweatbands crossing the finish line in slow motion, squeezing a refreshing drop of orange juice into a trophy cup.",
    hook: "THE OLYMPIC ORANGE RACE 🍊🏃",
    tags: ["Olympics", "Fruit", "Sports", "Juice"]
  },
  {
    title: "The Fast Turtle",
    category: "Turbo Animals",
    setup: "What do you call a determined tortoise who installs twin turbo rockets onto his shell?",
    punchline: "A genuine shell on wheels!",
    metaphor: "A cool tortoise with flames painted on his shell drifting around a Formula 1 corner overtaking race cars in a cloud of sparks.",
    hook: "THE TURBO-CHARGED TORTOISE 🐢🏎️",
    tags: ["Racing", "Tortoise", "Turbo", "Speed"]
  },
  {
    title: "The Timeless Astronaut",
    category: "Deep Space",
    setup: "Why did the deep-space explorer stop wearing his analog wristwatch on spacewalks?",
    punchline: "Because there is truly no time like the present in zero gravity!",
    metaphor: "An astronaut floating outside the International Space Station letting go of an antique pocket watch that turns into a sparkling mini-nebula.",
    hook: "TIMELESS IN ZERO GRAVITY 👨‍🚀⏳",
    tags: ["Space", "NASA", "Time", "Cosmic"]
  },
  {
    title: "The Fire-Breathing Storyteller",
    category: "Fantasy Legends",
    setup: "Why are friendly medieval dragons naturally the most popular storytellers around?",
    punchline: "Because their tales always catch fire with the entire kingdom!",
    metaphor: "A majestic friendly green dragon reading a giant storybook by a castle fireplace, puffing gentle smoke rings shaped like galloping horses.",
    hook: "THE DRAGON'S BEDTIME STORY 🐉🔥",
    tags: ["Dragons", "Fantasy", "Castles", "Stories"]
  },
  {
    title: "The Cool Cucumber",
    category: "Superhero Garden",
    setup: "Why was the garden cucumber so calm and unbothered during the heatwave?",
    punchline: "Because he was literally as cool as a pickled superhero!",
    metaphor: "A cucumber in superhero cape and sunglasses floating inside a chilled jar of ice-water while solar heatwaves bounce off his cape.",
    hook: "MEET THE PICKLED SUPERHERO 🥒🦸",
    tags: ["Superheroes", "Garden", "Summer", "Cool"]
  },
  {
    title: "The Fun-Guy Mushroom",
    category: "Enchanted Woods",
    setup: "Why did the toadstool mushroom get invited to every royal woodland party?",
    punchline: "Because he was famously known as a real fungi to be around!",
    metaphor: "A glowing red-and-white mushroom in a top hat DJ-ing a vibrant woodland fairy party with fireflies and dancing chipmunks.",
    hook: "THE LIFE OF THE FOREST PARTY 🍄🎉",
    tags: ["Forest", "Fairies", "Mushrooms", "Party"]
  },
  {
    title: "The Elephant's Mouse",
    category: "Tech Jungle",
    setup: "Why will majestic African elephants never buy personal desktop computers?",
    punchline: "Because they are terrified of the computer mouse!",
    metaphor: "A massive elephant in a home office stepping on top of his mahogany desk as a tiny plastic optical computer mouse blinks neon lights below.",
    hook: "WHY ELEPHANTS AVOID COMPUTERS 🐘🖱️",
    tags: ["Elephants", "Tech", "Animals", "Jungle"]
  },
  {
    title: "The Polite Hammer",
    category: "Workshop Cinema",
    setup: "What did the shiny steel hammer declare to the proud golden nail?",
    punchline: "You hit the nail right on the head every single time!",
    metaphor: "A gleaming workshop where tools applaud as a hammer and nail do a synchronized tap-dance on a polished oak workbench.",
    hook: "THE MASTER WORKSHOP DUO 🔨✨",
    tags: ["Tools", "Workshop", "Building", "Crafts"]
  },
  {
    title: "The Shellfish Crab",
    category: "Undersea Treasure",
    setup: "Why did the hermit crab refuse to share his glittering pearl with the starfish?",
    punchline: "Because he was completely and utterly shellfish!",
    metaphor: "A hermit crab in a golden shell holding a glowing giant pearl while hugging it greedily with giant velvet boxing gloves.",
    hook: "THE WORLD'S GREEDIEST CRAB 🦀💎",
    tags: ["Ocean", "Crabs", "Treasure", "Pearls"]
  },
  {
    title: "The Magician's Galaxy",
    category: "Grand Illusion",
    setup: "What did the world's greatest illusionist say when she pulled a spiral galaxy from her top hat?",
    punchline: "That was truly out of this world!",
    metaphor: "On a grand theater stage, a magician in a velvet tuxedo pulls a swirling luminous Milky Way galaxy out of a silk top hat, filling the auditorium.",
    hook: "THE COSMIC TOP HAT TRICK 🎩🌌",
    tags: ["Magic", "Space", "Galaxy", "Illusion"]
  },
  {
    title: "The Busy Bee Promotion",
    category: "Corporate Hive",
    setup: "Why did the hard-working honeybee get promoted to Vice President of Honey?",
    punchline: "Because she was always buzzing with brilliant sweet ideas!",
    metaphor: "A bee in a tiny business suit presenting a glowing honey honeycomb pie chart in a glass boardroom as worker bees applaud.",
    hook: "THE HIVE'S TOP EXECUTIVE 🐝📈",
    tags: ["Bees", "Business", "Success", "Honey"]
  },
  {
    title: "The Dancing Robot",
    category: "Robotics Arena",
    setup: "Why did the android robot take professional hip-hop breakdancing lessons?",
    punchline: "To dramatically upgrade his motherboard rhythm and byte!",
    metaphor: "A sleek chrome robot spinning on his head under laser strobe lights, shooting sparklers from his fingers to a thunderous beat.",
    hook: "THE BREAKDANCING ANDROID 🤖🕺",
    tags: ["Robots", "Dancing", "SciFi", "Future"]
  },
  {
    title: "The Wise Owl's Exam",
    category: "Night Academy",
    setup: "Why did the snowy owl score one hundred percent on his university literature exam?",
    punchline: "Because he was a real hoot at all-night studying sessions!",
    metaphor: "A regal snowy owl in round reading spectacles sipping hot cocoa in a candlelit tower library surrounded by towering stacks of books.",
    hook: "THE TOP STUDENT AT OWL ACADEMY 🦉📖",
    tags: ["Owls", "Books", "School", "Night"]
  },
  {
    title: "The Cosmic Fetch Dog",
    category: "Space Pets",
    setup: "What is an astronaut's cybernetic golden retriever's favorite cosmic spot to fetch?",
    punchline: "The glowing asteroid belt!",
    metaphor: "A golden retriever in a bubble space helmet leaping across glowing floating space rocks to fetch a floating glowing frisbee.",
    hook: "SPACE PUPPY FETCHES AN ASTEROID 🐕🚀",
    tags: ["Dogs", "Space", "Astronaut", "Pets"]
  },
  {
    title: "The Golden Stage Pancake",
    category: "Broadway Breakfast",
    setup: "Why did the fluffy golden pancake get a standing ovation on Broadway?",
    punchline: "Because her theatrical flip was truly on a roll!",
    metaphor: "A golden pancake in tap shoes doing a mid-air gymnastics double backflip above a sizzling silver skillet on a Broadway stage.",
    hook: "BROADWAY'S FLUFFIEST STAR 🥞🎭",
    tags: ["Broadway", "Breakfast", "Pancakes", "Theater"]
  },
  {
    title: "The Dashing Comet",
    category: "Deep Cosmos",
    setup: "Why did the icy comet wave farewell as it zoomed past the solar system?",
    punchline: "Because it had to make a glowing dash straight into the cosmic spotlight!",
    metaphor: "A sparkling icy comet with turquoise crystal tail giving a polite bow and waving a white-gloved hand as it speeds past Jupiter.",
    hook: "THE COMET'S FINAL BOW ☄️✨",
    tags: ["Space", "Comet", "Stars", "Astronomy"]
  }
];

// Append Prompts 11 to 75
EXTENDED_JOKES_LIST.forEach((tmpl, idx) => {
  const shortId = 11 + idx;
  SHORTS_DATABASE.push({
    id: shortId,
    title: tmpl.title,
    category: tmpl.category,
    aspectRatio: "9:16 Vertical (1080x1920)",
    targetDuration: "10 seconds",
    cleanJokeCore: {
      setup: tmpl.setup,
      punchline: tmpl.punchline
    },
    visualMetaphor: tmpl.metaphor,
    characters: [
      {
        name: `Lead Character (${tmpl.title})`,
        role: "Hero Protagonist",
        visualDescription: `Distinctive, visually stylized cinematic character in high-end ${tmpl.category.toLowerCase()} aesthetic.`,
        voiceMood: "British young female voice, crisp, witty, playfully dramatic and expressively timed",
        vocalPerformanceNotes: "Lively British cadence with crisp punchline comedic timing."
      }
    ],
    cameraAngle: "0-3s: Dynamic vertical push-in. 3-7s: High-speed slow-motion tracking shot. 7-10s: Epic low-angle punchline reveal.",
    lighting: "Hollywood anamorphic cinematic lighting with rich color contrast and volumetric rim highlights.",
    visualStorytellingPrompt: `Vertical 9:16 cinematic YouTube Short. 0-3s: Setup establishing ${tmpl.title} with atmospheric depth. 3-7s: Visual escalation: ${tmpl.metaphor}. 7-10s: Dramatic visual punchline climax with vibrant high-contrast lighting. Photorealistic 8K, 10s video.`,
    dialogueScript: [
      { speaker: "Narrator", timeRange: "0:00 - 0:04", text: tmpl.setup, mood: "Engaging witty British setup" },
      { speaker: "Narrator", timeRange: "0:04 - 0:10", text: tmpl.punchline, mood: "Lively expressive British punchline" }
    ],
    textOverlay: {
      hookText: tmpl.hook,
      escalationText: "WATCH TILL THE REVEAL ⏱️",
      punchlineText: tmpl.punchline.slice(0, 45).toUpperCase(),
      safeZonePosition: "Upper safe zone (Y: 15% to 45% margin, avoiding bottom YouTube Shorts caption area)",
      styleGuide: "High-contrast matte backdrop, crystal clear sans-serif typography, vibrant accent trim."
    },
    generatorCopyPrompt: `Vertical 9:16 Hollywood cinematic video. 10 seconds. ${tmpl.title}. Camera moves dynamically in 10s runtime. ${tmpl.metaphor}. Masterful lighting, rich atmospheric textures, hyper-detailed render for Runway Gen-3 / Sora / Kling / Luma.`,
    hdImage: "",
    tags: tmpl.tags
  });
});

// Post-process all shorts so that every fact leads with DEFAULT_SCOTTISH_TAGS
SHORTS_DATABASE.forEach((short) => {
  const combined = [...DEFAULT_SCOTTISH_TAGS, ...short.tags];
  const seen = new Set<string>();
  short.tags = combined.filter((t) => {
    const k = t.toLowerCase().trim();
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
});
