import { useAuthStore } from "@/store/auth";
import {
  AssignmentTab,
  AttendanceTab,
  JoinClassTab,
  ProfileTab as StudentProfileTab,
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
import {
  ProfileTab as TeacherProfileTab,
  AssignmentTab as TeacherAssignmentTab,
} from "@/components/roles/teacher-tabs";
// import { AdminTabs } from "@/components/roles/admin-tabs";
// import { SuperAdminTabs } from "@/components/roles/super-admin-tabs";

export const Dashboard = () => {
  const { userRole } = useAuthStore(); // assume role is stored after OTP verification
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
      <SidebarProvider>
        <SidebarLayout onTabChange={setActiveTab} />
        <SidebarInset className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-teal-600 to-cyan-950 text-white">
          <header className="text-2xl font-bold p-5 text-white grid grid-cols-10">
            <SidebarTrigger />
            <h1 className="text-center col-span-8">MLeC</h1>
          </header>
          <Separator />
          <div className="p-8">
            {userRole === "student" && activeTab === "Profile" && (
              <StudentProfileTab />
            )}
            {userRole === "student" && activeTab === "Assignment" && (
              <AssignmentTab />
            )}
            {userRole === "student" && activeTab === "Attendance" && (
              <AttendanceTab />
            )}
            {userRole === "student" && activeTab === "Routine" && (
              <RoutineTab />
            )}
            {userRole === "student" && activeTab === "Join Class" && (
              <JoinClassTab />
            )}
            {userRole === "teacher" && activeTab === "Profile" && (
              <TeacherProfileTab />
            )}
            {userRole === "teacher" && activeTab === "Assignment" && (
              <TeacherAssignmentTab />
            )}
            {/* {userRole === "teacher" && <TeacherTabs />}
          {userRole === "admin" && <AdminTabs />}
          {userRole === "super-admin" && <SuperAdminTabs />} */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
