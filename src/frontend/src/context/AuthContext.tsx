import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AdminSession } from "../types";

interface AuthContextType {
  session: AdminSession | null;
  isAdmin: boolean;
  login: (username: string) => void;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const SESSION_KEY = "svl_admin_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? (JSON.parse(stored) as AdminSession) : null;
    } catch {
      return null;
    }
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = useCallback((username: string) => {
    const s: AdminSession = { username, loggedInAt: Date.now() };
    setSession(s);
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    setShowLoginModal(false);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  useEffect(() => {
    if (session && Date.now() - session.loggedInAt > 7 * 24 * 60 * 60 * 1000) {
      logout();
    }
  }, [session, logout]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isAdmin: !!session,
        login,
        logout,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
