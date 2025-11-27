import React from 'react';

const SkeletonChart = ({ type = 'area', height = 'h-80' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm ${height}`}>
            {/* Chart Title Skeleton */}
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-4 animate-shimmer"></div>

            {/* Area Chart Skeleton */}
            {type === 'area' && (
                <div className="h-full w-full flex items-end justify-around gap-2 pb-8 pt-4">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 dark:bg-gray-700 rounded-t animate-shimmer w-full transition-all"
                            style={{
                                height: `${40 + (index * 7) % 60}%`,
                                animationDelay: `${index * 0.1}s`
                            }}
                        ></div>
                    ))}
                </div>
            )}

            {/* Pie Chart Skeleton */}
            {type === 'pie' && (
                <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                    {/* Circular skeleton */}
                    <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer"></div>
                    {/* Legend skeleton */}
                    <div className="flex gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm animate-shimmer"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-shimmer"></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkeletonChart;
