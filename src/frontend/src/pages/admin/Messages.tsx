import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCheck,
  Megaphone,
  MessageCircle,
  Send,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import {
  useAllMessages,
  useAllStudents,
  useMarkMessageRead,
  useSendMessage,
} from "../../hooks/useLibrary";
import { SenderRole } from "../../types";
import type { Message } from "../../types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
}

/** Group messages by student ID, excluding broadcast "all" recipient */
function useStudentThreads(messages: Message[]) {
  return useMemo(() => {
    const map = new Map<string, { msgs: Message[]; unread: number }>();
    for (const m of messages) {
      const sid =
        m.senderRole === SenderRole.student ? m.senderId : m.recipientId;
      if (sid === "admin" || sid === "all" || !sid) continue;
      if (!map.has(sid)) map.set(sid, { msgs: [], unread: 0 });
      const entry = map.get(sid)!;
      entry.msgs.push(m);
      if (!m.isRead && m.senderRole === SenderRole.student) entry.unread++;
    }
    // Sort threads by most recent message
    return Array.from(map.entries()).sort((a, b) => {
      const aLast = a[1].msgs.at(-1)?.timestamp ?? BigInt(0);
      const bLast = b[1].msgs.at(-1)?.timestamp ?? BigInt(0);
      return Number(bLast - aLast);
    });
  }, [messages]);
}

// ── MessageBubble ─────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isAdmin = msg.senderRole === SenderRole.admin;

  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
      {!isAdmin && (
        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold mr-2 flex-shrink-0 mt-1 border border-border">
          {msg.senderName.charAt(0).toUpperCase()}
        </div>
      )}
      <div
        className={`max-w-[72%] rounded-2xl px-4 py-2.5 ${
          isAdmin
            ? "gradient-warm text-primary-foreground rounded-br-sm shadow-warm"
            : "bg-secondary text-secondary-foreground rounded-bl-sm border border-border"
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{msg.content}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`text-[10px] ${isAdmin ? "opacity-70" : "text-muted-foreground"}`}
          >
            {formatTime(msg.timestamp)}
          </span>
          {isAdmin && (
            <CheckCheck
              size={10}
              className={msg.isRead ? "opacity-100" : "opacity-50"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function AdminMessages() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdmin, navigate]);

  const { data: messages, isLoading } = useAllMessages();
  const { data: students } = useAllStudents();
  const sendMessage = useSendMessage();
  const markRead = useMarkMessageRead();

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [broadcastText, setBroadcastText] = useState("");
  const [tab, setTab] = useState<"conversations" | "broadcast">(
    "conversations",
  );

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const threads = useStudentThreads(messages ?? []);

  // Auto-select first thread
  useEffect(() => {
    if (!selectedStudent && threads.length > 0) {
      setSelectedStudent(threads[0][0]);
    }
  }, [threads, selectedStudent]);

  // Scroll to bottom when thread or messages change
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional trigger
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedStudent, messages?.length]);

  // Mark all unread messages read when opening a thread
  const markReadMutate = markRead.mutate;
  useEffect(() => {
    if (!selectedStudent || !messages) return;
    const unreadIds = messages.filter(
      (m) =>
        !m.isRead &&
        m.senderRole === SenderRole.student &&
        m.senderId === selectedStudent,
    );
    for (const m of unreadIds) {
      markReadMutate(m.id);
    }
  }, [selectedStudent, messages, markReadMutate]);

  const selectedThread = useMemo(
    () =>
      threads
        .find(([sid]) => sid === selectedStudent)?.[1]
        ?.msgs.sort((a, b) => Number(a.timestamp - b.timestamp)) ?? [],
    [threads, selectedStudent],
  );

  const studentNameFor = (sid: string) => {
    const s = students?.find((st) => st.studentId === sid);
    return s?.name ?? sid;
  };

  const totalUnread = useMemo(
    () => threads.reduce((acc, [, v]) => acc + v.unread, 0),
    [threads],
  );

  // ── Send Handlers ──────────────────────────────────────────────────────────

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || !selectedStudent) return;
    try {
      await sendMessage.mutateAsync({
        senderId: "admin",
        senderName: "Library Admin",
        role: SenderRole.admin,
        recipientId: selectedStudent,
        content: text,
      });
      setChatInput("");
      inputRef.current?.focus();
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = broadcastText.trim();
    if (!text) return;
    try {
      await sendMessage.mutateAsync({
        senderId: "admin",
        senderName: "Library Admin",
        role: SenderRole.admin,
        recipientId: "all",
        content: text,
      });
      setBroadcastText("");
      toast.success("Broadcast sent to all students!");
    } catch {
      toast.error("Failed to send broadcast");
    }
  };

  if (!isAdmin) return null;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="admin.messages.page"
    >
      {/* Page header */}
      <div className="gradient-warm px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-primary-foreground font-display flex items-center gap-2">
            <MessageCircle size={20} />
            Messages
          </h1>
          <p className="text-sm text-primary-foreground/70 mt-0.5">
            Chat with students and send announcements
          </p>
        </div>
        {totalUnread > 0 && (
          <Badge
            className="bg-destructive text-destructive-foreground font-semibold"
            data-ocid="messages.unread_badge"
          >
            {totalUnread} unread
          </Badge>
        )}
      </div>

      {/* Tab bar */}
      <div className="bg-card border-b border-border px-4 flex gap-1 pt-2 flex-shrink-0">
        <button
          type="button"
          data-ocid="messages.conversations.tab"
          onClick={() => setTab("conversations")}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg transition-smooth border-b-2 flex items-center gap-1.5 ${
            tab === "conversations"
              ? "border-primary text-primary bg-background"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageCircle size={14} />
          Conversations
          {totalUnread > 0 && tab !== "conversations" && (
            <span className="ml-1 bg-destructive text-destructive-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {totalUnread}
            </span>
          )}
        </button>
        <button
          type="button"
          data-ocid="messages.broadcast.tab"
          onClick={() => setTab("broadcast")}
          className={`px-5 py-2 text-sm font-medium rounded-t-lg transition-smooth border-b-2 flex items-center gap-1.5 ${
            tab === "broadcast"
              ? "border-primary text-primary bg-background"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Megaphone size={14} />
          Broadcast
        </button>
      </div>

      {/* ── Conversations Tab ──────────────────────────────────────────────── */}
      {tab === "conversations" ? (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-4 overflow-hidden">
          <div className="grid lg:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-210px)]">
            {/* Left sidebar — student threads */}
            <Card className="border border-border shadow-warm flex flex-col overflow-hidden">
              <div className="p-3 border-b border-border bg-muted/40 flex-shrink-0">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Users size={12} />
                  Student Threads
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                  <div
                    className="p-3 space-y-2"
                    data-ocid="messages.threads.loading_state"
                  >
                    {["s1", "s2", "s3", "s4"].map((k) => (
                      <Skeleton key={k} className="h-16 w-full rounded-lg" />
                    ))}
                  </div>
                ) : threads.length === 0 ? (
                  <div
                    className="p-8 text-center"
                    data-ocid="messages.threads.empty_state"
                  >
                    <Users
                      size={32}
                      className="mx-auto mb-2 text-muted-foreground/25"
                    />
                    <p className="text-sm text-muted-foreground">
                      No student messages yet
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">
                      Messages from students will appear here
                    </p>
                  </div>
                ) : (
                  threads.map(([sid, { msgs, unread }], i) => {
                    const lastMsg = msgs.sort((a, b) =>
                      Number(b.timestamp - a.timestamp),
                    )[0];
                    const isSelected = selectedStudent === sid;
                    return (
                      <button
                        key={sid}
                        type="button"
                        data-ocid={`messages.thread.item.${i + 1}`}
                        onClick={() => setSelectedStudent(sid)}
                        className={`w-full text-left px-3 py-3 border-b border-border/50 last:border-0 transition-smooth flex items-start gap-3 ${
                          isSelected
                            ? "bg-primary/8 border-l-[3px] border-l-primary"
                            : "hover:bg-muted/40 border-l-[3px] border-l-transparent"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                            isSelected
                              ? "gradient-warm text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {studentNameFor(sid).charAt(0).toUpperCase()}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p
                              className={`text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-foreground"}`}
                            >
                              {studentNameFor(sid)}
                            </p>
                            {unread > 0 && (
                              <Badge
                                className="bg-destructive text-destructive-foreground text-[10px] h-4 min-w-[16px] px-1 flex-shrink-0"
                                data-ocid={`messages.thread.unread.${i + 1}`}
                              >
                                {unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5 leading-relaxed">
                            {lastMsg
                              ? `${lastMsg.senderRole === SenderRole.admin ? "You: " : ""}${lastMsg.content}`
                              : "No messages"}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </Card>

            {/* Right panel — chat window */}
            <Card className="border border-border shadow-warm flex flex-col overflow-hidden">
              {/* Chat header */}
              <div className="p-3 border-b border-border bg-muted/30 flex items-center gap-3 flex-shrink-0">
                {selectedStudent ? (
                  <>
                    <div className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {studentNameFor(selectedStudent).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {studentNameFor(selectedStudent)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Student ID: {selectedStudent}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No student selected
                  </p>
                )}
              </div>

              {/* Messages area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {!selectedStudent ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MessageCircle
                        size={44}
                        className="mx-auto mb-3 opacity-20"
                      />
                      <p className="text-sm font-medium">
                        Select a conversation
                      </p>
                      <p className="text-xs mt-1 opacity-70">
                        Choose a student from the sidebar to view messages
                      </p>
                    </div>
                  </div>
                ) : selectedThread.length === 0 ? (
                  <div
                    className="h-full flex items-center justify-center"
                    data-ocid="messages.chat.empty_state"
                  >
                    <div className="text-center text-muted-foreground">
                      <MessageCircle
                        size={36}
                        className="mx-auto mb-2 opacity-20"
                      />
                      <p className="text-sm">
                        No messages with this student yet
                      </p>
                      <p className="text-xs mt-1 opacity-70">
                        Send the first message below
                      </p>
                    </div>
                  </div>
                ) : (
                  selectedThread.map((msg) => (
                    <MessageBubble key={String(msg.id)} msg={msg} />
                  ))
                )}
                <div ref={chatEndRef} />
              </CardContent>

              {/* Chat input */}
              {selectedStudent && (
                <form
                  onSubmit={handleSendChat}
                  className="p-3 border-t border-border flex items-end gap-2 flex-shrink-0 bg-card"
                >
                  <textarea
                    ref={inputRef}
                    data-ocid="messages.chat_input"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a reply..."
                    rows={2}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none min-w-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChat(e);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    data-ocid="messages.chat_send_button"
                    disabled={sendMessage.isPending || !chatInput.trim()}
                    className="gradient-warm text-primary-foreground p-3 rounded-xl flex items-center justify-center transition-smooth hover:opacity-90 disabled:opacity-50 flex-shrink-0 shadow-warm"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </Card>
          </div>
        </div>
      ) : (
        /* ── Broadcast Tab ──────────────────────────────────────────────────── */
        <div
          className="flex-1 max-w-2xl w-full mx-auto px-4 py-6"
          data-ocid="messages.broadcast.section"
        >
          {/* Compose card */}
          <Card className="border border-border shadow-warm overflow-hidden">
            <div className="p-4 border-b border-border gradient-warm">
              <h3 className="font-display font-semibold text-primary-foreground flex items-center gap-2 text-base">
                <Megaphone size={16} />
                Send Announcement to All Students
              </h3>
              <p className="text-xs text-primary-foreground/70 mt-0.5">
                This message will be delivered to every registered student
              </p>
            </div>
            <CardContent className="p-5">
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div>
                  <label
                    htmlFor="broadcast-msg"
                    className="text-sm font-medium text-foreground block mb-2"
                  >
                    Announcement Message
                  </label>
                  <textarea
                    id="broadcast-msg"
                    data-ocid="messages.broadcast_textarea"
                    value={broadcastText}
                    onChange={(e) => setBroadcastText(e.target.value)}
                    placeholder="Write your announcement here... (e.g. Library will be closed on Sunday for maintenance)"
                    rows={5}
                    required
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {broadcastText.length} characters
                  </p>
                </div>
                <button
                  type="submit"
                  data-ocid="messages.broadcast_send_button"
                  disabled={sendMessage.isPending || !broadcastText.trim()}
                  className="w-full gradient-warm text-primary-foreground py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-smooth hover:opacity-90 disabled:opacity-60 shadow-warm"
                >
                  <Megaphone size={16} />
                  {sendMessage.isPending
                    ? "Sending..."
                    : "Send to All Students"}
                </button>
                {sendMessage.isPending && (
                  <div
                    className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
                    data-ocid="messages.broadcast.loading_state"
                  >
                    <div className="w-3 h-3 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                    Sending announcement...
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Recent broadcasts */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Megaphone size={14} className="text-muted-foreground" />
              Recent Broadcasts
            </h4>
            <div className="space-y-2">
              {(messages ?? [])
                .filter(
                  (m) =>
                    m.recipientId === "all" &&
                    m.senderRole === SenderRole.admin,
                )
                .sort((a, b) => Number(b.timestamp - a.timestamp))
                .slice(0, 5)
                .map((m, i) => (
                  <div
                    key={String(m.id)}
                    data-ocid={`messages.broadcast.item.${i + 1}`}
                    className="bg-card border border-border rounded-lg p-3.5"
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      {m.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {formatTime(m.timestamp)}
                    </p>
                  </div>
                ))}
              {!(messages ?? []).some(
                (m) =>
                  m.recipientId === "all" && m.senderRole === SenderRole.admin,
              ) && (
                <div
                  className="text-center py-8 bg-card border border-border rounded-lg"
                  data-ocid="messages.broadcast.empty_state"
                >
                  <Megaphone
                    size={28}
                    className="mx-auto mb-2 text-muted-foreground/25"
                  />
                  <p className="text-sm text-muted-foreground">
                    No announcements sent yet
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Your broadcasts will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
