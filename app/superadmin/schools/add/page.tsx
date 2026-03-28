"use client";
import { useState } from "react";
import { X, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddSchoolsPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [form, setForm] = useState({
        school_name: "",
        address: "",
        phone: "",
        email: ""
    });

    const [errors, setErrors] = useState({
        school_name: "",
        email: ""
    });

    const validate = () => {
        let isValid = true;
        const newErrors = { school_name: "", email: "" };

        if (!form.school_name.trim()) {
            newErrors.school_name = "School name is required";
            isValid = false;
        }

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateSchool = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));

        const payload = {
            id: crypto.randomUUID(),
            ...form,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_deleted: false
        };

        console.log("Mock API Payload:", payload);

        setIsSubmitting(false);
        setIsModalOpen(false);
        setForm({ school_name: "", address: "", phone: "", email: "" });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        // After success, navigate back to schools list
        setTimeout(() => router.push("/superadmin/schools"), 1500);
    };

    return (
        <div className="p-8 bg-slate-50/50 min-h-screen">
            {/* Modal Implementation */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => router.push("/superadmin/schools")}
                    />

                    {/* Modal Body */}
                    <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 text-lg tracking-tight">Add New School</h3>
                            <button
                                onClick={() => router.push("/superadmin/schools")}
                                className="p-1.5 hover:bg-white rounded-full text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSchool} className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">School Name <span className="text-rose-500">*</span></label>
                                <input
                                    type="text"
                                    autoFocus
                                    value={form.school_name}
                                    onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                                    placeholder="e.g. Green Valley Academy"
                                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-4 outline-none transition-all placeholder:text-slate-400 font-medium ${errors.school_name
                                        ? "border-rose-300 focus:ring-rose-50"
                                        : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                        }`}
                                />
                                {errors.school_name && <p className="text-[10px] text-rose-500 font-bold ml-1 uppercase tracking-wider">{errors.school_name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email <span className="text-slate-400 text-xs font-medium">(Optional)</span></label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="school@example.com"
                                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-4 outline-none transition-all placeholder:text-slate-400 font-medium ${errors.email
                                        ? "border-rose-300 focus:ring-rose-50"
                                        : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                        }`}
                                />
                                {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1 uppercase tracking-wider">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        placeholder="+91 00000-00000"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all placeholder:text-slate-400 font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Default Status</label>
                                    <div className="flex-1 flex items-center px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-not-allowed opacity-80">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                        <span className="text-[12px] font-bold text-slate-500 uppercase">Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 ml-1">Full Address</label>
                                <textarea
                                    rows={3}
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    placeholder="Enter the complete school address here..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all placeholder:text-slate-400 font-medium resize-none"
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.push("/superadmin/schools")}
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
                                            Registering...
                                        </>
                                    ) : "Add School"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[60] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-500">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="pr-4">
                        <p className="font-bold text-sm leading-tight text-white">Success!</p>
                        <p className="text-slate-400 text-xs">New school has been added to the registry.</p>
                    </div>
                    <button onClick={() => setShowToast(false)} className="ml-2 text-slate-500 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
