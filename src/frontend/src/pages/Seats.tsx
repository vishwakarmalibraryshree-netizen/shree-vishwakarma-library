import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAvailableSeats, useOccupiedSeats } from "@/hooks/useLibrary";
import type { Seat } from "@/types";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

// ── Seat Box ──────────────────────────────────────────────────────────────────

interface SeatBoxProps {
  seat: Seat;
  index: number;
}

function SeatBox({ seat, index }: SeatBoxProps) {
  const occupied = seat.isOccupied;

  return (
    <div
      data-ocid={`seats.item.${index}`}
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 cursor-default select-none transition-smooth p-1 ${
        occupied ? "seat-occupied" : "seat-available"
      }`}
      style={{ aspectRatio: "1", minWidth: 0 }}
      aria-label={`Seat ${Number(seat.seatNumber)} — ${
        occupied
          ? `Occupied${seat.occupiedBy ? ` by ${seat.occupiedBy}` : ""}`
          : "Available"
      }`}
    >
      {/* Seat number */}
      <span
        className="font-bold font-display leading-none text-center"
        style={{ fontSize: "clamp(8px, 1.3vw, 12px)" }}
      >
        {Number(seat.seatNumber)}
      </span>

      {/* Chair icon (small) */}
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 opacity-60 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M6 2h8a1 1 0 011 1v6H5V3a1 1 0 011-1z" fillOpacity={0.5} />
        <path d="M3 9h14a1 1 0 010 2H3a1 1 0 010-2z" fillOpacity={0.75} />
        <path
          d="M7 11v5M13 11v5M6 16h3M11 16h3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Status label */}
      {occupied ? (
        <span
          className="w-full text-center leading-tight font-semibold truncate mt-0.5 px-0.5"
          style={{ fontSize: "clamp(6px, 0.9vw, 9px)" }}
          title={seat.occupiedBy ?? ""}
        >
          {seat.occupiedBy ?? "Occupied"}
        </span>
      ) : (
        <span
          className="leading-none font-semibold mt-0.5"
          style={{ fontSize: "clamp(6px, 0.9vw, 9px)" }}
        >
          Available
        </span>
      )}
    </div>
  );
}

// ── Skeleton Grid ─────────────────────────────────────────────────────────────

function SeatGridSkeleton() {
  return (
    <div
      className="grid gap-1.5 sm:gap-2"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))" }}
      data-ocid="seats.loading_state"
    >
      {Array.from({ length: 50 }, (_, i) => (
        <Skeleton
          key={`skeleton-seat-${i + 1}`}
          className="rounded-lg"
          style={{ aspectRatio: "1", minWidth: 0 }}
        />
      ))}
    </div>
  );
}

// ── Stat Badge ────────────────────────────────────────────────────────────────

interface StatBadgeProps {
  label: string;
  value: number | string;
  variant: "total" | "occupied" | "available";
  ocid: string;
}

const STAT_COLORS = {
  total: {
    bg: "oklch(var(--primary) / 0.08)",
    border: "oklch(var(--primary) / 0.35)",
    text: "oklch(var(--primary))",
    dot: "oklch(var(--primary))",
  },
  occupied: {
    bg: "oklch(var(--destructive) / 0.08)",
    border: "oklch(var(--destructive) / 0.35)",
    text: "oklch(var(--destructive))",
    dot: "oklch(var(--destructive))",
  },
  available: {
    bg: "oklch(0.52 0.18 145 / 0.10)",
    border: "oklch(0.52 0.18 145 / 0.4)",
    text: "oklch(0.32 0.14 145)",
    dot: "oklch(0.52 0.18 145)",
  },
} as const;

function StatBadge({ label, value, variant, ocid }: StatBadgeProps) {
  const c = STAT_COLORS[variant];
  return (
    <div
      data-ocid={ocid}
      className="flex items-center gap-2.5 rounded-xl px-4 py-3 border font-body flex-1 min-w-[100px]"
      style={{ backgroundColor: c.bg, borderColor: c.border }}
    >
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: c.dot }}
      />
      <div className="flex flex-col min-w-0">
        <span
          className="text-xs font-medium leading-none mb-1"
          style={{ color: c.text, opacity: 0.75 }}
        >
          {label}
        </span>
        <span
          className="text-2xl font-bold font-display leading-tight"
          style={{ color: c.text }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div
      data-ocid="seats.legend"
      className="flex flex-wrap items-center gap-4 text-sm font-body"
      style={{ color: "oklch(var(--muted-foreground))" }}
    >
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded border-2 flex-shrink-0 seat-available" />
        <span>Available</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded border-2 flex-shrink-0 seat-occupied" />
        <span>Occupied (student name shown on card)</span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function SeatsPage() {
  const {
    data: availableSeats,
    isLoading: loadingAvailable,
    refetch: refetchAvailable,
    dataUpdatedAt: availableUpdatedAt,
    isFetching: fetchingAvailable,
  } = useAvailableSeats();

  const {
    data: occupiedSeats,
    isLoading: loadingOccupied,
    refetch: refetchOccupied,
    dataUpdatedAt: occupiedUpdatedAt,
    isFetching: fetchingOccupied,
  } = useOccupiedSeats();

  const isLoading = loadingAvailable || loadingOccupied;
  const isFetching = fetchingAvailable || fetchingOccupied;

  function handleRefresh() {
    void refetchAvailable();
    void refetchOccupied();
  }

  // Merge seats by seatNumber, occupied wins, sort ascending
  const allSeats = useMemo<Seat[]>(() => {
    const map = new Map<string, Seat>();
    for (const s of availableSeats ?? []) map.set(s.seatNumber.toString(), s);
    for (const s of occupiedSeats ?? []) map.set(s.seatNumber.toString(), s);
    return Array.from(map.values()).sort(
      (a, b) => Number(a.seatNumber) - Number(b.seatNumber),
    );
  }, [availableSeats, occupiedSeats]);

  const totalSeats = allSeats.length;
  const occupiedCount = allSeats.filter((s) => s.isOccupied).length;
  const availableCount = totalSeats - occupiedCount;
  const occupancyPct =
    totalSeats > 0 ? Math.round((occupiedCount / totalSeats) * 100) : 0;

  const lastUpdated = Math.max(availableUpdatedAt ?? 0, occupiedUpdatedAt ?? 0);
  const lastUpdatedStr = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(var(--background))" }}
      data-ocid="seats.page"
    >
      {/* ── Sticky Header ── */}
      <div
        className="sticky top-0 z-10 border-b shadow-warm"
        style={{
          backgroundColor: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
          {/* Title row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <h1
                className="text-xl sm:text-2xl font-bold font-display"
                style={{ color: "oklch(var(--primary))" }}
              >
                Seat Availability
              </h1>
              <p
                className="text-xs sm:text-sm mt-0.5 flex items-center gap-1.5"
                style={{ color: "oklch(var(--muted-foreground))" }}
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 flex-shrink-0 ${isFetching ? "animate-spin" : ""}`}
                />
                <span>Auto-refresh every 30s</span>
                {lastUpdatedStr && (
                  <span className="opacity-60 hidden sm:inline">
                    · Updated {lastUpdatedStr}
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* LIVE badge */}
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border"
                style={{
                  backgroundColor: "oklch(0.52 0.18 145 / 0.1)",
                  borderColor: "oklch(0.52 0.18 145 / 0.4)",
                  color: "oklch(0.32 0.14 145)",
                }}
                data-ocid="seats.live_badge"
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "oklch(0.52 0.18 145)" }}
                />
                LIVE
              </div>

              {/* Manual Refresh button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isFetching}
                data-ocid="seats.refresh_button"
                className="flex items-center gap-1.5"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-2 sm:gap-3"
            data-ocid="seats.stats_bar"
          >
            <StatBadge
              label="Total Seats"
              value={totalSeats || "—"}
              variant="total"
              ocid="seats.stat_total"
            />
            <StatBadge
              label="Occupied"
              value={occupiedCount}
              variant="occupied"
              ocid="seats.stat_occupied"
            />
            <StatBadge
              label="Available"
              value={availableCount}
              variant="available"
              ocid="seats.stat_available"
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Occupancy progress bar */}
        {totalSeats > 0 && (
          <div data-ocid="seats.occupancy_bar">
            <div
              className="flex items-center justify-between text-xs font-body mb-1.5"
              style={{ color: "oklch(var(--muted-foreground))" }}
            >
              <span>Occupancy Rate</span>
              <span
                className="font-semibold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {occupancyPct}%
              </span>
            </div>
            <div
              className="relative h-2.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "oklch(var(--muted))" }}
            >
              <div
                className="h-full rounded-full transition-smooth"
                style={{
                  width: `${occupancyPct}%`,
                  background:
                    occupancyPct > 80
                      ? "linear-gradient(90deg, oklch(var(--destructive)), oklch(0.44 0.22 20))"
                      : "linear-gradient(90deg, oklch(var(--accent)), oklch(0.52 0.18 145))",
                }}
              />
            </div>
          </div>
        )}

        {/* Legend */}
        <Legend />

        {/* Seat grid */}
        <div data-ocid="seats.grid">
          {isLoading ? (
            <SeatGridSkeleton />
          ) : allSeats.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border-2 border-dashed"
              style={{
                borderColor: "oklch(var(--border))",
                color: "oklch(var(--muted-foreground))",
              }}
              data-ocid="seats.empty_state"
            >
              <span className="text-5xl mb-4" aria-hidden="true">
                🪑
              </span>
              <p
                className="text-lg font-semibold font-display"
                style={{ color: "oklch(var(--foreground))" }}
              >
                No seats have been set up yet
              </p>
              <p className="text-sm mt-1">
                Please ask the admin to initialize seats from the admin panel.
              </p>
            </div>
          ) : (
            <div
              className="grid gap-1.5 sm:gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))",
              }}
            >
              {allSeats.map((seat, idx) => (
                <SeatBox
                  key={seat.seatNumber.toString()}
                  seat={seat}
                  index={idx + 1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        {!isLoading && allSeats.length > 0 && (
          <p
            className="text-xs text-center pb-2 font-body"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            🟢 Green = Available &nbsp;·&nbsp; 🔴 Red = Occupied (student name
            shown on card)
          </p>
        )}
      </div>
    </div>
  );
}
