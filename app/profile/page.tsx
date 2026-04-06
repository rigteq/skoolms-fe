"use client";

import { User, Mail, Shield, Phone, MapPin, Calendar, ArrowLeft } from "lucide-react";

export default function ProfilePage() {

  //  Static frontend data
  const userData = {
    full_name: "Satyam Raikwar",
    email: "satyam@example.com",
    phone: "9876543210",
    role: "Admin",
    created_at: new Date().toISOString(),
    address: "Bhopal, India",
    department: "IT"
  };

  const role = userData.role || "Admin";

  const initials = (userData.full_name || role)
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f3f7fb] font-sans">

      {/* Header */}
      <header className="h-16 bg-white shadow-sm flex items-center px-8 sticky top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-slate-500 hover:text-[#3b71ca] transition-colors font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>
        <div className="mx-auto font-extrabold text-slate-800 tracking-tight text-lg">
          My Profile
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8 mt-6">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

          {/* Cover */}
          <div className="h-40 bg-gradient-to-r from-[#3b71ca] to-[#2a5298] relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-lg translate-y-1/2 -translate-x-1/4"></div>
          </div>

          <div className="px-8 pb-10 relative">

            {/* Avatar */}
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
                  <h1 className="text-3xl font-extrabold text-slate-800">
                    {userData.full_name}
                  </h1>
                  <p className="text-slate-500 font-medium mt-1 flex items-center">
                    <Shield className="w-4 h-4 mr-1.5 text-blue-500" />
                    <span className="uppercase tracking-wider text-xs font-bold">
                      {role}
                    </span>
                  </p>
                </div>

                <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl">
                  Edit Profile
                </button>
              </div>

              {/* Personal Info */}
              <div className="mt-10 mb-6">
                <h3 className="text-xs font-extrabold text-slate-400 uppercase mb-4">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl">

                  <InfoItem icon={<User />} label="Full Name" value={userData.full_name} />
                  <InfoItem icon={<Mail />} label="Email" value={userData.email} />
                  <InfoItem icon={<Phone />} label="Phone" value={userData.phone} />
                  <InfoItem
                    icon={<Calendar />}
                    label="Joined Date"
                    value={new Date(userData.created_at).toLocaleDateString()}
                  />

                </div>
              </div>

              {/* Additional Info */}
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase mb-4">
                  Additional Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl">

                  <InfoItem icon={<MapPin />} label="Address" value={userData.address} />
                  <InfoItem icon={<Shield />} label="Department" value={userData.department} />

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//  Reusable component (clean code)
function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-start">
      <div className="p-3 bg-white rounded-xl shadow-sm mr-4 text-blue-500">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
        <p className="font-bold text-slate-800 text-sm mt-0.5">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}