"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //This stores dashboard values. Initially everything is 0 (default values). After API call → real data will come and replace this.
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalStaff: 0,
    pendingFees: 0,
    attendanceToday: 0,
    latestStudents: [] as any[],
  });

  //This is for loading screen. When page loads → loading is true. After API complete → loading is false Used to show loading UI.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Fetch summary stats
        const res = await fetch("http://localhost:5000/api/insights/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            setDashboardData((prev) => ({ ...prev, ...result.data }));
          }
        }

        // Fetch latest students separately if not in summary
        const studentRes = await fetch(
          "http://localhost:5000/api/students?limit=5&sort=created_at:desc",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (studentRes.ok) {
          const studentResult = await studentRes.json();
          if (studentResult.success) {
            setDashboardData((prev) => ({
              ...prev,
              latestStudents: studentResult.data.students || studentResult.data,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  //   Helpers
  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const now = new Date();

    // Check if it's today
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }

    // Check if it's yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const avatarColors = [
    "indigo",
    "pink",
    "teal",
    "blue",
    "violet",
    "emerald",
    "amber",
    "rose",
  ];

  //   Loading UI

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b71ca]"></div>
        <p className="ml-3 text-lg font-semibold text-slate-600">
          Loading data...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          Admin Overview
        </h1>
        <div className="space-x-4">
          <button className="px-4 py-2 text-[#3b71ca] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 font-medium text-sm transition shadow-sm">
            Generate Reports
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#3b71ca] text-white rounded-lg shadow-md hover:bg-blue-700 transition font-medium text-sm"
          >
            + Add New Student
          </button>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] border border-slate-100">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                  Add New Student
                </h2>
                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">
                  Register a new student and parent portal access.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form
              className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar"
              onSubmit={(e) => {
                e.preventDefault();
                setIsModalOpen(false);
              }}
            >
              {/* Basic Information */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                  <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Michael Scott"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. michael@student.edu"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="e.g. +1 234-567-890"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 font-bold cursor-pointer"
                    />
                  </div>
                </div>
              </section>

              {/* Academic & Parent Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                      Academic
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Assigned Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                    >
                      <option value="">Select Class</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                </section>
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                      Parent Info
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                        Parent Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Robert Scott"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                        Parent Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="e.g. +1 987-654-321"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Address Details */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
                      Address Details
                    </h3>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-[#3b71ca] focus:ring-[#3b71ca]/20 cursor-pointer"
                    />
                    <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-tight">
                      Same as Current
                    </span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Current Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Full street address..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all resize-none font-medium placeholder:text-slate-400"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                      Permanent Address
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Full street address..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all resize-none font-medium placeholder:text-slate-400"
                    ></textarea>
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Students",
            value: dashboardData.totalStudents,
            trend: "+12%",
          },
          {
            label: "Total Staff",
            value: dashboardData.totalStaff,
            trend: "+2",
          },
          {
            label: "Pending Fees",
            value: `₹${dashboardData.pendingFees}`,
            textClass: "text-red-500",
            trend: "-5%",
          },
          {
            label: "Attendance Today",
            value: `${dashboardData.attendanceToday}%`,
            textClass: "text-green-500",
            trend: "+0.4%",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {stat.label}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${stat.trend.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
              >
                {stat.trend}
              </span>
            </div>
            <span
              className={`text-3xl font-bold mt-4 ${stat.textClass || "text-slate-800"}`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Latest Student Enrollments
            </h2>
            <Link
              href="/admin/students"
              className="text-sm text-[#3b71ca] font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[11px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50/50 border-y border-slate-100">
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Grade</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-50">
                {dashboardData.latestStudents?.length > 0 ? (
                  dashboardData.latestStudents.slice(0, 5).map((student, i) => {
                    const initial = getInitials(student.full_name);
                    const color = avatarColors[i % avatarColors.length];
                    return (
                      <tr
                        key={student.id || i}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="font-semibold text-slate-800 py-4 px-6 flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full bg-${color}-100 text-${color}-700 flex items-center justify-center font-bold mr-3 text-xs shadow-sm border border-${color}-200`}
                          >
                            {initial}
                          </div>
                          {student.full_name}
                        </td>
                        <td className="text-slate-600 py-4 px-6 font-medium">
                          {student.class_name || "N/A"}
                        </td>
                        <td className="text-slate-500 py-4 px-6">
                          {formatDate(student.created_at)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      No recent enrollments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex-none">
            Quick Actions
          </h2>
          <div className="flex-1 space-y-5">
            {[
              {
                title: "Send Notice",
                desc: "Broadcast message to parents or staff",
                icon: "📢",
              },
              {
                title: "Fee Reminders",
                desc: "Automate pending fee SMS alerts",
                icon: "💰",
              },
              {
                title: "Generate ID Cards",
                desc: "Bulk print student ID templates",
                icon: "🆔",
              },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full text-left px-6 py-5 rounded-2xl border border-slate-100 bg-slate-50/30 hover:border-blue-300 hover:bg-blue-50/50 transition-all group flex gap-4 items-center"
              >
                <span className="text-3xl opacity-90 group-hover:scale-110 transition-transform shrink-0">
                  {action.icon}
                </span>
                <div>
                  <span className="block font-bold text-slate-800 group-hover:text-blue-700 text-base">
                    {action.title}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block font-medium leading-relaxed">
                    {action.desc}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            View Analytics Dash
          </button>
        </div>
      </div>
    </>
  );
}
