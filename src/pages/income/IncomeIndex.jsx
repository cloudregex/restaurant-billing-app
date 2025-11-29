import React, { useState, useEffect } from 'react';
import { HiCurrencyDollar, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import IncomeCreateModal from './IncomeCreateModal';
import IncomeEditModal from './IncomeEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const IncomeIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState(null);
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
    const [incomes, setIncomes] = useState([
        { id: 1, sourceName: 'Restaurant Sales', amount: 45000, date: '2025-11-01', category: 'Sales', paymentMethod: 'Cash', status: 'Received', note: 'Daily sales' },
        { id: 2, sourceName: 'Catering Service', amount: 15000, date: '2025-11-05', category: 'Services', paymentMethod: 'Bank Transfer', status: 'Received', note: 'Wedding catering' },
        { id: 3, sourceName: 'Online Orders', amount: 8500, date: '2025-11-10', category: 'Sales', paymentMethod: 'Google Pay', status: 'Pending', note: '' },
        { id: 4, sourceName: 'Delivery Commission', amount: 2500, date: '2025-11-15', category: 'Commission', paymentMethod: 'PhonePe', status: 'Received', note: 'Zomato/Swiggy' },
        { id: 5, sourceName: 'Party Booking', amount: 12000, date: '2025-11-20', category: 'Services', paymentMethod: 'Card', status: 'Pending', note: 'Birthday party' },
    ]);

    // Stats
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const receivedIncome = incomes.filter(i => i.status === 'Received').reduce((sum, i) => sum + i.amount, 0);
    const pendingIncome = incomes.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);

    // Filter Logic
    const filteredIncomes = incomes.filter(income => {
        const matchesSearch = income.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            income.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || income.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (income) => {
        setSelectedIncome(income);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Income?',
            'Are you sure you want to delete this income record? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setIncomes(incomes.filter(i => i.id !== id));
            showToast.success('Income has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Source Name', key: 'sourceName' },
        {
            header: 'Amount',
            key: 'amount',
            render: (value) => <span className="font-semibold text-green-600 dark:text-green-400">₹{value.toLocaleString()}</span>
        },
        { header: 'Date', key: 'date' },
        { header: 'Category', key: 'category' },
        { header: 'Payment Method', key: 'paymentMethod' },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Received'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : value === 'Pending'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
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
                    title="Total Income"
                    value={`₹${totalIncome.toLocaleString()}`}
                    color="green"
                    loading={loading}
                    icon={<HiCurrencyDollar />}
                />

                <StatsCard
                    title="Received"
                    value={`₹${receivedIncome.toLocaleString()}`}
                    color="blue"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Pending"
                    value={`₹${pendingIncome.toLocaleString()}`}
                    color="orange"
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
                                placeholder="Search Income..."
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
                                { value: 'Received', label: 'Received' },
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Cancelled', label: 'Cancelled' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => setIsCreateModalOpen(true)}
                        color="green"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        Add Income
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredIncomes}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <IncomeCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedIncome && (
                <IncomeEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedIncome(null);
                    }}
                    income={selectedIncome}
                />
            )}

        </div>
    );
};

export default IncomeIndex;
