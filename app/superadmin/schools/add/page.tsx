"use client";
import { useState } from "react";
import { X, Loader2, CheckCircle, Plus } from "lucide-react";
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => router.push("/superadmin/schools")}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col">

                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-xl uppercase tracking-widest">
                                    New School
                                </h3>
                            </div>

                            <button
                                onClick={() => router.push("/superadmin/schools")}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleCreateSchool} className="flex-1 overflow-y-auto p-8">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                {/* School Name */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        School Name <span className="text-rose-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={form.school_name}
                                        onChange={(e) => setForm({ ...form, school_name: e.target.value })}
                                        placeholder="e.g. Green Valley Academy"
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none ${errors.school_name
                                            ? "border-rose-300 focus:ring-rose-50"
                                            : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                            }`}
                                    />

                                    {errors.school_name && (
                                        <p className="text-[9px] text-rose-500 font-bold uppercase ml-1">
                                            {errors.school_name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="school@example.com"
                                        className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none ${errors.email
                                            ? "border-rose-300 focus:ring-rose-50"
                                            : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                                            }`}
                                    />

                                    {errors.email && (
                                        <p className="text-[9px] text-rose-500 font-bold uppercase ml-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        placeholder="+91 00000-00000"
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none"
                                    />
                                </div>

                                {/* Address */}
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                                        Full Address
                                    </label>

                                    <textarea
                                        rows={3}
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                        placeholder="Enter full school address..."
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none resize-none"
                                    />
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="mt-10 flex gap-4">

                                <button
                                    type="button"
                                    onClick={() => router.push("/superadmin/schools")}
                                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50"
                                >
                                    Cancel Operation
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#4CAF50]/30 flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Create School"
                                    )}
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
