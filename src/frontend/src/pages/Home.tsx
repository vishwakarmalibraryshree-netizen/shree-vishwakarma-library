import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  Clock,
  Cpu,
  Droplets,
  ExternalLink,
  Landmark,
  Link2,
  Loader2,
  Lock,
  MapPin,
  Newspaper,
  Phone,
  Printer,
  RefreshCw,
  Shield,
  UserPlus,
  Wifi,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { SaraswatiLogo } from "../components/SaraswatiLogo";
import {
  useActiveNotices,
  useAvailableSeats,
  useOccupiedSeats,
  useRandomQuote,
  useSettings,
} from "../hooks/useLibrary";
import type { Seat } from "../types";

// ── Static data ───────────────────────────────────────────────────────────────
const facilities = [
  { icon: Wifi, label: "Free WiFi", desc: "High-speed internet" },
  { icon: Cpu, label: "AC Rooms", desc: "Climate controlled" },
  { icon: Droplets, label: "Drinking Water", desc: "RO filtered water" },
  { icon: BookOpen, label: "Study Tables", desc: "Spacious wooden desks" },
  { icon: Lock, label: "Locker Facility", desc: "Secure storage" },
  { icon: Camera, label: "CCTV Security", desc: "24/7 surveillance" },
  { icon: Newspaper, label: "Newspapers", desc: "Daily print media" },
  { icon: Printer, label: "Printer", desc: "Print & photocopy" },
];

const infoBoxes = [
  {
    icon: MapPin,
    label: "Address",
    value: "Near Vishwakarma Mandir, Main Road",
  },
  { icon: Phone, label: "Contact", value: "+91 98765 43210" },
  { icon: Clock, label: "Opening Hours", value: "6:00 AM – 11:00 PM" },
  {
    icon: Landmark,
    label: "Established",
    value: "Serving students since 2010",
  },
  { icon: Shield, label: "Security", value: "CCTV + Locker + ID Card" },
  { icon: ExternalLink, label: "Membership", value: "30-day renewable plans" },
];

// ── Mini Seat Box (for home page preview) ─────────────────────────────────────
function MiniSeatBox({ seat, index }: { seat: Seat; index: number }) {
  const [hovered, setHovered] = useState(false);
  const occupied = seat.isOccupied;

  return (
    <div
      data-ocid={`home.seat.item.${index}`}
      title={
        occupied
          ? `Seat ${Number(seat.seatNumber)} — Occupied${seat.occupiedBy ? `: ${seat.occupiedBy}` : ""}`
          : `Seat ${Number(seat.seatNumber)} — Available`
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-md border-2 flex flex-col items-center justify-center cursor-default select-none transition-smooth"
      style={{
        aspectRatio: "1",
        minWidth: 0,
        borderColor: occupied ? "oklch(0.55 0.22 22)" : "oklch(0.52 0.18 145)",
        backgroundColor: occupied
          ? "oklch(0.55 0.22 22 / 0.15)"
          : "oklch(0.52 0.18 145 / 0.12)",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        zIndex: hovered ? 5 : 1,
      }}
      aria-label={`Seat ${Number(seat.seatNumber)} ${occupied ? "Occupied" : "Available"}`}
    >
      <span
        className="font-bold font-display leading-none"
        style={{
          fontSize: "clamp(8px, 1.2vw, 11px)",
          color: occupied ? "oklch(0.48 0.2 22)" : "oklch(0.36 0.15 145)",
        }}
      >
        {Number(seat.seatNumber)}
      </span>
      <span
        className="mt-0.5 font-medium leading-none"
        style={{
          fontSize: "clamp(6px, 0.8vw, 9px)",
          color: occupied ? "oklch(0.48 0.2 22)" : "oklch(0.36 0.15 145)",
          opacity: 0.85,
        }}
      >
        {occupied ? "Occupied" : "Available"}
      </span>

      {/* Hover tooltip with student name */}
      {occupied && hovered && seat.occupiedBy && (
        <div
          className="absolute -top-9 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold shadow-elevated"
          style={{
            backgroundColor: "oklch(var(--primary))",
            color: "oklch(var(--primary-foreground))",
            border: "1px solid oklch(var(--border))",
          }}
          data-ocid={`home.seat.tooltip.${index}`}
        >
          {seat.occupiedBy}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2"
            style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "4px solid oklch(var(--primary))",
              width: 0,
              height: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function HomePage() {
  const { data: available, isLoading: seatsLoading } = useAvailableSeats();
  const { data: occupied, isLoading: occupiedLoading } = useOccupiedSeats();
  const { data: quote, isFetching: quoteFetching } = useRandomQuote();
  const { data: notices, isLoading: noticesLoading } = useActiveNotices();
  const { data: settings } = useSettings();
  const [copied, setCopied] = useState(false);
  const qc = useQueryClient();

  const availableCount = available?.length ?? 0;
  const occupiedCount = occupied?.length ?? 0;
  const totalSeats = availableCount + occupiedCount;

  // Merge + sort seats for the grid display
  const allSeats = useMemo<Seat[]>(() => {
    const map = new Map<string, Seat>();
    for (const s of available ?? []) map.set(s.seatNumber.toString(), s);
    for (const s of occupied ?? []) map.set(s.seatNumber.toString(), s);
    return Array.from(map.values()).sort(
      (a, b) => Number(a.seatNumber) - Number(b.seatNumber),
    );
  }, [available, occupied]);

  const handleShareLink = useCallback(() => {
    const posterUrl = `${window.location.origin}/poster`;
    navigator.clipboard.writeText(posterUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  const handleRefreshQuote = useCallback(() => {
    qc.invalidateQueries({ queryKey: ["quote-random"] });
  }, [qc]);

  const isSeatsLoading = seatsLoading || occupiedLoading;

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-card border-b border-border"
        data-ocid="home.hero_section"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full gradient-warm opacity-5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-accent opacity-5 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5">
                <span
                  className={`w-2 h-2 rounded-full bg-accent ${isSeatsLoading ? "" : "animate-pulse"}`}
                />
                <span className="text-xs font-medium text-accent">
                  {isSeatsLoading
                    ? "Loading seats..."
                    : `${availableCount} Seats Available Right Now`}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
                Shree Vishwakarma
                <br />
                <span className="text-accent">Library</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                <span className="text-primary font-semibold">
                  Gateway to Knowledge
                </span>{" "}
                — A premium study space with modern facilities for serious
                students.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/enroll"
                  data-ocid="home.enroll_button"
                  className="inline-flex items-center gap-2 gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90"
                >
                  <UserPlus size={16} />
                  Enroll Now
                </Link>
                <Link
                  to="/seats"
                  data-ocid="home.seats_button"
                  className="inline-flex items-center gap-2 border border-primary/40 text-primary bg-card px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/10 transition-smooth"
                >
                  <MapPin size={16} />
                  View All Seats
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="text-center space-y-4">
                <div className="relative w-52 h-52 mx-auto">
                  <div className="absolute inset-0 rounded-full gradient-warm opacity-10 blur-2xl" />
                  <div className="absolute -inset-3 rounded-full border border-accent/20" />
                  <div className="absolute -inset-6 rounded-full border border-accent/10" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent/40 shadow-elevated">
                    <img
                      src="/assets/generated/saraswati-logo.dim_200x200.png"
                      alt="Maa Saraswati — Goddess of Knowledge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <p className="font-display text-2xl text-primary font-bold">
                    Shree Vishwakarma
                  </p>
                  <p className="text-accent font-semibold tracking-widest text-xs uppercase mt-0.5">
                    Library &amp; Study Center
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Seat Status ───────────────────────────────────────────────── */}
      <section
        className="bg-background py-10 border-b border-border"
        data-ocid="home.seats_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
                Live Seat Availability
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 border"
                  style={{
                    backgroundColor: "oklch(0.52 0.18 145 / 0.1)",
                    borderColor: "oklch(0.52 0.18 145 / 0.4)",
                    color: "oklch(0.36 0.15 145)",
                  }}
                  data-ocid="home.seats.live_badge"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "oklch(0.52 0.18 145)" }}
                  />
                  LIVE
                </span>
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Real-time seat status — updated every 30 seconds
              </p>
            </div>
            <Link
              to="/seats"
              data-ocid="home.view_full_seat_map_link"
              className="inline-flex items-center gap-1.5 text-accent text-sm font-medium border border-accent/30 rounded-lg px-3 py-2 hover:bg-accent/10 transition-smooth self-start sm:self-auto"
            >
              Full Seat Map
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-3 mb-6"
            data-ocid="home.seats.stats"
          >
            {[
              {
                label: "Total Seats",
                value: isSeatsLoading ? "—" : String(totalSeats || "0"),
                style: {
                  bg: "oklch(var(--primary) / 0.08)",
                  border: "oklch(var(--primary) / 0.35)",
                  text: "oklch(var(--primary))",
                },
                ocid: "home.seats.stat_total",
              },
              {
                label: "Available",
                value: isSeatsLoading ? "—" : String(availableCount),
                style: {
                  bg: "oklch(0.52 0.18 145 / 0.1)",
                  border: "oklch(0.52 0.18 145 / 0.4)",
                  text: "oklch(0.36 0.15 145)",
                },
                ocid: "home.seats.stat_available",
              },
              {
                label: "Occupied",
                value: isSeatsLoading ? "—" : String(occupiedCount),
                style: {
                  bg: "oklch(0.55 0.22 22 / 0.08)",
                  border: "oklch(0.55 0.22 22 / 0.35)",
                  text: "oklch(0.48 0.2 22)",
                },
                ocid: "home.seats.stat_occupied",
              },
            ].map(({ label, value, style, ocid }) => (
              <div
                key={label}
                data-ocid={ocid}
                className="rounded-xl px-4 py-3 border text-center"
                style={{
                  backgroundColor: style.bg,
                  borderColor: style.border,
                }}
              >
                <div
                  className="font-display text-2xl sm:text-3xl font-bold"
                  style={{ color: style.text }}
                >
                  {value}
                </div>
                <div
                  className="text-xs font-medium mt-0.5"
                  style={{ color: style.text, opacity: 0.75 }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div
            className="flex items-center gap-4 text-xs text-muted-foreground mb-4"
            data-ocid="home.seats.legend"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded border-2 flex-shrink-0"
                style={{
                  backgroundColor: "oklch(0.52 0.18 145 / 0.12)",
                  borderColor: "oklch(0.52 0.18 145)",
                }}
              />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-3.5 h-3.5 rounded border-2 flex-shrink-0"
                style={{
                  backgroundColor: "oklch(0.55 0.22 22 / 0.15)",
                  borderColor: "oklch(0.55 0.22 22)",
                }}
              />
              <span>Occupied</span>
            </div>
            <span className="hidden sm:inline opacity-60 italic">
              · Hover red seat to see student name
            </span>
          </div>

          {/* Seat Grid */}
          <div
            className="bg-card border border-border rounded-xl p-4 shadow-warm"
            data-ocid="home.seats.grid"
          >
            {isSeatsLoading ? (
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
                }}
                data-ocid="home.seats.loading_state"
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                  <div
                    key={`skel-seat-${n}`}
                    className="rounded-md animate-pulse bg-muted"
                    style={{ aspectRatio: "1" }}
                  />
                ))}
              </div>
            ) : allSeats.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                data-ocid="home.seats.empty_state"
              >
                <span className="text-4xl mb-3" aria-hidden="true">
                  🪑
                </span>
                <p className="font-semibold text-foreground text-sm">
                  No seats set up yet
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  Please ask the admin to initialize seats
                </p>
              </div>
            ) : (
              <div
                className="grid gap-1.5"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
                }}
              >
                {allSeats.map((seat, idx) => (
                  <MiniSeatBox
                    key={seat.seatNumber.toString()}
                    seat={seat}
                    index={idx + 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Library Info Boxes ─────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-12 border-b border-border"
        data-ocid="home.info_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-primary">
              Library Information
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {settings?.libraryName ?? "Shree Vishwakarma Library"} — Essential
              details
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {infoBoxes.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                data-ocid={`home.info.item.${label.toLowerCase().replace(/\s/g, "_")}`}
                className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 shadow-warm hover:shadow-elevated transition-smooth group"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 group-hover:bg-accent/20 transition-smooth">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities ─────────────────────────────────────────────────────── */}
      <section
        className="bg-background py-12 border-b border-border"
        data-ocid="home.facilities_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-primary">
              Our Facilities
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Everything you need for focused study
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {facilities.map(({ icon: Icon, label, desc }, i) => (
              <div
                key={label}
                data-ocid={`home.facility.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-warm hover:border-accent/40 transition-smooth group"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-smooth text-accent">
                  <Icon size={19} />
                </div>
                <p className="font-semibold text-foreground text-xs leading-tight">
                  {label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Library Poster ─────────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-12 border-b border-border"
        data-ocid="home.poster_section"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border-2 border-accent/30 shadow-elevated">
            <div className="gradient-warm p-0.5 rounded-2xl">
              <div className="bg-card rounded-[14px] p-6 md:p-10">
                <div className="flex flex-col items-center gap-3 mb-8">
                  <SaraswatiLogo size="lg" showText={false} />
                  <div className="text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                      Shree Vishwakarma Library
                    </h2>
                    <p className="text-accent font-semibold mt-1 tracking-wide">
                      Library &amp; Study Center
                    </p>
                  </div>
                </div>

                <div className="text-center mb-8 p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <p className="font-display text-lg md:text-xl text-primary italic">
                    "The path to success goes through the library"
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Gateway to Knowledge and Wisdom
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold text-primary mb-4 text-center">
                    ✨ Our Premium Facilities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {facilities.map(({ label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 border border-border"
                      >
                        <Check
                          size={14}
                          className="text-accent flex-shrink-0"
                        />
                        <span className="text-sm font-medium text-foreground truncate">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={15} className="text-accent" />
                    <span>Near Vishwakarma Mandir, Main Road</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone size={15} className="text-accent" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock size={15} className="text-accent" />
                    <span>Open: 6 AM – 11 PM Daily</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleShareLink}
                    data-ocid="home.share_link_button"
                    className="inline-flex items-center gap-2 gradient-warm text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm shadow-warm hover:shadow-elevated hover:opacity-90 transition-smooth"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Link2 size={16} />
                        Share Library Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notice Board ───────────────────────────────────────────────────── */}
      <section
        className="bg-background py-12 border-b border-border"
        data-ocid="home.notices_section"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
              <Bell size={24} className="text-accent" />
              Notice Board
            </h2>
            <Link
              to="/notices"
              data-ocid="home.view_all_notices_link"
              className="flex items-center gap-1 text-accent text-sm font-medium hover:underline transition-smooth"
            >
              View All
              <ChevronRight size={15} />
            </Link>
          </div>

          {noticesLoading ? (
            <div className="space-y-3" data-ocid="home.notices.loading_state">
              {["n1", "n2", "n3"].map((k) => (
                <div
                  key={k}
                  className="h-16 bg-card rounded-xl border border-border animate-pulse"
                />
              ))}
            </div>
          ) : notices && notices.length > 0 ? (
            <div className="space-y-3">
              {notices.slice(0, 3).map((notice, i) => (
                <div
                  key={String(notice.id)}
                  data-ocid={`home.notice.item.${i + 1}`}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border shadow-warm hover:shadow-elevated hover:border-accent/30 transition-smooth group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-smooth">
                    <Bell size={14} className="text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {notice.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notice.content}
                    </p>
                  </div>
                  <span className="text-[10px] border border-accent/40 text-accent px-2 py-0.5 rounded-full flex-shrink-0 font-medium">
                    New
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-10 bg-card rounded-xl border border-border"
              data-ocid="home.notices.empty_state"
            >
              <Bell
                size={32}
                className="text-muted-foreground mx-auto mb-2 opacity-40"
              />
              <p className="text-muted-foreground text-sm">
                No notices at the moment
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Check back later for updates
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Motivational Quote ─────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-14 border-b border-border"
        data-ocid="home.quote_section"
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="font-display text-2xl font-bold text-primary">
              Daily Motivation
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Inspiration for your study session
            </p>
          </div>

          <div className="relative bg-card border border-accent/20 rounded-2xl p-8 md:p-12 shadow-elevated text-center">
            <div className="absolute top-4 left-6 font-display text-7xl text-accent/20 leading-none select-none">
              "
            </div>
            <div className="absolute bottom-2 right-6 font-display text-7xl text-accent/20 leading-none select-none rotate-180">
              "
            </div>

            {quoteFetching && !quote ? (
              <div
                className="flex items-center justify-center h-24"
                data-ocid="home.quote.loading_state"
              >
                <Loader2 size={28} className="text-accent animate-spin" />
              </div>
            ) : quote ? (
              <div className="relative space-y-4">
                <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic">
                  {quote.quote}
                </blockquote>
                <p className="text-accent font-semibold text-sm tracking-wide">
                  — {quote.author}
                </p>
              </div>
            ) : (
              <div className="relative space-y-4">
                <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic">
                  "Knowledge is the most powerful weapon you can use to change
                  the world."
                </blockquote>
                <p className="text-accent font-semibold text-sm tracking-wide">
                  — Nelson Mandela
                </p>
              </div>
            )}

            <div className="mt-6">
              <button
                type="button"
                onClick={handleRefreshQuote}
                disabled={quoteFetching}
                data-ocid="home.refresh_quote_button"
                className="inline-flex items-center gap-2 border border-accent/40 text-accent px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/10 disabled:opacity-50 transition-smooth"
              >
                <RefreshCw
                  size={14}
                  className={quoteFetching ? "animate-spin" : ""}
                />
                New Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section
        className="bg-primary py-12 text-primary-foreground"
        data-ocid="home.cta_section"
      >
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <SaraswatiLogo
            size="md"
            showText={false}
            className="justify-center"
          />
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Get Membership Today
          </h2>
          <p className="text-primary-foreground/70 text-sm max-w-md mx-auto">
            Join hundreds of students already studying at Shree Vishwakarma
            Library. 30-day membership with all premium facilities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/enroll"
              data-ocid="home.cta_enroll_button"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 shadow-warm transition-smooth"
            >
              <UserPlus size={16} />
              Enroll Now
            </Link>
            <Link
              to="/seats"
              data-ocid="home.cta_seats_button"
              className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-foreground/10 transition-smooth"
            >
              <MapPin size={16} />
              View Seats
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
