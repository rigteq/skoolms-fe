"use client";

import {
    Users,
    GraduationCap,
    ClipboardCheck,
    DollarSign,
    Download,
    TrendingUp,
    TrendingDown,
    Activity,
    PieChart
} from "lucide-react";

export default function ReportsPage() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 mr-5">
                        <PieChart className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Analytics Dashboard</h1>
                        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">Comprehensive school performance reports.</p>
                    </div>
                </div>
                <button className="flex items-center px-6 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl hover:bg-slate-50 transition-all shadow-sm font-extrabold text-xs uppercase tracking-widest group">
                    <Download className="w-4 h-4 mr-3 group-hover:translate-y-1 transition-transform" /> Export Analytics PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {/* Stats Cards */}
                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-100/50 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Total Students</p>
                            <h3 className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">1,248</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#3b71ca] border border-blue-100 shadow-sm leading-none">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center shadow-sm border border-emerald-100 uppercase tracking-widest">
                            <TrendingUp className="w-3 h-3 mr-1" /> 12.5%
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 ml-3 uppercase tracking-tighter italic">vs last month</span>
                    </div>
                </div>

                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Total Faculty</p>
                            <h3 className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">84</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm leading-none">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center shadow-sm border border-emerald-100 uppercase tracking-widest">
                            <TrendingUp className="w-3 h-3 mr-1" /> 2.1%
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 ml-3 uppercase tracking-tighter italic">vs last month</span>
                    </div>
                </div>

                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Attendance</p>
                            <h3 className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">94.2%</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm leading-none">
                            <ClipboardCheck className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-lg flex items-center shadow-sm border border-rose-100 uppercase tracking-widest">
                            <TrendingDown className="w-3 h-3 mr-1" /> 1.5%
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 ml-3 uppercase tracking-tighter italic">vs last month</span>
                    </div>
                </div>

                <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-amber-100/50 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Collection</p>
                            <h3 className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter">$124k</h3>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm leading-none">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center shadow-sm border border-emerald-100 uppercase tracking-widest">
                            <TrendingUp className="w-3 h-3 mr-1" /> 8.4%
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 ml-3 uppercase tracking-tighter italic">vs last month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="flex items-center mb-10">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#3b71ca] mr-4 shadow-sm border border-blue-100">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Revenue Insights (2026)</h3>
                    </div>
                    <div className="h-64 flex items-end gap-3 justify-between pb-4">
                        {[30, 45, 35, 60, 50, 75, 65, 85, 70, 95, 80, 100].map((h, i) => (
                            <div key={i} className="flex-1 min-w-[12px] group relative h-full flex items-end">
                                <div 
                                    className="w-full bg-slate-50 rounded-full hover:bg-gradient-to-t hover:from-[#3b71ca] hover:to-blue-400 transition-all duration-500 cursor-pointer border border-slate-100 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-200" 
                                    style={{ height: `${h}%` }}
                                ></div>
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black py-2 px-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 z-20 pointer-events-none whitespace-nowrap">
                                    ${h}k Monthly
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] border-t border-slate-50 pt-8">
                        <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 relative">
                    <div className="flex items-center mb-10">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mr-4 shadow-sm border border-emerald-100">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Attendance Distribution</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-56 h-56 rounded-full border-[32px] border-[#3b71ca] relative flex justify-center items-center shadow-[inset_0_4px_15px_rgba(0,0,0,0.05)] ring-[24px] ring-slate-50">
                            <div className="absolute w-56 h-56 rounded-full border-[32px] border-emerald-400 border-l-transparent border-b-transparent transform rotate-[45deg] shadow-lg"></div>
                            <div className="text-center z-10 bg-white w-36 h-36 rounded-full flex flex-col justify-center items-center shadow-2xl border border-slate-50">
                                <p className="text-4xl font-black text-slate-800 leading-none">94%</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 leading-none">Student Success</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full mt-16 px-4">
                            <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center group hover:bg-white transition-all cursor-default overflow-hidden relative">
                                <div className="absolute left-0 top-0 w-1.5 h-full bg-[#3b71ca]"></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Present Rate</p>
                                    <p className="text-xl font-black text-slate-800 leading-none">94.2%</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center group hover:bg-white transition-all cursor-default overflow-hidden relative">
                                <div className="absolute left-0 top-0 w-1.5 h-full bg-emerald-400"></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Absent Rate</p>
                                    <p className="text-xl font-black text-slate-800 leading-none">5.8%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
