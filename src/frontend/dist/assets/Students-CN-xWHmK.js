import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, U as Users, F as FeesType, X, a as ue } from "./index-BxMJF1mf.js";
import { B as Badge } from "./badge-CWeIkufx.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-C8GH-zEu.js";
import { S as Skeleton } from "./skeleton-CPVH6K9v.js";
import { f as useAllStudents, g as useDeleteStudent, h as useUpdateStudent, u as useAvailableSeats } from "./types-CeHNxeEG.js";
import { T as Trash2 } from "./trash-2-B7ys0dFa.js";
import { S as SquarePen } from "./square-pen-fp1nv1Iq.js";
import { T as TriangleAlert } from "./triangle-alert-CNDl6Vs0.js";
import "./index-D9SYxO04.js";
import "./utils-2v2HxlWs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN");
}
function expiryStatus(expiryDate) {
  const now = Date.now();
  const expiry = Number(expiryDate) / 1e6;
  const daysLeft = Math.ceil((expiry - now) / 864e5);
  if (daysLeft <= 0)
    return {
      label: "Expired",
      cls: "bg-destructive/10 text-destructive border-destructive/30",
      daysLeft
    };
  if (daysLeft <= 7)
    return {
      label: `${daysLeft}d left`,
      cls: "bg-secondary text-secondary-foreground border-border",
      daysLeft
    };
  return {
    label: "Active",
    cls: "bg-accent/10 text-accent-foreground border-accent/30",
    daysLeft
  };
}
function DeleteDialog({
  studentName,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      "data-ocid": "students.delete.dialog",
      "aria-label": "Delete student confirmation",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0 border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 bg-foreground/50",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Escape" && onCancel(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card rounded-2xl shadow-elevated w-full max-w-sm border border-border p-6 space-y-4 animate-fade-in", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20, className: "text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground", children: "Delete Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                "Are you sure you want to delete",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  '"',
                  studentName,
                  '"'
                ] }),
                "? This action cannot be undone."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "students.delete.confirm_button",
                onClick: onConfirm,
                disabled: isPending,
                className: "flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 disabled:opacity-60",
                children: isPending ? "Deleting..." : "Delete"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "students.delete.cancel_button",
                onClick: onCancel,
                className: "flex-1 px-5 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function EditDialog({
  student,
  onClose
}) {
  const updateStudent = useUpdateStudent();
  const { data: availableSeats } = useAvailableSeats();
  const [form, setForm] = reactExports.useState({
    name: student.name,
    mobile: student.mobile,
    fatherName: student.fatherName,
    address: student.address,
    feesType: student.feesType,
    feesAmount: String(student.feesAmount),
    seatNumber: String(student.seatNumber),
    isActive: student.isActive
  });
  const seatOptions = reactExports.useMemo(
    () => [
      { seatNumber: student.seatNumber },
      ...(availableSeats ?? []).filter(
        (s) => s.seatNumber !== student.seatNumber
      )
    ],
    [availableSeats, student.seatNumber]
  );
  const handleSave = async (e) => {
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
        isActive: form.isActive
      });
      ue.success("Student details updated successfully!");
      onClose();
    } catch {
      ue.error("Failed to update. Please try again.");
    }
  };
  const field = (id, label, key, type = "text", ocid = "") => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "text-xs font-medium text-foreground block mb-1",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        "data-ocid": ocid || `students.edit.${key}_input`,
        value: form[key],
        onChange: (e) => setForm((p) => ({ ...p, [key]: e.target.value })),
        className: "w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0 border-0",
      "data-ocid": "students.edit.dialog",
      "aria-label": "Edit student",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 bg-foreground/50",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card rounded-2xl shadow-elevated w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-warm p-4 rounded-t-2xl sticky top-0 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-primary-foreground", children: "Edit Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "data-ocid": "students.edit.close_button",
                className: "text-primary-foreground/70 hover:text-primary-foreground transition-smooth",
                "aria-label": "Close dialog",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
              field(
                "e-name",
                "Full Name *",
                "name",
                "text",
                "students.edit.name_input"
              ),
              field(
                "e-mobile",
                "Mobile *",
                "mobile",
                "tel",
                "students.edit.mobile_input"
              ),
              field(
                "e-father",
                "Father's Name",
                "fatherName",
                "text",
                "students.edit.father_input"
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "edit-seat",
                    className: "text-xs font-medium text-foreground block mb-1",
                    children: "Seat Number"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "edit-seat",
                    "data-ocid": "students.edit.seat_select",
                    value: form.seatNumber,
                    onChange: (e) => setForm((p) => ({ ...p, seatNumber: e.target.value })),
                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    children: seatOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "option",
                      {
                        value: String(s.seatNumber),
                        children: [
                          "Seat ",
                          String(s.seatNumber),
                          s.seatNumber === student.seatNumber ? " (current)" : ""
                        ]
                      },
                      String(s.seatNumber)
                    ))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "edit-fees-type",
                    className: "text-xs font-medium text-foreground block mb-1",
                    children: "Fees Type"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "edit-fees-type",
                    "data-ocid": "students.edit.fees_type_select",
                    value: form.feesType,
                    onChange: (e) => setForm((p) => ({ ...p, feesType: e.target.value })),
                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: FeesType.cash, children: "Cash" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: FeesType.online, children: "Online" })
                    ]
                  }
                )
              ] }),
              field(
                "e-fees",
                "Fees Amount (₹)",
                "feesAmount",
                "number",
                "students.edit.fees_input"
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "edit-active",
                    type: "checkbox",
                    "data-ocid": "students.edit.active_checkbox",
                    checked: form.isActive,
                    onChange: (e) => setForm((p) => ({ ...p, isActive: e.target.checked })),
                    className: "w-4 h-4 accent-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "edit-active",
                    className: "text-sm font-medium text-foreground",
                    children: "Active Member"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "edit-address",
                    className: "text-xs font-medium text-foreground block mb-1",
                    children: "Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "edit-address",
                    type: "text",
                    "data-ocid": "students.edit.address_input",
                    value: form.address,
                    onChange: (e) => setForm((p) => ({ ...p, address: e.target.value })),
                    className: "w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  "data-ocid": "students.edit.save_button",
                  disabled: updateStudent.isPending,
                  className: "flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 disabled:opacity-60",
                  children: updateStudent.isPending ? "Saving..." : "Save Changes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "students.edit.cancel_button",
                  onClick: onClose,
                  className: "px-5 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function StudentRow({
  student,
  idx,
  onEdit,
  onDelete
}) {
  const exp = expiryStatus(student.expiryDate);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      "data-ocid": `students.item.${idx + 1}`,
      className: "border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0", children: student.name.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate max-w-[120px]", children: student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: student.studentId })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: student.mobile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-center text-foreground font-medium", children: String(student.seatNumber) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: student.feesType === FeesType.cash ? "border-primary/40 text-primary" : "border-accent/40 text-accent-foreground",
            children: student.feesType === FeesType.cash ? "Cash" : "Online"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-sm text-right font-medium text-foreground", children: [
          "₹",
          String(student.feesAmount)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs text-muted-foreground whitespace-nowrap", children: formatDate(student.entryDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-xs whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: `inline-block px-2 py-1 rounded-full border text-xs font-medium ${exp.cls}`,
            children: [
              formatDate(student.expiryDate),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 opacity-75", children: [
                "(",
                exp.label,
                ")"
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: student.isActive ? "border-accent/40 text-accent-foreground bg-accent/5" : "border-border text-muted-foreground",
            children: student.isActive ? "Active" : "Inactive"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `students.edit_button.${idx + 1}`,
              onClick: () => onEdit(student),
              className: "w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
              "aria-label": "Edit student",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `students.delete_button.${idx + 1}`,
              onClick: () => onDelete(student),
              className: "w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
              "aria-label": "Delete student",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminStudents() {
  const { data: students, isLoading } = useAllStudents();
  const deleteStudent = useDeleteStudent();
  const [search, setSearch] = reactExports.useState("");
  const [editStudent, setEditStudent] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { active, expired, totalActive } = reactExports.useMemo(() => {
    const list = students ?? [];
    const q = search.toLowerCase();
    const matches = (s) => !q || s.name.toLowerCase().includes(q) || s.mobile.includes(q) || s.studentId.toLowerCase().includes(q) || s.address.toLowerCase().includes(q);
    const now = Date.now();
    const isExpired = (s) => Number(s.expiryDate) / 1e6 < now;
    const totalActive2 = list.filter((s) => !isExpired(s)).length;
    return {
      active: list.filter((s) => !isExpired(s) && matches(s)),
      expired: list.filter((s) => isExpired(s) && matches(s)),
      totalActive: totalActive2
    };
  }, [students, search]);
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteStudent.mutateAsync(deleteTarget.id);
      ue.success(`${deleteTarget.name} deleted successfully!`);
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete. Please try again.");
    }
  };
  const tableHead = /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/40", children: [
    "Student",
    "Mobile",
    "Seat",
    "Fees Type",
    "Amount",
    "Entry Date",
    "Expiry Date",
    "Status",
    ""
  ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      className: "py-2.5 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide text-left whitespace-nowrap",
      children: h
    },
    h
  )) }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "admin.students.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-warm px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-primary-foreground font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }),
          "Students"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-primary-foreground/70 mt-0.5", children: [
          (students == null ? void 0 : students.length) ?? 0,
          " students total, ",
          totalActive,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 15,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/50"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            "data-ocid": "students.search_input",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by name, mobile, ID...",
            className: "w-full pl-9 pr-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-smooth"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-warm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground", children: [
          "Active Students (",
          active.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", "data-ocid": "students.loading_state", children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, k)) }) : active.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-12 text-center",
            "data-ocid": "students.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Users,
                {
                  size: 48,
                  className: "mx-auto mb-3 text-muted-foreground/30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: search ? "No students found for this search" : "No active students yet" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
          tableHead,
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: active.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            StudentRow,
            {
              student: s,
              idx: i,
              onEdit: setEditStudent,
              onDelete: setDeleteTarget
            },
            s.id.toString()
          )) })
        ] }) }) })
      ] }),
      expired.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "border border-destructive/20 shadow-warm",
          "data-ocid": "students.expired.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-destructive flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }),
              "Expired Students (",
              expired.length,
              ")"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto opacity-80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
              tableHead,
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: expired.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                StudentRow,
                {
                  student: s,
                  idx: active.length + i,
                  onEdit: setEditStudent,
                  onDelete: setDeleteTarget
                },
                s.id.toString()
              )) })
            ] }) }) })
          ]
        }
      )
    ] }),
    editStudent && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditDialog,
      {
        student: editStudent,
        onClose: () => setEditStudent(null)
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteDialog,
      {
        studentName: deleteTarget.name,
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isPending: deleteStudent.isPending
      }
    )
  ] });
}
export {
  AdminStudents
};
