import React from 'react';

const StatsCard = ({ title, value, icon, color = 'blue', loading = false }) => {
    const colorClasses = {
        blue: {
            bg: 'bg-blue-100 dark:bg-blue-900/30',
            text: 'text-blue-600 dark:text-blue-400'
        },
        green: {
            bg: 'bg-green-100 dark:bg-green-900/30',
            text: 'text-green-600 dark:text-green-400'
        },
        red: {
            bg: 'bg-red-100 dark:bg-red-900/30',
            text: 'text-red-600 dark:text-red-400'
        },
        yellow: {
            bg: 'bg-yellow-100 dark:bg-yellow-900/30',
            text: 'text-yellow-600 dark:text-yellow-400'
        },
        purple: {
            bg: 'bg-purple-100 dark:bg-purple-900/30',
            text: 'text-purple-600 dark:text-purple-400'
        }
    };

    const selectedColor = colorClasses[color] || colorClasses.blue;

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
                <div className="space-y-2">
                    {/* Title skeleton */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28 animate-pulse"></div>
                    {/* Value skeleton */}
                    <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md w-16 animate-pulse"></div>
                </div>
                {/* Icon skeleton */}
                <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{value}</h3>
            </div>
            <div className={`p-3 ${selectedColor.bg} rounded-lg`}>
                {React.cloneElement(icon, {
                    className: `w-8 h-8 ${selectedColor.text} ${icon.props.className || ''}`
                })}
            </div>
        </div>
    );
};

export default StatsCard;
