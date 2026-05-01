import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddStudent,
  useAvailableSeats,
  useUpdateSeatOccupancy,
} from "@/hooks/useLibrary";
import {
  Armchair,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  MapPin,
  Phone,
  Printer,
  User,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  mobile: string;
  fatherName: string;
  address: string;
  seatNumber: string;
  feesType: "cash" | "online";
  feesAmount: string;
  entryDate: string;
}

interface ReceiptData {
  studentId: string;
  receiptNumber: string;
  name: string;
  mobile: string;
  fatherName: string;
  address: string;
  seatNumber: string;
  feesType: "cash" | "online";
  feesAmount: string;
  entryDate: string;
  expiryDate: string;
  printDate: string;
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function computeExpiry(entryDateStr: string): string {
  const d = new Date(entryDateStr);
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d} ${months[Number(m) - 1]} ${y}`;
}

function genReceiptNo() {
  return `SVL-${Date.now().toString().slice(-6)}`;
}

const EMPTY: FormData = {
  name: "",
  mobile: "",
  fatherName: "",
  address: "",
  seatNumber: "",
  feesType: "cash",
  feesAmount: "",
  entryDate: todayStr(),
};

// ── Step Dot ───────────────────────────────────────────────────────────────────
function StepDot({
  step,
  current,
  label,
}: { step: number; current: number; label: string }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-smooth border-2
          ${
            done
              ? "bg-primary border-primary text-primary-foreground"
              : active
                ? "bg-accent border-accent text-accent-foreground"
                : "bg-muted border-border text-muted-foreground"
          }`}
      >
        {done ? <CheckCircle className="w-5 h-5" /> : step}
      </div>
      <span
        className={`text-xs font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
    </div>
  );
}

// ── Field Wrapper ──────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground/80">{label}</Label>
      {children}
      {error && (
        <p
          className="text-xs text-destructive font-medium"
          data-ocid="enroll.field_error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ── Receipt Component ──────────────────────────────────────────────────────────
function PrintReceipt({ receipt }: { receipt: ReceiptData }) {
  return (
    <div
      id="print-receipt"
      className="bg-card rounded-xl shadow-elevated border border-border/60 overflow-hidden"
    >
      {/* Header */}
      <div className="gradient-warm px-6 py-5 text-primary-foreground text-center">
        <div className="flex justify-center mb-2">
          <BookOpen className="w-7 h-7 opacity-90" />
        </div>
        <h2 className="font-display text-xl font-bold tracking-wide">
          Shree Vishwakarma Library
        </h2>
        <p className="text-sm opacity-80 mt-0.5">Fee Receipt</p>
      </div>

      {/* Meta Row */}
      <div className="flex justify-between items-center px-6 py-3 bg-secondary/40 border-b border-border/40">
        <span className="text-xs text-muted-foreground">
          Receipt:{" "}
          <span className="font-mono font-semibold text-foreground">
            {receipt.receiptNumber}
          </span>
        </span>
        <span className="text-xs text-muted-foreground">
          Student ID:{" "}
          <span className="font-mono font-semibold text-foreground">
            {receipt.studentId}
          </span>
        </span>
        <span className="text-xs text-muted-foreground">
          Printed:{" "}
          <span className="font-semibold text-foreground">
            {formatDate(receipt.printDate)}
          </span>
        </span>
      </div>

      {/* Details */}
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {[
          { label: "Student Name", value: receipt.name },
          { label: "Father's Name", value: receipt.fatherName },
          { label: "Mobile Number", value: receipt.mobile },
          { label: "Address", value: receipt.address },
          { label: "Seat Number", value: `Seat ${receipt.seatNumber}` },
          {
            label: "Payment Mode",
            value: receipt.feesType === "cash" ? "Cash" : "Online",
          },
          { label: "Entry Date", value: formatDate(receipt.entryDate) },
          { label: "Expiry Date", value: formatDate(receipt.expiryDate) },
        ].map(({ label, value }) => (
          <div key={label} className="border-b border-border/30 pb-2">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-semibold text-foreground text-sm mt-0.5">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Fees Total */}
      <div className="mx-6 mb-5 rounded-lg bg-accent/10 border border-accent/30 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-accent-foreground" />
          <span className="font-medium text-foreground">Total Fees</span>
        </div>
        <span className="font-display text-2xl font-bold text-accent-foreground">
          ₹{receipt.feesAmount}
        </span>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 text-center text-xs text-muted-foreground border-t border-border/30 pt-3">
        <p className="italic">Valid for 30 days membership</p>
        <p className="mt-1.5 font-medium text-foreground/60">
          Authorised Signature: _______________
        </p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function EnrollPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  const addStudent = useAddStudent();
  const updateSeat = useUpdateSeatOccupancy();
  const { data: availableSeats = [], isLoading: seatsLoading } =
    useAvailableSeats();

  // Computed expiry from user-chosen entry date
  const expiryDate = computeExpiry(form.entryDate);

  const set = (k: keyof FormData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  // ── Validation ───────────────────────────────────────────────────────────────
  function validateStep1(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^\d{10}$/.test(form.mobile))
      e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.fatherName.trim()) e.fatherName = "Father's name is required";
    if (!form.address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.seatNumber) e.seatNumber = "Please select an available seat";
    if (!form.feesAmount || Number(form.feesAmount) <= 0)
      e.feesAmount = "Enter a valid fees amount greater than 0";
    if (!form.entryDate) e.entryDate = "Entry date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function nextStep() {
    if (step === 1 && validateStep1()) {
      setErrors({});
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setErrors({});
      setStep(3);
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    const studentId = `SVL-${Date.now()}`;
    const receiptNumber = genReceiptNo();

    try {
      // Convert entry date string to nanosecond timestamp
      const entryMs = new Date(form.entryDate).getTime();
      const entryNs = BigInt(entryMs) * BigInt(1_000_000);

      await addStudent.mutateAsync({
        name: form.name.trim(),
        mobile: form.mobile,
        fatherName: form.fatherName.trim(),
        address: form.address.trim(),
        seatNumber: BigInt(form.seatNumber),
        feesType: form.feesType,
        feesAmount: BigInt(form.feesAmount),
        entryDate: entryNs,
        studentId,
      });

      await updateSeat.mutateAsync({
        seatNumber: BigInt(form.seatNumber),
        isOccupied: true,
        occupiedBy: form.name.trim(),
      });

      setReceipt({
        studentId,
        receiptNumber,
        name: form.name.trim(),
        mobile: form.mobile,
        fatherName: form.fatherName.trim(),
        address: form.address.trim(),
        seatNumber: form.seatNumber,
        feesType: form.feesType,
        feesAmount: form.feesAmount,
        entryDate: form.entryDate,
        expiryDate,
        printDate: todayStr(),
      });

      toast.success(`${form.name.trim()} enrolled successfully!`);
    } catch {
      toast.error("Enrollment failed. Please try again.");
    }
  }

  function resetForm() {
    setForm(EMPTY);
    setErrors({});
    setReceipt(null);
    setStep(1);
  }

  // ── Success / Receipt View ───────────────────────────────────────────────────
  if (receipt) {
    return (
      <div className="min-h-screen bg-background">
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            #print-receipt, #print-receipt * { visibility: visible !important; }
            #print-receipt {
              position: fixed !important;
              top: 0 !important; left: 0 !important;
              width: 100vw !important;
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
            }
            .no-print { display: none !important; }
          }
        `}</style>

        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Success Banner */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="no-print mb-6 flex items-center gap-3 bg-primary/10 border border-primary/25 rounded-xl px-5 py-4"
            data-ocid="enroll.success_state"
          >
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">
                Enrollment Successful!
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {receipt.name} has been assigned Seat {receipt.seatNumber} •{" "}
                Valid until {formatDate(receipt.expiryDate)}
              </p>
            </div>
          </motion.div>

          {/* Print Receipt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PrintReceipt receipt={receipt} />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="no-print mt-6 flex flex-col sm:flex-row gap-3"
          >
            <Button
              onClick={() => window.print()}
              className="flex-1 gap-2"
              data-ocid="enroll.print_button"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </Button>
            <Button
              variant="outline"
              onClick={resetForm}
              className="flex-1 gap-2"
              data-ocid="enroll.enroll_another_button"
            >
              <UserPlus className="w-4 h-4" />
              Enroll Another Student
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Form View ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="enroll.page">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-4">
            <UserPlus className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              New Enrollment
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Student Enrollment
          </h1>
          <p className="text-muted-foreground mt-1.5">
            Register a new student — 30 days membership
          </p>
        </div>

        {/* Step Indicator */}
        <div
          className="flex items-center justify-center mb-8"
          data-ocid="enroll.steps"
        >
          <StepDot step={1} current={step} label="Basic Info" />
          <div
            className={`h-0.5 w-16 sm:w-24 mx-2 transition-smooth ${step > 1 ? "bg-primary" : "bg-border"}`}
          />
          <StepDot step={2} current={step} label="Seat & Fees" />
          <div
            className={`h-0.5 w-16 sm:w-24 mx-2 transition-smooth ${step > 2 ? "bg-primary" : "bg-border"}`}
          />
          <StepDot step={3} current={step} label="Review" />
        </div>

        {/* Form Card */}
        <Card className="shadow-elevated border-border/60">
          <CardHeader className="pb-4 border-b border-border/30">
            <CardTitle className="font-display text-xl flex items-center gap-2 text-foreground">
              {step === 1 && (
                <>
                  <User className="w-5 h-5 text-accent-foreground" />
                  Step 1: Basic Information
                </>
              )}
              {step === 2 && (
                <>
                  <Armchair className="w-5 h-5 text-accent-foreground" />
                  Step 2: Seat &amp; Fees
                </>
              )}
              {step === 3 && (
                <>
                  <CheckCircle className="w-5 h-5 text-accent-foreground" />
                  Step 3: Review &amp; Confirm
                </>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <AnimatePresence mode="wait">
              {/* ── Step 1: Basic Info ─────────────────────────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-5"
                  data-ocid="enroll.step1"
                >
                  <Field label="Student Full Name *" error={errors.name}>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter student's full name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="pl-10"
                        data-ocid="enroll.name_input"
                      />
                    </div>
                  </Field>

                  <Field label="Mobile Number *" error={errors.mobile}>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="10-digit mobile number"
                        value={form.mobile}
                        onChange={(e) =>
                          set(
                            "mobile",
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        className="pl-10"
                        inputMode="numeric"
                        maxLength={10}
                        data-ocid="enroll.mobile_input"
                      />
                    </div>
                  </Field>

                  <Field label="Father's Name *" error={errors.fatherName}>
                    <Input
                      placeholder="Father's full name"
                      value={form.fatherName}
                      onChange={(e) => set("fatherName", e.target.value)}
                      data-ocid="enroll.father_name_input"
                    />
                  </Field>

                  <Field label="Address *" error={errors.address}>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        placeholder="Full residential address"
                        value={form.address}
                        onChange={(e) => set("address", e.target.value)}
                        rows={3}
                        className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        data-ocid="enroll.address_input"
                      />
                    </div>
                  </Field>
                </motion.div>
              )}

              {/* ── Step 2: Seat & Fees ────────────────────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-5"
                  data-ocid="enroll.step2"
                >
                  <Field label="Select Seat *" error={errors.seatNumber}>
                    <div className="relative">
                      <Armchair className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <select
                        value={form.seatNumber}
                        onChange={(e) => set("seatNumber", e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
                        data-ocid="enroll.seat_select"
                      >
                        <option value="">-- Select an Available Seat --</option>
                        {availableSeats.map((s) => (
                          <option
                            key={s.seatNumber.toString()}
                            value={s.seatNumber.toString()}
                          >
                            Seat {s.seatNumber.toString()} — Available
                          </option>
                        ))}
                      </select>
                    </div>
                    {seatsLoading && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Loading available seats...
                      </p>
                    )}
                    {!seatsLoading && availableSeats.length === 0 && (
                      <p className="text-xs text-destructive mt-1 font-medium">
                        No seats currently available.
                      </p>
                    )}
                    {!seatsLoading && availableSeats.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {availableSeats.length} seat
                        {availableSeats.length !== 1 ? "s" : ""} available
                      </p>
                    )}
                  </Field>

                  <Field label="Fees Amount *" error={errors.feesAmount}>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Amount in Rupees"
                        value={form.feesAmount}
                        onChange={(e) =>
                          set("feesAmount", e.target.value.replace(/\D/g, ""))
                        }
                        className="pl-10"
                        inputMode="numeric"
                        data-ocid="enroll.fees_amount_input"
                      />
                    </div>
                  </Field>

                  <Field label="Payment Mode *">
                    <div
                      className="flex gap-3"
                      data-ocid="enroll.fees_type_toggle"
                    >
                      {(["cash", "online"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => set("feesType", type)}
                          className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold transition-smooth
                            ${
                              form.feesType === type
                                ? "border-accent bg-accent/10 text-accent-foreground"
                                : "border-border bg-muted text-muted-foreground hover:border-accent/50"
                            }`}
                          data-ocid={`enroll.fees_type_${type}`}
                        >
                          {type === "cash" ? "💵 Cash" : "📱 Online"}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Entry Date Picker */}
                  <Field label="Entry Date *" error={errors.entryDate}>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="date"
                        value={form.entryDate}
                        onChange={(e) => set("entryDate", e.target.value)}
                        className="pl-10"
                        data-ocid="enroll.entry_date_input"
                      />
                    </div>
                  </Field>

                  {/* Auto-calculated Expiry Date (read-only) */}
                  {form.entryDate && (
                    <div className="bg-secondary/40 rounded-lg px-4 py-3 border border-border/30 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Expiry Date (auto-calculated)
                        </p>
                        <p className="font-semibold text-foreground mt-0.5">
                          {formatDate(expiryDate)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        30 days
                      </Badge>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Step 3: Review ─────────────────────────────────────────────── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                  data-ocid="enroll.step3"
                >
                  <div className="space-y-0 mb-5 rounded-lg border border-border/40 overflow-hidden">
                    {[
                      { label: "Student Name", value: form.name },
                      { label: "Mobile Number", value: form.mobile },
                      { label: "Father's Name", value: form.fatherName },
                      { label: "Address", value: form.address },
                      {
                        label: "Seat Number",
                        value: `Seat ${form.seatNumber}`,
                      },
                      { label: "Fees Amount", value: `₹${form.feesAmount}` },
                      {
                        label: "Payment Mode",
                        value: form.feesType === "cash" ? "Cash" : "Online",
                      },
                      {
                        label: "Entry Date",
                        value: formatDate(form.entryDate),
                      },
                      { label: "Expiry Date", value: formatDate(expiryDate) },
                    ].map(({ label, value }, i) => (
                      <div
                        key={label}
                        className={`flex justify-between items-start gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-muted/40" : "bg-card"}`}
                      >
                        <span className="text-sm text-muted-foreground flex-shrink-0">
                          {label}
                        </span>
                        <span className="text-sm font-semibold text-foreground text-right break-words min-w-0">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {(addStudent.isError || updateSeat.isError) && (
                    <div
                      className="bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 text-sm text-destructive mb-4"
                      data-ocid="enroll.error_state"
                    >
                      Enrollment failed. Please check your details and try
                      again.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-6 pt-5 border-t border-border/30">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setErrors({});
                    setStep((s) => s - 1);
                  }}
                  className="gap-1.5"
                  data-ocid="enroll.back_button"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              )}

              {step < 3 && (
                <Button
                  onClick={nextStep}
                  className="flex-1 gap-1.5"
                  data-ocid="enroll.next_button"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}

              {step === 3 && (
                <Button
                  onClick={handleSubmit}
                  disabled={addStudent.isPending || updateSeat.isPending}
                  className="flex-1 gap-1.5"
                  data-ocid="enroll.submit_button"
                >
                  {addStudent.isPending || updateSeat.isPending ? (
                    <span
                      className="flex items-center gap-2"
                      data-ocid="enroll.loading_state"
                    >
                      <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Confirm Enrollment
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Step counter */}
            <div className="flex justify-center mt-4">
              <Badge
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                Step {step} of 3
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
