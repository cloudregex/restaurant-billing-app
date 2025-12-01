import React, { useState, useEffect } from 'react';
import { HiPlus, HiSearch, HiEye, HiPencil, HiTrash, HiCurrencyRupee, HiCalendar, HiClock } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const PurchaseIndex = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy data
    const [purchases, setPurchases] = useState([
        {
            id: 'PUR-001',
            date: '2025-11-28',
            supplier: { id: '1', name: 'ABC Suppliers' },
            referenceNumber: 'INV-12345',
            items: 5,
            subtotal: 25000,
            discount: 500,
            taxAmount: 1225,
            netTotal: 25725,
            paymentStatus: 'Paid',
            status: 'completed'
        },
        {
            id: 'PUR-002',
            date: '2025-11-27',
            supplier: { id: '2', name: 'XYZ Traders' },
            referenceNumber: 'INV-12346',
            items: 3,
            subtotal: 15000,
            discount: 0,
            taxAmount: 750,
            netTotal: 15750,
            paymentStatus: 'Pending',
            status: 'draft'
        },
        {
            id: 'PUR-003',
            date: '2025-11-26',
            supplier: { id: '3', name: 'PQR Distributors' },
            referenceNumber: 'INV-12347',
            items: 8,
            subtotal: 45000,
            discount: 2000,
            taxAmount: 2150,
            netTotal: 45150,
            paymentStatus: 'Paid',
            status: 'completed'
        },
    ]);

    // Calculate statistics
    const totalPurchases = purchases.reduce((sum, p) => sum + p.netTotal, 0);
    const thisMonthPurchases = purchases
        .filter(p => new Date(p.date).getMonth() === new Date().getMonth())
        .reduce((sum, p) => sum + p.netTotal, 0);
    const pendingPayments = purchases
        .filter(p => p.paymentStatus === 'Pending')
        .reduce((sum, p) => sum + p.netTotal, 0);

    // Filter purchases
    const filteredPurchases = purchases.filter(purchase => {
        const matchesSearch =
            purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purchase.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || purchase.status === statusFilter;
        const matchesPayment = paymentFilter === 'all' || purchase.paymentStatus === paymentFilter;

        return matchesSearch && matchesStatus && matchesPayment;
    });

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Purchase?',
            'Are you sure you want to delete this purchase? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setPurchases(purchases.filter(p => p.id !== id));
            showToast.success('Purchase deleted successfully!');
        }
    };

    const handleView = (row) => {
        showToast.info('View functionality coming soon!');
    };

    const handleEdit = (row) => {
        navigate(`/purchase/edit/${row.id}`);
    };

    const columns = [
        { header: 'Purchase ID', key: 'id', render: (value) => <span className="font-medium">{value}</span> },
        {
            header: 'Date',
            key: 'date',
            render: (value) => new Date(value).toLocaleDateString()
        },
        {
            header: 'Supplier',
            key: 'supplier',
            render: (value) => value.name
        },
        { header: 'Reference', key: 'referenceNumber' },
        {
            header: 'Items',
            key: 'items',
            render: (value) => `${value} items`
        },
        {
            header: 'Total Amount',
            key: 'netTotal',
            render: (value) => (
                <span className="font-bold text-gray-900 dark:text-white">₹{value.toLocaleString()}</span>
            )
        },
        {
            header: 'Payment Status',
            key: 'paymentStatus',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Paid'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
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
                    color="indigo"
                    variant="filled"
                    size="sm"
                    icon={<HiEye className="w-4 h-4" />}
                    iconOnly
                />
            ),
            onClick: handleView
        },
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
                    title="Total Purchases"
                    value={`₹${totalPurchases.toLocaleString()}`}
                    color="blue"
                    loading={loading}
                    icon={<HiCurrencyRupee />}
                />

                <StatsCard
                    title="This Month"
                    value={`₹${thisMonthPurchases.toLocaleString()}`}
                    color="green"
                    loading={loading}
                    icon={<HiCalendar />}
                />

                <StatsCard
                    title="Pending Payments"
                    value={`₹${pendingPayments.toLocaleString()}`}
                    color="orange"
                    loading={loading}
                    icon={<HiClock />}
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
                                placeholder="Search Purchase..."
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
                                { value: 'all', label: 'All Status' },
                                { value: 'draft', label: 'Draft' },
                                { value: 'completed', label: 'Completed' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                        <UniversalSelect
                            loading={loading}
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Payments' },
                                { value: 'Paid', label: 'Paid' },
                                { value: 'Pending', label: 'Pending' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => navigate('/purchase/create')}
                        color="blue"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        New Purchase
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredPurchases}
                    loading={loading}
                    actions={actions}
                />
            </div>
        </div>
    );
};

export default PurchaseIndex;
