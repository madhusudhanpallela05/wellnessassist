import { motion } from "framer-motion";
import { Droplets, Flame, Quote, Sparkles, TrendingUp } from "lucide-react";
import Counter from "./Counter";

const tips = [
  "Aim for 7–9 hours of quality sleep tonight.",
  "Add 10 minutes of mindful stretching to your day.",
  "Swap one processed snack for whole fruit.",
];

export default function Sidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-5 sticky top-24 self-start w-80">
      {/* BMI Tips */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-stone-900/60 rounded-2xl p-5 shadow-md border border-stone-100 dark:border-stone-800"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-orange-500" />
          </div>
          <h4 className="font-bold text-stone-800 dark:text-white">Today's BMI Tips</h4>
        </div>
        <ul className="space-y-2.5">
          {tips.map((t, i) => (
            <li key={i} className="flex gap-2 text-sm text-stone-600 dark:text-stone-300">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex-shrink-0" />
              <span className="leading-relaxed">{t}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white dark:bg-stone-900/60 rounded-2xl p-5 shadow-md border border-stone-100 dark:border-stone-800"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 p-4 text-white shadow-md shadow-teal-500/25">
            <Droplets className="w-5 h-5 mb-2 opacity-90" />
            <p className="text-xs opacity-90">Water Intake</p>
            <p className="text-xl font-bold mt-0.5">
              <Counter to={1.8} decimals={1} /> L
            </p>
            <p className="text-[10px] opacity-80 mt-0.5">of 2.5 L goal</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-4 text-white shadow-md shadow-orange-500/25">
            <Flame className="w-5 h-5 mb-2 opacity-90" />
            <p className="text-xs opacity-90">Calories</p>
            <p className="text-xl font-bold mt-0.5">
              <Counter to={1840} />
            </p>
            <p className="text-[10px] opacity-80 mt-0.5">kcal burned</p>
          </div>
        </div>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white shadow-lg shadow-orange-500/25"
      >
        <Quote className="w-8 h-8 opacity-25 absolute top-3 right-3" />
        <p className="text-xs font-semibold opacity-90 mb-2">Daily Motivation</p>
        <p className="text-sm leading-relaxed italic">
          "Take care of your body. It's the only place you have to live."
        </p>
        <p className="text-[11px] opacity-80 mt-2">— Jim Rohn</p>
      </motion.div>

      {/* AI Assistant */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-stone-900/60 rounded-2xl p-5 shadow-md border border-stone-100 dark:border-stone-800 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl gradient-btn flex items-center justify-center shadow-lg shadow-orange-500/30 pulse-ring">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h4 className="mt-4 font-bold text-stone-800 dark:text-white">AI Assistant</h4>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
          Available 24/7 to answer your wellness questions.
        </p>
        <button className="mt-3 w-full text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 py-2 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors border border-orange-100 dark:border-orange-800/30">
          Chat Now
        </button>
      </motion.div>
    </aside>
  );
}
