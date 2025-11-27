import React from 'react';

const SkeletonTable = ({ rows = 5, columns = 4 }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                            {Array.from({ length: columns }).map((_, index) => (
                                <th key={index} className="p-4">
                                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-shimmer"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex} className="p-4">
                                        <div
                                            className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer"
                                            style={{
                                                width: `${60 + (rowIndex * colIndex) % 40}%`,
                                                animationDelay: `${(rowIndex * colIndex) * 0.05}s`
                                            }}
                                        ></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SkeletonTable;
