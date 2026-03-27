"use client";

import { Users, ClipboardCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchContext } from "./SearchContext";
import Link from "next/link";

export default function TeacherDashboard() {
  const [teacherName, setTeacherName] = useState("Teacher");
  const { searchQuery } = useSearchContext();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    studentName: "",
    class: "",
    marks: "",
    assignmentNumber: ""
  });

  const scheduleItems = [
    { time: "09:00 AM", class: "8th Grade Science", room: "Room 102", status: "Completed", type: "past" },
    { time: "11:30 AM", class: "10th Grade Math", room: "Room 205", status: "Upcoming", type: "next" },
    { time: "01:00 PM", class: "12th Grade Advanced Calculus", room: "Lab 4", status: "Upcoming", type: "future" },
    { time: "02:45 PM", class: "9th Grade Math", room: "Room 201", status: "Upcoming", type: "future" },
  ].filter(item => 
    item.class.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const submissions = [
    { studentName: "Aditya Verma", class: "10th Grade Math", marks: "85/100", status: "Graded" },
    { studentName: "Priya Singh", class: "12th Grade Science", marks: "Pending", status: "pending review" },
    { studentName: "Rahul Sharma", class: "11th Grade physics", marks: "92/100", status: "reviewed" },
    { studentName: "Sanya Gupta", class: "9th Grade Math", marks: "Pending", status: "pending review" },
  ].filter(sub => 
    sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sub.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const dataStr = localStorage.getItem("userData");
    if (dataStr) {
      setTimeout(() => {
        try {
          const userData = JSON.parse(dataStr);
          const name = userData?.name || userData?.full_name || "Teacher";
          setTeacherName(name);
        } catch {
          // Fallback silently
        }
      }, 0);
    }
  }, []);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would add this to the database/state
    console.log("New Assignment:", newAssignment);
    setShowCreateModal(false);
    setNewAssignment({ studentName: "", class: "", marks: "", assignmentNumber: "" });
  };

  return (
    <div className="p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, {teacherName.split(' ')[0]}! 👋</h1>
        <div className="space-x-4">
          <Link
            href="/teacher/attendance/mark"
            className="px-5 py-2.5 bg-[#4CAF50] text-white rounded-xl shadow-sm hover:bg-[#43a047] hover:shadow hover:-translate-y-0.5 transition-all font-semibold text-sm flex items-center gap-2"
          >
            <ClipboardCheck className="w-4 h-4" /> Mark Today&apos;s Attendance
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 group/cards">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-[#4CAF50] hover:-translate-y-1 transition-all cursor-default relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#4CAF50]/5 rounded-bl-full -z-0"></div>
          <span className="text-slate-500 text-sm font-medium z-10">Classes Today</span>
          <span className="text-3xl font-bold mt-3 text-slate-300 z-10">- <span className="text-lg text-slate-200 font-normal">/ -</span></span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-[#4CAF50] hover:-translate-y-1 transition-all cursor-default relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#4CAF50]/5 rounded-bl-full -z-0"></div>
          <span className="text-slate-500 text-sm font-medium z-10">Pending Grading</span>
          <span className="text-3xl font-bold mt-3 text-slate-300 z-10">- <span className="text-sm text-slate-200 font-normal">submissions</span></span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-[#4CAF50] hover:-translate-y-1 transition-all cursor-default relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#4CAF50]/5 rounded-bl-full -z-0"></div>
          <span className="text-slate-500 text-sm font-medium z-10">Avg Class Attendance</span>
          <span className="text-3xl font-bold mt-3 text-slate-800 z-10">94%</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md hover:border-[#4CAF50] hover:-translate-y-1 transition-all cursor-default relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#4CAF50]/5 rounded-bl-full -z-0"></div>
          <span className="text-slate-500 text-sm font-medium z-10">Next Period</span>
          <span className="text-lg font-bold mt-3 text-slate-300 z-10">- <br /><span className="text-xs text-transparent select-none bg-slate-50 px-2 py-0.5 rounded">-</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Classes */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col hover:shadow-md hover:border-[#4CAF50] transition-all duration-300">
          <div className="flex justify-between items-center mb-6 flex-none">
            <h2 className="text-lg font-bold text-slate-800">Today&apos;s Schedule</h2>
            <a href="#" className="text-sm text-[#4CAF50] hover:text-[#388E3C] hover:underline font-semibold transition-colors">View Full Timetable</a>
          </div>
          <div className="flex-1 space-y-4">
            {scheduleItems.length > 0 ? scheduleItems.map((item, i) => (
              <div key={i} className={`flex items-start p-4 rounded-xl border transition-colors ${item.type === 'next' ? 'border-[#4CAF50] bg-green-50/50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                <div className={`text-sm font-bold w-20 flex-shrink-0 pt-0.5 ${item.type === 'past' ? 'text-slate-400' : 'text-slate-600'}`}>{item.time}</div>
                <div className="flex-1 ml-4 border-l-2 border-slate-100 pl-4">
                  <h3 className={`font-semibold ${item.type === 'next' ? 'text-[#388E3C] text-lg' : item.type === 'past' ? 'text-slate-500' : 'text-slate-800'}`}>{item.class}</h3>
                  <p className="text-sm text-slate-500 mt-1 flex items-center">
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.type === 'past' ? 'bg-slate-200' : 'bg-slate-400'}`}></span>
                    {item.room}
                  </p>
                </div>
                {item.type === 'past' && <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-md text-xs font-semibold self-start ml-2">Done</span>}
                {item.type === 'next' && <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold self-start ml-2 flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Now</span>}
              </div>
            )) : (
              <div className="text-center py-6 text-slate-500 text-sm">No schedule items match your search.</div>
            )}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col hover:shadow-md hover:border-[#4CAF50] transition-all duration-300">
          <div className="flex justify-between items-center mb-6 flex-none">
            <h2 className="text-lg font-bold text-slate-800">Recent Submissions</h2>
            <a href="#" className="text-sm text-[#4CAF50] hover:text-[#388E3C] hover:underline font-semibold transition-colors">See all</a>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {submissions.length > 0 ? submissions.map((sub, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:border-[#4CAF50]/30 hover:bg-green-50/10 hover:shadow-sm transition-all group cursor-pointer">
                <div>
                  <h4 className="font-semibold text-slate-800 group-hover:text-[#4CAF50] transition-colors">{sub.studentName}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1 flex items-center">
                    <Users className="w-3 h-3 mr-1" /> {sub.class}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full mb-1.5 ${
                    sub.status === 'pending review' ? 'text-amber-700 bg-amber-100/80 border border-amber-200' : 
                    sub.status === 'reviewed' ? 'text-[#388E3C] bg-blue-100/80 border border-blue-200 text-blue-700' :
                    'text-[#388E3C] bg-green-100/80 border border-green-200'
                  }`}>
                    {sub.status}
                  </span>
                  <p className="text-xs text-slate-500 font-semibold">{sub.marks} <span className="font-normal opacity-80">marks</span></p>
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-slate-500 text-sm">No submissions match your search.</div>
            )}

            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full mt-4 py-3.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-[#4CAF50] hover:text-[#4CAF50] hover:bg-green-50/50 transition-all font-bold text-sm flex items-center justify-center gap-2 group"
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-[#4CAF50] group-hover:text-white flex items-center justify-center transition-colors">+</span> Assignments submission
            </button>
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">New Assignment</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleCreateAssignment} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Student Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter student name"
                    value={newAssignment.studentName}
                    onChange={(e) => setNewAssignment({...newAssignment, studentName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Class</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. 10th Math"
                      value={newAssignment.class}
                      onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Assignment Number</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Assignment #"
                      value={newAssignment.assignmentNumber}
                      onChange={(e) => setNewAssignment({...newAssignment, assignmentNumber: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Received Marks</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. 85/100"
                    value={newAssignment.marks}
                    onChange={(e) => setNewAssignment({...newAssignment, marks: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#4CAF50] focus:ring-4 focus:ring-green-50 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3.5 bg-[#4CAF50] text-white rounded-xl font-bold hover:bg-[#43a047] transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
