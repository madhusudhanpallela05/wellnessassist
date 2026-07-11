import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden hero-gradient">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Powered by Advanced AI · HIPAA Compliant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-stone-900 dark:text-white"
          >
            Your Personal{" "}
            <span className="relative inline-block">
              <span className="text-orange-500">AI Wellness</span>
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 5 Q 50 2, 100 4 T 198 3"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
              </svg>
            </span>{" "}
            Companion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed"
          >
            Track your health, receive personalized wellness insights, healthy
            recipes, and achieve your fitness goals — all powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#assessment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl gradient-btn text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.03] active:scale-100 transition-all"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#wellness-hub"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold border border-stone-200 dark:border-stone-700 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <Play className="w-4 h-4 text-orange-500" />
              Learn More
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex items-center gap-6 flex-wrap"
          >
            <div className="flex -space-x-2">
              {["#f97316", "#10b981", "#f59e0b", "#6366f1"].map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white dark:border-stone-900"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">{s}</span>
                ))}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Trusted by{" "}
                <span className="font-bold text-stone-800 dark:text-stone-200">50,000+</span>{" "}
                users worldwide
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right illustration — dark orbital panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[480px] sm:h-[540px] flex items-center justify-center"
        >
          {/* Backdrop — warm cream in light mode, dark brown in dark mode */}
          {/* Light mode panel */}
          <div
            className="absolute inset-4 rounded-[2.5rem] overflow-hidden block dark:hidden"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, #fff7ed 0%, #ffedd5 40%, #fed7aa 75%, #fdba74 100%)",
              boxShadow:
                "0 0 0 1.5px rgba(249,115,22,0.18), 0 24px 64px rgba(249,115,22,0.12), inset 0 0 80px rgba(249,115,22,0.08)",
            }}
          />
          {/* Dark mode panel */}
          <div
            className="absolute inset-4 rounded-[2.5rem] overflow-hidden hidden dark:block"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, #1f1005 0%, #0f0800 50%, #080400 100%)",
              boxShadow:
                "0 0 0 1px rgba(249,115,22,0.12), 0 32px 80px rgba(0,0,0,0.55), inset 0 0 60px rgba(249,115,22,0.04)",
            }}
          />
          {/* Illustration sits on top */}
          <div className="relative w-full h-full">
            <HeroIllustration />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
