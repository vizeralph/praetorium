export type TabView = "dashboard" | "tickets";

export interface SidebarProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
}
