"use client";

import React, { useState } from "react";
import { useDashboard } from "../../../hooks/useDashboard";
import { AddStudentModal } from "../../../components/AddStudentModal";
import { StatsCard } from "../../../components/StatsCard";
import { Table } from "../../../components/Table";
import { QuickActions } from "../../../components/QuickActions";

export default function DashboardPage() {
    const { data, recentStudents, loading, error, refetch } = useDashboard();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
                    <p className="text-sm text-slate-500 mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex space-x-3 w-full sm:w-auto">
                    <button
                        onClick={refetch}
                        className="flex-1 sm:flex-none px-4 py-2 text-[#3b71ca] bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 font-medium text-sm transition focus:ring-2 focus:ring-blue-500/20"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-[#3b71ca] text-white rounded-lg shadow hover:bg-blue-700 transition font-medium text-sm focus:ring-2 focus:ring-blue-500/50"
                    >
                        + Add New Student
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex justify-between items-center">
                    <p className="font-medium text-sm">{error}</p>
                    <button onClick={refetch} className="text-sm underline hover:text-red-800">Try again</button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatsCard
                    label="Total Students"
                    value={data?.totalStudents?.toLocaleString() || "0"}
                    loading={loading}
                />
                <StatsCard
                    label="Total Staff"
                    value={data?.totalStaff?.toLocaleString() || "0"}
                    loading={loading}
                />
                <StatsCard
                    label="Pending Fees"
                    value={`₹${data?.pendingFees?.toLocaleString() || "0"}`}
                    highlightClass="text-rose-500"
                    loading={loading}
                />
                <StatsCard
                    label="Attendance Today"
                    value={`${data?.attendanceToday || 0}%`}
                    highlightClass="text-emerald-500"
                    loading={loading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2 overflow-hidden flex flex-col h-full">
                    <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">Latest Student Enrollments</h2>
                    <div className="flex-1">
                        <Table data={recentStudents} loading={loading} />
                    </div>
                </div>

                <div className="h-full">
                    <QuickActions />
                </div>
            </div>

            <AddStudentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={refetch}
            />
        </div>
    );
}
