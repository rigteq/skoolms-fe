"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, Phone, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/v1/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const result = await res.json();

          // adjust based on your API response
          const user = result.data || result;

          setUserData(user);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#f3f7fb] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b71ca]"></div>
      </div>
    );
  }

  const role = userData.role || "Admin";
  const initials = (userData.full_name || userData.name || role)
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f3f7fb] font-sans">
      {/* Header */}
      <header className="h-16 bg-white shadow-sm flex items-center px-8 sticky top-0 z-10">
        <button onClick={() => router.back()} className="flex items-center text-slate-500 hover:text-[#3b71ca] transition-colors font-bold text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <div className="mx-auto font-extrabold text-slate-800 tracking-tight text-lg">My Profile</div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

          {/* Cover Photo Area */}
          <div className="h-40 bg-gradient-to-r from-[#3b71ca] to-[#2a5298] relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay blur-xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full mix-blend-overlay blur-lg translate-y-1/2 -translate-x-1/4"></div>
          </div>

          <div className="px-8 pb-10 relative">
            {/* Profile Avatar */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-100 to-emerald-100 flex items-center justify-center text-4xl font-extrabold text-[#3b71ca]">
                  {initials}
                </div>
              </div>
            </div>

            <div className="pt-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-800">{userData.full_name || userData.name || "User Name"}</h1>
                  <p className="text-slate-500 font-medium mt-1 flex items-center">
                    <Shield className="w-4 h-4 mr-1.5 text-blue-500" />
                    <span className="uppercase tracking-wider text-xs font-bold">{role}</span>
                  </p>
                </div>
                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors shrink-0">
                  Edit Profile
                </button>
              </div>

              <div className="mt-10 mb-6">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-start">
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-blue-500">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Full Name</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">{userData.full_name || userData.name || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-emerald-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Email Address</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">{userData.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-orange-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Phone Number</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">{userData.phone || userData.phone_number || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-purple-500">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Joined Date</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">{userData.created_at ? new Date(userData.created_at).toLocaleDateString() : "Not provided"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other info dynamic rendering if present */}
              {userData.address || userData.department && (
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    {userData.address && (
                      <div className="flex items-start">
                        <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-rose-500">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Address</p>
                          <p className="font-bold text-slate-800 text-sm mt-0.5">{userData.address}</p>
                        </div>
                      </div>
                    )}

                    {userData.department && (
                      <div className="flex items-start">
                        <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-indigo-500">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Department</p>
                          <p className="font-bold text-slate-800 text-sm mt-0.5">{userData.department}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
