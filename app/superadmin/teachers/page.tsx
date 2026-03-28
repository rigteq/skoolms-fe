"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, X, Loader2, CheckCircle } from "lucide-react";
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

    const dummyTeachers = [
        { user_id: "550e8400-e29b-41d4-a716-446655440000", class_ids: ["CL-10A", "CL-12B"], subject_specialization: "Mathematics", created_at: "2024-01-15T10:00:00Z", updated_at: "2024-03-20T12:00:00Z", status: "Active" },
        { user_id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", class_ids: ["CL-11A"], subject_specialization: "Physics", created_at: "2024-01-20T09:30:00Z", updated_at: "2024-03-22T14:20:00Z", status: "Active" },
        { user_id: "7d444840-9dc0-11d1-b245-5ffd6af44a91", class_ids: ["CL-10B", "CL-09A"], subject_specialization: "Chemistry", created_at: "2024-02-10T11:15:00Z", updated_at: "2024-03-18T16:45:00Z", status: "Inactive" },
        { user_id: "e62d0bd1-71fb-464a-95f7-6a15cc906644", class_ids: ["CL-11B", "CL-12A"], subject_specialization: "English Literature", created_at: "2024-02-15T08:00:00Z", updated_at: "2024-03-25T10:30:00Z", status: "Active" },
        { user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", class_ids: ["CL-10A", "CL-08C"], subject_specialization: "Computer Science", created_at: "2024-02-28T14:50:00Z", updated_at: "2024-03-26T11:20:00Z", status: "Active" },
        { user_id: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8", class_ids: ["CL-11A", "CL-12C"], subject_specialization: "History", created_at: "2024-03-01T12:00:00Z", updated_at: "2024-03-20T09:00:00Z", status: "Active" },
        { user_id: "z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4", class_ids: ["CL-09B"], subject_specialization: "Geography", created_at: "2023-12-05T10:00:00Z", updated_at: "2024-03-15T13:45:00Z", status: "Inactive" },
        { user_id: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7", class_ids: ["CL-10C", "CL-11D"], subject_specialization: "Biology", created_at: "2024-01-05T08:30:00Z", updated_at: "2024-03-10T15:10:00Z", status: "Active" },
        { user_id: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8", class_ids: ["CL-12A"], subject_specialization: "Economics", created_at: "2024-02-12T09:00:00Z", updated_at: "2024-03-22T10:00:00Z", status: "Active" },
        { user_id: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9", class_ids: ["CL-10A", "CL-11B", "CL-12A"], subject_specialization: "Physical Education", created_at: "2024-01-25T11:00:00Z", updated_at: "2024-03-24T12:30:00Z", status: "Active" }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredTeachers = dummyTeachers.filter(teacher =>
        teacher.subject_specialization.toLowerCase().includes(pageSearch.toLowerCase()) ||
        teacher.user_id.toLowerCase().includes(pageSearch.toLowerCase())
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
        <div className="p-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Teachers Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage faculty records and classroom assignments across your institution.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-xl hover:shadow-lg transition-all shadow-md font-bold text-sm group"
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
                            placeholder="Filter by subject or user ID..."
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
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4">Teacher ID</th>
                                <th className="px-6 py-4">Subject Specialization</th>
                                <th className="px-6 py-4 text-center">Classes Assigned</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4">Updated At</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((teacher, idx) => (
                                    <tr key={teacher.user_id} className="hover:bg-slate-50/60 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs text-slate-700 font-bold">
                                                {teacher.user_id.substring(0, 8)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-800">{teacher.subject_specialization}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap items-center justify-center gap-1.5">
                                                {teacher.class_ids.map(id => (
                                                    <span key={id} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-[10px] font-bold">
                                                        {id}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {formatDate(teacher.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {formatDate(teacher.updated_at)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${teacher.status === "Active"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-rose-50 text-rose-700 border border-rose-100"
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${teacher.status === "Active" ? "bg-emerald-500" : "bg-rose-500"
                                                    }`}></span>
                                                {teacher.status}
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
                    <span>Showing {filteredTeachers.length} of {dummyTeachers.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40" disabled>Previous</button>
                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 text-lg">Add New Teacher</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddTeacher} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">
                                    Subject Specialization <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Mathematics, Physics"
                                    value={formData.subject_specialization}
                                    onChange={(e) => setFormData(prev => ({ ...prev, subject_specialization: e.target.value }))}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">
                                    Assign Classes <span className="text-slate-400 text-xs font-medium">(Select multiple)</span>
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["CL-08A", "CL-08B", "CL-09A", "CL-09B", "CL-10A", "CL-10B", "CL-11A", "CL-12A", "CL-12B"].map(cls => (
                                        <button
                                            key={cls}
                                            type="button"
                                            onClick={() => toggleClassId(cls)}
                                            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${formData.class_ids.includes(cls)
                                                ? "bg-[#4CAF50] border-[#4CAF50] text-white shadow-md transform scale-105"
                                                : "bg-slate-50 border-slate-200 text-slate-500 hover:border-[#4CAF50]/30 hover:bg-slate-100"
                                                }`}
                                        >
                                            {cls}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-bold rounded-xl shadow-lg shadow-[#4CAF50]/20 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center min-h-[44px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Creating...
                                        </>
                                    ) : "Create Teacher"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {showSuccessToast && (
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
            )}
        </div>
    );
}
