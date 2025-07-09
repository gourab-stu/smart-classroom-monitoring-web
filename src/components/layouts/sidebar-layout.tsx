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
import { LogOut, Loader2 } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { useSidebarTabs } from "@/hooks/useSidebarTabs";
import {
  icons as studentIcons,
  tabs as studentTabs,
} from "../roles/student-tabs";
import {
  icons as teacherIcons,
  tabs as teacherTabs,
} from "../roles/teacher-tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const tabs = {
  student: studentTabs,
  teacher: teacherTabs,
};

const icons = {
  student: studentIcons,
  teacher: teacherIcons,
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
              {tabs[userRole?.toLowerCase()].map(({ label }) => (
                <SidebarMenuItem key={label}>
                  <Button
                    variant={activeTab === label ? "default" : "ghost"}
                    className="justify-start w-11/12 ml-3 gap-2"
                    onClick={() => handleTabClick(label, onTabChange)}
                  >
                    {
                      icons[userRole?.toLowerCase()][
                        label as keyof typeof icons
                      ]
                    }
                    <span>{label}</span>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-zinc-800 text-white hover:bg-zinc-700 w-11/12 mx-auto gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <LogOut size={16} />
              )}
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout? You will need to log in again
                to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={logout} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Continue"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
};
