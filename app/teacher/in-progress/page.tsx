import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default function InProgressPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-lg w-full flex flex-col items-center hover:shadow-md hover:border-[#4CAF50]/30 transition-all">
        <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-500 animate-bounce shadow-inner border border-amber-100">
          <Clock className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">In Progress</h1>
        <p className="text-slate-500 mb-8 max-w-sm text-lg">
          We&apos;re currently working on this feature. It will be available in an upcoming update!
        </p>
        <Link
          href="/teacher"
          className="flex items-center px-6 py-3 bg-[#4CAF50] text-white font-semibold rounded-xl hover:bg-[#43a047] transition-all hover:shadow-md hover:-translate-y-0.5 focus:ring-4 focus:ring-green-100"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
