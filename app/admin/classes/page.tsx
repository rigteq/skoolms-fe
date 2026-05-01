"use client";

import {
  GraduationCap,
  BookOpen,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";

import { useState, useEffect } from "react";

//   TYPE
type ClassType = {
  id: string;
  class_name: string;
  academic_year: string;
  class_teacher_name: string | null;
  students?: number;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [className, setClassName] = useState("");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [classTeacherId, setClassTeacherId] = useState("");
  const [teachers, setTeachers] = useState<any[]>([]);

  // UI/UX States
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Edit/Delete States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClassItem, setSelectedClassItem] = useState<ClassType | null>(
    null,
  );

  const [editFormData, setEditFormData] = useState({
    class_name: "",
    academic_year: "",
  });

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      console.log("fetchClasses data", data);
      setClasses(data?.data || []);
    } catch (err) {
      console.error("Error:", err);
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      console.log(className, academicYear, classTeacherId);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            class_name: className,
            academic_year: academicYear,
            class_teacher_id: classTeacherId || null,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSuccessMessage("Class Created Successfully");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setIsModalOpen(false);
      setClassName("");
      setAcademicYear("2025-2026");
      setClassTeacherId("");

      fetchClasses();
    } catch (error: any) {
      alert(error.message || "Error creating class");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTeachers = async () => {
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
      console.log("Teachers API response:", json);

      const data = Array.isArray(json.data) ? json.data : [];

      const formatted = data.map((t: any) => ({
        id: t.id,
        full_name: t.full_name,
      }));

      setTeachers(formatted);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const handleEditClick = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();

      if (data.success || data.data) {
        const classItem = data.data || data;
        setSelectedClassItem(classItem);
        setEditFormData({
          class_name: classItem.class_name || "",
          academic_year: classItem.academic_year || "",
        });
        setIsEditModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching class:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassItem) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${selectedClassItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editFormData),
        },
      );

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Class Updated Successfully  ");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setIsEditModalOpen(false);
        fetchClasses();
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = (classItem: ClassType) => {
    setSelectedClassItem(classItem);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedClassItem) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/${selectedClassItem.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Class Deleted Successfully  ");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setIsDeleteModalOpen(false);
        setClasses((prev) => prev.filter((c) => c.id !== selectedClassItem.id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  //   LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b71ca]"></div>
        <p className="ml-3 text-lg font-semibold text-slate-600">
          Loading data...
        </p>
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
              <p className="font-bold text-sm tracking-tight">
                {successMessage || "Operation Successful"}
              </p>
              <p className="text-xs opacity-90 font-medium font-sans">
                Action completed successfully.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-2 hover:bg-white/10 p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Classes Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage class structures</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-2.5 bg-[#3b71ca] text-white rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Class
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search class..."
            className="w-full pl-10 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* TOTAL */}
      <div className="mb-6 flex items-center gap-3">
        <BookOpen />
        <span className="font-bold">Total Classes: {classes?.length || 0}</span>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.map((cls, idx) => (
          <div
            key={cls.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-[#3b71ca]/30 hover:shadow-xl transition-all group overflow-hidden flex flex-col"
          >
            {/* TOP BORDER */}
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#3b71ca] group-hover:bg-blue-50 group-hover:border-blue-100 transition-all shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditClick(cls.id)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(cls)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CLASS NAME */}
              <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#3b71ca]">
                {cls.class_name}
              </h3>

              {/* YEAR */}
              <div className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold mb-6">
                Batch {cls.academic_year}
              </div>

              {/* Class teacher name */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Class Teacher
                  </span>
                  <span className="text-sm font-bold">
                    {cls.class_teacher_name || "Not Assigned"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    Students
                  </span>
                  <span className="text-sm font-bold">
                    {cls.total_students ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100 font-sans">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-slate-800">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Add New Class
                </h2>
                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">
                  Create a new academic class.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            {/* Form */}
            <form className="p-8 space-y-6" onSubmit={handleCreateClass}>
              <div className="space-y-4">
                {/* Class Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                    Class Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                    placeholder="e.g. Grade 10"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>

                {/* Academic Year */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                    Class Teacher Name <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={classTeacherId}
                    onChange={(e) => setClassTeacherId(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                  >
                    <option value="">Select Class Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
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
                  className="px-8 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isProcessing && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  )}
                  {isProcessing ? "Creating..." : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Class Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setIsEditModalOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100 font-sans">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-slate-800">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Edit Class Details
                </h2>
                <p className="text-slate-500 text-xs mt-0.5 font-medium tracking-tight">
                  Update information for {selectedClassItem?.class_name}.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <form className="p-8 space-y-6" onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                    Class Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="class_name"
                    value={editFormData.class_name}
                    onChange={handleEditChange}
                    required
                    type="text"
                    placeholder="e.g. Class 10"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-tight">
                    Academic Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="academic_year"
                    value={editFormData.academic_year}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-[#3b71ca]/10 focus:border-[#3b71ca] outline-none transition-all text-slate-700 cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3 bg-[#3b71ca] text-white font-bold text-sm rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isProcessing && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  )}
                  {isProcessing ? "Updating..." : "Update Class"}
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
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Delete Class?
            </h2>
            <p className="text-slate-500 text-sm mb-8 font-medium">
              Are you sure you want to delete{" "}
              <span className="font-bold text-slate-700">
                {selectedClassItem?.class_name}
              </span>
              ? This action cannot be undone.
            </p>

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
                {isProcessing && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                )}
                {isProcessing ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
