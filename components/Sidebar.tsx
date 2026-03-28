"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  UserPlus, 
  ClipboardCheck, 
  FileText, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/superadmin", icon: LayoutDashboard },
  { name: "Schools", href: "/superadmin/schools", icon: Users },
  { name: "Admins", href: "/superadmin/admins", icon: ShieldCheck },
  { name: "Teachers", href: "/superadmin/teachers", icon: Users },
  { name: "Classes", href: "/superadmin/classes", icon: BookOpen },
  { name: "Students", href: "/superadmin/students", icon: GraduationCap },
  { name: "Admissions", href: "/superadmin/admissions", icon: UserPlus },
  { name: "Attendance", href: "/superadmin/attendance", icon: ClipboardCheck },
  { name: "Exams", href: "/superadmin/exams", icon: FileText },
  { name: "Timetable", href: "/superadmin/timetable", icon: Calendar },
  { name: "Fees", href: "/superadmin/fees", icon: DollarSign },
  { name: "Reports", href: "/superadmin/reports", icon: BarChart3 },
  { name: "Settings", href: "/superadmin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/superadmin") {
      return pathname === "/superadmin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen overflow-y-auto">
      <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
        <Image 
          src="/skoolms.png" 
          alt="Logo" 
          width={120} 
          height={30} 
          className="object-contain w-auto h-auto" 
          priority 
        />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                active
                  ? "bg-[#4CAF50]/10 text-[#4CAF50] shadow-sm ring-1 ring-[#4CAF50]/10"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors ${active ? "text-[#4CAF50]" : "text-slate-400 group-hover:text-slate-600"}`} /> 
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
