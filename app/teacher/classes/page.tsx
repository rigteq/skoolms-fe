"use client";

import { useState, useMemo } from "react";
import { Search, MoreVertical } from "lucide-react";

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [classes] = useState<{ id: number; name: string; teacher: string; students: number; created: string; edited: string; }[]>([]);

  const filteredClasses = useMemo(() => {
    return classes.filter(cls => 
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [classes, searchQuery]);

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and view all classes.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search classes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Class Teacher</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created On</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Edited On</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded inline-block text-sm">{cls.name}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">{cls.teacher}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold text-slate-700">{cls.students}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{cls.created}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{cls.edited}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors inline-block opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 text-slate-300 mb-3" />
                      <p className="text-lg font-medium text-slate-600">No classes found</p>
                      <p className="text-sm mt-1">Try adjusting your search criteria</p>
                    </div>
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
