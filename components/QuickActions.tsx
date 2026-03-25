import React, { useState } from 'react';
import { sendNotice, sendFeeReminders, generateIdCards } from '../services/api';

export const QuickActions = () => {
    const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleAction = async (actionName: string, actionFn: () => Promise<any>) => {
        setLoadingAction(actionName);
        setMessage(null);
        try {
            await actionFn();
            setMessage({ text: `${actionName} completed successfully!`, type: 'success' });
        } catch (err: any) {
            setMessage({ text: err.message || `Failed to perform ${actionName}`, type: 'error' });
        } finally {
            setLoadingAction(null);
            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex-none">Quick Actions</h2>

            {message && (
                <div className={`mb-4 px-4 py-2 rounded text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex-1 space-y-3">
                <button
                    onClick={() => handleAction('Send Notice', () => sendNotice({ message: 'Test Notice' }))}
                    disabled={loadingAction !== null}
                    className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="block font-semibold text-slate-800 group-hover:text-blue-700">
                        {loadingAction === 'Send Notice' ? 'Sending...' : 'Send Notice'}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 block">Broadcast message to parents or staff</span>
                </button>

                <button
                    onClick={() => handleAction('Fee Reminders', sendFeeReminders)}
                    disabled={loadingAction !== null}
                    className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="block font-semibold text-slate-800 group-hover:text-blue-700">
                        {loadingAction === 'Fee Reminders' ? 'Sending...' : 'Fee Reminders'}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 block">Automate pending fee SMS alerts</span>
                </button>

                <button
                    onClick={() => handleAction('Generate ID Cards', generateIdCards)}
                    disabled={loadingAction !== null}
                    className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="block font-semibold text-slate-800 group-hover:text-blue-700">
                        {loadingAction === 'Generate ID Cards' ? 'Generating...' : 'Generate ID Cards'}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 block">Bulk print student ID templates</span>
                </button>
            </div>
        </div>
    );
};
