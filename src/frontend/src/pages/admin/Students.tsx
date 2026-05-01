import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Edit, Search, Trash2, Users, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useAllStudents,
  useAvailableSeats,
  useDeleteStudent,
  useUpdateStudent,
} from "../../hooks/useLibrary";
import { FeesType } from "../../types";
import type { Student } from "../../types";

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN");
}

function expiryStatus(expiryDate: bigint): {
  label: string;
  cls: string;
  daysLeft: number;
} {
  const now = Date.now();
  const expiry = Number(expiryDate) / 1_000_000;
  const daysLeft = Math.ceil((expiry - now) / 86_400_000);
  if (daysLeft <= 0)
    return {
      label: "Expired",
      cls: "bg-destructive/10 text-destructive border-destructive/30",
      daysLeft,
    };
  if (daysLeft <= 7)
    return {
      label: `${daysLeft}d left`,
      cls: "bg-secondary text-secondary-foreground border-border",
      daysLeft,
    };
  return {
    label: "Active",
    cls: "bg-accent/10 text-accent-foreground border-accent/30",
    daysLeft,
  };
}

// ── Delete Confirmation Dialog ────────────────────────────────────────────────
function DeleteDialog({
  studentName,
  onConfirm,
  onCancel,
  isPending,
}: {
  studentName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  return (
    <dialog
      open
      data-ocid="students.delete.dialog"
      aria-label="Delete student confirmation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0 border-0"
    >
      <div
        className="fixed inset-0 bg-foreground/50"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        aria-hidden="true"
      />
      <div className="relative bg-card rounded-2xl shadow-elevated w-full max-w-sm border border-border p-6 space-y-4 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">
              Delete Student
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{studentName}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            data-ocid="students.delete.confirm_button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            data-ocid="students.delete.cancel_button"
            onClick={onCancel}
            className="flex-1 px-5 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────
function EditDialog({
  student,
  onClose,
}: {
  student: Student;
  onClose: () => void;
}) {
  const updateStudent = useUpdateStudent();
  const { data: availableSeats } = useAvailableSeats();
  const [form, setForm] = useState({
    name: student.name,
    mobile: student.mobile,
    fatherName: student.fatherName,
    address: student.address,
    feesType: student.feesType as string,
    feesAmount: String(student.feesAmount),
    seatNumber: String(student.seatNumber),
    isActive: student.isActive,
  });

  const seatOptions = useMemo(
    () => [
      { seatNumber: student.seatNumber },
      ...(availableSeats ?? []).filter(
        (s) => s.seatNumber !== student.seatNumber,
      ),
    ],
    [availableSeats, student.seatNumber],
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStudent.mutateAsync({
        ...student,
        name: form.name,
        mobile: form.mobile,
        fatherName: form.fatherName,
        address: form.address,
        feesType: form.feesType === "cash" ? FeesType.cash : FeesType.online,
        feesAmount: BigInt(form.feesAmount || "0"),
        seatNumber: BigInt(form.seatNumber),
        isActive: form.isActive,
      });
      toast.success("Student details updated successfully!");
      onClose();
    } catch {
      toast.error("Failed to update. Please try again.");
    }
  };

  const field = (
    id: string,
    label: string,
    key: keyof typeof form,
    type = "text",
    ocid = "",
  ) => (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-medium text-foreground block mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        data-ocid={ocid || `students.edit.${key}_input`}
        value={form[key] as string}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
      />
    </div>
  );

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0 border-0"
      data-ocid="students.edit.dialog"
      aria-label="Edit student"
    >
      <div
        className="fixed inset-0 bg-foreground/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />
      <div className="relative bg-card rounded-2xl shadow-elevated w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto">
        <div className="gradient-warm p-4 rounded-t-2xl sticky top-0 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-primary-foreground">
            Edit Student
          </h3>
          <button
            type="button"
            onClick={onClose}
            data-ocid="students.edit.close_button"
            className="text-primary-foreground/70 hover:text-primary-foreground transition-smooth"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            {field(
              "e-name",
              "Full Name *",
              "name",
              "text",
              "students.edit.name_input",
            )}
            {field(
              "e-mobile",
              "Mobile *",
              "mobile",
              "tel",
              "students.edit.mobile_input",
            )}
            {field(
              "e-father",
              "Father's Name",
              "fatherName",
              "text",
              "students.edit.father_input",
            )}

            {/* Seat */}
            <div>
              <label
                htmlFor="edit-seat"
                className="text-xs font-medium text-foreground block mb-1"
              >
                Seat Number
              </label>
              <select
                id="edit-seat"
                data-ocid="students.edit.seat_select"
                value={form.seatNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, seatNumber: e.target.value }))
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              >
                {seatOptions.map((s) => (
                  <option
                    key={String(s.seatNumber)}
                    value={String(s.seatNumber)}
                  >
                    Seat {String(s.seatNumber)}
                    {s.seatNumber === student.seatNumber ? " (current)" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Fees type */}
            <div>
              <label
                htmlFor="edit-fees-type"
                className="text-xs font-medium text-foreground block mb-1"
              >
                Fees Type
              </label>
              <select
                id="edit-fees-type"
                data-ocid="students.edit.fees_type_select"
                value={form.feesType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, feesType: e.target.value }))
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              >
                <option value={FeesType.cash}>Cash</option>
                <option value={FeesType.online}>Online</option>
              </select>
            </div>

            {field(
              "e-fees",
              "Fees Amount (₹)",
              "feesAmount",
              "number",
              "students.edit.fees_input",
            )}

            {/* Active toggle */}
            <div className="flex items-center gap-3 pt-1">
              <input
                id="edit-active"
                type="checkbox"
                data-ocid="students.edit.active_checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isActive: e.target.checked }))
                }
                className="w-4 h-4 accent-primary"
              />
              <label
                htmlFor="edit-active"
                className="text-sm font-medium text-foreground"
              >
                Active Member
              </label>
            </div>

            {/* Address full width */}
            <div className="sm:col-span-2">
              <label
                htmlFor="edit-address"
                className="text-xs font-medium text-foreground block mb-1"
              >
                Address
              </label>
              <input
                id="edit-address"
                type="text"
                data-ocid="students.edit.address_input"
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              data-ocid="students.edit.save_button"
              disabled={updateStudent.isPending}
              className="flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 disabled:opacity-60"
            >
              {updateStudent.isPending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              data-ocid="students.edit.cancel_button"
              onClick={onClose}
              className="px-5 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

// ── Student Row ───────────────────────────────────────────────────────────────
function StudentRow({
  student,
  idx,
  onEdit,
  onDelete,
}: {
  student: Student;
  idx: number;
  onEdit: (s: Student) => void;
  onDelete: (s: Student) => void;
}) {
  const exp = expiryStatus(student.expiryDate);
  return (
    <tr
      data-ocid={`students.item.${idx + 1}`}
      className="border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors"
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate max-w-[120px]">
              {student.name}
            </p>
            <p className="text-xs text-muted-foreground">{student.studentId}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-muted-foreground">
        {student.mobile}
      </td>
      <td className="py-3 px-4 text-sm text-center text-foreground font-medium">
        {String(student.seatNumber)}
      </td>
      <td className="py-3 px-4 text-sm text-center">
        <Badge
          variant="outline"
          className={
            student.feesType === FeesType.cash
              ? "border-primary/40 text-primary"
              : "border-accent/40 text-accent-foreground"
          }
        >
          {student.feesType === FeesType.cash ? "Cash" : "Online"}
        </Badge>
      </td>
      <td className="py-3 px-4 text-sm text-right font-medium text-foreground">
        ₹{String(student.feesAmount)}
      </td>
      <td className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
        {formatDate(student.entryDate)}
      </td>
      <td className="py-3 px-4 text-xs whitespace-nowrap">
        <span
          className={`inline-block px-2 py-1 rounded-full border text-xs font-medium ${exp.cls}`}
        >
          {formatDate(student.expiryDate)}
          <span className="ml-1 opacity-75">({exp.label})</span>
        </span>
      </td>
      <td className="py-3 px-4">
        <Badge
          variant="outline"
          className={
            student.isActive
              ? "border-accent/40 text-accent-foreground bg-accent/5"
              : "border-border text-muted-foreground"
          }
        >
          {student.isActive ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-1 justify-end">
          <button
            type="button"
            data-ocid={`students.edit_button.${idx + 1}`}
            onClick={() => onEdit(student)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
            aria-label="Edit student"
          >
            <Edit size={14} />
          </button>
          <button
            type="button"
            data-ocid={`students.delete_button.${idx + 1}`}
            onClick={() => onDelete(student)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
            aria-label="Delete student"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function AdminStudents() {
  const { data: students, isLoading } = useAllStudents();
  const deleteStudent = useDeleteStudent();
  const [search, setSearch] = useState("");
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const { active, expired, totalActive } = useMemo(() => {
    const list = students ?? [];
    const q = search.toLowerCase();
    const matches = (s: Student) =>
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.mobile.includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q);

    const now = Date.now();
    const isExpired = (s: Student) => Number(s.expiryDate) / 1_000_000 < now;
    const totalActive = list.filter((s) => !isExpired(s)).length;

    return {
      active: list.filter((s) => !isExpired(s) && matches(s)),
      expired: list.filter((s) => isExpired(s) && matches(s)),
      totalActive,
    };
  }, [students, search]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteStudent.mutateAsync(deleteTarget.id);
      toast.success(`${deleteTarget.name} deleted successfully!`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete. Please try again.");
    }
  };

  const tableHead = (
    <thead>
      <tr className="border-b border-border bg-muted/40">
        {[
          "Student",
          "Mobile",
          "Seat",
          "Fees Type",
          "Amount",
          "Entry Date",
          "Expiry Date",
          "Status",
          "",
        ].map((h) => (
          <th
            key={h}
            className="py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left whitespace-nowrap"
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.students.page">
      {/* Header */}
      <div className="gradient-warm px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-primary-foreground font-display flex items-center gap-2">
            <Users size={20} />
            Students
          </h1>
          <p className="text-sm text-primary-foreground/70 mt-0.5">
            {students?.length ?? 0} students total, {totalActive} active
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/50"
          />
          <input
            type="text"
            data-ocid="students.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, mobile, ID..."
            className="w-full pl-9 pr-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-smooth"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Active students table */}
        <Card className="border border-border shadow-warm">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Active Students ({active.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 space-y-2" data-ocid="students.loading_state">
                {["s1", "s2", "s3", "s4"].map((k) => (
                  <Skeleton key={k} className="h-14 w-full" />
                ))}
              </div>
            ) : active.length === 0 ? (
              <div
                className="py-12 text-center"
                data-ocid="students.empty_state"
              >
                <Users
                  size={48}
                  className="mx-auto mb-3 text-muted-foreground/30"
                />
                <p className="text-muted-foreground">
                  {search
                    ? "No students found for this search"
                    : "No active students yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  {tableHead}
                  <tbody>
                    {active.map((s, i) => (
                      <StudentRow
                        key={s.id.toString()}
                        student={s}
                        idx={i}
                        onEdit={setEditStudent}
                        onDelete={setDeleteTarget}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Expired students */}
        {expired.length > 0 && (
          <Card
            className="border border-destructive/20 shadow-warm"
            data-ocid="students.expired.section"
          >
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base font-semibold text-destructive flex items-center gap-2">
                <Trash2 size={16} />
                Expired Students ({expired.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto opacity-80">
                <table className="w-full text-left">
                  {tableHead}
                  <tbody>
                    {expired.map((s, i) => (
                      <StudentRow
                        key={s.id.toString()}
                        student={s}
                        idx={active.length + i}
                        onEdit={setEditStudent}
                        onDelete={setDeleteTarget}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {editStudent && (
        <EditDialog
          student={editStudent}
          onClose={() => setEditStudent(null)}
        />
      )}

      {deleteTarget && (
        <DeleteDialog
          studentName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteStudent.isPending}
        />
      )}
    </div>
  );
}
