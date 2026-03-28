"use client";
import React from "react";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Analytics & Reports</h1>
                    <p className="text-slate-500 text-sm mt-1">Generate comprehensive insights into student performance, faculty efficiency, and school growth.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Popular Reports</h4>
                    <ul className="space-y-3">
                        {["Student Enrollment Trends", "Fee Collection Summary", "Staff Performance Audit", "Regional Compliance Report"].map(report => (
                            <li key={report} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-[#4CAF50]/5 cursor-pointer transition-colors group">
                                <span className="text-sm font-bold text-slate-700 group-hover:text-[#4CAF50]">{report}</span>
                                <div className="text-[10px] font-black text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest bg-white">PDF / CSV</div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <BarChart3 className="w-16 h-16 text-slate-100 mb-4" />
                    <h4 className="text-lg font-bold text-slate-800">Advanced Analytics</h4>
                    <p className="text-slate-500 text-sm mt-1 max-w-xs">Visual charts and interactive data tables will appear once the system collects more operational data.</p>
                </div>
            </div>
        </div>
    );
}
