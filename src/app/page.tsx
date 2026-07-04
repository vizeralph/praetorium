"use client";

import { useState } from "react";

import FanTracker from "@/components/dashboard/FanTracker";
import Sidebar from "@/components/Sidebar";

import { TabView } from "@/types/navigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabView>("dashboard");

  return (
    <div className="flex min-h-screen bg-[#09090b] text-[#fafafa]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-10">
        {activeTab === "dashboard" ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            <FanTracker applianceName="Living Room Fan" />
            <FanTracker applianceName="Bedroom Fan" />
            <FanTracker applianceName="Kitchen Fan" />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">Tickets</h1>
            <p>Welcome to the tickets section!</p>
          </div>
        )}
      </main>
    </div>
  );
}
