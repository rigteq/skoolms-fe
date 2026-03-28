"use client";

import {
    Edit, Calendar
} from "lucide-react";

export default function TimetablePage() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-[#3b71ca] to-blue-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100 mr-5">
                        <Calendar className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Class Timetable</h1>
                        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">Weekly Academic Schedule</p>
                    </div>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-2xl text-sm bg-white focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] text-slate-700 font-extrabold shadow-sm cursor-pointer transition-all uppercase tracking-tighter">
                        <option value="10A">Class 10-A (Science)</option>
                        <option value="10B">Class 10-B (Commerce)</option>
                        <option value="11A">Class 11-A (Science)</option>
                    </select>
                    <button className="flex items-center px-6 py-3 bg-[#3b71ca] text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 hover:shadow-blue-300 font-extrabold text-xs uppercase tracking-widest">
                        <Edit className="w-4 h-4 mr-2" /> Modify Schedule
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-slate-200/50">
                <div className="overflow-x-auto p-2">
                    <table className="w-full text-center text-sm text-slate-600 border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th className="p-6 bg-slate-50/50 rounded-2xl w-36 font-black text-[#3b71ca] text-[10px] uppercase tracking-[0.2em] border border-slate-100">Day / Time</th>
                                <th className="p-6 bg-slate-50/50 rounded-2xl font-black text-slate-700 border border-slate-100 min-w-[140px]">
                                    <span className="text-[10px] text-slate-400 block mb-1 tracking-widest leading-none">P-1</span>
                                    <span className="text-sm">08:00 - 08:45</span>
                                </th>
                                <th className="p-6 bg-slate-50/50 rounded-2xl font-black text-slate-700 border border-slate-100 min-w-[140px]">
                                    <span className="text-[10px] text-slate-400 block mb-1 tracking-widest leading-none">P-2</span>
                                    <span className="text-sm">08:45 - 09:30</span>
                                </th>
                                <th className="p-6 bg-slate-50/50 rounded-2xl font-black text-slate-700 border border-slate-100 min-w-[140px]">
                                    <span className="text-[10px] text-slate-400 block mb-1 tracking-widest leading-none">P-3</span>
                                    <span className="text-sm">09:30 - 10:15</span>
                                </th>
                                <th className="p-6 bg-slate-100/50 rounded-2xl text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] border border-slate-200/50">
                                    Recess
                                </th>
                                <th className="p-6 bg-slate-50/50 rounded-2xl font-black text-slate-700 border border-slate-100 min-w-[140px]">
                                    <span className="text-[10px] text-slate-400 block mb-1 tracking-widest leading-none">P-4</span>
                                    <span className="text-sm">10:30 - 11:15</span>
                                </th>
                                <th className="p-6 bg-slate-50/50 rounded-2xl font-black text-slate-700 border border-slate-100 min-w-[140px]">
                                    <span className="text-[10px] text-slate-400 block mb-1 tracking-widest leading-none">P-5</span>
                                    <span className="text-sm">11:15 - 12:00</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                <tr key={day} className="group">
                                    <td className="p-6 bg-slate-50/30 rounded-2xl font-black text-slate-800 text-xs uppercase tracking-widest border border-slate-50 transition-colors group-hover:bg-slate-100 leading-none">{day}</td>
                                    <td className="p-6 bg-white rounded-2xl border border-slate-50 shadow-sm transition-all hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-100 hover:border-[#3b71ca]/20 hover:z-10 cursor-pointer text-center relative overflow-hidden group/item">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#3b71ca] opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                        <p className="font-black text-[#3b71ca] text-base leading-none">Maths</p>
                                        <p className="text-[10px] font-extrabold text-slate-400 mt-2 uppercase tracking-tighter">Prof. Smith</p>
                                    </td>
                                    <td className="p-6 bg-white rounded-2xl border border-slate-50 shadow-sm transition-all hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-100 hover:border-[#3b71ca]/20 hover:z-10 cursor-pointer text-center group/item">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                        <p className="font-black text-emerald-600 text-base leading-none">Science</p>
                                        <p className="text-[10px] font-extrabold text-slate-400 mt-2 uppercase tracking-tighter">Mrs. Davis</p>
                                    </td>
                                    <td className="p-6 bg-white rounded-2xl border border-slate-50 shadow-sm transition-all hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-100 hover:border-[#3b71ca]/20 hover:z-10 cursor-pointer text-center group/item">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                        <p className="font-black text-amber-600 text-base leading-none">History</p>
                                        <p className="text-[10px] font-extrabold text-slate-400 mt-2 uppercase tracking-tighter">Mr. Brown</p>
                                    </td>
                                    <td className="p-6 bg-slate-50/20 rounded-2xl group-hover:bg-slate-100/30 transition-colors border border-dashed border-slate-200"></td>
                                    <td className="p-6 bg-white rounded-2xl border border-slate-50 shadow-sm transition-all hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-100 hover:border-[#3b71ca]/20 hover:z-10 cursor-pointer text-center group/item">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                        <p className="font-black text-indigo-600 text-base leading-none">English</p>
                                        <p className="text-[10px] font-extrabold text-slate-400 mt-2 uppercase tracking-tighter">Ms. Wilson</p>
                                    </td>
                                    <td className="p-6 bg-white rounded-2xl border border-slate-50 shadow-sm transition-all hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-100 hover:border-[#3b71ca]/20 hover:z-10 cursor-pointer text-center group/item">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-rose-500 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                                        <p className="font-black text-rose-600 text-base leading-none">P.E.</p>
                                        <p className="text-[10px] font-extrabold text-slate-400 mt-2 uppercase tracking-tighter">Coach Taylor</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
