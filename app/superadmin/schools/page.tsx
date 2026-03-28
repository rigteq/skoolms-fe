"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, MapPin, Phone, X, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchoolsPage() {
    const router = useRouter();
    const [pageSearch, setPageSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [form, setForm] = useState({
        school_name: "",
        address: "",
        phone: "",
        email: ""
    });

    const [errors, setErrors] = useState({
        school_name: "",
        email: ""
    });

    const dummySchools = [
        { id: "550e8400-e29b-41d4-a716-446655440000", school_name: "Green Valley International", address: "123 Education Lane, Delhi", phone: "+91 98765-43210", email: "contact@greenvalley.edu", created_at: "2024-01-10T08:00:00Z", updated_at: "2024-03-15T10:30:00Z", is_deleted: false },
        { id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", school_name: "St. Xavier's Academy", address: "45 Cathedral Road, Mumbai", phone: "+91 22-2456-7890", email: "info@stxaviers.ac.in", created_at: "2023-11-20T09:15:00Z", updated_at: "2024-02-28T14:45:00Z", is_deleted: false },
        { id: "7d444840-9dc0-11d1-b245-5ffd6af44a91", school_name: "Modern Public School", address: "78 Heritage Mall, Bangalore", phone: "+91 80-2345-6789", email: "admin@mps.edu.in", created_at: "2024-02-05T11:00:00Z", updated_at: "2024-03-10T11:00:00Z", is_deleted: true },
        { id: "e62d0bd1-71fb-464a-95f7-6a15cc906644", school_name: "Oakridge International", address: "Plot 23, Jubilee Hills, Hyderabad", phone: "+91 40-2354-1234", email: "admissions@oakridge.edu", created_at: "2023-12-15T08:45:00Z", updated_at: "2024-03-20T16:20:00Z", is_deleted: false },
        { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", school_name: "The Doon School", address: "Mall Road, Dehradun", phone: "+91 135-275-7001", email: "headmaster@doonschool.com", created_at: "2023-09-01T10:00:00Z", updated_at: "2024-01-15T09:30:00Z", is_deleted: false },
        { id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8", school_name: "Little Angels School", address: "Sector 7, Sonipat", phone: "+91 130-223-4567", email: "office@littleangels.com", created_at: "2024-03-01T12:00:00Z", updated_at: "2024-03-01T12:00:00Z", is_deleted: false },
        { id: "z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4", school_name: "Global Indian School", address: "Knowledge Park, Pune", phone: "+91 20-2345-1122", email: "reachus@globalindian.edu", created_at: "2023-10-15T14:20:00Z", updated_at: "2024-02-12T13:10:00Z", is_deleted: true },
        { id: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7", school_name: "Presidency School", address: "Koramangala, Bangalore", phone: "+91 80-2553-9000", email: "contact@presidency.edu", created_at: "2024-01-25T09:00:00Z", updated_at: "2024-03-24T12:00:00Z", is_deleted: false }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredSchools = dummySchools.filter(school =>
        school.school_name.toLowerCase().includes(pageSearch.toLowerCase()) ||
        school.email.toLowerCase().includes(pageSearch.toLowerCase())
    );

    const validate = () => {
        let isValid = true;
        const newErrors = { school_name: "", email: "" };

        if (!form.school_name.trim()) {
            newErrors.school_name = "School name is required";
            isValid = false;
        }

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateSchool = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));

        const payload = {
            id: crypto.randomUUID(),
            ...form,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_deleted: false
        };

        console.log("Mock API Payload:", payload);

        setIsSubmitting(false);
        setIsModalOpen(false);
        setForm({ school_name: "", address: "", phone: "", email: "" });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // ESC to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Schools Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Overview of all registered educational institutions in the system.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-xl hover:shadow-lg transition-all shadow-md font-bold text-sm group"
                >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add School
                </button>
            </div>

            {/* Dashboard Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

                {/* Search Bar */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={pageSearch}
                            onChange={(e) => setPageSearch(e.target.value)}
                            placeholder="Filter schools by name or email..."
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

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">School Details</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4">Date Range</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredSchools.length > 0 ? (
                                filteredSchools.map((school) => (
                                    <tr key={school.id} className="hover:bg-slate-50/60 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs text-slate-700 font-bold">
                                                {school.id.substring(0, 8)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-[13px]">{school.school_name}</span>
                                                <span className="text-[11px] text-slate-400 truncate max-w-[150px]">{school.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center text-slate-600 font-semibold text-[12px]">
                                                    <Search className="w-3 h-3 mr-1.5 text-slate-300" /> {school.email}
                                                </div>
                                                <div className="flex items-center text-slate-400 text-[11px] font-medium">
                                                    <Phone className="w-3 h-3 mr-1.5 text-slate-300" /> {school.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-start">
                                                <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-300 mt-0.5" />
                                                <span className="text-[12px] leading-relaxed max-w-[200px] font-medium">{school.address}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${!school.is_deleted
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-rose-50 text-rose-700 border border-rose-100"
                                                }`}>
                                                {!school.is_deleted ? "Active" : "Deleted"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-[11px] gap-1">
                                                <span className="text-slate-400">Created: <b className="text-slate-500 font-bold">{formatDate(school.created_at)}</b></span>
                                                <span className="text-slate-400">Updated: <b className="text-slate-500 font-bold">{formatDate(school.updated_at)}</b></span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Edit school">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete school">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                                <Search className="w-10 h-10 text-slate-300" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">No schools found</h3>
                                            <p className="text-slate-500 text-sm mt-2 max-w-sm">We couldn't find any schools matching your search. Please check the spelling or try different filters.</p>
                                            <button
                                                onClick={() => setPageSearch("")}
                                                className="mt-6 px-6 py-2 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors"
                                            >
                                                Clear Search Result
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Bar */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">
                    <span>Showing {filteredSchools.length} of {dummySchools.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40" disabled>Previous</button>
                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Modal & Toast */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Add New School</h2>
                                <p className="text-slate-500 text-xs mt-1 font-medium">Register a new institution to the platform.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-slate-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSchool} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">School Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.school_name}
                                        onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${errors.school_name ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10'} outline-none transition-all font-medium text-sm`}
                                        placeholder="e.g. Oxford Public School"
                                    />
                                    {errors.school_name && <p className="text-rose-500 text-[10px] mt-1.5 font-bold">{errors.school_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${errors.email ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10'} outline-none transition-all font-medium text-sm`}
                                        placeholder="admin@school.com"
                                    />
                                    {errors.email && <p className="text-rose-500 text-[10px] mt-1.5 font-bold">{errors.email}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                                        <input
                                            type="text"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 outline-none transition-all font-medium text-sm"
                                            placeholder="+91 00000-00000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                                        <input
                                            type="text"
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 outline-none transition-all font-medium text-sm"
                                            placeholder="City, State"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all font-bold text-sm flex items-center justify-center disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Registering...
                                        </>
                                    ) : "Create School"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showToast && (
                <div className="fixed bottom-8 right-8 z-[60] animate-in slide-in-from-right-10 duration-500">
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center border-l-4 border-emerald-500">
                        <div className="bg-emerald-500/20 p-2 rounded-lg mr-4">
                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Success!</p>
                            <p className="text-slate-400 text-xs mt-0.5">School has been onboarded successfully.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
