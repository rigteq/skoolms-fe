"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchContext } from "../../SearchContext";
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Search,
  ArrowLeft,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MarkAttendancePage() {
  const { searchQuery } = useSearchContext();
  const router = useRouter();

  const [localSearch, setLocalSearch] = useState("");
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

    status: "pending",
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
        setError("No token found. Please login.");
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

      console.log("Students API:", result);

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
  // Toggle Attendance Status
  // ===============================
  const toggleStatus = (
    id: number,
    newStatus: string
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
            ...student,
            status: newStatus,
          }
          : student
      )
    );
  };

  // ===============================
  // Search Filter
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
  // Submit Attendance
  // ===============================
  const handleSubmit = async () => {
    try {
      const markedData = students.filter(
        (student) =>
          student.status !== "pending"
      );

      console.log(
        "Submitted Attendance:",
        markedData
      );

      // Future Backend API
      /*
      await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(markedData)
      });
      */

      router.push("/teacher/attendance");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <Link
            href="/teacher"
            className="flex items-center text-slate-500 hover:text-[#4CAF50] mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-[#4CAF50]" />
            Mark Today's Attendance
          </h1>

          <p className="text-slate-500 mt-1">
            Record student presence for
            today's classes
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-[#4CAF50] text-white rounded-2xl font-bold hover:bg-[#43a047]"
        >
          Submit Attendance Report
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search student..."
              value={localSearch}
              onChange={(e) =>
                setLocalSearch(e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase text-slate-500">
                <th className="px-8 py-5">
                  Student
                </th>
                <th className="px-6 py-5">
                  Class
                </th>
                <th className="px-6 py-5 text-center">
                  Mark Attendance
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
              ) : filteredStudents.length >
                0 ? (
                filteredStudents.map(
                  (student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50"
                    >
                      {/* Student */}
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
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

                      {/* Class */}
                      <td className="px-6 py-5 font-medium text-slate-600">
                        {safeValue(
                          student.class
                        )}
                      </td>

                      {/* Buttons */}
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-4">
                          {/* Present */}
                          <button
                            onClick={() =>
                              toggleStatus(
                                student.id,
                                "present"
                              )
                            }
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold border-2 transition ${student.status ===
                                "present"
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-slate-500 border-slate-200 hover:border-green-300"
                              }`}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            Present
                          </button>

                          {/* Absent */}
                          <button
                            onClick={() =>
                              toggleStatus(
                                student.id,
                                "absent"
                              )
                            }
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold border-2 transition ${student.status ===
                                "absent"
                                ? "bg-red-500 text-white border-red-500"
                                : "bg-white text-slate-500 border-slate-200 hover:border-red-300"
                              }`}
                          >
                            <XCircle className="w-5 h-5" />
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
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