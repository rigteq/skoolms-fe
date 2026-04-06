"use client";

import { Search, Bell } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allData, setAllData] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query) {
       setShowResults(false);
       return;
    }
    
    setShowResults(true);

    if (allData.length === 0 && !isSearching) {
       setIsSearching(true);
       try {
          const token = localStorage.getItem("token");
          const [studentsRes, teachersRes] = await Promise.all([
             fetch("http://localhost:5000/api/students", { headers: { Authorization: `Bearer ${token}` } }),
             fetch("http://localhost:5000/api/teachers", { headers: { Authorization: `Bearer ${token}` } })
          ]);
          
          let students = [];
          if (studentsRes.ok) students = await studentsRes.json();
          if (students.data) students = students.data;

          let teachers = [];
          if (teachersRes.ok) teachers = await teachersRes.json();
          if (teachers.data) teachers = teachers.data;
          else if (teachers.teachers) teachers = teachers.teachers;

          const combined = [
             ...(Array.isArray(students) ? students : []).map(s => ({ ...s, type: 'Student' })),
             ...(Array.isArray(teachers) ? teachers : []).map(t => ({ ...t, type: 'Teacher' }))
          ];
          setAllData(combined);
       } catch (err) {
          console.error(err);
       } finally {
          setIsSearching(false);
       }
    }
  };

  const filteredResults = allData.filter((item) => 
    item.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => { if (searchQuery) setShowResults(true); }}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#3b71ca] outline-none transition-all shadow-inner border focus:border-opacity-50"
        />
        {showResults && searchQuery && (
          <div className="absolute top-full mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            {isSearching && allData.length === 0 ? (
              <div className="p-4 text-center text-sm text-slate-500">Searching...</div>
            ) : filteredResults.length > 0 ? (
              <ul className="max-h-64 overflow-y-auto custom-scrollbar">
                {filteredResults.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{item.full_name}</p>
                      <p className="text-xs text-slate-500">{item.email}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${item.type === 'Student' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {item.type}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm font-medium text-slate-500">No Data Found</div>
            )}
          </div>
        )}
        
        {/* Click outside listener area could be added, but here just close when clear */}
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
