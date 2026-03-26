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

export default function StudentsPage() {
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
                        <h1 className="text-2xl font-bold text-slate-800">Students</h1>
                        <button className="flex items-center px-4 py-2 bg-[#3b71ca] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-5 h-5 mr-2" /> Add Student
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50">
                            <div className="relative w-full md:w-96">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                                <input type="text" placeholder="Search by name, email or phone..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] transition-all bg-white" />
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <select className="w-full md:w-40 px-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] text-slate-700 font-medium">
                                    <option value="">All Classes</option>
                                    <option value="10A">Class 10A</option>
                                    <option value="10B">Class 10B</option>
                                </select>
                                <button className="flex items-center px-4 py-2 border border-slate-200 text-slate-600 bg-white rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium whitespace-nowrap justify-center">
                                    <Filter className="w-4 h-4 mr-2" /> Filters
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Student Info</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Class</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs hidden md:table-cell">Parent Info</th>
                                        <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <tr key={item} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden mr-3 flex-shrink-0 shadow-sm border border-slate-200">
                                                        <img src={`https://i.pravatar.cc/150?img=${item + 10}`} alt="Student" className="object-cover w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">Michael Scott {item}</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">mich.scott{item}@student.com</p>
                                                        <p className="text-xs text-slate-500 mt-0.5">+1 234 567 {890 + item}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top pt-6">
                                                <span className="px-3 py-1 bg-[#3b71ca]/10 text-[#3b71ca] rounded-md font-bold text-xs border border-[#3b71ca]/20 shadow-sm">10A</span>
                                            </td>
                                            <td className="px-6 py-4 align-top pt-6 hidden md:table-cell">
                                                <p className="font-semibold text-slate-700">James Scott</p>
                                                <p className="text-xs text-slate-500 mt-0.5">+1 987 654 321</p>
                                            </td>
                                            <td className="px-6 py-4 text-right align-top pt-5">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4 bg-slate-50/50">
                            <span>Showing 1 to 5 of 120 results</span>
                            <div className="flex gap-1.5">
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white bg-transparent transition-colors font-medium">Previous</button>
                                <button className="px-3 py-1.5 border border-transparent rounded-lg bg-[#3b71ca] shadow-sm text-white font-medium">1</button>
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white bg-transparent transition-colors font-medium">2</button>
                                <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white bg-transparent transition-colors font-medium">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
