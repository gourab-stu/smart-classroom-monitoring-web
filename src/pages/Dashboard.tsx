import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-cyan-950 py-6 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-3xl font-bold text-center text-zinc-200 mb-6 sm:mb-8">
          HELLO STUDENT!
        </h1>

        <Tabs defaultValue="assignment" className="space-y-6 sm:space-y-8">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-emerald-600 border border-gray-500 rounded-xl shadow-md p-0 text-sm sm:text-base">
            <TabsTrigger value="profile"> Profile</TabsTrigger>
            <TabsTrigger value="assignment"> Assignment</TabsTrigger>
            <TabsTrigger value="attendance"> Attendance</TabsTrigger>
            <TabsTrigger value="routine"> Routine</TabsTrigger>
            <TabsTrigger value="joinclass"> Join Class</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-semibold">
                    👤 Basic Information
                  </h2>
                  <ul className="mt-2 text-slate-700 space-y-2 text-sm sm:text-base">
                    <li>
                      <strong>Name:</strong> John Doe
                    </li>
                    <li>
                      <strong>Email:</strong> john@example.com
                    </li>
                    <li>
                      <strong>Roll No:</strong> 21CS102
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-2xl font-semibold">
                    📍 Academic Info
                  </h2>
                  <ul className="mt-2 text-slate-700 space-y-2 text-sm sm:text-base">
                    <li>
                      <strong>Course:</strong> B.Sc. CS (Hons.)
                    </li>
                    <li>
                      <strong>Semester:</strong> 6th
                    </li>
                    <li>
                      <strong>Batch:</strong> 2021-2025
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assignment Tab */}
          <TabsContent value="assignment">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Math", "Science", "AI"].map((subject, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-teal-700">
                      {subject} Assignment
                    </h2>
                    <p className="text-sm text-slate-600 space-y-2 mt-2">
                      Submit by: {["June 30", "July 5", "July 10"][idx]}
                    </p>
                    <button className="mt-4 w-full bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-700 text-sm sm:text-base">
                      Upload
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-green-700">
                    📊 Monthly Attendance
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    June 2025: <strong>89%</strong>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold text-emerald-700">
                    📅 Last Week Summary
                  </h2>
                  <ul className="text-slate-600 mt-2 space-y-2 text-sm sm:text-base">
                    <li>Mon: ✅</li>
                    <li>Tue: ✅</li>
                    <li>Wed: ❌</li>
                    <li>Thu: ✅</li>
                    <li>Fri: ✅</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Routine Tab */}
          <TabsContent value="routine">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold">
                    🕘 Monday - Wednesday
                  </h2>
                  <ul className="text-slate-600 mt-2 space-y-2 text-sm sm:text-base">
                    <li>9 AM - Math</li>
                    <li>10 AM - AI</li>
                    <li>11 AM - Computer Graphics</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold">
                    🕘 Thursday - Friday
                  </h2>
                  <ul className="text-slate-600 mt-2 space-y-1 text-sm sm:text-base">
                    <li>9 AM - DBMS</li>
                    <li>10 AM - Python</li>
                    <li>11 AM - Lab</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Join Class Tab */}
          <TabsContent value="joinclass">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold">
                    💻 Google Meet Link
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Click below to join your class:
                  </p>
                  <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base">
                    Join Class
                  </button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-semibold">
                    🔔 Upcoming Classes
                  </h2>
                  <ul className="text-slate-600 mt-2 space-y-1 text-sm sm:text-base">
                    <li>Today 10:00 AM - AI</li>
                    <li>Tomorrow 9:00 AM - Math</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
