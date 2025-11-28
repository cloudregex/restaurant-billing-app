import React, { useState, useEffect, useRef } from 'react';

const Table = ({ columns, data, actions, onRowClick, loading }) => {
  const [showLoading, setShowLoading] = useState(loading);
  const startTime = useRef(null);

  useEffect(() => {
    let timeoutId;

    if (loading) {
      setShowLoading(true);
      startTime.current = Date.now();
    } else {
      const elapsedTime = Date.now() - (startTime.current || 0);
      const remainingTime = 500 - elapsedTime;

      if (remainingTime > 0 && startTime.current) {
        timeoutId = setTimeout(() => {
          setShowLoading(false);
          startTime.current = null;
        }, remainingTime);
      } else {
        setShowLoading(false);
        startTime.current = null;
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);

  if (showLoading) {
    return (
      <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/80">
              <tr>
                {columns.map((_, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider"
                  >
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                  </th>
                ))}
                {actions && (
                  <th scope="col" className="px-6 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto animate-pulse"></div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[...Array(10)].map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/80">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-6 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {actions.map((action, actionIndex) => (
                        <div
                          key={actionIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick(row);
                          }}
                          className={`inline-block ${action.className || ''}`}
                        >
                          {action.label}
                        </div>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;