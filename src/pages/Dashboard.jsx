import React, { useState, useEffect } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import SkeletonCard from '../components/SkeletonCard';
import SkeletonChart from '../components/SkeletonChart';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data for Charts
    const salesData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 5000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 6390 },
        { name: 'Sun', sales: 3490 },
    ];

    const categoryData = [
        { name: 'Starters', value: 400 },
        { name: 'Main Course', value: 300 },
        { name: 'Desserts', value: 300 },
        { name: 'Beverages', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const recentOrders = [
        { id: '#ORD-001', customer: 'Rahul Sharma', items: 'Paneer Tikka, Naan', amount: '₹450', status: 'Completed', time: '10 mins ago' },
        { id: '#ORD-002', customer: 'Priya Singh', items: 'Veg Biryani', amount: '₹250', status: 'Cooking', time: '15 mins ago' },
        { id: '#ORD-003', customer: 'Amit Patel', items: 'Butter Chicken, Roti', amount: '₹650', status: 'Pending', time: '20 mins ago' },
        { id: '#ORD-004', customer: 'Sneha Gupta', items: 'Masala Dosa', amount: '₹120', status: 'Completed', time: '25 mins ago' },
        { id: '#ORD-005', customer: 'Vikram Malhotra', items: 'Cold Coffee, Sandwich', amount: '₹200', status: 'Served', time: '30 mins ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'Cooking': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Pending': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            case 'Served': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="min-h-[calc(100vh-34px)] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {loading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    <>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">₹24,500</h3>
                                    <p className="text-xs text-green-500 mt-1 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                        +12.5% from yesterday
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">145</h3>
                                    <p className="text-xs text-green-500 mt-1 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                        +5% from yesterday
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Tables</p>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">12/20</h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        60% Occupancy
                                    </p>
                                </div>
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Orders</p>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">5</h3>
                                    <p className="text-xs text-red-500 mt-1 flex items-center">
                                        Needs Attention
                                    </p>
                                </div>
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {loading ? (
                    <>
                        <div className="lg:col-span-2">
                            <SkeletonChart type="area" />
                        </div>
                        <SkeletonChart type="pie" />
                    </>
                ) : (
                    <>
                        {/* Weekly Sales Chart */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Weekly Sales Overview</h3>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="#9CA3AF" />
                                        <YAxis stroke="#9CA3AF" />
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="sales" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Categories Chart */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Top Categories</h3>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Recent Orders Table */}
            {loading ? (
                <></>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Orders</h3>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                    <th className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                                    <th className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                    <th className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items</th>
                                    <th className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                                    <th className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{order.customer}</td>
                                        <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{order.items}</td>
                                        <td className="p-4 text-sm font-medium text-gray-900 dark:text-white">{order.amount}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{order.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
