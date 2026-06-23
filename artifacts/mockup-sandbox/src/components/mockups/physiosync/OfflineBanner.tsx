import { useState } from "react";
import { WifiOff, RefreshCw, CheckCircle, Wifi, Sun, Moon } from "lucide-react";

const spinKeyframes = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

interface Theme {
  bg: string;
  card: string;
  labelBg: string;
  labelText: string;
  text: string;
  muted: string;
  border: string;
  toggleBg: string;
  toggleBorder: string;
  onlineBg: string;
  onlineText: string;
  flowBg: string;
}

const dark: Theme = {
  bg: "#0f172a",
  card: "#0f172a",
  labelBg: "#1e293b",
  labelText: "#64748b",
  text: "#f1f5f9",
  muted: "#94a3b8",
  border: "rgba(255,255,255,0.06)",
  toggleBg: "#1e293b",
  toggleBorder: "rgba(255,255,255,0.1)",
  onlineBg: "#1e293b",
  onlineText: "#10b981",
  flowBg: "#1e293b",
};

const light: Theme = {
  bg: "#f1f5f9",
  card: "#ffffff",
  labelBg: "#e2e8f0",
  labelText: "#94a3b8",
  text: "#0f172a",
  muted: "#64748b",
  border: "rgba(0,0,0,0.07)",
  toggleBg: "#e2e8f0",
  toggleBorder: "rgba(0,0,0,0.1)",
  onlineBg: "#e2e8f0",
  onlineText: "#0d9488",
  flowBg: "#e2e8f0",
};

const bannerBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "12px 24px",
  fontSize: "0.875rem",
  fontWeight: 500,
  backdropFilter: "blur(8px)",
  width: "100%",
};

export function OfflineBanner() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? dark : light;

  const states = [
    {
      label: "STATE 1 — Offline (2 changes queued)",
      node: (
        <div style={{ ...bannerBase, background: "rgba(239, 68, 68, 0.92)", color: "#fff" }}>
          <WifiOff size={16} />
          <span>You are offline. 2 changes will sync when connection returns.</span>
        </div>
      ),
    },
    {
      label: "STATE 2 — Back online, syncing…",
      node: (
        <div style={{ ...bannerBase, background: "rgba(245, 158, 11, 0.92)", color: "#fff" }}>
          <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} />
          <span>Back online — syncing your changes…</span>
        </div>
      ),
    },
    {
      label: "STATE 3 — Synced successfully",
      node: (
        <div style={{ ...bannerBase, background: "rgba(16, 185, 129, 0.92)", color: "#fff" }}>
          <CheckCircle size={16} />
          <span>2 changes synced successfully!</span>
        </div>
      ),
    },
    {
      label: "STATE 4 — Partial sync (1 failed)",
      node: (
        <div style={{ ...bannerBase, background: "rgba(16, 185, 129, 0.92)", color: "#fff" }}>
          <CheckCircle size={16} />
          <span>1 change synced successfully! (1 failed — will retry)</span>
        </div>
      ),
    },
    {
      label: "STATE 5 — Online (banner hidden)",
      node: (
        <div style={{ ...bannerBase, background: theme.onlineBg, color: theme.onlineText, justifyContent: "center", gap: 8 }}>
          <Wifi size={16} />
          <span style={{ fontSize: "0.8rem" }}>Banner is not rendered — user sees app normally</span>
        </div>
      ),
    },
  ];

  const flow = [
    { label: "Offline", color: "#ef4444" },
    { label: "→" },
    { label: "Reconnected", color: "#f59e0b" },
    { label: "→" },
    { label: "Syncing", color: "#f59e0b" },
    { label: "→" },
    { label: "Synced ✓", color: "#10b981" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: theme.bg, minHeight: "100vh", padding: "28px", transition: "background 0.3s ease" }}>
      <style>{spinKeyframes}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ color: theme.muted, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Offline Banner — All States
        </div>
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

      {/* States */}
      {states.map((s, i) => (
        <div key={i} style={{ margin: "0 0 14px", borderRadius: 12, overflow: "hidden", boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)", border: `1px solid ${theme.border}` }}>
          <div style={{ padding: "6px 16px", background: theme.labelBg, fontSize: "0.7rem", color: theme.labelText, letterSpacing: "0.05em", fontWeight: 600 }}>
            {s.label}
          </div>
          {s.node}
        </div>
      ))}

      {/* Flow */}
      <div style={{ marginTop: 8, padding: "14px 18px", background: theme.flowBg, borderRadius: 12, border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        {flow.map((item, i) =>
          item.label === "→" ? (
            <span key={i} style={{ color: theme.muted, fontWeight: 700 }}>→</span>
          ) : (
            <span key={i} style={{ padding: "4px 12px", borderRadius: 20, background: `${item.color}20`, color: item.color, fontSize: "0.78rem", fontWeight: 700, border: `1px solid ${item.color}40` }}>
              {item.label}
            </span>
          )
        )}
      </div>
    </div>
  );
}
