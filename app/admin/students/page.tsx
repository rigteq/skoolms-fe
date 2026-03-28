"use client";

import {
    Users,
    Search,
    Plus, Edit, Trash2, Filter
} from "lucide-react";
import { useState } from "react";

export default function StudentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl bg-white text-sm font-bold outline-none focus:border-[#3b71ca] cursor-pointer">
                            <option value="">All Classes</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>
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
                            {[
                                { id: 1, name: "Alexander Pierce", email: "alex.p@school.edu", phone: "+1 234-512-3210", class: "10A", parent: "Robert Pierce", parentPhone: "+1 234-999-0001", gender: "Male" },
                                { id: 2, name: "Sophia Martinez", email: "sophia.m@school.edu", phone: "+1 234-512-3211", class: "11B", parent: "Elena Martinez", parentPhone: "+1 234-999-0002", gender: "Female" },
                                { id: 3, name: "Liam Johnson", email: "liam.j@school.edu", phone: "+1 234-512-3212", class: "12A", parent: "David Johnson", parentPhone: "+1 234-999-0003", gender: "Male" },
                                { id: 4, name: "Isabella Wang", email: "i.wang@school.edu", phone: "+1 234-512-3213", class: "10B", parent: "Kevin Wang", parentPhone: "+1 234-999-0004", gender: "Female" },
                                { id: 5, name: "Noah Williams", email: "noah.w@school.edu", phone: "+1 234-512-3214", class: "12B", parent: "Susan Williams", parentPhone: "+1 234-999-0005", gender: "Male" },
                            ].map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full ${student.gender === 'Male' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-rose-100 text-rose-700 border-rose-200'} flex items-center justify-center font-bold mr-4 shadow-sm border text-xs`}>
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm leading-tight">{student.name}</p>
                                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{student.email}</p>
                                                <p className="text-[10px] text-slate-400 font-bold mt-0.5 tracking-tight uppercase">{student.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-[#3b71ca]/10 text-[#3b71ca] rounded-md text-[10px] font-extrabold border border-[#3b71ca]/20 tracking-widest uppercase">{student.class}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#3b71ca] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                                                <Users className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 text-xs leading-tight">{student.parent}</p>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{student.parentPhone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-[#3b71ca] hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
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
                    <span>Showing 5 of 120 students</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1.5 bg-[#3b71ca] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">2</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
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

                        <form className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            {/* Basic Information */}
                            <section>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1.5 h-6 bg-[#3b71ca] rounded-full shadow-[0_0_8px_rgba(59,113,202,0.4)]"></div>
                                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">Basic Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Full Name <span className="text-red-500">*</span></label>
                                        <input required type="text" placeholder="e.g. Michael Scott" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Email (Optional)</label>
                                        <input type="email" placeholder="e.g. michael@student.edu" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Phone Number <span className="text-red-500">*</span></label>
                                        <input required type="tel" placeholder="e.g. +1 234-567-890" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Date of Birth</label>
                                        <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 font-bold cursor-pointer" />
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
                                        <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer">
                                            <option value="">Select Class</option>
                                            <option value="10">Class 10</option>
                                            <option value="11">Class 11</option>
                                            <option value="12">Class 12</option>
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
                                            <input required type="text" placeholder="e.g. Robert Scott" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Parent Phone <span className="text-red-500">*</span></label>
                                            <input required type="tel" placeholder="e.g. +1 987-654-321" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium" />
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
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#3b71ca] focus:ring-[#3b71ca]/20 cursor-pointer" />
                                        <span className="text-[10px] font-extrabold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-tight">Same as Current</span>
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Current Address <span className="text-red-500">*</span></label>
                                        <textarea required rows={3} placeholder="Full street address..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all resize-none font-medium placeholder:text-slate-400"></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Permanent Address</label>
                                        <textarea rows={3} placeholder="Full street address..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all resize-none font-medium placeholder:text-slate-400"></textarea>
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
                                    className="px-10 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50"
                                >
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
