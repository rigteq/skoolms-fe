import React from 'react';
import { StudentEnrollment } from '../hooks/useDashboard';

interface TableProps {
    data: StudentEnrollment[];
    loading?: boolean;
}

export const Table = ({ data, loading }: TableProps) => {
    if (loading) {
        return (
            <div className="animate-pulse space-y-4 pt-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 w-1/3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/6"></div>
                        <div className="h-6 bg-slate-200 rounded w-16"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="py-8 text-center text-slate-500">
                No recent enrollments found.
            </div>
        );
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Enrolled':
                return 'bg-green-100 text-green-700';
            case 'Docs Pending':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getAvatarColor = (name: string) => {
        const colors = ['bg-indigo-100 text-indigo-700', 'bg-pink-100 text-pink-700', 'bg-teal-100 text-teal-700', 'bg-blue-100 text-blue-700'];
        const charCode = name.charCodeAt(0) || 0;
        return colors[charCode % colors.length];
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
                <thead>
                    <tr className="text-sm text-slate-500 font-medium border-b border-slate-100">
                        <th className="pb-3 px-2">Student Name</th>
                        <th className="pb-3 px-2">Grade</th>
                        <th className="pb-3 px-2">Date</th>
                        <th className="pb-3 px-2 text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                    {data.map((student, i) => (
                        <tr key={student.id || i} className="hover:bg-slate-50 transition-colors">
                            <td className="font-semibold text-slate-800 py-4 px-2 flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 text-xs shrink-0 ${getAvatarColor(student.name)}`}>
                                    {getInitials(student.name)}
                                </div>
                                <span className="truncate">{student.name}</span>
                            </td>
                            <td className="text-slate-600 py-4 px-2 whitespace-nowrap">{student.grade}</td>
                            <td className="text-slate-500 py-4 px-2 whitespace-nowrap">{student.date}</td>
                            <td className="text-right py-4 px-2 whitespace-nowrap">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(student.status)}`}>
                                    {student.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
