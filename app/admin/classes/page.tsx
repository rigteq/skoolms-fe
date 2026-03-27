"use client";

import {
    GraduationCap,
    BookOpen,
    Users,
    Search,
    Plus, Edit, Trash2
} from "lucide-react";
import { useState } from "react";

export default function ClassesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Classes Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage class structures, academic years, and assigned teachers.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-5 py-2.5 bg-[#3b71ca] text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 font-bold text-sm group"
                >
                    <Plus className="w-4.5 h-4.5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add New Class
                </button>
            </div>

            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Filter classes by name or teacher..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all shadow-sm font-medium"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3b71ca] flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Total Classes</p>
                            <p className="text-sm font-bold text-slate-800">12 Active</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                    { name: "Class 10-A", year: "2024-25", teacher: "Rahul Sharma", students: 35, bg: "from-blue-500 to-indigo-600" },
                    { name: "Class 11-B", year: "2024-25", teacher: "Amit Kumar", students: 40, bg: "from-emerald-500 to-teal-600" },
                    { name: "Class 12-C", year: "2024-25", teacher: "Neha Singh", students: 30, bg: "from-amber-500 to-orange-600" },
                    { name: "Class 9-D", year: "2024-25", teacher: "John Doe", students: 38, bg: "from-rose-500 to-pink-600" },
                    { name: "Class 10-B", year: "2023-24", teacher: "Rahul Sharma", students: 32, bg: "from-violet-500 to-purple-600" },
                    { name: "Class 11-A", year: "2023-24", teacher: "Amit Kumar", students: 36, bg: "from-cyan-500 to-sky-600" },
                ].map((cls, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-[#3b71ca]/30 hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                        <div className={`h-1.5 bg-gradient-to-r ${cls.bg}`}></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#3b71ca] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit"><Edit className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#3b71ca] transition-colors tracking-tight">{cls.name}</h3>
                            <div className="inline-flex items-center px-2.5 py-1 bg-slate-100/80 text-slate-500 rounded-lg text-[10px] font-extrabold uppercase tracking-widest mb-6 border border-slate-200/50">
                                Batch {cls.year}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5" /> Class Teacher
                                    </span>
                                    <span className="text-sm font-bold text-slate-700">{cls.teacher}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5" /> Total Students
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]" style={{ width: `${(cls.students/40)*100}%` }}></div>
                                        </div>
                                        <span className="text-sm font-bold text-slate-800">{cls.students}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Class Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div 
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Assign New Class</h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">Define a new academic structure.</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </div>

                        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Class Name <span className="text-red-500">*</span></label>
                                    <input 
                                        required 
                                        type="text" 
                                        placeholder="e.g. Class 10-A" 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Academic Year <span className="text-red-500">*</span></label>
                                    <select 
                                        required 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="2023-24">2023-24</option>
                                        <option value="2024-25">2024-25</option>
                                        <option value="2025-26">2025-26</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Assign Class Teacher (Optional)</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer">
                                        <option value="">No Teacher Assigned</option>
                                        {["Rahul Sharma", "Amit Kumar", "Neha Singh"].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 flex items-center justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 max-w-[160px] py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50"
                                >
                                    Create Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
