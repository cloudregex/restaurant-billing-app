import React, { useState } from 'react';
import { HiPlus, HiSearch, HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import UniversalButton from '../../components/UniversalButton';
import UniversalSelect from '../../components/UniversalSelect';
import showToast from '../../utils/toast';

const PurchaseIndex = () => {
    const navigate = useNavigate();

    // Dummy data (replace with actual API call)
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

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this purchase?')) {
            setPurchases(purchases.filter(p => p.id !== id));
            showToast.success('Purchase deleted successfully!');
        }
    };

    const handleView = (id) => {
        // Navigate to view page (to be implemented)
        showToast.info('View functionality coming soon!');
    };

    const handleEdit = (id) => {
        navigate(`/purchase/edit/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Purchase Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage all your purchase records</p>
                    </div>
                    <UniversalButton
                        color="blue"
                        icon={<HiPlus className="w-5 h-5" />}
                        onClick={() => navigate('/purchase/create')}
                    >
                        New Purchase
                    </UniversalButton>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Purchases</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹{totalPurchases.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Month</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹{thisMonthPurchases.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Payments</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">₹{pendingPayments.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">⏳</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by ID, supplier, or reference..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <UniversalSelect
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                options={[
                                    { value: 'all', label: 'All Status' },
                                    { value: 'draft', label: 'Draft' },
                                    { value: 'completed', label: 'Completed' }
                                ]}
                                placeholder="Filter by status"
                            />
                        </div>

                        {/* Payment Filter */}
                        <div>
                            <UniversalSelect
                                value={paymentFilter}
                                onChange={(e) => setPaymentFilter(e.target.value)}
                                options={[
                                    { value: 'all', label: 'All Payments' },
                                    { value: 'Paid', label: 'Paid' },
                                    { value: 'Pending', label: 'Pending' }
                                ]}
                                placeholder="Filter by payment"
                            />
                        </div>
                    </div>
                </div>

                {/* Purchases Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Purchase ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Supplier
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Reference
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Items
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Total Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Payment Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredPurchases.length > 0 ? (
                                    filteredPurchases.map((purchase) => (
                                        <tr key={purchase.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {purchase.id}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {new Date(purchase.date).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {purchase.supplier.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {purchase.referenceNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {purchase.items} items
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    ₹{purchase.netTotal.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${purchase.paymentStatus === 'Paid'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                                                    }`}>
                                                    {purchase.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleView(purchase.id)}
                                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                        title="View"
                                                    >
                                                        <HiEye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(purchase.id)}
                                                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                                        title="Edit"
                                                    >
                                                        <HiPencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(purchase.id)}
                                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                        title="Delete"
                                                    >
                                                        <HiTrash className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="text-6xl mb-4">📦</span>
                                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No purchases found</p>
                                                <p className="text-gray-400 dark:text-gray-500 text-sm">
                                                    {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all'
                                                        ? 'Try adjusting your filters'
                                                        : 'Create your first purchase to get started'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Footer */}
                {filteredPurchases.length > 0 && (
                    <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                                Showing {filteredPurchases.length} of {purchases.length} purchases
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                Total: <span className="font-semibold text-gray-900 dark:text-white">
                                    ₹{filteredPurchases.reduce((sum, p) => sum + p.netTotal, 0).toLocaleString()}
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseIndex;
