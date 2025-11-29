import React, { useState } from 'react';
import { HiX, HiSave, HiBan } from 'react-icons/hi';
import UniversalInput from '../../components/UniversalInput';
import UniversalTextarea from '../../components/UniversalTextarea';
import UniversalSelect from '../../components/UniversalSelect';
import UniversalButton from '../../components/UniversalButton';
import showToast from '../../utils/toast';

const IncomeCreateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        sourceName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: '',
        paymentMethod: 'Cash',
        status: 'Pending',
        note: ''
    });

    const [errors, setErrors] = useState({});

    // Dummy categories (replace with actual API call filtered by type='Income')
    const categories = [
        { value: '1', label: 'Sales' },
        { value: '2', label: 'Services' },
        { value: '3', label: 'Commission' },
        { value: '4', label: 'Other Income' },
    ];

    const paymentMethods = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Google Pay', label: 'Google Pay' },
        { value: 'PhonePe', label: 'PhonePe' },
        { value: 'Paytm', label: 'Paytm' },
        { value: 'Card', label: 'Card' },
        { value: 'Bank Transfer', label: 'Bank Transfer' },
        { value: 'Other', label: 'Other' },
    ];

    const statuses = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Received', label: 'Received' },
        { value: 'Cancelled', label: 'Cancelled' },
    ];

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.sourceName.trim()) newErrors.sourceName = 'Source Name is required';
        if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = 'Valid amount is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.category) newErrors.category = 'Category is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Creating Income:', formData);
            showToast.success('Income created successfully!');
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Income</h2>
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
                            label="Source Name"
                            id="sourceName"
                            name="sourceName"
                            value={formData.sourceName}
                            onChange={handleChange}
                            error={errors.sourceName}
                            placeholder="Enter source name"
                            required
                        />

                        <UniversalInput
                            label="Amount"
                            id="amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            error={errors.amount}
                            placeholder="Enter amount"
                            required
                            step="0.01"
                            min="0"
                        />

                        <UniversalInput
                            label="Date"
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            error={errors.date}
                            required
                        />

                        <UniversalSelect
                            label="Category"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            options={categories}
                            placeholder="Select category"
                            error={errors.category}
                            required
                        />

                        <UniversalSelect
                            label="Payment Method"
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            options={paymentMethods}
                            required
                        />

                        <UniversalSelect
                            label="Status"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={statuses}
                            required
                        />
                    </div>

                    <UniversalTextarea
                        label="Note"
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Enter additional notes (optional)"
                        rows={3}
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
                            Save Income
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IncomeCreateModal;
