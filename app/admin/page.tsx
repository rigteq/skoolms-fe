"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";




export default function AdminDashboard() {
  const router = useRouter();
  //This stores dashboard values. Initially everything is 0 (default values). After API call → real data will come and replace this.
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingFees: 0,
    attendanceToday: 0,
    latestStudents: [] as any[],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  //This is for loading screen. When page loads → loading is true. After API complete → loading is false Used to show loading UI.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token → redirect to login
    if (!token) {
      router.replace("/");
    }

    // Prevent back button after logout
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
      }
    };

    // Prevent browser cache
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.replace("/login");
          return;
        }

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
        const now = new Date();

        const startOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0, 0, 0, 0
        ).toISOString();

        const endOfDay = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23, 59, 59, 999
        ).toISOString();

        const studentRes = await fetch(
          `http://localhost:5000/api/students?limit=5&sort=created_at:desc&created_at_gte=${startOfDay}&created_at_lte=${endOfDay}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (studentRes.ok) {
          const studentResult = await studentRes.json();

          const students = Array.isArray(studentResult)
            ? studentResult
            : studentResult?.data?.students ?? [];

          const now = new Date();

          // last 5 days (today + 4 previous days)
          const fiveDaysAgo = new Date();
          fiveDaysAgo.setDate(now.getDate() - 4);
          fiveDaysAgo.setHours(0, 0, 0, 0);

          const filteredStudents = students.filter((student: any) => {
            const d = new Date(student.created_at);
            return d >= fiveDaysAgo;
          });

          setDashboardData(prev => ({
            ...prev,
            latestStudents: filteredStudents
              .sort((a: any, b: any) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
              )
              .slice(0, 5)
          }));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  //  Helpers
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
          <button
            onClick={() => router.push("/admin/reports")}
            className="px-4 py-2 text-[#3b71ca] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 font-medium text-sm transition shadow-sm"
          >
            Generate Reports
          </button>
          <button
            onClick={() => router.push("/admin/students?openModal=true")}
            className="px-4 py-2 bg-[#3b71ca] text-white rounded-lg shadow-md hover:bg-blue-700 transition font-medium text-sm">
            + Add New Student
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Students",
            value: dashboardData.totalStudents,
            trend: "+12%",
          },
          {
            label: "Total Teachers",
            value: dashboardData.totalTeachers,
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
