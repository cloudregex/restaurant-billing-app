import React from 'react';

const SkeletonCard = ({ height = 'h-24' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${height}`}>
            <div className="flex items-center justify-between h-full">
                <div className="flex-1 space-y-3">
                    {/* Title skeleton */}
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-24 animate-shimmer"></div>
                    {/* Value skeleton */}
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-20 animate-shimmer"></div>
                    {/* Subtitle skeleton */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-md w-32 animate-shimmer"></div>
                </div>
                {/* Icon skeleton */}
                <div className="p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded animate-shimmer"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
