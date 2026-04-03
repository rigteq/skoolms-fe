"use client";
import React from "react";
import { UserPlus } from "lucide-react";

export default function AdmissionsPage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                    <UserPlus className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admissions Management</h1>
                    <p className="text-slate-500 text-sm mt-1">Track and manage new student applications and enrollment status.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <UserPlus className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Admission Requests</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-sm">New admission applications will appear here once they are submitted through the portal.</p>
            </div>
        </div>
    );
}
