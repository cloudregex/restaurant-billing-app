import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaSearch, FaTimes } from 'react-icons/fa';

const UniversalSelect = forwardRef(({
    label,
    id,
    name,
    value,
    onChange,
    error,
    disabled,
    required,
    className = '',
    placeholder = 'Select an option',
    options = [],
    searchable = false,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectRef = useRef(null);
    const searchInputRef = useRef(null);

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 100);
        }
    }, [isOpen, searchable]);

    const handleToggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSearchTerm('');
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOptionSelect = (optionValue) => {
        onChange && onChange({ target: { name: name || id, value: optionValue } });
        setIsOpen(false);
        setSearchTerm('');
    };

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get display text for the select input
    const getDisplayText = () => {
        if (!value) return placeholder;
        const option = options.find(opt => opt.value === value);
        return option ? option.label : '';
    };

    // Check if an option is selected
    const isOptionSelected = (optionValue) => {
        return value === optionValue;
    };

    return (
        <div className={`relative ${className}`} ref={selectRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                <div
                    id={id}
                    ref={ref}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer ${error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                        } ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-800'}`}
                    onClick={handleToggleDropdown}
                    {...props}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                            <span className={getDisplayText() === placeholder ? 'text-gray-400 dark:text-gray-500' : ''}>
                                {getDisplayText()}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FaChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform duration-20 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        {searchable && (
                            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`px-4 py-2 cursor-pointer transition-colors ${isOptionSelected(option.value)
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                            } ${disabled || option.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={() => !option.disabled && handleOptionSelect(option.value)}
                                    >
                                        <div className="flex items-center">
                                            <span>{option.label}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-gray-500 dark:text-gray-400 flex items-center">
                                    <FaTimes className="h-4 w-4 mr-2" />
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {error && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
                )}
            </div>
        </div>
    );
});

UniversalSelect.displayName = 'UniversalSelect';

export default UniversalSelect;