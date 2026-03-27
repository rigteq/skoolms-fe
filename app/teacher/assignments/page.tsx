"use client";

import { useState } from "react";
import { useSearchContext } from "../SearchContext";
import { BookOpen, Search, Filter, MoreVertical } from "lucide-react";

export default function AssignmentsPage() {
  const { searchQuery } = useSearchContext();
  const [localSearch, setLocalSearch] = useState("");

  const [assignments] = useState([
    { id: 1, studentName: "Aditya Verma", class: "10th Grade Math", marks: "85/100", assignmentNumber: "ASG-001", date: "2024-03-20" },
    { id: 2, studentName: "Priya Singh", class: "12th Grade Science", marks: "Pending", assignmentNumber: "ASG-004", date: "2024-03-21" },
    { id: 3, studentName: "Rahul Sharma", class: "11th Grade physics", marks: "92/100", assignmentNumber: "ASG-002", date: "2024-03-19" },
    { id: 4, studentName: "Sanya Gupta", class: "9th Grade Math", marks: "78/100", assignmentNumber: "ASG-003", date: "2024-03-22" },
    { id: 5, studentName: "Arjun Mehta", class: "10th Grade Math", marks: "Pending", assignmentNumber: "ASG-001", date: "2024-03-20" },
    { id: 6, studentName: "Ishita Rao", class: "12th Grade Science", marks: "88/100", assignmentNumber: "ASG-004", date: "2024-03-21" },
  ]);

  const query = localSearch || searchQuery;
  const filteredAssignments = assignments.filter(asg =>
    asg.studentName.toLowerCase().includes(query.toLowerCase()) ||
    asg.class.toLowerCase().includes(query.toLowerCase()) ||
    asg.assignmentNumber.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[#4CAF50]" />
            Student Assignments
          </h1>
          <p className="text-slate-500 mt-1">Manage and track student assignment submissions</p>
        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:border-[#4CAF50] outline-none transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900 font-bold">{filteredAssignments.length}</span> assignments
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4 border-b border-slate-100">Assignment ID</th>
                <th className="px-6 py-4 border-b border-slate-100">Student Name</th>
                <th className="px-6 py-4 border-b border-slate-100">Class</th>
                <th className="px-6 py-4 border-b border-slate-100">Received Marks</th>
                <th className="px-6 py-4 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssignments.map((asg) => (
                <tr key={asg.id} className="hover:bg-green-50/10 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-[#4CAF50] bg-green-50 px-2 py-1 rounded-lg">
                      {asg.assignmentNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{asg.studentName}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Submitted on {asg.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 font-medium">{asg.class}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${asg.marks === 'Pending' ? 'text-amber-600 bg-amber-50 px-3 py-1 rounded-full' : 'text-[#388E3C] bg-green-50 px-3 py-1 rounded-full'}`}>
                      {asg.marks}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#4CAF50] hover:bg-green-50 rounded-lg transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAssignments.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No assignments found</h3>
            <p className="text-slate-500">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
