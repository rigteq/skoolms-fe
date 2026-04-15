"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, Mail, Phone, MapPin, ShieldCheck, Calendar, ArrowRight, Users, X, Loader2, CheckCircle, GraduationCap, ChevronDown } from "lucide-react";

export default function AdminsPage() {
  // --- Dashboard States ---
  const [pageSearch, setPageSearch] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // --- Modal & Form States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    school_id: "",
  });

  const [schools, setSchools] = useState<any[]>([]);

  // Superadmins
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setAdmins(data.data || []);
        } else {
          console.error("Failed to fetch admins");
        }

      } catch (err: any) {
        console.error("Fetch admin error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (data.success) {
          setSchools(data.data);
        }
      } catch (err) {
        console.error("School fetch error:", err);
      }
    };

    fetchSchools();
  }, []);

  // Handle ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setErrors({});
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus first input on open
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isModalOpen]);

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!isEditMode && !form.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (!form.school_id) newErrors.school_id = "School is required";
    if (!form.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (form.phone && form.phone.length !== 10) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleEditClick = (admin: any) => {
    setIsEditMode(true);
    setSelectedAdminId(admin.id);

    setForm({
      full_name: admin.full_name || "",
      email: admin.email || "",
      password: "", // keep empty (don’t expose password)
      phone: admin.phone || "",
      school_id: admin.school_id || "",
    });

    setIsModalOpen(true);
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!isEditMode) {
      const alreadyExists = admins.some(
        (admin) => admin.school_id === form.school_id
      );

      if (alreadyExists) {
        setErrors((prev) => ({
          ...prev,
          school_id: "This school already has an admin.",
        }));
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const url = isEditMode
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admins/${selectedAdminId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/admins`

      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      let data;

      const text = await res.text();

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Non-JSON response:", text);
        setErrors({ email: "Server error. Please try again." });
        setIsSubmitting(false);
        return;
      }

      if (!res.ok) {
        setErrors({ email: data.message || "Something went wrong" });
        setIsSubmitting(false);
        return;
      }

      if (isEditMode) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin.id === selectedAdminId
              ? {
                ...admin,
                ...form,
                school_name:
                  schools.find((s) => s.id === form.school_id)?.school_name || "N/A",
              }
              : admin
          )
        );
      } else {
        setAdmins((prev) => [
          ...prev,
          {
            ...data.data,
            school_name:
              schools.find((s) => s.id === form.school_id)?.school_name || "N/A",
          },
        ]);
      }

      setToastMessage(
        isEditMode
          ? "Admin has been updated successfully."
          : "Admin has been added successfully."
      );

      setShowToast(true);
      setIsModalOpen(false);

      setForm({
        full_name: "",
        email: "",
        password: "",
        phone: "",
        school_id: "",
      });

    } catch (err) {
      console.error("Create admin error:", err);
    } finally {
      setIsSubmitting(false);
      setIsEditMode(false);
      setSelectedAdminId(null);
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.full_name?.toLowerCase().includes(pageSearch.toLowerCase()) ||
    admin.email?.toLowerCase().includes(pageSearch.toLowerCase()) ||
    admin.phone?.includes(pageSearch)
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete admin");
      }

      setToastMessage("Admin has been deleted successfully.");
      setShowToast(true);

      // update UI
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">

      {/* --- DASHBOARD HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admins Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Manage system administrators, their roles, and access across all schools.</p>
        </div>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedAdminId(null);
            setIsSubmitting(false);
            setErrors({});
            setForm({
              full_name: "",
              email: "",
              password: "",
              phone: "",
              school_id: "",
            });
            setIsModalOpen(true);

          }}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Add Admin
        </button>
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">

        {/* Search & Filter */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              placeholder="Filter admin by name, email, or phone..."
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

        {/* Table UI */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
            <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-extrabold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Admin Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">School Name</th>
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
                        Loading Admins...
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm text-slate-400 italic">
                        Fetching admin records from server
                      </p>

                    </div>
                  </td>
                </tr>
              ) : filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-slate-50/40 transition-all group/row">
                    <td className="px-6 py-4">
                      {admin?.id ? admin.id.substring(0, 8) : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {admin.full_name || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {admin.email || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {admin.phone || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {admin.school_name || "N/A"}
                    </td>

                    <td className="px-6 py-4 w-[120px]">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(admin)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-32 text-center">
                    <h3 className="text-lg font-bold text-slate-400">No Administrators Found</h3>
                    <p className="text-slate-400 text-sm italic">Try adjusting your search filters or add a new admin.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">

          <span>
            Showing {filteredAdmins.length} of {admins.length} entries
          </span>

          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors disabled:opacity-40"
              disabled
            >
              Previous
            </button>

            <button className="px-3 py-1.5 bg-[#4CAF50] text-white rounded-lg shadow-sm">
              1
            </button>

            <button className="px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div >

      {/* --- CREATE ADMIN MODAL --- */}
      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Dark Overlay with Blur */}
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
              onClick={() => {
                setIsModalOpen(false);
                setErrors({});
              }}
            />

            {/* Modal Content Container */}
            <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">

              {/* Modal Title Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xl tracking-tight uppercase tracking-widest">{isEditMode ? "Edit Admin" : "New Admin"}</h3>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setErrors({});
                  }}
                  className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all shadow-sm group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Modal Body / Form Section (Scrollable) */}
              <form onSubmit={handleCreateAdmin} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  {/* Full Name Field */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Name <span className="text-rose-500">*</span></label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      placeholder="Full name of the admin"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.full_name ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"}`}
                    />
                    {errors.full_name && <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">{errors.full_name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address<span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      placeholder="example@school.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.email ? "border-rose-300 focus:ring-rose-50" : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"}`}
                    />
                    {errors.email && <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">{errors.email}</p>}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter strong password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                    <input
                      type="tel"
                      placeholder="+91"
                      value={form.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // allow only digits

                        if (value.length <= 10) {
                          setForm({ ...form, phone: value });
                        }
                      }}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                    />
                    {errors.phone && (
                      <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>


                  {/* School Selection */}
                  <div className="space-y-1.5 font-bold">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 tracking-tighter">Operating Hub (School)</label>
                    <div className="relative">
                      <select
                        value={form.school_id}
                        onChange={(e) => {
                          setForm({ ...form, school_id: e.target.value });
                          setErrors((prev) => ({ ...prev, school_id: "" }));
                        }}

                        className="w-full pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all appearance-none"
                      >
                        <option value="">Select Registry Hub</option>

                        {schools.map((school) => (
                          <option key={school.id} value={school.id}>
                            {school.school_name || school.name || "Unnamed School"}
                          </option>
                        ))}
                      </select>
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {errors.school_id && (
                      <p className="text-[9px] text-rose-500 font-bold uppercase tracking-wider ml-1">
                        {errors.school_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Modal Footer (Fixed relative to form box) */}
                <div className="mt-10 flex gap-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setErrors({});
                    }}
                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                  >
                    Cancel Admin
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl shadow-[#4CAF50]/30 hover:shadow-[#4CAF50]/40 transition-all disabled:opacity-50 flex items-center justify-center min-h-[56px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      isEditMode ? "Edit Admin" : "Create Admin"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div >
        )
      }

      {/* --- SUCCESS TOAST NOTIFICATION --- */}
      {
        showToast && (
          <div className="fixed bottom-8 right-8 z-[60] animate-in slide-in-from-right-10 duration-500">
            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center border-l-4 border-emerald-500">
              <div className="bg-emerald-500/20 p-2 rounded-lg mr-4">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Success!</p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {toastMessage}
                </p>
              </div>
            </div>
          </div>
        )
      }

      {/* --- PAGE CSS (Tailwind Custom Scrollbar Shorthand) --- */}
      <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(203, 213, 225, 0.4);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.6);
                }
            `}</style>
    </div >
  );
}