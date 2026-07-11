import { Sparkles, Code2, Briefcase, Send, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "HIPAA Compliance", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const socials = [
  { Icon: Code2, href: "#", label: "GitHub" },
  { Icon: Briefcase, href: "#", label: "LinkedIn" },
  { Icon: Send, href: "#", label: "Telegram" },
  { Icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-20 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950"
    >
      {/* Top orange accent bar */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center shadow-md shadow-orange-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">
                <span className="text-orange-500">Wellness</span>
                <span className="text-stone-800 dark:text-white">AI</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              Your personal AI wellness companion — guiding you to a healthier,
              happier life every day.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 dark:hover:text-orange-400 flex items-center justify-center transition-colors text-stone-500 dark:text-stone-400"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-stone-500 dark:text-stone-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-4">
              Stay updated
            </h4>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
              Get weekly wellness tips and AI-powered insights.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-sm placeholder:text-stone-400"
              />
              <button className="px-4 py-2.5 rounded-xl gradient-btn text-white text-sm font-semibold hover:shadow-md shadow-orange-500/25 transition-shadow">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} WellnessAI. All rights reserved. Made
            with 🧡 for your well-being.
          </p>
          <p className="text-xs text-stone-400">
            Built with AI · Powered by compassion
          </p>
        </div>
      </div>
    </footer>
  );
}
