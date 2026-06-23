import { WifiOff, RefreshCw, CheckCircle, Wifi } from "lucide-react";

const bannerBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "12px 24px",
  fontSize: "0.875rem",
  fontWeight: 500,
  backdropFilter: "blur(8px)",
  borderRadius: 0,
  width: "100%",
};

const spinKeyframes = `
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;

export function OfflineBanner() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0f172a", minHeight: "100vh", padding: 0 }}>
      <style>{spinKeyframes}</style>

      {/* Label */}
      <div style={{ padding: "32px 32px 12px", color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Offline Banner — All States
      </div>

      {/* State 1: OFFLINE */}
      <div style={{ margin: "0 32px 16px", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <div style={{ padding: "6px 16px", background: "#1e293b", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.05em" }}>
          STATE 1 — Offline (2 changes queued)
        </div>
        <div style={{
          ...bannerBase,
          background: "rgba(239, 68, 68, 0.92)",
          color: "#fff",
        }}>
          <WifiOff size={16} />
          <span>You are offline. 2 changes will sync when connection returns.</span>
        </div>
      </div>

      {/* State 2: SYNCING */}
      <div style={{ margin: "0 32px 16px", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <div style={{ padding: "6px 16px", background: "#1e293b", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.05em" }}>
          STATE 2 — Back online, syncing…
        </div>
        <div style={{
          ...bannerBase,
          background: "rgba(245, 158, 11, 0.92)",
          color: "#fff",
        }}>
          <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} />
          <span>Back online — syncing your changes…</span>
        </div>
      </div>

      {/* State 3: SYNCED SUCCESS */}
      <div style={{ margin: "0 32px 16px", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <div style={{ padding: "6px 16px", background: "#1e293b", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.05em" }}>
          STATE 3 — Synced successfully
        </div>
        <div style={{
          ...bannerBase,
          background: "rgba(16, 185, 129, 0.92)",
          color: "#fff",
        }}>
          <CheckCircle size={16} />
          <span>2 changes synced successfully!</span>
        </div>
      </div>

      {/* State 4: PARTIAL FAILURE */}
      <div style={{ margin: "0 32px 16px", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <div style={{ padding: "6px 16px", background: "#1e293b", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.05em" }}>
          STATE 4 — Partial sync (1 failed)
        </div>
        <div style={{
          ...bannerBase,
          background: "rgba(16, 185, 129, 0.92)",
          color: "#fff",
        }}>
          <CheckCircle size={16} />
          <span>1 change synced successfully! (1 failed — will retry)</span>
        </div>
      </div>

      {/* State 5: ONLINE — hidden */}
      <div style={{ margin: "0 32px 16px", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
        <div style={{ padding: "6px 16px", background: "#1e293b", fontSize: "0.7rem", color: "#64748b", letterSpacing: "0.05em" }}>
          STATE 5 — Online (banner hidden)
        </div>
        <div style={{
          ...bannerBase,
          background: "#1e293b",
          color: "#10b981",
          justifyContent: "center",
          gap: 8,
        }}>
          <Wifi size={16} />
          <span style={{ fontSize: "0.8rem" }}>Banner is not rendered — user sees app normally</span>
        </div>
      </div>

      {/* Flow diagram */}
      <div style={{ margin: "8px 32px 24px", padding: "16px", background: "#1e293b", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        {[
          { label: "Offline", color: "#ef4444" },
          { label: "→" },
          { label: "Reconnected", color: "#f59e0b" },
          { label: "→" },
          { label: "Syncing", color: "#f59e0b" },
          { label: "→" },
          { label: "Synced ✓", color: "#10b981" },
        ].map((item, i) =>
          item.label === "→" ? (
            <span key={i} style={{ color: "#475569", fontWeight: 700 }}>→</span>
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
