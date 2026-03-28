"use client";
import React from "react";
import { FileText } from "lucide-react";

export default function ExamsPage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                    <FileText className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Examination Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Oversee exam schedules, result publishing, and academic performance metrics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Active Exams</p>
                    <h4 className="text-2xl font-black text-slate-800">0</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Upcoming Boards</p>
                    <h4 className="text-2xl font-black text-slate-800">None Scheduled</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Pending Results</p>
                    <h4 className="text-2xl font-black text-slate-800">0 Items</h4>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Exam Records</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-sm">Use this section to create exam schedules and manage grading systems across all schools.</p>
            </div>
        </div>
    );
}
