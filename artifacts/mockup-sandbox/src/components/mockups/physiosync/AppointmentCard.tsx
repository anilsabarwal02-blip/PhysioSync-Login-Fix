import { User, ChevronDown, Calendar, CloudOff, CheckCircle, Trash2, Video, Stethoscope, Home } from "lucide-react";

const spinKeyframes = `@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`;

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

function AppCard({ app, expanded }: { app: Appointment; expanded?: boolean }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      borderRadius: 14,
      borderLeft: `5px solid ${statusColor(app.status)}`,
      border: `1px solid rgba(255,255,255,0.08)`,
      borderLeftWidth: 5,
      overflow: "hidden",
      background: expanded ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
      boxShadow: expanded ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
    }}>
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", gap: 16, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Time */}
          <div style={{ minWidth: 70 }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#f1f5f9", fontSize: "1rem" }}>{app.time}</p>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{app.date} · {app.duration}</p>
          </div>

          {/* Patient */}
          <div>
            <h4 style={{ margin: "0 0 4px", fontSize: "1.05rem", color: "#f1f5f9", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
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
            <p style={{ margin: "0 0 6px", fontSize: "0.85rem", color: "#94a3b8" }}>{app.treatment}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: typeColor(app.type), fontWeight: 600 }}>
              {typeIcon(app.type)} {app.type}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <span style={{
            padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600,
            background: `${statusColor(app.status)}18`, color: statusColor(app.status),
            border: `1px solid ${statusColor(app.status)}40`
          }}>
            {app.status}
          </span>
          <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, border: "1px solid #0d9488", color: "#10b981", background: "transparent", fontSize: "0.82rem", cursor: "pointer", fontWeight: 500 }}>
            Details <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Expanded area */}
      {expanded && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn 0.3s ease" }}>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6 }}>{app.notes}</p>
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

function PatientRow({ name, condition, pending }: { name: string; condition: string; pending?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10b981", fontWeight: 700, fontSize: "0.9rem" }}>
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 600, color: "#f1f5f9", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
            {name}
            {pending && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 20, fontSize: "0.65rem", fontWeight: 700, background: "rgba(245,158,11,0.12)", color: "#d97706", border: "1px solid rgba(245,158,11,0.3)" }}>
                <CloudOff size={9} /> Pending Sync
              </span>
            )}
          </p>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{condition}</p>
        </div>
      </div>
      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>Pending</span>
    </div>
  );
}

export function AppointmentCard() {
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
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0f172a", minHeight: "100vh", padding: "28px" }}>
      <style>{spinKeyframes}</style>

      {/* Appointments section */}
      <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
        Appointment Cards — Pending Sync Badge
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
        {appointments.map((app, i) => (
          <AppCard key={app.id} app={app} expanded={i === 1} />
        ))}
      </div>

      {/* Patient rows section */}
      <div style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
        Patient Rows — Pending Sync Badge (Dashboard)
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <PatientRow name="Rahul Mehta" condition="Lumbar Disc Herniation · Waiting for Assessment" />
        <PatientRow name="Sara Khan" condition="Shoulder Rehabilitation · Waiting for Assessment" pending />
        <PatientRow name="Asha Patel" condition="Knee Osteoarthritis · Waiting for Assessment" pending />
      </div>

      {/* Legend */}
      <div style={{ marginTop: 24, padding: "14px 18px", background: "rgba(245,158,11,0.08)", borderRadius: 10, border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "flex-start", gap: 12 }}>
        <CloudOff size={16} color="#d97706" style={{ marginTop: 2 }} />
        <div>
          <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#d97706", fontSize: "0.82rem" }}>Pending Sync Badge</p>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.78rem", lineHeight: 1.5 }}>
            Records created offline get a <code style={{ background: "rgba(245,158,11,0.15)", padding: "1px 5px", borderRadius: 4, fontSize: "0.75rem" }}>temp-</code> ID prefix. The amber badge shows until the server saves the record and replaces the ID with a real one.
          </p>
        </div>
      </div>
    </div>
  );
}
