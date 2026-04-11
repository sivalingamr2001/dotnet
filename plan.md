import { useState, useCallback, useEffect, createContext, useContext, useMemo, Suspense, lazy } from "react";

// ============================================================
// TYPES
// ============================================================
const ROLES = { ADMIN: "admin", USER: "user" };

// ============================================================
// TOKEN UTILS (mirroring tokenUtils.ts)
// ============================================================
function parseToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (!payload.sub || !payload.email || !payload.role || !payload.exp) return null;
    return payload;
  } catch { return null; }
}

const CLOCK_SKEW = 30_000;
function isTokenExpired(payload) {
  return Date.now() >= payload.exp * 1000 - CLOCK_SKEW;
}

function validateToken(token) {
  if (!token) return null;
  const payload = parseToken(token);
  if (!payload) return null;
  if (isTokenExpired(payload)) return null;
  return payload;
}

function buildFakeJwt(email, role) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: "usr_" + Math.random().toString(36).slice(2),
    email, role,
    name: email.split("@")[0],
    exp: now + 3600,
    iat: now,
  };
  return [
    btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })),
    btoa(JSON.stringify(payload)),
    "fake_sig"
  ].join(".");
}

// ============================================================
// AUTH CONTEXT
// ============================================================
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, token: null, isLoading: true });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("demo_token");
      if (raw) {
        const payload = validateToken(raw);
        if (payload) {
          setState({ user: { id: payload.sub, email: payload.email, role: payload.role, name: payload.name }, token: raw, isLoading: false });
          return;
        }
        sessionStorage.removeItem("demo_token");
      }
    } catch {}
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const login = useCallback(async (email, password) => {
    await new Promise(r => setTimeout(r, 700));
    const role = email.includes("admin") ? "admin" : "user";
    const jwt = buildFakeJwt(email, role);
    sessionStorage.setItem("demo_token", jwt);
    const payload = parseToken(jwt);
    setState({ user: { id: payload.sub, email, role, name: payload.name }, token: jwt, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("demo_token");
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const hasRole = useCallback((role) => {
    if (!state.user) return false;
    const allowed = Array.isArray(role) ? role : [role];
    return allowed.includes(state.user.role);
  }, [state.user]);

  const value = useMemo(() => ({
    ...state,
    isAuthenticated: !!state.user && !!state.token,
    login, logout, hasRole
  }), [state, login, logout, hasRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  bg: "#0b0e14",
  surface: "#111520",
  surfaceAlt: "#161c2a",
  border: "#1e2535",
  borderBright: "#2a3450",
  accent: "#3b82f6",
  accentDim: "#1d3a6e",
  accentGlow: "rgba(59,130,246,0.15)",
  success: "#10b981",
  successDim: "#064e3b",
  danger: "#ef4444",
  dangerDim: "#450a0a",
  warn: "#f59e0b",
  warnDim: "#451a03",
  text: "#e2e8f0",
  textMuted: "#64748b",
  textDim: "#374151",
  admin: "#a855f7",
  adminDim: "#2e1065",
};

const F = {
  mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  sans: "'DM Sans', 'Inter', system-ui, sans-serif",
};

// ============================================================
// SHARED UI PRIMITIVES
// ============================================================
function Badge({ children, color = C.accent, bg = C.accentDim }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, fontFamily: F.mono, color, background: bg, border: `1px solid ${color}30`, letterSpacing: "0.05em", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function Tag({ children, type = "info" }) {
  const map = {
    info: [C.accent, C.accentDim],
    success: [C.success, C.successDim],
    danger: [C.danger, C.dangerDim],
    warn: [C.warn, C.warnDim],
    admin: [C.admin, C.adminDim],
  };
  const [color, bg] = map[type] || map.info;
  return <Badge color={color} bg={bg}>{children}</Badge>;
}

function CodeLine({ label, value, type = "info" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
      <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "11px", minWidth: "110px" }}>{label}</span>
      <Tag type={type}>{value}</Tag>
    </div>
  );
}

function Button({ children, onClick, variant = "primary", small, disabled }) {
  const styles = {
    primary: { bg: C.accent, color: "#fff", border: C.accent },
    ghost: { bg: "transparent", color: C.textMuted, border: C.border },
    danger: { bg: "transparent", color: C.danger, border: C.danger },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: small ? "6px 14px" : "10px 20px",
        background: s.bg, color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: "6px", cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: F.mono, fontSize: small ? "11px" : "13px",
        fontWeight: 600, letterSpacing: "0.04em",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s",
      }}
    >{children}</button>
  );
}

// ============================================================
// ROUTER SIMULATION (no react-router in artifacts, simulating the pattern)
// ============================================================
const RouterContext = createContext(null);

function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState("/dashboard");
  const navigate = useCallback((path) => setCurrentPath(path), []);
  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouter() {
  return useContext(RouterContext);
}

// ============================================================
// PROTECTED ROUTE LOGIC (mirroring ProtectedRoute.tsx)
// ============================================================
function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const { navigate } = useRouter();

  if (isLoading) return <AuthLoadingScreen />;

  if (!isAuthenticated) {
    // In real app: <Navigate to="/login" state={{ from: location }} replace />
    return <RedirectCard to="/login" reason="unauthenticated" />;
  }

  if (allowedRoles?.length && !hasRole(allowedRoles)) {
    return <AccessDeniedCard requiredRoles={allowedRoles} />;
  }

  return children;
}

// ============================================================
// LOADING / ACCESS DENIED (mirroring ProtectedRoute.tsx screens)
// ============================================================
function AuthLoadingScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "260px", gap: "14px" }}>
      <div style={{ width: "28px", height: "28px", border: `2px solid ${C.border}`, borderTopColor: C.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "12px", letterSpacing: "0.1em" }}>Verifying session...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function RedirectCard({ to, reason }) {
  const { navigate } = useRouter();
  return (
    <div style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: C.warnDim, border: `1px solid ${C.warn}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>🔀</div>
      <div>
        <div style={{ color: C.warn, fontFamily: F.mono, fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>Redirect Triggered</div>
        <div style={{ color: C.textMuted, fontSize: "12px", fontFamily: F.mono }}>
          Reason: <Tag type="warn">{reason}</Tag>
        </div>
        <div style={{ color: C.textMuted, fontSize: "12px", fontFamily: F.mono, marginTop: "4px" }}>
          {'→'} Navigate to: <Tag type="warn">{to}</Tag>
        </div>
      </div>
      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, textAlign: "left", maxWidth: "340px", lineHeight: 1.7 }}>
        <span style={{ color: C.textDim }}>// ProtectedRoute.tsx</span><br/>
        <span style={{ color: "#7dd3fc" }}>if</span> (!isAuthenticated) {'{'}<br/>
        &nbsp;&nbsp;<span style={{ color: "#7dd3fc" }}>return</span> {"<"}Navigate to<span style={{ color: C.warn }}>=</span><span style={{ color: "#86efac" }}>"/login"</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;state<span style={{ color: C.warn }}>=</span>{'{{ from: location }}'}<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;replace {"/>"}<br/>
        {'}'}
      </div>
      <Button small onClick={() => navigate("/login")}>Go to Login</Button>
    </div>
  );
}

function AccessDeniedCard({ requiredRoles }) {
  return (
    <div style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: C.dangerDim, border: `1px solid ${C.danger}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>⛔</div>
      <div>
        <div style={{ color: C.danger, fontFamily: F.mono, fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>Access Denied</div>
        <div style={{ color: C.textMuted, fontSize: "12px", fontFamily: F.mono }}>
          Required role: {requiredRoles.map(r => <Tag key={r} type="admin">{r}</Tag>)}
        </div>
      </div>
      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, textAlign: "left", maxWidth: "340px", lineHeight: 1.7 }}>
        <span style={{ color: C.textDim }}>// ProtectedRoute.tsx</span><br/>
        <span style={{ color: "#7dd3fc" }}>if</span> (allowedRoles && !hasRole(allowedRoles)) {'{'}<br/>
        &nbsp;&nbsp;<span style={{ color: "#7dd3fc" }}>return</span> {"<"}AccessDenied<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;requiredRoles<span style={{ color: C.warn }}>=</span>{"{allowedRoles}"} {"/>"}<br/>
        {'}'}
      </div>
    </div>
  );
}

// ============================================================
// PAGE COMPONENTS
// ============================================================
function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return (
      <div style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <div style={{ color: C.success, fontFamily: F.mono, fontSize: "13px" }}>Already authenticated → redirect to /dashboard</div>
        <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, textAlign: "left", lineHeight: 1.7 }}>
          <span style={{ color: C.textDim }}>// Router.tsx — PublicOnlyRoute</span><br/>
          <span style={{ color: "#7dd3fc" }}>if</span> (isAuthenticated) {'{'}<br/>
          &nbsp;&nbsp;<span style={{ color: "#7dd3fc" }}>return</span> {"<"}Navigate to<span style={{ color: C.warn }}>=</span><span style={{ color: "#86efac" }}>"/dashboard"</span> replace {"/>"}<br/>
          {'}'}
        </div>
        <Button small onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
      </div>
    );
  }

  async function handleLogin() {
    if (!email) { setError("Email required"); return; }
    setError(""); setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch { setError("Login failed."); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ marginBottom: "4px" }}>
        <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, marginBottom: "2px" }}>// pages/LoginPage.tsx</div>
        <div style={{ color: C.text, fontFamily: F.sans, fontSize: "18px", fontWeight: 700 }}>Sign In</div>
        <div style={{ color: C.textMuted, fontSize: "12px", fontFamily: F.mono, marginTop: "4px" }}>
          Try <Tag type="info">user@example.com</Tag> or <Tag type="admin">admin@example.com</Tag>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <label style={{ display: "block", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, marginBottom: "4px" }}>EMAIL</label>
          <input value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", background: C.surfaceAlt, border: `1px solid ${C.borderBright}`, borderRadius: "6px", padding: "8px 12px", color: C.text, fontFamily: F.mono, fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, marginBottom: "4px" }}>PASSWORD</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", background: C.surfaceAlt, border: `1px solid ${C.borderBright}`, borderRadius: "6px", padding: "8px 12px", color: C.text, fontFamily: F.mono, fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>

      {error && <div style={{ color: C.danger, fontFamily: F.mono, fontSize: "11px" }}>{error}</div>}

      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Authenticating..." : "Login"}
      </Button>

      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, lineHeight: 1.7 }}>
        <span style={{ color: C.textDim }}>// After login, redirect to original destination:</span><br/>
        <span style={{ color: "#7dd3fc" }}>const</span> from = location.state?.from?.pathname ?? <span style={{ color: "#86efac" }}>"/dashboard"</span><br/>
        navigate(from, {'{ replace: true }'})<br/>
        <span style={{ color: C.textDim }}>// Token stored → validated on next page load</span>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { user, token } = useAuth();
  const payload = token ? parseToken(token) : null;
  const expiresIn = payload ? Math.floor((payload.exp * 1000 - Date.now()) / 60000) : 0;

  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, marginBottom: "2px" }}>// pages/DashboardPage.tsx</div>
        <div style={{ color: C.text, fontFamily: F.sans, fontSize: "18px", fontWeight: 700 }}>Dashboard</div>
        <div style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "11px", marginTop: "4px" }}>Protected route — any authenticated user</div>
      </div>

      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "16px" }}>
        <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, marginBottom: "10px" }}>AUTH STATE</div>
        <CodeLine label="user.name" value={user?.name} type="success" />
        <CodeLine label="user.email" value={user?.email} type="info" />
        <CodeLine label="user.role" value={user?.role} type={user?.role === "admin" ? "admin" : "success"} />
        <CodeLine label="token.valid" value="true" type="success" />
        <CodeLine label="expires_in" value={`~${expiresIn}m`} type="warn" />
      </div>

      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, lineHeight: 1.7 }}>
        <span style={{ color: C.textDim }}>// Router.tsx — protected section</span><br/>
        {"<"}Route element={"{<"}ProtectedRoute {""/>}"}>{"}"}<br/>
        &nbsp;&nbsp;{"<"}Route path<span style={{ color: C.warn }}>=</span><span style={{ color: "#86efac" }}>"/dashboard"</span><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;element<span style={{ color: C.warn }}>=</span>{"{<"}DashboardPage {"/>}"} {"/>"}<br/>
        {"</"}Route{">"}
      </div>
    </div>
  );
}

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, marginBottom: "2px" }}>// pages/ProfilePage.tsx</div>
        <div style={{ color: C.text, fontFamily: F.sans, fontSize: "18px", fontWeight: 700 }}>Profile</div>
        <div style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "11px", marginTop: "4px" }}>Protected route — any authenticated user</div>
      </div>
      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "16px" }}>
        <CodeLine label="id" value={user?.id?.slice(0, 14) + "..."} type="info" />
        <CodeLine label="name" value={user?.name} type="success" />
        <CodeLine label="role" value={user?.role} type={user?.role === "admin" ? "admin" : "success"} />
      </div>
    </div>
  );
}

function AdminPage() {
  return (
    <div style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, marginBottom: "2px" }}>// pages/AdminPage.tsx</div>
        <div style={{ color: C.text, fontFamily: F.sans, fontSize: "18px", fontWeight: 700 }}>Admin Panel</div>
        <div style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "11px", marginTop: "4px" }}>
          Role-gated: <Tag type="admin">admin only</Tag>
        </div>
      </div>
      <div style={{ background: "#1a0e2e", border: `1px solid ${C.admin}30`, borderRadius: "8px", padding: "16px" }}>
        <div style={{ color: C.admin, fontFamily: F.mono, fontSize: "12px", marginBottom: "8px" }}>✦ ADMIN ACCESS GRANTED</div>
        <div style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "11px", lineHeight: 1.8 }}>
          You can manage users, roles, and system config here.
        </di