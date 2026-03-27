"use client";

import { LogOut, LayoutDashboard, Users, CalendarDays, FileSpreadsheet, MessageSquare, ClipboardCheck, BookOpen, Search, Bell, GraduationCap, ChevronDown, BarChart2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchProvider, useSearchContext } from "./SearchContext";

function HeaderSearch() {
  const { searchQuery, setSearchQuery } = useSearchContext();
  const pathname = usePathname();
  
  // Task 1: Hide from navbar if not on dashboard
  if (pathname !== '/teacher') return <div className="w-64 lg:w-96" />;

  return (
    <div className="flex items-center w-64 lg:w-96 relative">
      <Search className="w-4 h-4 text-slate-400 absolute left-3" />
      <input 
        type="text" 
        placeholder="Search resources or students..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm focus:bg-white focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50] outline-none transition-all shadow-sm" 
      />
    </div>
  );
}

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [teacherName, setTeacherName] = useState("Teacher");
  const [teacherDept, setTeacherDept] = useState("Department");
  const [teacherInitials, setTeacherInitials] = useState("T");

  useEffect(() => {
    const dataStr = localStorage.getItem("userData");
    if (dataStr) {
      setTimeout(() => {
        try {
          const userData = JSON.parse(dataStr);
          const name = userData?.name || userData?.full_name || "Teacher";
          const dept = userData?.department || userData?.subject || "Department";
          setTeacherName(name);
          setTeacherDept(dept);

          // Generate initials
          const parts = name.trim().split(" ");
          if (parts.length > 1) {
            setTeacherInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase());
          } else if (name.length > 0) {
            setTeacherInitials(name.substring(0, 2).toUpperCase());
          }
        } catch {
          // Fallback silently
        }
      }, 0);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/");
  };

  const navLinks = [
    { href: "/teacher", label: "Dashboard", icon: LayoutDashboard },
    { href: "/teacher/attendance", label: "Attendance", icon: ClipboardCheck },
    { href: "/teacher/classes", label: "Classes", icon: Users },
    { href: "/teacher/students", label: "Students", icon: GraduationCap },
    { href: "/teacher/in-progress", label: "Grades & Reports", icon: FileSpreadsheet },
    { href: "/teacher/assignments", label: "Assignments", icon: BookOpen },
    { href: "/teacher/in-progress", label: "Schedule", icon: CalendarDays },
    { href: "/teacher/in-progress", label: "Parent Connect", icon: MessageSquare },
  ];

  return (
    <SearchProvider>
      <div className="flex h-screen bg-slate-50 font-sans">
        {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
          <Image src="/skoolms.png" alt="Logo" width={110} height={28} className="object-contain w-auto h-auto" priority />
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold uppercase tracking-wider">Staff</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            const isActive = pathname === link.href && link.href !== "/teacher/in-progress"; // Prevent highlighting all in-progress links
            return (
              <Link key={index} href={link.href} className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors group ${isActive ? 'bg-[#4CAF50]/10 text-[#4CAF50]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#4CAF50]'}`}>
                <Icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-transform ${!isActive && 'group-hover:scale-110'}`} /> <span className="truncate">{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative border-l border-slate-200 shadow-sm">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 z-10 flex-shrink-0 relative">
          <HeaderSearch />
          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-[#4CAF50] transition-colors rounded-full hover:bg-green-50">
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative">
              <div
                className="flex items-center gap-3 border-l pl-6 border-slate-200 cursor-pointer group"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-[#4CAF50] transition-colors">{teacherName}</p>
                  <p className="text-xs text-slate-500">{teacherDept}</p>
                </div>
                <div className="w-9 h-9 text-white font-bold bg-[#4CAF50] rounded-full flex items-center justify-center ring-2 ring-white shadow-sm group-hover:scale-105 transition-transform">
                  {teacherInitials}
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#4CAF50] transition-colors" />
              </div>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link
                    href="/teacher/in-progress"
                    className="w-full px-4 py-2.5 text-left flex items-center text-slate-700 hover:bg-slate-50 hover:text-[#4CAF50] transition-colors text-sm font-medium"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <BarChart2 className="w-4 h-4 mr-3" /> Insights
                  </Link>
                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full px-4 py-2.5 text-left flex items-center text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-3" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50 relative">
           {children}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Ready to Leave?</h3>
              <p className="text-slate-500 mb-8 max-w-xs text-sm leading-relaxed">
                You will need to sign in again to access your classes and manage assignments.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 hover:text-slate-900 transition-colors focus:ring-4 focus:ring-slate-100 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors focus:ring-4 focus:ring-red-100 focus:outline-none shadow-sm hover:shadow"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </SearchProvider>
  );
}
