"use client";

import { useState } from "react";
import { useSearchContext } from "../../SearchContext";
import { ClipboardCheck, CheckCircle2, XCircle, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MarkAttendancePage() {
  const { searchQuery } = useSearchContext();
  const [localSearch, setLocalSearch] = useState("");
  const router = useRouter();

  const [students, setStudents] = useState([
    { id: 1, name: "Aditya Verma", status: "pending" },
    { id: 2, name: "Priya Singh", status: "pending" },
    { id: 3, name: "Rahul Sharma", status: "pending" },
    { id: 4, name: "Sanya Gupta", status: "pending" },
    { id: 5, name: "Arjun Mehta", status: "pending" },
    { id: 6, name: "Ishita Rao", status: "pending" },
  ]);

  const toggleStatus = (id: number, newStatus: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const query = localSearch || searchQuery;
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = () => {
    const markedData = students.filter(s => s.status !== "pending");
    console.log("Submitted Attendance:", markedData);
    router.push("/teacher/attendance");
  };

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <Link href="/teacher" className="flex items-center text-slate-500 hover:text-[#4CAF50] mb-4 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-[#4CAF50]" />
            Mark Today&apos;s Attendance
          </h1>
          <p className="text-slate-500 mt-1">Record student presence for today&apos;s classes</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="px-8 py-3.5 bg-[#4CAF50] text-white rounded-2xl shadow-lg font-bold hover:bg-[#43a047] transition-all hover:scale-[1.02] active:scale-95 shadow-green-200"
        >
           Submit Attendance Report
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student by name..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:border-[#4CAF50] outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-8 py-5 border-b border-slate-100">Name of the student</th>
                <th className="px-6 py-5 border-b border-slate-100 text-center">Marks Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/10 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-slate-800 text-lg">{student.name}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => toggleStatus(student.id, "present")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                          student.status === "present" 
                            ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-100" 
                            : "bg-white border-slate-100 text-slate-400 hover:border-green-200 hover:text-green-600"
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" /> Present
                      </button>
                      <button 
                        onClick={() => toggleStatus(student.id, "absent")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                          student.status === "absent" 
                            ? "bg-red-500 border-red-500 text-white shadow-md shadow-red-100" 
                            : "bg-white border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-600"
                        }`}
                      >
                        <XCircle className="w-5 h-5" /> Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
