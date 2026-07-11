import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Sparkles, Send, Bot } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

interface Msg {
  role: "bot" | "user";
  text: string;
}

function buildGreeting(name: string | null): Msg {
  if (name) {
    const first = name.split(" ")[0];
    return {
      role: "bot",
      text: `Hello ${first}! 👋 How can I help you today? I can share tips on nutrition, fitness, sleep, or mental wellness — just ask!`,
    };
  }
  return {
    role: "bot",
    text: "Hi there! 👋 I'm your WellnessAI assistant. Sign up to get a personalized experience, or ask me anything about nutrition, fitness, sleep, or mental health. 🌱",
  };
}

export default function FloatingChat() {
  const { user } = useAuth();
  const { push } = useToast();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => [buildGreeting(user?.name ?? null)]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastUserId, setLastUserId] = useState<string | null>(user?.email ?? null);

  const currentId = user?.email ?? null;
  if (currentId !== lastUserId) {
    setLastUserId(currentId);
    setMsgs([buildGreeting(user?.name ?? null)]);
  }

  const firstName = useMemo(
    () => (user?.name ? user.name.split(" ")[0] : null),
    [user?.name],
  );

  const replyFor = (q: string): string => {
    const lower = q.toLowerCase();
    const named = (base: string) =>
      firstName && Math.random() > 0.35 ? `${firstName}, ${base}` : base;

    if (/bmi|weight|overweight|underweight/.test(lower))
      return `Based on your profile${firstName ? `, ${firstName}` : ""}, I recommend a balanced routine: 30 minutes of moderate activity daily, whole-food meals, and consistent sleep. Want me to craft a personalized plan?`;
    if (/sleep|insomnia|tired/.test(lower))
      return named("for better sleep, try dimming the lights an hour before bed, avoid screens, and enjoy a warm cup of chamomile tea. Consistency is key.");
    if (/water|hydrat/.test(lower))
      return named("aim for around 2L of water a day. Add cucumber or lemon slices if plain water feels boring!");
    if (/stress|anxious|anxiety|mental/.test(lower))
      return named("mindfulness matters — even 5 minutes of deep breathing can reduce stress by up to 30%. You've got this 💛");
    if (/food|diet|recipe|eat|nutrition/.test(lower))
      return named("focus on colorful plates: half vegetables, a quarter lean protein, a quarter whole grains. I can suggest recipes tailored to your BMI.");
    if (/workout|exercise|gym|fitness/.test(lower))
      return named("a great weekly mix is 150 minutes of cardio plus 2–3 strength sessions. Let me tailor a plan for you.");
    if (/hi|hello|hey/.test(lower))
      return firstName
        ? `Hi ${firstName}! Great to see you. What would you like to focus on today?`
        : "Hi there! What would you like to focus on today?";
    if (/thank/.test(lower))
      return firstName
        ? `You're very welcome, ${firstName}! 💙 Keep up the great work.`
        : "You're very welcome! 💙 Keep up the great work.";
    return firstName
      ? `Great question, ${firstName}! Could you share a bit more context so I can give you the most relevant advice?`
      : "Great question! Could you share a bit more context so I can give the most relevant advice?";
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    // Try the backend AI endpoint first; fall back to the local rule-based
    // reply if the server is unreachable, so the chat still works offline.
    const res = await api.post<{ ok: boolean; reply: string }>("/api/chat", { message: text });
    const reply = res.ok && res.data?.reply ? res.data.reply : replyFor(text);

    setMsgs((m) => [...m, { role: "bot", text: reply }]);
    setTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-24 right-5 z-[90] w-[calc(100vw-40px)] sm:w-96 h-[520px] bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-3xl shadow-2xl shadow-orange-500/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Wellness Assistant</p>
                  <p className="text-[11px] opacity-90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    {firstName ? `Chatting with ${firstName}` : "Online · Replies instantly"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50 dark:bg-stone-950/40">
              {msgs.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-400/30">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-br-md shadow-md shadow-orange-500/20"
                        : "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-bl-md shadow-sm border border-stone-100 dark:border-stone-700"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-orange-400"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-900">
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-2xl pl-4 pr-1.5 py-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={
                    firstName
                      ? `Ask me anything, ${firstName}...`
                      : "Ask your wellness question..."
                  }
                  className="flex-1 bg-transparent text-sm outline-none py-2 placeholder:text-stone-400 dark:text-stone-100"
                />
                <button
                  onClick={send}
                  className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center hover:scale-105 active:scale-100 transition-transform shadow-sm shadow-orange-500/30"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setOpen((o) => !o);
          if (!open && firstName) push(`Hi ${firstName}! How can I help?`, "info");
        }}
        className="fixed bottom-5 right-5 z-[95] w-14 h-14 rounded-2xl gradient-btn text-white shadow-xl shadow-orange-500/40 flex items-center justify-center pulse-ring"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
