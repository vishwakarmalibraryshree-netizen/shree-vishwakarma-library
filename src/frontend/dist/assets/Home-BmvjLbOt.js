import { c as createLucideIcon, r as reactExports, i as useQueryClient, j as jsxRuntimeExports, f as Link, M as MapPin, b as BookOpen, L as Lock, k as SaraswatiLogo, B as Bell } from "./index-BdhHuDeJ.js";
import { u as useAvailableSeats, a as useOccupiedSeats, g as useRandomQuote, b as useActiveNotices, f as useSettings } from "./types-DBKfhn4T.js";
import { U as UserPlus, C as ChevronRight } from "./user-plus-i4KnQIBL.js";
import { a as Phone, P as Printer } from "./printer-D4uQe6Dv.js";
import { c as Clock, W as Wifi, C as Cpu, D as Droplets, a as Camera, N as Newspaper, b as Check } from "./wifi-BCNKr1LZ.js";
import { S as Shield } from "./shield-6FiU6PC8.js";
import { R as RefreshCw } from "./refresh-cw-CnYHQM3D.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 18v-7", key: "wt116b" }],
  [
    "path",
    {
      d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
      key: "1m329m"
    }
  ],
  ["path", { d: "M14 18v-7", key: "vav6t3" }],
  ["path", { d: "M18 18v-7", key: "aexdmj" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M6 18v-7", key: "1ivflk" }]
];
const Landmark = createLucideIcon("landmark", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const facilities = [
  { icon: Wifi, label: "Free WiFi", desc: "High-speed internet" },
  { icon: Cpu, label: "AC Rooms", desc: "Climate controlled" },
  { icon: Droplets, label: "Drinking Water", desc: "RO filtered water" },
  { icon: BookOpen, label: "Study Tables", desc: "Spacious wooden desks" },
  { icon: Lock, label: "Locker Facility", desc: "Secure storage" },
  { icon: Camera, label: "CCTV Security", desc: "24/7 surveillance" },
  { icon: Newspaper, label: "Newspapers", desc: "Daily print media" },
  { icon: Printer, label: "Printer", desc: "Print & photocopy" }
];
const infoBoxes = [
  {
    icon: MapPin,
    label: "Address",
    value: "Near Vishwakarma Mandir, Main Road"
  },
  { icon: Phone, label: "Contact", value: "+91 98765 43210" },
  { icon: Clock, label: "Opening Hours", value: "6:00 AM – 11:00 PM" },
  {
    icon: Landmark,
    label: "Established",
    value: "Serving students since 2010"
  },
  { icon: Shield, label: "Security", value: "CCTV + Locker + ID Card" },
  { icon: ExternalLink, label: "Membership", value: "30-day renewable plans" }
];
function MiniSeatBox({ seat, index }) {
  const [hovered, setHovered] = reactExports.useState(false);
  const occupied = seat.isOccupied;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `home.seat.item.${index}`,
      title: occupied ? `Seat ${Number(seat.seatNumber)} — Occupied${seat.occupiedBy ? `: ${seat.occupiedBy}` : ""}` : `Seat ${Number(seat.seatNumber)} — Available`,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      className: "relative rounded-md border-2 flex flex-col items-center justify-center cursor-default select-none transition-smooth",
      style: {
        aspectRatio: "1",
        minWidth: 0,
        borderColor: occupied ? "oklch(0.55 0.22 22)" : "oklch(0.52 0.18 145)",
        backgroundColor: occupied ? "oklch(0.55 0.22 22 / 0.15)" : "oklch(0.52 0.18 145 / 0.12)",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        zIndex: hovered ? 5 : 1
      },
      "aria-label": `Seat ${Number(seat.seatNumber)} ${occupied ? "Occupied" : "Available"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-bold font-display leading-none",
            style: {
              fontSize: "clamp(8px, 1.2vw, 11px)",
              color: occupied ? "oklch(0.48 0.2 22)" : "oklch(0.36 0.15 145)"
            },
            children: Number(seat.seatNumber)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "mt-0.5 font-medium leading-none",
            style: {
              fontSize: "clamp(6px, 0.8vw, 9px)",
              color: occupied ? "oklch(0.48 0.2 22)" : "oklch(0.36 0.15 145)",
              opacity: 0.85
            },
            children: occupied ? "Occupied" : "Available"
          }
        ),
        occupied && hovered && seat.occupiedBy && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute -top-9 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold shadow-elevated",
            style: {
              backgroundColor: "oklch(var(--primary))",
              color: "oklch(var(--primary-foreground))",
              border: "1px solid oklch(var(--border))"
            },
            "data-ocid": `home.seat.tooltip.${index}`,
            children: [
              seat.occupiedBy,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-full left-1/2 -translate-x-1/2",
                  style: {
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "4px solid oklch(var(--primary))",
                    width: 0,
                    height: 0
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function HomePage() {
  const { data: available, isLoading: seatsLoading } = useAvailableSeats();
  const { data: occupied, isLoading: occupiedLoading } = useOccupiedSeats();
  const { data: quote, isFetching: quoteFetching } = useRandomQuote();
  const { data: notices, isLoading: noticesLoading } = useActiveNotices();
  const { data: settings } = useSettings();
  const [copied, setCopied] = reactExports.useState(false);
  const qc = useQueryClient();
  const availableCount = (available == null ? void 0 : available.length) ?? 0;
  const occupiedCount = (occupied == null ? void 0 : occupied.length) ?? 0;
  const totalSeats = availableCount + occupiedCount;
  const allSeats = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const s of available ?? []) map.set(s.seatNumber.toString(), s);
    for (const s of occupied ?? []) map.set(s.seatNumber.toString(), s);
    return Array.from(map.values()).sort(
      (a, b) => Number(a.seatNumber) - Number(b.seatNumber)
    );
  }, [available, occupied]);
  const handleShareLink = reactExports.useCallback(() => {
    const posterUrl = `${window.location.origin}/poster`;
    navigator.clipboard.writeText(posterUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);
  const handleRefreshQuote = reactExports.useCallback(() => {
    qc.invalidateQueries({ queryKey: ["quote-random"] });
  }, [qc]);
  const isSeatsLoading = seatsLoading || occupiedLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 w-96 h-96 rounded-full gradient-warm opacity-5 blur-3xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-accent opacity-5 blur-2xl pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-12 md:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-2 h-2 rounded-full bg-accent ${isSeatsLoading ? "" : "animate-pulse"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent", children: isSeatsLoading ? "Loading seats..." : `${availableCount} Seats Available Right Now` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-bold text-primary leading-tight", children: [
                "Shree Vishwakarma",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Library" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-lg leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "Gateway to Knowledge" }),
                " ",
                "— A premium study space with modern facilities for serious students."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/enroll",
                    "data-ocid": "home.enroll_button",
                    className: "inline-flex items-center gap-2 gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16 }),
                      "Enroll Now"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/seats",
                    "data-ocid": "home.seats_button",
                    className: "inline-flex items-center gap-2 border border-primary/40 text-primary bg-card px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/10 transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16 }),
                      "View All Seats"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-52 h-52 mx-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full gradient-warm opacity-10 blur-2xl" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-3 rounded-full border border-accent/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-6 rounded-full border border-accent/10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full rounded-full overflow-hidden border-4 border-accent/40 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/saraswati-logo.dim_200x200.png",
                    alt: "Maa Saraswati — Goddess of Knowledge",
                    className: "w-full h-full object-cover"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-primary font-bold", children: "Shree Vishwakarma" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-semibold tracking-widest text-xs uppercase mt-0.5", children: "Library & Study Center" })
              ] })
            ] }) })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-10 border-b border-border",
        "data-ocid": "home.seats_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl md:text-3xl font-bold text-primary flex items-center gap-2", children: [
                "Live Seat Availability",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 border",
                    style: {
                      backgroundColor: "oklch(0.52 0.18 145 / 0.1)",
                      borderColor: "oklch(0.52 0.18 145 / 0.4)",
                      color: "oklch(0.36 0.15 145)"
                    },
                    "data-ocid": "home.seats.live_badge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-1.5 h-1.5 rounded-full animate-pulse",
                          style: { backgroundColor: "oklch(0.52 0.18 145)" }
                        }
                      ),
                      "LIVE"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Real-time seat status — updated every 30 seconds" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/seats",
                "data-ocid": "home.view_full_seat_map_link",
                className: "inline-flex items-center gap-1.5 text-accent text-sm font-medium border border-accent/30 rounded-lg px-3 py-2 hover:bg-accent/10 transition-smooth self-start sm:self-auto",
                children: [
                  "Full Seat Map",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-3 gap-3 mb-6",
              "data-ocid": "home.seats.stats",
              children: [
                {
                  label: "Total Seats",
                  value: isSeatsLoading ? "—" : String(totalSeats || "0"),
                  style: {
                    bg: "oklch(var(--primary) / 0.08)",
                    border: "oklch(var(--primary) / 0.35)",
                    text: "oklch(var(--primary))"
                  },
                  ocid: "home.seats.stat_total"
                },
                {
                  label: "Available",
                  value: isSeatsLoading ? "—" : String(availableCount),
                  style: {
                    bg: "oklch(0.52 0.18 145 / 0.1)",
                    border: "oklch(0.52 0.18 145 / 0.4)",
                    text: "oklch(0.36 0.15 145)"
                  },
                  ocid: "home.seats.stat_available"
                },
                {
                  label: "Occupied",
                  value: isSeatsLoading ? "—" : String(occupiedCount),
                  style: {
                    bg: "oklch(0.55 0.22 22 / 0.08)",
                    border: "oklch(0.55 0.22 22 / 0.35)",
                    text: "oklch(0.48 0.2 22)"
                  },
                  ocid: "home.seats.stat_occupied"
                }
              ].map(({ label, value, style, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": ocid,
                  className: "rounded-xl px-4 py-3 border text-center",
                  style: {
                    backgroundColor: style.bg,
                    borderColor: style.border
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "font-display text-2xl sm:text-3xl font-bold",
                        style: { color: style.text },
                        children: value
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-xs font-medium mt-0.5",
                        style: { color: style.text, opacity: 0.75 },
                        children: label
                      }
                    )
                  ]
                },
                label
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 text-xs text-muted-foreground mb-4",
              "data-ocid": "home.seats.legend",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-3.5 h-3.5 rounded border-2 flex-shrink-0",
                      style: {
                        backgroundColor: "oklch(0.52 0.18 145 / 0.12)",
                        borderColor: "oklch(0.52 0.18 145)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-3.5 h-3.5 rounded border-2 flex-shrink-0",
                      style: {
                        backgroundColor: "oklch(0.55 0.22 22 / 0.15)",
                        borderColor: "oklch(0.55 0.22 22)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Occupied" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline opacity-60 italic", children: "· Hover red seat to see student name" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-4 shadow-warm",
              "data-ocid": "home.seats.grid",
              children: isSeatsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid gap-1.5",
                  style: {
                    gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))"
                  },
                  "data-ocid": "home.seats.loading_state",
                  children: Array.from({ length: 20 }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-md animate-pulse bg-muted",
                      style: { aspectRatio: "1" }
                    },
                    `skel-seat-${n}`
                  ))
                }
              ) : allSeats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-12 text-center",
                  "data-ocid": "home.seats.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-3", "aria-hidden": "true", children: "🪑" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "No seats set up yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Please ask the admin to initialize seats" })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "grid gap-1.5",
                  style: {
                    gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))"
                  },
                  children: allSeats.map((seat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MiniSeatBox,
                    {
                      seat,
                      index: idx + 1
                    },
                    seat.seatNumber.toString()
                  ))
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12 border-b border-border",
        "data-ocid": "home.info_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-primary", children: "Library Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm", children: [
              (settings == null ? void 0 : settings.libraryName) ?? "Shree Vishwakarma Library",
              " — Essential details"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: infoBoxes.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `home.info.item.${label.toLowerCase().replace(/\s/g, "_")}`,
              className: "bg-card border border-border rounded-xl p-4 flex items-start gap-3 shadow-warm hover:shadow-elevated transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-0.5 leading-snug", children: value })
                ] })
              ]
            },
            label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-12 border-b border-border",
        "data-ocid": "home.facilities_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-primary", children: "Our Facilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Everything you need for focused study" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3", children: facilities.map(({ icon: Icon, label, desc }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `home.facility.item.${i + 1}`,
              className: "bg-card border border-border rounded-xl p-4 text-center hover:shadow-warm hover:border-accent/40 transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-smooth text-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 19 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-xs leading-tight", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 leading-tight", children: desc })
              ]
            },
            label
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12 border-b border-border",
        "data-ocid": "home.poster_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-2xl overflow-hidden border-2 border-accent/30 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-warm p-0.5 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[14px] p-6 md:p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SaraswatiLogo, { size: "lg", showText: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-bold text-primary", children: "Shree Vishwakarma Library" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-semibold mt-1 tracking-wide", children: "Library & Study Center" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 p-4 rounded-xl bg-accent/5 border border-accent/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg md:text-xl text-primary italic", children: '"The path to success goes through the library"' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Gateway to Knowledge and Wisdom" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-primary mb-4 text-center", children: "✨ Our Premium Facilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: facilities.map(({ label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      size: 14,
                      className: "text-accent flex-shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: label })
                ]
              },
              label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Near Vishwakarma Mandir, Main Road" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 15, className: "text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 98765 43210" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 15, className: "text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open: 6 AM – 11 PM Daily" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleShareLink,
              "data-ocid": "home.share_link_button",
              className: "inline-flex items-center gap-2 gradient-warm text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm shadow-warm hover:shadow-elevated hover:opacity-90 transition-smooth",
              children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }),
                "Link Copied!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { size: 16 }),
                "Share Library Link"
              ] })
            }
          ) })
        ] }) }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-background py-12 border-b border-border",
        "data-ocid": "home.notices_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl md:text-3xl font-bold text-primary flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 24, className: "text-accent" }),
              "Notice Board"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/notices",
                "data-ocid": "home.view_all_notices_link",
                className: "flex items-center gap-1 text-accent text-sm font-medium hover:underline transition-smooth",
                children: [
                  "View All",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 15 })
                ]
              }
            )
          ] }),
          noticesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "home.notices.loading_state", children: ["n1", "n2", "n3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-16 bg-card rounded-xl border border-border animate-pulse"
            },
            k
          )) }) : notices && notices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: notices.slice(0, 3).map((notice, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `home.notice.item.${i + 1}`,
              className: "flex items-start gap-3 p-4 bg-card rounded-xl border border-border shadow-warm hover:shadow-elevated hover:border-accent/30 transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 14, className: "text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: notice.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: notice.content })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] border border-accent/40 text-accent px-2 py-0.5 rounded-full flex-shrink-0 font-medium", children: "New" })
              ]
            },
            String(notice.id)
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10 bg-card rounded-xl border border-border",
              "data-ocid": "home.notices.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bell,
                  {
                    size: 32,
                    className: "text-muted-foreground mx-auto mb-2 opacity-40"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No notices at the moment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Check back later for updates" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-14 border-b border-border",
        "data-ocid": "home.quote_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-primary", children: "Daily Motivation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Inspiration for your study session" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border border-accent/20 rounded-2xl p-8 md:p-12 shadow-elevated text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-6 font-display text-7xl text-accent/20 leading-none select-none", children: '"' }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-6 font-display text-7xl text-accent/20 leading-none select-none rotate-180", children: '"' }),
            quoteFetching && !quote ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center h-24",
                "data-ocid": "home.quote.loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "text-accent animate-spin" })
              }
            ) : quote ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "font-display text-xl md:text-2xl text-foreground leading-relaxed italic", children: quote.quote }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent font-semibold text-sm tracking-wide", children: [
                "— ",
                quote.author
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "font-display text-xl md:text-2xl text-foreground leading-relaxed italic", children: '"Knowledge is the most powerful weapon you can use to change the world."' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-semibold text-sm tracking-wide", children: "— Nelson Mandela" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleRefreshQuote,
                disabled: quoteFetching,
                "data-ocid": "home.refresh_quote_button",
                className: "inline-flex items-center gap-2 border border-accent/40 text-accent px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/10 disabled:opacity-50 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      size: 14,
                      className: quoteFetching ? "animate-spin" : ""
                    }
                  ),
                  "New Quote"
                ]
              }
            ) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-12 text-primary-foreground",
        "data-ocid": "home.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 text-center space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SaraswatiLogo,
            {
              size: "md",
              showText: false,
              className: "justify-center"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold", children: "Get Membership Today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-sm max-w-md mx-auto", children: "Join hundreds of students already studying at Shree Vishwakarma Library. 30-day membership with all premium facilities." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/enroll",
                "data-ocid": "home.cta_enroll_button",
                className: "inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 shadow-warm transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16 }),
                  "Enroll Now"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/seats",
                "data-ocid": "home.cta_seats_button",
                className: "inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-foreground/10 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16 }),
                  "View Seats"
                ]
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  HomePage
};
