import React, { useState, useEffect } from 'react';
import { HiUserGroup, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus, HiUserAdd } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import EmployeeCreateModal from './EmployeeCreateModal';
import EmployeeEditModal from './EmployeeEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const EmployeeIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data
    const [employees, setEmployees] = useState([
        {
            id: 1,
            fullName: 'John Doe',
            mobile: '9876543210',
            role: 'Manager',
            address: '123 Main St, City',
            dateHired: '2023-01-15',
            salary: '50000',
            status: 'Active',
            permissions: ['pos', 'purchase', 'finance'],
            pin: '1234'
        },
        {
            id: 2,
            fullName: 'Jane Smith',
            mobile: '9876543211',
            role: 'Waiter',
            address: '456 Park Ave, City',
            dateHired: '2023-03-20',
            salary: '25000',
            status: 'Active',
            permissions: ['pos'],
            pin: '5678'
        },
        {
            id: 3,
            fullName: 'Mike Johnson',
            mobile: '9876543212',
            role: 'Chef',
            address: '789 Road, City',
            dateHired: '2023-02-10',
            salary: '40000',
            status: 'Deactive',
            permissions: [],
            pin: '9012'
        },
    ]);

    // Stats
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'Active').length;
    const deactiveEmployees = employees.filter(e => e.status === 'Deactive').length;

    // Filter Logic
    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.mobile.includes(searchTerm) ||
            employee.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || employee.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Employee?',
            'Are you sure you want to delete this employee? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setEmployees(employees.filter(e => e.id !== id));
            showToast.success('Employee has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Full Name', key: 'fullName' },
        { header: 'Mobile', key: 'mobile' },
        { header: 'Role', key: 'role' },
        { header: 'Salary', key: 'salary', render: (value) => `₹${value}` },
        { header: 'Date Hired', key: 'dateHired' },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                    title="Total Employees"
                    value={totalEmployees}
                    color="blue"
                    loading={loading}
                    icon={<HiUserGroup />}
                />

                <StatsCard
                    title="Active Employees"
                    value={activeEmployees}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Deactive Employees"
                    value={deactiveEmployees}
                    color="red"
                    loading={loading}
                    icon={<HiXCircle />}
                />
            </div>

            {/* Actions & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex gap-4 w-full md:w-auto items-end">
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
                        <UniversalSelect
                            loading={loading}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: 'All', label: 'All Status' },
                                { value: 'Active', label: 'Active' },
                                { value: 'Deactive', label: 'Deactive' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => setIsCreateModalOpen(true)}
                        color="blue"
                        loading={loading}
                        icon={<HiUserAdd />}
                        className="w-full md:w-auto"
                    >
                        Add Employee
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredEmployees}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <EmployeeCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedEmployee && (
                <EmployeeEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEmployee(null);
                    }}
                    employee={selectedEmployee}
                />
            )}

        </div>
    );
};

export default EmployeeIndex;
