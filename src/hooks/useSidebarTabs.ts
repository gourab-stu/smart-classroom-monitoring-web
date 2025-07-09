import { useState } from "react";

export function useSidebarTabs(defaultTab: string = "Profile") {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab: string, onChange: (tab: string) => void) => {
    setActiveTab(tab);
    onChange(tab);
  };

  return { activeTab, handleTabClick };
}
