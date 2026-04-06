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
