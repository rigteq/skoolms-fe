"use client";

import {
    Settings,
    Shield,
    Bell,
    CreditCard,
    Link as LinkIcon,
    Calendar,
    Save,
    Image as ImageIcon
} from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-slate-700 to-slate-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-100 mr-5 border border-slate-600">
                        <Settings className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">System Settings</h1>
                        <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest text-[10px]">Configure your school's global parameters.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
                    {/* Sidebar Menu */}
                    <div className="lg:col-span-1 border-r border-slate-50 bg-slate-50/20 p-8">
                        <nav className="space-y-3 sticky top-8">
                            <button className="w-full text-left px-5 py-4 bg-white text-[#3b71ca] font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] border border-blue-100 shadow-lg shadow-blue-50 flex items-center justify-between group">
                                General Profile
                                <Settings className="w-4 h-4" />
                            </button>
                            <button className="w-full text-left px-5 py-4 text-slate-400 hover:text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white flex items-center justify-between group">
                                Academic Year
                                <Calendar className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left px-5 py-4 text-slate-400 hover:text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white flex items-center justify-between group">
                                Notifications
                                <Bell className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left px-5 py-4 text-slate-400 hover:text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white flex items-center justify-between group">
                                Security
                                <Shield className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left px-5 py-4 text-slate-400 hover:text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white flex items-center justify-between group">
                                Billing & Plans
                                <CreditCard className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left px-5 py-4 text-slate-400 hover:text-slate-800 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white flex items-center justify-between group">
                                API Integrations
                                <LinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 p-10 md:p-16">
                        <div className="mb-12">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">General Information</h2>
                            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest text-[10px]">Branding and contact identity.</p>
                        </div>

                        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                            {/* Logo Upload */}
                            <div className="flex flex-col md:flex-row items-center gap-10 bg-slate-50/50 p-10 rounded-[2.5rem] border-2 border-slate-100 border-dashed group hover:bg-white hover:border-[#3b71ca]/20 transition-all">
                                <div className="w-32 h-32 rounded-3xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-2xl ring-8 ring-slate-50 relative group-hover:scale-110 transition-transform">
                                    <Image src="/skoolms.png" alt="Logo" width={100} height={30} className="object-contain" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <ImageIcon className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-sm font-black text-slate-800 mb-3 uppercase tracking-widest leading-none">Institutional Logo</h3>
                                    <p className="text-[11px] text-slate-400 mb-6 leading-relaxed font-bold uppercase tracking-tighter">Visible on documents, certificates and receipts. PNG/JPG, Max 2MB.</p>
                                    <div className="flex gap-4 justify-center md:justify-start">
                                        <button type="button" className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">Replace</button>
                                        <button type="button" className="px-6 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all text-[10px] font-black uppercase tracking-[0.2em]">Delete</button>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">School Name</label>
                                    <input type="text" defaultValue="Greenwood High International" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] transition-all font-black text-slate-800 shadow-sm" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Registration ID</label>
                                    <input type="text" defaultValue="REG-2026-987654" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-base text-slate-400 focus:outline-none cursor-not-allowed font-black shadow-inner" readOnly />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Academic Email</label>
                                    <input type="email" defaultValue="admin@greenwood.edu" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] transition-all font-black text-slate-800 shadow-sm" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Official Hot-line</label>
                                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-6 py-4 bg-white border border-slate-100 rounded-2xl text-base focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] transition-all font-black text-slate-800 shadow-sm" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Campus Address</label>
                                <textarea rows={3} defaultValue="123 Education Lane, Learning District, Cityville, State 12345" className="w-full px-6 py-5 bg-white border border-slate-100 rounded-3xl text-base focus:outline-none focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] transition-all resize-none font-black text-slate-800 shadow-sm"></textarea>
                            </div>

                            <div className="pt-12 border-t border-slate-50 flex justify-end gap-5">
                                <button type="button" className="px-8 py-4 border border-slate-100 text-slate-400 bg-white rounded-2xl hover:text-slate-800 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                                    Reset
                                </button>
                                <button type="button" className="px-10 py-4 bg-[#3b71ca] text-white rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 font-black text-[10px] uppercase tracking-[0.2em] flex items-center group">
                                    <Save className="w-4 h-4 mr-3 group-hover:scale-125 transition-transform" /> Commit Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
