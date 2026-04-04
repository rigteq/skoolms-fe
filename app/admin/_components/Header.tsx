"use client";

import { Search, Bell } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 flex-shrink-0">
      <div className="flex items-center w-96 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        <input
          type="text"
          placeholder="Search student, teacher or ID..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#3b71ca] outline-none transition-all shadow-inner"
        />
      </div>

      <div className="flex items-center space-x-6">
        {/* Notification */}
        <button
          onClick={() =>

            toast.custom((t) => (
              <div
                className={`${t.visible ? "animate-enter" : "animate-leave"
                  } max-w-sm w-full bg-white shadow-xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-xl">🔔</div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">
                        No new notifications
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        You are all caught up!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-xl p-3 flex items-center justify-center text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            ))
          }
          className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 rounded-full border border-slate-100"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="cursor-pointer px-4 py-1.5 rounded-full bg-gradient-to-tr from-[#4CAF50] to-[#2E7D32] text-white flex items-center justify-center font-bold text-xs shadow-md ring-2 ring-white hover:scale-105 transition-transform"
          >
            Admin
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-20 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-50 mb-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Account</p>
              </div>
              <button
                onClick={() => router.push("/profile")}
                className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#3b71ca] transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-slate-50 mt-1 pt-2"
              >
                Logout Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
