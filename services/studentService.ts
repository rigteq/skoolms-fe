import { BASE_URL, getHeaders } from './api';

export const createStudent = async (studentData: any) => {
    const res = await fetch(`${BASE_URL}/api/v1/students`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(studentData),
    });

    let data;
    try {
        data = await res.json();
    } catch (e) {
        data = {};
    }

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Unauthorized: Please login again');
        }
        if (data.message) {
            throw new Error(typeof data.message === 'string' ? data.message : JSON.stringify(data.message));
        }
        if (data.error) {
            throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
        }
        if (data.errors) {
            if (Array.isArray(data.errors)) {
                const errorMsg = data.errors.map((err: any) => err.msg || err.message || err).join(', ');
                throw new Error(errorMsg);
            }
            throw new Error(JSON.stringify(data.errors));
        }
        if (Object.keys(data).length > 0) {
            throw new Error(`Failed to create student: ${JSON.stringify(data)}`);
        }

        throw new Error('Failed to create student. Please verify your data.');
    }

    return data;
};
