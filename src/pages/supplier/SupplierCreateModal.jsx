import React, { useState } from 'react';
import UniversalInput from '../../components/UniversalInput';
import UniversalTextarea from '../../components/UniversalTextarea';
import UniversalButton from '../../components/UniversalButton';

const SupplierCreateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        items: '',
        status: 'Active'
    });

    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Supplier Name is required';
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile Number is required';
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile Number must be 10 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Creating Supplier:', formData);
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'mobile' ? value.replace(/\D/g, '').slice(0, 10) : value;
        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Supplier</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <UniversalInput
                        label="Supplier Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Enter supplier name"
                        required
                    />

                    <UniversalInput
                        label="Mobile Number"
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        error={errors.mobile}
                        placeholder="Enter 10-digit mobile number"
                        required
                    />

                    <UniversalTextarea
                        label="Address"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter supplier address (optional)"
                        rows={3}
                    />

                    <UniversalTextarea
                        label="Items / Notes"
                        id="items"
                        name="items"
                        value={formData.items}
                        onChange={handleChange}
                        placeholder="Enter items supplied or notes (optional)"
                        rows={2}
                    />

                    <div className="flex gap-3 pt-4">
                        <UniversalButton
                            type="button"
                            onClick={onClose}
                            color="gray"
                            variant="outlined"
                            className="flex-1"
                        >
                            Cancel
                        </UniversalButton>
                        <UniversalButton
                            type="submit"
                            color="blue"
                            variant="filled"
                            className="flex-1"
                        >
                            Save Supplier
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierCreateModal;
