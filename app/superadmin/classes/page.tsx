"use client";
import React, { useState, useEffect } from "react";
import { Search, BookOpen, Plus, Eye, Edit, Trash2, Filter, School, X, Loader2, CheckCircle, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClassesPage() {
    const router = useRouter();
    const [pageSearch, setPageSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [form, setForm] = useState({
        school_id: "",
        class_name: "",
        academic_year: "",
        class_teacher_id: ""
    });

    const [errors, setErrors] = useState({
        school_id: "",
        class_name: "",
        academic_year: ""
    });

    const dummySchools = [
        { id: "550e8400-e29b-41d4-a716-446655440000", name: "Green Valley International" },
        { id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", name: "St. Xavier's Academy" },
        { id: "7d444840-9dc0-11d1-b245-5ffd6af44a91", name: "Modern Public School" }
    ];

    const dummyTeachers = [
        { id: "t1", name: "Dr. Sarah Johnson (Mathematics)" },
        { id: "t2", name: "Prof. Michael Chen (Physics)" },
        { id: "t3", name: "Ms. Emily White (English)" }
    ];

    const dummyClasses = [
        { id: "c1a2b3c4-d5e6-4789-a1b2-c3d4e5f6g7h8", school_name: "Green Valley International", school_id: "550e8400-e29b-41d4-a716-446655440000", class_name: "Class 10-A", academic_year: "2025-2026", class_teacher_id: "t8u9v0w1-x2y3-z4a5-b6c7-d8e9f0g1h2i3", created_at: "2024-01-15T09:00:00Z", updated_at: "2024-03-20T11:30:00Z", is_deleted: false },
        { id: "d2e3f4g5-h6i7-4890-j1k2-l3m4n5o6p7q8", school_name: "St. Xavier's Academy", school_id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", class_name: "Class 12-B", academic_year: "2025-2026", class_teacher_id: "u9v0w1x2-y3z4-a5b6-c7d8-e9f0g1h2i3j4", created_at: "2024-02-10T10:15:00Z", updated_at: "2024-03-22T14:45:00Z", is_deleted: false },
        { id: "e3f4g5h6-i7j8-4901-k2l3-m4n5o6p7q8r9", school_name: "Modern Public School", school_id: "7d444840-9dc0-11d1-b245-5ffd6af44a91", class_name: "Class 09-C", academic_year: "2024-2025", class_teacher_id: "v0w1x2y3-z4a5-b6c7-d8e9-f0g1h2i3j4k5", created_at: "2024-01-05T08:30:00Z", updated_at: "2024-02-28T16:00:00Z", is_deleted: true },
        { id: "f4g5h6i7-j8k9-4012-l3m4-n5o6p7q8r9s0", school_name: "Oakridge International", school_id: "e62d0bd1-71fb-464a-95f7-6a15cc906644", class_name: "Class 11-A", academic_year: "2025-2026", class_teacher_id: "w1x2y3z4-a5b6-c7d8-e9f0-g1h2i3j4k5l6", created_at: "2023-12-20T12:00:00Z", updated_at: "2024-03-18T09:20:00Z", is_deleted: false },
        { id: "g5h6i7j8-k9l0-4123-m4n5-o6p7q8r9s0t1", school_name: "Green Valley International", school_id: "550e8400-e29b-41d4-a716-446655440000", class_name: "Class 08-D", academic_year: "2025-2026", class_teacher_id: "x2y3z4a5-b6c7-d8e9-f0g1-h2i3j4k5l6m7", created_at: "2024-03-01T14:50:00Z", updated_at: "2024-03-25T13:10:00Z", is_deleted: false },
        { id: "h6i7j8k9-l0m1-4234-n5o6-p7q8r9s0t1u2", school_name: "St. Xavier's Academy", school_id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", class_name: "Class 10-B", academic_year: "2024-2025", class_teacher_id: "y3z4a5b6-c7d8-e9f0-g1h2-i3j4k5l6m7n8", created_at: "2023-11-15T09:45:00Z", updated_at: "2024-02-10T10:00:00Z", is_deleted: false },
        { id: "i7j8k9l0-m1n2-4345-o6p7-q8r9s0t1u2v3", school_name: "Presidency School", school_id: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7", class_name: "Class 12-A", academic_year: "2025-2026", class_teacher_id: "z4a5b6c7-d8e9-f0g1-h2i3-j4k5l6m7n8o9", created_at: "2024-01-30T11:15:00Z", updated_at: "2024-03-24T15:30:00Z", is_deleted: false },
        { id: "j8k9l0m1-n2o3-4456-p7q8-r9s0t1u2v3w4", school_name: "Oakridge International", school_id: "e62d0bd1-71fb-464a-95f7-6a15cc906644", class_name: "Class 07-A", academic_year: "2025-2026", class_teacher_id: "a5b6c7d8-e9f0-g1h2-i3j4-k5l6m7n8o9p0", created_at: "2024-02-25T08:20:00Z", updated_at: "2024-03-26T12:45:00Z", is_deleted: true }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredClasses = dummyClasses.filter(cls =>
        cls.class_name.toLowerCase().includes(pageSearch.toLowerCase()) ||
        cls.academic_year.toLowerCase().includes(pageSearch.toLowerCase())
    );

    const validate = () => {
        let isValid = true;
        const newErrors = { school_id: "", class_name: "", academic_year: "" };

        if (!form.school_id) {
            newErrors.school_id = "School selection is required";
            isValid = false;
        }
        if (!form.class_name.trim()) {
            newErrors.class_name = "Class name is required";
            isValid = false;
        }
        if (!form.academic_year.trim()) {
            newErrors.academic_year = "Academic year is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateClass = async (e: React.FormEvent) => {
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

        console.log("Mock API Payload (Classes):", payload);

        setIsSubmitting(false);
        setIsModalOpen(false);
        setForm({ school_id: "", class_name: "", academic_year: "", class_teacher_id: "" });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Classes Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Configure academic years and manage classroom teacher assignments.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
                >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add Class
                </button>
            </div>

            {/* Dashboard Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

                {/* Search & Filter Bar */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={pageSearch}
                            onChange={(e) => setPageSearch(e.target.value)}
                            placeholder="Filter by class name or academic year..."
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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Class Details</th>
                                <th className="px-6 py-4 font-center">School Name</th>
                                <th className="px-6 py-4">Class Teacher</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4">Date Stamped</th>
                                <th className="px-6 py-4 text-center w-[120px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 border-b border-slate-50">
                            {filteredClasses.length > 0 ? (
                                filteredClasses.map((cls) => (
                                    <tr key={cls.id} className="hover:bg-slate-50/60 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs text-slate-700 font-bold">
                                                {cls.id.substring(0, 8)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-[13px]">{cls.class_name}</span>
                                                <span className="text-[11px] text-[#4CAF50] font-bold px-2 py-0.5 bg-[#4CAF50]/5 self-start rounded mt-1 border border-[#4CAF50]/10 tracking-tight">{cls.academic_year}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-slate-600 font-semibold gap-2 italic">
                                                <School className="w-3.5 h-3.5 text-slate-300" />
                                                {cls.school_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 group/teacher">
                                                <div className="w-7 h-7 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                    ID
                                                </div>
                                                <span className="font-mono text-[11px] text-slate-500 font-medium">
                                                    {cls.class_teacher_id.substring(0, 8)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${!cls.is_deleted
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-rose-50 text-rose-700 border border-rose-100"
                                                }`}>
                                                <span className={`w-1 h-1 rounded-full mr-1.5 ${!cls.is_deleted ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                                                {!cls.is_deleted ? "Active" : "Deleted"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-[11px] gap-1">
                                                <span className="text-slate-400">Created: <b className="text-slate-500 font-bold">{formatDate(cls.created_at)}</b></span>
                                                <span className="text-slate-400">Updated: <b className="text-slate-500 font-bold">{formatDate(cls.updated_at)}</b></span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4  w-[120px]">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Edit class">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p- text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Remove class">
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
                                                <BookOpen className="w-10 h-10 text-slate-300" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-800 tracking-tight">No classes found</h3>
                                            <p className="text-slate-500 text-sm mt-2 max-w-sm">We couldn't find any classes matching your search or filters.</p>
                                            <button
                                                onClick={() => setPageSearch("")}
                                                className="mt-6 px-6 py-2 bg-slate-100 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors"
                                            >
                                                Reset All Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Simulation */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">
                    <span>Showing {filteredClasses.length} of {dummyClasses.length} records</span>
                    <div className="flex gap-2 font-black">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40" disabled>PREV</button>
                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">NEXT</button>
                    </div>
                </div>
            </div>

            {/* Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-xl uppercase tracking-widest">
                                    New Class
                                </h3>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleCreateClass} className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* School */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Select School <span className="text-rose-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <select
                                            value={form.school_id}
                                            onChange={(e) => setForm({ ...form, school_id: e.target.value })}
                                            className={`w-full pl-5 pr-10 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 appearance-none focus:ring-4 outline-none transition-all ${errors.school_id
                                                ? "border-rose-300 focus:ring-rose-50"
                                                : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                                }`}
                                        >
                                            <option value="">Select a school...</option>
                                            {dummySchools.map((s) => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>

                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    {errors.school_id && (
                                        <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">
                                            {errors.school_id}
                                        </p>
                                    )}
                                </div>

                                {/* Class Name */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Class Name <span className="text-rose-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Class 10-A"
                                        value={form.class_name}
                                        onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.class_name
                                            ? "border-rose-300 focus:ring-rose-50"
                                            : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                            }`}
                                    />

                                    {errors.class_name && (
                                        <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">
                                            {errors.class_name}
                                        </p>
                                    )}
                                </div>

                                {/* Academic Year */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Academic Year <span className="text-rose-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. 2025-2026"
                                        value={form.academic_year}
                                        onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.academic_year
                                            ? "border-rose-300 focus:ring-rose-50"
                                            : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                            }`}
                                    />

                                    {errors.academic_year && (
                                        <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">
                                            {errors.academic_year}
                                        </p>
                                    )}
                                </div>

                                {/* Teacher */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Assign Class Teacher
                                    </label>

                                    <div className="relative">
                                        <select
                                            value={form.class_teacher_id}
                                            onChange={(e) => setForm({ ...form, class_teacher_id: e.target.value })}
                                            className="w-full pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                        >
                                            <option value="">Select a teacher...</option>
                                            {dummyTeachers.map((t) => (
                                                <option key={t.id} value={t.id}>{t.name}</option>
                                            ))}
                                        </select>

                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="mt-10 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all"
                                >
                                    Cancel Operations
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#4CAF50]/40 transition-all disabled:opacity-50 flex items-center justify-center min-h-[56px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Create Class"
                                    )}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[60] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-500">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="pr-4 border-r border-slate-700">
                        <p className="font-bold text-sm leading-tight text-white">Success!</p>
                        <p className="text-slate-400 text-xs">New class has been organized.</p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="text-slate-500 hover:text-white transition-colors ml-2">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
