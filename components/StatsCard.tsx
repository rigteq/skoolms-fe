import React from 'react';

interface StatsCardProps {
    label: string;
    value: string | number;
    highlightClass?: string;
    loading?: boolean;
}

export const StatsCard = ({ label, value, highlightClass, loading }: StatsCardProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-slate-500 text-sm font-medium">{label}</span>

            {loading ? (
                <div className="h-9 w-24 bg-slate-200 animate-pulse rounded mt-3"></div>
            ) : (
                <span className={`text-3xl font-bold mt-3 ${highlightClass || 'text-slate-800'}`}>
                    {value}
                </span>
            )}
        </div>
    );
};
