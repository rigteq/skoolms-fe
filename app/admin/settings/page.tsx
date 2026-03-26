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
    Settings, LogOut, Search, Bell
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
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
                <div className="flex-1 overflow-auto p-6 md:p-10">
                    <div className="max-w-5xl mx-auto">

                        {/* Header */}
                        <h1 className="text-2xl font-bold text-slate-800 mb-6">
                            School Settings
                        </h1>

                        {/* Main Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                {/* Sidebar Menu */}
                                <div className="md:col-span-1 md:border-r border-slate-200 pr-4">
                                    <nav className="space-y-1.5 focus:outline-none">
                                        <button className="w-full text-left px-4 py-2.5 bg-blue-50 text-[#3b71ca] font-bold rounded-lg text-sm border border-blue-100 shadow-sm flex items-center justify-between group">
                                            General Option
                                            <div className="w-1.5 h-4 bg-[#3b71ca] rounded-full group-hover:h-5 transition-all"></div>
                                        </button>
                                        <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg text-sm transition-colors border border-transparent">Academic Year</button>
                                        <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg text-sm transition-colors border border-transparent">Notifications</button>
                                        <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg text-sm transition-colors border border-transparent">Security</button>
                                        <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg text-sm transition-colors border border-transparent">Billing & Plans</button>
                                        <button className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium rounded-lg text-sm transition-colors border border-transparent">Integrations</button>
                                    </nav>
                                </div>

                                {/* Content Area */}
                                <div className="md:col-span-3 space-y-6">
                                    <div className="mb-6 border-b border-slate-100 pb-6">
                                        <h2 className="text-xl font-bold text-slate-800 mb-1">General Information</h2>
                                        <p className="text-sm text-slate-500">Update your school's basic profile information and branding.</p>
                                    </div>

                                    <form className="space-y-8 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
                                        {/* Logo Upload */}
                                        <div className="flex items-start gap-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200 border-dashed">
                                            <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                                                <Image src="/skoolms.png" alt="Logo" width={80} height={20} className="object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-sm font-bold text-slate-800 mb-2">School Logo</h3>
                                                <p className="text-xs text-slate-500 mb-4 leading-relaxed">This logo will be displayed on the dashboard, reports, and invoices. Recommended size: 256x256px. Maximum file size: 2MB.</p>
                                                <div className="flex gap-3">
                                                    <button type="button" className="px-4 py-2 border border-slate-200 text-slate-700 bg-white rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold shadow-sm">Upload New Image</button>
                                                    <button type="button" className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">Remove</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">School Name</label>
                                                <input type="text" defaultValue="Greenwood High School" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] transition-all shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Registration Number</label>
                                                <input type="text" defaultValue="REG-2026-987654" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 focus:outline-none cursor-not-allowed shadow-sm" readOnly title="Registration number cannot be changed" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Contact Email</label>
                                                <input type="email" defaultValue="admin@greenwood.edu" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] transition-all shadow-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] transition-all shadow-sm" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Complete Address</label>
                                            <textarea rows={3} defaultValue="123 Education Lane, Learning District, Cityville, State 12345" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/20 focus:border-[#3b71ca] transition-all resize-none shadow-sm"></textarea>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 mt-8">
                                            <button type="button" className="px-6 py-2.5 border border-slate-200 text-slate-600 bg-white rounded-lg hover:bg-slate-50 transition-colors shadow-sm font-semibold">
                                                Cancel
                                            </button>
                                            <button type="button" className="px-6 py-2.5 bg-[#3b71ca] text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold flex items-center">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
