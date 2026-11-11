/* ---------------------------------------------------------------------------
   Colour is NOT defined here any more.

   These are references to the CSS custom properties in `app/globals.css`, so a
   component writing `color: INK` emits `color: var(--ink)` and follows the
   active theme automatically. Changing a colour is now a one-file edit, and
   dark mode needs no component changes at all.

   Read the names as roles: `INK` is "the line work and the inverted surface" —
   in the dark theme it is bone, not black.
--------------------------------------------------------------------------- */

export const INK = 'var(--ink)';
export const PAPER = 'var(--paper)';
export const GROUND = 'var(--ground)';
export const CHIP = 'var(--chip)';

export const INK_70 = 'var(--ink-70)';
export const INK_45 = 'var(--ink-45)';
export const ON_INK = 'var(--on-ink)';
export const ON_INK_70 = 'var(--on-ink-70)';
export const ON_INK_45 = 'var(--on-ink-45)';

/** Fill only — always carries FIXED_INK on top. */
export const ORANGE = 'var(--accent)';
/** The same hue, dark enough to be legible as text on paper. */
export const ORANGE_INK = 'var(--accent-ink)';
export const ORANGE_QUIET = 'var(--accent-quiet)';

export const RED = 'var(--red)';
export const SKY = 'var(--sky)';
export const SKY_INK = 'var(--sky-ink)';
export const TERM = 'var(--term)';

/** Do not swap with the theme — for text on fills that keep their colour. */
export const FIXED_INK = 'var(--fixed-ink)';
export const FIXED_PAPER = 'var(--fixed-paper)';

export type Sign = { sign: string; text: string };

/**
 * Three beats, not seven. The splash is now ~1.3s and skippable, so the
 * sequence has to tell its whole story — boot, build, ship — in that budget.
 */
export const SEQUENCE: Sign[] = [
  { sign: '巳 · Snake', text: 'booting kernel' },
  { sign: '猿 · Monkey', text: 'compiling typescript' },
  { sign: '解 · Kai', text: 'deploy complete' },
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
    tagFg: FIXED_INK,
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
    tagFg: FIXED_INK,
    delay: 70,
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
    delay: 140,
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
    rankFg: FIXED_PAPER,
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
    rankFg: FIXED_INK,
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
    rankFg: FIXED_INK,
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
  /** The creed panel inverts — ink surface, light type. The other two don't. */
  inverted?: boolean;
};

export const TIMELINE: TimelineEvent[] = [
  {
    title: 'SOFTWARE ENGINEER',
    org: 'Efito Solutions',
    period: 'CURRENT',
    dot: ORANGE,
    body: 'Building and shipping production web platforms across the stack — Next.js and Angular front ends on Node.js services, with MySQL and MongoDB behind them.',
  },
  {
    title: 'THE ACADEMY',
    org: 'Computer Science / IT',
    period: 'EDUCATION',
    dot: SKY,
    body: 'Foundations in algorithms, systems and software design — the training ground before the field missions.',
  },
  {
    title: 'ENGINEERING CREED',
    org: 'How I build',
    period: 'ALWAYS',
    dot: RED,
    body: 'Ship small, ship often. Readable code beats clever code. Measure before optimising. Never abandon a build half-finished — that is my ninja way.',
    inverted: true,
  },
];

export const RANKS = [
  { label: 'Jonin Engineer', bg: ORANGE, fg: FIXED_INK },
  { label: 'Colombo, LK', bg: PAPER, fg: INK },
  { label: 'Efito Solutions', bg: INK, fg: ON_INK },
  { label: 'TypeScript', bg: RED, fg: FIXED_PAPER },
];

export const LINKS = {
  github: 'https://github.com/Chathuranga97lj',
  linkedin: 'https://www.linkedin.com/in/chathuranga97',
  email: 'chathuit97@gmail.com',
};
