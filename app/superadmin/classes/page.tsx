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
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [schools, setSchools] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:5000/api/classes", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (data.success) {
                    setClasses(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredClasses = Array.isArray(classes)
        ? classes.filter(cls =>
            cls.class_name?.toLowerCase().includes(pageSearch.toLowerCase()) ||
            cls.academic_year?.toLowerCase().includes(pageSearch.toLowerCase())
        )
        : [];

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
        } else if (!/^([1-9]|1[0-2])(-[A-Z])?$/.test(form.class_name.trim())) {
            newErrors.class_name = "Format must be like 1, 12, 1-A, 12-B";
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

        try {
            const token = localStorage.getItem("token");

            const payload = {
                school_id: form.school_id,
                class_name: form.class_name.trim(),
                academic_year: form.academic_year.trim(),
                class_teacher_id: form.class_teacher_id || null,
            };

            const res = await fetch("http://localhost:5000/api/classes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                alert(data.message || "Failed to create class");
                setIsSubmitting(false);
                return;
            }

            // Refresh Class List
            const classRes = await fetch("http://localhost:5000/api/classes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const classData = await classRes.json();

            if (classData.success) {
                setClasses(classData.data);
            }

            setForm({
                school_id: "",
                class_name: "",
                academic_year: "",
                class_teacher_id: "",
            });

            setIsModalOpen(false);
            setShowToast(true);

            setTimeout(() => setShowToast(false), 3000);

        } catch (err) {
            console.error(err);
            alert("Something went wrong while creating class");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const token = localStorage.getItem("token");

                const [schoolRes, teacherRes] = await Promise.all([
                    fetch("http://localhost:5000/api/schools", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch("http://localhost:5000/api/teachers", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const schoolData = await schoolRes.json();
                const teacherData = await teacherRes.json();

                if (schoolData.success) setSchools(schoolData.data);
                if (teacherData.success) setTeachers(teacherData.data);

            } catch (err) {
                console.error("Dropdown fetch failed:", err);
            }
        };

        fetchDropdowns();
    }, []);

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
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Classes Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Configure academic years and manage classroom teacher assignments.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-xl hover:shadow-lg transition-all shadow-md font-bold text-sm group"
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
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Class Name</th>
                                <th className="px-6 py-4 text-left">School Name</th>
                                <th className="px-6 py-4 text-left">Class Teacher Name</th>
                                <th className="px-6 py-4 text-left">Academic Year</th>
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
                                                Loading Classes...
                                            </h3>

                                            {/* Subtitle */}
                                            <p className="text-sm text-slate-400 italic">
                                                Fetching class records from server
                                            </p>

                                        </div>
                                    </td>
                                </tr>
                            ) : filteredClasses.length > 0 ? (
                                filteredClasses.map((cls) => (
                                    <tr key={cls.id} className="hover:bg-slate-50/40 transition-all group/row">

                                        {/* ID */}
                                        <td className="px-6 py-4">
                                            {cls.id.substring(0, 8) || "N/A"}
                                        </td>

                                        {/* School Name*/}
                                        <td className="px-6 py-4">
                                            {cls.class_name || "N/A"}
                                        </td>

                                        {/* Class */}
                                        <td className="px-6 py-4">
                                            {cls.school_name || "N/A"}
                                        </td>

                                        {/* Teacher */}
                                        <td className="px-6 py-4">
                                            {cls.class_teacher_name || "N/A"}
                                        </td>

                                        {/* Academic Year */}
                                        <td className="px-6 py-4">
                                            {cls.academic_year}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 w-[120px]">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-32 text-center">
                                        <h3 className="text-lg font-bold text-slate-400">No Classes Found</h3>
                                        <p className="text-slate-400 text-sm italic">Try adjusting your search filters or add a new class.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Simulation */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">
                    <span>Showing {filteredClasses.length} of {classes.length} records</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40" disabled>Previous</button>
                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div>

            {/* Modal & Toast */}
            {
                isModalOpen && (
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
                                    <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-800 text-xl uppercase tracking-widest">
                                        New Class
                                    </h3>
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleCreateClass}
                                className="flex-1 overflow-y-auto p-8 custom-scrollbar"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                    {/* School */}
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                            Select School <span className="text-rose-500">*</span>
                                        </label>

                                        <div className="relative">
                                            <select
                                                value={form.school_id}
                                                onChange={(e) =>
                                                    setForm({ ...form, school_id: e.target.value })
                                                }
                                                className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 appearance-none focus:ring-4 outline-none transition-all ${errors.school_id
                                                    ? "border-rose-300 focus:ring-rose-50"
                                                    : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                                    }`}
                                            >
                                                <option value="">Select a school...</option>
                                                {schools.map((s) => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.school_name}
                                                    </option>
                                                ))}
                                            </select>

                                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>

                                        {errors.school_id && (
                                            <p className="text-[9px] text-rose-500 font-bold ml-1">
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
                                            value={form.class_name}
                                            onChange={(e) =>
                                                setForm({ ...form, class_name: e.target.value })
                                            }
                                            placeholder="e.g. Grade 10"
                                            className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.class_name
                                                ? "border-rose-300 focus:ring-rose-50"
                                                : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                                }`}
                                        />

                                        {errors.class_name && (
                                            <p className="text-[9px] text-rose-500 font-bold ml-1">
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
                                            value={form.academic_year}
                                            onChange={(e) =>
                                                setForm({ ...form, academic_year: e.target.value })
                                            }
                                            placeholder="2025-2026"
                                            className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.academic_year
                                                ? "border-rose-300 focus:ring-rose-50"
                                                : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                                }`}
                                        />

<<<<<<< HEAD
                                        {errors.academic_year && (
                                            <p className="text-[9px] text-rose-500 font-bold ml-1">
                                                {errors.academic_year}
                                            </p>
                                        )}
                                    </div>
=======
                                    <input
                                        type="text"
                                        placeholder="e.g. Class 10-A"
                                        value={form.class_name}
                                        onChange={(e) => {
                                            let val = e.target.value.toUpperCase().replace(/[^0-9A-Z-]/g, '');
                                            setForm({ ...form, class_name: val });
                                        }}
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.class_name
                                            ? "border-rose-300 focus:ring-rose-50"
                                            : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                            }`}
                                    />
>>>>>>> ee406cc (Rebase)

                                    {/* Teacher */}
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                            Assign Class Teacher
                                        </label>

                                        <div className="relative">
                                            <select
                                                value={form.class_teacher_id}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        class_teacher_id: e.target.value,
                                                    })
                                                }
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                            >
                                                <option value="">Select Teacher (Optional)</option>
                                                {teachers.map((t) => (
                                                    <option key={t.id} value={t.id}>
                                                        {t.full_name}
                                                    </option>
                                                ))}
                                            </select>

                                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                                        Cancel Class
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-lg transition-all flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            "Create Class"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Success Toast */}
            {
                showToast && (
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
                )
            }
        </div >
    );
}
