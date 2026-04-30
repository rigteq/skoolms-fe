"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Phone, Mail } from "lucide-react";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Safe fallback value
  const safeValue = (value: any) => {
    return value === null || value === undefined || value === ""
      ? "N/A"
      : value;
  };

  // Format Date
  const formatDate = (value: any) => {
    if (!value) return "N/A";

    const date = new Date(value);

    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-GB");
  };

  // Normalize Backend Data
  const normalizeStudent = (std: any, index: number) => ({
    id: std.id || index + 1,

    name:
      std.full_name ||
      std.name ||
      std.student_name ||
      "N/A",

    class:
      std.class_name ||
      std.class?.class_name ||
      std.class?.name ||
      std.class ||
      "N/A",

    email:
      std.email ||
      std.student_email ||
      "N/A",

    phone:
      std.phone ||
      std.mobile ||
      std.contact ||
      "N/A",

    created: formatDate(
      std.created_at ||
      std.created ||
      std.createdOn
    ),

    edited: formatDate(
      std.updated_at ||
      std.updated ||
      std.edited ||
      std.updatedOn
    ),
  });

  // Fetch Students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const result = await res.json();

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
      setError(err.message || "Failed to fetch students");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search Filter
  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return students.filter((std) =>
      std.name.toLowerCase().includes(query) ||
      std.class.toLowerCase().includes(query) ||
      std.email.toLowerCase().includes(query) ||
      std.phone.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Students
          </h1>
          <p className="text-sm text-slate-500">
            Manage and view all enrolled students.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />

          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-auto max-h-[550px]">
        <table className="min-w-full text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Class</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Created</th>
              <th className="px-6 py-4 text-left">Edited</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  Loading students...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-red-500 py-8"
                >
                  {error}
                </td>
              </tr>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((std, index) => (
                <tr
                  key={std.id}
                  className="hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-800">
                    {safeValue(std.name)}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-slate-100 px-2 py-1 rounded-md">
                      {safeValue(std.class)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {safeValue(std.email)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {safeValue(std.phone)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {safeValue(std.created)}
                  </td>

                  <td className="px-6 py-4">
                    {safeValue(std.edited)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
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
  );
}