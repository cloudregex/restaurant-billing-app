import React, { useState, useEffect } from 'react';
import { HiUsers, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import CustomerCreateModal from './CustomerCreateModal';
import CustomerEditModal from './CustomerEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const CustomerIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
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
    const [customers, setCustomers] = useState([
        { id: 1, name: 'Rajesh Kumar', mobile: '9876543210', address: '123, MG Road, Pune', internalNote: 'Regular customer', status: 'Active' },
        { id: 2, name: 'Priya Sharma', mobile: '8765432109', address: '45, FC Road, Pune', internalNote: 'VIP customer', status: 'Active' },
        { id: 3, name: 'Amit Patel', mobile: '7654321098', address: '88, Shivaji Nagar, Pune', internalNote: '', status: 'Active' },
        { id: 4, name: 'Sneha Desai', mobile: '6543210987', address: '', internalNote: 'Prefers evening delivery', status: 'Deactive' },
        { id: 5, name: 'Vikram Singh', mobile: '9988776655', address: '12, Kothrud, Pune', internalNote: '', status: 'Active' },
    ]);

    // Stats
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'Active').length;
    const deactiveCustomers = customers.filter(c => c.status === 'Deactive').length;

    // Filter Logic
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.mobile.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Customer?',
            'Are you sure you want to delete this customer? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setCustomers(customers.filter(c => c.id !== id));
            showToast.success('Customer has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Customer Name', key: 'name' },
        { header: 'Mobile', key: 'mobile' },
        {
            header: 'Address',
            key: 'address',
            render: (value) => (
                <span className="max-w-xs truncate block" title={value}>{value || '-'}</span>
            )
        },
        {
            header: 'Internal Note',
            key: 'internalNote',
            render: (value) => (
                <span className="max-w-xs truncate block" title={value}>{value || '-'}</span>
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
                    title="Total Customers"
                    value={totalCustomers}
                    color="blue"
                    loading={loading}
                    icon={<HiUsers />}
                />

                <StatsCard
                    title="Active Customers"
                    value={activeCustomers}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Deactive Customers"
                    value={deactiveCustomers}
                    color="red"
                    loading={loading}
                    icon={<HiXCircle />}
                />
            </div>

            {/* Actions & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex gap-4 w-full md:w-auto items-end">
                        <div className="w-full md:w-64">
                            <UniversalInput
                                type="text"
                                loading={loading}
                                placeholder="Search Customer..."
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
                        Add Customer
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredCustomers}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {
                isCreateModalOpen && (
                    <CustomerCreateModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    />
                )
            }

            {
                isEditModalOpen && selectedCustomer && (
                    <CustomerEditModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedCustomer(null);
                        }}
                        customer={selectedCustomer}
                    />
                )
            }

        </div >
    );
};

export default CustomerIndex;
