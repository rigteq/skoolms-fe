"use client";

import {
    Search,
    CheckCircle, XCircle
} from "lucide-react";

export default function AttendancePage() {
    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Attendance Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Track and manage student daily attendance records.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/30">
                    <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Search student by name or ID..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] transition-all font-medium placeholder:text-slate-400" 
                        />
                    </div>
                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <input 
                            type="date" 
                            defaultValue="2026-03-26" 
                            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] text-slate-700 font-bold cursor-pointer" 
                        />
                        <select className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] text-slate-700 font-bold w-full md:w-auto cursor-pointer">
                            <option value="10A">Class 10A</option>
                            <option value="10B">Class 10B</option>
                            <option value="11A">Class 11A</option>
                            <option value="11B">Class 11B</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Student Name</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none hidden sm:table-cell">Class</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none hidden sm:table-cell">Date</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Status</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-right leading-none">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                <tr key={item} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden mr-3 flex-shrink-0 border border-slate-200 shadow-sm">
                                                <img src={`https://i.pravatar.cc/150?img=${item + 30}`} alt="Student" className="object-cover w-full h-full" />
                                            </div>
                                            <span className="font-bold text-slate-800 text-sm">Student Name {item}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden sm:table-cell font-bold text-slate-500 uppercase text-[10px] tracking-widest">10A</td>
                                    <td className="px-6 py-4 text-slate-500 hidden sm:table-cell text-xs font-bold uppercase tracking-tighter">Mar 26, 2026</td>
                                    <td className="px-6 py-4">
                                        {index === 2 ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-rose-50 text-rose-600 border border-rose-100 shadow-sm uppercase tracking-widest">
                                                <XCircle className="w-3.5 h-3.5 mr-1" /> Absent
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm uppercase tracking-widest">
                                                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Present
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#3b71ca] hover:text-white font-extrabold text-[10px] px-3 py-1.5 bg-blue-50 hover:bg-[#3b71ca] rounded-lg transition-all border border-blue-100 hover:shadow-lg hover:shadow-blue-200/50 uppercase tracking-widest">Toggle</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-tighter">
                    <span>Attendance Summary: 85% Present</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Prev</button>
                        <button className="px-3 py-1.5 bg-[#3b71ca] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
