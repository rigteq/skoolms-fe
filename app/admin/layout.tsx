"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Simple JWT check
        const token = localStorage.getItem("token");
        if (!token || token === "dummy-jwt-token") {
            if (token === "dummy-jwt-token") {
                localStorage.removeItem("token");
            }
            router.push("/");
        }
    }, [router]);

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Wrapper for Mobile sliding */}
            <div className={`fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col bg-white">
                    <Sidebar />
                </div>
            </div>

            <main className="flex-1 flex flex-col min-w-0">
                <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
