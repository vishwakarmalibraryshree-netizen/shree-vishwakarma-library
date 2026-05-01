import { c as createLucideIcon, u as useAuth, b as useNavigate, r as reactExports, S as SenderRole, j as jsxRuntimeExports, M as MessageCircle, U as Users, a as ue } from "./index-BxMJF1mf.js";
import { B as Badge } from "./badge-CWeIkufx.js";
import { C as Card, c as CardContent } from "./card-C8GH-zEu.js";
import { S as Skeleton } from "./skeleton-CPVH6K9v.js";
import { k as useAllMessages, f as useAllStudents, l as useSendMessage, m as useMarkMessageRead } from "./types-CeHNxeEG.js";
import "./index-D9SYxO04.js";
import "./utils-2v2HxlWs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function formatTime(ts) {
  const d = new Date(Number(ts) / 1e6);
  return d.toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" });
}
function useStudentThreads(messages) {
  return reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const m of messages) {
      const sid = m.senderRole === SenderRole.student ? m.senderId : m.recipientId;
      if (sid === "admin" || sid === "all" || !sid) continue;
      if (!map.has(sid)) map.set(sid, { msgs: [], unread: 0 });
      const entry = map.get(sid);
      entry.msgs.push(m);
      if (!m.isRead && m.senderRole === SenderRole.student) entry.unread++;
    }
    return Array.from(map.entries()).sort((a, b) => {
      var _a, _b;
      const aLast = ((_a = a[1].msgs.at(-1)) == null ? void 0 : _a.timestamp) ?? BigInt(0);
      const bLast = ((_b = b[1].msgs.at(-1)) == null ? void 0 : _b.timestamp) ?? BigInt(0);
      return Number(bLast - aLast);
    });
  }, [messages]);
}
function MessageBubble({ msg }) {
  const isAdmin = msg.senderRole === SenderRole.admin;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex ${isAdmin ? "justify-end" : "justify-start"}`, children: [
    !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-bold mr-2 flex-shrink-0 mt-1 border border-border", children: msg.senderName.charAt(0).toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `max-w-[72%] rounded-2xl px-4 py-2.5 ${isAdmin ? "gradient-warm text-primary-foreground rounded-br-sm shadow-warm" : "bg-secondary text-secondary-foreground rounded-bl-sm border border-border"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed break-words", children: msg.content }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] ${isAdmin ? "opacity-70" : "text-muted-foreground"}`,
                children: formatTime(msg.timestamp)
              }
            ),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
              CheckCheck,
              {
                size: 10,
                className: msg.isRead ? "opacity-100" : "opacity-50"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function AdminMessages() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdmin, navigate]);
  const { data: messages, isLoading } = useAllMessages();
  const { data: students } = useAllStudents();
  const sendMessage = useSendMessage();
  const markRead = useMarkMessageRead();
  const [selectedStudent, setSelectedStudent] = reactExports.useState(null);
  const [chatInput, setChatInput] = reactExports.useState("");
  const [broadcastText, setBroadcastText] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState(
    "conversations"
  );
  const chatEndRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const threads = useStudentThreads(messages ?? []);
  reactExports.useEffect(() => {
    if (!selectedStudent && threads.length > 0) {
      setSelectedStudent(threads[0][0]);
    }
  }, [threads, selectedStudent]);
  reactExports.useEffect(() => {
    var _a;
    (_a = chatEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [selectedStudent, messages == null ? void 0 : messages.length]);
  const markReadMutate = markRead.mutate;
  reactExports.useEffect(() => {
    if (!selectedStudent || !messages) return;
    const unreadIds = messages.filter(
      (m) => !m.isRead && m.senderRole === SenderRole.student && m.senderId === selectedStudent
    );
    for (const m of unreadIds) {
      markReadMutate(m.id);
    }
  }, [selectedStudent, messages, markReadMutate]);
  const selectedThread = reactExports.useMemo(
    () => {
      var _a, _b;
      return ((_b = (_a = threads.find(([sid]) => sid === selectedStudent)) == null ? void 0 : _a[1]) == null ? void 0 : _b.msgs.sort((a, b) => Number(a.timestamp - b.timestamp))) ?? [];
    },
    [threads, selectedStudent]
  );
  const studentNameFor = (sid) => {
    const s = students == null ? void 0 : students.find((st) => st.studentId === sid);
    return (s == null ? void 0 : s.name) ?? sid;
  };
  const totalUnread = reactExports.useMemo(
    () => threads.reduce((acc, [, v]) => acc + v.unread, 0),
    [threads]
  );
  const handleSendChat = async (e) => {
    var _a;
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || !selectedStudent) return;
    try {
      await sendMessage.mutateAsync({
        senderId: "admin",
        senderName: "Library Admin",
        role: SenderRole.admin,
        recipientId: selectedStudent,
        content: text
      });
      setChatInput("");
      (_a = inputRef.current) == null ? void 0 : _a.focus();
    } catch {
      ue.error("Failed to send message");
    }
  };
  const handleBroadcast = async (e) => {
    e.preventDefault();
    const text = broadcastText.trim();
    if (!text) return;
    try {
      await sendMessage.mutateAsync({
        senderId: "admin",
        senderName: "Library Admin",
        role: SenderRole.admin,
        recipientId: "all",
        content: text
      });
      setBroadcastText("");
      ue.success("Broadcast sent to all students!");
    } catch {
      ue.error("Failed to send broadcast");
    }
  };
  if (!isAdmin) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col",
      "data-ocid": "admin.messages.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-warm px-6 py-4 flex items-center justify-between flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-primary-foreground font-display flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 20 }),
              "Messages"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-primary-foreground/70 mt-0.5", children: "Chat with students and send announcements" })
          ] }),
          totalUnread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: "bg-destructive text-destructive-foreground font-semibold",
              "data-ocid": "messages.unread_badge",
              children: [
                totalUnread,
                " unread"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-border px-4 flex gap-1 pt-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "messages.conversations.tab",
              onClick: () => setTab("conversations"),
              className: `px-5 py-2 text-sm font-medium rounded-t-lg transition-smooth border-b-2 flex items-center gap-1.5 ${tab === "conversations" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 14 }),
                "Conversations",
                totalUnread > 0 && tab !== "conversations" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-destructive text-destructive-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center", children: totalUnread })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "messages.broadcast.tab",
              onClick: () => setTab("broadcast"),
              className: `px-5 py-2 text-sm font-medium rounded-t-lg transition-smooth border-b-2 flex items-center gap-1.5 ${tab === "broadcast" ? "border-primary text-primary bg-background" : "border-transparent text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 14 }),
                "Broadcast"
              ]
            }
          )
        ] }),
        tab === "conversations" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-7xl w-full mx-auto px-4 py-4 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[300px_1fr] gap-4 h-[calc(100vh-210px)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-warm flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b border-border bg-muted/40 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
              "Student Threads"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-3 space-y-2",
                "data-ocid": "messages.threads.loading_state",
                children: ["s1", "s2", "s3", "s4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, k))
              }
            ) : threads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-8 text-center",
                "data-ocid": "messages.threads.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Users,
                    {
                      size: 32,
                      className: "mx-auto mb-2 text-muted-foreground/25"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No student messages yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Messages from students will appear here" })
                ]
              }
            ) : threads.map(([sid, { msgs, unread }], i) => {
              const lastMsg = msgs.sort(
                (a, b) => Number(b.timestamp - a.timestamp)
              )[0];
              const isSelected = selectedStudent === sid;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `messages.thread.item.${i + 1}`,
                  onClick: () => setSelectedStudent(sid),
                  className: `w-full text-left px-3 py-3 border-b border-border/50 last:border-0 transition-smooth flex items-start gap-3 ${isSelected ? "bg-primary/8 border-l-[3px] border-l-primary" : "hover:bg-muted/40 border-l-[3px] border-l-transparent"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${isSelected ? "gradient-warm text-primary-foreground" : "bg-primary/10 text-primary"}`,
                        children: studentNameFor(sid).charAt(0).toUpperCase()
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: `text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-foreground"}`,
                            children: studentNameFor(sid)
                          }
                        ),
                        unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            className: "bg-destructive text-destructive-foreground text-[10px] h-4 min-w-[16px] px-1 flex-shrink-0",
                            "data-ocid": `messages.thread.unread.${i + 1}`,
                            children: unread
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate mt-0.5 leading-relaxed", children: lastMsg ? `${lastMsg.senderRole === SenderRole.admin ? "You: " : ""}${lastMsg.content}` : "No messages" })
                    ] })
                  ]
                },
                sid
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-warm flex flex-col overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b border-border bg-muted/30 flex items-center gap-3 flex-shrink-0", children: selectedStudent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full gradient-warm flex items-center justify-center text-primary-foreground font-bold text-sm", children: studentNameFor(selectedStudent).charAt(0).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: studentNameFor(selectedStudent) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Student ID: ",
                  selectedStudent
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground italic", children: "No student selected" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
              !selectedStudent ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MessageCircle,
                  {
                    size: 44,
                    className: "mx-auto mb-3 opacity-20"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Select a conversation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Choose a student from the sidebar to view messages" })
              ] }) }) : selectedThread.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full flex items-center justify-center",
                  "data-ocid": "messages.chat.empty_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MessageCircle,
                      {
                        size: 36,
                        className: "mx-auto mb-2 opacity-20"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No messages with this student yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Send the first message below" })
                  ] })
                }
              ) : selectedThread.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBubble, { msg }, String(msg.id))),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: chatEndRef })
            ] }),
            selectedStudent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSendChat,
                className: "p-3 border-t border-border flex items-end gap-2 flex-shrink-0 bg-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      ref: inputRef,
                      "data-ocid": "messages.chat_input",
                      value: chatInput,
                      onChange: (e) => setChatInput(e.target.value),
                      placeholder: "Type a reply...",
                      rows: 2,
                      className: "flex-1 px-3 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none min-w-0",
                      onKeyDown: (e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendChat(e);
                        }
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      "data-ocid": "messages.chat_send_button",
                      disabled: sendMessage.isPending || !chatInput.trim(),
                      className: "gradient-warm text-primary-foreground p-3 rounded-xl flex items-center justify-center transition-smooth hover:opacity-90 disabled:opacity-50 flex-shrink-0 shadow-warm",
                      "aria-label": "Send message",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 })
                    }
                  )
                ]
              }
            )
          ] })
        ] }) }) : (
          /* ── Broadcast Tab ──────────────────────────────────────────────────── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 max-w-2xl w-full mx-auto px-4 py-6",
              "data-ocid": "messages.broadcast.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-warm overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border gradient-warm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-primary-foreground flex items-center gap-2 text-base", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 16 }),
                      "Send Announcement to All Students"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary-foreground/70 mt-0.5", children: "This message will be delivered to every registered student" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleBroadcast, className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "broadcast-msg",
                          className: "text-sm font-medium text-foreground block mb-2",
                          children: "Announcement Message"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "broadcast-msg",
                          "data-ocid": "messages.broadcast_textarea",
                          value: broadcastText,
                          onChange: (e) => setBroadcastText(e.target.value),
                          placeholder: "Write your announcement here... (e.g. Library will be closed on Sunday for maintenance)",
                          rows: 5,
                          required: true,
                          className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                        broadcastText.length,
                        " characters"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "submit",
                        "data-ocid": "messages.broadcast_send_button",
                        disabled: sendMessage.isPending || !broadcastText.trim(),
                        className: "w-full gradient-warm text-primary-foreground py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-smooth hover:opacity-90 disabled:opacity-60 shadow-warm",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 16 }),
                          sendMessage.isPending ? "Sending..." : "Send to All Students"
                        ]
                      }
                    ),
                    sendMessage.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-center gap-2 text-xs text-muted-foreground",
                        "data-ocid": "messages.broadcast.loading_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 border-2 border-primary/40 border-t-primary rounded-full animate-spin" }),
                          "Sending announcement..."
                        ]
                      }
                    )
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 14, className: "text-muted-foreground" }),
                    "Recent Broadcasts"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    (messages ?? []).filter(
                      (m) => m.recipientId === "all" && m.senderRole === SenderRole.admin
                    ).sort((a, b) => Number(b.timestamp - a.timestamp)).slice(0, 5).map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": `messages.broadcast.item.${i + 1}`,
                        className: "bg-card border border-border rounded-lg p-3.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: m.content }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: formatTime(m.timestamp) })
                        ]
                      },
                      String(m.id)
                    )),
                    !(messages ?? []).some(
                      (m) => m.recipientId === "all" && m.senderRole === SenderRole.admin
                    ) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-center py-8 bg-card border border-border rounded-lg",
                        "data-ocid": "messages.broadcast.empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Megaphone,
                            {
                              size: 28,
                              className: "mx-auto mb-2 text-muted-foreground/25"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No announcements sent yet" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: "Your broadcasts will appear here" })
                        ]
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        )
      ]
    }
  );
}
export {
  AdminMessages
};
