import React from 'react';
import { HiX, HiPrinter } from 'react-icons/hi';
import QRCode from 'react-qr-code';
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

    // Sample UPI String - Replace with actual UPI ID
    const upiId = "example@upi";
    const payeeName = "Shivaji Restaurant";
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${total}&cu=INR`;

    return (
        <>
            {/* Print Styles */}
            <style>{`
                /* Thermal Printer Styles */
                #bill-print-area {
                    width: 80mm;
                    margin: 0 auto;
                    background: white;
                    padding: 5mm;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 12px;
                    color: black;
                }

                #bill-print-area h1 {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }

                #bill-print-area p, 
                #bill-print-area span, 
                #bill-print-area div {
                    font-size: 12px;
                    line-height: 1.2;
                }

                #bill-print-area table {
                    width: 100%;
                    border-collapse: collapse;
                }

                #bill-print-area th,
                #bill-print-area td {
                    padding: 2px 0;
                    text-align: left;
                    font-size: 12px;
                }

                #bill-print-area .text-right {
                    text-align: right;
                }

                #bill-print-area .text-center {
                    text-align: center;
                }

                #bill-print-area .border-b {
                    border-bottom: 1px dashed black;
                }

                @media print {
                    @page {
                        margin: 0;
                        size: 80mm auto;
                    }
                    
                    body * {
                        visibility: hidden;
                    }
                    
                    #bill-print-area, #bill-print-area * {
                        visibility: visible;
                    }
                    
                    #bill-print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 80mm !important;
                        margin: 0 !important;
                        padding: 2mm !important;
                    }
                }
            `}</style>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 no-print">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10 no-print">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Bill Preview</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <HiX className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Bill Content - Visible on screen and print */}
                    <div className="p-4 bg-gray-100 dark:bg-gray-900 flex justify-center">
                        <div id="bill-print-area" className="bg-white shadow-lg">
                            {/* Restaurant Header */}
                            <div className="text-center mb-2 border-b pb-2">
                                <h1 className="uppercase">Shivaji Restaurant</h1>
                                <p>Address Line 1, City</p>
                                <p>Ph: +91 1234567890</p>
                            </div>

                            {/* Bill Details */}
                            <div className="mb-2 border-b pb-2">
                                <div className="flex justify-between">
                                    <span>Bill No: {billNumber}</span>
                                    <span>{date}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Table: {tableNumber}</span>
                                    <span>{time}</span>
                                </div>
                                <div>
                                    <span>Cust: {customerName}</span>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="mb-2 border-b pb-2">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="w-[40%]">Item</th>
                                            <th className="w-[20%] text-center">Qty</th>
                                            <th className="w-[20%] text-right">Rate</th>
                                            <th className="w-[20%] text-right">Amt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {item.name}
                                                    {item.marathiName && <div className="text-[10px]">{item.marathiName}</div>}
                                                </td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-right">{item.price}</td>
                                                <td className="text-right">{(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Totals */}
                            <div className="mb-2 border-b pb-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (5%):</span>
                                    <span>{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-[14px] mt-1">
                                    <span>Total:</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* QR Code */}
                            <div className="text-center mb-2 flex flex-col items-center justify-center">
                                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={upiString}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <p className="mt-1 text-[10px]">Scan to Pay</p>
                            </div>

                            {/* Footer */}
                            <div className="text-center">
                                <p>Thank you!</p>
                                <p>Visit Again</p>
                            </div>
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
