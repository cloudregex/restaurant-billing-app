import React, { useState, useEffect } from 'react';
import { HiViewGridAdd, HiCheckCircle, HiXCircle, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import TableCreateModal from './TableCreateModal';
import TableEditModal from './TableEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';
import UniversalSelect from '../../components/UniversalSelect';

const TableIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data
    const [tables, setTables] = useState([
        { id: 1, tableNumber: 'T-01', capacity: 4, status: 'Available', type: 'Family' },
        { id: 2, tableNumber: 'T-02', capacity: 2, status: 'Occupied', type: 'Open' },
        { id: 3, tableNumber: 'T-03', capacity: 6, status: 'Available', type: 'Private' },
        { id: 4, tableNumber: 'T-04', capacity: 4, status: 'Reserved', type: 'Family' },
        { id: 5, tableNumber: 'T-05', capacity: 8, status: 'Available', type: 'Private' },
        { id: 6, tableNumber: 'T-06', capacity: 2, status: 'Occupied', type: 'Open' },
    ]);

    // Stats
    const totalTables = tables.length;
    const availableTables = tables.filter(t => t.status === 'Available').length;
    const occupiedTables = tables.filter(t => t.status === 'Occupied').length;

    // Filter Logic
    const filteredTables = tables.filter(table => {
        const matchesSearch = table.tableNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || table.status === statusFilter;
        const matchesType = typeFilter === 'All' || table.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const handleEdit = (table) => {
        setSelectedTable(table);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Table?',
            'Are you sure you want to delete this table? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setTables(tables.filter(t => t.id !== id));
            showToast.success('Table has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Table Number', key: 'tableNumber' },
        {
            header: 'Capacity',
            key: 'capacity',
            render: (value) => (
                <span className="font-medium">{value} Persons</span>
            )
        },
        {
            header: 'Type',
            key: 'type',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Family' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        value === 'Private' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                    {value}
                </span>
            )
        },
        {
            header: 'Status',
            key: 'status',
            render: (value) => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${value === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        value === 'Occupied' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
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
                    title="Total Tables"
                    value={totalTables}
                    color="blue"
                    loading={loading}
                    icon={<HiViewGridAdd />}
                />

                <StatsCard
                    title="Available Tables"
                    value={availableTables}
                    color="green"
                    loading={loading}
                    icon={<HiCheckCircle />}
                />

                <StatsCard
                    title="Occupied Tables"
                    value={occupiedTables}
                    color="red"
                    loading={loading}
                    icon={<HiXCircle />}
                />
            </div>

            {/* Actions & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex gap-4 w-full md:w-auto items-end flex-wrap">
                        <div className="w-full md:w-64">
                            <UniversalInput
                                type="text"
                                loading={loading}
                                placeholder="Search Table..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-0"
                                leftIcon={<HiSearch className="w-5 h-5" />}
                            />
                        </div>
                        <UniversalSelect
                            loading={loading}
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            options={[
                                { value: 'All', label: 'All Types' },
                                { value: 'Family', label: 'Family' },
                                { value: 'Open', label: 'Open' },
                                { value: 'Private', label: 'Private' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                        <UniversalSelect
                            loading={loading}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            options={[
                                { value: 'All', label: 'All Status' },
                                { value: 'Available', label: 'Available' },
                                { value: 'Occupied', label: 'Occupied' },
                                { value: 'Reserved', label: 'Reserved' }
                            ]}
                            className="mb-0 w-full md:w-auto min-w-[150px]"
                        />
                    </div>
                    <UniversalButton
                        onClick={() => setIsCreateModalOpen(true)}
                        color="blue"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        Add Table
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredTables}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <TableCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedTable && (
                <TableEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTable(null);
                    }}
                    table={selectedTable}
                />
            )}

        </div>
    );
};

export default TableIndex;
