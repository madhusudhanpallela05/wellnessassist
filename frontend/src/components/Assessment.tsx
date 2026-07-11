import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  User,
  Ruler,
  Weight,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useProfile } from "../context/ProfileContext";

type Gender = "male" | "female" | "other";

/* ── BMI status — fully explicit dark-mode classes (no dynamic opacity trick) ── */
function bmiStatus(bmi: number) {
  if (!bmi || !isFinite(bmi))
    return {
      label: "—",
      wrapperLight: "border-stone-200 bg-stone-50",
      wrapperDark:  "dark:border-stone-600 dark:bg-stone-800",
      badgeLight:   "bg-stone-100 text-stone-600 border-stone-200",
      badgeDark:    "dark:bg-stone-700 dark:text-stone-300 dark:border-stone-600",
      valueDark:    "dark:text-stone-100",
      hint: "",
    };
  if (bmi < 18.5)
    return {
      label: "Underweight",
      wrapperLight: "border-red-200 bg-red-50",
      wrapperDark:  "dark:border-red-700 dark:bg-red-900/30",
      badgeLight:   "bg-red-100 text-red-700 border-red-200",
      badgeDark:    "dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
      valueDark:    "dark:text-red-200",
      hint: "Gain weight healthily",
    };
  if (bmi < 25)
    return {
      label: "Healthy",
      wrapperLight: "border-emerald-200 bg-emerald-50",
      wrapperDark:  "dark:border-emerald-700 dark:bg-emerald-900/30",
      badgeLight:   "bg-emerald-100 text-emerald-700 border-emerald-200",
      badgeDark:    "dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-700",
      valueDark:    "dark:text-emerald-200",
      hint: "Maintain your routine",
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      wrapperLight: "border-amber-200 bg-amber-50",
      wrapperDark:  "dark:border-amber-600 dark:bg-amber-900/30",
      badgeLight:   "bg-amber-100 text-amber-700 border-amber-200",
      badgeDark:    "dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-600",
      valueDark:    "dark:text-amber-200",
      hint: "Gradual weight loss recommended",
    };
  return {
    label: "Obese",
    wrapperLight: "border-red-200 bg-red-50",
    wrapperDark:  "dark:border-red-700 dark:bg-red-900/30",
    badgeLight:   "bg-red-100 text-red-700 border-red-200",
    badgeDark:    "dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
    valueDark:    "dark:text-red-200",
    hint: "Medical guidance advised",
  };
}

export default function Assessment() {
  const { push } = useToast();
  const { setProfile } = useProfile();

  const [name, setName]       = useState("");
  const [age, setAge]         = useState("");
  const [height, setHeight]   = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "m" | "in" | "ft">("cm");
  const [heightFeet, setHeightFeet]     = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight]   = useState("");
  const [gender, setGender]   = useState<Gender>("female");
  const [history, setHistory] = useState("");
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  /** Converts whatever the user entered (in heightUnit) into centimeters. */
  const getHeightCm = (): number => {
    if (heightUnit === "ft") {
      const ft = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const total = ft * 30.48 + inches * 2.54;
      return total > 0 ? +total.toFixed(1) : 0;
    }
    const val = parseFloat(height);
    if (!val || val <= 0) return 0;
    if (heightUnit === "cm") return +val.toFixed(1);
    if (heightUnit === "m")  return +(val * 100).toFixed(1);
    if (heightUnit === "in") return +(val * 2.54).toFixed(1);
    return 0;
  };

  const h = getHeightCm(); // always centimeters, regardless of what unit the user picked
  const w = parseFloat(weight);
  const a = parseInt(age, 10);
  const bmi    = h > 0 && w > 0 ? +(w / Math.pow(h / 100, 2)).toFixed(1) : 0;
  const status = bmiStatus(bmi);

  useEffect(() => {
    const noop = () => {};
    window.addEventListener("scroll", noop);
    return () => window.removeEventListener("scroll", noop);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())                        e.name   = "Full name is required";
    if (!age || isNaN(a) || a < 1 || a > 120) e.age  = "Enter a valid age (1–120)";
    if (heightUnit === "ft") {
      const ft = parseFloat(heightFeet);
      const inches = parseFloat(heightInches);
      const validFt = !isNaN(ft) && ft > 0;
      const validIn = !isNaN(inches) && inches > 0;
      if (!validFt && !validIn) e.height = "Enter a valid height (ft/in)";
    } else if (!height || isNaN(h) || h <= 0) {
      e.height = "Enter a positive height";
    }
    if (!weight || isNaN(w) || w <= 0)       e.weight = "Enter a positive weight";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      push("Please fix the errors in the form", "error");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setProfile({ name, age: a, height: h, weight: w, bmi, gender, history });
      push(`Assessment complete! Your BMI is ${bmi} (${status.label}) 🎯`, "success");
      setTimeout(() => setSubmitted(false), 3000);
      setTimeout(() => {
        document.getElementById("wellness-hub")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }, 1500);
  };

  const genders: { value: Gender; label: string; emoji: string }[] = [
    { value: "male",   label: "Male",   emoji: "♂" },
    { value: "female", label: "Female", emoji: "♀" },
    { value: "other",  label: "Other",  emoji: "⚧" },
  ];

  /* shared input classes */
  const inputBase =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-stone-800 border text-sm text-stone-900 dark:text-stone-100 outline-none transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500";
  const inputNormal =
    "border-stone-200 dark:border-stone-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 dark:focus:border-orange-500";
  const inputError =
    "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-400/20";

  return (
    <section id="assessment" className="relative py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5 md:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/40 text-orange-600 dark:text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Insights
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
            Personal Health Assessment
          </h2>
          <p className="mt-3 text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Tell us about yourself — our AI will create a personalized wellness plan just for you.
          </p>
        </motion.div>

        {/* ── Form card ── */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-xl shadow-stone-200/80 dark:shadow-black/40 p-6 md:p-10 border border-stone-100 dark:border-stone-800"
        >
          {/* Orange top stripe */}
          <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400" />

          <div className="grid sm:grid-cols-2 gap-5">

            {/* ── Full Name ── */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* ── Age ── */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Age (years)
              </label>
              <div className="relative">
                <CalendarDays className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="number"
                  min="1"
                  max="120"
                  step="1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className={`${inputBase} ${errors.age ? inputError : inputNormal}`}
                />
              </div>
              {errors.age && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.age}
                </p>
              )}
            </div>

            {/* ── Height ── */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Height
                </label>
                <select
                  value={heightUnit}
                  onChange={(e) => {
                    setHeightUnit(e.target.value as typeof heightUnit);
                    // clear values when switching units so old numbers aren't misread
                    setHeight("");
                    setHeightFeet("");
                    setHeightInches("");
                  }}
                  className="text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-1 outline-none focus:border-orange-400 dark:focus:border-orange-500"
                >
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                  <option value="in">in</option>
                  <option value="ft">ft / in</option>
                </select>
              </div>

              {heightUnit === "ft" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Ruler className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      placeholder="5 ft"
                      className={`${inputBase} ${errors.height ? inputError : inputNormal}`}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      step="0.1"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      placeholder="7 in"
                      className={`${inputBase.replace("pl-11", "pl-4")} ${errors.height ? inputError : inputNormal}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Ruler className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={heightUnit === "cm" ? "170" : heightUnit === "m" ? "1.7" : "67"}
                    className={`${inputBase} ${errors.height ? inputError : inputNormal}`}
                  />
                </div>
              )}

              {h > 0 && (
                <p className="mt-1.5 text-xs text-stone-400 dark:text-stone-500">
                  = {h} cm
                </p>
              )}
              {errors.height && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.height}
                </p>
              )}
            </div>

            {/* ── Weight ── */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Weight (kg)
              </label>
              <div className="relative">
                <Weight className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="65"
                  className={`${inputBase} ${errors.weight ? inputError : inputNormal}`}
                />
              </div>
              {errors.weight && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.weight}
                </p>
              )}
            </div>

            {/* ── Gender ── */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-3">
                {genders.map((g) => {
                  const active = gender === g.value;
                  return (
                    <button
                      type="button"
                      key={g.value}
                      onClick={() => setGender(g.value)}
                      className={`relative py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                        active
                          ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-900/25 dark:text-orange-300 dark:border-orange-500 shadow-md shadow-orange-500/10"
                          : "border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-orange-200 dark:hover:border-orange-700"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xl">{g.emoji}</span>
                        <span>{g.label}</span>
                      </div>
                      {active && (
                        <motion.div
                          layoutId="genderCheck"
                          className="absolute top-2 right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-orange-500" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── BMI (auto-calculated) ── */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                BMI (auto-calculated)
              </label>
              <motion.div
                layout
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-colors
                  ${bmi > 0
                    ? `${status.wrapperLight} ${status.wrapperDark}`
                    : "border-stone-200 bg-white dark:border-stone-600 dark:bg-stone-800"
                  }`}
              >
                <div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Your Body Mass Index
                  </p>
                  <p className={`text-3xl font-bold mt-1 text-stone-800 ${bmi > 0 ? status.valueDark : "dark:text-stone-100"}`}>
                    {bmi || "—"}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border
                      ${bmi > 0
                        ? `${status.badgeLight} ${status.badgeDark}`
                        : "bg-stone-100 text-stone-500 border-stone-200 dark:bg-stone-700 dark:text-stone-400 dark:border-stone-600"
                      }`}
                  >
                    {status.label}
                  </span>
                  {bmi > 0 && (
                    <p className="mt-1.5 text-xs text-stone-400 dark:text-stone-500">
                      {status.hint}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ── Medical History ── */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Medical History{" "}
                <span className="font-normal text-stone-400 dark:text-stone-500">(optional)</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-4 top-4 text-stone-400" />
                <textarea
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                  rows={4}
                  placeholder="Diabetes, Blood Pressure, Allergies, Asthma..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-400/20 outline-none text-sm resize-none transition-all text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
                />
              </div>
            </div>

          </div>{/* end grid */}

          {/* ── Submit ── */}
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: submitting ? 1 : 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl gradient-btn text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-80"
          >
            {submitting ? (
              <>
                <svg className="w-5 h-5 spin-slow" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="3" />
                  <path d="M12 2 A 10 10 0 0 1 22 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Analyzing your health profile...
              </>
            ) : submitted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Assessment Submitted!
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate My Wellness Plan
              </>
            )}
          </motion.button>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium"
            >
              <ChevronDown className="w-4 h-4 animate-bounce" />
              Scroll down to view your personalized plan
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
