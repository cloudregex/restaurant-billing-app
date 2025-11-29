import React, { useState } from 'react';
import { HiArrowLeft, HiX, HiUserAdd, HiUserGroup, HiSave, HiCheckCircle, HiSearch } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import UniversalButton from '../../components/UniversalButton';
import UniversalSelect from '../../components/UniversalSelect';
import UniversalInput from '../../components/UniversalInput';
import PrintBillModal from '../../components/PrintBillModal';
import CustomerCreateModal from '../customer/CustomerCreateModal';
import showToast from '../../utils/toast';

const BillingCreate = () => {
    const navigate = useNavigate();
    const { tableNumber } = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [billItems, setBillItems] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState('walk-in');
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showSplitBill, setShowSplitBill] = useState(false);
    const [cashAmount, setCashAmount] = useState(0);
    const [onlineAmount, setOnlineAmount] = useState(0);
    const [productSearchTerm, setProductSearchTerm] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Google Pay');
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [billSearchTerm, setBillSearchTerm] = useState('');

    // Dummy customer data
    const customers = [
        { id: 'walk-in', name: 'Walk-in', mobile: '', address: '' },
        { id: '1', name: 'Rajesh Kumar', mobile: '9876543210', address: '123, MG Road, Pune' },
        { id: '2', name: 'Priya Sharma', mobile: '8765432109', address: '45, FC Road, Pune' },
        { id: '3', name: 'Amit Patel', mobile: '7654321098', address: '88, Shivaji Nagar, Pune' },
    ];

    // Dummy table data
    const tables = [
        { id: 'T1', name: 'Table 1', status: 'Available' },
        { id: 'T2', name: 'Table 2', status: 'Occupied' },
        { id: 'T3', name: 'Table 3', status: 'Reserved' },
        { id: 'T4', name: 'Table 4', status: 'Available' },
        { id: 'T5', name: 'Table 5', status: 'Occupied' },
    ];

    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

    // Simulate loading
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [tableNumber]);

    const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

    const products = [
        { id: 1, name: 'Paneer Tikka', marathiName: 'पनीर टिक्का', category: 'Starters', price: 200, image: '' },
        { id: 2, name: 'Butter Chicken', marathiName: 'बटर चिकन', category: 'Main Course', price: 350, image: '' },
        { id: 3, name: 'Gulab Jamun', marathiName: 'गुलाब जामुन', category: 'Desserts', price: 80, image: '' },
        { id: 4, name: 'Cold Coffee', marathiName: 'कोल्ड कॉफी', category: 'Beverages', price: 100, image: '' },
        { id: 5, name: 'Veg Biryani', marathiName: 'वेज बिर्याणी', category: 'Main Course', price: 250, image: '' },
        { id: 6, name: 'Masala Dosa', marathiName: 'मसाला डोसा', category: 'Main Course', price: 120, image: '' },
        { id: 7, name: 'Samosa', marathiName: 'समोसा', category: 'Starters', price: 40, image: '' },
        { id: 8, name: 'Dal Tadka', marathiName: 'डाळ तडका', category: 'Main Course', price: 180, image: '' },
    ];

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
            p.marathiName.toLowerCase().includes(productSearchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToBill = (product) => {
        const existingItem = billItems.find(item => item.id === product.id);
        if (existingItem) {
            setBillItems(billItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setBillItems([...billItems, { ...product, quantity: 1 }]);
        }
    };

    const handleRemoveFromBill = (productId) => {
        setBillItems(billItems.filter(item => item.id !== productId));
    };

    const handleQuantityChange = (productId, change) => {
        setBillItems(billItems.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    // Initialize/Update split amounts when total changes
    React.useEffect(() => {
        if (!showSplitBill) {
            setCashAmount(total);
            setOnlineAmount(0);
        } else {
            // If split is active and total changes (e.g. item added), 
            // adjust Cash to absorb the difference, keeping Online constant (unless > total)
            const currentOnline = Number(onlineAmount) || 0;
            if (currentOnline > total) {
                setOnlineAmount(total);
                setCashAmount(0);
            } else {
                setCashAmount(total - currentOnline);
            }
        }
    }, [total, showSplitBill]);

    const handleCashChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue === '') {
            setCashAmount('');
            setOnlineAmount(total);
            return;
        }

        const val = parseFloat(inputValue);
        if (!isNaN(val) && val >= 0 && val <= total) {
            setCashAmount(val);
            setOnlineAmount(total - val);
        }
    };

    const handleOnlineChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue === '') {
            setOnlineAmount('');
            setCashAmount(total);
            return;
        }

        const val = parseFloat(inputValue);
        if (!isNaN(val) && val >= 0 && val <= total) {
            setOnlineAmount(val);
            setCashAmount(total - val);
        }
    };

    const handleSave = () => {
        console.log('Saving bill:', {
            tableNumber,
            customer: selectedCustomer,
            billItems,
            subtotal,
            tax,
            total,
            paymentDetails: showSplitBill ? {
                type: 'Split',
                cash: Number(cashAmount) || 0,
                online: Number(onlineAmount) || 0,
                onlineMethod: paymentMethod
            } : {
                type: 'Full', // Assuming full cash or online based on other logic, but for now defaulting to total
                amount: total
            }
        });
        showToast.success('Bill saved successfully!');
        navigate('/billing/table-select');
    };

    const handleSaveAndComplete = () => {
        console.log('Saving and completing bill:', {
            tableNumber,
            customer: selectedCustomer,
            billItems,
            subtotal,
            tax,
            total,
            paymentDetails: showSplitBill ? {
                type: 'Split',
                cash: Number(cashAmount) || 0,
                online: Number(onlineAmount) || 0,
                onlineMethod: paymentMethod
            } : {
                type: 'Full',
                amount: total
            }
        });
        setShowPrintModal(true);
    };

    const handleClosePrintModal = () => {
        setShowPrintModal(false);
        showToast.success('Bill completed successfully!');
        navigate('/billing/table-select');
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-40px)] bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
                {/* Left: Categories Skeleton */}
                <div className="w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-10 shadow-lg">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
                        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Middle: Products Skeleton */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-4 flex justify-between">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-48 animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Right: Bill Skeleton */}
                <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="flex-1 p-3">
                        <div className="h-full bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-40px)] bg-gray-50 dark:bg-gray-900 flex">
            {/* Left: Categories */}
            <div className="w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-10 shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 relative">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <UniversalButton
                                onClick={() => navigate('/billing/table-select')}
                                color="gray"
                                variant="ghost"
                                icon={<HiArrowLeft className="w-5 h-5" />}
                                size="sm"
                                className="!p-2 hover:bg-white/50 dark:hover:bg-black/20 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-sm"
                                title="Back to Tables"
                            />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Billing</span>
                        </div>

                        <div className="space-y-3">
                            {/* Active Table Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-b border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Active Table</span>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <UniversalSelect
                                        value={tableNumber}
                                        onChange={(e) => navigate(`/billing/create/${e.target.value}`)}
                                        options={tables.map(t => {
                                            const statusIcon = t.status === 'Available' ? '🟢' : t.status === 'Occupied' ? '🔴' : '🟡';
                                            return {
                                                value: t.id,
                                                label: `${t.name} ${statusIcon}`
                                            };
                                        })}
                                        placeholder="Select Table"
                                        className="z-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar z-0">
                    <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu Categories</p>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${selectedCategory === category
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md transform scale-[1.02]'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <span className={`font-medium ${selectedCategory === category ? 'text-white' : ''}`}>
                                    {category}
                                </span>
                                {selectedCategory === category && (
                                    <div className="h-2 w-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Middle: Products */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            {selectedCategory}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">Click on items to add to bill</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className="w-64">
                            <UniversalInput
                                value={productSearchTerm}
                                onChange={(e) => setProductSearchTerm(e.target.value)}
                                placeholder="Search products..."
                                leftIcon={<HiSearch className="w-5 h-5 text-gray-400" />}
                                className="mb-0"
                            />
                        </div>
                        <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 whitespace-nowrap">
                            <span className="text-sm text-blue-800 dark:text-blue-300 font-medium">Current Bill: </span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{tableNumber}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                        <div
                            key={product.id}
                            onClick={() => handleAddToBill(product)}
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
                        >
                            <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-5xl">🍽️</span>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="font-bold text-gray-800 dark:text-white text-sm mb-1">{product.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.marathiName}</p>
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Bill */}
            <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    {/* Customer Selection */}
                    <div className="space-y-2 mb-1">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <UniversalSelect
                                    value={selectedCustomerId}
                                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                                    options={customers.map(c => ({ value: c.id, label: c.name }))}
                                    className="mb-0"
                                    size="sm"
                                />
                            </div>
                            <UniversalButton
                                color="blue"
                                variant="outlined"
                                icon={<HiUserAdd className="w-4 h-4" />}
                                iconOnly
                                onClick={() => setShowCustomerModal(true)}
                                title="Add New Customer"
                                size="sm"
                            />
                        </div>

                        {/* Customer Details Display */}
                        {selectedCustomer && selectedCustomer.id !== 'walk-in' && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-2 space-y-1">
                                {selectedCustomer.mobile && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-600 dark:text-gray-400">Mobile:</span>
                                        <span className="text-xs font-medium text-gray-800 dark:text-white">{selectedCustomer.mobile}</span>
                                    </div>
                                )}
                                {selectedCustomer.address && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-[10px] text-gray-600 dark:text-gray-400">Address:</span>
                                        <span className="text-xs font-medium text-gray-800 dark:text-white">{selectedCustomer.address}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center gap-2 py-1">
                        <h2 className="text-base font-bold text-gray-800 dark:text-white whitespace-nowrap flex items-center">Current Bill :- {tableNumber}</h2>
                        <div className="w-32 relative">
                            <input
                                type="text"
                                value={billSearchTerm}
                                onChange={(e) => setBillSearchTerm(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-7 pr-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-7"
                            />
                            <HiSearch className="w-3 h-3 text-gray-400 absolute left-2 top-2" />
                        </div>
                    </div>
                </div>



                <div className="flex-1 overflow-y-auto p-3">
                    {billItems.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                            <p className="text-3xl mb-2">🛒</p>
                            <p className="text-sm">No items added</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {billItems.filter(item => item.name.toLowerCase().includes(billSearchTerm.toLowerCase())).map(item => (
                                <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 dark:text-white text-sm">{item.name}</h4>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">₹{item.price} each</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFromBill(item.id)}
                                            className="text-red-500 hover:text-red-700 p-0.5"
                                        >
                                            <HiX className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 font-bold flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-bold text-gray-800 dark:text-white text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 font-bold flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="font-bold text-gray-800 dark:text-white text-sm">₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>Tax (5%)</span>
                        <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>

                    {/* Split Bill Section - Moved Above Total */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                        <button
                            onClick={() => setShowSplitBill(!showSplitBill)}
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium mb-1"
                        >
                            <HiUserGroup className="w-3 h-3" />
                            {showSplitBill ? 'Hide' : 'Show'} Split Payment
                        </button>

                        {showSplitBill && (
                            <div className="space-y-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg mb-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400">Cash</label>
                                        <input
                                            type="number"
                                            value={cashAmount}
                                            onChange={handleCashChange}
                                            className="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none no-spinner"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400">Online</label>
                                        <input
                                            type="number"
                                            value={onlineAmount}
                                            onChange={handleOnlineChange}
                                            className="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none no-spinner"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                {onlineAmount > 0 && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-medium text-gray-600 dark:text-gray-400">Method</label>
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-full px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
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

                    <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
                        <span>Total</span>
                        <span className="text-green-600 dark:text-green-400">₹{total.toFixed(2)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                        <UniversalButton
                            color="blue"
                            className="flex-1"
                            disabled={billItems.length === 0}
                            onClick={handleSave}
                            icon={<HiSave className="w-4 h-4" />}
                            size="sm"
                        >
                            Save
                        </UniversalButton>
                        <UniversalButton
                            color="green"
                            className="flex-1"
                            disabled={billItems.length === 0}
                            onClick={handleSaveAndComplete}
                            icon={<HiCheckCircle className="w-4 h-4" />}
                            size="sm"
                        >
                            Complete
                        </UniversalButton>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CustomerCreateModal
                isOpen={showCustomerModal}
                onClose={() => setShowCustomerModal(false)}
                onSuccess={(newCustomer) => {
                    // In a real app, you'd add the new customer to the list and select them
                    console.log('New customer created:', newCustomer);
                    setShowCustomerModal(false);
                    showToast.success('Customer created successfully!');
                }}
            />

            <PrintBillModal
                isOpen={showPrintModal}
                onClose={handleClosePrintModal}
                billData={{
                    tableNumber,
                    customer: selectedCustomer,
                    items: billItems,
                    subtotal,
                    tax,
                    total,
                    date: new Date().toLocaleString(),
                    paymentDetails: showSplitBill ? {
                        type: 'Split',
                        cash: Number(cashAmount) || 0,
                        online: Number(onlineAmount) || 0,
                        onlineMethod: paymentMethod
                    } : {
                        type: 'Full',
                        amount: total
                    }
                }}
            />
        </div>
    );
};

export default BillingCreate;
