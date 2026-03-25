export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const getHeaders = () => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
};

export const getDashboardInfo = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/students/dashboard`, {
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard data');
    return res.json();
};

export const getRecentStudents = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/students/recent`, {
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch recent students');
    return res.json();
};

export const sendNotice = async (payload: any) => {
    const res = await fetch(`${BASE_URL}/api/notifications`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to send notice');
    return res.json();
};

export const sendFeeReminders = async () => {
    const res = await fetch(`${BASE_URL}/api/fees/reminder`, {
        method: 'POST',
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to send fee reminders');
    return res.json();
};

export const generateIdCards = async () => {
    const res = await fetch(`${BASE_URL}/api/students/id-cards`, {
        method: 'POST',
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to generate ID cards');
    return res.json();
};

export const getClasses = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/classes`, {
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch classes');
    return res.json();
};
