import toast from 'react-hot-toast';

/**
 * Utility for consistent toast notifications across the app.
 */
const showToast = {
    success: (message) => toast.success(message, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        className: 'dark:bg-gray-800 dark:text-white',
    }),
    error: (message) => toast.error(message, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        className: 'dark:bg-gray-800 dark:text-white',
    }),
    loading: (message) => toast.loading(message, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        className: 'dark:bg-gray-800 dark:text-white',
    }),
    custom: (message, icon) => toast(message, {
        icon: icon,
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        className: 'dark:bg-gray-800 dark:text-white',
    }),
    dismiss: (toastId) => toast.dismiss(toastId),
    promise: (promise, messages) => toast.promise(promise, {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error',
    }, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        className: 'dark:bg-gray-800 dark:text-white',
    }),
};

export default showToast;
