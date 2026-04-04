"use client";

import {
    Users, GraduationCap, ClipboardCheck, DollarSign, Download, PieChart, FileText, Calendar
} from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
    const [reportType, setReportType] = useState("student");
    const [classFilter, setClassFilter] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);

    const handleGenerate = () => {
        setGeneratedReport(reportType);
    };

    const renderTable = () => {
        if (!generatedReport) return null;

        if (generatedReport === "student") {
            return (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Name</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Class</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Admission Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-800">Student {i}</td>
                                    <td className="px-6 py-4">Class {classFilter || "10 A"}</td>
                                    <td className="px-6 py-4">2026-01-0{i}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (generatedReport === "attendance") {
            return (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-800">Student {i}</td>
                                    <td className="px-6 py-4">{dateFrom || "2026-03-01"}</td>
                                    <td className="px-6 py-4"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-bold text-[10px] uppercase">Present</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (generatedReport === "fee") {
            return (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-800">Student {i}</td>
                                    <td className="px-6 py-4">$500</td>
                                    <td className="px-6 py-4"><span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-bold text-[10px] uppercase">Paid</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (generatedReport === "staff") {
            return (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Name</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Role</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest">Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-800">Teacher {i}</td>
                                    <td className="px-6 py-4">Science Teacher</td>
                                    <td className="px-6 py-4">98%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 mr-5">
                        <PieChart className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Generate Reports</h1>
                        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">Generate and export school records.</p>
                    </div>
                </div>
            </div>

            {/* Top Filters */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">From Date</label>
                        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#3b71ca] outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">To Date</label>
                        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#3b71ca] outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class</label>
                        <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#3b71ca] outline-none">
                            <option value="">All Classes</option>
                            <option value="1">Class 1</option>
                            <option value="2">Class 2</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Type</label>
                        <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-[#3b71ca] outline-none font-bold text-[#3b71ca]">
                            <option value="student">Student Report</option>
                            <option value="attendance">Attendance Report</option>
                            <option value="fee">Fee Report</option>
                            <option value="staff">Staff Report</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="button" onClick={handleGenerate} className="px-8 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center cursor-pointer">
                        <FileText className="w-4 h-4 mr-2" /> Generate Report
                    </button>
                </div>
            </div>

            {/* Generated Report Section */}
            {generatedReport && (
                <div className="mt-8 transition-opacity duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-800 capitalize">{generatedReport} Report Results</h2>
                        <div className="flex gap-3">
                            <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-bold text-xs group">
                                <Download className="w-4 h-4 mr-2 text-rose-500 group-hover:-translate-y-0.5 transition-transform" /> Download PDF
                            </button>
                            <button className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all shadow-sm font-bold text-xs group">
                                <Download className="w-4 h-4 mr-2 text-emerald-500 group-hover:-translate-y-0.5 transition-transform" /> Export Excel
                            </button>
                        </div>
                    </div>
                    {renderTable()}
                </div>
            )}
            
            {/* Quick Summary Cards below for when no report is generated, optional */}
            {!generatedReport && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer" onClick={() => {setReportType("student"); setGeneratedReport("student");}}>
                         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                             <GraduationCap className="w-6 h-6" />
                         </div>
                         <h3 className="font-bold text-slate-800">Student Report</h3>
                         <p className="text-xs text-slate-500 mt-1">Total students, new admissions, class-wise count</p>
                     </div>
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer" onClick={() => {setReportType("attendance"); setGeneratedReport("attendance");}}>
                         <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                             <Calendar className="w-6 h-6" />
                         </div>
                         <h3 className="font-bold text-slate-800">Attendance Report</h3>
                         <p className="text-xs text-slate-500 mt-1">Daily / Monthly attendance, attendance %</p>
                     </div>
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer" onClick={() => {setReportType("fee"); setGeneratedReport("fee");}}>
                         <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                             <DollarSign className="w-6 h-6" />
                         </div>
                         <h3 className="font-bold text-slate-800">Fee Report</h3>
                         <p className="text-xs text-slate-500 mt-1">Paid / Pending fees, total collection</p>
                     </div>
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer" onClick={() => {setReportType("staff"); setGeneratedReport("staff");}}>
                         <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                             <Users className="w-6 h-6" />
                         </div>
                         <h3 className="font-bold text-slate-800">Staff Report</h3>
                         <p className="text-xs text-slate-500 mt-1">Total staff, Roles, Attendance</p>
                     </div>
                </div>
            )}
        </>
    );
}
