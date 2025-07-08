import { useState } from "react";

export const tabs = [
  { label: "Profile", value: "Profile" },
  { label: "Assignment", value: "Assignment" },
  { label: "Attendance", value: "Attendance" },
  { label: "Routine", value: "Routine" },
  { label: "Join Class", value: "Join Class" },
];

export function useSidebarTabs(defaultTab: string = "Profile") {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab: string, onChange: (tab: string) => void) => {
    setActiveTab(tab);
    onChange(tab);
  };

  return { activeTab, handleTabClick };
}
