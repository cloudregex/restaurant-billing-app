import toast from 'react-hot-toast';

/**
 * Utility for consistent toast notifications across the app.
 */
const showToast = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
    custom: (message, icon) => toast(message, { icon: icon }),
    dismiss: (toastId) => toast.dismiss(toastId),
    promise: (promise, messages) => toast.promise(promise, {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error',
    }),
};

export default showToast;
