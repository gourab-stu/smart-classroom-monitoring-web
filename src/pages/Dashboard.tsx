import { useAuthStore } from "@/store/auth";
import {
  AssignmentTab,
  AttendanceTab,
  JoinClassTab,
  ProfileTab,
  RoutineTab,
} from "@/components/roles/student-tabs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { SidebarLayout } from "@/components/layouts/sidebar-layout";
import { Separator } from "@/components/ui/separator";
// import { SidebarLayout } from "@/components/layouts/sidebar-layout";
// import { TeacherTabs } from "@/components/roles/teacher-tabs";
// import { AdminTabs } from "@/components/roles/admin-tabs";
// import { SuperAdminTabs } from "@/components/roles/super-admin-tabs";

export const Dashboard = () => {
  const { userRole } = useAuthStore(); // assume role is stored after OTP verification
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
      <SidebarProvider>
        {userRole === "student" && <SidebarLayout onTabChange={setActiveTab} />}
        <SidebarInset className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-teal-600 to-cyan-950 text-white">
          <header className="text-2xl font-bold p-5 text-white grid grid-cols-10">
            <SidebarTrigger />
            <h1 className="text-center col-span-8">MLeC</h1>
          </header>
          <Separator />
          <div className="p-8">
            {activeTab === "Profile" && <ProfileTab />}
            {activeTab === "Assignment" && <AssignmentTab />}
            {activeTab === "Attendance" && <AttendanceTab />}
            {activeTab === "Routine" && <RoutineTab />}
            {activeTab === "Join Class" && <JoinClassTab />}
            {/* {userRole === "teacher" && <TeacherTabs />}
          {userRole === "admin" && <AdminTabs />}
          {userRole === "super-admin" && <SuperAdminTabs />} */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
