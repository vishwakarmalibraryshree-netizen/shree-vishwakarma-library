import { c as createLucideIcon, u as useAuth, b as useNavigate, r as reactExports, S as SenderRole, j as jsxRuntimeExports, L as LayoutDashboard, d as Link, M as MessageCircle, U as Users, T as TrendingUp, e as Settings, f as BookOpen } from "./index-BxMJF1mf.js";
import { B as Badge } from "./badge-CWeIkufx.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-C8GH-zEu.js";
import { S as Skeleton } from "./skeleton-CPVH6K9v.js";
import { f as useAllStudents, i as useStudentsExpiringSoon, u as useAvailableSeats, j as useMonthlyRevenue, k as useAllMessages } from "./types-CeHNxeEG.js";
import { I as IndianRupee } from "./indian-rupee-BMerw35x.js";
import { T as TriangleAlert } from "./triangle-alert-CNDl6Vs0.js";
import "./index-D9SYxO04.js";
import "./utils-2v2HxlWs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  colorClass,
  to,
  ocid
}) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": ocid,
      className: "border border-border shadow-warm hover:shadow-elevated transition-smooth",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide truncate", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display leading-tight", children: value }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: sub })
        ] })
      ] })
    }
  );
  return to ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "block", children: content }) : content;
}
function ExpiryBadge({ student }) {
  const now = Date.now();
  const expiry = Number(student.expiryDate) / 1e6;
  const daysLeft = Math.ceil((expiry - now) / 864e5);
  if (daysLeft <= 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/10 text-destructive border border-destructive/40 font-semibold", children: "Expired" });
  }
  if (daysLeft <= 3) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/15 text-destructive border border-destructive/50 font-semibold", children: [
      daysLeft,
      "d left"
    ] });
  }
  if (daysLeft <= 7) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary text-secondary-foreground border border-border font-semibold", children: [
      daysLeft,
      "d left"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent/10 text-accent-foreground border border-accent/30 font-semibold", children: [
    daysLeft,
    "d left"
  ] });
}
function getDaysLeft(student) {
  const now = Date.now();
  const expiry = Number(student.expiryDate) / 1e6;
  return Math.ceil((expiry - now) / 864e5);
}
const NAV_LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/revenue", label: "Revenue", icon: TrendingUp },
  { to: "/admin/messages", label: "Messages", icon: MessageCircle },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];
const QUICK_LINKS = [
  {
    to: "/admin/students",
    icon: Users,
    title: "Students",
    desc: "View, edit, and manage student records",
    colorClass: "bg-primary/5",
    ocid: "dashboard.quicklink.students.link"
  },
  {
    to: "/admin/revenue",
    icon: TrendingUp,
    title: "Revenue",
    desc: "Daily and monthly financial reports",
    colorClass: "bg-accent/10",
    ocid: "dashboard.quicklink.revenue.link"
  },
  {
    to: "/admin/messages",
    icon: MessageCircle,
    title: "Messages",
    desc: "Communicate with students",
    colorClass: "bg-secondary",
    ocid: "dashboard.quicklink.messages.link"
  },
  {
    to: "/admin/settings",
    icon: Settings,
    title: "Settings",
    desc: "Configure library settings",
    colorClass: "bg-muted/60",
    ocid: "dashboard.quicklink.settings.link"
  }
];
function AdminDashboard() {
  const { isAdmin, session } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAdmin) {
      void navigate({ to: "/" });
    }
  }, [isAdmin, navigate]);
  const now = /* @__PURE__ */ new Date();
  const { data: students, isLoading: loadingStudents } = useAllStudents();
  const { data: expiring, isLoading: loadingExpiring } = useStudentsExpiringSoon();
  const { data: availableSeats, isLoading: loadingSeats } = useAvailableSeats();
  const { data: monthlyRevenue, isLoading: loadingRevenue } = useMonthlyRevenue(
    now.getFullYear(),
    now.getMonth() + 1
  );
  const { data: messages } = useAllMessages();
  const activeStudents = (students == null ? void 0 : students.filter((s) => s.isActive).length) ?? 0;
  const expiredStudents = ((students == null ? void 0 : students.length) ?? 0) - activeStudents;
  const totalStudents = (students == null ? void 0 : students.length) ?? 0;
  const unreadCount = (messages ?? []).filter(
    (m) => !m.isRead && m.senderRole === SenderRole.student
  ).length;
  if (!isAdmin) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "admin.dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-warm px-6 py-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-primary-foreground font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 22 }),
              "Admin Dashboard"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-primary-foreground/70 mt-0.5", children: [
              "Welcome, ",
              (session == null ? void 0 : session.username) ?? "Admin",
              " — Shree Vishwakarma Library"
            ] })
          ] }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/messages", "data-ocid": "dashboard.unread.link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground flex items-center gap-1 cursor-pointer hover:opacity-90 transition-smooth", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 12 }),
            unreadCount,
            " unread"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: NAV_LINKS.map(({ to, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              "data-ocid": `dashboard.nav.${label.toLowerCase()}.link`,
              className: "flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth shadow-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14 }),
                label
              ]
            },
            to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: loadingStudents || loadingSeats || loadingRevenue ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "dashboard.loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }) }) }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.total_students.card",
                icon: Users,
                label: "Total Students",
                value: totalStudents,
                sub: `${activeStudents} active · ${expiredStudents} expired`,
                colorClass: "bg-primary/10 text-primary",
                to: "/admin/students"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.available_seats.card",
                icon: BookOpen,
                label: "Available Seats",
                value: (availableSeats == null ? void 0 : availableSeats.length) ?? 0,
                sub: "seats open right now",
                colorClass: "bg-accent/10 text-accent-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.monthly_revenue.card",
                icon: IndianRupee,
                label: "Monthly Revenue",
                value: `₹${Number(monthlyRevenue ?? BigInt(0)).toLocaleString("en-IN")}`,
                sub: now.toLocaleString("en-IN", {
                  month: "long",
                  year: "numeric"
                }),
                colorClass: "bg-accent/15 text-accent-foreground",
                to: "/admin/revenue"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                ocid: "dashboard.unread_messages.card",
                icon: MessageCircle,
                label: "Unread Messages",
                value: unreadCount,
                sub: "from students",
                colorClass: "bg-secondary text-secondary-foreground",
                to: "/admin/messages"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm",
                "data-ocid": "dashboard.active_count.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, className: "text-green-600 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Active Members" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display", children: loadingStudents ? "—" : activeStudents })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 shadow-sm",
                "data-ocid": "dashboard.expired_count.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18, className: "text-destructive flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: "Expired Members" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground font-display", children: loadingStudents ? "—" : expiredStudents })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "border border-border shadow-warm",
              "data-ocid": "expiring.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16, className: "text-yellow-600" }),
                    "Expiring Soon",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(within 7 days)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/admin/students",
                      "data-ocid": "expiring.view_all.link",
                      className: "text-xs text-accent hover:underline font-medium",
                      children: "View All →"
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: loadingExpiring ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", "data-ocid": "expiring.loading_state", children: ["r1", "r2", "r3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : !(expiring == null ? void 0 : expiring.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", "data-ocid": "expiring.empty_state", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 32,
                      className: "mx-auto text-green-500 mb-2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No memberships expiring in the next 7 days!" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "#" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Mobile" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Seat" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Expiry Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Days Left" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: expiring.slice().sort((a, b) => getDaysLeft(a) - getDaysLeft(b)).map((s, i) => {
                    const expDate = new Date(
                      Number(s.expiryDate) / 1e6
                    );
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        "data-ocid": `expiring.item.${i + 1}`,
                        className: "border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: i + 1 }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm font-semibold text-foreground", children: s.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: s.mobile }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: [
                            "Seat ",
                            s.seatNumber.toString()
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: expDate.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpiryBadge, { student: s }) })
                        ]
                      },
                      s.id.toString()
                    );
                  }) })
                ] }) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Quick Navigation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: QUICK_LINKS.map(
              ({ to, icon: Icon, title, desc, colorClass, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-border shadow-warm hover:shadow-elevated hover:border-primary/40 transition-smooth cursor-pointer h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                CardContent,
                {
                  className: `p-4 flex flex-col gap-2 ${colorClass} h-full rounded-lg`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-card flex items-center justify-center text-primary shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: desc })
                    ] })
                  ]
                }
              ) }) }, to)
            ) })
          ] })
        ] })
      ]
    }
  );
}
export {
  AdminDashboard
};
