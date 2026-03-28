"use client";
import React from "react";
import { ClipboardCheck } from "lucide-react";

export default function AttendancePage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                    <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Attendance Tracking</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor daily attendance records for students and staff across all institutions.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <ClipboardCheck className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Attendance Data Available</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-sm">Detailed attendance reports will be visible here once schools begin synchronizing their daily logs.</p>
            </div>
        </div>
    );
}
