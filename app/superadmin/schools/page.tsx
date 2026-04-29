"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Filter, MapPin, Phone, X, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchoolsPage() {
  const router = useRouter();
  const [pageSearch, setPageSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // IMPORTANT
          },
        });

        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error("Invalid JSON response from GET /schools");
        }
        console.log("API RESPONSE:", data);

        if (data.success) {
          setSchools(data.data); //   store real data
        } else {
          console.error("Failed to fetch schools");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const [form, setForm] = useState({
    school_name: "",
    address: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({
    school_name: "",
    email: "",
    phone: ""
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const filteredSchools = schools.filter(school =>
    school.school_name?.toLowerCase().includes(pageSearch.toLowerCase()) ||
    school.email?.toLowerCase().includes(pageSearch.toLowerCase())
  );
  const validate = () => {
    let isValid = true;
    const newErrors = { school_name: "", email: "", phone: "" };

    if (!form.school_name.trim()) {
      newErrors.school_name = "School name is required";
      isValid = false;
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (form.phone && form.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          school_name: form.school_name,
          address: form.address,
          phone: form.phone,
          email: form.email,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response from CREATE school");
      }

      if (!res.ok) throw new Error(data.message || "Failed");

      // Update table instantly
      setSchools((prev) => [...prev, data.data]);

      // Reset form
      setForm({
        school_name: "",
        address: "",
        phone: "",
        email: "",
      });

      setIsModalOpen(false);
      setToastMessage("School has been added successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleUpdateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("EDIT ID:", selectedSchoolId);
    console.log("FORM DATA:", form);

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${selectedSchoolId}`, {
        method: "PATCH", // IMPORTANT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          school_name: form.school_name,
          address: form.address,
          phone: form.phone,
          email: form.email,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response from UPDATE school");
      }

      console.log("UPDATE RESPONSE:", data);

      if (!res.ok) throw new Error(data.message || "Update failed");

      // Update UI instantly
      setSchools((prev) =>
        prev.map((s) =>
          s.id === selectedSchoolId ? { ...s, ...form } : s
        )
      );

      // reset
      setIsEditMode(false);
      setSelectedSchoolId(null);

      setIsModalOpen(false);

      setToastMessage("School has been updated successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (school: any) => {
    setIsEditMode(true);
    setSelectedSchoolId(school.id);

    setForm({
      school_name: school.school_name || "",
      address: school.address || "",
      phone: school.phone || "",
      email: school.email || "",
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this school?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schools/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response from DELETE school");
      }

      if (!res.ok) throw new Error(data.message);

      // Remove from UI instantly
      setSchools((prev) => prev.filter((s) => s.id !== id));

      setToastMessage("School has been deleted successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Schools Management</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">Overview of all registered educational institutions in the system.</p>
        </div>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedSchoolId(null);
            setForm({
              school_name: "",
              address: "",
              phone: "",
              email: ""
            });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Add School
        </button>
      </div>

      {/* Dashboard Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">

        {/* Search Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              placeholder="Filter school by name or email..."
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
                <th className="px-6 py-4 text-left">School Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Address</th>
                <th className="px-6 py-4 text-left">Created</th>
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
                        Loading Schools...
                      </h3>

                      <p className="text-sm text-slate-400 italic">
                        Fetching school records from server
                      </p>

                    </div>
                  </td>
                </tr>
              ) : filteredSchools.length > 0 ? (

                filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-slate-50/40 transition-all group/row">
                    <td className="px-6 py-4">
                      {school.id.substring(0, 8) || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {school.school_name || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {school.email || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {school.phone || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {school.address || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {formatDate(school.created_at) || "N/A"}
                    </td>

                    <td className="px-6 py-4 w-[120px]">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(school)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(school.id)}
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
                    <h3 className="text-lg font-bold text-slate-400">No Schools Found</h3>
                    <p className="text-slate-400 text-sm italic">Try adjusting your search filters or add a new school.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">
          <span>Showing {filteredSchools.length} of {schools.length} entries</span>
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

<<<<<<< HEAD
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xl uppercase tracking-widest">
                    {isEditMode ? "Edit School" : "New School"}
                  </h3>
                </div>

=======
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleCreateSchool}
              className="flex-1 overflow-y-auto p-8 custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* School Name */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    School Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.school_name}
                    onChange={(e) =>
                      setForm({ ...form, school_name: e.target.value })
                    }
                    placeholder="e.g. Oxford Public School"
                    className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.school_name
                        ? "border-rose-300 focus:ring-rose-50"
                        : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                      }`}
                  />
                  {errors.school_name && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.school_name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="admin@school.com"
                    className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.email
                        ? "border-rose-300 focus:ring-rose-50"
                        : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+91"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Address
                  </label>
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Full school address..."
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 flex gap-4">
>>>>>>> ee406cc (Rebase)
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={isEditMode ? handleUpdateSchool : handleCreateSchool} className="flex-1 overflow-y-auto p-8 custom-scrollbar">

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
                      placeholder="e.g. Oxford Public School"
                      className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.school_name
                        ? "border-rose-300 focus:ring-rose-50"
                        : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                        }`}
                    />
                    {errors.school_name && (
                      <p className="text-[9px] text-rose-500 font-bold ml-1">{errors.school_name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="admin@school.com"
                      className={`w-full px-5 py-3.5 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 outline-none transition-all ${errors.email
                        ? "border-rose-300 focus:ring-rose-50"
                        : "border-slate-200 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50]"
                        }`}
                    />
                    {errors.email && (
                      <p className="text-[9px] text-rose-500 font-bold ml-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Contact Number
                    </label>
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
                      <p className="text-[9px] text-rose-500 font-bold ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Full school address..."
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-10 flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all"
                  >
                    Cancel School
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      isEditMode ? "Edit School" : "Create School"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }

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
    </div >
  );
}
