import React, { useState } from 'react';
import { HiX, HiSave, HiBan } from 'react-icons/hi';
import UniversalInput from '../../components/UniversalInput';
import UniversalTextarea from '../../components/UniversalTextarea';
import UniversalSelect from '../../components/UniversalSelect';
import UniversalFileUpload from '../../components/UniversalFileUpload';
import UniversalButton from '../../components/UniversalButton';
import showToast from '../../utils/toast';

const MenuEditModal = ({ isOpen, onClose, menuItem }) => {
    const [formData, setFormData] = useState({
        name: menuItem?.name || '',
        marathiName: menuItem?.marathiName || '',
        description: menuItem?.description || '',
        category: menuItem?.categoryId?.toString() || '',
        taxPercentage: menuItem?.taxPercentage?.toString() || '',
        basePrice: menuItem?.basePrice?.toString() || '',
        finalPrice: menuItem?.finalPrice || 0,
        image: null,
        existingImage: menuItem?.image || '',
        status: menuItem?.status || 'Available'
    });

    const [errors, setErrors] = useState({});

    // Dummy categories and taxes (in real app, fetch from API)
    const categories = [
        { value: '', label: 'Select Category' },
        { value: '1', label: 'Starters' },
        { value: '2', label: 'Main Course' },
        { value: '3', label: 'Desserts' },
        { value: '4', label: 'Beverages' },
    ];

    const taxes = [
        { value: '', label: 'Select Tax' },
        { value: '0', label: 'No Tax (0%)' },
        { value: '5', label: 'GST 5%' },
        { value: '12', label: 'GST 12%' },
        { value: '18', label: 'GST 18%' },
    ];

    const statusOptions = [
        { value: 'Available', label: 'Available' },
        { value: 'Not Available', label: 'Not Available' },
    ];

    if (!isOpen) return null;

    // Calculate final price whenever base price or tax changes
    const calculateFinalPrice = (basePrice, taxPercentage) => {
        const base = parseFloat(basePrice) || 0;
        const tax = parseFloat(taxPercentage) || 0;
        return base + (base * tax / 100);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Product Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.taxPercentage && formData.taxPercentage !== '0') newErrors.taxPercentage = 'Tax is required';
        if (!formData.basePrice) {
            newErrors.basePrice = 'Base Price is required';
        } else if (isNaN(formData.basePrice) || parseFloat(formData.basePrice) <= 0) {
            newErrors.basePrice = 'Base Price must be greater than 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Updating Menu Item:', formData);
            showToast.success('Menu item updated successfully!');
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };

        // Recalculate final price if base price or tax changes
        if (name === 'basePrice' || name === 'taxPercentage') {
            newFormData.finalPrice = calculateFinalPrice(
                name === 'basePrice' ? value : formData.basePrice,
                name === 'taxPercentage' ? value : formData.taxPercentage
            );
        }

        setFormData(newFormData);
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (files) => {
        if (files && files.length > 0) {
            setFormData(prev => ({ ...prev, image: files[0] }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl animate-scale-in max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Menu Item</h2>
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
                            label="Product Name (English)"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            placeholder="Enter product name in English"
                            required
                        />

                        <UniversalInput
                            label="Product Name (Marathi)"
                            id="marathiName"
                            name="marathiName"
                            value={formData.marathiName}
                            onChange={handleChange}
                            placeholder="उत्पादनाचे नाव मराठीत (optional)"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <UniversalSelect
                            label="Category"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            error={errors.category}
                            options={categories}
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

                    <UniversalTextarea
                        label="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description (optional)"
                        rows={3}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UniversalInput
                            label="Base Price (₹)"
                            id="basePrice"
                            name="basePrice"
                            type="number"
                            step="0.01"
                            value={formData.basePrice}
                            onChange={handleChange}
                            error={errors.basePrice}
                            placeholder="0.00"
                            required
                        />

                        <UniversalSelect
                            label="Tax %"
                            id="taxPercentage"
                            name="taxPercentage"
                            value={formData.taxPercentage}
                            onChange={handleChange}
                            error={errors.taxPercentage}
                            options={taxes}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Final Price (₹)
                            </label>
                            <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                    ₹{formData.finalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>



                    <UniversalFileUpload
                        label="Product Image"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        oldImageUrl={formData.existingImage}
                        helperText="Upload new image to replace existing one (optional)"
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
                            Update Menu Item
                        </UniversalButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuEditModal;
