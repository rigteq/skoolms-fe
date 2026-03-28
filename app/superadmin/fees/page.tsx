"use client";
import React from "react";
import { DollarSign } from "lucide-react";

export default function FeesPage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                    <DollarSign className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Records & Fees</h1>
                    <p className="text-slate-500 text-sm mt-1">Monitor fee collections, outstanding balances, and financial health of all schools.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grow">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Collected (MTD)</p>
                    <h4 className="text-xl font-black text-slate-800">$0.00</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grow">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Pending Invoices</p>
                    <h4 className="text-xl font-black text-slate-800">0</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grow">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Overdue Accounts</p>
                    <h4 className="text-xl font-black text-rose-600">0</h4>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grow">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Financial Health</p>
                    <h4 className="text-xl font-black text-emerald-600">Stable</h4>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <DollarSign className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Financial Transactions Found</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-sm">Consolidated fee reports and payment histories will be displayed here as schools process their accounts.</p>
            </div>
        </div>
    );
}
