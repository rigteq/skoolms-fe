"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#f3f7fb] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#3b71ca] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Forgot Password</h1>
        <p className="text-slate-500 text-sm mb-6">
          Enter your email address to receive a password reset link.
        </p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all placeholder:text-slate-400 text-sm shadow-sm hover:border-slate-300"
              placeholder="Ex. admin@skoolms.in"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-[#50b155] to-[#4caf50] hover:to-[#43a047] text-white font-bold text-sm rounded-xl shadow-lg shadow-green-500/25 transition-all hover:shadow-xl hover:shadow-green-500/35 active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
