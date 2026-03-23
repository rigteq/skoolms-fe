"use client";

import { LogOut, LayoutDashboard, Users, CalendarDays, FileSpreadsheet, MessageSquare, ClipboardCheck, BookOpen, Search, Bell } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Image src="/skoolms.png" alt="Logo" width={110} height={28} className="object-contain w-auto h-auto" priority />
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase tracking-wider">Staff</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center px-4 py-3 bg-[#4CAF50]/10 text-[#4CAF50] rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <ClipboardCheck className="w-5 h-5 mr-3" /> Attendance
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Users className="w-5 h-5 mr-3" /> My Classes
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <FileSpreadsheet className="w-5 h-5 mr-3" /> Grades & Reports
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <BookOpen className="w-5 h-5 mr-3" /> Assignments
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <CalendarDays className="w-5 h-5 mr-3" /> Schedule
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5 mr-3" /> Parent Connect
          </a>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={() => router.push("/")} className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center w-96 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input type="text" placeholder="Search resources or students..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#4CAF50] outline-none transition-all" />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-800">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Mathematics Dept.</p>
              </div>
              <div className="w-9 h-9 text-green-800 font-bold bg-green-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm hover:scale-105 transition-transform">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome back, Sarah! 👋</h1>
            <div className="space-x-4">
              <button className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg shadow hover:bg-[#43a047] transition font-medium text-sm flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" /> Mark Today&apos;s Attendance
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <span className="text-slate-500 text-sm font-medium">Classes Today</span>
              <span className="text-3xl font-bold mt-3 text-slate-800">5 <span className="text-lg text-slate-400 font-normal">/ 6</span></span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <span className="text-slate-500 text-sm font-medium">Pending Grading</span>
              <span className="text-3xl font-bold mt-3 text-amber-500">24 <span className="text-sm text-slate-400 font-normal">submissions</span></span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <span className="text-slate-500 text-sm font-medium">Avg Class Attendance</span>
              <span className="text-3xl font-bold mt-3 text-green-500">92%</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <span className="text-slate-500 text-sm font-medium">Next Period</span>
              <span className="text-lg font-bold mt-3 text-slate-700">10th Grade Math <br/><span className="text-xs text-blue-500 font-semibold bg-blue-50 px-2 py-0.5 rounded">11:30 AM</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Classes */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6 flex-none">
                <h2 className="text-lg font-bold text-slate-800">Today&apos;s Schedule</h2>
                <a href="#" className="text-sm text-[#4CAF50] hover:underline font-medium">View Full Timetable</a>
              </div>
              <div className="flex-1 space-y-4">
                {[
                  { time: "09:00 AM", class: "8th Grade Science", room: "Room 102", status: "Completed", type:"past" },
                  { time: "11:30 AM", class: "10th Grade Math", room: "Room 205", status: "Upcoming", type:"next" },
                  { time: "01:00 PM", class: "12th Grade Advanced Calculus", room: "Lab 4", status: "Upcoming", type:"future" },
                  { time: "02:45 PM", class: "9th Grade Math", room: "Room 201", status: "Upcoming", type:"future" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start p-4 rounded-xl border ${item.type === 'next' ? 'border-[#4CAF50] bg-green-50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <div className="text-sm font-bold text-slate-500 w-20 flex-shrink-0 pt-0.5">{item.time}</div>
                    <div className="flex-1 ml-4 border-l-2 border-slate-200 pl-4">
                      <h3 className={`font-semibold ${item.type === 'next' ? 'text-[#388E3C] text-lg' : 'text-slate-800'}`}>{item.class}</h3>
                      <p className="text-sm text-slate-500 mt-1 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-slate-300 mr-2"></span>
                        {item.room}
                      </p>
                    </div>
                    {item.type === 'past' && <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs font-semibold self-start">Done</span>}
                    {item.type === 'next' && <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-semibold self-start flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span> Now</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex-none">Recent Submissions</h2>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {[
                  { name: "Algebra Midterm", from: "10th Grade", status: "Pending Review", count: "32/32" },
                  { name: "Calculus Assignment 4", from: "12th Grade", status: "Reviewed", count: "18/20" },
                  { name: "Weekly Quiz 2", from: "9th Grade Math", status: "Graded", count: "45/45" },
                ].map((task, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:shadow-sm transition-shadow group">
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-[#4CAF50] transition-colors">{task.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">{task.from}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded inline-block mb-1 ${task.status === 'Pending Review' ? 'text-amber-700 bg-amber-100' : 'text-green-700 bg-green-100'}`}>
                        {task.status}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{task.count} received</p>
                    </div>
                  </div>
                ))}

                <button className="w-full mt-4 py-3 border border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-[#4CAF50] hover:text-[#4CAF50] hover:bg-green-50 transition-colors font-semibold text-sm">
                  + Create New Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
