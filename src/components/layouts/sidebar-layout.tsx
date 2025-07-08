import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth";
import {
  LogOut,
  User,
  Book,
  ClipboardList,
  CalendarClock,
  Video,
  Loader2,
} from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { useSidebarTabs, tabs } from "@/hooks/useSidebarTabs";

const icons = {
  Profile: <User size={16} />,
  Assignment: <Book size={16} />,
  Attendance: <ClipboardList size={16} />,
  Routine: <CalendarClock size={16} />,
  "Join Class": <Video size={16} />,
};

export const SidebarLayout = ({
  onTabChange,
}: {
  onTabChange: (tab: string) => void;
}) => {
  const { userRole } = useAuthStore();
  const { logout, isLoading } = useLogout();
  const { activeTab, handleTabClick } = useSidebarTabs();

  return (
    <Sidebar>
      <SidebarHeader>
        <header className="text-2xl font-bold p-5 bg-zinc-800 text-white rounded-lg text-center">
          MLeC
        </header>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup className="m-0 p-0">
          <SidebarGroupLabel className="text-zinc-400 capitalize">
            {userRole || "Student"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabs.map(({ label }) => (
                <SidebarMenuItem key={label}>
                  <Button
                    variant={activeTab === label ? "default" : "ghost"}
                    className="justify-start w-11/12 ml-3 gap-2"
                    onClick={() => handleTabClick(label, onTabChange)}
                  >
                    {icons[label as keyof typeof icons]}
                    <span>{label}</span>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          className="bg-zinc-800 text-white hover:bg-zinc-700 w-11/12 mx-auto gap-2"
          onClick={logout}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            <LogOut size={16} />
          )}
          {isLoading ? "Logging out..." : "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
