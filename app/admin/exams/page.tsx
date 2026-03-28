"use client";

import {
    FileText,
    Calendar,
    Users,
    Plus, Edit
} from "lucide-react";

export default function ExamsPage() {
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Examination Hub</h1>
                    <p className="text-slate-500 text-sm mt-1 font-semibold italic">Schedule, manage, and track school-wide examinations.</p>
                </div>
                <button className="flex items-center px-5 py-3 bg-[#3b71ca] text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 hover:shadow-blue-300 font-bold text-sm tracking-wide">
                    <Plus className="w-5 h-5 mr-2" /> Schedule New Exam
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(item => (
                    <div key={item} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hover:border-[#3b71ca]/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50/50 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
                        
                        <div className="flex justify-between items-start mb-6 relative">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 ring-4 ring-indigo-50 leading-none">
                                <FileText className="w-7 h-7" />
                            </div>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-extrabold text-[10px] border border-emerald-100 shadow-sm uppercase tracking-widest leading-none">Status: Upcoming</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#3b71ca] transition-colors">Mid-Term Examination {item}</h3>
                        <div className="inline-flex px-3 py-1 bg-blue-50 text-[#3b71ca] rounded-lg text-[10px] font-extrabold uppercase tracking-widest border border-blue-100 mb-6">Class 10-A (Science)</div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center text-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 border border-slate-100">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                </div>
                                <span className="font-bold text-slate-600">Oct 15, 2026 - 09:00 AM</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 border border-slate-100">
                                    <Users className="w-4 h-4 text-slate-400" />
                                </div>
                                <span className="font-bold text-slate-600">45 Students • Hall A-12</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50 flex gap-3 relative">
                            <button className="flex-1 px-4 py-3 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all border border-slate-100 flex items-center justify-center uppercase tracking-widest">
                                <Edit className="w-3.5 h-3.5 mr-2" /> Edit
                            </button>
                            <button className="flex-2 px-6 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-xl text-xs font-extrabold transition-all border border-indigo-100 uppercase tracking-widest shadow-sm">Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
