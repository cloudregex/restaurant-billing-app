import React, { useState, useEffect } from 'react';
import { HiViewGrid, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import MenuCreateModal from './MenuCreateModal';
import MenuEditModal from './MenuEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const MenuIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', category: 'Starters', categoryId: 1, taxPercentage: 5, basePrice: 200, finalPrice: 210, image: '', status: 'Available' },
        { id: 2, name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry', category: 'Main Course', categoryId: 2, taxPercentage: 5, basePrice: 350, finalPrice: 367.5, image: '', status: 'Available' },
        { id: 3, name: 'Gulab Jamun', description: 'Sweet milk-based dessert', category: 'Desserts', categoryId: 3, taxPercentage: 5, basePrice: 80, finalPrice: 84, image: '', status: 'Available' },
        { id: 4, name: 'Masala Dosa', description: 'Crispy rice crepe with potato filling', category: 'Main Course', categoryId: 2, taxPercentage: 5, basePrice: 120, finalPrice: 126, image: '', status: 'Not Available' },
        { id: 5, name: 'Cold Coffee', description: 'Chilled coffee with ice cream', category: 'Beverages', categoryId: 4, taxPercentage: 5, basePrice: 100, finalPrice: 105, image: '', status: 'Available' },
    ]);

    // Categories for filter
    const categories = [
        { value: 'All', label: 'All Categories' },
        { value: 'Starters', label: 'Starters' },
        { value: 'Main Course', label: 'Main Course' },
        { value: 'Desserts', label: 'Desserts' },
        { value: 'Beverages', label: 'Beverages' },
    ];

    // Stats
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter(item => item.status === 'Available').length;
    const notAvailableItems = menuItems.filter(item => item.status === 'Not Available').length;

    // Filter Logic
    const filteredMenuItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const handleEdit = (menuItem) => {
        setSelectedMenuItem(menuItem);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Menu Item?',
            'Are you sure you want to delete this menu item? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setMenuItems(menuItems.filter(item => item.id !== id));
            showToast.success('Menu item has been deleted successfully.');
        }
    };

    const columns = [
        {
            header: 'Image',
            key: 'image',
            render: (value) => (
                <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {value ? (
                        <img src={value} alt="Product" className="w-full h-full object-cover" />
                    ) : (
                        <HiViewGrid className="w-6 h-6 text-gray-400" />
                    )}
                </div>
            )
        },
        { header: 'Product Name', key: 'name' },
        { header: 'Category', key: 'category' },
        {
            header: 'Base Price',
            key: 'basePrice',
            render: (value) => (
                <span className="font-medium">₹{value}</span>
            )
        },
        {
            header: 'Tax %',
            key: 'taxPercentage',
            render: (value) => (
                <span className="text-blue-600 dark:text-blue-400">{value}%</span>
            )
        },
        {
            header: 'Final Price',
            key: 'finalPrice',
            render: (value) => (
                <span className="font-bold text-green-600 dark:text-green-400">₹{value}</span>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Available'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                    {value}
                </span>
            )
        }
    ];

    const actions = [
        {
            label: (
                <UniversalButton
                    color="blue"
                    variant="filled"
                    size="sm"
                    icon={<HiPencil className="w-4 h-4" />}
                    iconOnly
                />
            ),
            onClick: handleEdit
        },
        {
            label: (
                <UniversalButton
                    color="red"
                    variant="filled"
                    size="sm"
                    icon={<HiTrash className="w-4 h-4" />}
                    iconOnly
                />
            ),
            onClick: (row) => handleDelete(row.id)
        }
    ];

    return (
        <div className="min-h-[calc(100vh-34px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6">

            {/* Header & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Total Items"
                    value={totalItems}
                    color="blue"
                    loading={loading}
                    icon={<HiViewGrid />}
                />

                <StatsCard
                    title="Available Items"
                    value={availableItems}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Not Available"
                    value={notAvailableItems}
                    color="red"
                    loading={loading}
                    icon={<HiXCircle />}
                />
            </div>

            {/* Actions & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex gap-4 w-full md:w-auto items-end flex-wrap">
                        <div className="w-full md:w-64">
                            <UniversalInput
                                type="text"
                                loading={loading}
                                placeholder="Search Menu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-0"
                                leftIcon={<HiSearch className="w-5 h-5" />}
                            />
                        </div>
                        <UniversalSelect
                            loading={loading}
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            options={categories}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                        <UniversalSelect
                            loading={loading}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: 'All', label: 'All Status' },
                                { value: 'Available', label: 'Available' },
                                { value: 'Not Available', label: 'Not Available' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => setIsCreateModalOpen(true)}
                        color="blue"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        Add Menu Item
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredMenuItems}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <MenuCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedMenuItem && (
                <MenuEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedMenuItem(null);
                    }}
                    menuItem={selectedMenuItem}
                />
            )}

        </div>
    );
};

export default MenuIndex;
