import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Lock,
  Plus,
  Quote,
  Save,
  Settings,
  Shield,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateAdminCredentials } from "../../hooks/useAdmin";
import {
  useAddQuote,
  useAllQuotes,
  useDeleteQuote,
  useInitializeSeats,
  useSettings,
  useUpdateSettings,
} from "../../hooks/useLibrary";
import type { LibrarySettings } from "../../types";

// ── Confirm Dialog (no browser confirm()) ─────────────────────────────────────
function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      data-ocid="settings.confirm.dialog"
    >
      <div className="bg-card border border-border rounded-xl shadow-elevated max-w-sm w-full p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-destructive"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              Confirm Action
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            data-ocid="settings.confirm.cancel_button"
            className="px-4 py-2 border border-border text-muted-foreground rounded-lg text-sm hover:bg-muted transition-smooth"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            data-ocid="settings.confirm.confirm_button"
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared input style ─────────────────────────────────────────────────────────
const inputCls =
  "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth placeholder:text-muted-foreground";

// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-9 h-9 rounded-lg gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm">
        <Icon size={18} className="text-primary-foreground" />
      </div>
      <div>
        <h3 className="font-display text-primary font-semibold text-lg leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// ── 1. Library Settings ────────────────────────────────────────────────────────
function LibrarySettingsSection() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const initSeats = useInitializeSeats();

  const [form, setForm] = useState<LibrarySettings>({
    libraryName: "Shree Vishwakarma Library",
    address: "",
    phone: "",
    openingHours: "6 AM – 11 PM",
    facilities: [],
    totalSeats: BigInt(0),
  });
  const [facilitiesStr, setFacilitiesStr] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [pendingSeatCount, setPendingSeatCount] = useState<number | null>(null);

  useEffect(() => {
    if (settings) {
      setForm(settings);
      setFacilitiesStr(settings.facilities.join(", "));
      setSeatCount(String(settings.totalSeats));
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const facArr = facilitiesStr
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      await updateSettings.mutateAsync({ ...form, facilities: facArr });
      toast.success("Library settings saved successfully!");
    } catch {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  const handleInitSeats = () => {
    const n = Number.parseInt(seatCount, 10);
    if (!n || n < 1 || n > 500) {
      toast.error("Please enter a valid number between 1 and 500");
      return;
    }
    setPendingSeatCount(n);
  };

  const confirmInitSeats = async () => {
    if (pendingSeatCount === null) return;
    const n = pendingSeatCount;
    setPendingSeatCount(null);
    try {
      await initSeats.mutateAsync(BigInt(n));
      toast.success(`${n} seats initialized successfully!`);
    } catch {
      toast.error("Failed to initialize seats. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-warm">
        <Skeleton className="h-6 w-48 mb-5" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-warm overflow-hidden"
      data-ocid="settings.library_section"
    >
      {/* Section stripe accent */}
      <div className="h-1 w-full gradient-warm" />
      <div className="p-6">
        <SectionHeader
          icon={Settings}
          title="Library Settings"
          subtitle="Update library name, address, and facilities"
        />

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="lib-name"
              >
                Library Name
              </label>
              <input
                id="lib-name"
                type="text"
                data-ocid="settings.library_name_input"
                value={form.libraryName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, libraryName: e.target.value }))
                }
                className={inputCls}
                placeholder="Shree Vishwakarma Library"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="lib-phone"
              >
                Phone Number
              </label>
              <input
                id="lib-phone"
                type="tel"
                data-ocid="settings.phone_input"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="9876543210"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="lib-address"
              >
                Address
              </label>
              <input
                id="lib-address"
                type="text"
                data-ocid="settings.address_input"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="Library full address"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="lib-hours"
              >
                Opening Hours
              </label>
              <input
                id="lib-hours"
                type="text"
                data-ocid="settings.hours_input"
                value={form.openingHours}
                onChange={(e) =>
                  setForm((p) => ({ ...p, openingHours: e.target.value }))
                }
                placeholder="6 AM – 11 PM"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="lib-facilities"
              >
                Facilities
                <span className="text-muted-foreground font-normal ml-1">
                  (comma-separated)
                </span>
              </label>
              <input
                id="lib-facilities"
                type="text"
                data-ocid="settings.facilities_input"
                value={facilitiesStr}
                onChange={(e) => setFacilitiesStr(e.target.value)}
                placeholder="WiFi, AC, Water Cooler, CCTV"
                className={inputCls}
              />
            </div>
          </div>

          {/* Facility preview chips */}
          {facilitiesStr.trim() && (
            <div className="flex flex-wrap gap-2">
              {facilitiesStr
                .split(",")
                .filter((f) => f.trim())
                .map((f) => (
                  <Badge
                    key={f.trim()}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {f.trim()}
                  </Badge>
                ))}
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              data-ocid="settings.library.save_button"
              disabled={updateSettings.isPending}
              className="flex items-center gap-2 gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90 disabled:opacity-60"
            >
              <Save size={15} />
              {updateSettings.isPending ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>

        {/* Seat initialization sub-section */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={16} className="text-accent" />
            <h4 className="font-medium text-sm text-foreground">
              Seat Initialization
            </h4>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="space-y-1.5 flex-1 max-w-xs">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="seat-count"
              >
                Total Seats (1–500)
              </label>
              <input
                id="seat-count"
                type="number"
                data-ocid="settings.seat_count_input"
                value={seatCount}
                onChange={(e) => setSeatCount(e.target.value)}
                min="1"
                max="500"
                placeholder="50"
                className={inputCls}
              />
            </div>
            <button
              type="button"
              data-ocid="settings.init_seats_button"
              onClick={handleInitSeats}
              disabled={initSeats.isPending}
              className="flex items-center gap-2 border border-primary/40 text-primary px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/10 transition-smooth disabled:opacity-60"
            >
              <Layers size={15} />
              {initSeats.isPending ? "Initializing..." : "Initialize Seats"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <span className="text-destructive">⚠️</span>
            Re-initializing seats may reset existing seat data
          </p>
        </div>
      </div>
      {pendingSeatCount !== null && (
        <ConfirmDialog
          message={`Are you sure you want to initialize ${pendingSeatCount} seats? Existing seat data may change.`}
          onConfirm={confirmInitSeats}
          onCancel={() => setPendingSeatCount(null)}
        />
      )}
    </div>
  );
}

// ── 2. Admin Credentials ───────────────────────────────────────────────────────
function CredentialsSection() {
  const updateCreds = useUpdateAdminCredentials();
  const [form, setForm] = useState({
    currentPassword: "",
    newUsername: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      await updateCreds.mutateAsync({
        currentPassword: form.currentPassword,
        newUsername: form.newUsername,
        newEmail: form.newEmail,
        newPassword: form.newPassword,
      });
      toast.success("Admin credentials updated successfully!");
      setForm({
        currentPassword: "",
        newUsername: "",
        newEmail: "",
        newPassword: "",
        confirmPassword: "",
      });
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-warm overflow-hidden"
      data-ocid="settings.credentials_section"
    >
      <div className="h-1 w-full gradient-warm" />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        data-ocid="settings.credentials_toggle"
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/20 transition-smooth"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm">
            <Lock size={18} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-primary font-semibold text-lg leading-tight">
              Admin Credentials
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Change username, email and password
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp
            size={18}
            className="text-muted-foreground flex-shrink-0"
          />
        ) : (
          <ChevronDown
            size={18}
            className="text-muted-foreground flex-shrink-0"
          />
        )}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="px-6 pb-6 space-y-4 border-t border-border pt-5"
          data-ocid="settings.credentials.form"
        >
          {/* Security notice */}
          <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <Shield size={15} className="text-accent flex-shrink-0" />
            <p className="text-xs text-accent font-medium">
              Current password will be verified before updating credentials
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="curr-pass"
              >
                Current Password <span className="text-destructive">*</span>
              </label>
              <input
                id="curr-pass"
                type="password"
                data-ocid="settings.current_password_input"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm((p) => ({ ...p, currentPassword: e.target.value }))
                }
                required
                autoComplete="current-password"
                className={inputCls}
                placeholder="Your current password"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="new-uname"
              >
                New Username <span className="text-destructive">*</span>
              </label>
              <input
                id="new-uname"
                type="text"
                data-ocid="settings.new_username_input"
                value={form.newUsername}
                onChange={(e) =>
                  setForm((p) => ({ ...p, newUsername: e.target.value }))
                }
                required
                autoComplete="username"
                className={inputCls}
                placeholder="admin"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="new-email"
              >
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="new-email"
                type="email"
                data-ocid="settings.new_email_input"
                value={form.newEmail}
                onChange={(e) =>
                  setForm((p) => ({ ...p, newEmail: e.target.value }))
                }
                required
                autoComplete="email"
                className={inputCls}
                placeholder="admin@library.com"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="new-pass"
              >
                New Password <span className="text-destructive">*</span>
              </label>
              <input
                id="new-pass"
                type="password"
                data-ocid="settings.new_password_input"
                value={form.newPassword}
                onChange={(e) =>
                  setForm((p) => ({ ...p, newPassword: e.target.value }))
                }
                required
                minLength={6}
                autoComplete="new-password"
                className={inputCls}
                placeholder="Min 6 characters"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="confirm-pass"
              >
                Confirm Password <span className="text-destructive">*</span>
              </label>
              <input
                id="confirm-pass"
                type="password"
                data-ocid="settings.confirm_password_input"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                required
                autoComplete="new-password"
                className={inputCls}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {/* Inline mismatch warning */}
          {form.newPassword &&
            form.confirmPassword &&
            form.newPassword !== form.confirmPassword && (
              <p
                className="text-destructive text-xs flex items-center gap-1"
                data-ocid="settings.credentials.password_mismatch"
              >
                ⚠️ Passwords do not match
              </p>
            )}

          {updateCreds.isError && (
            <p
              className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
              data-ocid="settings.credentials.error_state"
            >
              {updateCreds.error instanceof Error
                ? updateCreds.error.message
                : "Update failed — please try again"}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              data-ocid="settings.credentials.cancel_button"
              className="px-4 py-2.5 border border-border text-muted-foreground rounded-lg text-sm hover:bg-muted transition-smooth"
            >
              Cancel
            </button>
            <button
              type="submit"
              data-ocid="settings.credentials.save_button"
              disabled={
                updateCreds.isPending ||
                form.newPassword !== form.confirmPassword
              }
              className="flex items-center gap-2 gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90 disabled:opacity-60"
            >
              <Lock size={15} />
              {updateCreds.isPending ? "Updating..." : "Update Credentials"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ── 3. Motivational Quotes ────────────────────────────────────────────────────
function QuotesSection() {
  const { data: quotes, isLoading } = useAllQuotes();
  const addQuote = useAddQuote();
  const deleteQuote = useDeleteQuote();
  const [form, setForm] = useState({ text: "", author: "" });
  const [showForm, setShowForm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    id: bigint;
    text: string;
  } | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text.trim() || !form.author.trim()) {
      toast.error("Please fill in both quote and author");
      return;
    }
    try {
      await addQuote.mutateAsync({
        text: form.text.trim(),
        author: form.author.trim(),
      });
      setForm({ text: "", author: "" });
      setShowForm(false);
      toast.success("Quote added successfully!");
    } catch {
      toast.error("Failed to add quote. Please try again.");
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setPendingDelete(null);
    try {
      await deleteQuote.mutateAsync(id);
      toast.success("Quote deleted successfully!");
    } catch {
      toast.error("Failed to delete quote. Please try again.");
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-warm overflow-hidden"
      data-ocid="settings.quotes_section"
    >
      <div className="h-1 w-full gradient-warm" />
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm">
              <Quote size={18} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-primary font-semibold text-lg leading-tight">
                Motivational Quotes
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {quotes?.length ?? 0} quotes available
              </p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="settings.add_quote_button"
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 text-sm font-medium border border-accent/40 text-accent px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-smooth flex-shrink-0"
          >
            <Plus size={14} />
            {showForm ? "Cancel" : "Add Quote"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAdd}
            className="mb-5 p-4 bg-muted/30 rounded-xl border border-border space-y-3"
            data-ocid="settings.quote.form"
          >
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="q-text"
              >
                Quote <span className="text-destructive">*</span>
              </label>
              <textarea
                id="q-text"
                data-ocid="settings.quote_text_input"
                value={form.text}
                onChange={(e) =>
                  setForm((p) => ({ ...p, text: e.target.value }))
                }
                placeholder="Motivational quote text..."
                rows={3}
                required
                className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="q-author"
              >
                Author <span className="text-destructive">*</span>
              </label>
              <input
                id="q-author"
                type="text"
                data-ocid="settings.quote_author_input"
                value={form.author}
                onChange={(e) =>
                  setForm((p) => ({ ...p, author: e.target.value }))
                }
                placeholder="Swami Vivekananda"
                required
                className={inputCls}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                data-ocid="settings.quote_add_submit_button"
                disabled={addQuote.isPending}
                className="flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 disabled:opacity-60"
              >
                {addQuote.isPending ? "Adding..." : "Add Quote"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm({ text: "", author: "" });
                }}
                data-ocid="settings.quote_add_cancel_button"
                className="px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="space-y-3" data-ocid="settings.quotes.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        ) : quotes && quotes.length > 0 ? (
          <div
            className="space-y-2 max-h-96 overflow-y-auto pr-1"
            data-ocid="settings.quotes.list"
          >
            {quotes.map((q, i) => (
              <div
                key={String(q.id)}
                data-ocid={`settings.quotes.item.${i + 1}`}
                className="group flex items-start justify-between gap-3 p-3.5 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 transition-smooth"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground italic line-clamp-2 leading-relaxed">
                    "{q.quote}"
                  </p>
                  <p className="text-xs text-accent font-semibold mt-1">
                    — {q.author}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid={`settings.quotes.delete_button.${i + 1}`}
                  onClick={() => setPendingDelete({ id: q.id, text: q.quote })}
                  className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth opacity-0 group-hover:opacity-100"
                  aria-label="Delete quote"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            data-ocid="settings.quotes.empty_state"
            className="text-center py-10 text-muted-foreground"
          >
            <Quote size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No quotes added yet</p>
            <p className="text-xs mt-1">
              Use the "Add Quote" button to add your first motivational quote!
            </p>
          </div>
        )}
      </div>
      {pendingDelete !== null && (
        <ConfirmDialog
          message={`Delete this quote? "${pendingDelete.text.slice(0, 50)}..."`}
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}

// ── 4. About Section ──────────────────────────────────────────────────────────
function AboutSection() {
  const { data: settings } = useSettings();

  const details = [
    {
      label: "App Name",
      value: "Shree Vishwakarma Library Manager",
      icon: BookOpen,
    },
    {
      label: "Version",
      value: "v1.0.0",
      icon: Info,
    },
    {
      label: "Platform",
      value: "Internet Computer (ICP)",
      icon: Shield,
    },
    {
      label: "Library",
      value: settings?.libraryName ?? "Shree Vishwakarma Library",
      icon: Settings,
    },
  ];

  return (
    <div
      className="bg-card border border-border rounded-xl shadow-warm overflow-hidden"
      data-ocid="settings.about_section"
    >
      <div className="h-1 w-full gradient-warm" />
      <div className="p-6">
        <SectionHeader
          icon={Info}
          title="About"
          subtitle="App information and version details"
        />

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {details.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-lg border border-border/50"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ on{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Blessed by Maa Saraswati — Knowledge is Power 🪔
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main AdminSettings Page ────────────────────────────────────────────────────
export function AdminSettings() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8"
      data-ocid="admin.settings.page"
    >
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center shadow-elevated">
            <Settings size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-primary">
              Settings
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Manage library configuration and admin credentials
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <LibrarySettingsSection />
        <CredentialsSection />
        <QuotesSection />
        <AboutSection />
      </div>
    </div>
  );
}
