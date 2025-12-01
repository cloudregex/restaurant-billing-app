import React, { useState, useEffect } from 'react';
import { HiX, HiPlus, HiSave, HiCheckCircle, HiArrowLeft, HiTrash } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { SwalConfig } from '../../components/SwalConfig';
import UniversalButton from '../../components/UniversalButton';
import UniversalSelect from '../../components/UniversalSelect';
import showToast from '../../utils/toast';

// Reusable Table Component for Dynamic Fields - Defined OUTSIDE to prevent focus loss
const DynamicTable = ({ title, items, onAdd, onRemove, onChange, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold text-${color}-600 dark:text-${color}-400`}>{title}</h2>
            <UniversalButton
                color={color}
                size="sm"
                icon={<HiPlus className="w-4 h-4" />}
                onClick={onAdd}
            >
                Add {title}
            </UniversalButton>
        </div>

        {items.length > 0 ? (
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={item.id} className="flex gap-2 items-start">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Name"
                                value={item.name}
                                onChange={(e) => onChange(index, 'name', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="w-32">
                            <input
                                type="number"
                                placeholder="Amount"
                                value={item.amount}
                                onChange={(e) => onChange(index, 'amount', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Note (Optional)"
                                value={item.note}
                                onChange={(e) => onChange(index, 'note', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <button
                            onClick={() => onRemove(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                            <HiTrash className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                No {title.toLowerCase()} added yet
            </div>
        )}
    </div>
);

const SalaryEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    // Dummy Employees Data
    const employees = [
        { id: '1', name: 'John Doe', designation: 'Manager', baseSalary: 50000 },
        { id: '2', name: 'Jane Smith', designation: 'Chef', baseSalary: 35000 },
        { id: '3', name: 'Mike Johnson', designation: 'Waiter', baseSalary: 15000 },
        { id: '4', name: 'Sarah Williams', designation: 'Cashier', baseSalary: 18000 },
        { id: '5', name: 'David Brown', designation: 'Cleaner', baseSalary: 12000 },
    ];

    // Main State
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [salaryDate, setSalaryDate] = useState('');
    const [daysInMonth, setDaysInMonth] = useState(30);
    const [daysPresent, setDaysPresent] = useState(30);
    const [baseSalary, setBaseSalary] = useState(0);
    const [adminNote, setAdminNote] = useState('');

    // Dynamic Tables State
    const [deductions, setDeductions] = useState([]);
    const [extras, setExtras] = useState([]);
    const [advances, setAdvances] = useState([]);

    // Load Salary Data
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            // Dummy existing data
            const dummySalary = {
                id: id,
                employeeId: '1',
                salaryDate: '2025-11-01',
                daysInMonth: 30,
                daysPresent: 28,
                baseSalary: 50000,
                deductions: [
                    { id: 1, name: 'Tax', amount: '2000', note: 'TDS' }
                ],
                extras: [
                    { id: 1, name: 'Overtime', amount: '1500', note: '5 hours' }
                ],
                advances: [],
                adminNote: 'Good performance',
                status: 'Draft'
            };

            setSelectedEmployeeId(dummySalary.employeeId);
            setSalaryDate(dummySalary.salaryDate);
            setDaysInMonth(dummySalary.daysInMonth);
            setDaysPresent(dummySalary.daysPresent);
            setBaseSalary(dummySalary.baseSalary);
            setDeductions(dummySalary.deductions);
            setExtras(dummySalary.extras);
            setAdvances(dummySalary.advances);
            setAdminNote(dummySalary.adminNote);

            setIsLoading(false);
        }, 1000);
    }, [id]);

    // Effect: Calculate days in month based on selected date
    useEffect(() => {
        if (salaryDate) {
            const date = new Date(salaryDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const days = new Date(year, month, 0).getDate();
            setDaysInMonth(days);
        }
    }, [salaryDate]);

    // Calculations
    const totalDeductions = deductions.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const totalExtras = extras.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const totalAdvance = advances.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    // Calculate pro-rated salary based on days present
    const calculatedBaseSalary = (baseSalary / daysInMonth) * daysPresent;
    const netSalary = calculatedBaseSalary - totalDeductions + totalExtras - totalAdvance;

    // Handlers for Dynamic Tables
    const handleAddItem = (setter, list) => {
        setter([...list, { id: Date.now(), name: '', amount: '', note: '' }]);
    };

    const handleRemoveItem = (setter, list, index) => {
        const newList = [...list];
        newList.splice(index, 1);
        setter(newList);
    };

    const handleItemChange = (setter, list, index, field, value) => {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        setter(newList);
    };

    // Update Handler
    const handleUpdate = (status = 'Draft') => {
        if (!selectedEmployeeId) {
            showToast.error('Please select an employee');
            return;
        }

        const salaryData = {
            id,
            employeeId: selectedEmployeeId,
            salaryDate,
            daysInMonth,
            daysPresent,
            baseSalary: calculatedBaseSalary,
            deductions,
            extras,
            advances,
            netSalary,
            adminNote,
            status
        };

        console.log('Updating Salary:', salaryData);
        showToast.success(`Salary entry ${status === 'Paid' ? 'completed' : 'updated'} successfully!`);
        navigate('/salary');
    };

    // Skeleton Loader
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 animate-pulse">
                <div className="max-w-8xl mx-auto">
                    <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        <HiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Salary Entry #{id}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Update employee salary details</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Dynamic Tables */}
                        <DynamicTable
                            title="Deductions"
                            items={deductions}
                            onAdd={() => handleAddItem(setDeductions, deductions)}
                            onRemove={(index) => handleRemoveItem(setDeductions, deductions, index)}
                            onChange={(index, field, value) => handleItemChange(setDeductions, deductions, index, field, value)}
                            color="red"
                        />

                        <DynamicTable
                            title="Extra Amounts"
                            items={extras}
                            onAdd={() => handleAddItem(setExtras, extras)}
                            onRemove={(index) => handleRemoveItem(setExtras, extras, index)}
                            onChange={(index, field, value) => handleItemChange(setExtras, extras, index, field, value)}
                            color="green"
                        />

                        <DynamicTable
                            title="Advance Amounts"
                            items={advances}
                            onAdd={() => handleAddItem(setAdvances, advances)}
                            onRemove={(index) => handleRemoveItem(setAdvances, advances, index)}
                            onChange={(index, field, value) => handleItemChange(setAdvances, advances, index, field, value)}
                            color="yellow"
                        />

                        {/* Admin Note */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Admin Note</h2>
                            <textarea
                                value={adminNote}
                                onChange={(e) => setAdminNote(e.target.value)}
                                rows="3"
                                placeholder="Add any additional notes here..."
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            ></textarea>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Employee Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Select Employee <span className="text-red-500">*</span>
                                    </label>
                                    <UniversalSelect
                                        value={selectedEmployeeId}
                                        onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                        options={employees.map(e => ({ value: e.id, label: `${e.name} (${e.designation})` }))}
                                        placeholder="Select an employee"
                                    />
                                </div>

                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Base Salary
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={baseSalary}
                                            readOnly
                                            className="w-full pl-7 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white my-4">Salary Details</h2>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Salary Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={salaryDate}
                                        onChange={(e) => setSalaryDate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Days in Month
                                        </label>
                                        <input
                                            type="number"
                                            value={daysInMonth}
                                            readOnly
                                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            Days Present
                                        </label>
                                        <input
                                            type="number"
                                            value={daysPresent}
                                            onChange={(e) => setDaysPresent(Number(e.target.value))}
                                            max={daysInMonth}
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-t border-gray-200 dark:border-gray-700 pt-4">Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Base Salary (Pro-rated)</span>
                                    <span className="font-medium text-gray-800 dark:text-white">₹{calculatedBaseSalary.toFixed(2)}</span>
                                </div>

                                {totalDeductions > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Total Deductions</span>
                                        <span className="font-medium text-red-600 dark:text-red-400">-₹{totalDeductions.toFixed(2)}</span>
                                    </div>
                                )}

                                {totalExtras > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Total Extras</span>
                                        <span className="font-medium text-green-600 dark:text-green-400">+₹{totalExtras.toFixed(2)}</span>
                                    </div>
                                )}

                                {totalAdvance > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Total Advance</span>
                                        <span className="font-medium text-yellow-600 dark:text-yellow-400">-₹{totalAdvance.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <span>Net Salary</span>
                                    <span className="text-blue-600 dark:text-blue-400">₹{netSalary.toFixed(2)}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 pt-3">
                                    <UniversalButton
                                        color="blue"
                                        className="w-full"
                                        onClick={() => handleUpdate('Draft')}
                                        icon={<HiSave className="w-4 h-4" />}
                                    >
                                        Update Draft
                                    </UniversalButton>
                                    <UniversalButton
                                        color="green"
                                        className="w-full"
                                        onClick={() => handleUpdate('Paid')}
                                        icon={<HiCheckCircle className="w-4 h-4" />}
                                    >
                                        Update & Mark Paid
                                    </UniversalButton>
                                    <UniversalButton
                                        color="red"
                                        variant="outlined"
                                        className="w-full"
                                        onClick={async () => {
                                            const result = await SwalConfig.confirmCancel(
                                                'Cancel Edit?',
                                                'All unsaved changes will be lost.'
                                            );
                                            if (result.isConfirmed) {
                                                navigate('/salary');
                                            }
                                        }}
                                        icon={<HiX className="w-4 h-4" />}
                                    >
                                        Cancel
                                    </UniversalButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryEdit;
