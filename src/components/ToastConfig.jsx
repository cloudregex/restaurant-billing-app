import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastConfig = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 4000,
                style: {
                    background: '#fff',
                    color: '#363636',
                },
                // Default options for specific types
                success: {
                    duration: 3000,
                    theme: {
                        primary: '#4aed88',
                        secondary: 'black',
                    },
                    style: {
                        background: '#fff',
                        color: '#333',
                        border: '1px solid #e2e8f0',
                    },
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#FFFAEE',
                    },
                },
                error: {
                    duration: 4000,
                    style: {
                        background: '#fff',
                        color: '#333',
                        border: '1px solid #e2e8f0',
                    },
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#FFFAEE',
                    },
                },
                // Dark mode support via class names (if using Tailwind's 'dark' class on html/body)
                // Note: react-hot-toast styles are inline, so we use a custom wrapper or conditional logic if needed.
                // For simplicity, we'll stick to neutral light styles or use CSS variables if advanced theming is required.
                // However, we can inject dark mode styles if the parent container has dark mode.
            }}
        />
    );
};

export default ToastConfig;
