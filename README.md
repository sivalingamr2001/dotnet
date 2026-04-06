# dotnet


import { useState } from "react";

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-zinc-800 text-zinc-200 border border-zinc-700",
    success: "bg-emerald-950 text-emerald-400 border border-emerald-800",
    warning: "bg-amber-950 text-amber-400 border border-amber-800",
    info: "bg-blue-950 text-blue-400 border border-blue-800",
    readonly: "bg-slate-800 text-slate-300 border border-slate-600",
    readwrite: "bg-violet-950 text-violet-400 border border-violet-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Separator = () => <div className="h-px bg-zinc-800 my-1" />;

const SectionHeading = ({ icon, label }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="text-lg">{icon}</span>
    <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-400">{label}</h3>
    <div className="flex-1 h-px bg-zinc-800" />
  </div>
);

const Field = ({ label, value, mono = false, children }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500">{label}</span>
    {children ? children : (
      <span className={`text-sm text-zinc-200 ${mono ? "font-mono" : ""}`}>
        {value || <span className="text-zinc-600 italic">—</span>}
      </span>
    )}
  </div>
);

const PolicyItem = ({ num, title, body }) => (
  <div className="flex gap-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
      {num}
    </div>
    <div>
      <span className="text-xs font-semibold text-zinc-300">{title}: </span>
      <span className="text-xs text-zinc-500">{body}</span>
    </div>
  </div>
);

const data = {
  recordNo: "F/EDP/70 — Issue 4.0",
  date: "07.03.2025",
  employee: {
    id: "",
    name: "",
    department: "",
    email: "",
    phone: "",
    location: "",
  },
  access: {
    folderPath: "",
    accessType: "Read-Only",
    reason: "",
  },
  hod: {
    employeeId: "",
    name: "",
    department: "",
    signature: "",
  },
  acknowledgment: {
    signature: "",
    date: "",
    itsrNumber: "",
  },
  itDept: {
    dateReceived: "",
    dateAccessProvided: "",
    accessGrantedBy: "",
    accessLevelAssigned: "",
  },
};

const policies = [
  { title: "Authorized Use", body: "Access is granted strictly for business-related purposes. Unauthorized access, sharing, or modification of data is prohibited." },
  { title: "Data Confidentiality", body: "Employees must maintain the confidentiality of the information and not share it with unauthorized personnel." },
  { title: "Access Restrictions", body: "Users must only access data necessary for their job functions. Any additional access must be approved through formal requests." },
  { title: "Monitoring & Auditing", body: "The organization reserves the right to monitor file access and usage for security and compliance purposes." },
  { title: "Data Integrity", body: "Users must not modify or delete critical business data unless explicitly authorized." },
  { title: "Revocation of Access", body: "Access may be revoked at any time due to changes in job roles, security concerns, or policy violations." },
];

export default function FolderAccessRequestView() {
  const [tab, setTab] = useState("details");

  const tabs = [
    { id: "details", label: "Request Details" },
    { id: "policy", label: "Data Policies" },
    { id: "itdept", label: "IT Dept. Use" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-start justify-center py-10 px-4"
      style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}>
      <div className="w-full max-w-2xl">

        {/* Header Card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden mb-4">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <span className="text-sm">🗂️</span>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">Janatics India Pvt. Ltd.</p>
                <p className="text-sm font-bold text-zinc-100 tracking-tight">File Server Folder Access Request</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="warning">Pending</Badge>
              <p className="text-[10px] text-zinc-600 mt-1 font-mono">Page 1 of 1</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 divide-x divide-zinc-800 border-b border-zinc-800">
            <div className="px-5 py-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Record No.</p>
              <p className="text-xs font-mono text-zinc-300 mt-0.5">{data.recordNo}</p>
            </div>
            <div className="px-5 py-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Issue Date</p>
              <p className="text-xs font-mono text-zinc-300 mt-0.5">{data.date}</p>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex border-b border-zinc-800">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-2.5 text-[11px] font-semibold tracking-widest uppercase transition-all
                  ${tab === t.id
                    ? "text-zinc-100 border-b-2 border-violet-500 bg-zinc-800/50"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Request Details */}
          {tab === "details" && (
            <div className="p-5 space-y-6">

              {/* Employee Information */}
              <div>
                <SectionHeading icon="👤" label="Employee Information" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Employee ID" value={data.employee.id} mono />
                  <Field label="Name" value={data.employee.name} />
                  <Field label="Department" value={data.employee.department} />
                  <Field label="Email ID" value={data.employee.email} mono />
                  <Field label="Phone No." value={data.employee.phone} mono />
                  <Field label="Location" value={data.employee.location} />
                </div>
              </div>

              <Separator />

              {/* Access Details */}
              <div>
                <SectionHeading icon="🔐" label="Access Details" />
                <div className="space-y-4">
                  <Field label="Folder Name / Path" value={data.access.folderPath} mono />
                  <Field label="Type of Access Required">
                    <div className="flex gap-2 mt-1">
                      <Badge variant={data.access.accessType === "Read-Only" ? "readonly" : "default"}>
                        {data.access.accessType === "Read-Only" ? "✓" : "○"} Read-Only
                      </Badge>
                      <Badge variant={data.access.accessType === "Read & Write" ? "readwrite" : "default"}>
                        {data.access.accessType === "Read & Write" ? "✓" : "○"} Read &amp; Write
                      </Badge>
                    </div>
                  </Field>
                  <Field label="Reason for Access" value={data.access.reason} />
                </div>
              </div>

              <Separator />

              {/* HOD Approval */}
              <div>
                <SectionHeading icon="✅" label="HOD Approval" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Employee ID" value={data.hod.employeeId} mono />
                  <Field label="Name" value={data.hod.name} />
                  <Field label="Department" value={data.hod.department} />
                  <Field label="Signature" value={data.hod.signature} />
                </div>
              </div>

              <Separator />

              {/* Acknowledgment */}
              <div>
                <SectionHeading icon="📝" label="Acknowledgment by Requestor" />
                <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 mb-4">
                  <p className="text-xs text-zinc-400 leading-relaxed italic">
                    "I acknowledge that I have read and agree to comply with the organization's data access policies and security guidelines."
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                  <Field label="Signature" value={data.acknowledgment.signature} />
                  <Field label="Date" value={data.acknowledgment.date} mono />
                  <Field label="ITSR Number" value={data.acknowledgment.itsrNumber} mono />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Data Policies */}
          {tab === "policy" && (
            <div className="p-5 space-y-2">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 font-semibold">Data Access Policies — 6 clauses</p>
              {policies.map((p, i) => (
                <PolicyItem key={i} num={i + 1} title={p.title} body={p.body} />
              ))}
            </div>
          )}

          {/* Tab: IT Department */}
          {tab === "itdept" && (
            <div className="p-5">
              <SectionHeading icon="🖥️" label="IT Department Use Only" />
              <div className="rounded-lg border border-zinc-800 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-zinc-800/60 border-b border-zinc-800">
                      <th className="px-4 py-2.5 text-left text-[10px] uppercase tracking-widest text-zinc-500 font-semibold w-1/2">Field</th>
                      <th className="px-4 py-2.5 text-left text-[10px] uppercase tracking-widest text-zinc-500 font-semibold w-1/2">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {[
                      ["Date Received", data.itDept.dateReceived],
                      ["Date Access Provided", data.itDept.dateAccessProvided],
                      ["Access Granted By", data.itDept.accessGrantedBy],
                      ["Access Level Assigned", data.itDept.accessLevelAssigned],
                    ].map(([field, value]) => (
                      <tr key={field} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-4 py-3 text-zinc-400 font-semibold">{field}</td>
                        <td className="px-4 py-3 font-mono text-zinc-300">
                          {value || <span className="text-zinc-700 italic not-italic">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-600">Form: F/EDP/70 · Issue: 4.0</span>
            <span className="text-[10px] font-mono text-zinc-600">Date: 07.03.2025</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors">
            ✏️ Edit Request
          </button>
          <button className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide bg-violet-600 border border-violet-500 text-white hover:bg-violet-500 transition-colors">
            📤 Submit Request
          </button>
        </div>

      </div>
    </div>
  );
}


Here's a production-grade **GitHub Copilot prompt** for React component refactoring, packaged as a beautiful interactive reference card:

Here's what's inside — 3 rules, each with a copy-ready Copilot prompt and a before/after example:

**R-01 · 100 LOC Limit** — tells Copilot to extract sub-components, hooks, and utils so no single file exceeds 100 lines. The parent only composes.

**R-02 · Folder Colocation** — tells Copilot to group everything into a `FeatureName/` folder with `index.tsx` as the only public export. Internals are never imported directly.

**R-03 · Readability Order** — enforces a strict section order inside every component: Types → Constants → Hooks → Derived state → `handleXxx` → Early returns → JSX. No inline arrows in JSX, no deep ternaries.

The **Master Prompt** at the bottom combines all three rules into one paste — use that when you want Copilot to do a full refactor in a single shot.



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>React Refactor — Copilot Prompt Reference</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Syne:wght@400;600;800&display=swap');

  :root {
    --bg: #0a0c10;
    --surface: #111318;
    --surface2: #181c24;
    --border: #1f2535;
    --accent: #4fffb0;
    --accent2: #4f9fff;
    --accent3: #ff6b6b;
    --accent4: #ffd166;
    --text: #e2e8f0;
    --muted: #64748b;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    min-height: 100vh;
    padding: 2rem 1.5rem 4rem;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,255,176,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(79,159,255,0.05) 0%, transparent 60%);
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .tag {
    display: inline-block;
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid rgba(79,255,176,0.25);
    padding: 0.3rem 0.9rem;
    border-radius: 2px;
    margin-bottom: 1.2rem;
  }

  h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 0.7rem;
  }

  h1 span { color: var(--accent); }

  .subtitle {
    color: var(--muted);
    font-size: 0.9rem;
    font-family: var(--mono);
  }

  .grid {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    gap: 1.2rem;
  }

  /* ── RULE CARD ── */
  .rule-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .rule-card:hover { border-color: rgba(79,255,176,0.3); }

  .rule-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.9rem 1.2rem;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    user-select: none;
  }

  .rule-num {
    font-family: var(--mono);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--accent);
    min-width: 2rem;
    letter-spacing: 0.1em;
  }

  .rule-title {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .pill {
    font-family: var(--mono);
    font-size: 0.6rem;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .pill-green  { background: rgba(79,255,176,0.12); color: var(--accent); }
  .pill-blue   { background: rgba(79,159,255,0.12); color: var(--accent2); }
  .pill-red    { background: rgba(255,107,107,0.12); color: var(--accent3); }
  .pill-yellow { background: rgba(255,209,102,0.12); color: var(--accent4); }

  .chevron {
    color: var(--muted);
    font-size: 0.75rem;
    transition: transform 0.25s;
  }
  .rule-card.open .chevron { transform: rotate(90deg); }

  .rule-body {
    display: none;
    padding: 1.2rem;
    gap: 1rem;
  }
  .rule-card.open .rule-body { display: grid; }

  /* ── PROMPT BOX ── */
  .prompt-box {
    position: relative;
    background: #0d1117;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 1rem 1.2rem;
    font-family: var(--mono);
    font-size: 0.78rem;
    line-height: 1.7;
    color: #c9d1d9;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .prompt-box .comment { color: #6e7681; }
  .prompt-box .kw      { color: var(--accent); font-weight: 600; }
  .prompt-box .str     { color: var(--accent4); }
  .prompt-box .num     { color: var(--accent2); }
  .prompt-box .rule    { color: var(--accent3); }

  .copy-btn {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: var(--mono);
    font-size: 0.6rem;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: color 0.2s, border-color 0.2s;
  }
  .copy-btn:hover { color: var(--accent); border-color: var(--accent); }
  .copy-btn.copied { color: var(--accent); border-color: var(--accent); }

  /* ── EXAMPLE BLOCK ── */
  .example-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
  }
  @media (max-width: 640px) { .example-row { grid-template-columns: 1fr; } }

  .ex-label {
    font-family: var(--mono);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
    font-weight: 700;
  }
  .ex-label.bad  { color: var(--accent3); }
  .ex-label.good { color: var(--accent); }

  /* ── MASTER PROMPT SECTION ── */
  .master-section {
    max-width: 1000px;
    margin: 2.5rem auto 0;
  }

  .master-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .master-title {
    font-size: 1rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .divider {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .master-prompt {
    position: relative;
    background: #0d1117;
    border: 1px solid rgba(79,255,176,0.25);
    border-radius: 8px;
    padding: 1.4rem 1.6rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    line-height: 1.9;
    color: #c9d1d9;
    white-space: pre-wrap;
    box-shadow: 0 0 40px rgba(79,255,176,0.04);
  }
  .master-prompt .comment { color: #6e7681; }
  .master-prompt .kw      { color: var(--accent); font-weight: 700; }
  .master-prompt .rule    { color: var(--accent3); }
  .master-prompt .num     { color: var(--accent2); }
  .master-prompt .str     { color: var(--accent4); }

  footer {
    text-align: center;
    margin-top: 3rem;
    font-family: var(--mono);
    font-size: 0.65rem;
    color: var(--muted);
    letter-spacing: 0.08em;
  }

  .info-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--muted);
    margin-top: 0.1rem;
  }
  .info-row span { color: var(--text); }
</style>
</head>
<body>

<header>
  <div class="tag">GitHub Copilot Prompt Reference</div>
  <h1>React Component <span>Refactoring</span></h1>
  <p class="subtitle">3 rules · copy-paste prompts · before/after examples</p>
</header>

<div class="grid" id="cards"></div>

<div class="master-section">
  <div class="master-header">
    <span class="master-title">★ Master Refactor Prompt</span>
    <div class="divider"></div>
    <button class="copy-btn" id="masterCopyBtn" onclick="copyMaster()">COPY ALL</button>
  </div>
  <div class="master-prompt" id="masterBlock"></div>
</div>

<footer>JANATICS · REACT BEST PRACTICES · 2025</footer>

<script>
const RULES = [
  {
    num: "R-01",
    title: "Keep each component under 100 lines",
    pill: ["100 LOC LIMIT", "pill-red"],
    prompt: `// Copilot: Refactor this component so that each component file
// stays STRICTLY under 100 lines of code (excluding imports).
//
// Rules:
//  • Extract every logical UI section into its own sub-component
//  • Extract every custom hook into a separate hooks/ file
//  • Extract every helper/util function into a separate utils/ file
//  • The parent component must only compose, never implement detail
//  • Use named exports for all extracted pieces
//
// Target structure:
//   ComponentName/
//     index.tsx          ← ≤ 100 lines, composes sub-components
//     ComponentName.tsx  ← same as index if preferred
//     hooks/
//       useComponentName.ts
//     components/
//       SubComponentA.tsx
//       SubComponentB.tsx
//     utils/
//       helpers.ts`,
    bad: `// ❌ BEFORE — 200-line monolith
export default function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => { fetch('/api/data')
    .then(r => r.json())
    .then(setData); }, []);

  // ... 150 more lines of JSX + logic
}`,
    good: `// ✅ AFTER — parent ≤ 100 lines
export default function Dashboard() {
  const { data, loading } = useDashboardData();
  return (
    <DashboardLayout>
      <StatsRow data={data} />
      <ChartPanel data={data} />
    </DashboardLayout>
  );
}`,
  },
  {
    num: "R-02",
    title: "Group related components into a folder",
    pill: ["FOLDER COLOCATION", "pill-blue"],
    prompt: `// Copilot: Reorganise related components into a colocated folder.
//
// Rules:
//  • Each feature/widget gets its OWN folder: FeatureName/
//  • Folder contains: index.tsx, sub-components, hooks/, types.ts, utils/
//  • index.tsx re-exports the public API — nothing else imports internals
//  • Shared primitives stay in src/components/ui/
//  • Page-level components stay in src/pages/ or src/routes/
//
// Example target layout:
//   src/
//     components/
//       UserCard/
//         index.tsx
//         UserCard.tsx
//         UserAvatar.tsx
//         hooks/
//           useUserCard.ts
//         types.ts
//       ui/
//         Button.tsx
//         Input.tsx
//     pages/
//       Dashboard.tsx`,
    bad: `// ❌ BEFORE — flat dump
src/components/
  UserCard.tsx
  UserCardAvatar.tsx
  UserCardFooter.tsx
  useUserCard.ts
  userCardHelpers.ts`,
    good: `// ✅ AFTER — colocated folder
src/components/
  UserCard/
    index.tsx          ← public export
    UserCard.tsx
    UserAvatar.tsx
    UserCardFooter.tsx
    hooks/
      useUserCard.ts
    utils/
      helpers.ts`,
  },
  {
    num: "R-03",
    title: "Maintain readability in every component",
    pill: ["READABILITY", "pill-green"],
    prompt: `// Copilot: Refactor this component for maximum readability.
//
// Rules — structure every component in this ORDER:
//   1. Type/interface declarations (Props, State)
//   2. Constants & static config (outside component)
//   3. Component function signature
//   4. Hook calls (useState, useEffect, custom hooks)
//   5. Derived state / memoised values
//   6. Event handler functions (handleXxx naming)
//   7. Early returns (loading, error, empty states)
//   8. Single return JSX — max 1 level of nesting per expression
//
// Additional rules:
//  • Props interface always named <ComponentName>Props
//  • No inline arrow functions in JSX (extract to handleXxx)
//  • No ternaries deeper than 1 level — extract to variable
//  • Boolean props: isXxx, hasXxx, canXxx
//  • Add a blank line between each section listed above`,
    bad: `// ❌ BEFORE — unstructured
function Card({ data, onSave, flag }) {
  const [x, setX] = useState(null);
  const handle = () => { if(flag){ onSave(data) } };
  useEffect(()=>{fetch('/x').then(r=>r.json()).then(setX)},[]);
  return <div onClick={()=>onSave(data)}>{x?.name}</div>;
}`,
    good: `// ✅ AFTER — readable structure
interface CardProps {
  data: CardData;
  onSave: (d: CardData) => void;
  isDisabled?: boolean;
}

function Card({ data, onSave, isDisabled }: CardProps) {
  const { cardDetail, isLoading } = useCardDetail(data.id);

  const handleSave = () => onSave(data);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <CardBody detail={cardDetail} />
      <SaveButton onClick={handleSave} disabled={isDisabled} />
    </div>
  );
}`,
  },
];

const MASTER_PROMPT_RAW = `// ═══════════════════════════════════════════════════════
// COPILOT · REACT COMPONENT REFACTOR — MASTER PROMPT
// Apply all three rules in a single pass
// ═══════════════════════════════════════════════════════

// [R-01] SIZE LIMIT
// Refactor so every component file is STRICTLY under 100 lines.
// Extract sub-components, custom hooks, and helper functions.

// [R-02] FOLDER COLOCATION
// Group all related files into a FeatureName/ folder.
// Expose only index.tsx as the public entry point.
// Layout: index.tsx | SubComponent.tsx | hooks/ | utils/ | types.ts

// [R-03] READABILITY ORDER
// Structure every component in this exact order:
//   1. Types / Interfaces
//   2. Static constants (outside function)
//   3. Component signature
//   4. Hook calls (useState → useEffect → custom)
//   5. Derived / memoised values
//   6. Event handlers  (handleXxx)
//   7. Early returns   (loading | error | empty)
//   8. Single JSX return

// NAMING CONVENTIONS
// Props interface  → <ComponentName>Props
// Event handlers   → handleXxx
// Boolean props    → isXxx | hasXxx | canXxx
// Custom hooks     → useXxx

// WHAT TO AVOID
// ✗ Inline arrow functions in JSX
// ✗ Ternaries deeper than 1 level
// ✗ Mixed logic and JSX in the same block
// ✗ Any file exceeding 100 lines

// Apply these rules to the component below and output
// the refactored files with their full folder structure.`;

function hl(str) {
  return str
    .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
    .replace(/\b(const|let|function|return|export|default|import|from|if|interface|type)\b/g, '<span class="kw">$1</span>')
    .replace(/(\[R-\d+\])/g, '<span class="rule">$1</span>')
    .replace(/(✗|✓|✅|❌)/g, '<span class="rule">$1</span>');
}

function buildCards() {
  const container = document.getElementById('cards');
  RULES.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'rule-card';
    if (i === 0) card.classList.add('open');

    const promptText = r.prompt;

    card.innerHTML = `
      <div class="rule-header" onclick="toggle(this.parentElement)">
        <span class="rule-num">${r.num}</span>
        <span class="rule-title">${r.title}</span>
        <span class="pill ${r.pill[1]}">${r.pill[0]}</span>
        <span class="chevron">▶</span>
      </div>
      <div class="rule-body">
        <div class="prompt-box">
          <button class="copy-btn" onclick="copyText(this, ${JSON.stringify(promptText)})">COPY</button>
          ${hl(r.prompt)}
        </div>
        <div class="example-row">
          <div>
            <div class="ex-label bad">✗ Before</div>
            <div class="prompt-box">${hl(r.bad)}</div>
          </div>
          <div>
            <div class="ex-label good">✓ After</div>
            <div class="prompt-box">${hl(r.good)}</div>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

function buildMaster() {
  document.getElementById('masterBlock').innerHTML = hl(MASTER_PROMPT_RAW);
}

function toggle(card) {
  card.classList.toggle('open');
}

async function copyText(btn, text) {
  await navigator.clipboard.writeText(text);
  btn.textContent = 'COPIED!';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 1800);
}

async function copyMaster() {
  await navigator.clipboard.writeText(MASTER_PROMPT_RAW);
  const btn = document.getElementById('masterCopyBtn');
  btn.textContent = 'COPIED!';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = 'COPY ALL'; btn.classList.remove('copied'); }, 1800);
}

buildCards();
buildMaster();
</script>
</body>
</html>
