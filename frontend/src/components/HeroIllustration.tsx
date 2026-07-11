import { motion } from "framer-motion";
import { Heart, Droplets, Flame, Dumbbell, Sparkles, Bot } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   StatCard — dark bg in dark mode, warm-white in light mode
───────────────────────────────────────────────────────── */
function StatCard({
  icon,
  iconBgLight,
  iconBgDark,
  iconColorLight,
  iconColorDark,
  label,
  value,
  unit,
  dot,
  className,
  delay,
}: {
  icon: React.ElementType;
  iconBgLight: string;
  iconBgDark: string;
  iconColorLight: string;
  iconColorDark: string;
  label: string;
  value: string;
  unit: string;
  dot?: boolean;
  className?: string;
  delay: number;
}) {
  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
        backdrop-blur-sm shadow-xl
        /* ── LIGHT MODE ── */
        bg-white/90 border border-orange-100
        shadow-orange-200/60
        /* ── DARK MODE ── */
        dark:bg-[#1a1208]/90 dark:border-orange-900/40
        dark:shadow-black/40
        ${className}`}
    >
      {/* icon box */}
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
          ${iconBgLight} dark:${iconBgDark}`}
      >
        <Icon
          className={`w-[18px] h-[18px] ${iconColorLight} dark:${iconColorDark}`}
          strokeWidth={2}
        />
      </div>

      {/* text */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase leading-none
            text-stone-400 dark:text-stone-400">
          {label}
          {dot && (
            <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-orange-500 align-middle" />
          )}
        </p>
        <p className="mt-0.5 text-base font-bold leading-none
            text-stone-800 dark:text-white">
          {value}{" "}
          <span className="font-semibold text-sm text-orange-500 dark:text-orange-400">
            {unit}
          </span>
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Orbiting dot — orange in both modes, slightly dimmer
   in light mode so it doesn't overpower the pale bg
───────────────────────────────────────────────────────── */
function OrbitDot({
  radius,
  duration,
  startAngle,
  size = 6,
}: {
  radius: number;
  duration: number;
  startAngle: number;
  size?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-orange-400 dark:bg-orange-400 opacity-80 dark:opacity-100"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      animate={{
        x: [
          Math.cos((startAngle * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 120) * Math.PI) / 180) * radius,
          Math.cos(((startAngle + 240) * Math.PI) / 180) * radius,
          Math.cos((startAngle * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((startAngle * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 120) * Math.PI) / 180) * radius,
          Math.sin(((startAngle + 240) * Math.PI) / 180) * radius,
          Math.sin((startAngle * Math.PI) / 180) * radius,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   SVG Ring — single component, colour passed as prop
   so we can render light + dark rings independently
───────────────────────────────────────────────────────── */
function Ring({
  r,
  stroke,
  opacity = 0.35,
  dash = "6 10",
}: {
  r: number;
  stroke: string;
  opacity?: number;
  dash?: string;
}) {
  const size = r * 2 + 4;
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={stroke}
          strokeOpacity={opacity}
          strokeWidth="1.2"
          strokeDasharray={dash}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LightRings  — warm orange dashes for light mode
   DarkRings   — same structure, used in dark mode
   We show one set and hide the other via Tailwind
───────────────────────────────────────────────────────── */
function LightRings() {
  return (
    <div className="block dark:hidden">
      <Ring r={90}  stroke="#f97316" opacity={0.18} dash="4 8"  />
      <Ring r={130} stroke="#f97316" opacity={0.28} dash="6 10" />
      <Ring r={170} stroke="#f97316" opacity={0.16} dash="3 12" />
      <Ring r={210} stroke="#fb923c" opacity={0.10} dash="5 14" />
    </div>
  );
}

function DarkRings() {
  return (
    <div className="hidden dark:block">
      <Ring r={90}  stroke="#f97316" opacity={0.20} dash="4 8"  />
      <Ring r={130} stroke="#f97316" opacity={0.30} dash="6 10" />
      <Ring r={170} stroke="#f97316" opacity={0.22} dash="3 12" />
      <Ring r={210} stroke="#f97316" opacity={0.15} dash="5 14" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────── */
export default function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">

      {/* ── ambient glow ── light: soft peach; dark: deep orange ── */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl
          bg-orange-300/25 dark:bg-orange-500/10"
      />
      <div
        className="absolute w-48 h-48 rounded-full blur-2xl
          bg-amber-200/30 dark:bg-amber-400/10"
      />

      {/* ── dashed concentric rings ── */}
      <LightRings />
      <DarkRings />

      {/* ── pulsing inner glow ring ── */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-44 h-44 rounded-full"
        style={{
          /* light: gentle warm-orange glow; dark: deeper orange */
          background:
            "radial-gradient(circle, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.05) 60%, transparent 80%)",
          boxShadow: "0 0 55px 18px rgba(249,115,22,0.10)",
        }}
      />

      {/* ── orbiting accent dots ── */}
      <OrbitDot radius={130} duration={10} startAngle={90}  size={7} />
      <OrbitDot radius={130} duration={10} startAngle={270} size={7} />
      <OrbitDot radius={170} duration={16} startAngle={0}   size={5} />

      {/* ── central AI icon (unchanged) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 180 }}
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/50"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)",
          }}
        >
          <Bot className="w-10 h-10 text-white" strokeWidth={1.8} />
        </motion.div>

        {/* label pill — dark card in dark mode, warm cream in light mode */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-lg
            /* light */ bg-white border border-orange-200 shadow-orange-100/80
            /* dark  */ dark:bg-[#1a1208]/90 dark:border-orange-800/50 dark:shadow-black/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
          <span className="text-[11px] font-bold tracking-widest uppercase
              text-orange-600 dark:text-orange-300">
            Wellness AI
          </span>
        </motion.div>
      </motion.div>

      {/* ── TOP — Heart Rate ── */}
      <StatCard
        icon={Heart}
        iconBgLight="bg-orange-100"
        iconBgDark="bg-orange-500/20"
        iconColorLight="text-orange-500"
        iconColorDark="text-orange-400"
        label="Heart Rate"
        value="72"
        unit="bpm"
        dot
        delay={0.7}
        className="-top-4 left-1/2 -translate-x-1/2"
      />

      {/* ── LEFT — Water ── */}
      <StatCard
        icon={Droplets}
        iconBgLight="bg-cyan-100"
        iconBgDark="bg-cyan-500/20"
        iconColorLight="text-cyan-600"
        iconColorDark="text-cyan-400"
        label="Water"
        value="1.6"
        unit="L"
        delay={0.85}
        className="left-0 sm:-left-6 top-1/2 -translate-y-1/2"
      />

      {/* ── RIGHT — Calories ── */}
      <StatCard
        icon={Flame}
        iconBgLight="bg-amber-100"
        iconBgDark="bg-amber-500/20"
        iconColorLight="text-amber-600"
        iconColorDark="text-amber-400"
        label="Calories"
        value="1,842"
        unit=""
        delay={1.0}
        className="right-0 sm:-right-6 top-1/2 -translate-y-1/2"
      />

      {/* ── BOTTOM — Workout ── */}
      <StatCard
        icon={Dumbbell}
        iconBgLight="bg-violet-100"
        iconBgDark="bg-violet-500/20"
        iconColorLight="text-violet-600"
        iconColorDark="text-violet-400"
        label="Workout"
        value="42"
        unit="min"
        delay={1.15}
        className="-bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
