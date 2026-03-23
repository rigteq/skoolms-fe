"use client";

import { LogOut, Users, Settings, Briefcase, GraduationCap, Calendar, DollarSign, LayoutDashboard, Search, Bell } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Image src="/skoolms.png" alt="Logo" width={110} height={28} className="object-contain w-auto h-auto" priority />
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center px-4 py-3 bg-[#3b71ca]/10 text-[#3b71ca] rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <GraduationCap className="w-5 h-5 mr-3" /> Students
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Users className="w-5 h-5 mr-3" /> Staff & Teachers
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Calendar className="w-5 h-5 mr-3" /> Timetable
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Briefcase className="w-5 h-5 mr-3" /> Exams & Results
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <DollarSign className="w-5 h-5 mr-3" /> Fees Management
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Settings className="w-5 h-5 mr-3" /> Configurations
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
            <input type="text" placeholder="Search student by ID or Name..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#3b71ca] outline-none transition-all" />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6 border-slate-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-800">John Principal</p>
                <p className="text-xs text-slate-500">Greenwood High Admin</p>
              </div>
              <div className="w-9 h-9 text-blue-800 font-bold bg-blue-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm hover:scale-105 transition-transform">
                JP
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
            <div className="space-x-4">
              <button className="px-4 py-2 text-[#3b71ca] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 font-medium text-sm transition">Generate Reports</button>
              <button className="px-4 py-2 bg-[#3b71ca] text-white rounded-lg shadow hover:bg-blue-700 transition font-medium text-sm">+ Add New Student</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Students", value: "3,248" },
              { label: "Total Staff", value: "184" },
              { label: "Pending Fees", value: "$45.2K", textClass: "text-red-500" },
              { label: "Attendance Today", value: "96.4%", textClass: "text-green-500" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                <span className={`text-3xl font-bold mt-3 ${stat.textClass || 'text-slate-800'}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Latest Student Enrollments</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-slate-500 font-medium border-b border-slate-100">
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Grade</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="font-semibold text-slate-800 py-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-3 text-xs">AS</div>
                      Arjun Sharma
                    </td>
                    <td className="text-slate-600 py-4">10th Grade</td>
                    <td className="text-slate-500 py-4">Today, 10:45 AM</td>
                    <td className="text-right py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Enrolled</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="font-semibold text-slate-800 py-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold mr-3 text-xs">MP</div>
                      Meera Patel
                    </td>
                    <td className="text-slate-600 py-4">8th Grade</td>
                    <td className="text-slate-500 py-4">Yesterday</td>
                    <td className="text-right py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">Docs Pending</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="font-semibold text-slate-800 py-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold mr-3 text-xs">RJ</div>
                      Rohan Joshi
                    </td>
                    <td className="text-slate-600 py-4">12th Grade</td>
                    <td className="text-slate-500 py-4">Oct 12, 2026</td>
                    <td className="text-right py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Enrolled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex-none">Quick Actions</h2>
              <div className="flex-1 space-y-3">
                <button className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <span className="block font-semibold text-slate-800 group-hover:text-blue-700">Send Notice</span>
                  <span className="text-xs text-slate-500 mt-1 block">Broadcast message to parents or staff</span>
                </button>
                <button className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <span className="block font-semibold text-slate-800 group-hover:text-blue-700">Fee Reminders</span>
                  <span className="text-xs text-slate-500 mt-1 block">Automate pending fee SMS alerts</span>
                </button>
                <button className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <span className="block font-semibold text-slate-800 group-hover:text-blue-700">Generate ID Cards</span>
                  <span className="text-xs text-slate-500 mt-1 block">Bulk print student ID templates</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
