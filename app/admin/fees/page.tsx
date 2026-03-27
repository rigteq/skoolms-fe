"use client";

import {
    Plus, Search, Filter, DollarSign
} from "lucide-react";

export default function FeesPage() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100 mr-5">
                        <DollarSign className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">Financial Management</h1>
                        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">Collect, track and manage student fees.</p>
                    </div>
                </div>
                <button className="flex items-center px-6 py-4 bg-[#3b71ca] text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 hover:shadow-blue-300 font-extrabold text-xs uppercase tracking-widest group">
                    <Plus className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" /> Collect New Fee
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-xl hover:shadow-slate-200/50">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-5 justify-between items-center bg-slate-50/20">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Search by student name, ID or invoice number..." 
                            className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] transition-all font-bold placeholder:text-slate-400 shadow-sm" 
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center px-6 py-3.5 border border-slate-200 text-slate-600 bg-white rounded-2xl hover:bg-slate-50 transition-all text-xs font-black uppercase tracking-widest shadow-sm">
                            <Filter className="w-4 h-4 mr-3" /> Advanced Filters
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-50">
                            <tr>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] leading-none">Student Identification</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] leading-none">Invoice ID</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] leading-none">Status</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] leading-none">Amount</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] leading-none hidden md:table-cell">Due Date</th>
                                <th className="px-8 py-5 font-black text-[10px] uppercase tracking-[0.2em] text-right leading-none">Record</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                <tr key={item} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <p className="font-black text-slate-800 text-base leading-none">Student Name {item}</p>
                                            <p className="text-[10px] font-extrabold text-[#3b71ca] mt-2 uppercase tracking-widest">Class 10-A (Science)</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-slate-400 text-xs tracking-tighter bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">#INV-2026-00{item}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        {index % 3 === 0 ? (
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-100 shadow-sm uppercase tracking-widest">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
                                                Pending
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm uppercase tracking-widest">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                                Paid
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-slate-800 text-base tabular-nums tracking-tighter">${(Math.random() * 500 + 100).toFixed(2)}</span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-400 text-xs hidden md:table-cell tracking-tighter uppercase">Oct {(item * 5) % 30 + 1}, 2026</td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="px-4 py-2 text-[#3b71ca] bg-blue-50 hover:bg-[#3b71ca] hover:text-white font-black text-[10px] rounded-xl transition-all border border-blue-100 shadow-sm uppercase tracking-widest">View PDF</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-8 py-6 border-t border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-black uppercase tracking-widest gap-4">
                    <span>Account entries: 244 records listed</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-white transition-colors bg-white/50">Prev</button>
                        <button className="px-4 py-2 border border-blue-200 rounded-xl bg-[#3b71ca] shadow-md text-white">1</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-white transition-colors bg-white/50">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
