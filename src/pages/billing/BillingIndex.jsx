import React, { useState, useEffect } from 'react';
import { HiPlus, HiPencil, HiEye, HiCash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const BillingIndex = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy bills data
    const bills = [
        { id: 1, billNo: 'BILL-001', tableNumber: 'T-01', customer: 'Walk-in', items: 5, amount: 850, status: 'Pending', time: '10:30 AM', date: '28-11-2024' },
        { id: 2, billNo: 'BILL-002', tableNumber: 'T-03', customer: 'Rajesh Kumar', items: 8, amount: 1200, status: 'Paid', time: '11:15 AM', date: '28-11-2024' },
        { id: 3, billNo: 'BILL-003', tableNumber: 'T-05', customer: 'Walk-in', items: 4, amount: 650, status: 'Pending', time: '11:45 AM', date: '28-11-2024' },
        { id: 4, billNo: 'BILL-004', tableNumber: 'T-02', customer: 'Priya Sharma', items: 6, amount: 980, status: 'Paid', time: '12:00 PM', date: '28-11-2024' },
    ];

    const totalBills = bills.length;
    const pendingBills = bills.filter(b => b.status === 'Pending').length;
    const paidBills = bills.filter(b => b.status === 'Paid').length;
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.amount, 0);

    const filteredBills = bills.filter(bill => {
        const matchesSearch = bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || bill.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const columns = [
        { header: 'Bill No', key: 'billNo' },
        { header: 'Table', key: 'tableNumber' },
        { header: 'Customer', key: 'customer' },
        { header: 'Date', key: 'date' },
        { header: 'Time', key: 'time' },
        {
            header: 'Items',
            key: 'items',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            header: 'Amount',
            key: 'amount',
            render: (value) => <span className="font-bold text-green-600 dark:text-green-400">₹{value}</span>
        },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
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
                    icon={<HiEye className="w-4 h-4" />}
                    iconOnly
                />
            ),
            onClick: (row) => navigate(`/billing/view/${row.id}`)
        },
        {
            label: (
                <UniversalButton
                    color="green"
                    variant="filled"
                    size="sm"
                    icon={<HiCash className="w-4 h-4" />}
                    iconOnly
                />
            ),
            onClick: (row) => navigate(`/billing/payment/${row.id}`)
        }
    ];

    return (
        <div className="min-h-[calc(100vh-34px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Bills"
                    value={totalBills}
                    color="blue"
                    loading={loading}
                    icon={<HiCash />}
                />
                <StatsCard
                    title="Pending Bills"
                    value={pendingBills}
                    color="yellow"
                    loading={loading}
                    icon={<HiCash />}
                />
                <StatsCard
                    title="Paid Bills"
                    value={paidBills}
                    color="green"
                    loading={loading}
                    icon={<HiCash />}
                />
                <StatsCard
                    title="Total Revenue"
                    value={`₹${totalRevenue}`}
                    color="purple"
                    loading={loading}
                    icon={<HiCash />}
                />
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex gap-4 w-full md:w-auto items-end">
                        <div className="w-full md:w-64">
                            <UniversalInput
                                type="text"
                                loading={loading}
                                placeholder="Search bills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-0"
                            />
                        </div>
                        <UniversalSelect
                            loading={loading}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: 'All', label: 'All Status' },
                                { value: 'Pending', label: 'Pending' },
                                { value: 'Paid', label: 'Paid' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => navigate('/billing/table-select')}
                        color="blue"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        Add Bill
                    </UniversalButton>
                </div>

                <Table
                    columns={columns}
                    data={filteredBills}
                    loading={loading}
                    actions={actions}
                />
            </div>
        </div>
    );
};

export default BillingIndex;
