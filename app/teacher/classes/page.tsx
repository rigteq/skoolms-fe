"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =============================
  // Safe Value
  // =============================
  const safeValue = (val: any) => {
    return val === null || val === undefined || val === ""
      ? "N/A"
      : String(val);
  };

  // =============================
  // Format Date
  // =============================
  const formatDate = (value: any) => {
    if (!value) return "N/A";

    const date = new Date(value);

    if (isNaN(date.getTime())) return "N/A";

    return date.toLocaleDateString("en-GB");
  };

  // =============================
  // Get Correct Teacher Name
  // =============================
  const getTeacherName = (cls: any) => {
    return (
      cls?.class_teacher?.full_name ||
      cls?.class_teacher?.name ||
      cls?.teacher?.full_name ||
      cls?.teacher?.name ||
      cls?.teacher_name ||
      cls?.class_teacher_name ||
      "N/A"
    );
  };

  // =============================
  // Get Student Count
  // =============================
  const getStudents = (cls: any) => {
    return (
      cls?.total_students ||
      cls?.students_count ||
      cls?.students?.length ||
      cls?.studentCount ||
      0
    );
  };

  // =============================
  // Fetch Classes
  // =============================
  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/classes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch classes");
      }

      const result = await res.json();

      console.log("Classes API:", result);

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.classes)
            ? result.classes
            : [];

      const normalized = data.map(
        (cls: any, index: number) => ({
          id: cls?.id || index + 1,

          name:
            cls?.class_name ||
            cls?.name ||
            "N/A",

          teacher: getTeacherName(cls),

          students: getStudents(cls),

          created: formatDate(
            cls?.created_at ||
            cls?.createdAt
          ),

          edited: formatDate(
            cls?.updated_at ||
            cls?.updatedAt
          ),
        })
      );

      setClasses(normalized);
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
        "Something went wrong"
      );

      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // =============================
  // Search
  // =============================
  const filteredClasses = useMemo(() => {
    if (!searchQuery) return classes;

    const q =
      searchQuery.toLowerCase();

    return classes.filter(
      (cls) =>
        cls.name
          .toLowerCase()
          .includes(q) ||
        cls.teacher
          .toLowerCase()
          .includes(q)
    );
  }, [classes, searchQuery]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Classes
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage and view all
            classes.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Name
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Class Teacher
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Total Students
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Created On
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                  Edited On
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center"
                  >
                    Loading classes...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredClasses.length >
                0 ? (
                filteredClasses.map(
                  (cls, index) => (
                    <tr
                      key={
                        cls.id ||
                        index
                      }
                      className="hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 px-3 py-1 rounded-lg text-sm font-semibold">
                          {safeValue(
                            cls.name
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {safeValue(
                          cls.teacher
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {safeValue(
                          cls.students
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {safeValue(
                          cls.created
                        )}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        {safeValue(
                          cls.edited
                        )}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    No classes found
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