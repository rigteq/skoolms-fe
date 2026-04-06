"use client";

import {
    Plus, Search, Edit, Trash2, Filter, Check, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

type Teacher = {
    id: string;
    full_name: string;
    email: string;
    subject_specialization: string;
    classes: string[];
};

type ClassType = {
    id: string;
    class_name: string;
};

export default function TeachersPage() {
    // Basic States
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

    // Search, Filter & Pagination States
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filterSubject, setFilterSubject] = useState("");

    // UI/UX States
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Edit/Delete States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    const itemsPerPage = 5;

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        phone: "",
        subject_specialization: ""
    });

    const [editFormData, setEditFormData] = useState({
        full_name: "",
        email: "",
        subject_specialization: ""
    });

    // Fetch Classes
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/v1/classes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setClasses(data?.data || []);
            });
    }, []);

    // Fetch Teachers
    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/teachers", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            let teachersArray = [];
            if (Array.isArray(data)) teachersArray = data;
            else if (Array.isArray(data?.data)) teachersArray = data.data;
            else if (Array.isArray(data?.teachers)) teachersArray = data.teachers;

            setTeachers(teachersArray);
        } catch (err) {
            console.error("Fetch error:", err);
            setTeachers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    // Memoized Filtering Logic
    const filteredTeachers = useMemo(() => {
        return teachers.filter((teacher) => {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                teacher.full_name?.toLowerCase().includes(query) ||
                teacher.email?.toLowerCase().includes(query) ||
                teacher.subject_specialization?.toLowerCase().includes(query);

            const matchesFilter = filterSubject
                ? teacher.subject_specialization?.toLowerCase() === filterSubject.toLowerCase()
                : true;

            return matchesSearch && matchesFilter;
        });
    }, [teachers, searchQuery, filterSubject]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
    const paginatedTeachers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredTeachers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredTeachers, currentPage]);

    // Reset page when search/filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterSubject]);

    const handleClassChange = (id: string) => {
        setSelectedClasses((prev) =>
            prev.includes(id)
                ? prev.filter((cid) => cid !== id)
                : [...prev, id]
        );
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Edit Functionality
    const handleEditClick = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/teachers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();

            if (data.success || data.data) {
                const teacher = data.data || data;
                setSelectedTeacher(teacher);
                setEditFormData({
                    full_name: teacher.full_name || "",
                    email: teacher.email || "",
                    subject_specialization: teacher.subject_specialization || ""
                });
                setIsEditModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching teacher:", error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeacher) return;

        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/teachers/${selectedTeacher.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editFormData)
            });
            console.log("TOKEN:", token);

            const data = await res.json();
            if (data.success) {
                setSuccessMessage("Teacher Updated Successfully");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setIsEditModalOpen(false);
                fetchTeachers();
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Delete Functionality
    const handleDeleteClick = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedTeacher) return;

        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/teachers/${selectedTeacher.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            if (data.success) {
                setSuccessMessage("Teacher Deleted Successfully  ");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setIsDeleteModalOpen(false);
                setTeachers(prev => prev.filter(t => t.id !== selectedTeacher.id));
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const payload = { ...formData, class_ids: selectedClasses };

            const res = await fetch("http://localhost:5000/api/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success) {
                // Success Popup Logic
                setSuccessMessage("Teacher Added Successfully  ");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);

                setIsModalOpen(false);
                setFormData({
                    full_name: "",
                    email: "",
                    password: "",
                    phone: "",
                    subject_specialization: ""
                });
                setSelectedClasses([]);
                fetchTeachers(); // Refresh list instead of reload
            } else {
                alert(data.message || "Error creating teacher");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b71ca]"></div>
                <p className="ml-3 text-lg font-semibold text-slate-600">Loading data...</p>
            </div>
        );
    }

    return (
        <>
            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-right-full duration-500">
                    <div className="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl shadow-emerald-200 flex items-center gap-4 border border-white/20">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Check className="w-6 h-6 stroke-[3]" />
                        </div>
                        <div>
                            <p className="font-bold text-sm tracking-tight">{successMessage || "Operation Successful"}</p>
                            <p className="text-xs opacity-90 font-medium font-sans">Action completed successfully.</p>
                        </div>
                        <button onClick={() => setShowSuccess(false)} className="ml-2 hover:bg-white/10 p-1 rounded-lg transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Teachers Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage your school's teaching staff and specializations.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-4 py-2.5 bg-[#3b71ca] text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 font-bold text-sm group"
                >
                    <Plus className="w-4.5 h-4.5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add New Teacher
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by name, email or subject..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={filterSubject}
                            onChange={(e) => setFilterSubject(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl bg-white text-sm font-bold outline-none focus:border-[#3b71ca] cursor-pointer"
                        >
                            <option value="">All Subjects</option>
                            <option value="math">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="english">English</option>
                            <option value="science">Science</option>
                        </select>

                        <div className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-extrabold text-slate-400 flex items-center gap-2 uppercase tracking-widest leading-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3b71ca] animate-pulse"></span>
                            {filteredTeachers.length} Records
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Teacher Details</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Subject</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Assigned Classes</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-right leading-none">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedTeachers.length > 0 ? (
                                paginatedTeachers.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-bold mr-4 shadow-sm text-xs">
                                                    {teacher.full_name
                                                        ?.split(" ")
                                                        .map((n) => n[0])
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm leading-tight">
                                                        {teacher.full_name}
                                                    </p>
                                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                                        {teacher.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-700 text-xs px-2 py-1 bg-slate-100 rounded-md border border-slate-200 capitalize">
                                                {teacher.subject_specialization || "N/A"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {(teacher.classes || []).length > 0 ? (
                                                    teacher.classes.map((cls) => (
                                                        <span
                                                            key={cls}
                                                            className="px-2 py-0.5 bg-blue-50/50 border border-blue-100 rounded text-[10px] font-extrabold text-[#3b71ca] uppercase"
                                                        >
                                                            {cls}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-[10px] text-slate-300 font-medium italic">No classes</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditClick(teacher.id)}
                                                    className="p-2 text-slate-400 hover:text-[#3b71ca] hover:bg-blue-50 rounded-lg transition-all" title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(teacher)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No teachers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-tighter">
                    <span>
                        Showing {paginatedTeachers.length} of {filteredTeachers.length} Teachers
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1.5 rounded-lg shadow-sm transition-all ${currentPage === page
                                    ? "bg-[#3b71ca] text-white"
                                    : "border border-slate-200 hover:bg-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Teacher Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-slate-800">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Add New Teacher</h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">Register a new teaching staff member.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </div>

                        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        type="email"
                                        placeholder="john@school.com"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Phone Number</label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        type="tel"
                                        placeholder="+1 234 567 890"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Subject Specialization</label>
                                    <select
                                        name="subject_specialization"
                                        value={formData.subject_specialization}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="math">Mathematics</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="english">English</option>
                                        <option value="science">Science</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                                    Assign Classes
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {classes.map((cls) => (
                                        <label
                                            key={cls.id}
                                            className="flex items-center p-3 border border-slate-200 rounded-xl hover:border-[#3b71ca]/30 hover:bg-blue-50/30 cursor-pointer transition-all"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedClasses.includes(cls.id)}
                                                onChange={() => handleClassChange(cls.id)}
                                                className="w-4 h-4 rounded border-slate-300 text-[#3b71ca] focus:ring-[#3b71ca]/20"
                                            />
                                            <span className="ml-2.5 text-xs font-bold text-slate-600">
                                                {cls.class_name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
                                <button
                                    type="button" onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50"
                                >
                                    Add Teacher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Edit Teacher Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsEditModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100 font-sans">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-slate-800">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Edit Teacher Details</h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">Update information for {selectedTeacher?.full_name}.</p>
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </div>

                        <form className="p-8 space-y-6" onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Full Name <span className="text-red-500">*</span></label>
                                    <input
                                        name="full_name"
                                        value={editFormData.full_name}
                                        onChange={handleEditChange}
                                        required
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Email Address <span className="text-red-500">*</span></label>
                                    <input
                                        name="email"
                                        value={editFormData.email}
                                        onChange={handleEditChange}
                                        required
                                        type="email"
                                        placeholder="john@school.com"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Subject Specialization</label>
                                    <select
                                        name="subject_specialization"
                                        value={editFormData.subject_specialization}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Select Subject</option>
                                        <option value="math">Mathematics</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="english">English</option>
                                        <option value="science">Science</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
                                <button
                                    type="button" onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="px-8 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isProcessing && <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>}
                                    {isProcessing ? "Updating..." : "Update Teacher"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsDeleteModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100 p-8 text-center font-sans">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Teacher?</h2>
                        <p className="text-slate-500 text-sm mb-8 font-medium">Are you sure you want to delete <span className="font-bold text-slate-700">{selectedTeacher?.full_name}</span>? This action cannot be undone.</p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors border border-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={isProcessing}
                                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing && <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>}
                                {isProcessing ? "Deleting..." : "Confirm Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
