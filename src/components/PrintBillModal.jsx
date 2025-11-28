import React from 'react';
import { HiX, HiPrinter } from 'react-icons/hi';
import UniversalButton from './UniversalButton';

const PrintBillModal = ({ isOpen, onClose, billData }) => {
    if (!isOpen) return null;

    const {
        tableNumber,
        customerName,
        customerMobile,
        customerAddress,
        billItems = [],
        subtotal = 0,
        tax = 0,
        total = 0,
        billNumber = 'BILL-001',
        date = new Date().toLocaleDateString(),
        time = new Date().toLocaleTimeString()
    } = billData || {};

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* Print Styles */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #bill-print-area,
                    #bill-print-area * {
                        visibility: visible;
                    }
                    #bill-print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 no-print">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bill Preview</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <HiX className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Bill Content - This will be printed */}
                    <div className="p-6" id="bill-print-area">
                        {/* Restaurant Header */}
                        <div className="text-center mb-6 border-b-2 border-gray-300 dark:border-gray-600 pb-4">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Restaurant Name</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Address Line 1, City, State - 123456</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Phone: +91 1234567890 | Email: info@restaurant.com</p>
                        </div>

                        {/* Bill Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Bill No:</p>
                                <p className="font-bold text-gray-800 dark:text-white">{billNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time:</p>
                                <p className="font-bold text-gray-800 dark:text-white">{date} {time}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Table:</p>
                                <p className="font-bold text-gray-800 dark:text-white">{tableNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Customer:</p>
                                <p className="font-bold text-gray-800 dark:text-white">{customerName}</p>
                                {customerMobile && <p className="text-sm text-gray-600 dark:text-gray-400">{customerMobile}</p>}
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-6">
                            <table className="w-full">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">#</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Item</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Qty</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Price</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {billItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800 dark:text-white">
                                                {item.name}
                                                {item.marathiName && <p className="text-xs text-gray-500 dark:text-gray-400">{item.marathiName}</p>}
                                            </td>
                                            <td className="px-4 py-3 text-center text-sm text-gray-800 dark:text-white">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right text-sm text-gray-800 dark:text-white">₹{item.price}</td>
                                            <td className="px-4 py-3 text-right text-sm font-medium text-gray-800 dark:text-white">₹{item.price * item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
                            <div className="flex justify-end mb-2">
                                <div className="w-64">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
                                        <span>Subtotal:</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
                                        <span>Tax (5%):</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white border-t-2 border-gray-300 dark:border-gray-600 pt-2">
                                        <span>Total:</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Thank you for dining with us!</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Please visit again</p>
                        </div>
                    </div>

                    {/* Action Buttons - Hidden during print */}
                    <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 no-print">
                        <UniversalButton
                            color="gray"
                            variant="outlined"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Close
                        </UniversalButton>
                        <UniversalButton
                            color="blue"
                            className="flex-1"
                            icon={<HiPrinter className="w-5 h-5" />}
                            onClick={handlePrint}
                        >
                            Print Bill
                        </UniversalButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintBillModal;
