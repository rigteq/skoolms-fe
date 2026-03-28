"use client";
import React from "react";
import { Settings, Shield, Bell, User, Cloud } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center text-[#4CAF50]">
                    <Settings className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
                    <p className="text-slate-500 text-sm mt-1">Configure global platform parameters, security policies, and notification preferences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Navigation */}
                <div className="space-y-2">
                    {[
                        { icon: User, label: "Account Profile", desc: "Manage your personal details" },
                        { icon: Shield, label: "Security & Privacy", desc: "Passkeys and session control" },
                        { icon: Bell, label: "Notification Logic", desc: "Email and push system alerts" },
                        { icon: Cloud, label: "Network Configuration", desc: "API and cloud storage links" }
                    ].map((item, idx) => (
                        <button key={item.label} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${idx === 0 ? "bg-white shadow-sm border border-slate-200" : "hover:bg-slate-50"}`}>
                            <div className={`p-2 rounded-xl ${idx === 0 ? "bg-[#4CAF50] text-white" : "bg-slate-100 text-slate-400"}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{item.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Right Column - Profile Form (Mock) */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 font-sans">Account Profile</h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-slate-100 border-4 border-slate-50 flex items-center justify-center font-black text-2xl text-slate-300">SA</div>
                            <button className="px-4 py-2 border border-[#4CAF50] text-[#4CAF50] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#4CAF50] hover:text-white transition-all">Change Avatar</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Identity</label>
                                <input disabled value="SuperAdmin Root" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-600" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Level</label>
                                <input disabled value="Root Level Access" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-[#4CAF50]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
