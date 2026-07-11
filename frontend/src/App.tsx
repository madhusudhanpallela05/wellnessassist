import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Assessment from "./components/Assessment";
import WellnessHub from "./components/WellnessHub";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";
import ScrollProgress from "./components/ScrollProgress";
import AuthModal from "./components/AuthModal";
import type { AuthMode } from "./components/AuthModal";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProfileProvider>
            <ScrollProgress />
            <div className="relative min-h-screen bg-stone-50 dark:bg-stone-950">
              <Header onOpenAuth={openAuth} />
              <main>
                <Hero />

                {/* Assessment + Sidebar grid */}
                <div
                  id="about"
                  className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1fr_320px] gap-10 items-start"
                >
                  <div className="min-w-0">
                    <Assessment />
                    {/* Wellness Hub replaces ActionCards */}
                    <WellnessHub />
                  </div>
                  <Sidebar />
                </div>
              </main>
              <Footer />
              <FloatingChat />
              <AuthModal
                open={authOpen}
                mode={authMode}
                onClose={() => setAuthOpen(false)}
                onSwitch={setAuthMode}
              />
            </div>
          </ProfileProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
