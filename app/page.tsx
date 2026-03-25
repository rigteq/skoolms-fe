"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, CheckCircle2, Cloud, MessageCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.message || "Invalid credentials provided.");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token); // Securely store JWT!
      }

      toast.success("Login successful!");

      // Route based on role from actual backend response
      const role = data.role?.toLowerCase() || "admin";
      if (role === "superadmin") {
        router.push("/superadmin");
      } else if (role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/admin");
      }
    } catch (error: unknown) {
      if (error instanceof Error && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error instanceof TypeError)) {
        toast.error("Server is unreachable. Please verify your connection and ensure the backend is running at port 5000.", { duration: 5000 });
      } else if (error instanceof Error) {
        toast.error(error.message || "An unexpected error occurred during login.");
      } else {
        toast.error("An unexpected error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen w-full relative flex flex-col lg:flex-row bg-[#f3f7fb] lg:overflow-hidden font-sans">

      {/* Left Side: Information */}
      <div className="w-full lg:w-[55%] flex flex-col relative z-20 bg-gradient-to-br from-[#f2f8fc] to-[#e6eff6] p-8 lg:p-6 xl:p-8 justify-between border-b lg:border-b-0 lg:border-r border-slate-200 shadow-[inset_0_0_80px_rgba(0,0,0,0.02)] min-h-screen lg:h-full lg:overflow-hidden">
        {/* Decorative Blob Background Elements bounded within left side */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#e1edf7] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-[#d7e8f4] rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

        <div className="mb-8 lg:mb-2 xl:mb-6 relative z-30">
          <Image src="/skoolms.png" alt="skoolms.in" width={240} height={60} className="object-contain w-auto h-auto" priority />
        </div>

        <div className="mt-4 flex-1 relative z-30 flex flex-col justify-center max-w-2xl">
          <h1 className="text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight font-extrabold text-slate-800 tracking-tight">
            Smart School <br />
            <span className="text-[#3b71ca]">Management System</span>
          </h1>
          <p className="mt-4 lg:mt-2 xl:mt-3 text-lg lg:text-sm xl:text-base 2xl:text-lg text-slate-500 font-medium max-w-lg">
            Simplify School Administration with Ease and intelligent automation.
          </p>

          <ul className="mt-8 lg:mt-3 xl:mt-6 space-y-4 lg:space-y-1 xl:space-y-2">
            {[
              "Manage Students & Staff Activity",
              "Track Ongoing Attendance & Grades",
              "Dynamic Timetable & Exam Scheduling",
              "Integrated Parent & Teacher Portals",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-slate-700 font-medium text-lg lg:text-xs xl:text-sm 2xl:text-base">
                <div className="mr-3 lg:mr-2 p-1.5 lg:p-1 rounded-full bg-green-100/80 text-[#4CAF50]">
                  <Check className="h-5 w-5 lg:h-3 lg:w-3 xl:h-4 xl:w-4" strokeWidth={3} />
                </div>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 lg:mt-4 xl:mt-6">
            <button className="px-8 lg:px-5 xl:px-6 py-3.5 lg:py-2.5 xl:py-3 bg-gradient-to-r from-[#5bc460] to-[#44a048] hover:to-[#388E3C] text-white font-bold text-base lg:text-xs xl:text-sm rounded-xl shadow-xl shadow-green-500/20 transition-all hover:-translate-y-1 hover:shadow-green-500/30">
              Explore Features Now
            </button>
          </div>

        </div>

        {/* Bottom Features Row */}
        <div className="mt-12 lg:mt-4 xl:mt-6 flex flex-wrap gap-x-4 lg:gap-x-3 xl:gap-x-4 gap-y-2 lg:gap-y-1 text-sm lg:text-[10px] xl:text-xs font-semibold text-slate-600 relative z-30 opacity-90">
          <div className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
            Streamline Operations
          </div>
          <div className="flex items-center">
            <Cloud className="w-5 h-5 text-emerald-500 mr-2" />
            Boost Productivity
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 text-emerald-500 mr-2" />
            Enhance Communication
          </div>
        </div>
      </div>

      {/* Right Side: Login Panel Area */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center bg-white p-8 lg:p-8 xl:p-12 relative z-20 min-h-screen lg:h-full lg:overflow-hidden">
        <div className="w-full max-w-md">

          <div className="text-center lg:text-left mb-8 lg:mb-4 xl:mb-6">
            <h2 className="text-3xl lg:text-lg xl:text-xl 2xl:text-2xl font-extrabold text-slate-800">Login to Your Account</h2>
            <p className="text-slate-500 text-base lg:text-[10px] xl:text-xs 2xl:text-sm mt-3 lg:mt-1 xl:mt-1.5">Welcome back! Please enter your credentials to securely manage your school.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 lg:space-y-3 xl:space-y-4 2xl:space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 2xl:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder:text-slate-400 text-base lg:text-xs xl:text-sm shadow-sm hover:border-slate-300"
                placeholder="Ex. admin@skoolms.in"
                required
              />
            </div>

            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 ml-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5 2xl:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder:text-slate-400 text-base lg:text-xs xl:text-sm shadow-sm hover:border-slate-300"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded text-[#4CAF50] bg-slate-100 border-slate-300 focus:ring-[#4CAF50] focus:ring-opacity-25" />
                <span className="ml-2 text-sm text-slate-600 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-[#3b71ca] hover:text-[#2a5298] transition-colors">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 lg:py-2.5 xl:py-3 2xl:py-3.5 mt-2 lg:mt-1 xl:mt-2 bg-gradient-to-r from-[#50b155] to-[#4caf50] hover:to-[#43a047] text-white font-bold text-lg lg:text-xs xl:text-sm 2xl:text-base rounded-xl shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/35 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : "Login"}
            </button>
          </form>

          <div className="mt-10 mb-8 lg:mt-3 lg:mb-2 xl:mt-6 xl:mb-4 2xl:mt-8 2xl:mb-6 relative flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-5 lg:mx-3 xl:mx-4 text-sm lg:text-[9px] xl:text-[10px] 2xl:text-xs font-semibold uppercase tracking-widest">Or login with</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button type="button" className="w-full flex items-center justify-center px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            <button type="button" className="w-full flex items-center justify-center px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Microsoft
            </button>
          </div>

          <div className="mt-10 lg:mt-4 xl:mt-8 text-center text-sm lg:text-[10px] xl:text-xs text-slate-600 font-medium">
            Don&apos;t have an account? <a href="#" className="font-bold text-[#3b71ca] hover:underline hover:text-[#2a5298] transition-colors">Sign up securely</a>
          </div>

        </div>
      </div>
    </div>
  );
}
