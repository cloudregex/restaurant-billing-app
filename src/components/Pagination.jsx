import React from 'react';
import UniversalButton from './UniversalButton';

const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    loading = false,
    className = ''
}) => {
    // Skeleton loading state
    if (loading) {
        return (
            <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                <div className="flex space-x-2">
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="flex space-x-1">
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
            </div>
        );
    }

    // Don't show pagination if there's only one page
    if (totalPages <= 1) {
        return null;
    }

    // Calculate the range of items being displayed
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page
            pages.push(1);

            // Show ellipsis if needed
            if (currentPage > 3) {
                pages.push('ellipsis-start');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Show ellipsis if needed
            if (currentPage < totalPages - 2) {
                pages.push('ellipsis-end');
            }

            // Show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 ${className}`}>
            <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{startItem}</span> to{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">{endItem}</span> of{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">{totalItems}</span> results
            </div>

            <div className="flex space-x-2">
                <UniversalButton
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="filled"
                    color="gray"
                    size="md"
                    className="px-4"
                >
                    Previous
                </UniversalButton>

                <div className="flex space-x-1">
                    {pageNumbers.map((page, index) => {
                        if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                            return (
                                <span
                                    key={`ellipsis-${index}-${currentPage}`}
                                    className="px-3 py-2 text-gray-500 dark:text-gray-400 flex items-center justify-center"
                                >
                                    ...
                                </span>
                            );
                        }

                        const isActive = currentPage === page;
                        return (
                            <UniversalButton
                                key={`${page}-${currentPage}`}
                                onClick={() => onPageChange(page)}
                                variant={isActive ? "filled" : "outlined"}
                                color={isActive ? "blue" : "gray"}
                                size="md"
                                className="w-10 h-10"
                            >
                                {page}
                            </UniversalButton>
                        );
                    })}
                </div>

                <UniversalButton
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="filled"
                    color="gray"
                    size="md"
                    className="px-4"
                >
                    Next
                </UniversalButton>
            </div>
        </div>
    );
};

export default Pagination;