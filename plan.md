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
        </div>
      </div>
      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 16px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted, lineHeight: 1.7 }}>
        <span style={{ color: C.textDim }}>// Router.tsx — admin-only section</span><br/>
        {"<"}Route element={"{<"}ProtectedRoute<br/>
        &nbsp;&nbsp;allowedRoles<span style={{ color: C.warn }}>=</span>{"{["}admin{"]}"}<br/>
        {"/>}"}>{"}"}<br/>
        &nbsp;&nbsp;{"<"}Route path<span style={{ color: C.warn }}>=</span><span style={{ color: "#86efac" }}>"/admin"</span> ... {"/>"}<br/>
        {"</"}Route{">"}
      </div>
    </div>
  );
}

function NotFoundPage() {
  const { navigate } = useRouter();
  return (
    <div style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{ fontFamily: F.mono, fontSize: "52px", color: C.textDim }}>404</div>
      <div style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "12px" }}>Route not found</div>
      <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 16px", fontFamily: F.mono, fontSize: "11px", color: C.textMuted }}>
        {"<"}Route path<span style={{ color: C.warn }}>=</span><span style={{ color: "#86efac" }}>"*"</span> element{`={<`}NotFoundPage {"/>}"} {"/>"}
      </div>
      <Button small onClick={() => navigate("/dashboard")}>Go Home</Button>
    </div>
  );
}

// ============================================================
// ROUTE RESOLVER (simulates React Router's <Routes>/<Route>)
// ============================================================
function RouteRenderer() {
  const { currentPath } = useRouter();
  const { isAuthenticated } = useAuth();

  const routes = {
    "/login": { component: <LoginPage />, protected: false },
    "/dashboard": { component: <DashboardPage />, protected: true, roles: null },
    "/profile": { component: <ProfilePage />, protected: true, roles: null },
    "/admin": { component: <AdminPage />, protected: true, roles: ["admin"] },
    "/404": { component: <NotFoundPage />, protected: false },
  };

  const route = routes[currentPath] || routes["/404"];

  if (route.protected) {
    return <ProtectedRoute allowedRoles={route.roles}>{route.component}</ProtectedRoute>;
  }

  return route.component;
}

// ============================================================
// NAVIGATION
// ============================================================
function NavBar() {
  const { currentPath, navigate } = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { path: "/login", label: "Login", icon: "🔑", showWhen: "always" },
    { path: "/dashboard", label: "Dashboard", icon: "◉", showWhen: "auth" },
    { path: "/profile", label: "Profile", icon: "◈", showWhen: "auth" },
    { path: "/admin", label: "Admin", icon: "⬡", showWhen: "auth", adminOnly: true },
    { path: "/404", label: "404 Test", icon: "✕", showWhen: "always" },
  ];

  const visible = navItems.filter(item => {
    if (item.showWhen === "auth" && !isAuthenticated) return false;
    return true;
  });

  return (
    <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
      <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim, marginRight: "8px", letterSpacing: "0.08em" }}>ROUTES</div>
      {visible.map(item => {
        const active = currentPath === item.path;
        return (
          <button key={item.path} onClick={() => navigate(item.path)}
            style={{
              padding: "5px 12px", background: active ? C.accentGlow : "transparent",
              border: `1px solid ${active ? C.accent : C.border}`,
              borderRadius: "4px", color: active ? C.accent : (item.adminOnly ? C.admin : C.textMuted),
              fontFamily: F.mono, fontSize: "11px", cursor: "pointer",
              transition: "all 0.12s", display: "flex", alignItems: "center", gap: "5px",
            }}>
            <span style={{ fontSize: "10px" }}>{item.icon}</span>
            {item.path}
            {item.adminOnly && <Tag type="admin">admin</Tag>}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Tag type={user?.role === "admin" ? "admin" : "success"}>{user?.role}</Tag>
          <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: "11px" }}>{user?.name}</span>
          <Button small variant="ghost" onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// FILE TREE SIDEBAR
// ============================================================
function FileTree() {
  const [open, setOpen] = useState(true);
  const files = [
    { name: "App.tsx", note: "Provider wiring" },
    { name: "auth/", isDir: true },
    { name: "  types.ts", note: "UserRole, AuthUser, TokenPayload" },
    { name: "  tokenUtils.ts", note: "parseToken, validateToken, expiry" },
    { name: "  AuthContext.tsx", note: "useAuth() hook + AuthProvider" },
    { name: "router/", isDir: true },
    { name: "  routeConfig.ts", note: "Lazy components + route arrays" },
    { name: "  Router.tsx", note: "BrowserRouter + Routes tree" },
    { name: "  ProtectedRoute.tsx", note: "Auth + RBAC guard" },
    { name: "pages/", isDir: true },
    { name: "  LoginPage.tsx", note: "redirect-after-login" },
    { name: "  DashboardPage.tsx", note: "" },
    { name: "  AdminPage.tsx", note: "admin only" },
    { name: "  NotFoundPage.tsx", note: "404 fallback" },
  ];

  return (
    <div style={{ width: "220px", flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.border}`, padding: "12px", overflow: "auto" }}>
      <div style={{ fontFamily: F.mono, fontSize: "10px", color: C.textDim, letterSpacing: "0.1em", marginBottom: "8px" }}>EXPLORER</div>
      {files.map((f, i) => (
        <div key={i} style={{ padding: "3px 0", display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span style={{ fontFamily: F.mono, fontSize: "11px", color: f.isDir ? C.accent : C.textMuted, whiteSpace: "pre" }}>
            {f.isDir ? "📁" : "  📄"} {f.name}
          </span>
          {f.note && <span style={{ fontFamily: F.mono, fontSize: "9px", color: C.textDim, flexShrink: 0 }}>{f.note}</span>}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ROOT APP
// ============================================================
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: F.sans, color: C.text }}>

          {/* Header */}
          <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontFamily: F.mono, fontSize: "13px", fontWeight: 700, color: C.accent, letterSpacing: "0.05em" }}>⬡ react-router-v6</div>
            <div style={{ fontFamily: F.mono, fontSize: "11px", color: C.textDim }}>production-grade routing architecture</div>
            <div style={{ flex: 1 }} />
            <Tag type="success">TypeScript</Tag>
            <Tag type="info">RBAC</Tag>
            <Tag type="warn">Token Validation</Tag>
          </div>

          {/* Nav */}
          <NavBar />

          {/* Body */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            <FileTree />

            {/* Main content */}
            <div style={{ flex: 1, overflow: "auto" }}>
              <div style={{ maxWidth: "640px", margin: "0 auto" }}>
                <RouteRenderer />
              </div>
            </div>
          </div>

        </div>
      </RouterProvider>
    </AuthProvider>
  );
}