"use client";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    GraduationCap,
    ClipboardCheck,
    FileText,
    Calendar,
    DollarSign,
    BarChart,
    Settings, LogOut, Search, Bell,
    Download
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
    const router = useRouter();

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <Image src="/skoolms.png" alt="Logo" width={110} height={28} className="object-contain w-auto h-auto" priority />
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

                    <a href="/admin" className="flex items-center px-4 py-3 bg-[#3b71ca]/10 text-[#3b71ca] rounded-lg font-medium">
                        <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                    </a>

                    <Link href="/admin/teachers" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <Users className="w-5 h-5 mr-3" /> Teachers
                    </Link>

                    <Link href="/admin/classes" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <BookOpen className="w-5 h-5 mr-3" /> Classes
                    </Link>

                    <Link href="/admin/students" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <GraduationCap className="w-5 h-5 mr-3" /> Students
                    </Link>

                    <Link href="/admin/attendance" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <ClipboardCheck className="w-5 h-5 mr-3" /> Attendance
                    </Link>

                    <Link href="/admin/exams" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <FileText className="w-5 h-5 mr-3" /> Exams
                    </Link>

                    <Link href="/admin/timetable" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <Calendar className="w-5 h-5 mr-3" /> Timetable
                    </Link>

                    <Link href="/admin/fees" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <DollarSign className="w-5 h-5 mr-3" /> Fees
                    </Link>

                    <Link href="/admin/reports" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <BarChart className="w-5 h-5 mr-3" /> Reports
                    </Link>

                    <Link href="/admin/settings" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 mr-3" /> Settings
                    </Link>

                </nav>
                <div className="p-4 border-t border-slate-100">
                    <button onClick={() => router.push("/")} className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">
                        <LogOut className="w-5 h-5 mr-3" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center w-96 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                        <input type="text" placeholder="Search student by ID or Name..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#3b71ca] outline-none transition-all" />
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l pl-6 border-slate-200 cursor-pointer">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-slate-800">John Principal</p>
                                <p className="text-xs text-slate-500">Greenwood High Admin</p>
                            </div>
                            <div className="w-9 h-9 text-blue-800 font-bold bg-blue-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm hover:scale-105 transition-transform">
                                JP
                            </div>
                        </div>
                    </div>
                </header>
                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Reports Overview</h1>
                        <button className="flex items-center px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-medium">
                            <Download className="w-4 h-4 mr-2" /> Export PDF
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Stats Cards */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#3b71ca]/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Total Students</p>
                                    <h3 className="text-3xl font-bold text-slate-800">1,248</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                    <Users className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 w-fit px-2 py-1 rounded-md"><span className="mr-1">↑ 12%</span> <span className="text-emerald-700/70 font-medium ml-1">vs last month</span></p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Total Teachers</p>
                                    <h3 className="text-3xl font-bold text-slate-800">84</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 w-fit px-2 py-1 rounded-md"><span className="mr-1">↑ 2%</span> <span className="text-emerald-700/70 font-medium ml-1">vs last month</span></p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Avg Attendance</p>
                                    <h3 className="text-3xl font-bold text-slate-800">94.2%</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                                    <ClipboardCheck className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-xs font-medium text-red-600 flex items-center bg-red-50 w-fit px-2 py-1 rounded-md"><span className="mr-1">↓ 1.5%</span> <span className="text-red-700/70 font-medium ml-1">vs last month</span></p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-amber-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
                                    <h3 className="text-3xl font-bold text-slate-800">$124.5k</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                            </div>
                            <p className="text-xs font-medium text-emerald-600 flex items-center bg-emerald-50 w-fit px-2 py-1 rounded-md"><span className="mr-1">↑ 8.4%</span> <span className="text-emerald-700/70 font-medium ml-1">vs last month</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">Revenue Analytics</h3>
                            <div className="h-64 flex items-end gap-2 justify-between">
                                {[30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90].map((h, i) => (
                                    <div key={i} className="w-full bg-blue-100 rounded-t-md hover:bg-[#3b71ca] transition-colors relative group cursor-pointer" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1.5 px-2.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity font-medium z-10 pointer-events-none">${h}k</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Overview</h3>
                            <div className="h-64 flex items-end gap-4 justify-around mt-4">
                                <div className="w-48 h-48 rounded-full border-[24px] border-[#3b71ca] relative flex justify-center items-center shadow-inner">
                                    <div className="absolute w-48 h-48 rounded-full border-[24px] border-emerald-400 border-l-transparent border-b-transparent transform rotate-45"></div>
                                    <div className="text-center z-10 bg-white w-32 h-32 rounded-full flex flex-col justify-center items-center shadow-sm">
                                        <p className="text-3xl font-bold text-slate-800">94%</p>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Present</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center gap-8 mt-8 bg-slate-50 py-4 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#3b71ca] shadow-sm"></div>
                                    <span className="text-sm text-slate-700 font-semibold">Present <span className="text-slate-500 font-normal ml-1">(94%)</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm"></div>
                                    <span className="text-sm text-slate-700 font-semibold">Absent <span className="text-slate-500 font-normal ml-1">(6%)</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
