import { u as useAuth, r as reactExports, j as jsxRuntimeExports, B as Bell, X, a as ue } from "./index-BX6EltLE.js";
import { S as Skeleton } from "./skeleton-YomDqqRk.js";
import { b as useActiveNotices, c as useAddNotice, d as useUpdateNotice, e as useDeleteNotice } from "./types-DKmKknrx.js";
import { P as Plus } from "./plus-D-bQ0k3z.js";
import { C as Calendar } from "./calendar-TXNmPpyV.js";
import { S as SquarePen } from "./square-pen-B5cX_klP.js";
import { T as Trash2 } from "./trash-2-C5HaXbcR.js";
import "./utils-2v2HxlWs.js";
const MONTHS = [
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
  "Dec"
];
function formatDate(ts) {
  const d = new Date(Number(ts));
  const day = String(d.getDate()).padStart(2, "0");
  const mon = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${mon} ${year}`;
}
function NoticesPage() {
  const { data: notices, isLoading } = useActiveNotices();
  const { isAdmin } = useAuth();
  const addNotice = useAddNotice();
  const updateNotice = useUpdateNotice();
  const deleteNotice = useDeleteNotice();
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editNotice, setEditNotice] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({ title: "", content: "" });
  const openAdd = () => {
    setForm({ title: "", content: "" });
    setAddOpen(true);
  };
  const openEdit = (n) => {
    setEditNotice(n);
    setForm({ title: n.title, content: n.content });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addNotice.mutateAsync(form);
      setAddOpen(false);
      ue.success("Notice added successfully!");
    } catch {
      ue.error("Failed to add notice. Please try again.");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editNotice) return;
    try {
      await updateNotice.mutateAsync({ ...editNotice, ...form });
      setEditNotice(null);
      ue.success("Notice updated successfully!");
    } catch {
      ue.error("Failed to update notice. Please try again.");
    }
  };
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteNotice.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      ue.success("Notice deleted successfully!");
    } catch {
      ue.error("Failed to delete notice. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8", "data-ocid": "notices.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-primary flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 32, className: "text-accent" }),
            "Notice Board"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Library notices and important announcements" })
        ] }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "notices.add_button",
            onClick: openAdd,
            className: "flex items-center gap-2 gradient-warm text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
              "Add Notice"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "notices.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, i)) }) : notices && notices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: notices.map((notice, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": `notices.item.${i + 1}`,
          className: "bg-card border border-border rounded-xl p-5 shadow-warm hover:shadow-elevated transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-accent mt-2 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base leading-snug", children: notice.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1.5 leading-relaxed", children: notice.content }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-3 text-xs text-muted-foreground/70", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(notice.createdAt) })
                ] })
              ] })
            ] }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `notices.edit_button.${i + 1}`,
                  onClick: () => openEdit(notice),
                  className: "w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-smooth",
                  "aria-label": "Edit notice",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `notices.delete_button.${i + 1}`,
                  onClick: () => setDeleteTarget(notice),
                  className: "w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-smooth",
                  "aria-label": "Delete notice",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                }
              )
            ] })
          ] })
        },
        String(notice.id)
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "notices.empty_state", className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 36, className: "text-muted-foreground/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-muted-foreground", children: "No notices yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-sm mt-1", children: "Library notices and announcements will appear here" })
      ] })
    ] }),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "oklch(var(--foreground) / 0.4)" },
        "data-ocid": "notices.add.dialog",
        "aria-labelledby": "add-notice-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-elevated w-full max-w-md border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-warm p-4 rounded-t-2xl relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setAddOpen(false),
                className: "absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-smooth",
                "aria-label": "Close dialog",
                "data-ocid": "notices.add.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                id: "add-notice-heading",
                className: "font-display text-lg font-semibold text-primary-foreground",
                children: "Add New Notice"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdd, className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "add-notice-title",
                  className: "text-sm font-medium text-foreground block mb-1.5",
                  children: "Title"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "add-notice-title",
                  type: "text",
                  "data-ocid": "notices.title_input",
                  value: form.title,
                  onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
                  placeholder: "Enter notice title",
                  required: true,
                  className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "add-notice-content",
                  className: "text-sm font-medium text-foreground block mb-1.5",
                  children: "Content"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "add-notice-content",
                  "data-ocid": "notices.content_input",
                  value: form.content,
                  onChange: (e) => setForm((p) => ({ ...p, content: e.target.value })),
                  placeholder: "Write the full notice content here...",
                  required: true,
                  rows: 4,
                  className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  "data-ocid": "notices.add.submit_button",
                  disabled: addNotice.isPending,
                  className: "flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-smooth hover:opacity-90 disabled:opacity-60",
                  children: addNotice.isPending ? "Adding..." : "Save Notice"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "notices.add.cancel_button",
                  onClick: () => setAddOpen(false),
                  className: "px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    editNotice && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "oklch(var(--foreground) / 0.4)" },
        "data-ocid": "notices.edit.dialog",
        "aria-labelledby": "edit-notice-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-elevated w-full max-w-md border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-warm p-4 rounded-t-2xl relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setEditNotice(null),
                className: "absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-smooth",
                "aria-label": "Close dialog",
                "data-ocid": "notices.edit.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                id: "edit-notice-heading",
                className: "font-display text-lg font-semibold text-primary-foreground",
                children: "Edit Notice"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-notice-title",
                  className: "text-sm font-medium text-foreground block mb-1.5",
                  children: "Title"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "edit-notice-title",
                  type: "text",
                  "data-ocid": "notices.edit_title_input",
                  value: form.title,
                  onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
                  required: true,
                  className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-notice-content",
                  className: "text-sm font-medium text-foreground block mb-1.5",
                  children: "Content"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "edit-notice-content",
                  "data-ocid": "notices.edit_content_input",
                  value: form.content,
                  onChange: (e) => setForm((p) => ({ ...p, content: e.target.value })),
                  required: true,
                  rows: 4,
                  className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  "data-ocid": "notices.edit.submit_button",
                  disabled: updateNotice.isPending,
                  className: "flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-smooth hover:opacity-90 disabled:opacity-60",
                  children: updateNotice.isPending ? "Updating..." : "Update Notice"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "notices.edit.cancel_button",
                  onClick: () => setEditNotice(null),
                  className: "px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth",
                  children: "Cancel"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: { background: "oklch(var(--foreground) / 0.4)" },
        "data-ocid": "notices.delete.dialog",
        "aria-labelledby": "delete-notice-heading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl shadow-elevated w-full max-w-sm border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 22, className: "text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              id: "delete-notice-heading",
              className: "font-display text-lg font-semibold text-foreground text-center",
              children: "Delete Notice"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm text-center mt-2", children: [
            "Are you sure you want to delete",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              "“",
              deleteTarget.title,
              "”"
            ] }),
            "? This action cannot be undone."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "notices.delete.confirm_button",
                onClick: handleDelete,
                disabled: deleteNotice.isPending,
                className: "flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-lg text-sm font-medium transition-smooth hover:opacity-90 disabled:opacity-60",
                children: deleteNotice.isPending ? "Deleting..." : "Delete"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "notices.delete.cancel_button",
                onClick: () => setDeleteTarget(null),
                className: "flex-1 px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth",
                children: "Cancel"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  NoticesPage
};
