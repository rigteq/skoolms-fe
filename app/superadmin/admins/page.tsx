"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, Mail, Phone, MapPin, ShieldCheck, Calendar, ArrowRight, Users, X, Loader2, CheckCircle, GraduationCap, ChevronDown } from "lucide-react";

export default function AdminsPage() {
    // --- Dashboard States ---
    const [pageSearch, setPageSearch] = useState("");
    const [showToast, setShowToast] = useState(false);

    // --- Modal & Form States ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const firstInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        dob: "",
        role: "",
        school_id: "",
        address: ""
    });

    // Dummy Schools
    const schools = [
        { id: "sch-01", name: "Green Valley School" },
        { id: "sch-02", name: "St. Xavier's Academy" },
        { id: "sch-03", name: "Modern Public School" }
    ];

    // Superadmins
    const [admins, setAdmins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const token = localStorage.getItem("token");

                console.log("TOKEN:", token);

                const res = await fetch("http://localhost:5000/api/admins", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                console.log("STATUS:", res.status);

                if (!res.ok) {
                    const text = await res.text();
                    console.error("BACKEND ERROR:", text);
                    throw new Error("Failed to fetch admins");
                }

                const data = await res.json();

                setAdmins(data);

            } catch (error) {
                console.error("Error fetching admins:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    // Handle ESC to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus first input on open
    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => firstInputRef.current?.focus(), 100);
        }
    }, [isModalOpen]);

    const formatDate = (date: string) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!form.role) newErrors.role = "Role selection is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newAdminPayload = {
            id: crypto.randomUUID(),
            ...form,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        console.log("🚀 Admin Creation Payload:", newAdminPayload);

        setIsSubmitting(false);
        setIsModalOpen(false);
        setShowToast(true);

        // Reset form
        setForm({
            full_name: "",
            email: "",
            phone: "",
            dob: "",
            role: "",
            school_id: "",
            address: ""
        });
        setErrors({});

        // Auto hide toast
        setTimeout(() => setShowToast(false), 3000);
    };

    const filteredAdmins = admins.filter(admin =>
        admin.full_name.toLowerCase().includes(pageSearch.toLowerCase()) ||
        admin.email.toLowerCase().includes(pageSearch.toLowerCase()) ||
        admin.phone.includes(pageSearch)
    );

    return (
        <div className="p-8 bg-slate-50/50 min-h-screen">

            {/* --- DASHBOARD HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admins Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage system administrators, their roles, and access across all schools.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
                >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add Admin
                </button>
            </div>

            {/* --- TABLE CONTAINER --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">

                {/* Search & Filter */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={pageSearch}
                            onChange={(e) => setPageSearch(e.target.value)}
                            placeholder="Filter admins by name, email, or phone..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
                            <Filter className="w-4 h-4 mr-2 text-slate-400" />
                            Sort Filters
                        </button>
                    </div>
                </div>

                {/* Table UI */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-extrabold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-6 py-4">Profile & ID</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Role & School</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4">Activity</th>
                                <th className="px-6 py-4 text-center w-[120px]">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50 border-b border-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">

                                            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#4CAF50] animate-spin"></div>

                                            <h3 className="text-lg font-bold text-slate-500">
                                                Loading Admins...
                                            </h3>

                                            {/* Subtitle */}
                                            <p className="text-sm text-slate-400 italic">
                                                Fetching admin records from server
                                            </p>

                                        </div>
                                    </td>
                                </tr>
                            ) : filteredAdmins.length > 0 ? (
                                filteredAdmins.map((admin) => (
                                    <tr key={admin.id} className="hover:bg-slate-50/40 transition-all group/row">
                                        <td className="px-8 py-6">
                                            {admin.full_name}
                                            <span className="block text-[10px] text-slate-400 mt-1 uppercase font-mono tracking-tighter">UID: {admin.id.substring(0, 8)}...</span>
                                            <div className="flex items-center gap-1 mt-2 text-xs font-bold text-slate-500">
                                                <Calendar className="w-3 h-3 text-slate-300" /> {formatDate(admin.dob)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center text-slate-600 font-bold text-[12px]">
                                                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-300" /> {admin.email}
                                                </div>
                                                <div className="flex items-center text-slate-500 text-[12px] font-medium">
                                                    <Phone className="w-3.5 h-3.5 mr-2 text-slate-300" /> {admin.phone}
                                                </div>
                                                <div className="flex items-center text-slate-400 text-[11px] italic">
                                                    <MapPin className="w-3 h-3 mr-2" /> {admin.current_address}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold">
                                            <div className="flex flex-col gap-2">
                                                <div className="inline-flex items-center px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100 self-start">
                                                    <ShieldCheck className="w-3 h-3 mr-1.5" /> {admin.role_name}
                                                </div>
                                                <div className="flex items-center text-slate-500 text-[11px]">
                                                    <ArrowRight className="w-3 h-3 mr-2 text-slate-300" /> {admin.school_name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${!admin.is_active ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${!admin.is_active ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                                                {!admin.is_active ? "Active" : "Terminated"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-[11px] font-bold">
                                                <span className="text-slate-400">Join: <b className="text-slate-600">{formatDate(admin.created_at)}</b></span>
                                                <span className="text-slate-300 text-[10px] mt-0.5 whitespace-nowrap">Last Active: {admin.last_login ? formatDate(admin.last_login) : "Offline"}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 w-[120px]">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Eye className="w-4 h-4" /></button>
                                                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                                                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-32 text-center">
                                        <Users className="w-12 h-12 mx-auto text-slate-200 mb-4" />
                                        <h3 className="text-lg font-bold text-slate-400">No Administrators Found</h3>
                                        <p className="text-slate-400 text-sm italic">Try adjusting your search filters or add a new admin.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Bar */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">

                    <span>
                        Showing {filteredAdmins.length} of {admins.length} entries
                    </span>

                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40"
                            disabled
                        >
                            Previous
                        </button>

                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">
                            1
                        </button>

                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* --- CREATE ADMIN MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
                    {/* Dark Overlay with Blur */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Content Container */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">

                        {/* Modal Title Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-xl tracking-tight uppercase tracking-widest">New Admin</h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all shadow-sm group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        {/* Modal Body / Form Section (Scrollable) */}
                        <form onSubmit={handleCreateAdmin} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* Full Name Field */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Name <span className="text-rose-500">*</span></label>
                                    <input
                                        ref={firstInputRef}
                                        type="text"
                                        placeholder="Full legal name of the admin"
                                        value={form.full_name}
                                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.full_name ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"}`}
                                    />
                                    {errors.full_name && <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">{errors.full_name}</p>}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email <span className="text-rose-500">*</span></label>
                                    <input
                                        type="email"
                                        placeholder="example@school.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.email ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"}`}
                                    />
                                    {errors.email && <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">{errors.email}</p>}
                                </div>

                                {/* Phone Field */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+91"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                    />
                                </div>

                                {/* Role Selection */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Role <span className="text-rose-500">*</span></label>
                                    <div className="relative">
                                        <select
                                            value={form.role}
                                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                                            className={`w-full pl-5 pr-10 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all appearance-none ${errors.role ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"}`}
                                        >
                                            <option value="">Select Priority Level</option>
                                            <option value="SUPER_ADMIN">SUPER_ADMIN (Global Access)</option>
                                            <option value="ADMIN">ADMIN (Standard Access)</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                    {errors.role && <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">{errors.role}</p>}
                                </div>

                                {/* School Selection */}
                                <div className="space-y-1.5 font-bold">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 tracking-tighter">Operating Hub (School)</label>
                                    <div className="relative">
                                        <select
                                            value={form.school_id}
                                            onChange={(e) => setForm({ ...form, school_id: e.target.value })}
                                            className="w-full pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select Registry Hub</option>
                                            {schools.map(school => (
                                                <option key={school.id} value={school.id}>{school.name}</option>
                                            ))}
                                        </select>
                                        <GraduationCap className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>

                                {/* DOB Field */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Birth Timeline</label>
                                    <input
                                        type="date"
                                        value={form.dob}
                                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                    />
                                </div>

                                {/* Address Field */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Residential Coordinates</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Full physical address..."
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Modal Footer (Fixed relative to form box) */}
                            <div className="mt-10 flex gap-4 flex-shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    Cancel Operations
                                </button>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#4CAF50]/40 transition-all disabled:opacity-50 flex items-center justify-center min-h-[56px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                                            Authenticating & Deploying...
                                        </>
                                    ) : (
                                        "Create Admin"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- SUCCESS TOAST NOTIFICATION --- */}
            {showToast && (
                <div className="fixed bottom-10 right-10 z-[60] bg-slate-900 border border-slate-800 text-white px-8 py-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-5 animate-in slide-in-from-right duration-500">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div className="pr-6 border-r border-slate-800">
                        <p className="font-black text-sm tracking-tight leading-none text-white uppercase">Registry Success</p>
                        <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">Admin credentials generated</p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="text-slate-500 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* --- PAGE CSS (Tailwind Custom Scrollbar Shorthand) --- */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(203, 213, 225, 0.4);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.6);
                }
            `}</style>

        </div>
    );
}