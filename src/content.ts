export interface NavLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FeatureCardContent {
  id: string;
  eyebrow: 'SEE' | 'READ' | 'TALK' | 'KNOW';
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  tone: 'periwinkle' | 'mint' | 'peach' | 'butter';
  layout: 'preview-left' | 'preview-right';
  highlights: readonly { label: string; detail: string }[];
}

export interface VoiceCommandDemo {
  id: string;
  phrases: readonly string[];
  summary: string;
  processingMode: 'Hybrid (YOLOv8 + Gemini 2.5 Flash)' | 'Offline Instant (pyttsx3)' | 'Cloud Vision (Gemini 2.5 Flash)' | 'Online Tool + TTS';
  samplePrompt: string;
  sampleResponse: string;
  caption: string;
}

export interface PipelineStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  detail: string;
  tone: 'sky' | 'periwinkle' | 'mint' | 'peach';
}

export interface InstallTab {
  id: 'standard' | 'macos-linux' | 'windows';
  label: string;
  steps: readonly {
    step: number;
    title: string;
    command: string;
    note?: string;
  }[];
}

export interface TechStackItem {
  name: string;
  category: string;
  role: string;
  execution: 'On-device' | 'Cloud API' | 'Desktop UI';
}

export interface RoadmapMilestone {
  period: string;
  title: string;
  status: 'Completed' | 'Shipped' | 'Concept (Not Shipped)';
  description: string;
}

export interface CommunityCard {
  id: string;
  title: string;
  handle: string;
  description: string;
  ctaLabel: string;
  href: string;
  tone: 'periwinkle' | 'peach' | 'mint' | 'butter';
  external: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_META = {
  brandWordmark: 'Drishya Sahayak.',
  name: 'Drishya Sahayak V1',
  meaning: 'Sanskrit/Hindi: "Visual Assistant"',
  title: 'Drishya Sahayak | AI Vision Assistant',
  description:
    'Free, open-source (MIT) Python desktop app combining real-time YOLOv8 object detection and Google Gemini 2.5 Flash to describe scenes, read text, and hold natural voice conversations.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://drishyasahayak.vercel.app',
  license: 'MIT',
  copyright: '© 2026 Drishya Sahayak.',
  creatorCredit: 'Designed & engineered by Dhyandev P with collaborators Sreehid and Ashirwad',
  creator: 'Dhyandev P',
  collaborators: ['Sreehid', 'Ashirwad'] as const,
} as const;

export const LINKS = {
  github: 'https://github.com/dhyandevp/Drishya_Sahayak.ai',
  demoFilm: 'https://youtu.be/7CZvz8eTNHY',
  geminiApiKey: 'https://aistudio.google.com/app/apikey',
  linktree: 'https://link.dhyandev.sbs',
  website: 'https://dhyandev.sbs',
  creatorGithub: 'https://github.com/dhyandevp',
  email: 'dhyandevp@proton.me',
  phone: '+91 8281374024',
  phoneHref: 'tel:+918281374024',
  address: 'Drishya Sahayak Labs, Kannur, Kerala, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kannur%2C+Kerala%2C+India',
} as const;

export const ANNOUNCEMENT = {
  text: 'V1 is open source — star us on GitHub',
  href: LINKS.github,
} as const;

export const NAVBAR = {
  links: [
    { label: 'Product', href: '/#product' },
    { label: 'Features', href: '/#features' },
    { label: 'Commands', href: '/#commands' },
    { label: 'Docs', href: '/docs' },
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'Contact', href: '/#contact' },
  ] satisfies readonly NavLinkItem[],
  ghostLink: {
    label: 'GitHub',
    href: LINKS.github,
    external: true,
  } satisfies NavLinkItem,
  primaryCta: {
    label: 'Download Free',
    href: '/#quickstart',
  },
} as const;

export const HERO = {
  headlinePrimary: 'Perceive reality',
  headlineItalic: 'beyond sight.',
  subline:
    'A free, open-source Python desktop companion combining real-time object detection with natural voice AI so blind and visually impaired people can explore scenes, read documents, and ask questions aloud.',
  primaryCta: 'Download Free',
  secondaryCta: 'Watch Film',
  mockup: {
    windowTitle: 'Drishya Sahayak V1 — Tkinter Desktop',
    engineBadge: 'YOLOv8 + Gemini 2.5 Flash',
    userPrompt: 'You: "Describe"',
    assistantReply:
      'Drishya: "A wooden table with a laptop open in front of you and a steaming cup of tea to the right."',
    micStatus: 'Listening for voice command',
    ttsStatus: 'pyttsx3 offline voice ready',
    detections: [
      { label: 'laptop', confidence: '0.94', x: 18, y: 20, w: 38, h: 42 },
      { label: 'cup', confidence: '0.91', x: 64, y: 42, w: 18, h: 24 },
      { label: 'dining table', confidence: '0.88', x: 8, y: 58, w: 84, h: 34 },
    ],
  },
} as const;

export const STATEMENT = {
  headline: "Drishya isn't just for one thing, it's for your world.",
  capabilities: [
    { id: 'describe', label: 'Describe' },
    { id: 'read', label: 'Read' },
    { id: 'ask', label: 'Ask' },
    { id: 'time-weather', label: 'Time & Weather' },
    { id: 'hands-free', label: 'Hands-free' },
  ],
} as const;

export const PASTEL_FEATURES: readonly FeatureCardContent[] = [
  {
    id: 'feature-see',
    eyebrow: 'SEE',
    headline: 'Understand what sits right in front of you',
    description:
      'YOLOv8 spots nearby objects locally in real time, while Google Gemini 2.5 Flash composes rich spatial descriptions on demand—telling you what is ahead, where things rest, and how the scene fits together.',
    ctaLabel: 'Explore scene commands',
    ctaHref: '#commands',
    tone: 'periwinkle',
    layout: 'preview-left',
    highlights: [
      { label: 'YOLOv8 Boxes', detail: 'Instant on-device object detection' },
      { label: 'Scene Context', detail: 'Clear spatial layout via Gemini' },
      { label: 'Spoken Output', detail: 'Immediate voice delivery' },
      { label: 'Tkinter Preview', detail: 'Simple high-contrast desktop frame' },
    ],
  },
  {
    id: 'feature-read',
    eyebrow: 'READ',
    headline: 'Hear printed pages, labels, and handwriting aloud',
    description:
      'Hold up a medicine label, a printed notice, a receipt, or handwritten notes. Say "Read text" or "Scan this" and Gemini Vision extracts readable text and reads it back clearly.',
    ctaLabel: 'See reading workflow',
    ctaHref: '/docs#voice-commands',
    tone: 'mint',
    layout: 'preview-right',
    highlights: [
      { label: 'Printed Text', detail: 'Books, mail, packaging, menus' },
      { label: 'Handwriting', detail: 'Notes, forms, and envelopes' },
      { label: 'Documents', detail: 'Structured multi-line reading' },
      { label: 'Instant Voice', detail: 'Read back with offline TTS' },
    ],
  },
  {
    id: 'feature-talk',
    eyebrow: 'TALK',
    headline: 'Natural conversation that remembers what you asked',
    description:
      'No robotic menu trees or rigid button presses. Speak naturally through your microphone with SpeechRecognition—Drishya remembers your recent conversation turns so follow-up questions feel effortless.',
    ctaLabel: 'Try interactive demo',
    ctaHref: '#commands',
    tone: 'peach',
    layout: 'preview-left',
    highlights: [
      { label: 'Turn Memory', detail: 'Follow-up questions keep context' },
      { label: 'Warm Persona', detail: 'Calm, conversational voice tone' },
      { label: 'Hands-Free', detail: 'Driven entirely by speech' },
      { label: 'Clean Exit', detail: 'Say "Stop" or "Exit" anytime' },
    ],
  },
  {
    id: 'feature-know',
    eyebrow: 'KNOW',
    headline: 'Everyday tools, weather, and quick answers built in',
    description:
      'Ask for the current time, today’s date, local weather updates ("In Kannur..."), or general-knowledge questions like "Who is [name]?" without switching apps.',
    ctaLabel: 'Read full documentation',
    ctaHref: '/docs',
    tone: 'butter',
    layout: 'preview-right',
    highlights: [
      { label: 'Time & Date', detail: 'Spoken instantly on command' },
      { label: 'Local Weather', detail: 'Forecasts tailored to your city' },
      { label: 'General Q&A', detail: 'Direct answers powered by Gemini' },
      { label: 'Zero Friction', detail: 'One unified voice assistant' },
    ],
  },
] as const;

export const VOICE_COMMANDS: readonly VoiceCommandDemo[] = [
  {
    id: 'describe',
    phrases: ['"Describe"', '"Look around"'],
    summary: 'Analyzes the camera scene and describes what is in front of you.',
    processingMode: 'Hybrid (YOLOv8 + Gemini 2.5 Flash)',
    samplePrompt: 'Describe what is on my desk.',
    sampleResponse:
      'In front of you is a wooden desk with an open silver laptop centered at arm’s length, a spiral notebook to the left, and a warm ceramic cup of tea on your right.',
    caption: 'YOLOv8 detects laptop, cup, and table; Gemini 2.5 Flash narrates layout; pyttsx3 speaks aloud.',
  },
  {
    id: 'read-text',
    phrases: ['"Read text"', '"Scan this"'],
    summary: 'Reads visible printed text, handwriting, or documents from the camera feed.',
    processingMode: 'Cloud Vision (Gemini 2.5 Flash)',
    samplePrompt: 'Read text',
    sampleResponse:
      'The handwritten sticky note reads: "Appointment tomorrow at 10:30 AM — bring your blue folder."',
    caption: 'Captures current frame and sends it via your Gemini API key for OCR extraction.',
  },
  {
    id: 'time',
    phrases: ['"What time is it?"'],
    summary: 'Speaks the current system time immediately.',
    processingMode: 'Offline Instant (pyttsx3)',
    samplePrompt: 'What time is it?',
    sampleResponse: 'It is 6:48 AM on Wednesday, November 25.',
    caption: 'Handled locally on your computer and spoken instantly via offline TTS.',
  },
  {
    id: 'weather',
    phrases: ['"What\'s the weather?"'],
    summary: 'Provides your local weather forecast aloud.',
    processingMode: 'Online Tool + TTS',
    samplePrompt: "What's the weather?",
    sampleResponse:
      'In Kannur, Kerala it is currently 29 degrees Celsius and partly cloudy with a gentle coastal breeze.',
    caption: 'Fetches current forecast information and speaks a concise summary.',
  },
  {
    id: 'who-is',
    phrases: ['"Who is [name]?"'],
    summary: 'Answers general-knowledge questions clearly via Gemini.',
    processingMode: 'Cloud Vision (Gemini 2.5 Flash)',
    samplePrompt: 'Who is Louis Braille?',
    sampleResponse:
      'Louis Braille was a 19th-century French educator who invented the tactile six-dot Braille system, empowering blind readers around the world.',
    caption: 'Conversational answer generated with context preserved for follow-ups.',
  },
  {
    id: 'stop',
    phrases: ['"Stop"', '"Exit"'],
    summary: 'Safely shuts down listening and closes the desktop application.',
    processingMode: 'Offline Instant (pyttsx3)',
    samplePrompt: 'Exit',
    sampleResponse: 'Closing Drishya Sahayak. Stay safe.',
    caption: 'Instant offline farewell cue before cleanly terminating Tkinter and camera streams.',
  },
] as const;

export const HOW_IT_WORKS: readonly PipelineStep[] = [
  {
    stepNumber: '01',
    title: 'Camera',
    subtitle: 'Continuous desktop feed',
    detail: 'Your laptop or USB webcam captures live frames inside the lightweight Tkinter window.',
    tone: 'sky',
  },
  {
    stepNumber: '02',
    title: 'YOLOv8',
    subtitle: 'On-device object detection',
    detail: 'Recognizes objects and bounding locations locally without waiting for a cloud round-trip.',
    tone: 'periwinkle',
  },
  {
    stepNumber: '03',
    title: 'Gemini 2.5 Flash',
    subtitle: 'Scene understanding & OCR',
    detail: 'When you ask to describe, scan text, or answer questions, frames and prompts go to Gemini via your own API key.',
    tone: 'mint',
  },
  {
    stepNumber: '04',
    title: 'Voice (STT / TTS)',
    subtitle: 'SpeechRecognition + pyttsx3',
    detail: 'Listens for natural spoken commands and replies aloud immediately using offline text-to-speech.',
    tone: 'peach',
  },
] as const;

export const HYBRID_EXPLAINER = {
  eyebrow: 'HONEST ARCHITECTURE',
  headline: 'Offline speed where it counts. Cloud intelligence when you ask.',
  privacyNote:
    'Honest privacy promise: offline TTS (pyttsx3) and on-device YOLOv8 object detection run immediately on your machine. When you request scene descriptions, text reading (OCR), weather, or Q&A, the relevant frame or query is sent directly to Google Gemini using your own API key.',
  offline: {
    badge: 'Offline (Instant)',
    title: 'Immediate on-device feedback',
    description:
      'Critical interactions stay snappy on your laptop so you never sit in silence waiting for simple confirmations.',
    items: [
      'Instant voice output with pyttsx3 text-to-speech',
      'Real-time local object bounding boxes via YOLOv8',
      'Current system time, date, and app status prompts',
      'Instant "Stop" / "Exit" shutdown control',
    ],
  },
  online: {
    badge: 'Online (Powerful)',
    title: 'Deep vision & conversational reasoning',
    description:
      'Complex visual understanding and reading rely on Google Gemini 2.5 Flash using your personal API key.',
    items: [
      'Rich natural-language scene descriptions ("Describe")',
      'Printed text, handwriting, and document OCR ("Read text")',
      'Multi-turn conversational memory & Q&A ("Who is [name]?")',
      'Live local weather lookups ("What’s the weather?")',
    ],
  },
} as const;

export const INSTALL_TABS: readonly InstallTab[] = [
  {
    id: 'standard',
    label: 'Quick Setup (4 Steps)',
    steps: [
      {
        step: 1,
        title: 'Clone the repository',
        command: 'git clone https://github.com/dhyandevp/Drishya_Sahayak.ai.git && cd Drishya_Sahayak.ai',
      },
      {
        step: 2,
        title: 'Install Python dependencies',
        command: 'pip install -r requirements.txt',
      },
      {
        step: 3,
        title: 'Configure your Gemini API key',
        command: 'echo "GEMINI_API_KEY=your_api_key_here" > .env',
        note: 'Create a .env file with GEMINI_API_KEY=your_api_key_here using your key from Google AI Studio.',
      },
      {
        step: 4,
        title: 'Launch Drishya Sahayak V1',
        command: 'python main.py',
      },
    ],
  },
  {
    id: 'macos-linux',
    label: 'macOS / Linux (venv)',
    steps: [
      {
        step: 1,
        title: 'Clone and enter project folder',
        command: 'git clone https://github.com/dhyandevp/Drishya_Sahayak.ai.git && cd Drishya_Sahayak.ai',
      },
      {
        step: 2,
        title: 'Create virtual environment & install packages',
        command: 'python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt',
      },
      {
        step: 3,
        title: 'Add your Gemini API key to .env',
        command: 'printf "GEMINI_API_KEY=your_api_key_here\\n" > .env',
        note: 'Get your key at https://aistudio.google.com/app/apikey and replace your_api_key_here.',
      },
      {
        step: 4,
        title: 'Run the desktop app',
        command: 'python3 main.py',
      },
    ],
  },
  {
    id: 'windows',
    label: 'Windows (PowerShell)',
    steps: [
      {
        step: 1,
        title: 'Clone repository and navigate inside',
        command: 'git clone https://github.com/dhyandevp/Drishya_Sahayak.ai.git; cd Drishya_Sahayak.ai',
      },
      {
        step: 2,
        title: 'Create virtual environment & install requirements',
        command: 'python -m venv .venv; .\\.venv\\Scripts\\Activate.ps1; pip install -r requirements.txt',
      },
      {
        step: 3,
        title: 'Write .env file with your Gemini API key',
        command: 'Set-Content -Path .env -Value "GEMINI_API_KEY=your_api_key_here"',
        note: 'Obtain a key from https://aistudio.google.com/app/apikey.',
      },
      {
        step: 4,
        title: 'Start Drishya Sahayak V1',
        command: 'python main.py',
      },
    ],
  },
] as const;

export const REQUIREMENTS = [
  'Python 3.10 or newer',
  'Built-in or USB webcam',
  'Working microphone & speakers / headphones',
  'Google Gemini API key (via Google AI Studio)',
] as const;

export const TECH_STACK: readonly TechStackItem[] = [
  {
    name: 'Python 3.10+',
    category: 'Runtime',
    role: 'Cross-platform desktop core orchestrating camera frames, threads, and voice loops.',
    execution: 'On-device',
  },
  {
    name: 'Tkinter GUI',
    category: 'Desktop Window',
    role: 'Native lightweight desktop window displaying live webcam video, detections, and transcript.',
    execution: 'Desktop UI',
  },
  {
    name: 'YOLOv8',
    category: 'Computer Vision',
    role: 'Real-time local object detection with bounding boxes around everyday items.',
    execution: 'On-device',
  },
  {
    name: 'Gemini 2.5 Flash',
    category: 'Multimodal AI',
    role: 'Fast scene understanding, handwritten & printed OCR, and conversational Q&A.',
    execution: 'Cloud API',
  },
  {
    name: 'SpeechRecognition',
    category: 'Speech-to-Text (STT)',
    role: 'Captures natural spoken phrases from your microphone hands-free.',
    execution: 'On-device',
  },
  {
    name: 'pyttsx3',
    category: 'Text-to-Speech (TTS)',
    role: 'Instant offline speech synthesis so Drishya responds aloud without network delay.',
    execution: 'On-device',
  },
] as const;

export const MISSION_QUOTE = {
  eyebrow: 'CREATOR MISSION & TEAM',
  quoteBefore: 'Digital accessibility tools were ',
  quoteItalicOne: 'too expensive',
  quoteMiddle: ' or ',
  quoteItalicTwo: 'too cloud-dependent',
  quoteAfter:
    ' — Drishya Sahayak is our effort to place clear vision and natural voice assistance into open-source hands, free for anyone with a laptop and a camera.',
  author: 'Dhyandev P',
  role: 'Lead Developer & Founder',
  collaborators: [
    { name: 'Sreehid', role: 'Collaborator' },
    { name: 'Ashirwad', role: 'Collaborator' },
  ],
  organization: 'Drishya Sahayak Labs, Kannur',
} as const;

export const ROADMAP = {
  badge: 'CONCEPT · ROADMAP — NOT YET SHIPPED',
  eyebrow: 'COMING NEXT',
  headline: 'Hands-free wearable smart-glasses edition',
  description:
    'The next phase explores moving Drishya Sahayak off the desk into a lightweight wearable form factor built around a Raspberry Pi 5, open-ear bone-conduction audio so ambient street sounds remain audible, and subtle haptic feedback.',
  estimateNote: '₹20,667 est. (target component estimate only — hardware is in development and not available for purchase).',
  hardwareSpecs: [
    { label: 'Compute', value: 'Raspberry Pi 5' },
    { label: 'Audio', value: 'Bone-conduction speakers (ears stay open)' },
    { label: 'Feedback', value: 'Directional haptic vibration cues' },
    { label: 'Status', value: 'Research concept — not yet shipped' },
  ],
  timeline: [
    {
      period: '2023 Q1',
      title: 'Concept',
      status: 'Completed',
      description: 'Initial architecture design for voice-first assistive vision on accessible hardware.',
    },
    {
      period: '2024 Q2',
      title: 'Alpha',
      status: 'Completed',
      description: 'First working Python scripts pairing webcam detection with spoken output.',
    },
    {
      period: '2024 Q4',
      title: 'Refinement',
      status: 'Completed',
      description: 'Integrated offline pyttsx3 TTS, conversational memory, and Tkinter desktop UI.',
    },
    {
      period: '2025 Q1',
      title: 'Gen 1 (Desktop V1)',
      status: 'Shipped',
      description: 'Open-source MIT desktop release powered by YOLOv8 + Google Gemini 2.5 Flash.',
    },
    {
      period: 'Next (Concept)',
      title: 'Wearable Smart-Glasses',
      status: 'Concept (Not Shipped)',
      description: 'Raspberry Pi 5 glasses prototype with bone-conduction audio and haptic feedback.',
    },
  ] satisfies readonly RoadmapMilestone[],
} as const;

export const COMMUNITY_CARDS: readonly CommunityCard[] = [
  {
    id: 'github',
    title: 'GitHub',
    handle: 'dhyandevp/Drishya_Sahayak.ai',
    description: 'Inspect the source code, star V1, open issues, or contribute pull requests under MIT.',
    ctaLabel: 'Explore repository',
    href: LINKS.github,
    tone: 'periwinkle',
    external: true,
  },
  {
    id: 'youtube',
    title: 'YouTube Demo',
    handle: 'Watch V1 in action',
    description: 'See real-time object detection, OCR reading, and spoken voice interaction on desktop.',
    ctaLabel: 'Watch demo film',
    href: LINKS.demoFilm,
    tone: 'peach',
    external: true,
  },
  {
    id: 'linktree',
    title: 'Creator Links',
    handle: 'link.dhyandev.sbs',
    description: 'Follow project updates, open-source releases, and engineering notes from the founder.',
    ctaLabel: 'Visit links',
    href: LINKS.linktree,
    tone: 'mint',
    external: true,
  },
  {
    id: 'email',
    title: 'Direct Email',
    handle: LINKS.email,
    description: 'Reach out directly for accessibility feedback, testing help, or collaboration ideas.',
    ctaLabel: 'Send an email',
    href: `mailto:${LINKS.email}`,
    tone: 'butter',
    external: false,
  },
] as const;

export const PRICING = {
  eyebrow: 'ACCESS & ROADMAP',
  headline: 'Free today, open tomorrow',
  subtitle: 'Run Drishya Sahayak V1 on your own machine for zero software cost, or follow our wearable concept.',
  freeTier: {
    name: 'Free & Open Source',
    description: 'Full desktop V1 release under the permissive MIT License. Bring your own Gemini API key.',
    price: '₹0',
    period: 'MIT License · Forever free',
    features: [
      'Real-time YOLOv8 object detection',
      'Gemini 2.5 Flash scene description & OCR',
      'Natural voice conversation with memory',
      'Instant offline pyttsx3 voice output',
      'Full Python + Tkinter source code',
    ],
    ctaLabel: 'Download Free',
    ctaHref: '#quickstart',
  },
  glassesTier: {
    badge: 'CONCEPT · NOT SHIPPED',
    name: 'Glasses Edition',
    description: 'Upcoming wearable edition exploring Raspberry Pi 5, bone-conduction audio, and haptic cues.',
    price: 'Concept',
    period: '₹20,667 est. · Hardware estimate only',
    features: [
      'Raspberry Pi 5 wearable compute concept',
      'Open-ear bone-conduction audio feedback',
      'Haptic vibration cues for nearby alerts',
      'Not purchasable — research roadmap only',
    ],
    ctaLabel: 'Explore roadmap',
    ctaHref: '#roadmap',
  },
} as const;

export const FAQS: readonly FaqItem[] = [
  {
    id: 'is-it-free',
    question: 'Is it free?',
    answer:
      'Yes. Drishya Sahayak V1 is completely free and open-source software released under the MIT License. You bring your own Google Gemini API key from Google AI Studio (which provides a free tier subject to Google’s usage limits).',
  },
  {
    id: 'need-internet',
    question: 'Do I need internet?',
    answer:
      'For full vision and Q&A features, yes. Offline text-to-speech (pyttsx3) and on-device YOLOv8 object detection run immediately without internet, while detailed scene descriptions, OCR text reading, weather forecasts, and general knowledge queries connect to Google Gemini 2.5 Flash online.',
  },
  {
    id: 'data-privacy',
    question: 'Is my data private?',
    answer:
      'Offline TTS and on-device detection run instantly on your computer. When you trigger scene descriptions, OCR, or Q&A, the captured frame or spoken prompt is sent to Google Gemini via your own API key. Drishya Sahayak runs no central servers of its own, and because cloud vision uses Gemini, it is a hybrid app rather than an offline-only tool.',
  },
  {
    id: 'languages',
    question: 'Which languages are supported?',
    answer:
      'Voice commands and the desktop interface are built in English. When reading text via Gemini Vision, Gemini 2.5 Flash can interpret and translate printed or handwritten text across many languages depending on your prompt, while spoken output relies on your operating system’s pyttsx3 voice engine.',
  },
  {
    id: 'requirements',
    question: 'What do I need to run it?',
    answer:
      'You need Python 3.10 or newer, a working webcam, a microphone, speakers or headphones, and a Gemini API key from aistudio.google.com/app/apikey.',
  },
  {
    id: 'cane-replacement',
    question: 'Is it a replacement for a white cane or guide dog?',
    answer:
      'No. Drishya Sahayak is an assistive visual aid designed for describing scenes, reading text, and answering questions. It is never a replacement for a white cane, guide dog, orientation and mobility training, or human assistance. Always exercise caution when moving through any environment.',
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'Overview', href: '/#product' },
      { label: 'Pastel Features', href: '/#features' },
      { label: 'Voice Commands', href: '/#commands' },
      { label: 'Hybrid Pipeline', href: '/#how-it-works' },
      { label: 'Roadmap', href: '/#roadmap' },
    ],
  },
  {
    title: 'COMMUNITY',
    links: [
      { label: 'GitHub Repository', href: LINKS.github, external: true },
      { label: 'Demo Film (YouTube)', href: LINKS.demoFilm, external: true },
      { label: 'Creator Links (link.dhyandev.sbs)', href: LINKS.linktree, external: true },
      { label: 'Developer Website (dhyandev.sbs)', href: LINKS.website, external: true },
      { label: 'Dhyandev P on GitHub', href: LINKS.creatorGithub, external: true },
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Quick Start Install', href: '/#quickstart' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact Support', href: '/#contact' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Creator Mission', href: '/#mission' },
      { label: 'Drishya Sahayak Labs', href: '/#contact' },
      { label: 'Kannur, Kerala (Maps)', href: LINKS.mapsUrl, external: true },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Safety Notice', href: '/terms' },
      { label: 'MIT License', href: `${LINKS.github}/blob/main/LICENSE`, external: true },
    ],
  },
  {
    title: 'DOWNLOAD',
    links: [
      { label: 'Clone V1 Source', href: '/#quickstart' },
      { label: 'Get Gemini API Key', href: LINKS.geminiApiKey, external: true },
      { label: 'Glasses Concept Roadmap', href: '/#roadmap' },
    ],
  },
] as const;
