import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Sparkles,
  Target,
  ListChecks,
  Zap,
  ShieldCheck,
  TrendingUp,
  Dumbbell,
  Clock,
  Flame,
  Star,
  ChevronRight,
  Bot,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */
export interface WorkoutExplanation {
  whatItIs: string;
  whyForYou: string;
  howToPerform: string[];   // step-by-step list
  musclesTargeted: string;
  benefits: string[];       // bullet list
  safetyTips: string[];     // bullet list
  progression: string;
}

export interface WorkoutForModal {
  name: string;
  duration: string;
  calories: number;
  difficulty: string;
  equipment: string;
  category: string;
  explanation: WorkoutExplanation;
}

interface Props {
  workout: WorkoutForModal | null;
  onClose: () => void;
}

/* ─── Section header inside the modal ───────────────── */
function Section({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100 uppercase tracking-wide">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

/* ─── Bullet list ────────────────────────────────────── */
function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${color}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Numbered step list ─────────────────────────────── */
function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800/40 text-orange-600 dark:text-orange-400 text-xs font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{step}</p>
        </li>
      ))}
    </ol>
  );
}

/* ─── Main Modal ─────────────────────────────────────── */
export default function WorkoutExplanationModal({ workout, onClose }: Props) {
  if (!workout) return null;
  const { explanation: ex } = workout;

  return (
    <AnimatePresence>
      {workout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-hidden flex flex-col
              bg-white dark:bg-stone-900
              rounded-t-3xl sm:rounded-3xl
              shadow-2xl shadow-stone-900/30
              border border-stone-100 dark:border-stone-800"
          >
            {/* Orange accent top bar */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 flex-shrink-0" />

            {/* ── Header ── */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl gradient-btn flex items-center justify-center shadow-md shadow-orange-500/30">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
                        AI Deep Explanation
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white leading-tight">
                      {workout.name}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center flex-shrink-0 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-stone-500" />
                </button>
              </div>

              {/* Quick stats strip */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  { icon: Clock,  label: "Duration",   val: workout.duration,             color: "text-orange-500" },
                  { icon: Flame,  label: "Calories",   val: `${workout.calories} kcal`,   color: "text-red-500" },
                  { icon: Star,   label: "Level",      val: workout.difficulty,            color: "text-amber-500" },
                  { icon: Dumbbell, label: "Equipment", val: workout.equipment.split("(")[0].trim(), color: "text-violet-500" },
                ].map(({ icon: Ic, label, val, color }) => (
                  <div key={label} className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-2 text-center">
                    <Ic className={`w-3.5 h-3.5 mx-auto mb-1 ${color}`} />
                    <p className="text-[10px] font-bold text-stone-700 dark:text-stone-200 truncate">{val}</p>
                    <p className="text-[9px] text-stone-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

              {/* 1. What it is */}
              <Section icon={Target} title="What Is This Workout?" color="bg-orange-500">
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 rounded-xl p-3.5">
                  {ex.whatItIs}
                </p>
              </Section>

              {/* 2. Why for you */}
              <Section icon={Sparkles} title="Why This Is Recommended For You" color="bg-amber-500">
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-xl p-3.5">
                  {ex.whyForYou}
                </p>
              </Section>

              {/* 3. How to perform */}
              <Section icon={ListChecks} title="How To Perform — Step by Step" color="bg-emerald-500">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-3.5">
                  <StepList steps={ex.howToPerform} />
                </div>
              </Section>

              {/* 4. Muscles / systems targeted */}
              <Section icon={Dumbbell} title="Muscles & Systems Targeted" color="bg-blue-500">
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl p-3.5">
                  {ex.musclesTargeted}
                </p>
              </Section>

              {/* 5. Health benefits */}
              <Section icon={Zap} title="Expected Health Benefits" color="bg-violet-500">
                <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30 rounded-xl p-3.5">
                  <BulletList items={ex.benefits} color="bg-violet-500" />
                </div>
              </Section>

              {/* 6. Safety tips */}
              <Section icon={ShieldCheck} title="Safety Tips & Common Mistakes" color="bg-rose-500">
                <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/30 rounded-xl p-3.5">
                  <BulletList items={ex.safetyTips} color="bg-rose-400" />
                </div>
              </Section>

              {/* 7. Progression */}
              <Section icon={TrendingUp} title="How To Progress Over Time" color="bg-teal-500">
                <div className="flex items-start gap-2.5 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/30 rounded-xl p-3.5">
                  <ChevronRight className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {ex.progression}
                  </p>
                </div>
              </Section>

              {/* Footer disclaimer */}
              <p className="text-[11px] text-stone-400 dark:text-stone-600 text-center pb-2">
                🔬 Generated by WellnessAI · Always consult your healthcare provider before starting a new routine.
              </p>
            </div>

            {/* ── Footer close button ── */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl gradient-btn text-white font-semibold text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
