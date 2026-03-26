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
import { useState } from "react";

export default function ExamsPage() {
    const router = useRouter();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        router.push("/");
    };

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

            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center w-96 relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                        <input type="text" placeholder="Search student by ID or Name..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#3b71ca] outline-none transition-all" />
                    </div>
                    {/*Right Side bar Content Logout and Profile */}

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">

                        {/* Notification */}
                        <button
                            onClick={() => alert("No new notifications")}
                            className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <div
                                onClick={() => setShowProfile(!showProfile)}
                                className="cursor-pointer px-3 py-1 rounded-full bg-gradient-to-tr from-[#4CAF50] to-[#2E7D32] text-white flex items-center justify-center font-bold text-sm shadow-md"
                            >
                                Admin
                            </div>

                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20">
                                    <button
                                        onClick={() => router.push("/profile")}
                                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </header>


                {/* Content */}
                <div className="flex-1 overflow-auto p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Exams</h1>
                        <button className="flex items-center px-4 py-2 bg-[#3b71ca] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-5 h-5 mr-2" /> Add Exam
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5].map(item => (
                            <div key={item} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-[#3b71ca]/30 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md font-bold text-xs border border-green-200 shadow-sm">Upcoming</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">Mid-Term Examination {item}</h3>
                                <p className="text-sm font-medium text-[#3b71ca] mb-5 bg-blue-50 self-start px-2.5 py-1 rounded-md max-w-max">Class 10A</p>

                                <div className="space-y-4">
                                    <div className="flex items-center text-sm text-slate-600">
                                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                        <span className="font-medium text-slate-700">Starts: Oct 15, 2026</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-600">
                                        <Users className="w-4 h-4 mr-2 text-slate-400" />
                                        <span className="font-medium text-slate-700">45 Students Enrolled</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3">
                                    <button className="flex-1 px-4 py-2.5 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm font-semibold transition-colors border border-slate-200 flex items-center justify-center">
                                        <Edit className="w-4 h-4 mr-1.5" /> Edit
                                    </button>
                                    <button className="flex-1 px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors border border-indigo-100">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
