import { useState, useEffect } from "react";
import { 
  Activity, Calendar, Mic, BrainCircuit, Bone, Watch, MonitorSmartphone, 
  Settings, LogOut, WifiOff, RefreshCw, CheckCircle, Wifi, User, 
  ChevronDown, CloudOff, Trash2, Video, Home, Stethoscope, Sun, Moon, 
  Plus, Search, Info
} from "lucide-react";

type SyncState = "offline" | "syncing" | "synced" | "pending";
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

const INITIAL_APPOINTMENTS: Appointment[] = [
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
  {
    id: "124",
    patient: "Asha Patel",
    time: "02:15 PM",
    date: "2026-06-23",
    duration: "60 min",
    type: "Home Visit",
    treatment: "Knee Osteoarthritis Post-op",
    status: "Confirmed",
    notes: "Post-op week 4. Focus on passive range of motion and quadriceps activation. Keep swelling under monitoring.",
  }
];

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);
  const [syncState, setSyncState] = useState<SyncState>("offline");
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [expandedId, setExpandedId] = useState<string | null>("temp-1719120000000");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // New appointment form state
  const [newPatient, setNewPatient] = useState("");
  const [newTime, setNewTime] = useState("09:00 AM");
  const [newType, setNewType] = useState("OPD");
  const [newTreatment, setNewTreatment] = useState("General Assessment");

  // Sync state transitions simulation helper
  const triggerSyncFlow = () => {
    setSyncState("syncing");
    setTimeout(() => {
      // Resolve pending appointments
      setAppointments(prev => 
        prev.map(app => 
          app.pending 
            ? { ...app, pending: false, status: "Confirmed", id: app.id.replace("temp-", "id-") }
            : app
        )
      );
      setSyncState("synced");
      setTimeout(() => {
        setSyncState("pending"); // Idle online state
      }, 3000);
    }, 2000);
  };

  // Sync state controller effect for automatic offline warning
  useEffect(() => {
    // Sync document class for dark mode
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.trim()) return;

    const newApp: Appointment = {
      id: `temp-${Date.now()}`,
      patient: newPatient,
      time: newTime,
      date: "2026-06-23",
      duration: "30 min",
      type: newType,
      treatment: newTreatment,
      status: "Pending",
      notes: "Newly created offline draft. Waiting for synchronization with cloud DB.",
      pending: true
    };

    setAppointments(prev => [newApp, ...prev]);
    setExpandedId(newApp.id);
    setNewPatient("");
    setShowAddForm(false);
    setSyncState("offline");
  };

  const handleDelete = (id: string) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const handleConfirm = (id: string) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: "Confirmed" } : app)
    );
  };

  // Filtered appointments
  const filteredApps = appointments.filter(app => 
    app.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = (status: AppStatus) => {
    if (status === "Confirmed") return "border-emerald-500 text-emerald-500 bg-emerald-500/10";
    if (status === "Pending") return "border-amber-500 text-amber-500 bg-amber-500/10";
    return "border-rose-500 text-rose-500 bg-rose-500/10";
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="flex min-h-screen">
        
        {/* SIDEBAR */}
        <aside className={`w-64 flex-shrink-0 border-r transition-colors duration-300 flex flex-col p-4 justify-between ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
          <div className="flex flex-col gap-6">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 px-2 py-1">
              <Activity className="h-7 w-7 text-emerald-500" />
              <h2 className="text-xl font-bold tracking-tight">
                Physio<span className="text-emerald-500">Sync</span>
              </h2>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-1">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-500 bg-emerald-500/10 font-semibold cursor-pointer">
                <Calendar className="h-5 w-5" />
                <span>Appointments</span>
              </div>
              {[
                { icon: <Activity className="h-5 w-5" />, label: "Dashboard" },
                { icon: <Mic className="h-5 w-5" />, label: "Voice Notes" },
                { icon: <BrainCircuit className="h-5 w-5" />, label: "AI Rx Planner" },
                { icon: <Bone className="h-5 w-5" />, label: "3D Anatomy" },
                { icon: <Watch className="h-5 w-5" />, label: "Wearable Sync" },
                { icon: <MonitorSmartphone className="h-5 w-5" />, label: "Tele-Rehab" },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium cursor-pointer transition-colors ${isDark ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer & Sync Indicators */}
          <div className="flex flex-col gap-4">
            
            {/* Dynamic Sync Pill */}
            <div className={`p-3 rounded-xl border flex flex-col gap-2 ${
              syncState === "offline" ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
              syncState === "syncing" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
              syncState === "synced" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
              "bg-slate-500/10 border-slate-500/20 text-slate-400"
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                {syncState === "offline" && <WifiOff className="h-3.5 w-3.5" />}
                {syncState === "syncing" && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                {syncState === "synced" && <CheckCircle className="h-3.5 w-3.5" />}
                {syncState === "pending" && <Wifi className="h-3.5 w-3.5" />}
                <span>
                  {syncState === "offline" && "Offline Mode"}
                  {syncState === "syncing" && "Syncing Data"}
                  {syncState === "synced" && "Synced Successfully"}
                  {syncState === "pending" && "Online · Connected"}
                </span>
              </div>
              <p className={`text-[11px] font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {syncState === "offline" && "Changes saved locally. Sync required."}
                {syncState === "syncing" && "Uploading pending local records…"}
                {syncState === "synced" && "All records are up to date."}
                {syncState === "pending" && "Monitoring for incoming updates."}
              </p>
              {syncState === "offline" && (
                <button 
                  onClick={triggerSyncFlow}
                  className="mt-1 w-full py-1.5 px-2 rounded-lg bg-rose-500 text-white font-semibold text-xs hover:bg-rose-600 transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="h-3 w-3" /> Sync Queue
                </button>
              )}
            </div>

            <hr className={isDark ? "border-slate-800" : "border-slate-200"} />

            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors ${isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"}`}>
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-rose-500 hover:text-rose-600 cursor-pointer">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* TOP BANNER */}
          {syncState !== "pending" && (
            <div className={`flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium border-b animate-fade-in ${
              syncState === "offline" ? "bg-rose-500 text-white border-rose-600" :
              syncState === "syncing" ? "bg-amber-500 text-white border-amber-600" :
              "bg-emerald-500 text-white border-emerald-600"
            }`}>
              {syncState === "offline" && (
                <>
                  <WifiOff className="h-4 w-4 shrink-0" />
                  <span>You are currently offline. Changes will sync automatically when the connection returns.</span>
                </>
              )}
              {syncState === "syncing" && (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                  <span>Connection restored! Syncing your local changes with the database…</span>
                </>
              )}
              {syncState === "synced" && (
                <>
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>All local modifications synced successfully!</span>
                </>
              )}
            </div>
          )}

          {/* MAIN HEADER */}
          <header className={`px-6 py-4 border-b flex items-center justify-between transition-colors duration-300 ${isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"}`}>
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="search" 
                  placeholder="Search appointments, patients or diagnosis…" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${isDark ? "bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-slate-700" : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-300"}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Simulation Quick Trigger */}
              <button 
                onClick={() => setSyncState(prev => prev === "offline" ? "pending" : "offline")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  syncState === "offline" 
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500/20" 
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
                }`}
              >
                {syncState === "offline" ? <WifiOff className="h-3.5 w-3.5" /> : <Wifi className="h-3.5 w-3.5" />}
                {syncState === "offline" ? "Go Online" : "Go Offline"}
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg border transition-colors ${isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700" : "bg-slate-100 border-slate-200 hover:bg-slate-200"}`}
              >
                {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-indigo-600" />}
              </button>
            </div>
          </header>

          {/* DASHBOARD CONTENT BODY */}
          <main className="flex-1 p-6 overflow-y-auto">
            
            {/* Welcome banner / summary */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Physiotherapy Appointments</h1>
                <p className="text-sm text-slate-400">Manage daily sessions, track sync progress, and record offline logs.</p>
              </div>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add Appointment
              </button>
            </div>

            {/* Simulated offline state notice bar */}
            {appointments.some(app => app.pending) && syncState === "offline" && (
              <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 flex items-start gap-3">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold">Pending Synchronization:</span> You have created appointments while offline. These are stored locally and will sync when you hit the <span className="font-bold">Sync Queue</span> button in the sidebar or trigger a connection restore.
                </div>
              </div>
            )}

            {/* Add Appointment Overlay / Inline Form */}
            {showAddForm && (
              <form onSubmit={handleAddAppointment} className={`mb-6 p-5 rounded-xl border animate-slide-down ${isDark ? "bg-slate-900 border-slate-850" : "bg-white border-slate-200"}`}>
                <h3 className="text-lg font-bold mb-4">New Appointment Request</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">Patient Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={newPatient}
                      onChange={(e) => setNewPatient(e.target.value)}
                      className={`px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">Time</label>
                    <select 
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className={`px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                    >
                      {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">Type</label>
                    <select 
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className={`px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                    >
                      {["OPD Visit", "Tele-Rehab", "Home Visit"].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">Diagnosis/Treatment</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Spine Mobilization"
                      value={newTreatment}
                      onChange={(e) => setNewTreatment(e.target.value)}
                      className={`px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"}`}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border ${isDark ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"}`}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-sm"
                  >
                    Create (Offline Draft)
                  </button>
                </div>
              </form>
            )}

            {/* DASHBOARD LAYOUT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Appointments List */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Active Schedule ({filteredApps.length})
                </h3>

                {filteredApps.length === 0 ? (
                  <div className={`p-8 text-center rounded-xl border ${isDark ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500"}`}>
                    No appointments found matching your filters.
                  </div>
                ) : (
                  filteredApps.map((app) => (
                    <div 
                      key={app.id} 
                      className={`border-l-[5px] rounded-r-xl border transition-all duration-200 ${
                        app.status === "Confirmed" ? "border-l-emerald-500" :
                        app.status === "Pending" ? "border-l-amber-500" : "border-l-rose-500"
                      } ${isDark ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-200"} ${
                        expandedId === app.id ? "shadow-lg shadow-black/10" : "hover:border-slate-300 dark:hover:border-slate-800"
                      }`}
                    >
                      {/* Main Card Header */}
                      <div 
                        onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                        className="flex items-center justify-between p-4 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* Time & Duration */}
                          <div className="w-20 shrink-0">
                            <p className="font-bold text-sm">{app.time}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{app.duration}</p>
                          </div>
                          {/* Patient Name & Treatment */}
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm flex items-center gap-2 flex-wrap">
                              <User className="h-4 w-4 text-emerald-500 shrink-0" />
                              <span className="truncate">{app.patient}</span>
                              {app.pending && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                  <CloudOff className="h-2.5 w-2.5" /> Pending Sync
                                </span>
                              )}
                            </h4>
                            <p className="text-xs text-slate-400 mt-0.5 truncate">{app.treatment}</p>
                          </div>
                        </div>

                        {/* Status Badges & Trigger */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${statusColor(app.status)}`}>
                            {app.status}
                          </span>
                          <button 
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isDark ? "border-slate-800 text-slate-400 bg-slate-950 hover:bg-slate-800" : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                            }`}
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedId === app.id ? "rotate-180" : ""}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Section */}
                      {expandedId === app.id && (
                        <div className={`p-4 border-t flex flex-col gap-3.5 transition-colors ${isDark ? "bg-slate-950/60 border-slate-850" : "bg-slate-50/60 border-slate-150"}`}>
                          <div className="flex items-start gap-2.5">
                            <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-purple-400 mt-0.5">
                              {app.type === "Tele-Rehab" && <Video className="h-3.5 w-3.5" />}
                              {app.type === "Home Visit" && <Home className="h-3.5 w-3.5" />}
                              {app.type === "OPD" && <Stethoscope className="h-3.5 w-3.5" />}
                              <span>{app.type}</span>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-400">
                            {app.notes}
                          </p>
                          
                          {/* Expanded Card Action Bar */}
                          <div className="flex gap-2 flex-wrap pt-2">
                            {app.status === "Pending" && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleConfirm(app.id); }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-3 rounded-lg text-xs transition flex items-center gap-1"
                              >
                                <CheckCircle className="h-3.5 w-3.5" /> Confirm
                              </button>
                            )}
                            <button 
                              onClick={(e) => { e.stopPropagation(); }}
                              className={`font-semibold py-1.5 px-3 rounded-lg text-xs border ${
                                isDark ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              Start Session
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(app.id); }}
                              className="text-rose-500 hover:bg-rose-500/10 font-semibold py-1.5 px-3 rounded-lg text-xs flex items-center gap-1 transition"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Right Column: Patients List & Legend */}
              <div className="flex flex-col gap-6">
                
                {/* Patient Roster */}
                <div className={`p-4 rounded-xl border flex flex-col gap-4 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Patient Directory
                  </h3>
                  
                  <div className="flex flex-col gap-1 divide-y divide-slate-800/60 dark:divide-slate-800/60">
                    {appointments.map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          {/* Circle initials avatar */}
                          <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/20">
                            {app.patient.split(" ").map(w => w[0]).join("").toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-205 flex items-center gap-1.5">
                              <span className="truncate">{app.patient}</span>
                              {app.pending && (
                                <span className="inline-flex items-center text-amber-500 shrink-0">
                                  <CloudOff className="h-3 w-3" />
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">{app.treatment}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulation Legend card */}
                <div className={`p-4 rounded-xl border ${
                  isDark ? "bg-slate-900/40 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
                }`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2 flex items-center gap-1.5">
                    <CloudOff className="h-4 w-4" /> Offline Synced State Demo
                  </h4>
                  <p className="text-xs leading-relaxed mb-3">
                    This interactive dashboard replicates the clinical sync architecture. Try:
                  </p>
                  <ol className="text-xs list-decimal pl-4 flex flex-col gap-2 leading-relaxed">
                    <li>Clicking <span className="font-bold">Go Offline</span> in the header to simulate disconnection.</li>
                    <li>Clicking <span className="font-bold">Add Appointment</span> to queue local changes. Notice the <span className="text-amber-500">Pending Sync</span> badges.</li>
                    <li>Clicking <span className="font-bold">Sync Queue</span> to trigger a restoration flow and witness automatically resolved cloud state updates.</li>
                  </ol>
                </div>
              </div>

            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
