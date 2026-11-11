/**
 * Everything the site says lives here — the components only render it.
 *
 * Colour tokens are mirrored as CSS variables at the top of app/globals.css.
 * Changing a colour means changing both.
 */

export const INK = '#000000';
export const PAPER = '#FFFFFF';
export const TEXT = '#1F1F1F';
export const BODY = '#333333';
export const MUTED = '#555555';
/** Ultramarine spot colour: buttons, links, active states. */
export const SPOT = '#2B44F0';
/** Lighter spot colour for small text on the black contact page. */
export const SPOT_SOFT = '#9AA8FF';
/** Newsprint tints — each section is printed on its own stock, like a weekly manga magazine. */
export const YELLOW = '#F4EBC1';
export const BLUE = '#D6E6F2';
export const PINK = '#F5D9DD';
/** WhatsApp's brand green, for the WhatsApp buttons only. */
export const WHATSAPP_GREEN = '#25D366';

export const DISPLAY_FONT = "var(--font-display), 'Arial Black', Impact, sans-serif";

export const LINKS = {
  github: 'https://github.com/Chathuranga97lj',
  linkedin: 'https://www.linkedin.com/in/chathuranga97',
  email: 'chathuit97@gmail.com',
  /** Shown as written; the link uses the international form (Sri Lanka, +94). */
  whatsapp: '076 871 1780',
  whatsappLink: 'https://wa.me/94768711780',
};

export const NAV = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

/** Page section id → nav link it lights up. "How I work" has no link of its own. */
export const SECTION_SPY: ReadonlyArray<readonly [string, string]> = [
  ['skills', 'skills'],
  ['projects', 'projects'],
  ['experience', 'experience'],
  ['certificates', 'certificates'],
  ['approach', ''],
  ['contact', 'contact'],
];

export const NAME_LINES = ['Chathuranga', 'L Jayawardhana'];
/** Line index → letter index drawn in the accent colour, so the name spells out the CJ monogram. */
export const CJ_LETTERS: Record<number, number> = { 0: 0, 1: 2 };

export const FACTS = [
  { label: 'Works at', value: 'Efito Solutions, since 2023' },
  { label: 'Main language', value: 'TypeScript' },
  { label: 'Learning now', value: 'Go and Flutter' },
  { label: 'Open to', value: 'New projects and collaborations' },
];

/** One plain-language line per tool, so anyone can follow the tech names. */
export const TOOL_INFO: Record<string, string> = {
  'Next.js': 'A framework for building fast websites with React.',
  Angular: "Google's framework for building large web apps.",
  'Node.js': "Runs JavaScript on servers, the part of an app you don't see.",
  'Express.js': 'A lightweight Node.js framework for building web servers and APIs.',
  TypeScript: 'JavaScript with extra checks that catch mistakes before users do.',
  JavaScript: 'The language that makes websites interactive.',
  Laravel: 'A PHP framework for building web apps and the servers behind them.',
  Python: 'A popular, easy-to-read language used for scripts, data and AI.',
  Go: 'A fast, simple language from Google, made for building servers.',
  Flutter: 'Builds Android and iPhone apps from one set of code.',
  MySQL: 'A popular database that keeps information in neat tables.',
  MongoDB: 'A flexible database that stores information as documents.',
  'REST APIs': 'A common way for apps and servers to talk to each other over the web.',
  Git: 'Keeps a history of every code change, so teams can work together safely.',
  Linux: "The operating system most of the internet's servers run on.",
  React: 'A popular way to build the screens people click and type into on a website.',
  NestJS: 'A Node.js framework for building well-organised servers and APIs.',
  PostgreSQL: 'A powerful database that can enforce its own rules, so records stay correct.',
  Supabase: 'A ready-made back end: sign-in, a database and file storage in one place.',
  Docker: 'Packs an app with everything it needs, so it runs the same on any server.',
};

export type SkillGroup = { title: string; note: string; tools: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  { title: 'Every day', note: 'What I use most at work', tools: ['Next.js', 'Angular', 'Node.js', 'Express.js', 'TypeScript', 'JavaScript'] },
  { title: 'Also built with', note: "More tools I've worked with", tools: ['React', 'NestJS', 'Laravel', 'Python'] },
  { title: 'Learning now', note: "What I'm getting better at", tools: ['Go', 'Flutter'] },
  {
    title: 'Data and tools',
    note: 'What keeps everything running',
    tools: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase', 'REST APIs', 'Docker', 'Git', 'Linux'],
  },
];

/** Manga screentones for the project covers. 12px tiles, so the hover drift loops cleanly. */
const TONE_DOTS = 'radial-gradient(circle, rgba(0,0,0,0.5) 1.7px, transparent 2.1px)';
const TONE_LINES =
  'linear-gradient(45deg, rgba(0,0,0,0.42) 0 12.5%, transparent 12.5% 50%, rgba(0,0,0,0.42) 50% 62.5%, transparent 62.5% 100%)';
const TONE_HATCH = `${TONE_LINES}, linear-gradient(-45deg, rgba(0,0,0,0.3) 0 12.5%, transparent 12.5% 50%, rgba(0,0,0,0.3) 50% 62.5%, transparent 62.5% 100%)`;
const TONE_GRID =
  'linear-gradient(rgba(0,0,0,0.32) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,0,0,0.32) 1.5px, transparent 1.5px)';
const TONE_BIG_DOTS = 'radial-gradient(circle, rgba(0,0,0,0.55) 2.6px, transparent 3px)';

export type ProjectKind = 'web' | 'mobile';
export type ProjectFilter = 'all' | ProjectKind;

export type Project = {
  id: string;
  name: string;
  kind: ProjectKind;
  type: string;
  years: string;
  desc: string;
  tech: string[];
  /** Empty when there is no public link; the card then points to the contact section. */
  link: string;
  domain: string;
  /** Link text; defaults to "Visit <domain>". */
  linkLabel?: string;
  /** Optional extra pill next to the year, e.g. "Open source". */
  badge?: string;
  coverBg: string;
  tone: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'mindada',
    name: 'Mindada',
    kind: 'web',
    type: 'Website',
    years: '2023 – now',
    desc: "Sri Lanka's first AI-powered marriage matchmaking website. It learns what each person is looking for to suggest better matches, and keeps profiles secure. Built from start to finish.",
    tech: ['Next.js', 'Node.js', 'TypeScript', 'MongoDB'],
    link: 'https://mindada.lk/',
    domain: 'mindada.lk',
    coverBg: SPOT,
    tone: TONE_DOTS,
  },
  {
    id: 'pothgula',
    name: 'Pothgula',
    kind: 'web',
    type: 'Web app',
    years: '2026 – now',
    badge: 'Open source',
    desc: 'A free, open-source library system for community and temple libraries with several branches. It handles lending, memberships, books moving between branches and reports, in English and Sinhala.',
    tech: ['React', 'NestJS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/Chathuranga97lj/pothgula',
    domain: 'github.com',
    linkLabel: 'See the code on GitHub',
    coverBg: BLUE,
    tone: TONE_GRID,
  },
  {
    id: 'top-tutors',
    name: 'TopTutors Global',
    kind: 'web',
    type: 'Website',
    years: '2025 – now',
    desc: 'An international tutoring website that connects students with qualified tutors in many subjects, with easy scheduling and interactive lessons.',
    tech: ['Angular', 'Node.js', 'MySQL'],
    link: 'https://toptutorsglobal.com/',
    domain: 'toptutorsglobal.com',
    coverBg: YELLOW,
    tone: TONE_LINES,
  },
  {
    id: 'motor-stock',
    name: 'Motor Stock',
    kind: 'mobile',
    type: 'Mobile app',
    years: '2026',
    desc: 'A mobile app that runs a motorbike parts shop across two branches: parts and stock with photos, bills to print or share, money still owed, and deliveries from suppliers.',
    tech: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL'],
    link: 'https://github.com/Chathuranga97lj/motor-stock',
    domain: 'github.com',
    linkLabel: 'See the code on GitHub',
    coverBg: PAPER,
    tone: TONE_BIG_DOTS,
  },
  {
    id: 'kiriguru',
    name: 'Kiriguru',
    kind: 'mobile',
    type: 'Mobile app',
    years: '2024',
    desc: 'A mobile app that helps farmers manage their livestock and work directly with vets out in the field.',
    tech: ['Flutter', 'Go', 'MongoDB'],
    link: '',
    domain: '',
    coverBg: PINK,
    tone: TONE_HATCH,
  },
];

/** Cards shown before "See more": one row of projects, two rows of certificates on desktop. */
export const PROJECTS_SHOWN = 3;
export const CERTS_SHOWN = 6;

export const PROJECT_FILTERS:{ key: ProjectFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Websites' },
  { key: 'mobile', label: 'Mobile apps' },
];

export type TimelineTag = 'Work' | 'Talk' | 'Study';

export const TAG_COLORS: Record<TimelineTag, { bg: string; fg: string }> = {
  Work: { bg: SPOT, fg: PAPER },
  Talk: { bg: YELLOW, fg: INK },
  Study: { bg: INK, fg: PAPER },
};

export type TimelineEntry = { tag: TimelineTag; when: string; title: string; org: string; body: string };

/** Newest first. */
export const TIMELINE: TimelineEntry[] = [
  {
    tag: 'Work',
    when: 'Feb 2026 – now',
    title: 'Software Engineer',
    org: 'Efito Solutions',
    body: 'I build and launch real web platforms from front to back: Next.js and Angular for the screens people use, Node.js behind them, and MySQL and MongoDB to store the data.',
  },
  {
    tag: 'Talk',
    when: 'Apr 2025',
    title: 'Tech talk: making Next.js apps faster',
    org: 'Efito Solutions Tech Session #3',
    body: 'A live session, streamed on Facebook, sharing practical ways to speed up Next.js apps.',
  },
  {
    tag: 'Work',
    when: 'Feb 2024 – Feb 2026',
    title: 'Associate Software Engineer',
    org: 'Efito Solutions (remote)',
    body: 'Worked remotely on production web apps, mostly built with Next.js.',
  },
  {
    tag: 'Work',
    when: 'Feb 2023 – Apr 2024',
    title: 'Software Engineer Intern',
    org: 'Efito Solutions',
    body: 'Where my career started: writing JavaScript and TypeScript on real projects.',
  },
  {
    tag: 'Study',
    when: 'Completed',
    title: 'BEng (Hons) Software Engineering (top-up)',
    org: 'London Metropolitan University',
    body: 'Completed my honours degree in Software Engineering, building on my diploma from the University of Moratuwa.',
  },
  {
    tag: 'Study',
    when: '2019 – 2023',
    title: 'Diploma in IT, Mathematics, Computer Science and Information Technology',
    org: 'University of Moratuwa',
    body: 'My National Diploma in Technology (NDT): the basics of maths, computer science and IT, and where I wrote my first real code in JavaScript and TypeScript.',
  },
];

export type CertTopic = 'code' | 'data' | 'net' | 'pm';
export type CertFilter = 'all' | CertTopic;

export const CERT_TOPICS: { key: CertFilter; label: string; tint: string }[] = [
  { key: 'all', label: 'All', tint: PAPER },
  { key: 'code', label: 'Programming', tint: YELLOW },
  { key: 'data', label: 'Data and AI', tint: BLUE },
  { key: 'net', label: 'Networks and security', tint: PINK },
  { key: 'pm', label: 'Project management', tint: PAPER },
];

export type Cert = { id: string; name: string; issuer: string; date: string; topic: CertTopic; url: string };

/** Licenses and certifications from the LinkedIn profile, newest first. */
export const CERTS: Cert[] = [
  { id: 'ccna-itn', name: 'CCNA: Introduction to Networks', issuer: 'Cisco', date: 'May 2022', topic: 'net', url: 'https://www.credly.com/badges/e054c279-743b-4234-8a66-dfcd8044b243' },
  { id: 'scrum', name: 'Scrum Foundation Professional Certificate', issuer: 'CertiProf', date: 'Sep 2021', topic: 'pm', url: 'https://www.credly.com/badges/40bd9c82-c099-4e36-b2d0-773a862c39e5' },
  { id: 'data-science', name: 'Introduction to Data Science', issuer: 'Alison', date: 'Jul 2021', topic: 'data', url: 'https://alison.com/user/learner-verification/21307494/1658' },
  { id: 'adagrad', name: 'AdaGrad ’21, Introduction to Machine Learning', issuer: 'IEEE Computer Society of SLTC', date: 'Jun 2021', topic: 'data', url: 'https://drive.google.com/file/d/15HqUcSV1SXeCoGF1Z9ftiX_OXWFRrXr0/view?usp=drivesdk' },
  { id: 'js-react', name: 'JavaScript and React JS', issuer: 'Google for Developers', date: 'Jun 2021', topic: 'code', url: 'https://www.cert.shapeai.cf/verify/Z1DMuYX' },
  { id: 'python-ml', name: 'Python and Machine Learning', issuer: 'Google for Developers', date: 'Jun 2021', topic: 'data', url: 'https://www.cert.shapeai.cf/verify/ZEIqJP' },
  { id: 'html5', name: 'Introduction to HTML5', issuer: 'Coursera', date: 'Jun 2021', topic: 'code', url: 'https://www.coursera.org/account/accomplishments/certificate/RTESRUB4JCJD' },
  { id: 'codemania', name: "Road to CodeMania'21: Python Fundamentals & Algorithmic Programming", issuer: 'IEEE Computer Society of SLTC', date: 'May 2021', topic: 'code', url: 'https://drive.google.com/file/d/1ldlz8-i5ulwAhdiahLol78lirV8Blrwh/view?usp=drivesdk' },
  { id: 'cybersecurity', name: 'Introduction to Cybersecurity', issuer: 'Cisco', date: 'Mar 2021', topic: 'net', url: 'https://www.credly.com/badges/45951e2e-70a9-4f5b-8d76-bdf2069225fe' },
  { id: 'cyberhat', name: 'CYBERHAT 1.0', issuer: 'IEEE Computer Society of SLTC', date: 'Jan 2021', topic: 'net', url: 'https://drive.google.com/file/d/1WvJpvJVIKWdawYRlQZuSpLHmWWvb2NfD/view?usp=drivesdk' },
  { id: 'py4e', name: 'Programming for Everybody (Getting Started with Python)', issuer: 'Coursera', date: 'Aug 2020', topic: 'code', url: 'https://www.coursera.org/account/accomplishments/certificate/BXDC3DQHFLH7' },
];

/** "How I work". `tilt` gives each panel a slight hand-pinned angle. */
export const PRINCIPLES = [
  { title: 'Release small, release often', body: 'Small, frequent updates mean problems are spotted early and fixed fast.', tilt: '-1.2deg' },
  { title: 'Clear code over clever code', body: "Code that's easy to read is easy to fix, change and hand over.", tilt: '0.8deg' },
  { title: 'Measure first, then improve', body: 'I find out what is actually slow before trying to speed it up.', tilt: '-0.6deg' },
  { title: 'Finish what I start', body: 'No half-built features left behind.', tilt: '1.1deg' },
];
