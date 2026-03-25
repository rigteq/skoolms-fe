import { Search, Bell, Menu } from "lucide-react";

interface NavbarProps {
    onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
            <div className="flex items-center gap-4 w-full max-w-md relative">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative w-full hidden sm:block">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search student by ID or Name..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#3b71ca] outline-none transition-all focus:ring-2 focus:ring-[#3b71ca]/20"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4 lg:space-x-6">
                <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="flex items-center gap-3 border-l pl-4 lg:pl-6 border-slate-200 cursor-pointer">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">Admin User</p>
                        <p className="text-xs text-slate-500">SkoolMS Admin</p>
                    </div>
                    <div className="w-9 h-9 text-blue-800 font-bold bg-blue-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm hover:scale-105 transition-transform">
                        AD
                    </div>
                </div>
            </div>
        </header>
    );
};
