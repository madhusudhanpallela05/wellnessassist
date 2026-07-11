import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export type AuthMode = "login" | "signup";

interface Props {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitch: (m: AuthMode) => void;
}

export default function AuthModal({ open, mode, onClose, onSwitch }: Props) {
  const { signup, login } = useAuth();
  const { push } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName(""); setEmail(""); setPassword(""); setConfirm("");
    setErrors({}); setShowPw(false); setShowCf(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 250);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "signup" && !name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    if (mode === "signup" && password !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res =
      mode === "signup"
        ? await signup({ name, email, password })
        : await login({ email, password });
    setSubmitting(false);
    if (!res.ok) { push(res.error || "Something went wrong", "error"); return; }
    const firstName = (mode === "signup" ? name : email.split("@")[0]).split(" ")[0];
    push(
      mode === "signup"
        ? `Welcome to WellnessAI, ${firstName}! 🎉`
        : `Welcome back, ${firstName}! 👋`,
      "success",
    );
    handleClose();
  };

  const inputBase =
    "flex-1 bg-transparent pl-3 pr-2 py-3 text-sm outline-none placeholder:text-stone-400 dark:text-stone-100";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-stone-900 shadow-2xl shadow-stone-900/20 overflow-hidden border border-stone-100 dark:border-stone-800"
          >
            {/* Top accent */}
            <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-stone-600 dark:text-stone-300" />
            </button>

            <div className="p-7 md:p-8">
              {/* Header */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center shadow-md shadow-orange-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-bold">
                  <span className="text-orange-500">Wellness</span>
                  <span className="text-stone-800 dark:text-white">AI</span>
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-900 dark:text-white">
                {mode === "signup" ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {mode === "signup"
                  ? "Join thousands improving their wellness with AI."
                  : "Sign in to continue your wellness journey."}
              </p>

              {/* Tabs */}
              <div className="mt-6 relative flex bg-stone-100 dark:bg-stone-800 rounded-xl p-1">
                <motion.div
                  layout
                  className="absolute top-1 bottom-1 w-1/2 rounded-lg bg-white dark:bg-stone-900 shadow"
                  animate={{ x: mode === "login" ? 0 : "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
                <button
                  onClick={() => onSwitch("login")}
                  className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    mode === "login" ? "text-stone-900 dark:text-white" : "text-stone-400"
                  }`}
                >
                  <LogIn className="w-4 h-4" /> Login
                </button>
                <button
                  onClick={() => onSwitch("signup")}
                  className={`relative z-10 flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    mode === "signup" ? "text-stone-900 dark:text-white" : "text-stone-400"
                  }`}
                >
                  <UserPlus className="w-4 h-4" /> Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {mode === "signup" && (
                  <Field
                    icon={<UserIcon className="w-4 h-4" />}
                    type="text"
                    label="Full Name"
                    placeholder="Varaprasad Reddy"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    inputClass={inputBase}
                  />
                )}
                <Field
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                  inputClass={inputBase}
                />
                <Field
                  icon={<Lock className="w-4 h-4" />}
                  type={showPw ? "text" : "password"}
                  label="Password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={setPassword}
                  error={errors.password}
                  inputClass={inputBase}
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                      aria-label="Toggle password"
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                {mode === "signup" && (
                  <Field
                    icon={<Lock className="w-4 h-4" />}
                    type={showCf ? "text" : "password"}
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={confirm}
                    onChange={setConfirm}
                    error={errors.confirm}
                    inputClass={inputBase}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowCf((s) => !s)}
                        className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                        aria-label="Toggle confirm password"
                      >
                        {showCf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                )}

                {mode === "login" && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs font-semibold text-orange-500 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl gradient-btn text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all disabled:opacity-80"
                >
                  {submitting ? (
                    <>
                      <svg className="w-5 h-5 spin-slow" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="3" />
                        <path d="M12 2 A 10 10 0 0 1 22 12" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      {mode === "signup" ? "Creating your account..." : "Signing you in..."}
                    </>
                  ) : (
                    <>
                      {mode === "signup" ? "Create Account" : "Sign In"}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="mt-5 text-center text-xs text-stone-400">
                By continuing you agree to our{" "}
                <a href="#" className="text-orange-500 font-semibold hover:underline">Terms</a>{" "}
                and{" "}
                <a href="#" className="text-orange-500 font-semibold hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Field sub-component */
function Field({
  icon,
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  trailing,
  inputClass,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  trailing?: React.ReactNode;
  inputClass: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-xl bg-stone-50 dark:bg-stone-800/60 border transition-all focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/20 ${
          error ? "border-red-400" : "border-stone-200 dark:border-stone-700"
        }`}
      >
        <span className="pl-3.5 text-stone-400">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
        {trailing && <span className="pr-3">{trailing}</span>}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
