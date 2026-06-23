import { Activity, Calendar, Mic, BrainCircuit, Bone, Watch, MonitorSmartphone, Settings, LogOut, WifiOff, RefreshCw, ChevronLeft } from "lucide-react";

const spinKeyframes = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

type PillState = "offline" | "syncing" | "synced" | "pending";

function SyncPill({ state }: { state: PillState }) {
  const configs = {
    offline: {
      bg: "rgba(239,68,68,0.12)",
      color: "#ef4444",
      border: "rgba(239,68,68,0.25)",
      icon: <WifiOff size={14} style={{ minWidth: 14 }} />,
      label: "Offline · 3",
      showRetry: true,
    },
    syncing: {
      bg: "rgba(245,158,11,0.15)",
      color: "#f59e0b",
      border: "rgba(245,158,11,0.3)",
      icon: <RefreshCw size={14} style={{ minWidth: 14, animation: "spin 1s linear infinite" }} />,
      label: "Syncing…",
      showRetry: false,
    },
    synced: {
      bg: "rgba(16,185,129,0.13)",
      color: "#10b981",
      border: "rgba(16,185,129,0.3)",
      icon: <span style={{ fontSize: 13 }}>✓</span>,
      label: "Synced ✓",
      showRetry: false,
    },
    pending: {
      bg: "rgba(245,158,11,0.12)",
      color: "#f59e0b",
      border: "rgba(245,158,11,0.25)",
      icon: <RefreshCw size={14} style={{ minWidth: 14 }} />,
      label: "3 pending",
      showRetry: false,
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

function Sidebar({ syncState }: { syncState: PillState }) {
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
      background: "#0f172a",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      display: "flex", flexDirection: "column",
      padding: "16px 12px",
      gap: 4,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 20px" }}>
        <Activity size={28} color="#10b981" />
        <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#f1f5f9" }}>
          Physio<span style={{ color: "#10b981" }}>Sync</span>
        </h2>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {navItems.map((item) => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px", borderRadius: 10,
            background: item.active ? "rgba(16,185,129,0.15)" : "transparent",
            color: item.active ? "#10b981" : "#94a3b8",
            fontSize: "0.9rem", fontWeight: item.active ? 600 : 400,
            cursor: "pointer",
          }}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Sync pill */}
      <SyncPill state={syncState} />

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", color: "#64748b", fontSize: "0.9rem", cursor: "pointer", marginTop: 4 }}>
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
  const states: PillState[] = ["offline", "syncing", "synced", "pending"];
  const stateLabels: Record<PillState, string> = {
    offline: "Offline — 3 changes queued",
    syncing: "Syncing with server",
    synced: "Just synced (3s flash)",
    pending: "Online but 3 still pending",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0f172a", minHeight: "100vh", padding: "24px 24px" }}>
      <style>{spinKeyframes}</style>

      <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
        Sidebar Sync Indicator — All States
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {states.map((state) => (
          <div key={state} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.05em", fontWeight: 600 }}>
              {stateLabels[state]}
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", height: 340, display: "flex" }}>
              <Sidebar syncState={state} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
