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
    Plus, Edit, Trash2, Filter, CheckCircle, XCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AttendancePage() {
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
                        <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                            <div className="relative w-full md:w-80">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                <input type="text" placeholder="Search student..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] transition-all bg-white" />
                            </div>
                            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                                <input type="date" defaultValue="2026-03-26" className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] text-slate-700 font-medium font-sans" />
                                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] text-slate-700 font-medium w-full md:w-auto">
                                    <option value="10A">Class 10A</option>
                                    <option value="10B">Class 10B</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Student Name</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs hidden sm:table-cell">Class</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs hidden sm:table-cell">Date</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[1, 2, 3, 4, 5].map((item, index) => (
                                        <tr key={item} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden mr-3 flex-shrink-0 border border-slate-200">
                                                        <img src={`https://i.pravatar.cc/150?img=${item + 30}`} alt="Student" className="object-cover w-full h-full" />
                                                    </div>
                                                    <span className="font-semibold text-slate-800">Student Name {item}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell font-medium text-slate-600">10A</td>
                                            <td className="px-6 py-4 text-slate-500 hidden sm:table-cell text-xs font-medium">Mar 26, 2026</td>
                                            <td className="px-6 py-4">
                                                {index === 2 ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200 shadow-sm">
                                                        <XCircle className="w-3.5 h-3.5 mr-1" /> Absent
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200 shadow-sm">
                                                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Present
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#3b71ca] hover:text-blue-800 font-semibold text-xs px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors border border-blue-100">Toggle</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
