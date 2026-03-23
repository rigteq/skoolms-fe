"use client";

import { LogOut, Users, Settings, Activity, FileText, Bell, Search, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuperadminDashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Image src="/skoolms.png" alt="Logo" width={120} height={30} className="object-contain w-auto h-auto" priority/>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-3 bg-[#4CAF50]/10 text-[#4CAF50] rounded-lg font-medium">
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Users className="w-5 h-5 mr-3" /> All Schools
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Activity className="w-5 h-5 mr-3" /> System Metrics
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <FileText className="w-5 h-5 mr-3" /> Billing & Subs
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
            <Settings className="w-5 h-5 mr-3" /> Settings
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
            <input type="text" placeholder="Search across schools..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none transition-all" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4CAF50] to-[#2E7D32] text-white flex items-center justify-center font-bold text-sm shadow-md">
              SA
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Superadmin Overview</h1>
              <p className="text-slate-500 mt-1">Manage all tenant schools and system health.</p>
            </div>
            <button className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg shadow-md hover:bg-[#43A047] transition-colors font-medium text-sm">
              + Onboard School
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Total Schools", value: "142", trend: "+12%" },
              { label: "Active Users", value: "482.4K", trend: "+5.4%" },
              { label: "Monthly Revenue", value: "$1.2M", trend: "+8%" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                <div className="flex items-center align-bottom mt-2">
                  <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
                  <span className="text-green-500 text-sm font-semibold ml-3 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent School Registrations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-100 text-sm">
                    <th className="pb-3 font-medium">School Name</th>
                    <th className="pb-3 font-medium">Admin Email</th>
                    <th className="pb-3 font-medium">Plan</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { name: "Greenwood High", email: "admin@greenwood.edu", plan: "Enterprise", status: "Active" },
                    { name: "Oakland Academy", email: "principal@oakland.org", plan: "Pro", status: "Pending Setup" },
                    { name: "Silver Oak International", email: "hello@silveroak.in", plan: "Enterprise", status: "Active" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-4 font-medium text-slate-800">{row.name}</td>
                      <td className="py-4 text-slate-500">{row.email}</td>
                      <td className="py-4 text-slate-600">{row.plan}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
