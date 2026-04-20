"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchContext } from "../SearchContext";
import {
  ClipboardCheck,
  Search,
  ArrowLeft,
  ArrowRight,
  User,
} from "lucide-react";

export default function AttendancePage() {
  const { searchQuery } = useSearchContext();

  const [localSearch, setLocalSearch] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // Safe Value
  // ===============================
  const safeValue = (value: any) => {
    return value === null || value === undefined || value === ""
      ? "N/A"
      : value;
  };

  // ===============================
  // Date Format
  // ===============================
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // ===============================
  // Change Date
  // ===============================
  const adjustDate = (days: number) => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + days);
    setCurrentDate(next);
  };

  // ===============================
  // Normalize Actual Backend Data
  // ===============================
  const normalizeStudent = (std: any, index: number) => ({
    id: std.id || index + 1,

    name:
      std.full_name ||
      std.name ||
      std.student_name ||
      "N/A",

    email:
      std.email ||
      std.student_email ||
      "N/A",

    class:
      std.class_name ||
      std.class?.class_name ||
      std.class?.name ||
      std.class ||
      "N/A",

    totalAttendance:
      std.totalAttendance ||
      std.attendance ||
      std.attendance_percentage ||
      "0%",
  });

  // ===============================
  // Fetch Actual Students
  // ===============================
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found.");
        return;
      }

      const res = await fetch(
        "http://localhost:5000/api/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const result = await res.json();

      console.log("Attendance API:", result);

      const rawData = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.students)
            ? result.students
            : Array.isArray(result?.result)
              ? result.result
              : [];

      const formatted = rawData.map(normalizeStudent);

      setStudents(formatted);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ===============================
  // Search
  // ===============================
  const query = localSearch || searchQuery;

  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        student.class
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [students, query]);

  // ===============================
  // Stats
  // ===============================
  const stats = {
    total: students.length,

    present: students.filter(
      (s) => parseFloat(s.totalAttendance) >= 90
    ).length,

    critical: students.filter(
      (s) => parseFloat(s.totalAttendance) < 80
    ).length,
  };

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-[#4CAF50]" />
            Total Attendance Record
          </h1>

          <p className="text-slate-500 mt-1">
            Viewing cumulative attendance
            performance for all students
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
          <button
            onClick={() => adjustDate(-1)}
            className="p-2 text-slate-400 hover:text-[#4CAF50]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="px-4 font-bold text-slate-700 min-w-[170px] text-center">
            {formatDate(currentDate)}
          </span>

          <button
            onClick={() => adjustDate(1)}
            className="p-2 text-slate-400 hover:text-[#4CAF50]"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Students"
          value={stats.total}
        />

        <StatCard
          title="Above 90% Attendance"
          value={stats.present}
          color="text-green-600"
        />

        <StatCard
          title="Below 80% (Critical)"
          value={stats.critical}
          color="text-red-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search student..."
              value={localSearch}
              onChange={(e) =>
                setLocalSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase text-slate-500">
                <th className="px-8 py-5">
                  Student Info
                </th>
                <th className="px-6 py-5">
                  Class
                </th>
                <th className="px-6 py-5 text-right">
                  Attendance %
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-8"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-8 text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const percent =
                    parseFloat(
                      student.totalAttendance
                    );

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-500" />
                          </div>

                          <div>
                            <div className="font-bold text-slate-800">
                              {safeValue(
                                student.name
                              )}
                            </div>

                            <div className="text-xs text-slate-400">
                              {safeValue(
                                student.email
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        {safeValue(
                          student.class
                        )}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <div className="inline-flex flex-col items-end">
                          <span
                            className={`font-bold text-lg ${percent >= 90
                                ? "text-green-600"
                                : percent < 80
                                  ? "text-red-500"
                                  : "text-amber-500"
                              }`}
                          >
                            {
                              student.totalAttendance
                            }
                          </span>

                          <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full ${percent >= 90
                                  ? "bg-green-500"
                                  : percent < 80
                                    ? "bg-red-500"
                                    : "bg-amber-400"
                                }`}
                              style={{
                                width:
                                  student.totalAttendance,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-8 text-slate-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({
  title,
  value,
  color = "text-slate-800",
}: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <span className="text-sm text-slate-500 block mb-1">
        {title}
      </span>

      <span className={`text-3xl font-bold ${color}`}>
        {value}
      </span>
    </div>
  );
}