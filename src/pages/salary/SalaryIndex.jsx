import React, { useState, useEffect } from 'react';
import { HiCollection, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus, HiCurrencyRupee } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const SalaryIndex = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [monthFilter, setMonthFilter] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data
    const [salaries, setSalaries] = useState([
        { id: 1, employeeName: 'John Doe', designation: 'Manager', salaryDate: '2025-12-01', baseSalary: 50000, netSalary: 48000, status: 'Paid' },
        { id: 2, employeeName: 'Jane Smith', designation: 'Chef', salaryDate: '2025-12-01', baseSalary: 35000, netSalary: 35000, status: 'Paid' },
        { id: 3, employeeName: 'Mike Johnson', designation: 'Waiter', salaryDate: '2025-12-01', baseSalary: 15000, netSalary: 14500, status: 'Pending' },
        { id: 4, employeeName: 'Sarah Williams', designation: 'Cashier', salaryDate: '2025-12-01', baseSalary: 18000, netSalary: 18000, status: 'Paid' },
        { id: 5, employeeName: 'David Brown', designation: 'Cleaner', salaryDate: '2025-12-01', baseSalary: 12000, netSalary: 11000, status: 'Pending' },
        { id: 6, employeeName: 'Emily Davis', designation: 'Waitress', salaryDate: '2025-11-01', baseSalary: 16000, netSalary: 15500, status: 'Paid' },
        { id: 7, employeeName: 'Michael Wilson', designation: 'Chef', salaryDate: '2025-11-01', baseSalary: 32000, netSalary: 32000, status: 'Paid' },
        { id: 8, employeeName: 'Jessica Taylor', designation: 'Manager', salaryDate: '2025-10-01', baseSalary: 52000, netSalary: 50000, status: 'Paid' },
        { id: 9, employeeName: 'Daniel Anderson', designation: 'Cleaner', salaryDate: '2025-10-01', baseSalary: 12500, netSalary: 12500, status: 'Paid' },
        { id: 10, employeeName: 'Laura Thomas', designation: 'Cashier', salaryDate: '2025-10-01', baseSalary: 18500, netSalary: 18000, status: 'Paid' },
        { id: 11, employeeName: 'Kevin Martinez', designation: 'Waiter', salaryDate: '2025-10-01', baseSalary: 15500, netSalary: 15000, status: 'Pending' },
        { id: 12, employeeName: 'Amanda White', designation: 'Waitress', salaryDate: '2025-10-01', baseSalary: 16500, netSalary: 16500, status: 'Paid' },
    ]);

    // Stats
    const totalSalaries = salaries.length;
    const paidSalaries = salaries.filter(s => s.status === 'Paid').length;
    const pendingSalaries = salaries.filter(s => s.status === 'Pending').length;
    const totalAmount = salaries.reduce((sum, s) => sum + s.netSalary, 0);

    // Filter Logic
    const filteredSalaries = salaries.filter(salary => {
        const matchesSearch = salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            salary.designation.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || salary.status === statusFilter;
        const matchesMonth = !monthFilter || salary.salaryDate.startsWith(monthFilter);
        return matchesSearch && matchesStatus && matchesMonth;
    });

    const handleEdit = (salary) => {
        navigate(`/salary/edit/${salary.id}`);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Salary Entry?',
            'Are you sure you want to delete this salary entry? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setSalaries(salaries.filter(s => s.id !== id));
            showToast.success('Salary entry has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Employee Name', key: 'employeeName' },
        { header: 'Designation', key: 'designation' },
        { header: 'Salary Date', key: 'salaryDate' },
        {
            header: 'Base Salary',
            key: 'baseSalary',
            render: (value) => `₹${value.toLocaleString()}`
        },
        {
            header: 'Net Salary',
            key: 'netSalary',
            render: (value) => <span className="font-bold text-green-600 dark:text-green-400">₹{value.toLocaleString()}</span>
        },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Paid'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Entries"
                    value={totalSalaries}
                    color="blue"
                    loading={loading}
                    icon={<HiCollection />}
                />

                <StatsCard
                    title="Paid Salaries"
                    value={paidSalaries}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Pending Salaries"
                    value={pendingSalaries}
                    color="yellow"
                    loading={loading}
                    icon={<HiXCircle />}
                />

                <StatsCard
                    title="Total Amount"
                    value={`₹${totalAmount.toLocaleString()}`}
                    color="purple"
                    loading={loading}
                    icon={<HiCurrencyRupee />}
                />
            </div>

            {/* Actions & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-4 w-full md:w-auto items-end">
                        <div className="w-full md:w-64">
                            <UniversalInput
                                type="text"
                                loading={loading}
                                placeholder="Search Employee..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-0"
                                leftIcon={<HiSearch className="w-5 h-5" />}
                            />
                        </div>
                        <div className="w-full md:w-48">
                            <input
                                type="month"
                                value={monthFilter}
                                onChange={(e) => setMonthFilter(e.target.value)}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                            />
                        </div>
                        <UniversalSelect
                            loading={loading}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: 'All', label: 'All Status' },
                                { value: 'Paid', label: 'Paid' },
                                { value: 'Pending', label: 'Pending' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => navigate('/salary/create')}
                        color="blue"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        Create Salary
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredSalaries}
                    loading={loading}
                    actions={actions}
                />
            </div>

        </div>
    );
};

export default SalaryIndex;
