import { r as reactExports, j as jsxRuntimeExports } from "./index-BdhHuDeJ.js";
import { B as Button } from "./button-PW5s1p9c.js";
import { S as Skeleton } from "./skeleton-Cg4P7mLd.js";
import { u as useAvailableSeats, a as useOccupiedSeats } from "./types-DBKfhn4T.js";
import { R as RefreshCw } from "./refresh-cw-CnYHQM3D.js";
import "./index-C8zD6jex.js";
import "./utils-2v2HxlWs.js";
function SeatBox({ seat, index }) {
  const occupied = seat.isOccupied;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `seats.item.${index}`,
      className: `relative flex flex-col items-center justify-center rounded-lg border-2 cursor-default select-none transition-smooth p-1 ${occupied ? "seat-occupied" : "seat-available"}`,
      style: { aspectRatio: "1", minWidth: 0 },
      "aria-label": `Seat ${Number(seat.seatNumber)} — ${occupied ? `Occupied${seat.occupiedBy ? ` by ${seat.occupiedBy}` : ""}` : "Available"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-bold font-display leading-none text-center",
            style: { fontSize: "clamp(8px, 1.3vw, 12px)" },
            children: Number(seat.seatNumber)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            viewBox: "0 0 20 20",
            fill: "currentColor",
            className: "w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 opacity-60 flex-shrink-0",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 2h8a1 1 0 011 1v6H5V3a1 1 0 011-1z", fillOpacity: 0.5 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 9h14a1 1 0 010 2H3a1 1 0 010-2z", fillOpacity: 0.75 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M7 11v5M13 11v5M6 16h3M11 16h3",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  fill: "none"
                }
              )
            ]
          }
        ),
        occupied ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-full text-center leading-tight font-semibold truncate mt-0.5 px-0.5",
            style: { fontSize: "clamp(6px, 0.9vw, 9px)" },
            title: seat.occupiedBy ?? "",
            children: seat.occupiedBy ?? "Occupied"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "leading-none font-semibold mt-0.5",
            style: { fontSize: "clamp(6px, 0.9vw, 9px)" },
            children: "Available"
          }
        )
      ]
    }
  );
}
function SeatGridSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid gap-1.5 sm:gap-2",
      style: { gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))" },
      "data-ocid": "seats.loading_state",
      children: Array.from({ length: 50 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Skeleton,
        {
          className: "rounded-lg",
          style: { aspectRatio: "1", minWidth: 0 }
        },
        `skeleton-seat-${i + 1}`
      ))
    }
  );
}
const STAT_COLORS = {
  total: {
    bg: "oklch(var(--primary) / 0.08)",
    border: "oklch(var(--primary) / 0.35)",
    text: "oklch(var(--primary))",
    dot: "oklch(var(--primary))"
  },
  occupied: {
    bg: "oklch(var(--destructive) / 0.08)",
    border: "oklch(var(--destructive) / 0.35)",
    text: "oklch(var(--destructive))",
    dot: "oklch(var(--destructive))"
  },
  available: {
    bg: "oklch(0.52 0.18 145 / 0.10)",
    border: "oklch(0.52 0.18 145 / 0.4)",
    text: "oklch(0.32 0.14 145)",
    dot: "oklch(0.52 0.18 145)"
  }
};
function StatBadge({ label, value, variant, ocid }) {
  const c = STAT_COLORS[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "flex items-center gap-2.5 rounded-xl px-4 py-3 border font-body flex-1 min-w-[100px]",
      style: { backgroundColor: c.bg, borderColor: c.border },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-3 h-3 rounded-full flex-shrink-0",
            style: { backgroundColor: c.dot }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-medium leading-none mb-1",
              style: { color: c.text, opacity: 0.75 },
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-2xl font-bold font-display leading-tight",
              style: { color: c.text },
              children: value
            }
          )
        ] })
      ]
    }
  );
}
function Legend() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "seats.legend",
      className: "flex flex-wrap items-center gap-4 text-sm font-body",
      style: { color: "oklch(var(--muted-foreground))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded border-2 flex-shrink-0 seat-available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Available" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded border-2 flex-shrink-0 seat-occupied" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Occupied (student name shown on card)" })
        ] })
      ]
    }
  );
}
function SeatsPage() {
  const {
    data: availableSeats,
    isLoading: loadingAvailable,
    refetch: refetchAvailable,
    dataUpdatedAt: availableUpdatedAt,
    isFetching: fetchingAvailable
  } = useAvailableSeats();
  const {
    data: occupiedSeats,
    isLoading: loadingOccupied,
    refetch: refetchOccupied,
    dataUpdatedAt: occupiedUpdatedAt,
    isFetching: fetchingOccupied
  } = useOccupiedSeats();
  const isLoading = loadingAvailable || loadingOccupied;
  const isFetching = fetchingAvailable || fetchingOccupied;
  function handleRefresh() {
    void refetchAvailable();
    void refetchOccupied();
  }
  const allSeats = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const s of availableSeats ?? []) map.set(s.seatNumber.toString(), s);
    for (const s of occupiedSeats ?? []) map.set(s.seatNumber.toString(), s);
    return Array.from(map.values()).sort(
      (a, b) => Number(a.seatNumber) - Number(b.seatNumber)
    );
  }, [availableSeats, occupiedSeats]);
  const totalSeats = allSeats.length;
  const occupiedCount = allSeats.filter((s) => s.isOccupied).length;
  const availableCount = totalSeats - occupiedCount;
  const occupancyPct = totalSeats > 0 ? Math.round(occupiedCount / totalSeats * 100) : 0;
  const lastUpdated = Math.max(availableUpdatedAt ?? 0, occupiedUpdatedAt ?? 0);
  const lastUpdatedStr = lastUpdated ? new Date(lastUpdated).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { backgroundColor: "oklch(var(--background))" },
      "data-ocid": "seats.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-10 border-b shadow-warm",
            style: {
              backgroundColor: "oklch(var(--card))",
              borderColor: "oklch(var(--border))"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "text-xl sm:text-2xl font-bold font-display",
                      style: { color: "oklch(var(--primary))" },
                      children: "Seat Availability"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-xs sm:text-sm mt-0.5 flex items-center gap-1.5",
                      style: { color: "oklch(var(--muted-foreground))" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          RefreshCw,
                          {
                            className: `w-3.5 h-3.5 flex-shrink-0 ${isFetching ? "animate-spin" : ""}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Auto-refresh every 30s" }),
                        lastUpdatedStr && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-60 hidden sm:inline", children: [
                          "· Updated ",
                          lastUpdatedStr
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border",
                      style: {
                        backgroundColor: "oklch(0.52 0.18 145 / 0.1)",
                        borderColor: "oklch(0.52 0.18 145 / 0.4)",
                        color: "oklch(0.32 0.14 145)"
                      },
                      "data-ocid": "seats.live_badge",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2 h-2 rounded-full animate-pulse",
                            style: { backgroundColor: "oklch(0.52 0.18 145)" }
                          }
                        ),
                        "LIVE"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: handleRefresh,
                      disabled: isFetching,
                      "data-ocid": "seats.refresh_button",
                      className: "flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          RefreshCw,
                          {
                            className: `w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`
                          }
                        ),
                        "Refresh"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-wrap gap-2 sm:gap-3",
                  "data-ocid": "seats.stats_bar",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatBadge,
                      {
                        label: "Total Seats",
                        value: totalSeats || "—",
                        variant: "total",
                        ocid: "seats.stat_total"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatBadge,
                      {
                        label: "Occupied",
                        value: occupiedCount,
                        variant: "occupied",
                        ocid: "seats.stat_occupied"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatBadge,
                      {
                        label: "Available",
                        value: availableCount,
                        variant: "available",
                        ocid: "seats.stat_available"
                      }
                    )
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5", children: [
          totalSeats > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "seats.occupancy_bar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-xs font-body mb-1.5",
                style: { color: "oklch(var(--muted-foreground))" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Occupancy Rate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-semibold",
                      style: { color: "oklch(var(--foreground))" },
                      children: [
                        occupancyPct,
                        "%"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "relative h-2.5 rounded-full overflow-hidden",
                style: { backgroundColor: "oklch(var(--muted))" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-smooth",
                    style: {
                      width: `${occupancyPct}%`,
                      background: occupancyPct > 80 ? "linear-gradient(90deg, oklch(var(--destructive)), oklch(0.44 0.22 20))" : "linear-gradient(90deg, oklch(var(--accent)), oklch(0.52 0.18 145))"
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "seats.grid", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SeatGridSkeleton, {}) : allSeats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-20 text-center rounded-2xl border-2 border-dashed",
              style: {
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))"
              },
              "data-ocid": "seats.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", "aria-hidden": "true", children: "🪑" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-semibold font-display",
                    style: { color: "oklch(var(--foreground))" },
                    children: "No seats have been set up yet"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Please ask the admin to initialize seats from the admin panel." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid gap-1.5 sm:gap-2",
              style: {
                gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))"
              },
              children: allSeats.map((seat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SeatBox,
                {
                  seat,
                  index: idx + 1
                },
                seat.seatNumber.toString()
              ))
            }
          ) }),
          !isLoading && allSeats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs text-center pb-2 font-body",
              style: { color: "oklch(var(--muted-foreground))" },
              children: "🟢 Green = Available  ·  🔴 Red = Occupied (student name shown on card)"
            }
          )
        ] })
      ]
    }
  );
}
export {
  SeatsPage
};
