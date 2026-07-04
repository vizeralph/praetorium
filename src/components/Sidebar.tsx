import { SidebarProps } from "@/types/navigation";

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-60 border-r border-solid border-r-[#27272a] bg-[#18181b] p-6">
      <h2 className="mb-1 text-xl font-bold">Praetorium</h2>
      <p className="mb-8 text-xs text-[#a1a1aa] italic">Ex chaos, ordo.</p>

      <nav className="flex flex-col gap-2">
        <button
          className={`cursor-pointer rounded-lg border-none p-3 text-left font-bold ${
            activeTab === "dashboard"
              ? "bg-[#fafafa] text-[#09090b]"
              : "bg-transparent text-[#a1a1aa]"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Smart Hub
        </button>
        <button
          className={`cursor-pointer rounded-lg border-none p-3 text-left font-bold ${
            activeTab === "tickets"
              ? "bg-[#fafafa] text-[#09090b]"
              : "bg-transparent text-[#a1a1aa]"
          }`}
          onClick={() => setActiveTab("tickets")}
        >
          Family IT Helpdesk
        </button>
      </nav>
    </aside>
  );
}
