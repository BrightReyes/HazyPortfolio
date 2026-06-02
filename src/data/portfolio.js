export const profile = {
  name: 'Hazy Bright P. Reyes',
  role: 'Aspiring Software Engineer',
  location: 'Philippines',
  tagline:
    'Designing clean interfaces, reliable systems, and practical software that solves real problems.',
  email: 'your.email@example.com',
  resumeUrl: '#',
  socials: [
    { label: 'GitHub', href: 'https://github.com/yourusername' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
    { label: 'Portfolio Repo', href: 'https://github.com/yourusername/portfolio' },
  ],
};


export const projects = [
  {
    title: 'ThreatTrack',
    type: 'CRIME REPORTING SYSTEM',
    role: 'Fullstack Developer',
    shortDescription:
      'A cross-platform mobile app and administrative web dashboard built to synchronize local crime data and emergency SOS alerts with real-time response capabilities.',
    description:
      'The system relies on a high-speed data synchronization framework designed to route simulated emergency alerts to an admin panel in under 2 seconds. The architecture handles secure user authentication pipelines, real-time GPS coordinate streams via Google Maps API integration, and an automated text summarization engine. As fullstack developer, I integrated the Gemini AI processing pipelines to condense raw multi-line incident logs into instant, actionable summaries for system administrators.',
    techList: [
      { category: 'Frontend / Mobile', tech: 'React Native, React, Vite, JavaScript, Google Maps API' },
      { category: 'Backend & Services', tech: 'Firebase (Auth, Firestore, Cloud Messaging), Gemini AI' },
    ],
    status: 'Featured',
    year: '2026',
    links: { demo: '#', code: '#' },
    videoUrl: '/media/ThreatTrack.mov',
  },
  {
    title: 'Road Rumble',
    type: 'TOP-DOWN ARCADE GAME',
    role: 'Co-Developer',
    shortDescription:
      'A fast-paced, split-screen desktop racing game featuring dynamic obstacle courses, interactive weapons, and concurrent multiplayer matches.',
    description:
      'The game state operates on highly decoupled structural systems to execute physics calculations, weapon interactions, and lane-switching loops smoothly without frame drops. The visual architecture utilizes independent viewport camera rendering layers to deliver a clean local competitive split-screen experience. Working alongside my co-developer, I engineered the dynamic object spawning framework, configuring it to parse external JSON files to seamlessly scale enemy velocities and obstacle densities in real time.',
    techList: [
      { category: 'Engine & Languages', tech: 'Unity, C#' },
      { category: 'Data & Mechanics', tech: 'PlayerPrefs, JSON' },
    ],
    status: 'Build',
    year: '2026',
    links: { demo: '#', code: '#' },
    videoUrl: '/media/RoadRumble.mov',
  },
  {
    title: 'Barangay System',
    type: 'INVENTORY MANAGEMENT',
    role: 'Backend Developer',
    shortDescription:
      'A centralized inventory management and asset booking platform designed to eliminate scheduling conflicts across local municipal barangays.',
    description:
      'The application utilizes a multi-dashboard infrastructure backed by strict role-based access control (RBAC) to ensure total data isolation between different user clearance levels. The core challenge involved mitigating scheduling overlaps during high-volume borrowing requests. I resolved this by designing custom real-time database listeners and calendar-blocking logic that completely eliminates multi-user booking conflicts, paired with automated database stock counters that update precisely upon event completion timestamps.',
    techList: [
      { category: 'Frontend', tech: 'HTML5, CSS3, JavaScript, Vite' },
      { category: 'Backend & Services', tech: 'Firebase (Firestore, Authentication), Vercel' },
    ],
    status: 'Live',
    year: '2026',
    links: { demo: '#', code: '#' },
    videoUrl: '/media/Barangay Inventory Management.mp4',
  },
  {
    title: 'Library System',
    type: 'MACHINE LEARNING PLATFORM',
    role: 'Backend Developer',
    shortDescription:
      'A secure cataloging and circulation system paired with an algorithmic recommendation engine to improve user reading engagement.',
    description:
      'The platform features an isolated data access layer built to govern distinct user permission paths for separate student search and librarian management screens. The primary feature is a content-based filtering mechanism that parses text attributes using TF-IDF vectors and Cosine Similarity matrices to generate instant book suggestions. On the backend, I programmed atomic database transaction structures to protect the checkout system, successfully preventing race conditions during simultaneous catalog updates.',
    techList: [
      { category: 'Backend & API', tech: 'Python, Django REST Framework, SQLite' },
      { category: 'Data Science & UI', tech: 'Scikit-learn, Tkinter' },
    ],
    status: 'Prototype',
    year: '2025',
    links: { demo: '#', code: '#' },
    videoUrl: '/media/Library Management System.mp4',
  },
];

export const skills = [
  {
    group: 'Frontend Engineering',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    group: 'Backend Engineering',
    items: ['Node.js', 'Express', 'MySQL', 'Firebase', 'REST APIs', 'Authentication'],
  },
  {
    group: 'Engineering Workflow',
    items: ['Git', 'Debugging', 'Testing Basics', 'Code Reviews', 'Documentation'],
  },
];
