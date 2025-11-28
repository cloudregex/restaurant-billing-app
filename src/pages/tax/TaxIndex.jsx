import React, { useState, useEffect } from 'react';
import { HiCalculator, HiPencil, HiTrash, HiSearch, HiPlus } from 'react-icons/hi';
import { SwalConfig } from '../../components/SwalConfig';
import showToast from '../../utils/toast';
import TaxCreateModal from './TaxCreateModal';
import TaxEditModal from './TaxEditModal';
import StatsCard from '../../components/StatsCard';
import Table from '../../components/Table';
import UniversalButton from '../../components/UniversalButton';
import UniversalInput from '../../components/UniversalInput';

const TaxIndex = () => {
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTax, setSelectedTax] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Dummy Data
    const [taxes, setTaxes] = useState([
        { id: 1, name: 'GST', percentage: 18 },
        { id: 2, name: 'CGST', percentage: 9 },
        { id: 3, name: 'SGST', percentage: 9 },
        { id: 4, name: 'Service Tax', percentage: 5 },
        { id: 5, name: 'VAT', percentage: 12.5 },
    ]);

    // Filter Logic
    const filteredTaxes = taxes.filter(tax => {
        const matchesSearch = tax.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleEdit = (tax) => {
        setSelectedTax(tax);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        const result = await SwalConfig.confirmDelete(
            'Delete Tax?',
            'Are you sure you want to delete this tax? This action cannot be undone.'
        );

        if (result.isConfirmed) {
            setTaxes(taxes.filter(t => t.id !== id));
            showToast.success('Tax has been deleted successfully.');
        }
    };

    const columns = [
        { header: 'Tax Name', key: 'name' },
        {
            header: 'Tax Percentage (%)',
            key: 'percentage',
            render: (value) => (
                <span className="font-medium text-blue-600 dark:text-blue-400">{value}%</span>
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

            {/* Actions & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex gap-4 w-full md:w-auto items-end">
                        <div className="w-full md:w-64">
                            <UniversalInput
                                type="text"
                                loading={loading}
                                placeholder="Search Tax..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-0"
                                leftIcon={<HiSearch className="w-5 h-5" />}
                            />
                        </div>
                    </div>
                    <UniversalButton
                        onClick={() => setIsCreateModalOpen(true)}
                        color="blue"
                        loading={loading}
                        icon={<HiPlus />}
                        className="w-full md:w-auto"
                    >
                        Add Tax
                    </UniversalButton>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    data={filteredTaxes}
                    loading={loading}
                    actions={actions}
                />
            </div>

            {/* Modals */}
            {isCreateModalOpen && (
                <TaxCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {isEditModalOpen && selectedTax && (
                <TaxEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedTax(null);
                    }}
                    tax={selectedTax}
                />
            )}

        </div>
    );
};

export default TaxIndex;
