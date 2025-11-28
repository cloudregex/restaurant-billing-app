import React, { forwardRef } from 'react';

const UniversalInput = forwardRef(({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    disabled,
    required,
    loading = false,
    className = '',
    ...props
}, ref) => {
    if (loading) {
        return (
            <div className={`mb-4 ${className}`}>
                {label && (
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                )}
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <input
                ref={ref}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 ${error
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                    } ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-800 dark:text-white'}`}
                {...props}
            />

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
});

UniversalInput.displayName = 'UniversalInput';

export default UniversalInput;