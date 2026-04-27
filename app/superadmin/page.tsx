"use client";
import Header from "@/components/Header";
import { useState, ChangeEvent, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  UserPlus,
  ClipboardCheck,
  FileText,
  Calendar,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuperadminDashboard() {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
  });
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/insights/summary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch API");
        }

        const result = await res.json();
        console.log("INSIGHTS RESPONSE:", result);
        if (result.success) {
          setStats({
            totalSchools: result.data?.totalSchools || result.totalSchools || 0,
            totalTeachers: result.data?.totalTeachers || result.totalTeachers || 0,
            totalStudents: result.data?.totalStudents || result.totalStudents || 0,
            totalClasses: result.data?.totalClasses || result.totalClasses || 0,
          });

        } else {
          console.error("API returned error");
        }
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchInsights();
  }, []);

  const [schools, setSchools] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("DASHBOARD SCHOOLS:", data);

        if (data.success) {
          setSchools(data.data);
        }
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const filteredSchools = schools.filter((school) =>
    school.school_name.toLowerCase().includes(search.toLowerCase()) ||
    school.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking tight">
                Welcome to SuperAdmin Dashboard
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium italic">
                Manage your entire school system efficiently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Schools", value: stats.totalSchools },
              { label: "Total Teachers", value: stats.totalTeachers },
              { label: "Total Students", value: stats.totalStudents },
              { label: "Total Classes", value: stats.totalClasses },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
              >
                <span className="text-slate-500 text-sm font-medium">
                  {stat.label}
                </span>

                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Recent School Registrations
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
                <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4 text-left">School Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Address</th>
                    <th className="px-6 py-4 text-left">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 border-b border-slate-50">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          {/* Spinner */}
                          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#4CAF50] animate-spin"></div>

                          <h3 className="text-lg font-bold text-slate-500">
                            Loading Schools...
                          </h3>

                          <p className="text-sm text-slate-400 italic">
                            Fetching school records from server
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredSchools.length > 0 ? (
                    filteredSchools.map((school) => (
                      <tr key={school.id}>
                        <td className="px-6 py-4">{school.school_name || "N/A"}</td>
                        <td className="px-6 py-4">{school.email || "N/A"}</td>
                        <td className="px-6 py-4">{school.phone || "N/A"}</td>
                        <td className="px-6 py-4">{school.address || "N/A"}</td>
                        <td className="px-6 py-4">{school.created_at ? formatDate(school.created_at) : "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-20 text-slate-400 font-semibold">
                        No schools found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
