import React, { useState, useEffect } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import UniversalButton from '../../components/UniversalButton';

const TableSelect = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const tables = [
        { id: 1, number: 'T-01', capacity: 4, status: 'Occupied', currentBill: 850 },
        { id: 2, number: 'T-02', capacity: 2, status: 'Available', currentBill: 0 },
        { id: 3, number: 'T-03', capacity: 6, status: 'Occupied', currentBill: 1200 },
        { id: 4, number: 'T-04', capacity: 4, status: 'Available', currentBill: 0 },
        { id: 5, number: 'T-05', capacity: 8, status: 'Occupied', currentBill: 650 },
        { id: 6, number: 'T-06', capacity: 2, status: 'Available', currentBill: 0 },
        { id: 7, number: 'T-07', capacity: 4, status: 'Reserved', currentBill: 0 },
        { id: 8, number: 'T-08', capacity: 6, status: 'Available', currentBill: 0 },
    ];

    const handleTableSelect = (table) => {
        navigate(`/billing/create/${table.number}`);
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-40px)] bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400">Loading tables...</div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-40px)] bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <UniversalButton
                        onClick={() => navigate('/billing')}
                        color="gray"
                        variant="outlined"
                        icon={<HiArrowLeft />}
                        iconOnly
                    />
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Select Table</h1>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tables.map(table => (
                        <div
                            key={table.id}
                            onClick={() => handleTableSelect(table)}
                            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center border-4 ${table.status === 'Occupied'
                                    ? 'border-red-500 hover:border-red-600'
                                    : table.status === 'Reserved'
                                        ? 'border-yellow-500 hover:border-yellow-600'
                                        : 'border-green-500 hover:border-green-600'
                                }`}
                        >
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{table.number}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                                <span className="text-lg font-medium">{table.capacity}</span> Persons
                            </p>

                            {table.currentBill > 0 && (
                                <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Bill</p>
                                    <p className="text-xl font-bold text-red-600 dark:text-red-400">₹{table.currentBill}</p>
                                </div>
                            )}

                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${table.status === 'Available'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : table.status === 'Reserved'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                {table.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableSelect;
