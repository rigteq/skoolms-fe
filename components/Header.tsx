"use client";
import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log("Searching:", e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
      {/* Search */}
      <div className="flex items-center w-96 relative group">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 group-focus-within:text-[#4CAF50] transition-colors" />
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search schools by name or email..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none transition-all placeholder:text-slate-400 font-medium"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        {/* Notification */}
        <button
          onClick={() => alert("No new notifications")}
          className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="cursor-pointer px-4 py-1.5 rounded-full bg-gradient-to-tr from-[#4CAF50] to-[#2E7D32] text-white flex items-center justify-center font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            SuperAdmin
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-20 overflow-hidden">
              <button
                onClick={() => router.push("/profile")}
                className="block w-full text-left px-5 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
              >
                My Profile
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
              >
                Sign Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
