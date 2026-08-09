export const INK = '#14110F';
export const PAPER = '#F7F2E5';
export const PAPER_DARK = '#EDE6D6';
export const ORANGE = '#F97316';
export const ORANGE_DEEP = '#E8590C';
export const RED = '#B91C1C';
export const SKY = '#38BDF8';
export const MUTED = '#4A443C';

export type Sign = { sign: string; text: string };

export const SEQUENCE: Sign[] = [
  { sign: '巳 · Snake', text: 'booting kernel — linux up' },
  { sign: '未 · Ram', text: 'npm install @konoha/next' },
  { sign: '猿 · Monkey', text: 'compiling typescript…' },
  { sign: '亥 · Boar', text: 'connecting mongodb + mysql' },
  { sign: '馬 · Horse', text: 'go routines spawned 🐹' },
  { sign: '寅 · Tiger', text: 'flutter build --release 📱' },
  { sign: '解 · Kai', text: 'deploy complete — kuchiyose!' },
];

export type FilterKey = 'all' | 'fullstack' | 'mobile' | 'backend';

export type Tech = { name: string; key: Exclude<FilterKey, 'all'> };
export type StackGroup = {
  label: string;
  desc: string;
  tagBg: string;
  tagFg: string;
  delay: number;
  techs: Tech[];
};

export const STACK: StackGroup[] = [
  {
    label: 'CORE JUTSU',
    desc: 'Daily kekkei genkai',
    tagBg: ORANGE,
    tagFg: INK,
    delay: 0,
    techs: [
      { name: 'Next.js', key: 'fullstack' },
      { name: 'Angular', key: 'fullstack' },
      { name: 'Node.js', key: 'backend' },
      { name: 'TypeScript', key: 'fullstack' },
      { name: 'JavaScript', key: 'fullstack' },
    ],
  },
  {
    label: 'TRAINING ARC',
    desc: 'Learning & growth',
    tagBg: SKY,
    tagFg: INK,
    delay: 120,
    techs: [
      { name: 'Go 🐹', key: 'backend' },
      { name: 'Flutter 📱', key: 'mobile' },
    ],
  },
  {
    label: 'SUPPORT SQUAD',
    desc: 'Tools & infrastructure',
    tagBg: PAPER,
    tagFg: INK,
    delay: 240,
    techs: [
      { name: 'MySQL', key: 'backend' },
      { name: 'MongoDB', key: 'backend' },
      { name: 'Git', key: 'fullstack' },
      { name: 'Linux', key: 'backend' },
    ],
  },
];

export type Project = {
  name: string;
  category: string;
  filterKey: Exclude<FilterKey, 'all'>;
  rank: string;
  rankBg: string;
  rankFg: string;
  sfx: string;
  year: string;
  desc: string;
  tech: string[];
  link: string;
};

export const PROJECTS: Project[] = [
  {
    name: 'Mindada',
    category: 'Full Stack',
    filterKey: 'fullstack',
    rank: 'S-RANK',
    rankBg: RED,
    rankFg: PAPER,
    sfx: 'ドン！',
    year: '2025',
    desc: "Sri Lanka's first AI-powered matrimonial platform — matchmaking engine, secure profiles, built end to end.",
    tech: ['Next.js', 'Node.js', 'TypeScript', 'MongoDB'],
    link: 'https://mindada.lk/',
  },
  {
    name: 'Top-Tutors Global',
    category: 'Full Stack',
    filterKey: 'fullstack',
    rank: 'A-RANK',
    rankBg: ORANGE,
    rankFg: INK,
    sfx: 'バン！',
    year: '2024',
    desc: 'Online platform connecting students and tutors worldwide through a simple, secure, interactive digital space.',
    tech: ['Angular', 'Node.js', 'MySQL'],
    link: 'https://toptutorsglobal.com/',
  },
  {
    name: 'Kiriguru',
    category: 'Mobile / Flutter',
    filterKey: 'mobile',
    rank: 'B-RANK',
    rankBg: SKY,
    rankFg: INK,
    sfx: 'ゴゴゴ',
    year: '2024',
    desc: 'Mobile app helping farmers manage livestock and coordinate directly with veterinarians in the field.',
    tech: ['Flutter', 'Go', 'MongoDB'],
    link: '#',
  },
];

export const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'fullstack', label: 'FULL STACK' },
  { key: 'mobile', label: 'MOBILE' },
  { key: 'backend', label: 'BACKEND' },
];

export type TimelineEvent = {
  title: string;
  org: string;
  period: string;
  dot: string;
  body: string;
  bg: string;
  titleColor: string;
  metaColor: string;
  bodyColor: string;
};

export const TIMELINE: TimelineEvent[] = [
  {
    title: 'SOFTWARE ENGINEER',
    org: 'Efito Solutions',
    period: 'CURRENT',
    dot: ORANGE,
    body: 'Building and shipping production web platforms across the stack — Next.js and Angular front ends on Node.js services, with MySQL and MongoDB behind them.',
    bg: PAPER,
    titleColor: INK,
    metaColor: RED,
    bodyColor: MUTED,
  },
  {
    title: 'THE ACADEMY',
    org: 'Computer Science / IT',
    period: 'EDUCATION',
    dot: SKY,
    body: 'Foundations in algorithms, systems and software design — the training ground before the field missions.',
    bg: PAPER,
    titleColor: INK,
    metaColor: '#0284C7',
    bodyColor: MUTED,
  },
  {
    title: 'ENGINEERING CREED',
    org: 'How I build',
    period: 'ALWAYS',
    dot: RED,
    body: 'Ship small, ship often. Readable code beats clever code. Measure before optimising. Never abandon a build half-finished — that is my ninja way.',
    bg: INK,
    titleColor: ORANGE,
    metaColor: ORANGE,
    bodyColor: '#B8B0A0',
  },
];

export const RANKS = [
  { label: 'Rank: Jonin Engineer', bg: ORANGE, fg: INK },
  { label: 'Village: Colombo, LK', bg: PAPER, fg: INK },
  { label: 'Squad: Efito Solutions', bg: INK, fg: PAPER },
  { label: 'Chakra: TypeScript', bg: RED, fg: PAPER },
];

export const LINKS = {
  github: 'https://github.com/Chathuranga97lj',
  linkedin: 'https://www.linkedin.com/in/chathuranga97',
  email: 'chathuit97@gmail.com',
};
