import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Calendar, Edit, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import {
  useActiveNotices,
  useAddNotice,
  useDeleteNotice,
  useUpdateNotice,
} from "../hooks/useLibrary";
import type { Notice } from "../types";

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
  "Dec",
];

function formatDate(ts: bigint): string {
  const d = new Date(Number(ts));
  const day = String(d.getDate()).padStart(2, "0");
  const mon = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${mon} ${year}`;
}

export function NoticesPage() {
  const { data: notices, isLoading } = useActiveNotices();
  const { isAdmin } = useAuth();
  const addNotice = useAddNotice();
  const updateNotice = useUpdateNotice();
  const deleteNotice = useDeleteNotice();

  const [addOpen, setAddOpen] = useState(false);
  const [editNotice, setEditNotice] = useState<Notice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);
  const [form, setForm] = useState({ title: "", content: "" });

  const openAdd = () => {
    setForm({ title: "", content: "" });
    setAddOpen(true);
  };

  const openEdit = (n: Notice) => {
    setEditNotice(n);
    setForm({ title: n.title, content: n.content });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addNotice.mutateAsync(form);
      setAddOpen(false);
      toast.success("Notice added successfully!");
    } catch {
      toast.error("Failed to add notice. Please try again.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNotice) return;
    try {
      await updateNotice.mutateAsync({ ...editNotice, ...form });
      setEditNotice(null);
      toast.success("Notice updated successfully!");
    } catch {
      toast.error("Failed to update notice. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteNotice.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Notice deleted successfully!");
    } catch {
      toast.error("Failed to delete notice. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8" data-ocid="notices.page">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-primary flex items-center gap-2">
              <Bell size={32} className="text-accent" />
              Notice Board
            </h1>
            <p className="text-muted-foreground mt-1">
              Library notices and important announcements
            </p>
          </div>
          {isAdmin && (
            <button
              type="button"
              data-ocid="notices.add_button"
              onClick={openAdd}
              className="flex items-center gap-2 gradient-warm text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90"
            >
              <Plus size={16} />
              Add Notice
            </button>
          )}
        </div>

        {/* Notice List */}
        {isLoading ? (
          <div className="space-y-4" data-ocid="notices.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        ) : notices && notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map((notice, i) => (
              <div
                key={String(notice.id)}
                data-ocid={`notices.item.${i + 1}`}
                className="bg-card border border-border rounded-xl p-5 shadow-warm hover:shadow-elevated transition-smooth"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-foreground text-base leading-snug">
                        {notice.title}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
                        {notice.content}
                      </p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground/70">
                        <Calendar size={12} />
                        <span>{formatDate(notice.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        type="button"
                        data-ocid={`notices.edit_button.${i + 1}`}
                        onClick={() => openEdit(notice)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-smooth"
                        aria-label="Edit notice"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        data-ocid={`notices.delete_button.${i + 1}`}
                        onClick={() => setDeleteTarget(notice)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-smooth"
                        aria-label="Delete notice"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div data-ocid="notices.empty_state" className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell size={36} className="text-muted-foreground/40" />
            </div>
            <h3 className="font-display text-xl font-semibold text-muted-foreground">
              No notices yet
            </h3>
            <p className="text-muted-foreground/60 text-sm mt-1">
              Library notices and announcements will appear here
            </p>
          </div>
        )}
      </div>

      {/* Add Notice Modal */}
      {addOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(var(--foreground) / 0.4)" }}
          data-ocid="notices.add.dialog"
          aria-labelledby="add-notice-heading"
        >
          <div className="bg-card rounded-2xl shadow-elevated w-full max-w-md border border-border">
            <div className="gradient-warm p-4 rounded-t-2xl relative">
              <button
                type="button"
                onClick={() => setAddOpen(false)}
                className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-smooth"
                aria-label="Close dialog"
                data-ocid="notices.add.close_button"
              >
                <X size={18} />
              </button>
              <h3
                id="add-notice-heading"
                className="font-display text-lg font-semibold text-primary-foreground"
              >
                Add New Notice
              </h3>
            </div>
            <form onSubmit={handleAdd} className="p-5 space-y-4">
              <div>
                <label
                  htmlFor="add-notice-title"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  Title
                </label>
                <input
                  id="add-notice-title"
                  type="text"
                  data-ocid="notices.title_input"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Enter notice title"
                  required
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
              </div>
              <div>
                <label
                  htmlFor="add-notice-content"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  Content
                </label>
                <textarea
                  id="add-notice-content"
                  data-ocid="notices.content_input"
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  placeholder="Write the full notice content here..."
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  data-ocid="notices.add.submit_button"
                  disabled={addNotice.isPending}
                  className="flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-smooth hover:opacity-90 disabled:opacity-60"
                >
                  {addNotice.isPending ? "Adding..." : "Save Notice"}
                </button>
                <button
                  type="button"
                  data-ocid="notices.add.cancel_button"
                  onClick={() => setAddOpen(false)}
                  className="px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notice Modal */}
      {editNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(var(--foreground) / 0.4)" }}
          data-ocid="notices.edit.dialog"
          aria-labelledby="edit-notice-heading"
        >
          <div className="bg-card rounded-2xl shadow-elevated w-full max-w-md border border-border">
            <div className="gradient-warm p-4 rounded-t-2xl relative">
              <button
                type="button"
                onClick={() => setEditNotice(null)}
                className="absolute top-4 right-4 text-primary-foreground/70 hover:text-primary-foreground transition-smooth"
                aria-label="Close dialog"
                data-ocid="notices.edit.close_button"
              >
                <X size={18} />
              </button>
              <h3
                id="edit-notice-heading"
                className="font-display text-lg font-semibold text-primary-foreground"
              >
                Edit Notice
              </h3>
            </div>
            <form onSubmit={handleUpdate} className="p-5 space-y-4">
              <div>
                <label
                  htmlFor="edit-notice-title"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  Title
                </label>
                <input
                  id="edit-notice-title"
                  type="text"
                  data-ocid="notices.edit_title_input"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                />
              </div>
              <div>
                <label
                  htmlFor="edit-notice-content"
                  className="text-sm font-medium text-foreground block mb-1.5"
                >
                  Content
                </label>
                <textarea
                  id="edit-notice-content"
                  data-ocid="notices.edit_content_input"
                  value={form.content}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, content: e.target.value }))
                  }
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  data-ocid="notices.edit.submit_button"
                  disabled={updateNotice.isPending}
                  className="flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-smooth hover:opacity-90 disabled:opacity-60"
                >
                  {updateNotice.isPending ? "Updating..." : "Update Notice"}
                </button>
                <button
                  type="button"
                  data-ocid="notices.edit.cancel_button"
                  onClick={() => setEditNotice(null)}
                  className="px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "oklch(var(--foreground) / 0.4)" }}
          data-ocid="notices.delete.dialog"
          aria-labelledby="delete-notice-heading"
        >
          <div className="bg-card rounded-2xl shadow-elevated w-full max-w-sm border border-border">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={22} className="text-destructive" />
              </div>
              <h3
                id="delete-notice-heading"
                className="font-display text-lg font-semibold text-foreground text-center"
              >
                Delete Notice
              </h3>
              <p className="text-muted-foreground text-sm text-center mt-2">
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{deleteTarget.title}&rdquo;
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  data-ocid="notices.delete.confirm_button"
                  onClick={handleDelete}
                  disabled={deleteNotice.isPending}
                  className="flex-1 bg-destructive text-destructive-foreground py-2.5 rounded-lg text-sm font-medium transition-smooth hover:opacity-90 disabled:opacity-60"
                >
                  {deleteNotice.isPending ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  data-ocid="notices.delete.cancel_button"
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
