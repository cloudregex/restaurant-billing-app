import React, { useState } from 'react';
import { HiX, HiSave, HiBan } from 'react-icons/hi';
import UniversalInput from '../../components/UniversalInput';
import UniversalTextarea from '../../components/UniversalTextarea';
import UniversalButton from '../../components/UniversalButton';

import showToast from '../../utils/toast';

const SupplierEditModal = ({ isOpen, onClose, supplier }) => {
    const [formData, setFormData] = useState({
        name: supplier?.name || '',
        mobile: supplier?.mobile || '',
        address: supplier?.address || '',
        items: supplier?.items || '',
        status: supplier?.status || 'Active'
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
            console.log('Updating Supplier:', formData);
            showToast.success('Supplier updated successfully!');
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
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Supplier</h2>
                    <UniversalButton
                        onClick={onClose}
                        variant="text"
                        color="gray"
                        size="sm"
                        icon={<HiX className="w-5 h-5" />}
                        iconOnly
                        className="!p-1"
                    />
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
                            variant="filled"
                            className="flex-1"
                            icon={<HiBan className="w-5 h-5" />}
                        >
                            Cancel
                        </UniversalButton>
                        <UniversalButton
                            type="submit"
                            color="blue"
                            variant="filled"
                            className="flex-1"
                            icon={<HiSave className="w-5 h-5" />}
                        >
                            Update Supplier
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierEditModal;
