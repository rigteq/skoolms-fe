"use client";

import {
    GraduationCap,
    BookOpen,
    Users,
    Search,
    Plus,
    Edit,
    Trash2
} from "lucide-react";

import { useState, useEffect } from "react";

// ✅ TYPE
type ClassType = {
    id: string;
    class_name: string;
    academic_year: string;
    class_teacher_name: string | null;
    students?: number;
};

export default function ClassesPage() {
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ✅ FETCH DATA
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/v1/classes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("API Response:", data); // ✅ debug

                setClasses(data?.data || []); // ✅ safe
                setLoading(false);
            })
            .catch(err => {
                console.error("Error:", err);
                setClasses([]); // ✅ fallback
                setLoading(false);
            });
    }, []);

    // ✅ LOADING
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-lg font-semibold text-slate-600">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <>
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Classes Management
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Manage class structures
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-5 py-2.5 bg-[#3b71ca] text-white rounded-xl"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Class
                </button>
            </div>

            {/* SEARCH */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search class..."
                        className="w-full pl-10 py-2 border rounded-lg"
                    />
                </div>
            </div>

            {/* TOTAL */}
            <div className="mb-6 flex items-center gap-3">
                <BookOpen />
                <span className="font-bold">
                    Total Classes: {classes?.length || 0}
                </span>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {classes.map((cls, idx) => (
                    <div
                        key={cls.id}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-[#3b71ca]/30 hover:shadow-xl transition-all group overflow-hidden flex flex-col"
                    >
                        {/* TOP BORDER */}
                        <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#3b71ca] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
                                    <GraduationCap className="w-6 h-6" />
                                </div>

                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* CLASS NAME */}
                            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#3b71ca]">
                                {cls.class_name}
                            </h3>

                            {/* YEAR */}
                            <div className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold mb-6">
                                Batch {cls.academic_year}
                            </div>

                            {/* DETAILS */}
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex justify-between">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" />
                                        Class Teacher
                                    </span>
                                    <span className="text-sm font-bold">
                                        {cls.class_teacher_name || "Not Assigned"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Users className="w-3.5 h-3.5" />
                                        Students
                                    </span>
                                    <span className="text-sm font-bold">
                                        {cls.students ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Add Class
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsModalOpen(false);
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Class Name"
                                className="w-full mb-3 p-2 border rounded"
                                required
                            />

                            <select className="w-full mb-3 p-2 border rounded">
                                <option>2025-26</option>
                            </select>

                            <button className="w-full bg-blue-500 text-white py-2 rounded">
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}