import React, { useState, useEffect } from 'react';
import { HiArrowLeft, HiUserGroup, HiCurrencyRupee, HiCheckCircle, HiClock, HiBan } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import UniversalButton from '../../components/UniversalButton';

const TableSelect = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
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
        { id: 9, number: 'T-09', capacity: 4, status: 'Available', currentBill: 0 },
        { id: 10, number: 'T-10', capacity: 10, status: 'Reserved', currentBill: 0 },
    ];

    const handleTableSelect = (table) => {
        navigate(`/billing/create/${table.number}`);
    };

    // Stats Calculation
    const totalTables = tables.length;
    const occupied = tables.filter(t => t.status === 'Occupied').length;
    const available = tables.filter(t => t.status === 'Available').length;
    const reserved = tables.filter(t => t.status === 'Reserved').length;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div>
                                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Stats Skeleton */}
                        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[140px]">
                                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
                                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Grid Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-2xl p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700"
                            >
                                {/* Top stripe skeleton */}
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

                                <div className="flex justify-between items-start mb-4 mt-2">
                                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                </div>

                                <div className="space-y-3">
                                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-[58px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <UniversalButton
                            onClick={() => navigate('/billing')}
                            color="white"
                            className="shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:text-white"
                            icon={<HiArrowLeft className="w-5 h-5" />}
                            iconOnly
                        />
                        <div>
                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                Table Selection
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your restaurant seating</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <StatusBadge count={totalTables} label="Total" color="blue" icon={<HiUserGroup />} />
                        <StatusBadge count={available} label="Available" color="green" icon={<HiCheckCircle />} />
                        <StatusBadge count={occupied} label="Occupied" color="red" icon={<HiBan />} />
                        <StatusBadge count={reserved} label="Reserved" color="yellow" icon={<HiClock />} />
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {tables.map((table, index) => (
                        <div
                            key={table.id}
                            onClick={() => handleTableSelect(table)}
                            className={`
                                group relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all duration-300
                                bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700
                                hover:-translate-y-1 hover:shadow-2xl
                                ${table.status === 'Occupied'
                                    ? 'shadow-red-100 dark:shadow-red-900/20'
                                    : table.status === 'Reserved'
                                        ? 'shadow-yellow-100 dark:shadow-yellow-900/20'
                                        : 'shadow-green-100 dark:shadow-green-900/20'}
                            `}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Status Indicator Stripe */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 
                                ${table.status === 'Occupied' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                    table.status === 'Reserved' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                        'bg-gradient-to-r from-green-400 to-emerald-500'}
                            `} />

                            <div className="flex justify-between items-start mb-4 mt-2">
                                <div className="bg-gray-100 dark:bg-gray-700/50 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                                        {table.number.split('-')[1]}
                                    </span>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1
                                    ${table.status === 'Occupied' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                        table.status === 'Reserved' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}
                                `}>
                                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                                        ${table.status === 'Occupied' ? 'bg-red-500' :
                                            table.status === 'Reserved' ? 'bg-yellow-500' :
                                                'bg-green-500'}
                                    `}></span>
                                    {table.status}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                    <HiUserGroup className="w-4 h-4 mr-2" />
                                    <span>Capacity: <strong className="text-gray-700 dark:text-gray-200">{table.capacity}</strong></span>
                                </div>

                                {table.currentBill > 0 ? (
                                    <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-2.5 border border-red-100 dark:border-red-900/30">
                                        <div className="flex items-center justify-between text-red-600 dark:text-red-400">
                                            <span className="text-xs font-medium uppercase tracking-wider">Current Bill</span>
                                            <HiCurrencyRupee className="w-4 h-4" />
                                        </div>
                                        <div className="text-lg font-bold text-red-700 dark:text-red-300 mt-0.5">
                                            ₹{table.currentBill}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[58px] flex items-center justify-center text-gray-300 dark:text-gray-600 text-sm border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-lg">
                                        No Active Bill
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ count, label, color, icon }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
        yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    };

    return (
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-[140px]">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                {React.cloneElement(icon, { className: "w-5 h-5" })}
            </div>
            <div>
                <div className="text-xl font-bold text-gray-800 dark:text-white leading-none">{count}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
            </div>
        </div>
    );
};

export default TableSelect;
