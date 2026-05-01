interface SaraswatiLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const sizes = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-20 h-20" };

export function SaraswatiLogo({
  size = "md",
  showText = true,
  className = "",
}: SaraswatiLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative ${sizes[size]} rounded-full overflow-hidden border-2 border-accent shadow-warm flex-shrink-0`}
        style={{ background: "oklch(var(--accent) / 0.15)" }}
      >
        <img
          src="/assets/generated/saraswati-logo.dim_200x200.png"
          alt="Maa Saraswati"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 rounded-full ring-2 ring-accent/30 ring-offset-0" />
      </div>
      {showText && (
        <div className="min-w-0">
          <p
            className="font-display text-primary leading-tight font-semibold truncate"
            style={{
              fontSize:
                size === "lg"
                  ? "1.5rem"
                  : size === "md"
                    ? "1.1rem"
                    : "0.875rem",
            }}
          >
            Shree Vishwakarma
          </p>
          <p
            className="text-muted-foreground leading-tight truncate"
            style={{ fontSize: size === "lg" ? "0.875rem" : "0.7rem" }}
          >
            Library &amp; Study Center
          </p>
        </div>
      )}
    </div>
  );
}
