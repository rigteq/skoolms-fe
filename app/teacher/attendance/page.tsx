"use client";

import { useState } from "react";
import { useSearchContext } from "../SearchContext";
import { ClipboardCheck, Search, ArrowLeft, ArrowRight, User } from "lucide-react";

export default function AttendancePage() {
  const { searchQuery } = useSearchContext();
  const [localSearch, setLocalSearch] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date("2026-03-27"));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const adjustDate = (days: number) => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + days);
    setCurrentDate(nextDate);
  };

  const [students] = useState([
    { id: 1, name: "Aditya Verma", class: "10th Grade Math", email: "aditya.v@example.com", totalAttendance: "98%" },
    { id: 2, name: "Priya Singh", class: "10th Grade Math", email: "priya.s@example.com", totalAttendance: "92%" },
    { id: 3, name: "Rahul Sharma", class: "10th Grade Math", email: "rahul.sh@example.com", totalAttendance: "95%" },
    { id: 4, name: "Sanya Gupta", class: "10th Grade Math", email: "sanya.g@example.com", totalAttendance: "88%" },
    { id: 5, name: "Arjun Mehta", class: "10th Grade Math", email: "arjun.m@example.com", totalAttendance: "94%" },
    { id: 6, name: "Ishita Rao", class: "10th Grade Math", email: "ishita.r@example.com", totalAttendance: "96%" },
    { id: 7, name: "Deepak Chopra", class: "10th Grade Math", email: "deepak.c@example.com", totalAttendance: "85%" },
    { id: 8, name: "Meera Reddy", class: "10th Grade Math", email: "meera.r@example.com", totalAttendance: "97%" },
  ]);

  const query = localSearch || searchQuery;
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.email.toLowerCase().includes(query.toLowerCase())
  );

  const stats = {
    total: students.length,
    present: students.filter(s => parseFloat(s.totalAttendance) > 90).length,
    critical: students.filter(s => parseFloat(s.totalAttendance) < 80).length,
  };

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-[#4CAF50]" />
            Total Attendance Record
          </h1>
          <p className="text-slate-500 mt-1">Viewing cumulative attendance performance for all students</p>
        </div>
        <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
          <button onClick={() => adjustDate(-1)} className="p-2 text-slate-400 hover:text-[#4CAF50] transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <span className="px-4 font-bold text-slate-700 min-w-[160px] text-center">{formatDate(currentDate)}</span>
          <button onClick={() => adjustDate(1)} className="p-2 text-slate-400 hover:text-[#4CAF50] transition-colors"><ArrowRight className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:border-[#4CAF50] transition-all">
          <span className="text-slate-500 text-sm font-medium mb-1">Total Students</span>
          <span className="text-3xl font-extrabold text-slate-800">{stats.total}</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:border-[#4CAF50] transition-all">
          <span className="text-slate-500 text-sm font-medium mb-1 text-green-600">Above 90% Attendance</span>
          <span className="text-3xl font-extrabold text-[#388E3C]">{stats.present}</span>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:border-[#4CAF50] transition-all">
          <span className="text-slate-500 text-sm font-medium mb-1 text-red-600">Below 80% (Critical)</span>
          <span className="text-3xl font-extrabold text-red-500">{stats.critical}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:border-[#4CAF50] outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-8 py-5 border-b border-slate-100">Student Info</th>
                <th className="px-6 py-5 border-b border-slate-100">Class</th>
                <th className="px-6 py-5 border-b border-slate-100 text-right">Total Attendance Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/10 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                         <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{student.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-600">{student.class}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className={`text-lg font-bold ${parseFloat(student.totalAttendance) > 90 ? 'text-[#388E3C]' : parseFloat(student.totalAttendance) < 80 ? 'text-red-500' : 'text-slate-700'}`}>
                        {student.totalAttendance}
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden text-[0px]">.
                        <div 
                          className={`h-full rounded-full ${parseFloat(student.totalAttendance) > 90 ? 'bg-[#4CAF50]' : parseFloat(student.totalAttendance) < 80 ? 'bg-red-500' : 'bg-amber-400'}`}
                          style={{ width: student.totalAttendance }}
                        />
                      </div>
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
