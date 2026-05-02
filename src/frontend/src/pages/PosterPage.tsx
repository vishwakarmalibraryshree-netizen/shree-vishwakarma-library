import {
  BookOpen,
  Camera,
  Check,
  Clock,
  Cpu,
  Droplets,
  Lock,
  MapPin,
  Newspaper,
  Phone,
  Printer,
  Wifi,
} from "lucide-react";
import { useRandomQuote, useSettings } from "../hooks/useLibrary";

const facilities = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Cpu, label: "AC Rooms" },
  { icon: Droplets, label: "Drinking Water" },
  { icon: BookOpen, label: "Study Tables" },
  { icon: Lock, label: "Locker Facility" },
  { icon: Camera, label: "CCTV Security" },
  { icon: Newspaper, label: "Newspapers" },
  { icon: Printer, label: "Printer & Photocopy" },
];

export function PosterPage() {
  const { data: settings } = useSettings();
  const { data: quote } = useRandomQuote();

  const libraryName = settings?.libraryName ?? "Shree Vishwakarma Library";
  const address = settings?.address ?? "Near Vishwakarma Mandir, Main Road";
  const phone = settings?.phone ?? "+91 98765 43210";
  const hours = settings?.openingHours ?? "6:00 AM \u2013 11:00 PM Daily";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.04 15) 0%, oklch(0.20 0.06 20) 40%, oklch(0.18 0.05 30) 100%)",
      }}
      data-ocid="poster.page"
    >
      {/* Ambient glow layers */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.22 40 / 0.12) 0%, transparent 60%)",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, oklch(0.35 0.15 15 / 0.25) 0%, transparent 60%)",
        }}
      />

      {/* Poster card */}
      <div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 py-10"
        data-ocid="poster.card"
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.96 0.04 65) 0%, oklch(0.99 0.015 55) 50%, oklch(0.95 0.035 50) 100%)",
            border: "2px solid oklch(0.65 0.22 40 / 0.4)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Golden top band */}
          <div
            className="h-2 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.65 0.22 40) 0%, oklch(0.75 0.2 55) 50%, oklch(0.65 0.22 40) 100%)",
            }}
          />

          <div className="p-8 md:p-12 space-y-8">
            {/* Header \u2014 logo + name */}
            <div
              className="flex flex-col items-center gap-4"
              data-ocid="poster.header"
            >
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-full opacity-20 blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.65 0.22 40) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden"
                  style={{
                    border: "3px solid oklch(0.65 0.22 40)",
                    boxShadow:
                      "0 0 0 6px oklch(0.65 0.22 40 / 0.15), 0 8px 32px oklch(0.65 0.22 40 / 0.35)",
                  }}
                >
                  <img
                    src="/assets/generated/saraswati-logo.dim_200x200.png"
                    alt="Maa Saraswati \u2014 Goddess of Knowledge"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center">
                <div
                  className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase mb-2 px-4 py-1 rounded-full"
                  style={{
                    background: "oklch(0.65 0.22 40 / 0.12)",
                    color: "oklch(0.42 0.16 30)",
                    border: "1px solid oklch(0.65 0.22 40 / 0.35)",
                  }}
                >
                  \u2736 Welcome to \u2736
                </div>
                <h1
                  className="font-display font-bold leading-tight text-4xl md:text-5xl"
                  style={{ color: "oklch(0.25 0.12 15)" }}
                >
                  {libraryName}
                </h1>
                <p
                  className="font-semibold tracking-widest uppercase text-xs mt-1.5"
                  style={{ color: "oklch(0.55 0.18 35)" }}
                >
                  Premium Study Center
                </p>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.65 0.22 40 / 0.4), transparent)",
                }}
              />
              <span style={{ color: "oklch(0.65 0.22 40)" }}>\u2736</span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.65 0.22 40 / 0.4), transparent)",
                }}
              />
            </div>

            {/* Motivational quote */}
            {quote && (
              <div
                className="rounded-2xl px-6 py-5 text-center relative"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.22 40 / 0.08), oklch(0.65 0.22 40 / 0.04))",
                  border: "1px solid oklch(0.65 0.22 40 / 0.25)",
                }}
                data-ocid="poster.quote"
              >
                <div
                  className="absolute top-2 left-4 font-display text-5xl leading-none select-none opacity-20"
                  style={{ color: "oklch(0.55 0.18 35)" }}
                >
                  \u201c
                </div>
                <blockquote
                  className="font-display text-base md:text-lg italic leading-relaxed relative z-10"
                  style={{ color: "oklch(0.28 0.1 15)" }}
                >
                  {quote.quote}
                </blockquote>
                <p
                  className="text-xs font-semibold mt-2 tracking-wide"
                  style={{ color: "oklch(0.5 0.16 35)" }}
                >
                  \u2014 {quote.author}
                </p>
              </div>
            )}

            {/* Facilities grid */}
            <div data-ocid="poster.facilities">
              <h2
                className="font-display font-bold text-center text-base mb-4"
                style={{ color: "oklch(0.28 0.1 15)" }}
              >
                \u2728 Our Premium Facilities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {facilities.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{
                      background: "oklch(0.97 0.025 60 / 0.7)",
                      border: "1px solid oklch(0.65 0.22 40 / 0.2)",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.65 0.22 40 / 0.15)" }}
                    >
                      <Icon
                        size={13}
                        style={{ color: "oklch(0.45 0.18 35)" }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold leading-tight flex-1 min-w-0"
                      style={{ color: "oklch(0.3 0.08 15)" }}
                    >
                      {label}
                    </span>
                    <Check
                      size={11}
                      className="flex-shrink-0"
                      style={{ color: "oklch(0.52 0.18 145)" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.65 0.22 40 / 0.3), transparent)",
                }}
              />
              <span style={{ color: "oklch(0.65 0.22 40)" }}>\u2736</span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.65 0.22 40 / 0.3), transparent)",
                }}
              />
            </div>

            {/* Contact info */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
              data-ocid="poster.contact"
            >
              {[
                { icon: MapPin, label: "address", text: address },
                { icon: Phone, label: "phone", text: phone },
                { icon: Clock, label: "hours", text: hours },
              ].map(({ icon: Icon, label, text }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.22 40 / 0.1), oklch(0.65 0.22 40 / 0.04))",
                    border: "1px solid oklch(0.65 0.22 40 / 0.2)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(0.65 0.22 40 / 0.15)" }}
                  >
                    <Icon size={15} style={{ color: "oklch(0.45 0.18 35)" }} />
                  </div>
                  <span
                    className="text-xs font-medium leading-snug"
                    style={{ color: "oklch(0.3 0.08 15)" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Membership CTA banner */}
            <div
              className="rounded-2xl px-6 py-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.32 0.14 15) 0%, oklch(0.28 0.1 15) 100%)",
                border: "1px solid oklch(0.65 0.22 40 / 0.3)",
              }}
              data-ocid="poster.cta"
            >
              <p
                className="font-display font-bold text-lg"
                style={{ color: "oklch(0.88 0.16 55)" }}
              >
                Join Us Today
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.75 0.04 50)" }}
              >
                30-day renewable membership \u2022 All facilities included
              </p>
            </div>
          </div>

          {/* Golden bottom band */}
          <div
            className="h-2 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.65 0.22 40) 0%, oklch(0.75 0.2 55) 50%, oklch(0.65 0.22 40) 100%)",
            }}
          />
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-5 opacity-50"
          style={{ color: "oklch(0.75 0.04 50)" }}
        >
          \u00a9 {new Date().getFullYear()} {libraryName} \u2014 All rights
          reserved
        </p>
      </div>
    </div>
  );
}
