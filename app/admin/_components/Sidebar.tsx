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
  Settings
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Teachers", href: "/admin/teachers", icon: Users },
  { name: "Classes", href: "/admin/classes", icon: BookOpen },
  { name: "Students", href: "/admin/students", icon: GraduationCap },
  { name: "Attendance", href: "/admin/attendance", icon: ClipboardCheck },
  { name: "Exams", href: "/admin/exams", icon: FileText },
  { name: "Timetable", href: "/admin/timetable", icon: Calendar },
  { name: "Fees", href: "/admin/fees", icon: DollarSign },
  { name: "Reports", href: "/admin/reports", icon: BarChart },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
        <Image src="/skoolms.png" alt="Logo" width={110} height={28} className="object-contain w-auto h-auto" priority />
        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">Admin</span>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-[#3b71ca]/10 text-[#3b71ca] font-bold shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${active ? "text-[#3b71ca]" : "text-slate-400"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
