export const colors = {
  rose: "#EBA2A2",
  lavender: "#B39DDB",
  blush: "#FADADD",
  cream: "#FFFBF7",
  plum: "#651C32",
  slate: "#6B7280",
} as const;

export const gradients = {
  romanticBg:
    "bg-[radial-gradient(circle_at_top,_rgba(235,162,162,0.22),_transparent_44%),radial-gradient(circle_at_82%_28%,_rgba(179,157,219,0.14),_transparent_42%),linear-gradient(to_bottom,_#fff8f8,_#fffbf7_46%,_#fff6f2)]",
  softGlow: "bg-[radial-gradient(circle,_rgba(235,162,162,0.18),_rgba(255,255,255,0)_68%)]",
} as const;

export const shadows = {
  soft: "shadow-[0_8px_24px_rgba(101,28,50,0.08)]",
  layered: "shadow-[0_18px_50px_rgba(101,28,50,0.14)]",
  hover: "hover:shadow-[0_12px_30px_rgba(101,28,50,0.14)]",
} as const;

export const radii = {
  card: "rounded-3xl",
  block: "rounded-2xl",
  pill: "rounded-full",
} as const;

export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
  gentleFloat: {
    animate: { y: [0, -5, 0], opacity: [0.22, 0.34, 0.22] },
    transition: { duration: 6.4, repeat: Infinity, ease: "easeInOut" as const },
  },
} as const;

export const textStyles = {
  headingSerif: "font-serif text-rose-950",
  bodySoft: "text-slate-600",
  microLabel: "text-[11px] uppercase tracking-[0.22em] text-rose-600",
} as const;

export const componentStyles = {
  glassCard: "border border-rose-100/90 bg-white/75 backdrop-blur-xl",
  countdownBlock:
    "min-w-0 border border-rose-200/55 bg-gradient-to-b from-white/90 to-rose-50/50 backdrop-blur",
  pillButton:
    "inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-6 py-3 text-sm font-medium text-rose-900 transition-all hover:bg-rose-100",
} as const;

export const THEME = {
  colors,
  gradients,
  shadows,
  radii,
  motionPresets,
  textStyles,
  componentStyles,
} as const;
