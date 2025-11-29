import React, { useState, useEffect } from 'react';
import { HiX, HiPlus, HiSave, HiCheckCircle, HiUserAdd, HiUserGroup } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import UniversalButton from '../../components/UniversalButton';
import UniversalSelect from '../../components/UniversalSelect';
import SupplierCreateModal from '../supplier/SupplierCreateModal';
import { TAX_RATES, getTaxRate, calculateTaxAmount } from '../../utils/taxRates';
import showToast from '../../utils/toast';

const PurchaseEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Bill Information State
    const [purchaseDate, setPurchaseDate] = useState('');
    const [selectedSupplierId, setSelectedSupplierId] = useState('');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [showSupplierModal, setShowSupplierModal] = useState(false);

    // Dummy suppliers data (replace with actual API call)
    const [suppliers, setSuppliers] = useState([
        { id: '1', name: 'ABC Suppliers', mobile: '9876543210', gstNumber: '27AABCU9603R1ZM' },
        { id: '2', name: 'XYZ Traders', mobile: '8765432109', gstNumber: '27AABCU9603R1ZN' },
        { id: '3', name: 'PQR Distributors', mobile: '7654321098', gstNumber: '27AABCU9603R1ZO' },
    ]);

    // Items State
    const [items, setItems] = useState([]);

    // Summary State
    const [discountType, setDiscountType] = useState('percentage');
    const [discountValue, setDiscountValue] = useState('');

    // Split Payment State
    const [showSplitBill, setShowSplitBill] = useState(false);
    const [cashAmount, setCashAmount] = useState(0);
    const [onlineAmount, setOnlineAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Google Pay');

    // Load purchase data (dummy data - replace with actual API call)
    useEffect(() => {
        // Simulate loading purchase data
        const dummyPurchase = {
            id: id,
            date: '2025-11-28',
            supplierId: '1',
            referenceNumber: 'INV-12345',
            items: [
                { id: 1, name: 'Rice 25kg', quantity: '10', rate: '1500', taxRate: '5', taxAmount: 750, totalAmount: 15750 },
                { id: 2, name: 'Wheat 25kg', quantity: '5', rate: '1200', taxRate: '5', taxAmount: 300, totalAmount: 6300 },
            ],
            discountType: 'fixed',
            discountValue: '500',
            paymentDetails: {
                type: 'Split',
                cash: 10000,
                online: 11550,
                onlineMethod: 'Google Pay'
            }
        };

        setPurchaseDate(dummyPurchase.date);
        setSelectedSupplierId(dummyPurchase.supplierId);
        setReferenceNumber(dummyPurchase.referenceNumber);
        setItems(dummyPurchase.items);
        setDiscountType(dummyPurchase.discountType);
        setDiscountValue(dummyPurchase.discountValue);

        if (dummyPurchase.paymentDetails.type === 'Split') {
            setShowSplitBill(true);
            setCashAmount(dummyPurchase.paymentDetails.cash);
            setOnlineAmount(dummyPurchase.paymentDetails.online);
            setPaymentMethod(dummyPurchase.paymentDetails.onlineMethod);
        }
    }, [id]);

    // Calculate item totals
    const calculateItemTotals = (item) => {
        const qty = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        const amount = qty * rate;
        const taxRate = getTaxRate(item.taxRate);
        const taxAmount = calculateTaxAmount(amount, taxRate);
        const totalAmount = amount + taxAmount;

        return {
            ...item,
            taxAmount: taxAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        };
    };

    // Handle item change
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };

        // Recalculate totals
        newItems[index] = calculateItemTotals(newItems[index]);
        setItems(newItems);
    };

    // Add new item row
    const handleAddItem = () => {
        setItems([...items, {
            id: items.length + 1,
            name: '',
            quantity: '',
            rate: '',
            taxRate: '0',
            taxAmount: 0,
            totalAmount: 0
        }]);
    };

    // Remove item row
    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    // Calculate summary
    const subtotal = items.reduce((sum, item) => {
        const qty = parseFloat(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        return sum + (qty * rate);
    }, 0);

    const discountAmount = discountType === 'percentage'
        ? (subtotal * (parseFloat(discountValue) || 0)) / 100
        : parseFloat(discountValue) || 0;

    const taxAmount = items.reduce((sum, item) => sum + (parseFloat(item.taxAmount) || 0), 0);

    const netTotal = subtotal - discountAmount + taxAmount;

    // Initialize/Update split amounts when total changes
    React.useEffect(() => {
        if (!showSplitBill) {
            setCashAmount(netTotal);
            setOnlineAmount(0);
        } else {
            const currentOnline = Number(onlineAmount) || 0;
            if (currentOnline > netTotal) {
                setOnlineAmount(netTotal);
                setCashAmount(0);
            } else {
                setCashAmount(netTotal - currentOnline);
            }
        }
    }, [netTotal, showSplitBill]);

    const handleCashChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setCashAmount('');
            setOnlineAmount(netTotal);
            return;
        }
        const val = parseFloat(inputValue);
        if (!isNaN(val) && val >= 0 && val <= netTotal) {
            setCashAmount(val);
            setOnlineAmount(netTotal - val);
        }
    };

    const handleOnlineChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setOnlineAmount('');
            setCashAmount(netTotal);
            return;
        }
        const val = parseFloat(inputValue);
        if (!isNaN(val) && val >= 0 && val <= netTotal) {
            setOnlineAmount(val);
            setCashAmount(netTotal - val);
        }
    };

    // Handle update
    const handleUpdate = () => {
        if (!selectedSupplierId) {
            showToast.error('Please select a supplier');
            return;
        }

        if (items.length === 0 || !items[0].name) {
            showToast.error('Please add at least one item');
            return;
        }

        const purchaseData = {
            id,
            date: purchaseDate,
            supplierId: selectedSupplierId,
            referenceNumber,
            items: items.filter(item => item.name),
            subtotal,
            discount: discountAmount,
            taxAmount,
            netTotal,
            paymentDetails: showSplitBill ? {
                type: 'Split',
                cash: Number(cashAmount) || 0,
                online: Number(onlineAmount) || 0,
                onlineMethod: paymentMethod
            } : {
                type: 'Full',
                amount: netTotal
            },
            status: 'draft'
        };

        console.log('Updating purchase:', purchaseData);
        showToast.success('Purchase updated successfully!');
        navigate('/purchase');
    };

    // Handle update and complete
    const handleUpdateAndComplete = () => {
        if (!selectedSupplierId) {
            showToast.error('Please select a supplier');
            return;
        }

        if (items.length === 0 || !items[0].name) {
            showToast.error('Please add at least one item');
            return;
        }

        const purchaseData = {
            id,
            date: purchaseDate,
            supplierId: selectedSupplierId,
            referenceNumber,
            items: items.filter(item => item.name),
            subtotal,
            discount: discountAmount,
            taxAmount,
            netTotal,
            paymentDetails: showSplitBill ? {
                type: 'Split',
                cash: Number(cashAmount) || 0,
                online: Number(onlineAmount) || 0,
                onlineMethod: paymentMethod
            } : {
                type: 'Full',
                amount: netTotal
            },
            status: 'completed'
        };

        console.log('Completing purchase:', purchaseData);
        showToast.success('Purchase completed successfully!');
        navigate('/purchase');
    };

    const selectedSupplier = suppliers.find(s => s.id === selectedSupplierId);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Edit Purchase #{id}</h1>
                    <p className="text-gray-600 dark:text-gray-400">Update purchase details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bill Information Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Bill Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={purchaseDate}
                                        onChange={(e) => setPurchaseDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Reference Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Invoice/Reference Number
                                    </label>
                                    <input
                                        type="text"
                                        value={referenceNumber}
                                        onChange={(e) => setReferenceNumber(e.target.value)}
                                        placeholder="Enter reference number"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Supplier Selection */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Supplier <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <UniversalSelect
                                                value={selectedSupplierId}
                                                onChange={(e) => setSelectedSupplierId(e.target.value)}
                                                options={suppliers.map(s => ({ value: s.id, label: s.name }))}
                                                placeholder="Select supplier"
                                            />
                                        </div>
                                        <UniversalButton
                                            color="blue"
                                            variant="outlined"
                                            icon={<HiUserAdd className="w-4 h-4" />}
                                            iconOnly
                                            onClick={() => setShowSupplierModal(true)}
                                            title="Add New Supplier"
                                        />
                                    </div>

                                    {/* Supplier Details Display */}
                                    {selectedSupplier && (
                                        <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 rounded p-2 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-600 dark:text-gray-400">Mobile:</span>
                                                <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedSupplier.mobile}</span>
                                            </div>
                                            {selectedSupplier.gstNumber && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">GST:</span>
                                                    <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedSupplier.gstNumber}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Items Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Items</h2>
                                <UniversalButton
                                    color="blue"
                                    size="sm"
                                    icon={<HiPlus className="w-4 h-4" />}
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </UniversalButton>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Item Name</th>
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Qty</th>
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Rate</th>
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Tax</th>
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Tax Amt</th>
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Total</th>
                                            <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700">
                                                <td className="py-2 px-2">
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                                        placeholder="Item name"
                                                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                    />
                                                </td>
                                                <td className="py-2 px-2">
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                                        placeholder="0"
                                                        className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </td>
                                                <td className="py-2 px-2">
                                                    <input
                                                        type="number"
                                                        value={item.rate}
                                                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                                        placeholder="0.00"
                                                        className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </td>
                                                <td className="py-2 px-2">
                                                    <select
                                                        value={item.taxRate}
                                                        onChange={(e) => handleItemChange(index, 'taxRate', e.target.value)}
                                                        className="w-28 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                                    >
                                                        {TAX_RATES.map(tax => (
                                                            <option key={tax.value} value={tax.value}>{tax.label}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="py-2 px-2 text-sm text-gray-700 dark:text-gray-300">
                                                    ₹{item.taxAmount}
                                                </td>
                                                <td className="py-2 px-2 text-sm font-semibold text-gray-800 dark:text-white">
                                                    ₹{item.totalAmount}
                                                </td>
                                                <td className="py-2 px-2">
                                                    {items.length > 1 && (
                                                        <button
                                                            onClick={() => handleRemoveItem(index)}
                                                            className="text-red-500 hover:text-red-700 p-1"
                                                        >
                                                            <HiX className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>

                            <div className="space-y-3">
                                {/* Subtotal */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="font-medium text-gray-800 dark:text-white">₹{subtotal.toFixed(2)}</span>
                                </div>

                                {/* Discount */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Discount
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <select
                                            value={discountType}
                                            onChange={(e) => setDiscountType(e.target.value)}
                                            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="percentage">%</option>
                                            <option value="fixed">₹</option>
                                        </select>
                                        <input
                                            type="number"
                                            value={discountValue}
                                            onChange={(e) => setDiscountValue(e.target.value)}
                                            placeholder="0"
                                            className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Discount Amount</span>
                                        <span className="font-medium text-red-600 dark:text-red-400">-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Tax Amount */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Tax Amount</span>
                                    <span className="font-medium text-gray-800 dark:text-white">₹{taxAmount.toFixed(2)}</span>
                                </div>

                                {/* Split Payment Section */}
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <button
                                        onClick={() => setShowSplitBill(!showSplitBill)}
                                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mb-2"
                                    >
                                        <HiUserGroup className="w-4 h-4" />
                                        {showSplitBill ? 'Hide' : 'Show'} Split Payment
                                    </button>

                                    {showSplitBill && (
                                        <div className="space-y-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Cash</label>
                                                    <input
                                                        type="number"
                                                        value={cashAmount}
                                                        onChange={handleCashChange}
                                                        className="w-full px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none no-spinner"
                                                        placeholder="0"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Online</label>
                                                    <input
                                                        type="number"
                                                        value={onlineAmount}
                                                        onChange={handleOnlineChange}
                                                        className="w-full px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none no-spinner"
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </div>

                                            {onlineAmount > 0 && (
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Method</label>
                                                    <select
                                                        value={paymentMethod}
                                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                                        className="w-full px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                                    >
                                                        <option value="Google Pay">Google Pay</option>
                                                        <option value="PhonePe">PhonePe</option>
                                                        <option value="Paytm">Paytm</option>
                                                        <option value="Card">Card</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Net Total */}
                                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <span>Net Total</span>
                                    <span className="text-green-600 dark:text-green-400">₹{netTotal.toFixed(2)}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 pt-3">
                                    <UniversalButton
                                        color="blue"
                                        className="w-full"
                                        onClick={handleUpdate}
                                        icon={<HiSave className="w-4 h-4" />}
                                    >
                                        Update
                                    </UniversalButton>
                                    <UniversalButton
                                        color="green"
                                        className="w-full"
                                        onClick={handleUpdateAndComplete}
                                        icon={<HiCheckCircle className="w-4 h-4" />}
                                    >
                                        Update & Complete
                                    </UniversalButton>
                                    <UniversalButton
                                        color="gray"
                                        variant="outlined"
                                        className="w-full"
                                        onClick={() => navigate('/purchase')}
                                    >
                                        Cancel
                                    </UniversalButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Supplier Create Modal */}
            <SupplierCreateModal
                isOpen={showSupplierModal}
                onClose={() => setShowSupplierModal(false)}
                onSuccess={(newSupplier) => {
                    setSuppliers([...suppliers, newSupplier]);
                    setSelectedSupplierId(newSupplier.id);
                    setShowSupplierModal(false);
                    showToast.success('Supplier added successfully!');
                }}
            />
        </div>
    );
};

export default PurchaseEdit;
