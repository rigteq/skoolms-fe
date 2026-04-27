"use client";
import React, { useState } from "react";
import { Search, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {

  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
<<<<<<< HEAD
      {/* Search */}
      <div className="flex items-center w-96 relative group">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 group-focus-within:text-[#4CAF50] transition-colors" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => {
            if (searchQuery) setShowResults(true);
          }}
          placeholder="Search student, teacher..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm focus:bg-white focus:border-[#4CAF50] focus:ring-2 focus:ring-[#4CAF50]/20 outline-none transition-all"
        />
      </div>

=======
      <div></div>
>>>>>>> ee406cc (Rebase)
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
                onClick={() => {
                  setShowProfile(false);
                  setShowLogoutModal(true);
                }}
                className="block w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
              >
                Sign Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Are you sure?</h3>
              <p className="text-slate-500 mb-8 max-w-xs text-sm leading-relaxed">
                You will be signed out from your session and need to login again.
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
    </header>
  );
}
