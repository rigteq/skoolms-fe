"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, X, Loader2, CheckCircle, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeachersPage() {
    const router = useRouter();
    const [pageSearch, setPageSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [formData, setFormData] = useState({
        subject_specialization: "",
        class_ids: [] as string[]
    });
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTeachers = async () => {
        try {
            const token = localStorage.getItem("token"); //   ADD HERE

            console.log("Token:", token); // (optional debug)

            const res = await fetch("http://localhost:5000/api/teachers", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const json = await res.json();

            console.log("API response:", json);

            const data = Array.isArray(json.data) ? json.data : [];

            const formatted = data.map((t: any) => ({
                id: t.id || t.user_id,
                subject_specialization: t.subject_specialization || "",
                classes: t.classes || [],
                created_at: t.created_at,
                updated_at: t.updated_at,
                status: t.status || "Active"
            }));

            setTeachers(formatted);

        } catch (error) {
            console.error("Error fetching teachers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();  //   MUST
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.subject_specialization?.toLowerCase().includes(pageSearch.toLowerCase()) ||
        teacher.id?.toLowerCase().includes(pageSearch.toLowerCase())
    );

    const handleAddTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const payload = {
            user_id: crypto.randomUUID(),
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: "Active"
        };

        console.log("New Teacher Created:", payload);

        setIsSubmitting(false);
        setIsModalOpen(false);
        setFormData({ subject_specialization: "", class_ids: [] });
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const toggleClassId = (id: string) => {
        setFormData(prev => ({
            ...prev,
            class_ids: prev.class_ids.includes(id)
                ? prev.class_ids.filter(item => item !== id)
                : [...prev.class_ids, id]
        }));
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
        <div className="p-8 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Teachers Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage faculty records and classroom assignments across your institution.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
                >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add Teacher
                </button>
            </div>

            {/* Table Container Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

                {/* Search & Action Bar */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={pageSearch}
                            onChange={(e) => setPageSearch(e.target.value)}
                            placeholder="Filter teachers by subject or user ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
                            <Filter className="w-4 h-4 mr-2 text-slate-400" />
                            Sort Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4">Teacher ID</th>
                                <th className="px-6 py-4">Subject Specialization</th>
                                <th className="px-6 py-4 text-left">Classes Assigned</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4">Updated At</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center w-[120px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 border-b border-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">

                                            {/* Spinner */}
                                            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#4CAF50] animate-spin"></div>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-slate-500">
                                                Loading Teachers...
                                            </h3>

                                            {/* Subtitle */}
                                            <p className="text-sm text-slate-400 italic">
                                                Fetching teacher records from server
                                            </p>

                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTeachers.length > 0 ? (
                                filteredTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-slate-50/60 group">

                                        <td className="px-6 py-4">
                                            <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                                                {teacher.id?.substring(0, 8) || "N/A"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-800">
                                                {teacher.subject_specialization}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {teacher.classes?.map((cls: string, i: number) => (
                                                    <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                                                        {cls}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            {formatDate(teacher.created_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(teacher.updated_at)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${teacher.status === "Active"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-rose-50 text-rose-700 border border-rose-100"
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${teacher.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                                                    }`}></span>
                                                {teacher.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 w-[120px]">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="View details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Edit school">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete school">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                <Search className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800">No teachers found</h3>
                                            <p className="text-slate-500 text-sm mt-1">Try adjusting your search criteria or subject filters.</p>
                                            <button
                                                onClick={() => setPageSearch("")}
                                                className="mt-4 text-sm font-bold text-[#4CAF50] hover:underline"
                                            >
                                                Clear all filters
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
                    <span>Showing {filteredTeachers.length} of {teachers.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40" disabled>Previous</button>
                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-xl uppercase tracking-widest">
                                    New Teacher
                                </h3>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleAddTeacher} className="flex-1 overflow-y-auto p-8">

                            <div className="space-y-6">

                                {/* Subject */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Subject Specialization <span className="text-rose-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Mathematics, Physics"
                                        value={formData.subject_specialization}
                                        onChange={(e) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                subject_specialization: e.target.value
                                            }))
                                        }
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none"
                                    />
                                </div>

                                {/* Classes */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Assign Classes
                                    </label>

                                    <div className="grid grid-cols-3 gap-3">
                                        {["CL-08A", "CL-08B", "CL-09A", "CL-09B", "CL-10A", "CL-10B", "CL-11A", "CL-12A", "CL-12B"].map(cls => (
                                            <button
                                                key={cls}
                                                type="button"
                                                onClick={() => toggleClassId(cls)}
                                                className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all
                                    ${formData.class_ids.includes(cls)
                                                        ? "bg-[#4CAF50]/10 text-[#2E7D32] border-[#4CAF50]/20"
                                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                                    }`}
                                            >
                                                {cls}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="mt-10 flex gap-4">

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50"
                                >
                                    Cancel Operations
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#4CAF50]/40 flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Create Teacher"
                                    )}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {
                showSuccessToast && (
                    <div className="fixed bottom-8 right-8 z-[60] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-500">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <div className="pr-4">
                            <p className="font-bold text-sm">Success!</p>
                            <p className="text-slate-400 text-xs">New teacher has been registered.</p>
                        </div>
                        <button onClick={() => setShowSuccessToast(false)} className="text-slate-500 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )
            }
        </div >
    );
}
