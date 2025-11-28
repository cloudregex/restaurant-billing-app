import React, { useState, useEffect } from 'react';
import CategorieCreateModal from './CategorieCreateModal';
import CategorieEditModal from './CategorieEditModal';
import SkeletonCard from '../../components/SkeletonCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';

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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    return (
        <div className="min-h-[calc(100vh-34px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6">

            {/* Header & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {loading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Categories</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{totalCategories}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Categories</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{activeCategories}</h3>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Deactive Categories</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{deactiveCategories}</h3>
                            </div>
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search Category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                    </select>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {/* Table */}
            <Table
                columns={[
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
                ]}
                data={filteredCategories}
                loading={loading}
                actions={[
                    {
                        label: (
                            <UniversalButton
                                color="blue"
                                variant="text"
                                size="sm"
                                icon={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                }
                                iconOnly
                            >
                                Edit
                            </UniversalButton>
                        ),
                        onClick: handleEdit
                    },
                    {
                        label: (
                            <UniversalButton
                                color="red"
                                variant="text"
                                size="sm"
                                icon={
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                }
                                iconOnly
                            >
                                Delete
                            </UniversalButton>
                        ),
                        onClick: (row) => handleDelete(row.id)
                    }
                ]}
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
