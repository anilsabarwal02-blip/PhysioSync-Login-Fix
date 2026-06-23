import { useState } from "react";
import { Activity, Calendar, Mic, BrainCircuit, Bone, Watch, MonitorSmartphone, Settings, LogOut, WifiOff, RefreshCw, Sun, Moon } from "lucide-react";

const spinKeyframes = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

type PillState = "offline" | "syncing" | "synced" | "pending";

interface Theme {
  bg: string;
  sidebar: string;
  border: string;
  text: string;
  muted: string;
  navActive: string;
  navActiveBg: string;
  navHover: string;
  label: string;
  labelBg: string;
  toggleBg: string;
  toggleBorder: string;
}

const dark: Theme = {
  bg: "#0f172a",
  sidebar: "#0f172a",
  border: "rgba(255,255,255,0.06)",
  text: "#f1f5f9",
  muted: "#94a3b8",
  navActive: "#10b981",
  navActiveBg: "rgba(16,185,129,0.15)",
  navHover: "#94a3b8",
  label: "#64748b",
  labelBg: "#1e293b",
  toggleBg: "#1e293b",
  toggleBorder: "rgba(255,255,255,0.1)",
};

const light: Theme = {
  bg: "#f1f5f9",
  sidebar: "#ffffff",
  border: "rgba(0,0,0,0.07)",
  text: "#0f172a",
  muted: "#64748b",
  navActive: "#0d9488",
  navActiveBg: "rgba(13,148,136,0.1)",
  navHover: "#475569",
  label: "#94a3b8",
  labelBg: "#e2e8f0",
  toggleBg: "#e2e8f0",
  toggleBorder: "rgba(0,0,0,0.1)",
};

function SyncPill({ state, theme }: { state: PillState; theme: Theme }) {
  const configs = {
    offline: {
      bg: "rgba(239,68,68,0.12)", color: "#ef4444", border: "rgba(239,68,68,0.25)",
      icon: <WifiOff size={14} style={{ minWidth: 14 }} />, label: "Offline · 3", showRetry: true,
    },
    syncing: {
      bg: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "rgba(245,158,11,0.3)",
      icon: <RefreshCw size={14} style={{ minWidth: 14, animation: "spin 1s linear infinite" }} />, label: "Syncing…", showRetry: false,
    },
    synced: {
      bg: "rgba(16,185,129,0.13)", color: "#10b981", border: "rgba(16,185,129,0.3)",
      icon: <span style={{ fontSize: 13 }}>✓</span>, label: "Synced ✓", showRetry: false,
    },
    pending: {
      bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)",
      icon: <RefreshCw size={14} style={{ minWidth: 14 }} />, label: "3 pending", showRetry: false,
    },
  };

  const cfg = configs[state];
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 6, width: "100%",
      padding: "8px 14px", borderRadius: 10,
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      fontSize: "0.78rem", fontWeight: 600,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {cfg.icon}
        <span>{cfg.label}</span>
      </div>
      {cfg.showRetry && (
        <button style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          padding: "5px 10px", borderRadius: 7,
          border: "1px solid rgba(239,68,68,0.35)",
          background: "rgba(239,68,68,0.1)", color: "#ef4444",
          fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", width: "100%",
        }}>
          <RefreshCw size={11} /> Retry Sync
        </button>
      )}
    </div>
  );
}

function Sidebar({ syncState, theme }: { syncState: PillState; theme: Theme }) {
  const navItems = [
    { icon: <Activity size={20} />, label: "Dashboard" },
    { icon: <Calendar size={20} />, label: "Appointments", active: true },
    { icon: <Mic size={20} />, label: "Voice Notes" },
    { icon: <BrainCircuit size={20} />, label: "AI Rx Planner" },
    { icon: <Bone size={20} />, label: "3D Anatomy" },
    { icon: <Watch size={20} />, label: "Wearable Sync" },
    { icon: <MonitorSmartphone size={20} />, label: "Tele-Rehab" },
  ];

  return (
    <aside style={{
      width: 220, minHeight: "100%",
      background: theme.sidebar,
      borderRight: `1px solid ${theme.border}`,
      display: "flex", flexDirection: "column",
      padding: "16px 12px", gap: 4,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 20px" }}>
        <Activity size={28} color="#10b981" />
        <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: theme.text }}>
          Physio<span style={{ color: "#10b981" }}>Sync</span>
        </h2>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {navItems.map((item) => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px", borderRadius: 10,
            background: item.active ? theme.navActiveBg : "transparent",
            color: item.active ? theme.navActive : theme.navHover,
            fontSize: "0.9rem", fontWeight: item.active ? 600 : 400,
            cursor: "pointer",
          }}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <SyncPill state={syncState} theme={theme} />

      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", color: theme.muted, fontSize: "0.9rem", cursor: "pointer", marginTop: 4 }}>
        <Settings size={20} />
        <span>Settings</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", color: "#ef4444", fontSize: "0.9rem", cursor: "pointer" }}>
        <LogOut size={16} />
        <span>Logout</span>
      </div>
    </aside>
  );
}

export function SidebarSync() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? dark : light;

  const states: PillState[] = ["offline", "syncing", "synced", "pending"];
  const stateLabels: Record<PillState, string> = {
    offline: "Offline — 3 changes queued",
    syncing: "Syncing with server",
    synced: "Just synced (3s flash)",
    pending: "Online but 3 still pending",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: theme.bg, minHeight: "100vh", padding: "24px", transition: "background 0.3s ease" }}>
      <style>{spinKeyframes}</style>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ color: theme.muted, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Sidebar Sync Indicator — All States
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "7px 16px", borderRadius: 20,
            background: theme.toggleBg, border: `1px solid ${theme.toggleBorder}`,
            color: theme.text, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {isDark ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#6366f1" />}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {states.map((state) => (
          <div key={state} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: "0.7rem", color: theme.label, letterSpacing: "0.05em", fontWeight: 600 }}>
              {stateLabels[state]}
            </div>
            <div style={{
              borderRadius: 14, overflow: "hidden",
              border: `1px solid ${theme.border}`,
              height: 340, display: "flex",
              boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.08)",
            }}>
              <Sidebar syncState={state} theme={theme} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
