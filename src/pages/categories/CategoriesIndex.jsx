import React, { useState, useEffect } from 'react';
import { HiCollection, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import CategorieCreateModal from './CategorieCreateModal';
import CategorieEditModal from './CategorieEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const CategoriesIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data
    const [categories, setCategories] = useState([
        { id: 1, name: 'Starters', description: 'Appetizers and starters', status: 'Active' },
        { id: 2, name: 'Main Course', description: 'Main dishes and entrees', status: 'Active' },
        { id: 3, name: 'Desserts', description: 'Sweet dishes and desserts', status: 'Active' },
        { id: 4, name: 'Beverages', description: 'Drinks and beverages', status: 'Active' },
        { id: 5, name: 'Chinese', description: 'Chinese cuisine items', status: 'Deactive' },
    ]);

    // Stats
    const totalCategories = categories.length;
    const activeCategories = categories.filter(c => c.status === 'Active').length;
    const deactiveCategories = categories.filter(c => c.status === 'Deactive').length;

    // Filter Logic
    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || category.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Category?',
            'Are you sure you want to delete this category? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setCategories(categories.filter(c => c.id !== id));
            showToast.success('Category has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Category Name', key: 'name' },
        { header: 'Description', key: 'description' },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Active'
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
                    title="Total Categories"
                    value={totalCategories}
                    color="blue"
                    loading={loading}
                    icon={<HiCollection />}
                />

                <StatsCard
                    title="Active Categories"
                    value={activeCategories}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Deactive Categories"
                    value={deactiveCategories}
                    color="red"
                    loading={loading}
                    icon={<HiXCircle />}
                />
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex gap-4 w-full md:w-auto items-end">
                    <div className="w-full md:w-64">
                        <UniversalInput
                            type="text"
                            loading={loading}
                            placeholder="Search Category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-0"
                            leftIcon={<HiSearch className="w-5 h-5" />}
                        />
                    </div>
                    <UniversalSelect
                        loading={loading}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        options={[
                            { value: 'All', label: 'All Status' },
                            { value: 'Active', label: 'Active' },
                            { value: 'Deactive', label: 'Deactive' }
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
                    Add Category
                </UniversalButton>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={filteredCategories}
                loading={loading}
                actions={actions}
            />

            {/* Modals */}
            {isCreateModalOpen && (
                <CategorieCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedCategory && (
                <CategorieEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedCategory(null);
                    }}
                    category={selectedCategory}
                />
            )}

        </div>
    );
};

export default CategoriesIndex;
