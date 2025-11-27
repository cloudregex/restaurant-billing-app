import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { FaTimes, FaChevronDown } from 'react-icons/fa';

const UniversalMultiSelect = forwardRef(({
    label,
    id,
    value = [],
    onChange,
    error,
    disabled,
    required,
    className = '',
    placeholder = 'Select options',
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
        const newValues = value.includes(optionValue)
            ? value.filter(val => val !== optionValue)
            : [...value, optionValue];

        onChange && onChange({ target: { value: newValues } });
    };

    const handleRemoveValue = (valueToRemove) => {
        if (!disabled) {
            const newValues = value.filter(val => val !== valueToRemove);
            onChange && onChange({ target: { value: newValues } });
        }
    };

    const handleClearAll = () => {
        if (!disabled) {
            onChange && onChange({ target: { value: [] } });
        }
    };

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if an option is selected
    const isOptionSelected = (optionValue) => {
        return value.includes(optionValue);
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
                        } ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-white hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900'}`}
                    onClick={handleToggleDropdown}
                    {...props}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                            {value.length > 0 ? (
                                value.map((val) => {
                                    const option = options.find(opt => opt.value === val);
                                    return option ? (
                                        <span
                                            key={val}
                                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-800 dark:to-blue-900 dark:text-blue-100"
                                        >
                                            {option.label}
                                            {!disabled && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveValue(val);
                                                    }}
                                                    className="ml-1 inline-flex items-center rounded-full hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-700 dark:hover:to-blue-800"
                                                >
                                                    <FaTimes className="h-3 w-3" />
                                                </button>
                                            )}
                                        </span>
                                    ) : null;
                                })
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500">
                                    {placeholder}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center">
                            {value.length > 0 && !disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearAll();
                                    }}
                                    className="mr-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-full px-1 py-1"
                                >
                                    <FaTimes className="h-4 w-4" />
                                </button>
                            )}
                            <FaChevronDown
                                className={`h-5 w-5 text-gray-400 transition-transform duration-20 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
                        {searchable && (
                            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white focus:bg-gradient-to-r focus:from-white focus:to-blue-50 dark:focus:from-gray-700 dark:focus:to-blue-900"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        )}

                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`px-4 py-2 cursor-pointer transition-all duration-200 flex items-center ${isOptionSelected(option.value)
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                            } ${disabled || option.disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!disabled && !option.disabled) {
                                                handleOptionSelect(option.value);
                                            }
                                        }}
                                    >
                                        <div
                                            className={`relative mr-2 h-4 w-4 rounded border ${isOptionSelected(option.value)
                                                ? 'bg-gradient-to-r from-purple-500 to-purple-600 border-purple-600'
                                                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'}`}
                                        >
                                            {isOptionSelected(option.value) && (
                                                <FaTimes className="absolute inset-0 m-auto h-3 w-3 text-white" />
                                            )}
                                        </div>
                                        <span>{option.label}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
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

UniversalMultiSelect.displayName = 'UniversalMultiSelect';

export default UniversalMultiSelect;