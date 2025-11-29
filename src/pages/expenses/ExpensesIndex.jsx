import React, { useState, useEffect } from 'react';
import { HiCurrencyDollar, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import ExpenseCreateModal from './ExpenseCreateModal';
import ExpenseEditModal from './ExpenseEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const ExpensesIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
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
    const [expenses, setExpenses] = useState([
        { id: 1, sourceName: 'Office Rent', amount: 25000, date: '2025-11-01', category: 'Rent', paymentMethod: 'Bank Transfer', status: 'Paid', note: 'Monthly rent' },
        { id: 2, sourceName: 'Electricity Bill', amount: 3500, date: '2025-11-05', category: 'Utilities', paymentMethod: 'Cash', status: 'Paid', note: '' },
        { id: 3, sourceName: 'Office Supplies', amount: 1200, date: '2025-11-10', category: 'Office Supplies', paymentMethod: 'Card', status: 'Pending', note: 'Stationery items' },
        { id: 4, sourceName: 'Maintenance', amount: 5000, date: '2025-11-15', category: 'Maintenance', paymentMethod: 'Google Pay', status: 'Paid', note: 'AC repair' },
        { id: 5, sourceName: 'Internet Bill', amount: 1500, date: '2025-11-20', category: 'Utilities', paymentMethod: 'PhonePe', status: 'Pending', note: '' },
    ]);

    // Stats
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const paidExpenses = expenses.filter(e => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0);
    const pendingExpenses = expenses.filter(e => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0);

    // Filter Logic
    const filteredExpenses = expenses.filter(expense => {
        const matchesSearch = expense.sourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || expense.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Expense?',
            'Are you sure you want to delete this expense? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setExpenses(expenses.filter(e => e.id !== id));
            showToast.success('Expense has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Source Name', key: 'sourceName' },
        {
            header: 'Amount',
            key: 'amount',
            render: (value) => <span className="font-semibold text-gray-900 dark:text-white">₹{value.toLocaleString()}</span>
        },
        { header: 'Date', key: 'date' },
        { header: 'Category', key: 'category' },
        { header: 'Payment Method', key: 'paymentMethod' },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Paid'
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
                    title="Total Expenses"
                    value={`₹${totalExpenses.toLocaleString()}`}
                    color="red"
                    loading={loading}
                    icon={<HiCurrencyDollar />}
                />

                <StatsCard
                    title="Paid"
                    value={`₹${paidExpenses.toLocaleString()}`}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Pending"
                    value={`₹${pendingExpenses.toLocaleString()}`}
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
                                placeholder="Search Expense..."
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
                                { value: 'Paid', label: 'Paid' },
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Cancelled', label: 'Cancelled' }
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
                        Add Expense
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredExpenses}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <ExpenseCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedExpense && (
                <ExpenseEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedExpense(null);
                    }}
                    expense={selectedExpense}
                />
            )}

        </div>
    );
};

export default ExpensesIndex;
