import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  IndianRupee,
  LayoutDashboard,
  MessageCircle,
  Settings,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  useAllMessages,
  useAllStudents,
  useAvailableSeats,
  useMonthlyRevenue,
  useStudentsExpiringSoon,
} from "../../hooks/useLibrary";
import { SenderRole } from "../../types";
import type { Student } from "../../types";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  colorClass,
  to,
  ocid,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  colorClass: string;
  to?: string;
  ocid: string;
}) {
  const content = (
    <Card
      data-ocid={ocid}
      className="border border-border shadow-warm hover:shadow-elevated transition-smooth"
    >
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}
        >
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide truncate">
            {label}
          </p>
          <p className="text-2xl font-bold text-foreground font-display leading-tight">
            {value}
          </p>
          {sub && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {sub}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
  return to ? (
    <Link to={to} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

function ExpiryBadge({ student }: { student: Student }) {
  const now = Date.now();
  const expiry = Number(student.expiryDate) / 1_000_000;
  const daysLeft = Math.ceil((expiry - now) / 86_400_000);

  if (daysLeft <= 0) {
    return (
      <Badge className="bg-destructive/10 text-destructive border border-destructive/40 font-semibold">
        Expired
      </Badge>
    );
  }
  if (daysLeft <= 3) {
    return (
      <Badge className="bg-destructive/15 text-destructive border border-destructive/50 font-semibold">
        {daysLeft}d left
      </Badge>
    );
  }
  if (daysLeft <= 7) {
    return (
      <Badge className="bg-secondary text-secondary-foreground border border-border font-semibold">
        {daysLeft}d left
      </Badge>
    );
  }
  return (
    <Badge className="bg-accent/10 text-accent-foreground border border-accent/30 font-semibold">
      {daysLeft}d left
    </Badge>
  );
}

function getDaysLeft(student: Student): number {
  const now = Date.now();
  const expiry = Number(student.expiryDate) / 1_000_000;
  return Math.ceil((expiry - now) / 86_400_000);
}

const NAV_LINKS = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/students" as const, label: "Students", icon: Users },
  { to: "/admin/revenue" as const, label: "Revenue", icon: TrendingUp },
  { to: "/admin/messages" as const, label: "Messages", icon: MessageCircle },
  { to: "/admin/settings" as const, label: "Settings", icon: Settings },
];

const QUICK_LINKS = [
  {
    to: "/admin/students" as const,
    icon: Users,
    title: "Students",
    desc: "View, edit, and manage student records",
    colorClass: "bg-primary/5",
    ocid: "dashboard.quicklink.students.link",
  },
  {
    to: "/admin/revenue" as const,
    icon: TrendingUp,
    title: "Revenue",
    desc: "Daily and monthly financial reports",
    colorClass: "bg-accent/10",
    ocid: "dashboard.quicklink.revenue.link",
  },
  {
    to: "/admin/messages" as const,
    icon: MessageCircle,
    title: "Messages",
    desc: "Communicate with students",
    colorClass: "bg-secondary",
    ocid: "dashboard.quicklink.messages.link",
  },
  {
    to: "/admin/settings" as const,
    icon: Settings,
    title: "Settings",
    desc: "Configure library settings",
    colorClass: "bg-muted/60",
    ocid: "dashboard.quicklink.settings.link",
  },
];

export function AdminDashboard() {
  const { isAdmin, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      void navigate({ to: "/" });
    }
  }, [isAdmin, navigate]);

  const now = new Date();
  const { data: students, isLoading: loadingStudents } = useAllStudents();
  const { data: expiring, isLoading: loadingExpiring } =
    useStudentsExpiringSoon();
  const { data: availableSeats, isLoading: loadingSeats } = useAvailableSeats();
  const { data: monthlyRevenue, isLoading: loadingRevenue } = useMonthlyRevenue(
    now.getFullYear(),
    now.getMonth() + 1,
  );
  const { data: messages } = useAllMessages();

  const activeStudents = students?.filter((s) => s.isActive).length ?? 0;
  const expiredStudents = (students?.length ?? 0) - activeStudents;
  const totalStudents = students?.length ?? 0;
  const unreadCount = (messages ?? []).filter(
    (m) => !m.isRead && m.senderRole === SenderRole.student,
  ).length;

  if (!isAdmin) return null;

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="admin.dashboard.page"
    >
      {/* Header band */}
      <div className="gradient-warm px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary-foreground font-display flex items-center gap-2">
            <LayoutDashboard size={22} />
            Admin Dashboard
          </h1>
          <p className="text-sm text-primary-foreground/70 mt-0.5">
            Welcome, {session?.username ?? "Admin"} — Shree Vishwakarma Library
          </p>
        </div>
        {unreadCount > 0 && (
          <Link to="/admin/messages" data-ocid="dashboard.unread.link">
            <Badge className="bg-accent text-accent-foreground flex items-center gap-1 cursor-pointer hover:opacity-90 transition-smooth">
              <MessageCircle size={12} />
              {unreadCount} unread
            </Badge>
          </Link>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Sub-nav */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              data-ocid={`dashboard.nav.${label.toLowerCase()}.link`}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth shadow-sm"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loadingStudents || loadingSeats || loadingRevenue ? (
            ["a", "b", "c", "d"].map((k) => (
              <Card key={k} data-ocid="dashboard.loading_state">
                <CardContent className="p-5">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard
                ocid="dashboard.total_students.card"
                icon={Users}
                label="Total Students"
                value={totalStudents}
                sub={`${activeStudents} active · ${expiredStudents} expired`}
                colorClass="bg-primary/10 text-primary"
                to="/admin/students"
              />
              <StatCard
                ocid="dashboard.available_seats.card"
                icon={BookOpen}
                label="Available Seats"
                value={availableSeats?.length ?? 0}
                sub="seats open right now"
                colorClass="bg-accent/10 text-accent-foreground"
              />
              <StatCard
                ocid="dashboard.monthly_revenue.card"
                icon={IndianRupee}
                label="Monthly Revenue"
                value={`₹${Number(monthlyRevenue ?? BigInt(0)).toLocaleString("en-IN")}`}
                sub={now.toLocaleString("en-IN", {
                  month: "long",
                  year: "numeric",
                })}
                colorClass="bg-accent/15 text-accent-foreground"
                to="/admin/revenue"
              />
              <StatCard
                ocid="dashboard.unread_messages.card"
                icon={MessageCircle}
                label="Unread Messages"
                value={unreadCount}
                sub="from students"
                colorClass="bg-secondary text-secondary-foreground"
                to="/admin/messages"
              />
            </>
          )}
        </div>

        {/* Active vs Expired summary strip */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm"
            data-ocid="dashboard.active_count.card"
          >
            <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Active Members
              </p>
              <p className="text-lg font-bold text-foreground font-display">
                {loadingStudents ? "—" : activeStudents}
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm"
            data-ocid="dashboard.expired_count.card"
          >
            <XCircle size={18} className="text-destructive flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Expired Members
              </p>
              <p className="text-lg font-bold text-foreground font-display">
                {loadingStudents ? "—" : expiredStudents}
              </p>
            </div>
          </div>
        </div>

        {/* Expiring soon table */}
        <Card
          className="border border-border shadow-warm"
          data-ocid="expiring.section"
        >
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle size={16} className="text-yellow-600" />
                Expiring Soon
                <span className="text-xs font-normal text-muted-foreground">
                  (within 7 days)
                </span>
              </CardTitle>
              <Link
                to="/admin/students"
                data-ocid="expiring.view_all.link"
                className="text-xs text-accent hover:underline font-medium"
              >
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loadingExpiring ? (
              <div className="p-4 space-y-2" data-ocid="expiring.loading_state">
                {["r1", "r2", "r3"].map((k) => (
                  <Skeleton key={k} className="h-10 w-full" />
                ))}
              </div>
            ) : !expiring?.length ? (
              <div className="p-8 text-center" data-ocid="expiring.empty_state">
                <CheckCircle2
                  size={32}
                  className="mx-auto text-green-500 mb-2"
                />
                <p className="text-muted-foreground text-sm font-medium">
                  No memberships expiring in the next 7 days!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        #
                      </th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Name
                      </th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Mobile
                      </th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Seat
                      </th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Expiry Date
                      </th>
                      <th className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Days Left
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expiring
                      .slice()
                      .sort((a, b) => getDaysLeft(a) - getDaysLeft(b))
                      .map((s, i) => {
                        const expDate = new Date(
                          Number(s.expiryDate) / 1_000_000,
                        );
                        return (
                          <tr
                            key={s.id.toString()}
                            data-ocid={`expiring.item.${i + 1}`}
                            className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {i + 1}
                            </td>
                            <td className="py-3 px-4 text-sm font-semibold text-foreground">
                              {s.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {s.mobile}
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              Seat {s.seatNumber.toString()}
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {expDate.toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="py-3 px-4">
                              <ExpiryBadge student={s} />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick links */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_LINKS.map(
              ({ to, icon: Icon, title, desc, colorClass, ocid }) => (
                <Link key={to} to={to} data-ocid={ocid}>
                  <Card className="border border-border shadow-warm hover:shadow-elevated hover:border-primary/40 transition-smooth cursor-pointer h-full">
                    <CardContent
                      className={`p-4 flex flex-col gap-2 ${colorClass} h-full rounded-lg`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-card flex items-center justify-center text-primary shadow-sm">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                          {desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
