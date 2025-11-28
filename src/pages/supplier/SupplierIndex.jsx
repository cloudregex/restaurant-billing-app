import React, { useState, useEffect } from 'react';
import { HiUsers, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import SupplierCreateModal from './SupplierCreateModal';
import SupplierEditModal from './SupplierEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

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

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Supplier?',
            'Are you sure you want to delete this supplier? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setSuppliers(suppliers.filter(s => s.id !== id));
            showToast.success('Supplier has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Name', key: 'name' },
        { header: 'Mobile', key: 'mobile' },
        {
            header: 'Address',
            key: 'address',
            render: (value) => (
                <span className="max-w-xs truncate block" title={value}>{value}</span>
            )
        },
        {
            header: 'Items / Notes',
            key: 'items',
            render: (value) => (
                <span className="max-w-xs truncate block" title={value}>{value}</span>
            )
        },
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

    const action = [
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
                    title="Total Suppliers"
                    value={totalSuppliers}
                    color="blue"
                    loading={loading}
                    icon={<HiUsers />}
                />

                <StatsCard
                    title="Active Suppliers"
                    value={activeSuppliers}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Deactive Suppliers"
                    value={deactiveSuppliers}
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
                            placeholder="Search Name or Mobile..."
                            value={searchTerm}
                            loading={loading}
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
                    Add Supplier
                </UniversalButton>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={filteredSuppliers}
                loading={loading}
                actions={action}
            />

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
