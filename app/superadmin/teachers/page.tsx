"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  X,
  Loader2,
  CheckCircle,
  GraduationCap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeachersPage() {
  const router = useRouter();
  const [pageSearch, setPageSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    school_id: "",
    subject_specialization: "",
    class_ids: [] as string[],
  });
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  type ClassType = {
    id: string;
    class_name: string;
  };

  const toggleClassId = (cls: ClassType) => {
    setForm((prev) => ({
      ...prev,
      class_ids: prev.class_ids.includes(cls.id)
        ? prev.class_ids.filter((id) => id !== cls.id)
        : [...prev.class_ids, cls.id],
    }));
  };

  const fetchTeachers = async (classList: ClassType[], schoolList: any[]) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/teachers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();
      console.log("API response:", json);

      const data = Array.isArray(json.data) ? json.data : [];

      const formatted = data.map((t: any) => ({
        id: t.id,
        full_name: t.full_name,
        email: t.email,
        phone: t.phone,
        school_name: (() => {
          if (t.school_name) return t.school_name;

          const found = schoolList.find(
            (s) => String(s.id) === String(t.school_id),
          );
          return found ? found.school_name : "N/A";
        })(),
        subject_specialization: t.subject_specialization || "",

        classes: (() => {
          // Case 1: classes = ["Grade 11", "Grade 12"]
          if (Array.isArray(t.classes) && t.classes.length > 0) {
            return t.classes.map((c: any) => ({
              class_name: typeof c === "string" ? c : c.class_name,
            }));
          }

          // Case 2: class_ids fallback
          if (Array.isArray(t.class_ids) && t.class_ids.length > 0) {
            return t.class_ids.map((id: any) => {
              const found = classList.find((c) => String(c.id) === String(id));
              return found
                ? { class_name: found.class_name }
                : { class_name: `Class ${id}` };
            });
          }

          return [];
        })(),
      }));

      // THIS WAS MISSING
      setTeachers(formatted);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSchools();
  }, []);

  useEffect(() => {
    if (classes.length > 0 && schools.length > 0) {
      fetchTeachers(classes, schools);
    }
  }, [classes, schools]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.subject_specialization
        ?.toLowerCase()
        .includes(pageSearch.toLowerCase()) ||
      teacher.id?.toLowerCase().includes(pageSearch.toLowerCase()),
  );

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    phone: "",
    school_id: "",
    subject_specialization: "",
    class_ids: "",
  });

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (json.success) {
        const uniqueClasses = json.data.filter(
          (cls: ClassType, index: number, self: ClassType[]) =>
            index === self.findIndex((c) => c.class_name === cls.class_name),
        );

        setClasses(uniqueClasses);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/schools", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (json.success) {
        setSchools(json.data);
      }
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const validateTeacher = () => {
    let valid = true;

    const newErrors = {
      full_name: "",
      email: "",
      phone: "",
      school_id: "",
      subject_specialization: "",
      class_ids: "",
    };

    if (!form.full_name.trim()) {
      newErrors.full_name = "Teacher name is required";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (form.phone && form.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
      valid = false;
    }

    if (!form.school_id) {
      newErrors.school_id = "School is required";
      valid = false;
    }

    if (!form.subject_specialization.trim()) {
      newErrors.subject_specialization = "Subject is required";
      valid = false;
    }

    if (form.class_ids.length === 0) {
      newErrors.class_ids = "Select at least one class";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTeacher()) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setToastMessage("Session expired. Please login again.");
        setShowSuccessToast(true);
        setIsSubmitting(false);
        return;
      }

      const emailExists = teachers.some(
        (t) =>
          t.email?.toLowerCase().trim() === form.email.toLowerCase().trim() &&
          t.id !== editingId,
      );

      if (emailExists) {
        setErrors((prev) => ({
          ...prev,
          email: "Email already exists",
        }));
        setIsSubmitting(false);
        return;
      }

      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: "password123",
        phone: form.phone.trim(),
        school_id: form.school_id,
        subject_specialization: form.subject_specialization.trim(),
        class_ids: form.class_ids,
      };

      const url = isEditMode
        ? `http://localhost:5000/api/teachers/${editingId}`
        : "http://localhost:5000/api/teachers";

      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setToastMessage(data.message || "Failed to save teacher");
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
        setIsSubmitting(false);
        return;
      }

      await fetchTeachers(classes, schools);

      setToastMessage(
        isEditMode
          ? "Teacher updated successfully."
          : "Teacher added successfully.",
      );

      setShowSuccessToast(true);

      setTimeout(() => setShowSuccessToast(false), 3000);

      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingId(null);

      setForm({
        full_name: "",
        email: "",
        phone: "",
        school_id: "",
        subject_specialization: "",
        class_ids: [],
      });

      setErrors({
        full_name: "",
        email: "",
        phone: "",
        school_id: "",
        subject_specialization: "",
        class_ids: "",
      });
    } catch (err: any) {
      console.error(err);
      setToastMessage(err.message || "Failed to save teacher");
      setShowSuccessToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (teacher: any) => {
    setIsEditMode(true);
    setEditingId(teacher.id);

    setForm({
      full_name: teacher.full_name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      school_id:
        schools.find((s) => s.school_name === teacher.school_name)?.id || "",
      subject_specialization: teacher.subject_specialization || "",
      class_ids:
        teacher.classes
          ?.map((c: any) => {
            const found = classes.find((cl) => cl.class_name === c.class_name);
            return found ? found.id : null;
          })
          .filter(Boolean) || [],
    });

    setIsModalOpen(true);
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to delete teacher");
        return;
      }

      setTeachers((prev) => prev.filter((t) => t.id !== id));
      setToastMessage("Teacher has been deleted successfully.");
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingId(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="p-8 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Teachers Management
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">
            Manage faculty records and classroom assignments across your
            institution.
          </p>
        </div>
        <button
          onClick={() => {
            setIsEditMode(false);
            setEditingId(null);
            setForm({
              full_name: "",
              email: "",
              phone: "",
              school_id: "",
              subject_specialization: "",
              class_ids: [],
            });
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white rounded-2xl hover:shadow-xl transition-all shadow-lg font-bold text-sm group"
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Add Teacher
        </button>
      </div>

      {/* Table Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Search & Action Bar */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              placeholder="Filter teacher by subject or user ID..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#4CAF50]/20 focus:border-[#4CAF50] outline-none transition-all placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-semibold">
              <Filter className="w-4 h-4 mr-2 text-slate-400" />
              Sort Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 border-collapse min-w-[1300px]">
            <thead className="bg-slate-50/50 text-slate-500 border-b border-slate-100 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Teacher Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">School Name</th>
                <th className="px-6 py-4 text-left">Subject Specialization</th>
                <th className="px-6 py-4 text-left">Classes Assigned</th>
                <th className="px-6 py-4 text-center w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 border-b border-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      {/* Spinner */}
                      <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-[#4CAF50] animate-spin"></div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-500">
                        Loading Teachers...
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm text-slate-400 italic">
                        Fetching teacher records from server
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="hover:bg-slate-50/40 transition-all group/row"
                  >
                    <td className="px-6 py-4">
                      {teacher.id?.substring(0, 8) || "N/A"}
                    </td>

                    <td className="px-6 py-4">{teacher.full_name || "N/A"}</td>

                    <td className="px-6 py-4">{teacher.email || "N/A"}</td>

                    <td className="px-6 py-4">{teacher.phone || "N/A"}</td>

                    <td className="px-6 py-4">
                      {teacher.school_name || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {teacher.subject_specialization || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      {teacher.classes?.length > 0
                        ? teacher.classes
                          .map((c: any) =>
                            typeof c === "string" ? c : c.class_name,
                          )
                          .join(", ")
                        : "N/A"}
                    </td>

                    <td className="px-6 py-4 w-[120px]">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(teacher)}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit school"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
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
                  <td colSpan={8} className="px-8 py-32 text-center">
                    <h3 className="text-lg font-bold text-slate-400">
                      No teachers found
                    </h3>
                    <p className="text-slate-400 text-sm italic">
                      Try adjusting your search criteria or subject filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Simulation */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/10 flex items-center justify-between text-xs text-slate-500 font-bold px-8">
          <span>
            Showing {filteredTeachers.length} of {teachers.length} entries
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
      </div>

      {/* Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in"
            onClick={() => {
              setIsModalOpen(false);
              setIsEditMode(false);
              setEditingId(null);
            }}
          />

          {/* Modal */}
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#4CAF50] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#4CAF50]/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xl uppercase tracking-widest">
                  {isEditMode ? "Edit Teacher" : "New Teacher"}
                </h3>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingId(null);
                }}
                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleAddTeacher}
              className="flex-1 overflow-y-auto p-8 custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Teacher Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full name of the teacher"
                    value={form.full_name}
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none"
                  />
                  {errors.full_name && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.full_name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@school.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none"
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
                    type="tel"
                    placeholder="+91"
                    value={form.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setForm({ ...form, phone: value });
                      }
                    }}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none"
                  />
                  {errors.phone && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* School */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    School <span className="text-rose-500">*</span>
                  </label>

                  <div className="relative">
                    <select
                      value={form.school_id}
                      onChange={(e) =>
                        setForm({ ...form, school_id: e.target.value })
                      }
                      className="w-full pl-5 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none appearance-none"
                    >
                      <option value="">Select School</option>
                      {schools.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.school_name}
                        </option>
                      ))}
                    </select>

                    <GraduationCap className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.school_id && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.school_id}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Subject Specialization{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={form.subject_specialization}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject_specialization: e.target.value,
                      })
                    }
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] outline-none"
                  />
                  {errors.subject_specialization && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.subject_specialization}
                    </p>
                  )}
                </div>

                {/* Classes */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Assign Classes
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {classes.map((cls) => {
                      const selected = form.class_ids.includes(cls.id);

                      return (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => toggleClassId(cls)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all
                ${selected
                              ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                        >
                          {cls.class_name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.class_ids && (
                    <p className="text-[9px] text-rose-500 font-bold ml-1">
                      {errors.class_ids}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setEditingId(null);
                  }}
                  className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-extrabold text-[12px] uppercase tracking-widest rounded-2xl hover:bg-slate-50"
                >
                  Cancel Teacher
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] px-6 py-4 bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-extrabold text-[12px] uppercase tracking-widest rounded-2xl shadow-xl flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                      {isEditMode ? "Updating..." : "Creating..."}
                    </>
                  ) : isEditMode ? (
                    "Edit Teacher"
                  ) : (
                    "Create Teacher"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-8 right-8 z-[60] animate-in slide-in-from-right-10 duration-500">
          <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center border-l-4 border-emerald-500">
            <div className="bg-emerald-500/20 p-2 rounded-lg mr-4">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="font-bold text-sm">Success!</p>
              <p className="text-slate-400 text-xs mt-0.5">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
