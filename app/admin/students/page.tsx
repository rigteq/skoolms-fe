"use client";

import {
    Users,
    Search,
    Plus, Edit, Trash2, Filter, Check, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";



type StudentType = {
    id: string;
    full_name: string;
    email: string;
    parent_name: string;
    parent_phone: string | null;
    class_name: string;
    class_id: string;
};

type ClassType = {
    id: string;
    class_name: string;
};
export default function StudentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<StudentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [classes, setClasses] = useState<ClassType[]>([]);

    const itemsPerPage = 5;

    // UI/UX States
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    // Edit/Delete States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);

    const [editFormData, setEditFormData] = useState({
        full_name: "",
        email: "",
        parent_name: "",
        parent_phone: "",
        class_id: "",
    });

    const [addFormData, setAddFormData] = useState({
        full_name: "",
        email: "",
        student_phone: "",
        dob: "",
        class_id: "",
        parent_name: "",
        parent_phone: "",
        current_address: "",
        permanent_address: ""
    });

    const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAddFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(addFormData)
            });

            if (res.ok) {
                setSuccessMessage("Student Added Successfully");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setIsModalOpen(false);
                setAddFormData({
                    full_name: "",
                    email: "",
                    student_phone: "",
                    dob: "",
                    class_id: "",
                    parent_name: "",
                    parent_phone: "",
                    current_address: "",
                    permanent_address: ""
                });
                fetchStudents();
            } else {
                console.error("Add failed:", await res.text());
            }
        } catch (error) {
            console.error("Add error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/students", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setStudents(data || []);
            setFilteredStudents(data || []);
        } catch (err) {
            console.error(err);
            setStudents([]);
            setFilteredStudents([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:5000/api/v1/classes", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setClasses(data.data || data || []);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchClasses();
    }, []);
    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                const student = data.data || data;
                setSelectedStudent(student);
                setEditFormData({
                    full_name: student.full_name || "",
                    email: student.email || "",
                    parent_name: student.parent_name || "",
                    parent_phone: student.parent_phone || "",
                    class_id: student.class_id || ""
                });
                setIsEditModalOpen(true);
            } else {
                console.error("Error fetching student:", await res.text());
            }
        } catch (error) {
            console.error("Error fetching student:", error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudent) return;

        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/students/${selectedStudent.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editFormData)
            });

            if (res.ok) {
                setSuccessMessage("Student Updated Successfully");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setIsEditModalOpen(false);
                fetchStudents();
            } else {
                console.error("Update failed:", await res.text());
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteClick = (student: StudentType) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedStudent) return;

        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/students/${selectedStudent.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                setSuccessMessage("Student Deleted Successfully");
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setIsDeleteModalOpen(false);
                setStudents(prev => prev.filter(s => s.id !== selectedStudent.id));
                fetchStudents();
            } else {
                console.error("Delete failed:", await res.text());
            }
        } catch (error) {
            console.error("Delete error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        const filtered = students.filter((student) => {
            const matchesSearch =
                student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (student.parent_phone || "").includes(searchTerm);

            const matchesClass =
                selectedClass === "" ||
                student.class_id === selectedClass;

            return matchesSearch && matchesClass;
        });

        setFilteredStudents(filtered);
        setCurrentPage(1);
    }, [searchTerm, selectedClass, students]);

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

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
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Students Management</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Manage student records, parent information, and academic levels.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center px-4 py-2.5 bg-[#3b71ca] text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 font-bold text-sm group"
                >
                    <Plus className="w-4.5 h-4.5 mr-2 group-hover:rotate-90 transition-transform" />
                    Add New Student
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by name, ID, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl bg-white text-sm font-bold outline-none focus:border-[#3b71ca] cursor-pointer"
                        >
                            <option value="">All Classes</option>

                            {classes.map((cls: ClassType) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.class_name}
                                </option>
                            ))}
                        </select>
                        <button className="flex items-center px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold">
                            <Filter className="w-4 h-4 mr-2" />
                            More Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        <thead className="bg-slate-50/50 text-slate-400 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Student Details</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Class</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest leading-none">Parent Details</th>
                                <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-widest text-right leading-none">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 border-blue-200 flex items-center justify-center font-bold mr-4 shadow-sm border text-xs">
                                                {student.full_name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm leading-tight">{student.full_name}</p>
                                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{student.email}</p>
                                                <p className="text-[10px] text-slate-400 font-bold mt-0.5 tracking-tight uppercase">{student.parent_phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-[#3b71ca]/10 text-[#3b71ca] rounded-md text-[10px] font-extrabold border border-[#3b71ca]/20 tracking-widest uppercase">{classes.find((c: ClassType) => c.id === student.class_id)?.class_name || "N/A"}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#3b71ca] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 text-xs leading-tight">{student.parent_name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{student.parent_phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditClick(student.id)} className="p-2 text-slate-400 hover:text-[#3b71ca] hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteClick(student)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-tighter">
                    <span>
                        Showing {paginatedStudents.length > 0 ? startIndex + 1 : 0} to{" "}
                        {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of{" "}
                        {filteredStudents.length} students
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1.5 rounded-lg shadow-sm transition-colors ${currentPage === i + 1
                                    ? "bg-[#3b71ca] text-white"
                                    : "border border-slate-200 hover:bg-white"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Student Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Add New Student</h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">Register a new student and parent portal access.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </div>

                        <form className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar" onSubmit={handleAddSubmit}>
                            {/* Basic Information */}
                            <section>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Basic Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Full Name <span className="text-red-500">*</span></label>
                                        <input required name="full_name" value={addFormData.full_name} onChange={handleAddChange} type="text" placeholder="e.g. Michael Scott" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Email (Optional)</label>
                                        <input name="email" value={addFormData.email} onChange={handleAddChange} type="email" placeholder="e.g. michael@student.edu" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Phone Number <span className="text-red-500">*</span></label>
                                        <input required name="student_phone" value={addFormData.student_phone} onChange={handleAddChange} type="tel" placeholder="e.g. +1 234-567-890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Date of Birth</label>
                                        <input name="dob" value={addFormData.dob} onChange={handleAddChange} type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 font-bold cursor-pointer" />
                                    </div>
                                </div>
                            </section>

                            {/* Academic & Parent Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <section>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                                        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Academic</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Assigned Class <span className="text-red-500">*</span></label>
                                        <select required name="class_id" value={addFormData.class_id} onChange={handleAddChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer">
                                            <option value="">Select Class</option>
                                            {classes.map((cls) => (
                                                <option key={cls.id} value={cls.id}>
                                                    {cls.class_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </section>
                                <section>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                                        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Parent Info</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Parent Name <span className="text-red-500">*</span></label>
                                            <input required name="parent_name" value={addFormData.parent_name} onChange={handleAddChange} type="text" placeholder="e.g. Robert Scott" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Parent Phone <span className="text-red-500">*</span></label>
                                            <input required name="parent_phone" value={addFormData.parent_phone} onChange={handleAddChange} type="tel" placeholder="e.g. +1 987-654-321" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Address Details */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                                        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Address Details</h3>
                                    </div>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" onChange={(e) => { if (e.target.checked) setAddFormData(prev => ({ ...prev, permanent_address: prev.current_address })) }} className="w-4 h-4 rounded border-slate-300 text-[#3b71ca] focus:ring-[#3b71ca]/20 cursor-pointer" />
                                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-tight">Same as Current</span>
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Current Address <span className="text-red-500">*</span></label>
                                        <textarea required name="current_address" value={addFormData.current_address} onChange={handleAddChange} rows={3} placeholder="Full street address..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all resize-none font-medium placeholder:text-slate-400"></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Permanent Address</label>
                                        <textarea name="permanent_address" value={addFormData.permanent_address} onChange={handleAddChange} rows={3} placeholder="Full street address..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all resize-none font-medium placeholder:text-slate-400"></textarea>
                                    </div>
                                </div>
                            </section>

                            <div className="pt-8 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="px-10 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing && <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>}
                                    {isProcessing ? "Adding..." : "Add Student"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Student Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsEditModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100 font-sans">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-slate-800">
                            <div>
                                <h2 className="text-xl font-bold tracking-tight">Edit Student Details</h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">Update information for {selectedStudent?.full_name}.</p>
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
                                    <input name="full_name" value={editFormData.full_name} onChange={handleEditChange} required type="text" placeholder="e.g. John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Email Address <span className="text-red-500">*</span></label>
                                    <input name="email" value={editFormData.email} onChange={handleEditChange} required type="email" placeholder="john@student.edu" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Parent Name <span className="text-red-500">*</span></label>
                                    <input name="parent_name" value={editFormData.parent_name} onChange={handleEditChange} required type="text" placeholder="e.g. Robert Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Parent Phone <span className="text-red-500">*</span></label>
                                    <input name="parent_phone" value={editFormData.parent_phone} onChange={handleEditChange} required type="text" placeholder="e.g. +1 123-456-7890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Assigned Class <span className="text-red-500">*</span></label>
                                    <select
                                        name="class_id"
                                        value={editFormData.class_id}
                                        onChange={handleEditChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.id}>
                                                {cls.class_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isProcessing} className="px-8 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                    {isProcessing && <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>}
                                    {isProcessing ? "Updating..." : "Update Student"}
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
                        <h2 className="text-xl font-bold text-slate-800 mb-2">Delete Student?</h2>
                        <p className="text-slate-500 text-sm mb-8 font-medium">Are you sure you want to delete <span className="font-bold text-slate-700">{selectedStudent?.full_name}</span>? This action cannot be undone.</p>

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
