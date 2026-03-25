import { useState, useEffect, useCallback } from 'react';
import { getDashboardInfo, getRecentStudents } from '../services/api';

export interface DashboardData {
    totalStudents: number;
    totalStaff: number;
    pendingFees: number;
    attendanceToday: number;
}

export interface StudentEnrollment {
    id?: string;
    name: string;
    grade: string;
    date: string;
    status: 'Enrolled' | 'Docs Pending' | string;
}

export const useDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [recentStudents, setRecentStudents] = useState<StudentEnrollment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [dashboardRes, studentsRes] = await Promise.all([
                getDashboardInfo(),
                getRecentStudents()
            ]);

            const dbData = dashboardRes.data || dashboardRes;
            setData({
                totalStudents: dbData.total_students ?? dbData.totalStudents ?? 0,
                totalStaff: dbData.total_staff ?? dbData.totalStaff ?? 0,
                pendingFees: dbData.pending_fees ?? dbData.pendingFees ?? 0,
                attendanceToday: dbData.attendance_today ?? dbData.attendanceToday ?? 0,
            });

            const studentsArray = Array.isArray(studentsRes) ? studentsRes : (studentsRes.data || []);
            setRecentStudents(studentsArray.map((s: any) => ({
                id: s.id || s.student_id,
                name: s.full_name || s.name || 'Unknown',
                grade: s.class_name || s.grade || s.class_id || 'N/A',
                date: s.created_at ? new Date(s.created_at).toLocaleDateString() : (s.date || new Date().toLocaleDateString()),
                status: s.status || 'Enrolled'
            })));
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching dashboard data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return { data, recentStudents, loading, error, refetch: fetchDashboard };
};
