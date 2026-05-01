import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Toaster } from "sonner";
import { useAuth } from "../context/AuthContext";
import { AdminLoginModal } from "./AdminLoginModal";
import { SaraswatiLogo } from "./SaraswatiLogo";

interface LayoutProps {
  children: ReactNode;
}

const navLinks = [
  { to: "/", label: "Home", icon: BookOpen },
  { to: "/seats", label: "Seats", icon: MapPin },
  { to: "/notices", label: "Notices", icon: Bell },
  { to: "/enroll", label: "Enroll", icon: Users },
];

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/revenue", label: "Revenue", icon: TrendingUp },
  { to: "/admin/messages", label: "Messages", icon: MessageCircle },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function Layout({ children }: LayoutProps) {
  const { isAdmin, logout, setShowLoginModal } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isAdminPage = pathname.startsWith("/admin");
  const currentLinks = isAdminPage ? adminLinks : navLinks;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border shadow-warm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" data-ocid="nav.home.link" className="flex-shrink-0">
            <SaraswatiLogo size="sm" showText={true} />
          </Link>

          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {currentLinks.map(({ to, label, icon: Icon }) => {
              const active =
                to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav.${label.toLowerCase()}.link`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    active
                      ? "bg-primary text-primary-foreground shadow-warm"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <>
                {!isAdminPage && (
                  <Link
                    to="/admin"
                    data-ocid="nav.admin_dashboard.link"
                    className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium gradient-warm text-primary-foreground transition-smooth hover:opacity-90"
                  >
                    <LayoutDashboard size={15} />
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  data-ocid="nav.logout.button"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-muted transition-smooth"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                data-ocid="nav.admin_login.button"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium gradient-warm text-primary-foreground transition-smooth hover:opacity-90"
              >
                Admin Login
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-smooth"
              aria-label="Toggle navigation menu"
              data-ocid="nav.menu_toggle.button"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="md:hidden border-t border-border bg-card animate-slide-down px-4 pb-4 pt-2"
            data-ocid="nav.mobile_menu"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {currentLinks.map(({ to, label, icon: Icon }) => {
                const active =
                  to === "/" ? pathname === "/" : pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile.${label.toLowerCase()}.link`}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
              <div className="border-t border-border mt-2 pt-2 flex flex-col gap-1">
                {isAdmin ? (
                  <>
                    {!isAdminPage && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        data-ocid="nav.mobile.admin.link"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium gradient-warm text-primary-foreground"
                      >
                        <LayoutDashboard size={16} />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      data-ocid="nav.mobile.logout.button"
                      className="flex items-center gap-2 px-3 py-2.5 w-full text-left rounded-lg text-sm text-destructive hover:bg-muted transition-smooth"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(true);
                      setMobileOpen(false);
                    }}
                    data-ocid="nav.mobile.admin_login.button"
                    className="flex items-center gap-2 px-3 py-2.5 w-full rounded-lg text-sm font-medium gradient-warm text-primary-foreground"
                  >
                    Admin Login
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <SaraswatiLogo size="sm" showText={true} />
          <p className="text-muted-foreground text-xs text-center">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <AdminLoginModal />
      <Toaster position="top-right" richColors />
    </div>
  );
}
