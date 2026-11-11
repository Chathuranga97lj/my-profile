type IconProps = { size?: number };

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'square' as const,
};

/** External link: opens another site. */
export function ArrowUpRight({ size = 14 }: IconProps) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

/** Jumps further down this page. */
export function ArrowDown({ size = 14 }: IconProps) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" />
    </svg>
  );
}

export function ArrowUp({ size = 14 }: IconProps) {
  return (
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M8 14V3M3.5 7.5 8 3l4.5 4.5" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="14" viewBox="0 0 18 14">
      <path d="M0 1.5h18M0 7h18M0 12.5h18" stroke="currentColor" strokeWidth={3} />
    </svg>
  );
}
