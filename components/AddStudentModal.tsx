import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { createStudent } from '../services/studentService';
import { getClasses } from '../services/api';

interface AddStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

interface FormData {
    fullName: string;
    email: string;
    dob: string;
    phoneNumber: string;
    class: string;
    currentAddress: string;
    permanentAddress: string;
    sameAsCurrent: boolean;
    parentName: string;
    parentPhone: string;
}

export const AddStudentModal = ({ isOpen, onClose, onSuccess }: AddStudentModalProps) => {
    const initialData: FormData = {
        fullName: '',
        email: '',
        dob: '',
        phoneNumber: '',
        class: '',
        currentAddress: '',
        permanentAddress: '',
        sameAsCurrent: false,
        parentName: '',
        parentPhone: '',
    };

    const [formData, setFormData] = useState<FormData>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [classes, setClasses] = useState<{ id: string, name: string }[]>([]);

    // Focus trap / escape key handle could be added, simplifying for now
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setFormData(initialData);
            setErrors({});
            setApiError(null);
            setSubmitSuccess(false);

            const fetchClasses = async () => {
                try {
                    const res = await getClasses();
                    const classList = Array.isArray(res) ? res : (res.data || []);
                    setClasses(classList.map((c: any) => ({
                        id: c.id || c.class_id,
                        name: c.name || c.class_name || c.grade || 'Unknown Class'
                    })));
                } catch (err) {
                    console.error('Failed to fetch classes:', err);
                }
            };
            fetchClasses();
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked,
                permanentAddress: checked ? prev.currentAddress : prev.permanentAddress
            }));
        } else if (name === 'currentAddress' && formData.sameAsCurrent) {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                permanentAddress: value
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error on change
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/; // Basic 10 digit validation

        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.dob) newErrors.dob = 'Date of birth is required';

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Must be exactly 10 digits';
        }

        if (!formData.class) newErrors.class = 'Please select a class';

        if (!formData.currentAddress.trim()) newErrors.currentAddress = 'Current address is required';

        if (!formData.sameAsCurrent && !formData.permanentAddress.trim()) {
            newErrors.permanentAddress = 'Permanent address is required';
        }

        if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';

        if (!formData.parentPhone.trim()) {
            newErrors.parentPhone = 'Parent phone is required';
        } else if (!phoneRegex.test(formData.parentPhone)) {
            newErrors.parentPhone = 'Must be exactly 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        setApiError(null);

        let school_id = '';
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const base64Payload = token.split('.')[1];
                    const decoded = atob(base64Payload);
                    const parsed = JSON.parse(decoded);
                    school_id = parsed.school_id || '';
                } catch (e) {
                    console.error('Error decoding token', e);
                }
            }
        }

        const apiPayload = {
            school_id,
            full_name: formData.fullName,
            email: formData.email,
            dob: formData.dob,
            phone: formData.phoneNumber,
            class_id: formData.class,
            current_address: formData.currentAddress,
            permanent_address: formData.permanentAddress,
            parent_name: formData.parentName,
            parent_phone: formData.parentPhone
        };


        try {
            await createStudent(apiPayload);
            setSubmitSuccess(true);
            if (onSuccess) onSuccess();

            // Close modal after showing success message briefly
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err: any) {
            console.error('Submission Error:', err);
            setApiError(err.message || 'An unexpected error occurred during submission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = (name: keyof FormData) =>
        `w-full px-4 py-2 bg-slate-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b71ca]/50 transition-colors ${errors[name] ? 'border-red-400 focus:bg-white' : 'border-slate-200 focus:border-[#3b71ca] focus:bg-white'}`;

    const ErrorMsg = ({ name }: { name: keyof FormData }) =>
        errors[name] ? <span className="text-xs text-red-500 mt-1 block">{errors[name]}</span> : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm shadow-2xl overflow-y-auto">
            <div
                className="bg-white rounded-2xl w-full max-w-3xl flex flex-col shadow-xl animate-in zoom-in-95 duration-200 mt-auto mb-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
                    <h2 className="text-xl font-bold text-slate-800">Enroll New Student</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                {submitSuccess ? (
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-in fade-in slide-in-from-bottom-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Student Enrolled Successfully</h3>
                        <p className="text-slate-500">The student record has been added to the database.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh]">
                        {apiError && (
                            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start">
                                <svg className="w-5 h-5 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{apiError}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Section: Student Info */}
                            <div className="md:col-span-2">
                                <h3 className="text-sm font-semibold text-blue-800 tracking-wider uppercase mb-4">Student Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" className={inputClass('fullName')} />
                                        <ErrorMsg name="fullName" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={inputClass('email')} />
                                        <ErrorMsg name="email" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass('dob')} />
                                        <ErrorMsg name="dob" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (10 digits) <span className="text-red-500">*</span></label>
                                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="9876543210" className={inputClass('phoneNumber')} />
                                        <ErrorMsg name="phoneNumber" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Class/Grade <span className="text-red-500">*</span></label>
                                        <select name="class" value={formData.class} onChange={handleChange} className={inputClass('class')}>
                                            <option value="">Select a class</option>
                                            {classes.length > 0 ? (
                                                classes.map((cls) => (
                                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                                ))
                                            ) : (
                                                <option value="" disabled>Loading classes...</option>
                                            )}
                                        </select>
                                        <ErrorMsg name="class" />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Address */}
                            <div className="md:col-span-2 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-semibold text-blue-800 tracking-wider uppercase mb-4">Address Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col h-full">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Current Address <span className="text-red-500">*</span></label>
                                        <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Full current address" className={`${inputClass('currentAddress')} h-24 resize-none`} />
                                        <ErrorMsg name="currentAddress" />
                                    </div>
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-sm font-medium text-slate-700">Permanent Address <span className="text-red-500">*</span></label>
                                            <label className="flex items-center text-xs text-slate-600 cursor-pointer">
                                                <input type="checkbox" name="sameAsCurrent" checked={formData.sameAsCurrent} onChange={handleChange} className="mr-2 rounded text-[#3b71ca] focus:ring-[#3b71ca]/50" />
                                                Same as Current
                                            </label>
                                        </div>
                                        <textarea
                                            name="permanentAddress"
                                            value={formData.permanentAddress}
                                            onChange={handleChange}
                                            placeholder="Full permanent address"
                                            disabled={formData.sameAsCurrent}
                                            className={`${inputClass('permanentAddress')} h-24 resize-none ${formData.sameAsCurrent ? 'opacity-70 bg-slate-100' : ''}`}
                                        />
                                        <ErrorMsg name="permanentAddress" />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Parents */}
                            <div className="md:col-span-2 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-semibold text-blue-800 tracking-wider uppercase mb-4">Parent / Guardian Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Parent/Guardian Name <span className="text-red-500">*</span></label>
                                        <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="e.g. Richard Doe" className={inputClass('parentName')} />
                                        <ErrorMsg name="parentName" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Parent Phone <span className="text-red-500">*</span></label>
                                        <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} placeholder="9876543210" className={inputClass('parentPhone')} />
                                        <ErrorMsg name="parentPhone" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer Buttons */}
                        <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-[#3b71ca] border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-70 flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    'Submit Registration'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
