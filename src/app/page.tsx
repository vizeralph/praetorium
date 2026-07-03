"use client";

import { useState, useEffect } from "react";
import {
  Fan,
  RefreshCw,
  Sparkles,
  LayoutDashboard,
  Ticket,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "tickets">(
    "dashboard",
  );

  // --- FAN STATE ---
  const [isFanOn, setIsFanOn] = useState(false);
  const [lastReset, setLastReset] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00h 00m");

  useEffect(() => {
    if (!lastReset || !isFanOn) {
      setElapsedTime("00h 00m");
      return;
    }
    const calculateElapsed = () => {
      const now = new Date();
      const diffMs = now.getTime() - lastReset.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const pad = (num: number) => String(num).padStart(2, "0");
      setElapsedTime(`${pad(hours)}h ${pad(minutes)}m`);
    };
    calculateElapsed();
    const interval = setInterval(calculateElapsed, 30000);
    return () => clearInterval(interval);
  }, [lastReset, isFanOn]);

  // --- MOCK TICKETING STATE ---
  const [tickets, setTickets] = useState([
    {
      id: 1,
      device: "Printer",
      issue: "Telling me it needs magenta when I am printing black and white.",
      priority: "High",
      status: "Open",
    },
    {
      id: 2,
      device: "Living Room TV",
      issue: "Netflix logged out again.",
      priority: "Medium",
      status: "In Progress",
    },
  ]);
  const [newDevice, setNewDevice] = useState("");
  const [newIssue, setNewIssue] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice || !newIssue) return;
    const ticket = {
      id: Date.now(),
      device: newDevice,
      issue: newIssue,
      priority: newPriority,
      status: "Open",
    };
    setTickets([ticket, ...tickets]);
    setNewDevice("");
    setNewIssue("");
  };

  const handleResolveTicket = (id: number) => {
    setTickets(
      tickets.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t)),
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-50 selection:bg-zinc-800 md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="flex w-full shrink-0 flex-col justify-between border-b border-zinc-800 bg-zinc-900 p-6 md:w-64 md:border-r md:border-b-0">
        <div>
          <div className="mb-8">
            <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
              Praetorium{" "}
              <Sparkles className="h-4 w-4 animate-pulse text-yellow-500" />
            </h1>
            <p className="mt-1 text-xs text-zinc-500 italic">Ex chaos, ordo</p>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-zinc-100 font-bold text-zinc-950"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Smart Hub
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === "tickets"
                  ? "bg-zinc-100 font-bold text-zinc-950"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
              }`}
            >
              <Ticket className="h-4 w-4" />
              Family IT Helpdesk
            </button>
          </nav>
        </div>
        <div className="hidden font-mono text-xs text-zinc-600 md:block">
          v1.0.0 // Local Network
        </div>
      </aside>

      {/* MAIN CONTENT WINDOW */}
      <main className="mx-auto w-full max-w-5xl flex-1 overflow-y-auto p-6 sm:p-12">
        {/* VIEW 1: SMART HUB DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Fan Card Component */}
            <section className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-200">
                    Living Room Fan
                  </h2>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase ${
                      isFanOn
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border border-zinc-700/50 bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {isFanOn ? "Active" : "Idle"}
                  </span>
                </div>
                <div className="relative mb-6 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                  {isFanOn && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-cyan-500/5" />
                  )}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <Fan
                      className={`h-14 w-14 transition-all duration-500 ${isFanOn ? "animate-spin text-emerald-400 [animation-duration:3s]" : "text-zinc-600"}`}
                    />
                    <span className="font-mono text-xs text-zinc-500">
                      [ Fan Image ]
                    </span>
                  </div>
                </div>
                <div className="mb-8 grid grid-cols-2 gap-4 rounded-xl border border-zinc-800/40 bg-zinc-950/50 p-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                      Time Elapsed
                    </p>
                    <p className="font-mono text-2xl font-black tracking-tight text-zinc-100">
                      {elapsedTime}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                      Last Reset
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-zinc-300">
                      {lastReset
                        ? lastReset.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-auto grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => {
                    setLastReset(new Date());
                    setIsFanOn(true);
                  }}
                  className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-zinc-100 font-bold text-zinc-950 shadow-md transition-all hover:bg-zinc-200"
                >
                  <RefreshCw className="h-5 w-5" /> Reset Cycle
                </button>
                <button
                  onClick={() => setIsFanOn(!isFanOn)}
                  className={`flex h-14 items-center justify-center gap-2 rounded-2xl border font-semibold transition-all ${isFanOn ? "border-red-500/30 bg-zinc-900 text-red-400" : "border-zinc-700 bg-zinc-900 text-zinc-300"}`}
                >
                  {isFanOn ? "Turn Off" : "Turn On"}
                </button>
              </div>
            </section>

            {/* Inventory Placeholder */}
            <section className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800/60 bg-zinc-900/40 p-6 text-center">
              <h3 className="text-sm font-semibold tracking-wide text-zinc-400">
                Praetorium Inventory
              </h3>
              <p className="mt-1 max-w-[240px] text-xs text-zinc-500">
                Future modules for refrigerator and pantry cabinet logs go here.
              </p>
            </section>
          </div>
        )}

        {/* VIEW 2: HELP DESK / TICKETING SYSTEM */}
        {activeTab === "tickets" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Family IT Ticket Desk
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Submit issues or track family hardware intervention states.
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {/* Form Block (Parents Submission View) */}
              <form
                onSubmit={handleCreateTicket}
                className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-xl lg:col-span-1"
              >
                <h3 className="text-md font-bold text-zinc-200">
                  Log an Issue
                </h3>
                <div>
                  <label className="mb-1 block text-xs font-medium tracking-wider text-zinc-400 uppercase">
                    Device / Room
                  </label>
                  <input
                    type="text"
                    value={newDevice}
                    onChange={(e) => setNewDevice(e.target.value)}
                    placeholder="e.g., Mom's Phone, House Wi-Fi"
                    className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm transition-colors placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium tracking-wider text-zinc-400 uppercase">
                    What's the issue?
                  </label>
                  <textarea
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    placeholder="Describe what went wrong..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm transition-colors placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium tracking-wider text-zinc-400 uppercase">
                    Urgency
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-300 transition-colors focus:border-zinc-600 focus:outline-none"
                  >
                    <option value="Low">Low - Fix whenever</option>
                    <option value="Medium">Medium - Annoying</option>
                    <option value="High">
                      High - Internet is completely broken
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="mt-2 h-11 w-full rounded-xl bg-zinc-100 text-sm font-bold text-zinc-950 shadow-sm transition-all hover:bg-zinc-200"
                >
                  File Ticket
                </button>
              </form>

              {/* Tickets List View (Your Dashboard Queue) */}
              <div className="space-y-3 lg:col-span-2">
                <h3 className="text-md flex items-center gap-2 font-bold text-zinc-200">
                  Active Interventions
                  <span className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">
                    {tickets.filter((t) => t.status !== "Resolved").length}
                  </span>
                </h3>

                {tickets.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-800 p-8 text-center text-sm text-zinc-500">
                    No active internal family tech issues. Absolute bliss.
                  </div>
                ) : (
                  tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`flex items-start justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900 p-5 transition-opacity duration-300 ${ticket.status === "Resolved" ? "line-through opacity-40" : ""}`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-zinc-200">
                            {ticket.device}
                          </h4>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                              ticket.priority === "High"
                                ? "border border-red-500/20 bg-red-500/10 text-red-400"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-500">
                            Status: {ticket.status}
                          </span>
                        </div>
                        <p className="line-clamp-3 max-w-md text-xs text-zinc-400">
                          {ticket.issue}
                        </p>
                      </div>

                      {ticket.status !== "Resolved" && (
                        <button
                          onClick={() => handleResolveTicket(ticket.id)}
                          className="shrink-0 rounded-xl border border-transparent p-2 text-zinc-500 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-emerald-400"
                          title="Mark as Fixed"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
