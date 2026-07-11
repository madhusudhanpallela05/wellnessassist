import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../utils/api";
import { useAuth } from "./AuthContext";

export interface Profile {
  name: string;
  age: number;
  height: number;   // cm
  weight: number;   // kg
  bmi: number;
  gender: "male" | "female" | "other";
  history: string;
}

interface ProfileCtx {
  profile: Profile | null;
  setProfile: (p: Profile) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileCtx | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfileState] = useState<Profile | null>(null);

  // When a user logs in, try to load any previously saved assessment from the backend.
  useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await api.get<{ ok: boolean; profile: Profile }>("/api/profile");
      if (res.ok && res.data?.profile) {
        setProfileState(res.data.profile);
      }
    })();
  }, [user]);

  const setProfile = useCallback(
    (p: Profile) => {
      setProfileState(p);
      // Persist to the backend if the user is signed in. Fire-and-forget:
      // the UI already reflects the new profile locally either way.
      if (user) {
        api.post("/api/profile", p).catch(() => {
          /* non-fatal: profile still available locally for this session */
        });
      }
    },
    [user],
  );

  const clearProfile = useCallback(() => setProfileState(null), []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
