import React, { useState } from 'react';
import { HiX, HiSave, HiBan } from 'react-icons/hi';
import UniversalInput from '../../components/UniversalInput';
import UniversalTextarea from '../../components/UniversalTextarea';
import UniversalSelect from '../../components/UniversalSelect';
import UniversalButton from '../../components/UniversalButton';
import UniversalCheckbox from '../../components/UniversalCheckbox';
import showToast from '../../utils/toast';

const EmployeeCreateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        role: '',
        address: '',
        dateHired: '',
        fireDate: '',
        salary: '',
        status: 'Active',
        permissions: {
            pos: false,
            purchase: false,
            finance: false
        },
        pin: '',
        confirmPin: ''
    });

    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile Number is required';
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        if (!formData.dateHired) newErrors.dateHired = 'Date Hired is required';
        if (!formData.salary) newErrors.salary = 'Salary is required';

        if (!formData.pin) {
            newErrors.pin = 'PIN is required';
        } else if (formData.pin.length !== 4 || isNaN(formData.pin)) {
            newErrors.pin = 'PIN must be 4 digits';
        }

        if (formData.pin !== formData.confirmPin) {
            newErrors.confirmPin = 'PINs do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Format permissions for backend if needed, currently keeping as object or array
            const permissionsArray = Object.keys(formData.permissions).filter(key => formData.permissions[key]);

            const submitData = {
                ...formData,
                permissions: permissionsArray
            };

            console.log('Creating Employee:', submitData);
            showToast.success('Employee created successfully!');
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict PIN fields to numbers only
        if ((name === 'pin' || name === 'confirmPin') && !/^\d*$/.test(value)) {
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handlePermissionChange = (permission) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permission]: !prev.permissions[permission]
            }
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl animate-scale-in my-8">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Employee</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UniversalInput
                            label="Full Name"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            placeholder="Enter full name"
                            required
                        />

                        <UniversalInput
                            label="Mobile Number"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            error={errors.mobile}
                            placeholder="Enter mobile number"
                            required
                        />

                        <UniversalInput
                            label="Role"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            error={errors.role}
                            placeholder="e.g. Manager, Waiter"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <UniversalInput
                            label="Salary"
                            id="salary"
                            name="salary"
                            type="number"
                            value={formData.salary}
                            onChange={handleChange}
                            error={errors.salary}
                            placeholder="Enter salary"
                            required
                        />
                        <UniversalSelect
                            label="Status"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Deactive', label: 'Deactive' }
                            ]}
                        />

                        <UniversalInput
                            label="Date Hired"
                            id="dateHired"
                            name="dateHired"
                            type="date"
                            value={formData.dateHired}
                            onChange={handleChange}
                            error={errors.dateHired}
                            required
                        />

                        <UniversalInput
                            label="Fire Date"
                            id="fireDate"
                            name="fireDate"
                            type="date"
                            value={formData.fireDate}
                            onChange={handleChange}
                            placeholder="Optional"
                        />
                    </div>

                    <UniversalTextarea
                        label="Address"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        rows={3}
                    />



                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Login Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <UniversalInput
                                label="Login PIN (4 Digits)"
                                id="pin"
                                name="pin"
                                type="password"
                                maxLength={4}
                                value={formData.pin}
                                onChange={handleChange}
                                error={errors.pin}
                                placeholder="Enter 4-digit PIN"
                                required
                            />

                            <UniversalInput
                                label="Confirm PIN"
                                id="confirmPin"
                                name="confirmPin"
                                type="password"
                                maxLength={4}
                                value={formData.confirmPin}
                                onChange={handleChange}
                                error={errors.confirmPin}
                                placeholder="Confirm 4-digit PIN"
                                required
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions</h3>
                        <div className="flex flex-wrap gap-6">
                            <UniversalCheckbox
                                label="POS Access"
                                checked={formData.permissions.pos}
                                onChange={() => handlePermissionChange('pos')}
                            />
                            <UniversalCheckbox
                                label="Purchase Access"
                                checked={formData.permissions.purchase}
                                onChange={() => handlePermissionChange('purchase')}
                            />
                            <UniversalCheckbox
                                label="Finance Access"
                                checked={formData.permissions.finance}
                                onChange={() => handlePermissionChange('finance')}
                            />
                        </div>
                    </div>

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
                            Save Employee
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeCreateModal;
