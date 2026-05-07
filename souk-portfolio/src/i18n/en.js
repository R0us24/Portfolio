export const en = {
  // Loading screen
  loading: {
    pressStart: 'PRESS START',
    title: 'QASANTINI',
  },

  // Header
  header: {
    title: 'QASANTINI PORTFOLIO',
    langToggle: 'FR',
  },

  // Souk entrance
  souk: {
    welcome: 'WELCOME TO THE SOUK',
    subtitle: 'Click on a shop to explore',
    loading: 'Loading...',
    easterEgg: 'Easter Egg found!',
  },

  // Shops config
  shops: {
    cv: { name: 'The Public Scribe', description: 'My CV & journey' },
    links: { name: 'The Weaver', description: 'My links & networks' },
    projects: { name: 'The Kitchen', description: 'My code recipes' },
    skills: { name: 'The Library', description: 'Skills & training' },
    contact: { name: 'The Carrier Pigeon', description: 'Contact me' },
    ctf: { name: 'The Arena of Challenges', description: 'My CTF & challenges' },
    gallery: { name: 'The Gallery', description: 'My creations' },
  },

  // Shop metaphors (dialog)
  metaphors: {
    cv: "Let me read you my scroll... I promise it's not too long!",
    links: 'I weave connections faster than my Wi-Fi...',
    projects: 'Leet me cook! Step into my kitchen...',
    skills: 'Open the spellbook... careful, it might make you smarter!',
    contact: "Send a pigeon! It's fast... well, for a pigeon.",
    ctf: "Welcome to the arena! Here we capture flags, not pokemons.",
    gallery: "Hold on to your eyes, it's gonna be beautiful!",
  },

  // Carpet secret
  carpetSecret: 'A flying carpet! You discovered a secret of the souk...',

  // Anecdotes
  anecdotes: [
    "Tea always tastes better when someone else makes it...",
    "404: Motivation not found. Try again after coffee.",
    "I code better at 3 AM, don't ask me why.",
    "A bug? No, it's a secret feature.",
    "☝( ◠‿◠ ).🏳️",
    "git push --force and we'll see tomorrow.",
    "Once upon a time a dev finished their project on time... that was fiction.",
    "My code compiles on the first try? There must be a trap.",
    "The best framework? The one you know at 3 AM.",
    "Ctrl+Z is my best friend.",
    "IFT2105 won again...",
    "Powered by Redstone!",
    "Bridges + mountains!",
    "Drone > pigeon!",
    "Debugging with cats!",
    "Prompt engineering!",
    "404: Internship not found :/",
    "S/O Claude",
  ],

  // CV Shop
  cvShop: {
    formation: 'Education',
    parcours: 'Background',
    parcoursEmpty: 'Coming soon...',
    download: 'Download my CV',
    cvFile: '/RoustomCV.pdf',
  },

  // Skills Shop
  skillsShop: {
    title: 'Spellbook of Knowledge',
    categories: {
      languages: 'Languages',
      frameworks: 'Frameworks',
      tools: 'Tools',
      aiTools: 'AI Tools',
      aiMl: 'AI and ML',
      libraries: 'Libraries',
      design: 'Design & Media',
      spokenLanguages: 'Spoken Languages',
    },
  },

  // Projects Shop
  projectsShop: {
    title: 'My recipes',
    subtitle: 'Each project is a unique recipe, carefully crafted',
  },

  // Links Shop
  linksShop: {
    title: "Weaver's Threads",
  },

  // Contact Shop
  contactShop: {
    title: 'Send a message',
    subtitle: "Leave me a message and I'll get back to you quickly",
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending...',
    sent: 'Message sent!',
    sentDesc: "Your message has taken flight. I'll reply soon!",
    newMessage: 'New message',
    errors: {
      name: 'Name is required',
      email: 'Email is required',
      emailInvalid: 'Invalid email format',
      subject: 'Subject is required',
      message: 'Message is required',
    },
  },

  // CTF Shop
  ctfShop: {
    title: 'The Arena of Challenges',
    subtitle: 'My battles in the world of cybersecurity',
    upcoming: 'Upcoming challenges...',
    upcomingDesc: "New challenges are coming soon. The arena hasn't stopped trembling.",
    viewDiploma: 'View diploma',
    closeDiploma: 'Click to close',
  },

  // Gallery Shop
  galleryShop: {
    title: 'My creation gallery',
    subtitle: 'A space for my works and creative projects',
    enlarge: 'Enlarge',
    close: 'Click to close',
    upcoming: 'New works will be exhibited soon...',
    placeholders: ['Coming soon...', 'Stay tuned...'],
  },

  // Footer
  footer: {
    name: 'Roustom Abdeldjalel Cherir',
    location: 'Montreal, QC',
  },

  // Profile data
  profile: {
    name: 'Roustom Abdeldjalel Cherir',
    title: 'Computer Science Student',
    bio: "Computer Science student at Universite de Montreal. Programmer (AI, Web Dev & Simulations) at EduQlasse Interactive Lab – Faculty of Education. Passionate about AI, web development and cybersecurity.",
    location: 'Montreal, QC',
  },

  // Education
  education: [
    {
      degree: "Bachelor's in Computer Science",
      school: 'Universite de Montreal',
      year: 'September 2024 - Present',
      location: 'Montreal, QC',
    },
    {
      degree: 'DEC in Commerce Management',
      school: 'Cegep Ahuntsic',
      year: 'August 2021 - May 2024',
      location: 'Montreal, QC',
    },
  ],

  // Experience
  experience: [
    {
      role: 'EduQlasse Interactive Lab – Faculty of Education, UdeM',
      company: 'Programmer – AI, Web Development & Simulations',
      period: 'March 2026 – Present',
      description: 'Developing Calculus Buddy, an AI-powered learning platform for CEGEP/university students with real-time targeted feedback and adaptive question banks. Integrating intelligent tutoring components and interactive math simulations.',
    },
    {
      role: 'UdeM Artificial Intelligence Club and Cybersecurity',
      company: 'Active Member',
      period: 'January 2025 – Present',
      description: 'Active member of the AI and Cybersecurity club at Universite de Montreal.',
    },
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: 'Youth Mental Health AI System (Mila Hackathon)',
      description:
        'Bilingual (EN/FR) risk detection system for Kids Help Phone. Stacked RoBERTa + Cohere LLM judge achieving F1 88%. Red-teamed chatbot, generated 2,500+ annotated examples across 23 risk categories with DEI coverage.',
      tech: ['Python', 'RoBERTa', 'Cohere', 'HuggingFace', 'PyTorch', 'AWS S3'],
      github: null,
      demo: null,
      color: '#9B59B6',
      period: 'March 2026',
    },
    {
      id: 2,
      title: 'PharmaBridge (Claude Hackathon — Anthropic)',
      description:
        'Full-stack web app helping European immigrants find Canadian medication equivalents via Claude AI. Bidirectional search, RAMQ coverage, safety alerts, pharmacy locator, bilingual FR/EN interface.',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'TailwindCSS', 'Anthropic SDK'],
      github: null,
      demo: 'https://devpost.com/software/pharmbridge',
      color: '#E67E22',
      period: '2026',
    },
    {
      id: 3,
      title: 'AI Email Automation Agent',
      description:
        'Developed an AI agent to summarize emails, detect intent, and suggest replies. Automated message classification and workflow actions using n8n.',
      tech: ['Python', 'AI APIs', 'n8n'],
      github: null,
      demo: null,
      color: '#1ABC9C',
      period: '2026',
    },
    {
      id: 4,
      title: 'AMC Location Car Rental Website',
      description:
        'Designed a responsive car rental website with pricing, vehicle, and booking pages. Implemented reservation calendar, price calculation, and JSON-based booking storage.',
      tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
      github: null,
      demo: null,
      color: '#2E86C1',
      period: '2026',
    },
  ],

  // CTF entries
  ctfEntries: [
    {
      name: 'UnitedCTF Hackathon',
      date: 'September 2025',
      type: 'National Competition',
      categories: ['Web Exploitation', 'Cryptography', 'Reverse Engineering'],
      description:
        'Participated in a national cybersecurity competition. Solved technical challenges under pressure.',
    },
    {
      name: 'CyberSci',
      date: 'November 2025',
      type: 'National Competition',
      categories: ['Cybersecurity', 'Cryptography', 'Vulnerability Analysis'],
      description:
        'Participated in a national Canadian cybersecurity competition solving multiple technical challenges across different domains.',
    },
    {
      name: 'FSE Game Jam - Universite de Montreal',
      date: 'February 2026',
      type: 'University Competition',
      categories: ['Game Development', 'Programming', 'Interactive Design'],
      description:
        '1st place won during an intense 48-hour event designing an educational game for students struggling with French, in an innovative multidisciplinary team.',
      hasImage: true,
    },
    {
      name: 'Claude Hackathon (Anthropic) — PharmaBridge',
      date: '2026',
      type: 'AI Hackathon',
      categories: ['Full-Stack', 'AI', 'Healthcare'],
      description:
        'Built PharmaBridge: web app helping European immigrants find Canadian medication equivalents via Claude AI. Bidirectional EU/CA search, RAMQ coverage, safety alerts, bilingual FR/EN. Stack: Next.js · TypeScript · Prisma · Anthropic SDK.',
      link: 'https://devpost.com/software/pharmbridge',
    },
    {
      name: 'Youth Mental Health Safety Hackathon (Mila)',
      date: 'March 2026',
      type: 'AI Safety Competition',
      categories: ['NLP', 'AI Safety', 'Red-Teaming'],
      description:
        'Bilingual (EN/FR) risk detection system for Kids Help Phone. Stacked RoBERTa + Cohere LLM judge, F1 88% on 2,500+ annotated examples across 23 risk categories. Stack: Python · RoBERTa · HuggingFace · Cohere · PyTorch · GPU A40.',
    },
  ],

  // Skills
  skills: {
    languages: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'HTML/CSS' },
      { name: 'C' },
    ],
    frameworks: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Streamlit' },
      { name: 'Tailwind CSS' },
      { name: 'PixiJS' },
    ],
    aiMl: [
      { name: 'LangChain' },
      { name: 'RAG' },
    ],
    aiTools: [
      { name: 'Claude Code' },
      { name: 'Cursor' },
      { name: 'GitHub Copilot' },
      { name: 'n8n' },
    ],
    tools: [
      { name: 'Git' },
      { name: 'VS Code' },
      { name: 'IntelliJ' },
      { name: 'Quartus' },
      { name: 'Excel' },
      { name: 'Vercel' },
    ],
    design: [
      { name: 'Figma' },
      { name: 'Photoshop' },
      { name: 'Adobe Premiere Pro' },
      { name: 'After Effects' },
    ],
    spokenLanguages: [
      { name: 'French' },
      { name: 'English' },
      { name: 'Arabic' },
    ],
  },
};
