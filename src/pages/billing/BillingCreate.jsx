import React, { useState } from 'react';
import { HiArrowLeft, HiX, HiUserAdd, HiUserGroup, HiSave, HiCheckCircle } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import UniversalButton from '../../components/UniversalButton';
import UniversalSelect from '../../components/UniversalSelect';
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
    const [splitCount, setSplitCount] = useState(2);
    const [showPrintModal, setShowPrintModal] = useState(false);

    // Dummy customer data
    const customers = [
        { id: 'walk-in', name: 'Walk-in', mobile: '', address: '' },
        { id: '1', name: 'Rajesh Kumar', mobile: '9876543210', address: '123, MG Road, Pune' },
        { id: '2', name: 'Priya Sharma', mobile: '8765432109', address: '45, FC Road, Pune' },
        { id: '3', name: 'Amit Patel', mobile: '7654321098', address: '88, Shivaji Nagar, Pune' },
    ];

    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

    // Simulate loading
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

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

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

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
    const splitAmount = total / splitCount;

    const handleSave = () => {
        console.log('Saving bill:', {
            tableNumber,
            customer: selectedCustomer,
            billItems,
            subtotal,
            tax,
            total
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
            total
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
                <div className="w-48 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>
                        <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 animate-pulse"></div>
                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Middle: Products Skeleton */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="mb-4">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                                <div className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                                <div className="p-3">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Bill Skeleton */}
                <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>

                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="text-center mt-8">
                            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-2 animate-pulse"></div>
                            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2 animate-pulse"></div>
                            <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                        <div className="flex justify-between">
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-40px)] bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
            {/* Left: Categories */}
            <div className="w-48 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <UniversalButton
                        onClick={() => navigate('/billing/table-select')}
                        color="gray"
                        variant="outlined"
                        icon={<HiArrowLeft />}
                        size="sm"
                        className="w-full mb-2"
                    >
                        Back
                    </UniversalButton>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">Table</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{tableNumber}</p>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors font-medium ${selectedCategory === category
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Middle: Products */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {selectedCategory}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">Click on items to add to bill</p>
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
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Current Bill :- {tableNumber}</h2>

                    {/* Customer Selection */}
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <UniversalSelect
                                    value={selectedCustomerId}
                                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                                    options={customers.map(c => ({ value: c.id, label: c.name }))}
                                    className="mb-0"
                                />
                            </div>
                            <UniversalButton
                                color="blue"
                                variant="outlined"
                                icon={<HiUserAdd className="w-5 h-5" />}
                                iconOnly
                                onClick={() => setShowCustomerModal(true)}
                                title="Add New Customer"
                            />
                        </div>

                        {/* Customer Details Display */}
                        {selectedCustomer && selectedCustomer.id !== 'walk-in' && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 space-y-2">
                                {selectedCustomer.mobile && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Mobile:</span>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedCustomer.mobile}</span>
                                    </div>
                                )}
                                {selectedCustomer.address && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">Address:</span>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedCustomer.address}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {billItems.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                            <p className="text-4xl mb-2">🛒</p>
                            <p>No items added</p>
                            <p className="text-sm">Click on items to add</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {billItems.map(item => (
                                <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 dark:text-white text-sm">{item.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">₹{item.price} each</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFromBill(item.id)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <HiX className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center font-bold text-gray-800 dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="font-bold text-gray-800 dark:text-white">₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Tax (5%)</span>
                        <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3">
                        <span>Total</span>
                        <span className="text-green-600 dark:text-green-400">₹{total.toFixed(2)}</span>
                    </div>

                    {/* Split Bill Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                        <button
                            onClick={() => setShowSplitBill(!showSplitBill)}
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mb-2"
                        >
                            <HiUserGroup className="w-4 h-4" />
                            {showSplitBill ? 'Hide' : 'Show'} Split Bill
                        </button>

                        {showSplitBill && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Split between:</span>
                                    <div className="flex items-center gap-2">
                                        {[2, 3, 4, 5].map(num => (
                                            <button
                                                key={num}
                                                onClick={() => setSplitCount(num)}
                                                className={`w-8 h-8 rounded-lg font-bold transition-colors ${splitCount === num
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                                    }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    {Array.from({ length: splitCount }).map((_, index) => (
                                        <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Person {index + 1}</p>
                                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{splitAmount.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                        <UniversalButton
                            color="blue"
                            className="flex-1"
                            disabled={billItems.length === 0}
                            onClick={handleSave}
                            icon={<HiSave className="w-5 h-5" />}
                        >
                            Save
                        </UniversalButton>
                        <UniversalButton
                            color="green"
                            className="flex-1"
                            disabled={billItems.length === 0}
                            onClick={handleSaveAndComplete}
                            icon={<HiCheckCircle className="w-5 h-5" />}
                        >
                            Save & Complete
                        </UniversalButton>
                    </div>
                </div>
            </div>

            {/* Customer Create Modal */}
            <CustomerCreateModal
                isOpen={showCustomerModal}
                onClose={() => setShowCustomerModal(false)}
            />

            {/* Print Bill Modal */}
            <PrintBillModal
                isOpen={showPrintModal}
                onClose={handleClosePrintModal}
                billData={{
                    tableNumber,
                    customerName: selectedCustomer?.name || 'Walk-in',
                    customerMobile: selectedCustomer?.mobile || '',
                    customerAddress: selectedCustomer?.address || '',
                    billItems,
                    subtotal,
                    tax,
                    total,
                    billNumber: `BILL-${Date.now()}`,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString()
                }}
            />
        </div>
    );
};

export default BillingCreate;
