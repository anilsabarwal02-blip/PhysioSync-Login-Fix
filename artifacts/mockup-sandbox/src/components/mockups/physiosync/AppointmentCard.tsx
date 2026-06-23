import { useState } from "react";
import { User, ChevronDown, CloudOff, CheckCircle, Trash2, Video, Stethoscope, Home, Sun, Moon } from "lucide-react";

const animations = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
`;

interface Theme {
  bg: string;
  card: string;
  cardExpanded: string;
  expandedBg: string;
  border: string;
  text: string;
  muted: string;
  subtle: string;
  rowBg: string;
  rowBorder: string;
  avatarBg: string;
  notesBg: string;
  notesBorder: string;
  toggleBg: string;
  toggleBorder: string;
  labelText: string;
  shadow: string;
}

const dark: Theme = {
  bg: "#0f172a",
  card: "rgba(255,255,255,0.03)",
  cardExpanded: "rgba(255,255,255,0.06)",
  expandedBg: "rgba(255,255,255,0.03)",
  border: "rgba(255,255,255,0.08)",
  text: "#f1f5f9",
  muted: "#94a3b8",
  subtle: "#64748b",
  rowBg: "rgba(255,255,255,0.03)",
  rowBorder: "rgba(255,255,255,0.05)",
  avatarBg: "rgba(16,185,129,0.15)",
  notesBg: "rgba(245,158,11,0.08)",
  notesBorder: "rgba(245,158,11,0.2)",
  toggleBg: "#1e293b",
  toggleBorder: "rgba(255,255,255,0.1)",
  labelText: "#94a3b8",
  shadow: "0 4px 24px rgba(0,0,0,0.4)",
};

const light: Theme = {
  bg: "#f1f5f9",
  card: "#ffffff",
  cardExpanded: "#f8fafc",
  expandedBg: "#f1f5f9",
  border: "rgba(0,0,0,0.08)",
  text: "#0f172a",
  muted: "#64748b",
  subtle: "#94a3b8",
  rowBg: "#ffffff",
  rowBorder: "rgba(0,0,0,0.05)",
  avatarBg: "rgba(13,148,136,0.1)",
  notesBg: "rgba(245,158,11,0.06)",
  notesBorder: "rgba(245,158,11,0.2)",
  toggleBg: "#e2e8f0",
  toggleBorder: "rgba(0,0,0,0.1)",
  labelText: "#64748b",
  shadow: "0 2px 12px rgba(0,0,0,0.08)",
};

type AppStatus = "Confirmed" | "Pending" | "Cancelled";

interface Appointment {
  id: string;
  patient: string;
  time: string;
  date: string;
  duration: string;
  type: string;
  treatment: string;
  status: AppStatus;
  notes: string;
  pending?: boolean;
}

function statusColor(status: AppStatus) {
  if (status === "Confirmed") return "#10b981";
  if (status === "Pending") return "#f59e0b";
  return "#ef4444";
}

function typeIcon(type: string) {
  if (type === "Tele-Rehab") return <Video size={15} />;
  if (type === "Home Visit") return <Home size={15} />;
  return <Stethoscope size={15} />;
}

function typeColor(type: string) {
  if (type === "Tele-Rehab") return "#a78bfa";
  if (type === "Home Visit") return "#10b981";
  return "#0d9488";
}

function AppCard({ app, expanded, theme }: { app: Appointment; expanded?: boolean; theme: Theme }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      borderRadius: 14,
      borderLeft: `5px solid ${statusColor(app.status)}`,
      border: `1px solid ${theme.border}`,
      borderLeftWidth: 5,
      overflow: "hidden",
      background: expanded ? theme.cardExpanded : theme.card,
      boxShadow: expanded ? theme.shadow : "none",
      transition: "background 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", gap: 16, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ minWidth: 70 }}>
            <p style={{ margin: 0, fontWeight: 700, color: theme.text, fontSize: "1rem" }}>{app.time}</p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: theme.subtle }}>{app.date} · {app.duration}</p>
          </div>
          <div>
            <h4 style={{ margin: "0 0 4px", fontSize: "1.05rem", color: theme.text, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <User size={16} color="#10b981" />
              {app.patient}
              {app.pending && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "2px 9px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 700,
                  background: "rgba(245,158,11,0.12)", color: "#d97706",
                  border: "1px solid rgba(245,158,11,0.3)"
                }}>
                  <CloudOff size={10} /> Pending Sync
                </span>
              )}
            </h4>
            <p style={{ margin: "0 0 6px", fontSize: "0.85rem", color: theme.muted }}>{app.treatment}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: typeColor(app.type), fontWeight: 600 }}>
              {typeIcon(app.type)} {app.type}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span style={{
            padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600,
            background: `${statusColor(app.status)}18`, color: statusColor(app.status),
            border: `1px solid ${statusColor(app.status)}40`
          }}>{app.status}</span>
          <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, border: "1px solid #0d9488", color: "#10b981", background: "transparent", fontSize: "0.82rem", cursor: "pointer", fontWeight: 500 }}>
            Details <ChevronDown size={13} />
          </button>
        </div>
      </div>
      {expanded && (
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${theme.border}`, background: theme.expandedBg, display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn 0.3s ease" }}>
          <p style={{ margin: 0, fontSize: "0.88rem", color: theme.muted, lineHeight: 1.6 }}>{app.notes}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button style={{ padding: "7px 16px", borderRadius: 8, background: "#10b981", color: "white", border: "none", fontWeight: 600, fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <CheckCircle size={14} /> Confirm
            </button>
            <button style={{ padding: "7px 16px", borderRadius: 8, background: "transparent", border: "1px solid #0d9488", color: "#10b981", fontWeight: 500, fontSize: "0.82rem", cursor: "pointer" }}>
              Start Session
            </button>
            <button style={{ padding: "7px 16px", borderRadius: 8, background: "transparent", border: "1px solid rgba(239,68,68,0.5)", color: "#ef4444", fontWeight: 500, fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PatientRow({ name, condition, pending, theme }: { name: string; condition: string; pending?: boolean; theme: Theme }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${theme.rowBorder}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: theme.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", fontWeight: 700, fontSize: "0.9rem" }}>
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: theme.text, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
            {name}
            {pending && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, background: "rgba(245,158,11,0.12)", color: "#d97706", border: "1px solid rgba(245,158,11,0.3)" }}>
                <CloudOff size={9} /> Pending Sync
              </span>
            )}
          </p>
          <p style={{ margin: 0, fontSize: "0.8rem", color: theme.subtle }}>{condition}</p>
        </div>
      </div>
      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>Pending</span>
    </div>
  );
}

export function AppointmentCard() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? dark : light;

  const appointments: Appointment[] = [
    {
      id: "123",
      patient: "Rahul Mehta",
      time: "10:00 AM",
      date: "2026-06-23",
      duration: "45 min",
      type: "OPD",
      treatment: "Lumbar Disc Herniation",
      status: "Confirmed",
      notes: "Patient reported improvement in lower-back mobility after session 3. Continue with McKenzie protocol.",
    },
    {
      id: "temp-1719120000000",
      patient: "Sara Khan",
      time: "11:30 AM",
      date: "2026-06-23",
      duration: "30 min",
      type: "Tele-Rehab",
      treatment: "Shoulder Rehabilitation",
      status: "Pending",
      notes: "Scheduled appointment. Initial clinical notes pending session execution.",
      pending: true,
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: theme.bg, minHeight: "100vh", padding: "28px", transition: "background 0.3s ease" }}>
      <style>{animations}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ color: theme.labelText, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Appointment Cards + Patient Rows
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

      {/* Appointment cards */}
      <div style={{ color: theme.labelText, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
        Appointment Cards — Pending Sync Badge
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
        {appointments.map((app, i) => (
          <AppCard key={app.id} app={app} expanded={i === 1} theme={theme} />
        ))}
      </div>

      {/* Patient rows */}
      <div style={{ color: theme.labelText, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
        Patient Rows — Dashboard
      </div>
      <div style={{ background: theme.rowBg, borderRadius: 14, border: `1px solid ${theme.border}`, overflow: "hidden", boxShadow: isDark ? "none" : theme.shadow }}>
        <PatientRow name="Rahul Mehta" condition="Lumbar Disc Herniation · Waiting for Assessment" theme={theme} />
        <PatientRow name="Sara Khan" condition="Shoulder Rehabilitation · Waiting for Assessment" pending theme={theme} />
        <PatientRow name="Asha Patel" condition="Knee Osteoarthritis · Waiting for Assessment" pending theme={theme} />
      </div>

      {/* Legend */}
      <div style={{ marginTop: 20, padding: "14px 18px", background: theme.notesBg, borderRadius: 10, border: `1px solid ${theme.notesBorder}`, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <CloudOff size={16} color="#d97706" style={{ marginTop: 2 }} />
        <div>
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#d97706", fontSize: "0.82rem" }}>Pending Sync Badge</p>
          <p style={{ margin: 0, color: theme.muted, fontSize: "0.78rem", lineHeight: 1.5 }}>
            Records created offline get a <code style={{ background: "rgba(245,158,11,0.15)", padding: "1px 5px", borderRadius: 4, fontSize: "0.75rem", color: "#d97706" }}>temp-</code> ID prefix. The amber badge shows until the server saves the record and replaces the ID with a real one.
          </p>
        </div>
      </div>
    </div>
  );
}
