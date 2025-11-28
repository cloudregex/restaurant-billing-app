import React, { forwardRef } from 'react';

const UniversalCheckbox = forwardRef(({
    label,
    id,
    checked = false,
    onChange,
    error,
    disabled,
    required,
    loading = false,
    className = '',
    indeterminate = false,
    ...props
}, ref) => {
    if (loading) {
        return (
            <div className={`mb-4 ${className}`}>
                <div className="flex items-center">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    {label && (
                        <div className="ml-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`mb-4 ${className}`}>
            <div className="flex items-center">
                <input
                    ref={ref}
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                        } ${error ? 'border-red-500' : ''}`}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={id}
                        className={`ml-2 block text-sm ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 cursor-pointer'
                            }`}
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    );
});

UniversalCheckbox.displayName = 'UniversalCheckbox';

export default UniversalCheckbox;