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
    Plus, Edit, Trash2, Filter
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TimetablePage() {
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
                        <h1 className="text-2xl font-bold text-slate-800">Timetable</h1>
                        <div className="flex gap-3">
                            <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] text-slate-700 font-medium shadow-sm cursor-pointer">
                                <option value="10A">Class 10A</option>
                                <option value="10B">Class 10B</option>
                            </select>
                            <button className="flex items-center px-4 py-2 bg-[#3b71ca] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                <Edit className="w-4 h-4 mr-2" /> Edit Timetable
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto p-0">
                            <table className="w-full text-center text-sm text-slate-600 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-4 border-b border-r border-slate-200 bg-slate-50/80 w-32 font-bold text-slate-700">Day / Period</th>
                                        <th className="p-4 border-b border-r border-slate-200 bg-slate-50/80 font-semibold text-slate-700">1<br/><span className="text-xs font-medium text-slate-500 mt-1 block tracking-wider">08:00 - 08:45</span></th>
                                        <th className="p-4 border-b border-r border-slate-200 bg-slate-50/80 font-semibold text-slate-700">2<br/><span className="text-xs font-medium text-slate-500 mt-1 block tracking-wider">08:45 - 09:30</span></th>
                                        <th className="p-4 border-b border-r border-slate-200 bg-slate-50/80 font-semibold text-slate-700">3<br/><span className="text-xs font-medium text-slate-500 mt-1 block tracking-wider">09:30 - 10:15</span></th>
                                        <th className="p-4 border-b border-r border-slate-200 bg-slate-100 text-slate-500 font-semibold uppercase tracking-widest text-xs">Break<br/><span className="text-xs font-medium mt-1 block">10:15 - 10:30</span></th>
                                        <th className="p-4 border-b border-r border-slate-200 bg-slate-50/80 font-semibold text-slate-700">4<br/><span className="text-xs font-medium text-slate-500 mt-1 block tracking-wider">10:30 - 11:15</span></th>
                                        <th className="p-4 border-b border-slate-200 bg-slate-50/80 font-semibold text-slate-700">5<br/><span className="text-xs font-medium text-slate-500 mt-1 block tracking-wider">11:15 - 12:00</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                        <tr key={day} className="group">
                                            <td className="p-4 border-b border-r border-slate-200 bg-slate-50/50 font-bold text-slate-700">{day}</td>
                                            <td className="p-4 border-b border-r border-slate-200 hover:bg-[#3b71ca]/5 transition-colors cursor-pointer group-hover:bg-slate-50/30">
                                                <p className="font-bold text-[#3b71ca]">Maths</p>
                                                <p className="text-xs font-medium text-slate-500 mt-1">Mr. Smith</p>
                                            </td>
                                            <td className="p-4 border-b border-r border-slate-200 hover:bg-[#3b71ca]/5 transition-colors cursor-pointer group-hover:bg-slate-50/30">
                                                <p className="font-bold text-[#3b71ca]">Science</p>
                                                <p className="text-xs font-medium text-slate-500 mt-1">Mrs. Davis</p>
                                            </td>
                                            <td className="p-4 border-b border-r border-slate-200 hover:bg-[#3b71ca]/5 transition-colors cursor-pointer group-hover:bg-slate-50/30">
                                                <p className="font-bold text-[#3b71ca]">History</p>
                                                <p className="text-xs font-medium text-slate-500 mt-1">Mr. Brown</p>
                                            </td>
                                            <td className="p-4 border-b border-r border-slate-200 bg-slate-50/80 text-slate-400 group-hover:bg-slate-100/50 transition-colors"></td>
                                            <td className="p-4 border-b border-r border-slate-200 hover:bg-[#3b71ca]/5 transition-colors cursor-pointer group-hover:bg-slate-50/30">
                                                <p className="font-bold text-[#3b71ca]">English</p>
                                                <p className="text-xs font-medium text-slate-500 mt-1">Ms. Wilson</p>
                                            </td>
                                            <td className="p-4 border-b border-slate-200 hover:bg-[#3b71ca]/5 transition-colors cursor-pointer group-hover:bg-slate-50/30">
                                                <p className="font-bold text-[#3b71ca]">P.E.</p>
                                                <p className="text-xs font-medium text-slate-500 mt-1">Coach Taylor</p>
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
