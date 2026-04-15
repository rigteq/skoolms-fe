"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, Mail, Phone, MapPin, User, Users, ArrowRight, X, Loader2, CheckCircle, ChevronDown, GraduationCap, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentsPage() {
    const router = useRouter();
    const [pageSearch, setPageSearch] = useState("");

    // Modal & Form States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [students, setStudents] = useState<any[]>([]);
    const [schools, setSchools] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        school_id: "",
        class_id: "",
        full_name: "",
        email: "",
        dob: "",
        phone: "",
        current_address: "",
        permanent_address: "",
        parent_name: "",
        parent_phone: ""
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading(true); // start loading

                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:5000/api/students", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const result = await res.json();

                if (result.success) {
                    setStudents(result.data);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false); // stop loading
            }
        };

        fetchStudents();
    }, []);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredStudents = students.filter(student =>
        student.full_name?.toLowerCase().includes(pageSearch.toLowerCase()) ||
        student.email?.toLowerCase().includes(pageSearch.toLowerCase()) ||
        student.phone?.includes(pageSearch)
    );

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!form.full_name.trim()) newErrors.full_name = "Full Name is required";
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const payload = {
            id: crypto.randomUUID(),
            ...form,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_deleted: false
        };

        console.log("Registered Student Payload:", payload);

        setIsSubmitting(false);
        setIsModalOpen(false);
        setShowToast(true);
        setForm({
            school_id: "", class_id: "", full_name: "", email: "",
            dob: "", phone: "", current_address: "", permanent_address: "",
            parent_name: "", parent_phone: ""
        });
        setTimeout(() => setShowToast(false), 3000);
    };

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
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Students Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium italic">Monitor student enrollments, academic progress, and personal records across all schools.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
                >
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add Student
                </button>
            </div>

            {/* Data Container with Card Style */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden flex flex-col">

                {/* Search & Filter Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={pageSearch}
                            onChange={(e) => setPageSearch(e.target.value)}
                            placeholder="filter student by name, email address, or phone number..."
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


                {/* Responsive Table UI */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-extrabold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py- text-left">Student Name</th>
                                <th className="px-6 py-4 text-left">Email</th>
                                <th className="px-6 py-4 text-left">DOB</th>
                                <th className="px-6 py-4 text-left">Current Address</th>
                                <th className="px-6 py-4 text-left">Parent Name</th>
                                <th className="px-6 py-4 text-left">Phone</th>
                                <th className="px-6 py-4 text-left">Class Name</th>
                                <th className="px-6 py-4 text-left">School Name</th>
                                <th className="px-6 py-4 text-center w-[120px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 border-b border-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={10} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#4CAF50] animate-spin"></div>
                                            <h3 className="text-lg font-bold text-slate-500">Loading students...</h3>
                                            <p className="text-sm text-slate-400 italic">
                                                Fetching student records from server
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/40 transition-all group/row">

                                        <td className="px-6 py-4">
                                            {student.id.substring(0, 8) || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.full_name || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.email || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.dob ? formatDate(student.dob) : "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.current_address || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.parent_name || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.parent_phone || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.class_name || "N/A"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {student.school_name || "N/A"}
                                        </td>

                                        <td className="px-6 py-4 w-[120px]">
                                            <div className="flex items-center justify-end gap-2">
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
                                    <td colSpan={10} className="px-8 py-32 text-center">
                                        <h3 className="text-lg font-bold text-slate-400">No Students Found</h3>
                                        <p className="text-slate-400 text-sm italic">Try adjusting your search filters or add a new student.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Professional Footer / Stats */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">
                    <span>Showing {filteredStudents.length} of {students.length} entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40" disabled>Previous</button>
                        <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
                    </div>
                </div>
            </div >

            {/* Enrollment Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                            onClick={() => setIsModalOpen(false)}
                        />

                        {/* Modal Body */}
                        <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
                            {/* Modal Header */}
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl tracking-tight">New Student</h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Academic Year 2026-27</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all shadow-sm group"
                                >
                                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleCreateStudent} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column: Academic & Personal */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black text-[#4CAF50] uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-6 h-[1px] bg-[#4CAF50]"></div> Academic Link
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">School</label>
                                                    <div className="relative">
                                                        <select
                                                            value={form.school_id}
                                                            onChange={(e) => setForm({ ...form, school_id: e.target.value })}
                                                            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                                        >
                                                            <option value="">Select School</option>
                                                            {schools.map(s => <option key={s.id} value={s.id}>{s.school_name}</option>)}
                                                        </select>
                                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Class</label>
                                                    <div className="relative">
                                                        <select
                                                            value={form.class_id}
                                                            onChange={(e) => setForm({ ...form, class_id: e.target.value })}
                                                            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 appearance-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                                        >
                                                            <option value="">Select Class</option>
                                                            {classes.map(c => <option key={c.id} value={c.id}>{c.class_name}</option>)}
                                                        </select>
                                                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black text-[#4CAF50] uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-6 h-[1px] bg-[#4CAF50]"></div> Student Identity
                                            </h4>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Full Name <span className="text-rose-500">*</span></label>
                                                <input
                                                    type="text"
                                                    autoFocus
                                                    placeholder="Enter full legal name"
                                                    value={form.full_name}
                                                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.full_name ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                                        }`}
                                                />
                                                {errors.full_name && <p className="text-[9px] text-rose-500 font-black uppercase tracking-wider ml-1">{errors.full_name}</p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5 font-bold">
                                                    <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        value={form.dob}
                                                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Personal Phone</label>
                                                    <input
                                                        type="tel"
                                                        placeholder="+91"
                                                        value={form.phone}
                                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="student@example.com"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.email ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                                        }`}
                                                />
                                                {errors.email && <p className="text-[9px] text-rose-500 font-black uppercase tracking-wider ml-1">{errors.email}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Address & Parental */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black text-[#4CAF50] uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-6 h-[1px] bg-[#4CAF50]"></div> Residency
                                            </h4>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Current Address</label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Local residency details"
                                                    value={form.current_address}
                                                    onChange={(e) => setForm({ ...form, current_address: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all resize-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Permanent Address</label>
                                                <textarea
                                                    rows={2}
                                                    placeholder="Permanent residency details"
                                                    value={form.permanent_address}
                                                    onChange={(e) => setForm({ ...form, permanent_address: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black text-[#4CAF50] uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-6 h-[1px] bg-[#4CAF50]"></div> Guardian Information
                                            </h4>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Parent/Guardian Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Guardian name"
                                                    value={form.parent_name}
                                                    onChange={(e) => setForm({ ...form, parent_name: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-black text-slate-700 ml-1 uppercase">Guardian Contact</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+91"
                                                    value={form.parent_phone}
                                                    onChange={(e) => setForm({ ...form, parent_phone: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Action Buttons */}
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
                                                Processing enrollment...
                                            </>
                                        ) : (
                                            "Create Student"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Success Toast Notification */}
            {
                showToast && (
                    <div className="fixed bottom-10 right-10 z-[60] bg-slate-900 border border-slate-800 text-white px-8 py-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-5 animate-in slide-in-from-right duration-500">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div className="pr-6 border-r border-slate-800">
                            <p className="font-black text-sm tracking-tight leading-none text-white uppercase">Registry Success</p>
                            <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">Student profile has been initialized</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="text-slate-500 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )
            }
        </div >
    );
}
