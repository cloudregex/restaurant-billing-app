import React, { useState } from 'react';
import { HiX, HiSave, HiBan } from 'react-icons/hi';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';
import UniversalButton from '../../components/UniversalButton';
import showToast from '../../utils/toast';

const TableEditModal = ({ isOpen, onClose, table }) => {
    const [formData, setFormData] = useState({
        tableNumber: table?.tableNumber || '',
        capacity: table?.capacity?.toString() || '',
        type: table?.type || 'Family',
        status: table?.status || 'Available'
    });

    const [errors, setErrors] = useState({});

    const typeOptions = [
        { value: 'Family', label: 'Family' },
        { value: 'Open', label: 'Open' },
        { value: 'Private', label: 'Private' },
    ];

    const statusOptions = [
        { value: 'Available', label: 'Available' },
        { value: 'Occupied', label: 'Occupied' },
        { value: 'Reserved', label: 'Reserved' },
    ];

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.tableNumber.trim()) newErrors.tableNumber = 'Table Number is required';
        if (!formData.capacity) {
            newErrors.capacity = 'Capacity is required';
        } else if (isNaN(formData.capacity) || parseInt(formData.capacity) <= 0) {
            newErrors.capacity = 'Capacity must be greater than 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Updating Table:', formData);
            showToast.success('Table updated successfully!');
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Table</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <UniversalInput
                            label="Table Number"
                            id="tableNumber"
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleChange}
                            error={errors.tableNumber}
                            placeholder="e.g., T-01, Table 1"
                            required
                        />

                        <UniversalInput
                            label="Capacity (Persons)"
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={formData.capacity}
                            onChange={handleChange}
                            error={errors.capacity}
                            placeholder="Enter capacity"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <UniversalSelect
                            label="Table Type"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            options={typeOptions}
                            required
                        />

                        <UniversalSelect
                            label="Status"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={statusOptions}
                            required
                        />
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
                            Update Table
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TableEditModal;
