import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    LogOut, Users, Settings, Briefcase, GraduationCap,
    Calendar, DollarSign, LayoutDashboard
} from "lucide-react";

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    const navItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Students", href: "/admin/students", icon: GraduationCap },
        { label: "Staff & Teachers", href: "/admin/staff", icon: Users },
        { label: "Timetable", href: "/admin/timetable", icon: Calendar },
        { label: "Exams & Results", href: "/admin/exams", icon: Briefcase },
        { label: "Fees Management", href: "/admin/fees", icon: DollarSign },
        { label: "Configurations", href: "/admin/settings", icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
            <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
                <Image src="/skoolms.png" alt="Logo" width={110} height={28} className="object-contain w-auto h-auto" priority />
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                    ? "bg-[#3b71ca]/10 text-[#3b71ca]"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <Icon className="w-5 h-5 mr-3" /> {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100 shrink-0">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                    <LogOut className="w-5 h-5 mr-3" /> Logout
                </button>
            </div>
        </aside>
    );
};
