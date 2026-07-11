import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  UtensilsCrossed,
  Dumbbell,
  CheckCircle2,
  Clock,
  Flame,
  Leaf,
  Droplets,
  Moon,
  Wind,
  Footprints,
  Sun,
  Brain,
  TrendingUp,
  Timer,
  Zap,
  Star,
  Info,
  ChevronRight,
  Play,
  Salad,
  Apple,
  Fish,
  Bot,
} from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import WorkoutExplanationModal from "./WorkoutExplanationModal";
import type { WorkoutForModal } from "./WorkoutExplanationModal";
import { getWorkoutExplanation } from "../data/workoutExplanations";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
type BMICategory = "underweight" | "healthy" | "overweight" | "obese";

function bmiCategory(bmi: number): BMICategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "healthy";
  if (bmi < 30) return "overweight";
  return "obese";
}

function bmiLabel(bmi: number) {
  const map: Record<BMICategory, string> = {
    underweight: "Underweight",
    healthy: "Healthy",
    overweight: "Overweight",
    obese: "Obese",
  };
  return map[bmiCategory(bmi)];
}

/* ─────────────────────────────────────────────
   Priority badge
───────────────────────────────────────────── */
type Priority = "HIGH" | "MEDIUM" | "LOW";
function PriorityBadge({ p }: { p: Priority }) {
  const map: Record<Priority, string> = {
    HIGH: "bg-red-100 text-red-600 border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
    LOW: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border badge-pulse ${map[p]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {p} PRIORITY
    </span>
  );
}

/* ─────────────────────────────────────────────
   Category pill
───────────────────────────────────────────── */
function CategoryPill({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${color}`}
    >
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   1. WELLNESS TAB
═══════════════════════════════════════════════════════ */
interface WellnessRec {
  category: string;
  categoryColor: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  priority: Priority;
  title: string;
  explanation: string;
  benefit: string;
  timing: string;
}

function getWellnessRecs(
  bmi: number,
  _gender: string,
  history: string,
  name: string
): WellnessRec[] {
  const cat = bmiCategory(bmi);
  const first = name.split(" ")[0];
  const hasDiabetes = /diabet/i.test(history);
  const hasBP = /blood pressure|hypertension/i.test(history);

  const base: WellnessRec[] = [
    {
      category: "SLEEP",
      categoryColor: "bg-indigo-100 text-indigo-700",
      icon: Moon,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
      priority: "HIGH",
      title: "Optimize Your Sleep Quality",
      explanation: `${first}, based on your BMI of ${bmi.toFixed(1)}, quality sleep directly regulates the hormones that control appetite and metabolism. Aim for 7–9 hours each night in a cool, dark room.`,
      benefit: "Reduces cortisol, improves metabolic rate by up to 20%",
      timing: "Daily — begin wind-down at 9 PM",
    },
    {
      category: "HYDRATION",
      categoryColor: "bg-cyan-100 text-cyan-700",
      icon: Droplets,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-500",
      priority: cat === "healthy" ? "MEDIUM" : "HIGH",
      title: "Personalized Hydration Protocol",
      explanation: `At your weight of ${bmi > 0 ? Math.round(bmi * Math.pow(1.7, 2) / 10000 * 10000 / 100) : "—"} kg, your minimum daily water intake should be ${
        cat === "underweight" ? "2.0L" : cat === "healthy" ? "2.2L" : "2.5L+"
      }. ${hasDiabetes ? "As you manage diabetes, consistent hydration helps regulate blood sugar levels." : "Hydration supports joint health, digestion, and energy."}`,
      benefit: "Boosts metabolism by 30%, improves skin & cognition",
      timing: "Start with 400 ml within 30 mins of waking",
    },
  ];

  if (cat === "underweight") {
    base.push(
      {
        category: "NUTRITION",
        categoryColor: "bg-orange-100 text-orange-700",
        icon: Apple,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        priority: "HIGH",
        title: "Increase Caloric Density",
        explanation: `${first}, with a BMI of ${bmi.toFixed(1)} you're in the underweight range. Prioritize calorie-dense, nutrient-rich foods: nuts, avocado, whole-milk dairy, and legumes. Aim for a 300–500 kcal surplus daily.`,
        benefit: "Supports healthy weight gain of 0.5 kg per week",
        timing: "Every meal — add healthy fats & complex carbs",
      },
      {
        category: "FITNESS",
        categoryColor: "bg-emerald-100 text-emerald-700",
        icon: TrendingUp,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        priority: "MEDIUM",
        title: "Strength-First Exercise Plan",
        explanation: `For your current BMI, resistance training will help you build muscle mass. Start with 3 sessions per week using bodyweight exercises — push-ups, squats, lunges — then progress to weights.`,
        benefit: "Builds lean muscle, increases bone density",
        timing: "3× per week, 30–40 minutes",
      }
    );
  }

  if (cat === "healthy") {
    base.push(
      {
        category: "FITNESS",
        categoryColor: "bg-emerald-100 text-emerald-700",
        icon: Footprints,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        priority: "MEDIUM",
        title: "Maintain with 8,000 Daily Steps",
        explanation: `Great job, ${first}! Your BMI of ${bmi.toFixed(1)} is in the healthy range. Walking 8,000 steps daily helps you maintain this while improving cardiovascular health and mood.`,
        benefit: "Sustains metabolic rate, lowers cardiovascular risk by 35%",
        timing: "Any time — spread throughout the day",
      },
      {
        category: "MENTAL",
        categoryColor: "bg-violet-100 text-violet-700",
        icon: Brain,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        priority: "MEDIUM",
        title: "Daily Mindfulness Practice",
        explanation: `${first}, mental wellness is the invisible pillar of physical health. Just 10 minutes of guided meditation or deep breathing daily lowers inflammatory markers by up to 25%.`,
        benefit: "Reduces anxiety, improves sleep depth, sharpens focus",
        timing: "Morning or before bed — 10 minutes",
      }
    );
  }

  if (cat === "overweight" || cat === "obese") {
    base.push(
      {
        category: "FITNESS",
        categoryColor: "bg-orange-100 text-orange-700",
        icon: Footprints,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        priority: "HIGH",
        title: "Post-Meal Micro-Walks",
        explanation: `${first}, a gentle 10-minute walk after each main meal can lower blood glucose spikes by up to 30%. ${hasDiabetes ? "This is especially important given your diabetes management goals." : "This is one of the highest-impact habits for your BMI range."}`,
        benefit: "Reduces blood sugar spikes, burns 80–120 kcal daily",
        timing: "10 mins after breakfast, lunch & dinner",
      },
      {
        category: "NUTRITION",
        categoryColor: "bg-rose-100 text-rose-700",
        icon: Leaf,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        priority: "HIGH",
        title: "Portion Control & Plate Method",
        explanation: `Based on your BMI of ${bmi.toFixed(1)}, adopt the plate method: ½ non-starchy vegetables, ¼ lean protein, ¼ complex carbs. This creates a natural 300–500 kcal deficit without counting calories.`,
        benefit: "Supports 0.5 kg/week healthy weight loss",
        timing: "Every meal",
      }
    );
  }

  base.push(
    {
      category: "BREATHING",
      categoryColor: "bg-teal-100 text-teal-700",
      icon: Wind,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-500",
      priority: hasBP ? "HIGH" : "MEDIUM",
      title: "Box Breathing Stress Reset",
      explanation: `${hasBP ? `${first}, managing blood pressure starts with the nervous system. ` : ""}Inhale 4s → hold 4s → exhale 4s → hold 4s. Repeat 4 cycles to activate the parasympathetic nervous system and lower cortisol.`,
      benefit: `Lowers heart rate${hasBP ? ", reduces systolic BP by 5–10 mmHg" : ""} within minutes`,
      timing: "Any time stress arises — 3–5 minutes",
    },
    {
      category: "ROUTINE",
      categoryColor: "bg-amber-100 text-amber-700",
      icon: Sun,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      priority: "LOW",
      title: "Consistent Morning Routine",
      explanation: `${first}, a structured morning routine anchors your circadian rhythm. Get 15 minutes of natural light within 1 hour of waking, hydrate first, and move your body — even lightly — before checking your phone.`,
      benefit: "Improves sleep quality, stabilizes hormones throughout the day",
      timing: "Within the first hour of waking",
    }
  );

  return base;
}

function WellnessTab() {
  const { profile } = useProfile();
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  if (!profile)
    return <EmptyState tab="Wellness Protocols" icon={HeartPulse} />;

  const recs = getWellnessRecs(
    profile.bmi,
    profile.gender,
    profile.history,
    profile.name
  );

  const toggle = (i: number) =>
    setCompleted((p) => ({ ...p, [i]: !p[i] }));

  const done = Object.values(completed).filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Personalized for BMI {profile.bmi} •{" "}
            <span className="font-semibold text-orange-500">
              {bmiLabel(profile.bmi)}
            </span>
          </p>
        </div>
        <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          {done}/{recs.length} completed
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${(done / recs.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
        />
      </div>

      {/* Recommendation cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {recs.map((rec, i) => {
          const Icon = rec.icon;
          const isDone = !!completed[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`relative bg-white dark:bg-stone-900/60 rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                isDone
                  ? "border-emerald-200 dark:border-emerald-800/50"
                  : "border-stone-100 dark:border-stone-800 hover:border-orange-200"
              }`}
            >
              {isDone && (
                <div className="absolute inset-0 bg-emerald-50/50 dark:bg-emerald-900/10 pointer-events-none rounded-2xl" />
              )}
              <div className="relative">
                {/* Top row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-xl ${rec.iconBg} dark:bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4.5 h-4.5 ${rec.iconColor}`} />
                    </div>
                    <CategoryPill label={rec.category} color={rec.categoryColor} />
                  </div>
                  <PriorityBadge p={rec.priority} />
                </div>

                {/* Title */}
                <h3 className={`font-bold text-base leading-snug mb-2 ${isDone ? "line-through text-stone-400" : "text-stone-900 dark:text-white"}`}>
                  {rec.title}
                </h3>

                {/* Explanation */}
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
                  {rec.explanation}
                </p>

                {/* Benefit */}
                <div className="flex items-start gap-1.5 mb-4">
                  <Zap className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    {rec.benefit}
                  </p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{rec.timing}</span>
                  </div>
                  <button
                    onClick={() => toggle(i)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isDone
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200"
                        : "bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-500/30"
                    }`}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done ✓
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Completed
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. RECIPES TAB
═══════════════════════════════════════════════════════ */
interface Recipe {
  emoji: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: string;
  why: string;
  tags: string[];
  color: string;
}

function getRecipes(bmi: number, name: string): Recipe[] {
  const cat = bmiCategory(bmi);
  const first = name.split(" ")[0];

  const recipeMap: Record<BMICategory, Recipe[]> = {
    underweight: [
      {
        emoji: "🥑",
        name: "Avocado Egg Power Bowl",
        calories: 620,
        protein: 28,
        carbs: 42,
        fats: 36,
        prepTime: "15 min",
        why: `${first}, at BMI ${bmi.toFixed(1)} you need calorie-dense, nutrient-rich meals. This bowl delivers healthy fats from avocado and complete protein from eggs to support healthy weight gain.`,
        tags: ["High Calorie", "High Protein", "Healthy Fats"],
        color: "from-green-400 to-emerald-500",
      },
      {
        emoji: "🍌",
        name: "Peanut Butter Banana Smoothie",
        calories: 540,
        protein: 22,
        carbs: 68,
        fats: 18,
        prepTime: "5 min",
        why: `Ideal for ${first} to gain weight healthily. Natural sugars from banana combined with peanut butter's fats and protein create a nutrient-dense calorie boost between meals.`,
        tags: ["Quick", "High Calorie", "Natural Sugars"],
        color: "from-yellow-400 to-amber-500",
      },
      {
        emoji: "🍗",
        name: "Brown Rice & Grilled Chicken",
        calories: 580,
        protein: 45,
        carbs: 55,
        fats: 14,
        prepTime: "25 min",
        why: `For your underweight BMI, this meal provides complete amino acids for muscle building and complex carbs for sustained energy throughout the day.`,
        tags: ["Balanced", "High Protein", "Complex Carbs"],
        color: "from-orange-400 to-red-400",
      },
      {
        emoji: "🫐",
        name: "Greek Yogurt Berry Parfait",
        calories: 420,
        protein: 24,
        carbs: 48,
        fats: 12,
        prepTime: "8 min",
        why: `${first}, Greek yogurt provides probiotics and protein while berries deliver antioxidants and natural sugars — perfect as a healthy calorie supplement.`,
        tags: ["Probiotics", "Antioxidants", "Quick"],
        color: "from-purple-400 to-violet-500",
      },
    ],
    healthy: [
      {
        emoji: "🥗",
        name: "Mediterranean Quinoa Salad",
        calories: 380,
        protein: 18,
        carbs: 44,
        fats: 14,
        prepTime: "20 min",
        why: `${first}, your healthy BMI of ${bmi.toFixed(1)} calls for balanced, anti-inflammatory meals. Quinoa delivers all 9 essential amino acids while vegetables provide micronutrients to keep you thriving.`,
        tags: ["Anti-inflammatory", "Balanced", "Heart Healthy"],
        color: "from-emerald-400 to-teal-500",
      },
      {
        emoji: "🐟",
        name: "Baked Salmon with Steamed Broccoli",
        calories: 420,
        protein: 38,
        carbs: 20,
        fats: 22,
        prepTime: "30 min",
        why: `Omega-3 from salmon supports brain health and reduces inflammation, perfectly maintaining your healthy BMI while improving cardiovascular markers.`,
        tags: ["Omega-3", "Anti-inflammatory", "High Protein"],
        color: "from-blue-400 to-cyan-500",
      },
      {
        emoji: "🌮",
        name: "Lean Turkey Lettuce Wraps",
        calories: 340,
        protein: 32,
        carbs: 18,
        fats: 12,
        prepTime: "15 min",
        why: `Great for maintaining your BMI, ${first}. Lean turkey provides muscle-supporting protein without excess saturated fats, wrapped in low-calorie lettuce.`,
        tags: ["Low Carb", "High Protein", "Light"],
        color: "from-green-400 to-lime-500",
      },
      {
        emoji: "🍳",
        name: "Veggie Omelette with Whole Grain Toast",
        calories: 360,
        protein: 24,
        carbs: 32,
        fats: 16,
        prepTime: "12 min",
        why: `${first}, this balanced breakfast keeps blood sugar stable throughout the morning, supporting the consistent energy levels your healthy BMI allows for.`,
        tags: ["Breakfast", "Balanced", "Vegetarian"],
        color: "from-yellow-400 to-orange-400",
      },
    ],
    overweight: [
      {
        emoji: "🥦",
        name: "Grilled Chicken & Roasted Vegetables",
        calories: 320,
        protein: 38,
        carbs: 22,
        fats: 8,
        prepTime: "30 min",
        why: `${first}, with a BMI of ${bmi.toFixed(1)}, high-protein, high-fiber meals are essential. This meal keeps you satiated for 4–5 hours, reducing cravings naturally.`,
        tags: ["Low Calorie", "High Protein", "High Fiber"],
        color: "from-green-500 to-emerald-600",
      },
      {
        emoji: "🍲",
        name: "Lentil & Spinach Soup",
        calories: 280,
        protein: 18,
        carbs: 36,
        fats: 5,
        prepTime: "25 min",
        why: `Lentils are a powerhouse for weight management — high in fiber and plant protein, they slow digestion and stabilize blood sugar, ideal for your BMI range.`,
        tags: ["High Fiber", "Plant Protein", "Low Fat"],
        color: "from-orange-400 to-amber-500",
      },
      {
        emoji: "🥙",
        name: "Tuna Stuffed Bell Peppers",
        calories: 290,
        protein: 30,
        carbs: 18,
        fats: 8,
        prepTime: "20 min",
        why: `${first}, tuna provides lean protein for muscle preservation during weight loss, while bell peppers add vitamins with minimal calories.`,
        tags: ["Low Calorie", "Lean Protein", "Vitamins"],
        color: "from-red-400 to-rose-500",
      },
      {
        emoji: "🌾",
        name: "Overnight Oats with Chia Seeds",
        calories: 310,
        protein: 14,
        carbs: 46,
        fats: 9,
        prepTime: "5 min + overnight",
        why: `Beta-glucan in oats reduces cholesterol and keeps you full until lunch — an excellent breakfast strategy for gradual, sustainable weight loss.`,
        tags: ["High Fiber", "Slow Energy Release", "Easy"],
        color: "from-stone-400 to-amber-400",
      },
    ],
    obese: [
      {
        emoji: "🥗",
        name: "Cauliflower Rice Stir Fry",
        calories: 220,
        protein: 22,
        carbs: 16,
        fats: 7,
        prepTime: "20 min",
        why: `${first}, cauliflower rice delivers a satisfying volume of food at a fraction of regular rice's calories. With your BMI of ${bmi.toFixed(1)}, volume eating helps manage hunger while reducing caloric intake.`,
        tags: ["Very Low Calorie", "High Volume", "Low Carb"],
        color: "from-purple-400 to-violet-500",
      },
      {
        emoji: "🍵",
        name: "Green Tea Poached Fish with Vegetables",
        calories: 260,
        protein: 34,
        carbs: 12,
        fats: 6,
        prepTime: "25 min",
        why: `Lean fish protein preserves muscle mass during weight loss while green tea compounds support fat metabolism. Medically recommended for your BMI range.`,
        tags: ["Medical Grade", "Lean Protein", "Metabolism"],
        color: "from-teal-400 to-cyan-500",
      },
      {
        emoji: "🫘",
        name: "Black Bean & Sweet Potato Bowl",
        calories: 350,
        protein: 16,
        carbs: 52,
        fats: 6,
        prepTime: "30 min",
        why: `${first}, the resistant starch in sweet potato and fiber in black beans create a potent combination for gut health, blood sugar control, and sustainable energy.`,
        tags: ["Gut Health", "Blood Sugar", "Plant-Based"],
        color: "from-orange-500 to-amber-500",
      },
      {
        emoji: "🥬",
        name: "Turkey & Zucchini Lettuce Cups",
        calories: 240,
        protein: 28,
        carbs: 10,
        fats: 9,
        prepTime: "18 min",
        why: `A very low-calorie, high-protein option that supports the medical weight loss approach recommended for your BMI. Consult your healthcare provider for a comprehensive plan.`,
        tags: ["Medical Weight Loss", "Very Low Calorie", "Lean"],
        color: "from-green-400 to-emerald-500",
      },
    ],
  };

  return recipeMap[cat];
}

function NutritionPill({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700`}>
      <Icon className={`w-3.5 h-3.5 ${color}`} />
      <div>
        <p className="text-[10px] text-stone-400 leading-none">{label}</p>
        <p className="text-xs font-bold text-stone-700 dark:text-stone-200 leading-none mt-0.5">
          {value}
          <span className="font-normal text-stone-400">{unit}</span>
        </p>
      </div>
    </div>
  );
}

function RecipesTab() {
  const { profile } = useProfile();
  const [expanded, setExpanded] = useState<number | null>(null);

  if (!profile)
    return <EmptyState tab="Healthy Recipes" icon={UtensilsCrossed} />;

  const recipes = getRecipes(profile.bmi, profile.name);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {recipes.length} personalized recipes for{" "}
          <span className="font-semibold text-orange-500">{bmiLabel(profile.bmi)} BMI</span>
        </p>
        <div className="flex items-center gap-1 text-xs text-stone-400">
          <Info className="w-3.5 h-3.5" />
          Click a card to expand
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {recipes.map((r, i) => {
          const isOpen = expanded === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setExpanded(isOpen ? null : i)}
              className="bg-white dark:bg-stone-900/60 rounded-2xl border border-stone-100 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:border-orange-200 dark:hover:border-orange-700"
            >
              {/* Gradient header */}
              <div className={`bg-gradient-to-r ${r.color} p-5 text-white relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -right-2 -bottom-6 w-16 h-16 rounded-full bg-white/10" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <span className="text-4xl">{r.emoji}</span>
                    <h3 className="mt-2 font-bold text-lg leading-snug">{r.name}</h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {r.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] font-semibold bg-white/25 px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold">{r.calories}</p>
                    <p className="text-xs opacity-80">kcal</p>
                  </div>
                </div>
              </div>

              {/* Nutrition row */}
              <div className="px-4 py-3 grid grid-cols-4 gap-2 border-b border-stone-100 dark:border-stone-800">
                <NutritionPill icon={Fish} label="Protein" value={r.protein} unit="g" color="text-blue-500" />
                <NutritionPill icon={Leaf} label="Carbs" value={r.carbs} unit="g" color="text-emerald-500" />
                <NutritionPill icon={Apple} label="Fats" value={r.fats} unit="g" color="text-amber-500" />
                <NutritionPill icon={Clock} label="Prep" value={0} unit={r.prepTime} color="text-orange-500" />
              </div>

              {/* Expandable why section */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-4 space-y-3">
                      <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                        <Zap className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                          {r.why}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <Timer className="w-3.5 h-3.5" />
                  {r.prepTime} preparation
                </div>
                <button
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(isOpen ? null : i);
                  }}
                >
                  {isOpen ? "Show less" : "Why this recipe?"}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. WORKOUTS TAB
═══════════════════════════════════════════════════════ */
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface Workout {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  name: string;
  duration: string;
  calories: number;
  difficulty: Difficulty;
  equipment: string;
  aiRec: string;
  category: string;
  categoryColor: string;
}

function DifficultyBadge({ d }: { d: Difficulty }) {
  const map: Record<Difficulty, string> = {
    Beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Intermediate: "bg-amber-100 text-amber-700 border-amber-200",
    Advanced: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wide ${map[d]}`}>
      {d}
    </span>
  );
}

function getWorkouts(bmi: number, gender: string, name: string): Workout[] {
  const cat = bmiCategory(bmi);
  const first = name.split(" ")[0];
  const isFemale = gender === "female";

  const common: Workout[] = [
    {
      icon: Wind,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-500",
      name: "Deep Stretching & Flexibility",
      duration: "20 min",
      calories: 80,
      difficulty: "Beginner",
      equipment: "Yoga mat",
      aiRec: `${first}, stretching improves joint range of motion and reduces injury risk regardless of BMI. Perfect as a daily warm-up or cool-down routine.`,
      category: "FLEXIBILITY",
      categoryColor: "bg-teal-100 text-teal-700",
    },
    {
      icon: Brain,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-500",
      name: "Yoga Flow for Stress Relief",
      duration: "25 min",
      calories: 120,
      difficulty: isFemale ? "Beginner" : "Intermediate",
      equipment: "Yoga mat",
      aiRec: `${isFemale ? `${first}, yoga is especially effective for hormonal balance and stress management. ` : ""}This flow combines breathwork with gentle movement to lower cortisol and improve flexibility.`,
      category: "MINDFUL MOVEMENT",
      categoryColor: "bg-violet-100 text-violet-700",
    },
  ];

  const byCat: Record<BMICategory, Workout[]> = {
    underweight: [
      {
        icon: TrendingUp,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        name: "Bodyweight Strength Circuit",
        duration: "35 min",
        calories: 210,
        difficulty: "Beginner",
        equipment: "No equipment",
        aiRec: `${first}, with your BMI of ${bmi.toFixed(1)}, building muscle is the priority. This circuit — push-ups, squats, lunges — creates a muscle-building stimulus without burning excessive calories.`,
        category: "STRENGTH",
        categoryColor: "bg-orange-100 text-orange-700",
      },
      {
        icon: Dumbbell,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        name: "Progressive Dumbbell Training",
        duration: "40 min",
        calories: 240,
        difficulty: "Intermediate",
        equipment: "Dumbbells (5–15 kg)",
        aiRec: `Compound lifts like dumbbell rows, presses, and deadlifts stimulate maximum muscle growth. ${first}, pair this with your higher-calorie diet for optimal weight gain results.`,
        category: "STRENGTH",
        categoryColor: "bg-blue-100 text-blue-700",
      },
    ],
    healthy: [
      {
        icon: Footprints,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        name: "Interval Running (5K Prep)",
        duration: "30 min",
        calories: 320,
        difficulty: "Intermediate",
        equipment: "Running shoes",
        aiRec: `${first}, your healthy BMI supports moderate-high intensity cardio. Alternating 2 min jog / 1 min sprint improves VO₂ max and cardiovascular endurance.`,
        category: "CARDIO",
        categoryColor: "bg-emerald-100 text-emerald-700",
      },
      {
        icon: Dumbbell,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        name: "Full-Body Resistance Training",
        duration: "45 min",
        calories: 280,
        difficulty: "Intermediate",
        equipment: "Barbell or resistance bands",
        aiRec: `Maintaining your healthy BMI of ${bmi.toFixed(1)} requires consistent resistance training. This full-body session builds strength while preserving lean mass.`,
        category: "STRENGTH",
        categoryColor: "bg-orange-100 text-orange-700",
      },
    ],
    overweight: [
      {
        icon: Footprints,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        name: "Low-Impact Power Walking",
        duration: "40 min",
        calories: 260,
        difficulty: "Beginner",
        equipment: "Comfortable shoes",
        aiRec: `${first}, power walking is the safest, most effective cardio for your BMI of ${bmi.toFixed(1)}. It burns fat without stressing joints, and consistent daily walks create sustainable calorie deficit.`,
        category: "CARDIO",
        categoryColor: "bg-blue-100 text-blue-700",
      },
      {
        icon: TrendingUp,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        name: "Resistance Band Full-Body",
        duration: "35 min",
        calories: 220,
        difficulty: "Beginner",
        equipment: "Resistance bands",
        aiRec: `Resistance training preserves muscle during weight loss, keeping your metabolism active. ${first}, bands are joint-friendly and perfect for home use at your current fitness level.`,
        category: "STRENGTH",
        categoryColor: "bg-orange-100 text-orange-700",
      },
    ],
    obese: [
      {
        icon: Footprints,
        iconBg: "bg-teal-50",
        iconColor: "text-teal-500",
        name: "Chair-Assisted Cardio",
        duration: "20 min",
        calories: 120,
        difficulty: "Beginner",
        equipment: "Chair",
        aiRec: `${first}, chair exercises eliminate joint impact entirely while building cardiovascular fitness. Medical guidelines recommend starting here for your BMI range — small consistent steps create lasting change.`,
        category: "LOW-IMPACT CARDIO",
        categoryColor: "bg-teal-100 text-teal-700",
      },
      {
        icon: Droplets,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        name: "Water Aerobics / Pool Walking",
        duration: "30 min",
        calories: 180,
        difficulty: "Beginner",
        equipment: "Swimming pool",
        aiRec: `Water supports 90% of your body weight, allowing effective exercise with zero joint stress. ${first}, this is clinically recommended for your BMI — consider swimming twice weekly.`,
        category: "AQUA FITNESS",
        categoryColor: "bg-blue-100 text-blue-700",
      },
    ],
  };

  return [...byCat[cat], ...common];
}

function WorkoutsTab() {
  const { profile } = useProfile();
  const [started, setStarted] = useState<Record<number, boolean>>({});
  const [modalWorkout, setModalWorkout] = useState<WorkoutForModal | null>(null);

  if (!profile)
    return <EmptyState tab="Adaptive Workouts" icon={Dumbbell} />;

  const workouts = getWorkouts(profile.bmi, profile.gender, profile.name);

  const openExplanation = (w: ReturnType<typeof getWorkouts>[number]) => {
    const explanation = getWorkoutExplanation(w.name, {
      bmi: profile.bmi,
      name: profile.name,
      weight: profile.weight,
      height: profile.height,
      gender: profile.gender,
    });
    setModalWorkout({
      name: w.name,
      duration: w.duration,
      calories: w.calories,
      difficulty: w.difficulty,
      equipment: w.equipment,
      category: w.category,
      explanation,
    });
  };

  return (
    <>
      <div className="space-y-5">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Adapted for{" "}
            <span className="font-semibold text-orange-500">{bmiLabel(profile.bmi)} BMI</span>
            {" "}• {profile.gender === "female" ? "Female" : profile.gender === "male" ? "Male" : "Other"}
          </p>
          <div className="text-xs font-semibold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            {workouts.length} workouts
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {workouts.map((w, i) => {
            const Icon = w.icon;
            const isStarted = !!started[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-stone-900/60 rounded-2xl border border-stone-100 dark:border-stone-800 p-5 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl ${w.iconBg} dark:bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${w.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 dark:text-white text-sm leading-snug">
                        {w.name}
                      </h3>
                      <CategoryPill label={w.category} color={w.categoryColor} />
                    </div>
                  </div>
                  <DifficultyBadge d={w.difficulty} />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-stone-50 dark:bg-stone-800/40 rounded-xl py-2">
                    <Clock className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-100">{w.duration}</p>
                    <p className="text-[10px] text-stone-400">Duration</p>
                  </div>
                  <div className="text-center bg-stone-50 dark:bg-stone-800/40 rounded-xl py-2">
                    <Flame className="w-4 h-4 text-red-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-100">{w.calories}</p>
                    <p className="text-[10px] text-stone-400">kcal</p>
                  </div>
                  <div className="text-center bg-stone-50 dark:bg-stone-800/40 rounded-xl py-2">
                    <Star className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-[10px] font-bold text-stone-800 dark:text-stone-100 truncate">{w.equipment.split("(")[0].trim()}</p>
                    <p className="text-[10px] text-stone-400">Equipment</p>
                  </div>
                </div>

                {/* AI Rec */}
                <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30 mb-4">
                  <Zap className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    <span className="font-semibold text-orange-600 dark:text-orange-400">AI Recommendation: </span>
                    {w.aiRec}
                  </p>
                </div>

                {/* Button row */}
                <div className="flex gap-2">
                  {/* Start Workout */}
                  <button
                    onClick={() => setStarted((p) => ({ ...p, [i]: !p[i] }))}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      isStarted
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "gradient-btn text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40"
                    }`}
                  >
                    {isStarted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Started ✓
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" /> Start Workout
                      </>
                    )}
                  </button>

                  {/* Ask AI for Better Explanation */}
                  <button
                    onClick={() => openExplanation(w)}
                    className="flex-none inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold
                      bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200
                      border border-stone-200 dark:border-stone-700
                      hover:bg-orange-50 dark:hover:bg-orange-900/20
                      hover:border-orange-300 dark:hover:border-orange-700
                      hover:text-orange-600 dark:hover:text-orange-400
                      transition-all duration-200 group"
                    title="Ask AI for a detailed, personalised explanation of this workout"
                  >
                    <Bot className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    Ask AI
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Workout explanation modal */}
      <WorkoutExplanationModal
        workout={modalWorkout}
        onClose={() => setModalWorkout(null)}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   EMPTY STATE
═══════════════════════════════════════════════════════ */
function EmptyState({
  tab,
  icon: Icon,
}: {
  tab: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 flex items-center justify-center mb-5">
        <Icon className="w-10 h-10 text-orange-300" />
      </div>
      <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300 mb-2">
        No Profile Yet
      </h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs leading-relaxed">
        Complete the{" "}
        <a href="#assessment" className="text-orange-500 font-semibold hover:underline">
          Personal Health Assessment
        </a>{" "}
        above to unlock your personalized {tab}.
      </p>
      <a
        href="#assessment"
        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-btn text-white text-sm font-semibold shadow-md shadow-orange-500/25"
      >
        Go to Assessment <ChevronRight className="w-4 h-4" />
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN WELLNESS HUB
═══════════════════════════════════════════════════════ */
type Tab = "wellness" | "recipes" | "workouts";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "wellness", label: "AI Wellness Protocols", icon: HeartPulse },
  { id: "recipes", label: "Healthy Recipes", icon: Salad },
  { id: "workouts", label: "Adaptive Workouts", icon: Dumbbell },
];

export default function WellnessHub() {
  const [active, setActive] = useState<Tab>("wellness");
  const { profile } = useProfile();

  return (
    <section id="wellness-hub" className="py-10 md:py-14">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-8 px-1"
      >
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                AI Clinical Synthesizer
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
              Personalized AI Health Hub
            </h2>
            {profile ? (
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Customized for{" "}
                <span className="font-semibold text-stone-700 dark:text-stone-200">
                  {profile.name}
                </span>{" "}
                · BMI{" "}
                <span className="font-semibold text-orange-500">{profile.bmi}</span>
                {" "}·{" "}
                <span
                  className={`font-semibold ${
                    profile.bmi < 18.5
                      ? "text-red-500"
                      : profile.bmi < 25
                      ? "text-emerald-600"
                      : profile.bmi < 30
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {bmiLabel(profile.bmi)}
                </span>
              </p>
            ) : (
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Complete the assessment above to unlock your personalized plan
              </p>
            )}
          </div>

          {profile && (
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/30 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold text-sm">
                {profile.name[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-100">
                  {profile.name.split(" ")[0]}'s Plan
                </p>
                <p className="text-[10px] text-stone-400">
                  {profile.height} cm · {profile.weight} kg · Age {profile.age}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Tab navigation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="flex bg-stone-100/80 dark:bg-stone-800/60 rounded-2xl p-1.5 mb-6 gap-1"
      >
        {tabs.map((t) => {
          const isActive = active === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "tab-active shadow-sm"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">
                {t.id === "wellness" ? "Wellness" : t.id === "recipes" ? "Recipes" : "Workouts"}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Tab panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {active === "wellness" && <WellnessTab />}
          {active === "recipes" && <RecipesTab />}
          {active === "workouts" && <WorkoutsTab />}
        </motion.div>
      </AnimatePresence>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-xs text-stone-400 dark:text-stone-600"
      >
        🔬 Synthesized by WellnessAI clinical algorithms · Always consult your healthcare provider
      </motion.p>
    </section>
  );
}
