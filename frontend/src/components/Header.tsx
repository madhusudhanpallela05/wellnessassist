import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Moon, Sun, LogOut, User as UserIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import type { AuthMode } from "./AuthModal";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

interface Props {
  onOpenAuth: (mode: AuthMode) => void;
}

export default function Header({ onOpenAuth }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-orange-500">Wellness</span>
            <span className="text-stone-800 dark:text-white">AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-stone-600" />
              )}
            </motion.span>
          </button>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-orange-300 dark:hover:border-orange-700 transition-colors shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                  {firstName}
                </span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-stone-900 shadow-xl border border-stone-100 dark:border-stone-800 p-2"
                  >
                    <div className="px-3 py-2.5 border-b border-stone-100 dark:border-stone-800">
                      <p className="text-xs text-stone-400">Signed in as</p>
                      <p className="text-sm font-bold text-stone-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full mt-1 flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" /> Profile
                    </button>
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth("login")}
                className="hidden sm:inline-flex text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-orange-500 transition-colors px-3 py-2"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth("signup")}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2.5 rounded-xl gradient-btn shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-100 transition-all"
              >
                Sign Up
                <Sparkles className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mb-3 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl p-4 shadow-xl border border-stone-100 dark:border-stone-800"
          >
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-500"
                >
                  {l.label}
                </a>
              ))}
              {user ? (
                <>
                  <div className="mt-2 px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-stone-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { logout(); setOpen(false); }}
                    className="mt-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => { onOpenAuth("login"); setOpen(false); }}
                    className="flex-1 text-center text-sm font-medium py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { onOpenAuth("signup"); setOpen(false); }}
                    className="flex-1 text-center text-sm font-semibold text-white py-2.5 rounded-xl gradient-btn"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
