"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Home, BookOpen, CalendarCheck, User, LogOut } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> },
    { name: "Subjects", icon: <BookOpen size={20} /> },
    { name: "Attendance", icon: <CalendarCheck size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Logout", icon: <LogOut size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar */}
      <motion.div initial={{ x: -300 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 70 }} className={`bg-black/40 backdrop-blur-lg p-6 w-64 space-y-6 shadow-xl ${sidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-3xl font-extrabold text-indigo-400 mb-8 tracking-wide">Student Portal</h2>
        <nav className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="flex items-center gap-3 hover:text-indigo-300 transition">
              {item.icon}
              {item.name}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        {/* Mobile Sidebar Toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden mb-4 bg-indigo-600 p-2 rounded-full">
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        <h1 className="text-4xl font-extrabold mb-10 text-indigo-300 tracking-wide">Welcome, Student! 👋</h1>

        {/* Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            { title: "Total Attendance", value: "92%", color: "text-green-400" },
            { title: "Subjects", value: "5", color: "text-blue-400" },
            { title: "Assignments Due", value: "2", color: "text-yellow-400" },
            { title: "Today's Classes", value: "3", color: "text-pink-400" },
            { title: "Profile Completion", value: "85%", color: "text-indigo-400" },
          ].map((card, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="bg-black/30 backdrop-blur-md p-6 rounded-3xl shadow-xl hover:shadow-indigo-500/30 border border-gray-700">
              <h2 className="text-lg font-semibold mb-2 text-gray-300">{card.title}</h2>
              <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
