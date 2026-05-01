import { Lock, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useVerifyAdmin } from "../hooks/useAdmin";

export function AdminLoginModal() {
  const { showLoginModal, setShowLoginModal } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const verify = useVerifyAdmin();

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verify.mutate(
      { username, password },
      {
        onSuccess: () => {
          toast.success("Admin login successful! Welcome.");
          setUsername("");
          setPassword("");
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : "Login failed"),
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "oklch(var(--foreground) / 0.5)" }}
      data-ocid="admin.dialog"
    >
      <div className="bg-card rounded-2xl shadow-elevated w-full max-w-sm animate-slide-down border border-border">
        <div className="gradient-warm p-5 rounded-t-2xl relative">
          <button
            type="button"
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-smooth"
            data-ocid="admin.close_button"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2 text-primary-foreground">
            <Lock size={20} />
            <h2 className="font-display text-lg font-semibold">Admin Login</h2>
          </div>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Shree Vishwakarma Library
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-foreground mb-1.5"
              htmlFor="admin-username"
            >
              Username
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full pl-9 pr-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                required
                data-ocid="admin.input"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-foreground mb-1.5"
              htmlFor="admin-password"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {verify.isError && (
            <p
              className="text-destructive text-sm"
              data-ocid="admin.error_state"
            >
              {verify.error instanceof Error
                ? verify.error.message
                : "Login failed. Please try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={verify.isPending}
            className="w-full gradient-warm text-primary-foreground py-2.5 rounded-lg font-medium text-sm transition-smooth hover:opacity-90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-ring"
            data-ocid="admin.confirm_button"
          >
            {verify.isPending ? "Verifying..." : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
