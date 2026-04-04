import Link from "next/link";
import { CheckCircle2, ShieldCheck, Clock, Layers, Users, Server, Zap, Globe, BookOpen, UserCheck, BarChart, Calendar, DollarSign, Bell } from "lucide-react";
import Image from "next/image";

export default function ExploreFeaturesPage() {
  return (
    <div className="min-h-screen bg-[#f3f7fb] font-sans text-slate-800">
      {/* Header / Nav */}
      <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 lg:px-16 relative z-10">
        <Link href="/">
          <Image src="/skoolms.png" alt="skoolms.in" width={140} height={40} className="object-contain" priority />
        </Link>
        <Link href="/" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors">
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-8 lg:px-16 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#e1edf7] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[400px] h-[400px] bg-[#d7e8f4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
            Smart School <span className="text-[#3b71ca]">Management System</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Manage your entire school ecosystem in one place. Designed for Admins, SuperAdmins, Teachers, and Staff to simplify daily operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="px-8 py-3.5 bg-gradient-to-r from-[#5bc460] to-[#44a048] hover:to-[#388E3C] text-white font-bold text-base rounded-xl shadow-xl shadow-green-500/20 transition-all hover:-translate-y-1 hover:shadow-green-500/30 w-full sm:w-auto">
              Get Started
            </Link>
            <Link href="/" className="px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-base rounded-xl shadow-sm transition-all hover:-translate-y-1 w-full sm:w-auto">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Who Can Use This System */}
      <section className="py-16 px-8 lg:px-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12 text-slate-800">Who Can Use This System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: "Super Admin", desc: "Manage multiple schools, control system access", icon: Globe, color: "text-purple-600", bg: "bg-purple-100" },
              { role: "Admin", desc: "Handle daily school operations", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-100" },
              { role: "Teachers", desc: "Manage students, attendance, and performance", icon: BookOpen, color: "text-green-600", bg: "bg-green-100" },
              { role: "Staff", desc: "Assist with administrative tasks", icon: Users, color: "text-orange-600", bg: "bg-orange-100" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.role}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features (Card UI) */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-12 text-slate-800">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Student Management", icon: UserCheck, desc1: "Easy enrollment process", desc2: "Track academic progress", desc3: "Centralized student records" },
              { title: "Staff & Teacher Management", icon: Users, desc1: "Role-based access", desc2: "Performance tracking", desc3: "Payroll integration ready" },
              { title: "Dashboard & Insights", icon: BarChart, desc1: "Real-time analytics", desc2: "Customizable reports", desc3: "Visual data representation" },
              { title: "Attendance Tracking", icon: Calendar, desc1: "Automated daily attendance", desc2: "Leave management", desc3: "Instant parent notifications" },
              { title: "Fee Management", icon: DollarSign, desc1: "Online payment tracking", desc2: "Automated fee reminders", desc3: "Detailed financial reports" },
              { title: "Notifications & Comm", icon: Bell, desc1: "SMS & Email alerts", desc2: "Broadcast announcements", desc3: "Parent-teacher messaging" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#f3f7fb] rounded-xl flex items-center justify-center mb-6 text-[#3b71ca]">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <ul className="space-y-3 text-slate-600 text-sm font-medium">
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> {item.desc1}</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> {item.desc2}</li>
                  <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> {item.desc3}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our System & System Highlights */}
      <section className="py-16 px-8 lg:px-16 bg-slate-800 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <div>
            <h2 className="text-3xl font-extrabold mb-8">Why Choose Our System</h2>
            <ul className="space-y-4">
              {[
                { text: "Easy to use interface", icon: Layers },
                { text: "Secure and reliable", icon: ShieldCheck },
                { text: "Saves time and effort", icon: Clock },
                { text: "All-in-one school solution", icon: Server },
                { text: "Scalable for multiple roles", icon: Users },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center text-lg text-slate-200">
                  <div className="mr-4 p-2 bg-slate-700 rounded-lg text-[#5bc460]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold mb-8">System Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Multi-role access system", icon: UserCheck },
                { title: "Centralized data management", icon: Server },
                { title: "Fast and responsive dashboard", icon: Zap },
                { title: "Built with modern technology", icon: Layers },
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-700/50 rounded-xl border border-slate-600">
                  <item.icon className="w-6 h-6 text-[#3b71ca] mb-3" />
                  <h4 className="font-bold text-slate-100">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 px-8 text-center bg-gradient-to-br from-[#f2f8fc] to-[#e6eff6]">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 max-w-2xl mx-auto">
          Start managing your school smarter today 🚀
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="px-8 py-4 bg-gradient-to-r from-[#3b71ca] to-[#2a5298] text-white font-bold text-base rounded-xl shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 hover:shadow-blue-500/30 w-full sm:w-auto">
            Get Started
          </Link>
          <Link href="/" className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-base rounded-xl shadow-sm transition-all hover:-translate-y-1 w-full sm:w-auto">
            Login
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} SkoolMS. All rights reserved.
      </footer>
    </div>
  );
}
