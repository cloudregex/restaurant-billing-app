import React from 'react';

const UniversalButton = ({
    children,
    color = 'blue',
    variant = 'filled',
    size = 'md',
    icon,
    iconOnly = false,
    disabled = false,
    loading = false,
    className = '',
    onClick,
    href,
    target = '_self',
    ...props
}) => {
    // Predefined color mappings
    const colorMap = {
        red: {
            filled: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 text-white',
            outlined: 'border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/50',
            text: 'text-red-600 hover:bg-red-50 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-900/50',
        },
        blue: {
            filled: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white',
            outlined: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50',
            text: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/50',
        },
        green: {
            filled: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white',
            outlined: 'border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/50',
            text: 'text-green-600 hover:bg-green-50 focus:ring-green-500 dark:text-green-400 dark:hover:bg-green-900/50',
        },
        yellow: {
            filled: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus:ring-yellow-500 dark:from-yellow-600 dark:to-yellow-700 dark:hover:from-yellow-700 dark:hover:to-yellow-800 text-white',
            outlined: 'border border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/50',
            text: 'text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-900/50',
        },
        purple: {
            filled: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500 dark:from-purple-600 dark:to-purple-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white',
            outlined: 'border border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/50',
            text: 'text-purple-600 hover:bg-purple-50 focus:ring-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/50',
        },
        pink: {
            filled: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:ring-pink-500 dark:from-pink-600 dark:to-pink-700 dark:hover:from-pink-700 dark:hover:to-pink-800 text-white',
            outlined: 'border border-pink-600 text-pink-600 hover:bg-pink-50 focus:ring-pink-500 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-900/50',
            text: 'text-pink-600 hover:bg-pink-50 focus:ring-pink-500 dark:text-pink-400 dark:hover:bg-pink-900/50',
        },
        indigo: {
            filled: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:ring-indigo-500 dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800 text-white',
            outlined: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/50',
            text: 'text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-900/50',
        },
        gray: {
            filled: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500 dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800 text-white',
            outlined: 'border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-900/50',
            text: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-900/50',
        }
    };

    const baseClasses = 'inline-flex items-center rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg';

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const iconOnlyClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100 shadow-none';

    // Ensure disabled is properly evaluated as a boolean
    const isDisabled = Boolean(disabled) || loading;

    // Determine button classes
    const buttonColorClasses = colorMap[color] && colorMap[color][variant]
        ? colorMap[color][variant]
        : colorMap.blue.filled;

    const buttonSizeClasses = iconOnly
        ? iconOnlyClasses[size]
        : sizeClasses[size];

    const buttonClasses = `
    ${baseClasses}
    ${buttonColorClasses}
    ${buttonSizeClasses}
    ${isDisabled ? disabledClasses : ''}
    ${className}
 `;

    // Handle click or redirection
    const handleClick = (e) => {
        if (isDisabled) return;

        // If href is provided, handle redirection
        if (href) {
            e.preventDefault();
            window.open(href, target);
        }

        // Call the provided onClick handler
        if (onClick) {
            onClick(e);
        }
    };

    if (loading) {
        // Skeleton state - use invisible content to maintain size
        return (
            <div className={`inline-flex items-center justify-center ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse select-none pointer-events-none ${className}`}>
                <div className="opacity-0 flex items-center">
                    {icon && !iconOnly && <span className="mr-2">{icon}</span>}
                    {!iconOnly && children}
                    {icon && iconOnly && icon}
                </div>
            </div>
        );
    }

    // Render as anchor if href is provided
    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={buttonClasses.trim()}
                onClick={handleClick}
                {...props}
            >
                {icon && !iconOnly && <span className="mr-2">{icon}</span>}
                {!iconOnly && children}
                {icon && iconOnly && icon}
            </a>
        );
    }

    // Render as button
    return (
        <button
            type={props.type || "button"}
            className={buttonClasses.trim()}
            disabled={isDisabled}
            onClick={handleClick}
            {...props}
        >
            {icon && !iconOnly && <span className="mr-2">{icon}</span>}
            {!iconOnly && children}
            {icon && iconOnly && icon}
        </button>
    );
};

export default UniversalButton;