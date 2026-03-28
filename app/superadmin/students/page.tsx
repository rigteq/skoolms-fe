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
    const [errors, setErrors] = useState<Record<string, string>>({});

    const dummySchools = [
        { id: "sch-01", name: "Green Valley School" },
        { id: "sch-02", name: "St. Xavier's Academy" },
        { id: "sch-03", name: "Modern Public School" }
    ];

    const dummyClasses = [
        { id: "cls-10a", name: "Class 10-A" },
        { id: "cls-09b", name: "Class 09-B" },
        { id: "cls-12a", name: "Class 12-A" }
    ];

    const dummyStudents = [
        { id: "s1a2b3c4-d5f6-4789-a1b2-c3d4e5f6g7h8", school_id: "sch-01", school_name: "Green Valley School", class_id: "cls-10a", class_name: "Class 10-A", full_name: "Rahul Sharma", email: "rahul.s@example.com", dob: "2010-05-12", phone: "+91 9876543210", current_address: "B-42, Greenfield Colony, Delhi, India", permanent_address: "B-42, Greenfield Colony, Delhi, India", parent_name: "Rajesh Sharma", parent_phone: "+91 9123456789", created_at: "2026-01-10T10:00:00Z", updated_at: "2026-03-05T12:00:00Z", is_deleted: false },
        { id: "s2b3c4d5-e6f7-4890-a2b3-c4d5e6f7g8h9", school_id: "sch-01", school_name: "Green Valley School", class_id: "cls-09b", class_name: "Class 09-B", full_name: "Priya Patel", email: "priya.p@test.com", dob: "2011-08-22", phone: "+91 8765432109", current_address: "Flat 203, Sunny Heights, Mumbai, India", permanent_address: "Flat 203, Sunny Heights, Mumbai, India", parent_name: "Amit Patel", parent_phone: "+91 8887776665", created_at: "2026-02-15T11:30:00Z", updated_at: "2026-03-10T09:00:00Z", is_deleted: false },
        { id: "s3c4d5e6-f7g8-4901-a3b4-c5d6e7f8g9h0", school_id: "sch-02", school_name: "St. Xavier's Academy", class_id: "cls-12a", class_name: "Class 12-A", full_name: "James Wilson", email: "james.w@stx.edu", dob: "2008-11-05", phone: "+91 7654321098", current_address: "12/A Baker St, Bangalore, India", permanent_address: "12/A Baker St, Bangalore, India", parent_name: "Sarah Wilson", parent_phone: "+91 7776665554", created_at: "2026-01-05T08:00:00Z", updated_at: "2026-03-12T14:20:00Z", is_deleted: true },
        { id: "s4d5e6f7-g8h9-4012-a4b5-c6d7e8f9g0h1", school_id: "sch-02", school_name: "St. Xavier's Academy", class_id: "cls-11c", class_name: "Class 11-C", full_name: "Ananya Iyer", email: "ananya.i@stx.edu", dob: "2009-04-30", phone: "+91 6543210987", current_address: "Plot 45, Cyber City, Hyderabad, India", permanent_address: "Plot 45, Cyber City, Hyderabad, India", parent_name: "Ravi Iyer", parent_phone: "+91 6665554443", created_at: "2025-12-20T09:45:00Z", updated_at: "2026-02-28T10:10:00Z", is_deleted: false },
        { id: "s5e6f7g8-h9i0-4123-a5b6-c7d8e9f0g1h2", school_id: "sch-03", school_name: "Modern Public School", class_id: "cls-08a", class_name: "Class 08-A", full_name: "Vikram Singh", email: "vikram.s@modern.org", dob: "2012-01-15", phone: "+91 9998887776", current_address: "Main Rd, Civil Lines, Chandigarh, India", permanent_address: "Main Rd, Civil Lines, Chandigarh, India", parent_name: "Meena Singh", parent_phone: "+91 9990001112", created_at: "2026-03-01T10:00:00Z", updated_at: "2026-03-05T12:00:00Z", is_deleted: false },
        { id: "s6f7g8h9-i0j1-4234-a6b7-c8d9e0f1g2h3", school_id: "sch-01", school_name: "Green Valley School", class_id: "cls-10b", class_name: "Class 10-B", full_name: "Sneha Reddy", email: "sneha.r@example.com", dob: "2010-09-18", phone: "+91 8887776665", current_address: "Street 7, Jubilee Hills, Hyderabad, India", permanent_address: "Street 7, Jubilee Hills, Hyderabad, India", parent_name: "Venkat Reddy", parent_phone: "+91 8885554442", created_at: "2026-01-20T14:00:00Z", updated_at: "2026-03-15T16:45:00Z", is_deleted: false },
        { id: "s7g8h9i0-j1k2-4345-a7b8-c9d0e1f2g3h4", school_id: "sch-04", school_name: "Oakridge International", class_id: "cls-07c", class_name: "Class 07-C", full_name: "Mohammed Zaid", email: "zaid.m@oakridge.ac.in", dob: "2013-02-28", phone: "+91 7776665554", current_address: "Flat 502, Crescent Palace, Kolkata, India", permanent_address: "Flat 502, Crescent Palace, Kolkata, India", parent_name: "Farhan Zaid", parent_phone: "+91 7774443331", created_at: "2026-02-10T12:20:00Z", updated_at: "2026-03-20T11:00:00Z", is_deleted: true },
        { id: "s8h9i0j1-k2l3-4456-a8b9-c0d1e2f3g4h5", school_id: "sch-01", school_name: "Green Valley School", class_id: "cls-10a", class_name: "Class 10-A", full_name: "Arjun Das", email: "arjun.d@demo.com", dob: "2010-03-14", phone: "+91 6665554443", current_address: "Villa 34, Royal Enclave, Pune, India", permanent_address: "Villa 34, Royal Enclave, Pune, India", parent_name: "Debu Das", parent_phone: "+91 6663332220", created_at: "2026-01-15T09:30:00Z", updated_at: "2026-03-22T10:15:00Z", is_deleted: false }
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const filteredStudents = dummyStudents.filter(student =>
        student.full_name.toLowerCase().includes(pageSearch.toLowerCase()) ||
        student.email.toLowerCase().includes(pageSearch.toLowerCase()) ||
        student.phone.includes(pageSearch)
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
        <div className="p-8 bg-slate-50/50">
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
                    Enroll New Student
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
                            placeholder="Search by student name, email address, or phone number..."
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
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1400px]">
                        <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-extrabold uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-8 py-5">Profile & ID</th>
                                <th className="px-6 py-5">Personal Contact</th>
                                <th className="px-6 py-5">Parental Info</th>
                                <th className="px-6 py-5">Academic Track</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Registered</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-slate-50/40 transition-all group/row">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-[2px] flex-shrink-0">
                                                    <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center font-bold text-[#4CAF50] text-lg shadow-inner">
                                                        {student.full_name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-extrabold text-slate-800 text-[14px] leading-tight group-hover/row:text-[#4CAF50] transition-colors">{student.full_name}</span>
                                                    <span className="font-mono text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">UID: {student.id.substring(0, 8)}</span>
                                                    <div className="flex items-center gap-1.5 mt-2">
                                                        <Calendar className="w-3 h-3 text-slate-300" />
                                                        <span className="text-[10px] font-bold text-slate-500">{formatDate(student.dob)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center text-slate-600 font-bold text-[12px] group/item">
                                                    <Mail className="w-3.5 h-3.5 mr-2 text-slate-300 group-hover/item:text-[#4CAF50] transition-colors" /> {student.email}
                                                </div>
                                                <div className="flex items-center text-slate-500 text-[12px] font-medium group/phone">
                                                    <Phone className="w-3.5 h-3.5 mr-2 text-slate-300 group-hover/phone:text-[#4CAF50] transition-colors" /> {student.phone}
                                                </div>
                                                <div className="flex items-center text-slate-400 text-[11px] mt-1 italic">
                                                    <MapPin className="w-3 h-3 mr-2 text-slate-200 flex-shrink-0" />
                                                    <span className="truncate max-w-[180px]" title={student.current_address}>{student.current_address}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/50 group-hover/row:bg-white transition-colors">
                                                <div className="flex items-center font-bold text-slate-700 text-[12px] mb-1.5">
                                                    <User className="w-3 h-3 mr-2 text-[#4CAF50]" /> {student.parent_name}
                                                </div>
                                                <div className="text-[11px] text-slate-500 flex items-center font-medium">
                                                    <Phone className="w-2.5 h-2.5 mr-2 text-slate-300" /> {student.parent_phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="inline-flex items-center px-2 py-1 bg-[#4CAF50]/5 text-[#4CAF50] rounded-lg text-[10px] font-black uppercase tracking-widest border border-[#4CAF50]/10 self-start">
                                                    {student.class_name}
                                                </div>
                                                <div className="flex items-center text-slate-500 font-semibold text-[11px] ml-1">
                                                    <ArrowRight className="w-3 h-3 mr-2 text-slate-300" /> {student.school_name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className={`inline-flex items-center px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${!student.is_deleted
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-rose-50 text-rose-700 border border-rose-100"
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${!student.is_deleted ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
                                                {!student.is_deleted ? "Active" : "Archived"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col text-[11px] gap-1 font-bold">
                                                <span className="text-slate-400">Join: <b className="text-slate-600 font-extrabold">{formatDate(student.created_at)}</b></span>
                                                <span className="text-slate-300 text-[10px] mt-0.5">Updated: {formatDate(student.updated_at)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-10 group-hover/row:opacity-100 transition-opacity">
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
                                    <td colSpan={7} className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-slate-100">
                                                <Users className="w-12 h-12 text-slate-200" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">No students discovered</h3>
                                            <p className="text-slate-500 text-sm mt-3 max-w-sm font-semibold leading-relaxed italic">We couldn't locate any student records matching your specified criteria. Try refining your search or filter keywords.</p>
                                            <button
                                                onClick={() => setPageSearch("")}
                                                className="mt-8 px-8 py-3 bg-slate-100 text-slate-700 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all border border-slate-200 shadow-sm"
                                            >
                                                Reset All Discoveries
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Professional Footer / Stats */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex flex-col md:flex-row items-center justify-between gap-4 px-10">
                    <div className="flex items-center gap-6">
                        <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">View Matrix</span>
                        <p className="text-[12px] font-bold text-slate-600">Visible Results: {filteredStudents.length} <span className="text-slate-300 mx-2">|</span> Total Registry: {dummyStudents.length}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2 text-[11px] font-black uppercase tracking-tighter border border-slate-200 rounded-xl hover:bg-white transition-all disabled:opacity-20 text-slate-400" disabled>Previous Page</button>
                        <div className="flex items-center justify-center w-10 h-10 bg-[#4CAF50] text-white rounded-xl shadow-lg shadow-[#4CAF50]/20 font-black text-xs">1</div>
                        <button className="px-5 py-2 text-[11px] font-black uppercase tracking-tighter border border-slate-200 rounded-xl hover:bg-white transition-all text-slate-600 shadow-sm">Next Page</button>
                    </div>
                </div>
            </div>

            {/* Enrollment Modal */}
            {isModalOpen && (
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
                                    <h3 className="font-black text-slate-800 text-xl tracking-tight">Student Enrollment</h3>
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
                                                        {dummySchools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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
                                                        {dummyClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
                                    Cancel Protocol
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
                                        "Confirm Enrollment"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Toast Notification */}
            {showToast && (
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
            )}
        </div>
    );
}
