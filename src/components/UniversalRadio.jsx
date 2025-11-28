import React, { forwardRef } from 'react';

const UniversalRadio = forwardRef(({
    label,
    id,
    name,
    value,
    checked,
    onChange,
    error,
    disabled,
    required,
    loading = false,
    className = '',
    options = [],
    inline = false,
    ...props
}, ref) => {
    if (loading) {
        return (
            <div className={`mb-4 ${className}`}>
                {label && (
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                )}
                <div className={inline ? 'flex space-x-4' : 'space-y-2'}>
                    {options.map((_, index) => (
                        <div key={index} className={`flex items-center ${inline ? 'space-x-2' : ''}`}>
                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            <div className="ml-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className={inline ? 'flex space-x-4' : 'space-y-2'}>
                {options.map((option, index) => {
                    const optionId = id ? `${id}-${index}` : undefined;

                    return (
                        <div
                            key={option.value}
                            className={`flex items-center ${inline ? 'space-x-2' : ''}`}
                        >
                            <input
                                ref={index === 0 ? ref : null}
                                id={optionId}
                                name={name}
                                type="radio"
                                value={option.value}
                                checked={value ? value === option.value : checked === option.value}
                                onChange={onChange}
                                disabled={disabled || option.disabled}
                                className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-500 ${disabled || option.disabled
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'cursor-pointer'
                                    } ${(value ? value === option.value : checked === option.value)
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white dark:text-white'
                                        : ''}`}
                                {...props}
                            />
                            <label
                                htmlFor={optionId}
                                className={`ml-2 block text-sm ${disabled || option.disabled
                                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    : 'text-gray-700 dark:text-gray-300 cursor-pointer'
                                    }`}
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    );
});

UniversalRadio.displayName = 'UniversalRadio';

export default UniversalRadio;