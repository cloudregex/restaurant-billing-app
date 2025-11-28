import React, { useState } from 'react';
import UniversalInput from '../../components/UniversalInput';
import UniversalTextarea from '../../components/UniversalTextarea';
import UniversalButton from '../../components/UniversalButton';

const CategorieCreateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'Active'
    });

    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Category Name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Creating Category:', formData);
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
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Category</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <UniversalInput
                        label="Category Name"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        placeholder="Enter category name"
                        required
                    />

                    <UniversalTextarea
                        label="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter category description (optional)"
                        rows={3}
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
                            Save Category
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategorieCreateModal;
