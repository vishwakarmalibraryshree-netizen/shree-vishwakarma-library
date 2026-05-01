import { c as createLucideIcon, j as jsxRuntimeExports, e as Settings, r as reactExports, g as useUpdateAdminCredentials, h as Lock, f as BookOpen, a as ue } from "./index-BxMJF1mf.js";
import { B as Badge } from "./badge-CWeIkufx.js";
import { S as Skeleton } from "./skeleton-CPVH6K9v.js";
import { n as useSettings, o as useUpdateSettings, p as useInitializeSeats, q as useAllQuotes, r as useAddQuote, s as useDeleteQuote } from "./types-CeHNxeEG.js";
import { S as Shield } from "./shield-DmsgxkMK.js";
import { P as Plus } from "./plus-CLtDvuzT.js";
import { T as Trash2 } from "./trash-2-B7ys0dFa.js";
import "./index-D9SYxO04.js";
import "./utils-2v2HxlWs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function ConfirmDialog({
  message,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
      "data-ocid": "settings.confirm.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl shadow-elevated max-w-sm w-full p-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              viewBox: "0 0 20 20",
              fill: "currentColor",
              className: "w-5 h-5 text-destructive",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z",
                  clipRule: "evenodd"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Confirm Action" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: message })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              "data-ocid": "settings.confirm.cancel_button",
              className: "px-4 py-2 border border-border text-muted-foreground rounded-lg text-sm hover:bg-muted transition-smooth",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onConfirm,
              "data-ocid": "settings.confirm.confirm_button",
              className: "px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-smooth",
              children: "Confirm"
            }
          )
        ] })
      ] })
    }
  );
}
const inputCls = "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth placeholder:text-muted-foreground";
function SectionHeader({
  icon: Icon,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "text-primary-foreground" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-primary font-semibold text-lg leading-tight", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: subtitle })
    ] })
  ] });
}
function LibrarySettingsSection() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const initSeats = useInitializeSeats();
  const [form, setForm] = reactExports.useState({
    libraryName: "Shree Vishwakarma Library",
    address: "",
    phone: "",
    openingHours: "6 AM – 11 PM",
    facilities: [],
    totalSeats: BigInt(0)
  });
  const [facilitiesStr, setFacilitiesStr] = reactExports.useState("");
  const [seatCount, setSeatCount] = reactExports.useState("");
  const [pendingSeatCount, setPendingSeatCount] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (settings) {
      setForm(settings);
      setFacilitiesStr(settings.facilities.join(", "));
      setSeatCount(String(settings.totalSeats));
    }
  }, [settings]);
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const facArr = facilitiesStr.split(",").map((f) => f.trim()).filter(Boolean);
      await updateSettings.mutateAsync({ ...form, facilities: facArr });
      ue.success("Library settings saved successfully!");
    } catch {
      ue.error("Failed to save settings. Please try again.");
    }
  };
  const handleInitSeats = () => {
    const n = Number.parseInt(seatCount, 10);
    if (!n || n < 1 || n > 500) {
      ue.error("Please enter a valid number between 1 and 500");
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
      ue.success(`${n} seats initialized successfully!`);
    } catch {
      ue.error("Failed to initialize seats. Please try again.");
    }
  };
  if (isLoading)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48 mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }, i)) })
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl shadow-warm overflow-hidden",
      "data-ocid": "settings.library_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full gradient-warm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: Settings,
              title: "Library Settings",
              subtitle: "Update library name, address, and facilities"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "lib-name",
                    children: "Library Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lib-name",
                    type: "text",
                    "data-ocid": "settings.library_name_input",
                    value: form.libraryName,
                    onChange: (e) => setForm((p) => ({ ...p, libraryName: e.target.value })),
                    className: inputCls,
                    placeholder: "Shree Vishwakarma Library"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "lib-phone",
                    children: "Phone Number"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lib-phone",
                    type: "tel",
                    "data-ocid": "settings.phone_input",
                    value: form.phone,
                    onChange: (e) => setForm((p) => ({ ...p, phone: e.target.value })),
                    placeholder: "9876543210",
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "lib-address",
                    children: "Address"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lib-address",
                    type: "text",
                    "data-ocid": "settings.address_input",
                    value: form.address,
                    onChange: (e) => setForm((p) => ({ ...p, address: e.target.value })),
                    placeholder: "Library full address",
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "lib-hours",
                    children: "Opening Hours"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lib-hours",
                    type: "text",
                    "data-ocid": "settings.hours_input",
                    value: form.openingHours,
                    onChange: (e) => setForm((p) => ({ ...p, openingHours: e.target.value })),
                    placeholder: "6 AM – 11 PM",
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "lib-facilities",
                    children: [
                      "Facilities",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1", children: "(comma-separated)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "lib-facilities",
                    type: "text",
                    "data-ocid": "settings.facilities_input",
                    value: facilitiesStr,
                    onChange: (e) => setFacilitiesStr(e.target.value),
                    placeholder: "WiFi, AC, Water Cooler, CCTV",
                    className: inputCls
                  }
                )
              ] })
            ] }),
            facilitiesStr.trim() && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: facilitiesStr.split(",").filter((f) => f.trim()).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs font-normal",
                children: f.trim()
              },
              f.trim()
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "submit",
                "data-ocid": "settings.library.save_button",
                disabled: updateSettings.isPending,
                className: "flex items-center gap-2 gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90 disabled:opacity-60",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 15 }),
                  updateSettings.isPending ? "Saving..." : "Save Settings"
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 16, className: "text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-sm text-foreground", children: "Seat Initialization" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1 max-w-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "text-sm font-medium text-foreground",
                    htmlFor: "seat-count",
                    children: "Total Seats (1–500)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "seat-count",
                    type: "number",
                    "data-ocid": "settings.seat_count_input",
                    value: seatCount,
                    onChange: (e) => setSeatCount(e.target.value),
                    min: "1",
                    max: "500",
                    placeholder: "50",
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "settings.init_seats_button",
                  onClick: handleInitSeats,
                  disabled: initSeats.isPending,
                  className: "flex items-center gap-2 border border-primary/40 text-primary px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/10 transition-smooth disabled:opacity-60",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 15 }),
                    initSeats.isPending ? "Initializing..." : "Initialize Seats"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "⚠️" }),
              "Re-initializing seats may reset existing seat data"
            ] })
          ] })
        ] }),
        pendingSeatCount !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfirmDialog,
          {
            message: `Are you sure you want to initialize ${pendingSeatCount} seats? Existing seat data may change.`,
            onConfirm: confirmInitSeats,
            onCancel: () => setPendingSeatCount(null)
          }
        )
      ]
    }
  );
}
function CredentialsSection() {
  const updateCreds = useUpdateAdminCredentials();
  const [form, setForm] = reactExports.useState({
    currentPassword: "",
    newUsername: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [open, setOpen] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      ue.error("New passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      ue.error("Password must be at least 6 characters long");
      return;
    }
    try {
      await updateCreds.mutateAsync({
        currentPassword: form.currentPassword,
        newUsername: form.newUsername,
        newEmail: form.newEmail,
        newPassword: form.newPassword
      });
      ue.success("Admin credentials updated successfully!");
      setForm({
        currentPassword: "",
        newUsername: "",
        newEmail: "",
        newPassword: "",
        confirmPassword: ""
      });
      setOpen(false);
    } catch (err) {
      ue.error(err instanceof Error ? err.message : "Update failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl shadow-warm overflow-hidden",
      "data-ocid": "settings.credentials_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full gradient-warm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(!open),
            "data-ocid": "settings.credentials_toggle",
            className: "w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/20 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18, className: "text-primary-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-primary font-semibold text-lg leading-tight", children: "Admin Credentials" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Change username, email and password" })
                ] })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronUp,
                {
                  size: 18,
                  className: "text-muted-foreground flex-shrink-0"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  size: 18,
                  className: "text-muted-foreground flex-shrink-0"
                }
              )
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "px-6 pb-6 space-y-4 border-t border-border pt-5",
            "data-ocid": "settings.credentials.form",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-accent/10 border border-accent/20 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 15, className: "text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-medium", children: "Current password will be verified before updating credentials" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "curr-pass",
                      children: [
                        "Current Password ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "curr-pass",
                      type: "password",
                      "data-ocid": "settings.current_password_input",
                      value: form.currentPassword,
                      onChange: (e) => setForm((p) => ({ ...p, currentPassword: e.target.value })),
                      required: true,
                      autoComplete: "current-password",
                      className: inputCls,
                      placeholder: "Your current password"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "new-uname",
                      children: [
                        "New Username ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "new-uname",
                      type: "text",
                      "data-ocid": "settings.new_username_input",
                      value: form.newUsername,
                      onChange: (e) => setForm((p) => ({ ...p, newUsername: e.target.value })),
                      required: true,
                      autoComplete: "username",
                      className: inputCls,
                      placeholder: "admin"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "new-email",
                      children: [
                        "Email ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "new-email",
                      type: "email",
                      "data-ocid": "settings.new_email_input",
                      value: form.newEmail,
                      onChange: (e) => setForm((p) => ({ ...p, newEmail: e.target.value })),
                      required: true,
                      autoComplete: "email",
                      className: inputCls,
                      placeholder: "admin@library.com"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "new-pass",
                      children: [
                        "New Password ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "new-pass",
                      type: "password",
                      "data-ocid": "settings.new_password_input",
                      value: form.newPassword,
                      onChange: (e) => setForm((p) => ({ ...p, newPassword: e.target.value })),
                      required: true,
                      minLength: 6,
                      autoComplete: "new-password",
                      className: inputCls,
                      placeholder: "Min 6 characters"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "confirm-pass",
                      children: [
                        "Confirm Password ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "confirm-pass",
                      type: "password",
                      "data-ocid": "settings.confirm_password_input",
                      value: form.confirmPassword,
                      onChange: (e) => setForm((p) => ({ ...p, confirmPassword: e.target.value })),
                      required: true,
                      autoComplete: "new-password",
                      className: inputCls,
                      placeholder: "Confirm new password"
                    }
                  )
                ] })
              ] }),
              form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-xs flex items-center gap-1",
                  "data-ocid": "settings.credentials.password_mismatch",
                  children: "⚠️ Passwords do not match"
                }
              ),
              updateCreds.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2",
                  "data-ocid": "settings.credentials.error_state",
                  children: updateCreds.error instanceof Error ? updateCreds.error.message : "Update failed — please try again"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setOpen(false),
                    "data-ocid": "settings.credentials.cancel_button",
                    className: "px-4 py-2.5 border border-border text-muted-foreground rounded-lg text-sm hover:bg-muted transition-smooth",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    "data-ocid": "settings.credentials.save_button",
                    disabled: updateCreds.isPending || form.newPassword !== form.confirmPassword,
                    className: "flex items-center gap-2 gradient-warm text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-warm hover:shadow-elevated transition-smooth hover:opacity-90 disabled:opacity-60",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 15 }),
                      updateCreds.isPending ? "Updating..." : "Update Credentials"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function QuotesSection() {
  const { data: quotes, isLoading } = useAllQuotes();
  const addQuote = useAddQuote();
  const deleteQuote = useDeleteQuote();
  const [form, setForm] = reactExports.useState({ text: "", author: "" });
  const [showForm, setShowForm] = reactExports.useState(false);
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.text.trim() || !form.author.trim()) {
      ue.error("Please fill in both quote and author");
      return;
    }
    try {
      await addQuote.mutateAsync({
        text: form.text.trim(),
        author: form.author.trim()
      });
      setForm({ text: "", author: "" });
      setShowForm(false);
      ue.success("Quote added successfully!");
    } catch {
      ue.error("Failed to add quote. Please try again.");
    }
  };
  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setPendingDelete(null);
    try {
      await deleteQuote.mutateAsync(id);
      ue.success("Quote deleted successfully!");
    } catch {
      ue.error("Failed to delete quote. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl shadow-warm overflow-hidden",
      "data-ocid": "settings.quotes_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full gradient-warm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { size: 18, className: "text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-primary font-semibold text-lg leading-tight", children: "Motivational Quotes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  (quotes == null ? void 0 : quotes.length) ?? 0,
                  " quotes available"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "settings.add_quote_button",
                onClick: () => setShowForm(!showForm),
                className: "flex items-center gap-1.5 text-sm font-medium border border-accent/40 text-accent px-3 py-1.5 rounded-lg hover:bg-accent/10 transition-smooth flex-shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                  showForm ? "Cancel" : "Add Quote"
                ]
              }
            )
          ] }),
          showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleAdd,
              className: "mb-5 p-4 bg-muted/30 rounded-xl border border-border space-y-3",
              "data-ocid": "settings.quote.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "q-text",
                      children: [
                        "Quote ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "q-text",
                      "data-ocid": "settings.quote_text_input",
                      value: form.text,
                      onChange: (e) => setForm((p) => ({ ...p, text: e.target.value })),
                      placeholder: "Motivational quote text...",
                      rows: 3,
                      required: true,
                      className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none placeholder:text-muted-foreground"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "text-sm font-medium text-foreground",
                      htmlFor: "q-author",
                      children: [
                        "Author ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "q-author",
                      type: "text",
                      "data-ocid": "settings.quote_author_input",
                      value: form.author,
                      onChange: (e) => setForm((p) => ({ ...p, author: e.target.value })),
                      placeholder: "Swami Vivekananda",
                      required: true,
                      className: inputCls
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      "data-ocid": "settings.quote_add_submit_button",
                      disabled: addQuote.isPending,
                      className: "flex-1 gradient-warm text-primary-foreground py-2.5 rounded-lg text-sm font-semibold transition-smooth hover:opacity-90 disabled:opacity-60",
                      children: addQuote.isPending ? "Adding..." : "Add Quote"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setShowForm(false);
                        setForm({ text: "", author: "" });
                      },
                      "data-ocid": "settings.quote_add_cancel_button",
                      className: "px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-muted transition-smooth",
                      children: "Cancel"
                    }
                  )
                ] })
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "settings.quotes.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, i)) }) : quotes && quotes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "space-y-2 max-h-96 overflow-y-auto pr-1",
              "data-ocid": "settings.quotes.list",
              children: quotes.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `settings.quotes.item.${i + 1}`,
                  className: "group flex items-start justify-between gap-3 p-3.5 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground italic line-clamp-2 leading-relaxed", children: [
                        '"',
                        q.quote,
                        '"'
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent font-semibold mt-1", children: [
                        "— ",
                        q.author
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `settings.quotes.delete_button.${i + 1}`,
                        onClick: () => setPendingDelete({ id: q.id, text: q.quote }),
                        className: "w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth opacity-0 group-hover:opacity-100",
                        "aria-label": "Delete quote",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                      }
                    )
                  ]
                },
                String(q.id)
              ))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "settings.quotes.empty_state",
              className: "text-center py-10 text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { size: 40, className: "mx-auto mb-3 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No quotes added yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: 'Use the "Add Quote" button to add your first motivational quote!' })
              ]
            }
          )
        ] }),
        pendingDelete !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfirmDialog,
          {
            message: `Delete this quote? "${pendingDelete.text.slice(0, 50)}..."`,
            onConfirm: confirmDelete,
            onCancel: () => setPendingDelete(null)
          }
        )
      ]
    }
  );
}
function AboutSection() {
  const { data: settings } = useSettings();
  const details = [
    {
      label: "App Name",
      value: "Shree Vishwakarma Library Manager",
      icon: BookOpen
    },
    {
      label: "Version",
      value: "v1.0.0",
      icon: Info
    },
    {
      label: "Platform",
      value: "Internet Computer (ICP)",
      icon: Shield
    },
    {
      label: "Library",
      value: (settings == null ? void 0 : settings.libraryName) ?? "Shree Vishwakarma Library",
      icon: Settings
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl shadow-warm overflow-hidden",
      "data-ocid": "settings.about_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full gradient-warm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SectionHeader,
            {
              icon: Info,
              title: "About",
              subtitle: "App information and version details"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3 mb-6", children: details.map(({ label, value, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3.5 bg-muted/30 rounded-lg border border-border/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15, className: "text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: value })
                ] })
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-primary/5 border border-primary/15 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Built with ❤️ on",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://caffeine.ai",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-accent hover:underline font-medium",
                  children: "caffeine.ai"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Blessed by Maa Saraswati — Knowledge is Power 🪔" })
          ] })
        ] })
      ]
    }
  );
}
function AdminSettings() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-4xl mx-auto px-4 py-8",
      "data-ocid": "admin.settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 pb-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gradient-warm flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 24, className: "text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-primary", children: "Settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Manage library configuration and admin credentials" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LibrarySettingsSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CredentialsSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QuotesSection, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {})
        ] })
      ]
    }
  );
}
export {
  AdminSettings
};
