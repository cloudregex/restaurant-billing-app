import React, { useState, useEffect } from 'react';
import SupplierCreateModal from './SupplierCreateModal';
import SupplierEditModal from './SupplierEditModal';
import SkeletonCard from '../../components/SkeletonCard';
import SkeletonTable from '../../components/SkeletonTable';

const SupplierIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
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
    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'Fresh Farms Ltd', mobile: '9876543210', address: '123, Veg Market, City', items: 'Vegetables, Fruits', status: 'Active' },
        { id: 2, name: 'Dairy Delight', mobile: '8765432109', address: '45, Milk Colony, City', items: 'Milk, Cheese, Butter', status: 'Active' },
        { id: 3, name: 'Spice World', mobile: '7654321098', address: '88, Spice Market, City', items: 'Spices, Dry Fruits', status: 'Deactive' },
        { id: 4, name: 'Bakery Supplies', mobile: '6543210987', address: '12, Industrial Area', items: 'Flour, Sugar, Yeast', status: 'Active' },
        { id: 5, name: 'Meat House', mobile: '9988776655', address: 'Shop 5, Meat Market', items: 'Chicken, Mutton', status: 'Active' },
    ]);

    // Stats
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter(s => s.status === 'Active').length;
    const deactiveSuppliers = suppliers.filter(s => s.status === 'Deactive').length;

    // Filter Logic
    const filteredSuppliers = suppliers.filter(supplier => {
        const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.mobile.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || supplier.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (supplier) => {
        setSelectedSupplier(supplier);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            setSuppliers(suppliers.filter(s => s.id !== id));
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
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Suppliers</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{totalSuppliers}</h3>
                            </div>
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Suppliers</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{activeSuppliers}</h3>
                            </div>
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Deactive Suppliers</p>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{deactiveSuppliers}</h3>
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
                            placeholder="Search Name or Mobile..."
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
                    Add Supplier
                </button>
            </div>

            {/* Table */}
            {loading ? (
                <SkeletonTable rows={5} columns={6} />
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mobile</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Address</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items / Notes</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredSuppliers.length > 0 ? (
                                    filteredSuppliers.map((supplier) => (
                                        <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{supplier.name}</td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{supplier.mobile}</td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={supplier.address}>{supplier.address}</td>
                                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={supplier.items}>{supplier.items}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${supplier.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {supplier.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <button
                                                    onClick={() => handleEdit(supplier)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(supplier.id)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colspan="6" className="p-8 text-center text-gray-500 dark:text-gray-400">
                                            No suppliers found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modals */}
            {isCreateModalOpen && (
                <SupplierCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedSupplier && (
                <SupplierEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedSupplier(null);
                    }}
                    supplier={selectedSupplier}
                />
            )}

        </div>
    );
};

export default SupplierIndex;
