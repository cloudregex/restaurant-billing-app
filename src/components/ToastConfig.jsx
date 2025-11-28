import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastConfig = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{
                top: 50, // Move down from top
                right: 20,
            }}
            toastOptions={{
                // Define default options
                className: '!bg-white dark:!bg-gray-800 !text-gray-800 dark:!text-white !shadow-lg !rounded-xl border border-gray-100 dark:border-gray-700',
                duration: 4000,
                // Default options for specific types
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#FFFAEE',
                    },
                },
                error: {
                    duration: 4000,
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#FFFAEE',
                    },
                },
            }}
        />
    );
};

export default ToastConfig;
