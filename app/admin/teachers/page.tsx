"use client";

import {
    Plus, Search, Edit, Trash2, Filter
} from "lucide-react";
import { useState } from "react";

export default function TeachersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
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
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </button>
                        <select className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl bg-white text-sm font-bold outline-none focus:border-[#3b71ca] cursor-pointer">
                            <option>Sort by: Newest</option>
                            <option>Name: A-Z</option>
                            <option>Subject</option>
                        </select>
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
                            {[
                                { id: 1, name: "Dr. Sarah Wilson", email: "sarah.wilson@school.edu", phone: "+1 234-567-8901", subject: "Mathematics", classes: ["10A", "12B"], initial: "SW", color: "blue" },
                                { id: 2, name: "James Miller", email: "j.miller@school.edu", phone: "+1 234-567-8902", subject: "Physics", classes: ["11A", "12A"], initial: "JM", color: "purple" },
                                { id: 3, name: "Emily Davis", email: "emily.d@school.edu", phone: "+1 234-567-8903", subject: "English Literature", classes: ["10B", "11B"], initial: "ED", color: "emerald" },
                                { id: 4, name: "Robert Chen", email: "r.chen@school.edu", phone: "+1 234-567-8904", subject: "Computer Science", classes: ["12A", "12B"], initial: "RC", color: "amber" },
                                { id: 5, name: "Maria Gonzalez", email: "m.gonzalez@school.edu", phone: "+1 234-567-8905", subject: "Chemistry", classes: ["11A", "11B"], initial: "MG", color: "rose" },
                            ].map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`w-10 h-10 rounded-full bg-${teacher.color}-100 text-${teacher.color}-700 border border-${teacher.color}-200 flex items-center justify-center font-bold mr-4 shadow-sm text-xs`}>
                                                {teacher.initial}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm leading-tight">{teacher.name}</p>
                                                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{teacher.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-700 text-xs px-2 py-1 bg-slate-100 rounded-md border border-slate-200">{teacher.subject}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {teacher.classes.map(cls => (
                                                <span key={cls} className="px-2 py-0.5 bg-blue-50/50 border border-blue-100 rounded text-[10px] font-extrabold text-[#3b71ca] uppercase">{cls}</span>
                                            ))}
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
                    <span>Showing 5 of 42 teachers</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1.5 bg-[#3b71ca] text-white rounded-lg shadow-sm">1</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">2</button>
                        <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">Next</button>
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
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Add New Teacher</h2>
                                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">Register a new teaching staff member.</p>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
                            >
                                <Plus className="w-5 h-5 rotate-45" />
                            </button>
                        </div>

                        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Full Name <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="text" 
                                        placeholder="e.g. John Doe"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Email Address <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="email" 
                                        placeholder="e.g. john@school.edu"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="e.g. +1 234-567-890"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Subject Specialization</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer">
                                        <option value="">Select Subject</option>
                                        <option value="math">Mathematics</option>
                                        <option value="physics">Physics</option>
                                        <option value="chemistry">Chemistry</option>
                                        <option value="english">English</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">Assign Classes</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {["Class 10", "Class 11", "Class 12", "Class 9"].map(cls => (
                                        <label key={cls} className="flex items-center p-3 border border-slate-200 rounded-xl hover:border-[#3b71ca]/30 hover:bg-blue-50/30 cursor-pointer transition-all">
                                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#3b71ca] focus:ring-[#3b71ca]/20" />
                                            <span className="ml-2.5 text-xs font-bold text-slate-600">{cls}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
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
        </>
    );
}
