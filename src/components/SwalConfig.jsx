import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Create a React-compatible Swal instance
const MySwal = withReactContent(Swal);

// Function to apply dark mode to Swal
export const applySwalDarkMode = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    if (isDarkMode) {
        MySwal.mixin({
            background: '#1f2937', // dark:bg-gray-800
            color: '#f9fafb', // dark:text-white
            confirmButtonColor: '#3b82f6', // blue-500
            cancelButtonColor: '#ef4444', // red-500
        });
    } else {
        MySwal.mixin({
            background: '#ffffff', // white
            color: '#111827', // text-gray-900
            confirmButtonColor: '#3b82f6', // blue-500
            cancelButtonColor: '#ef4444', // red-500
        });
    }
};

// Apply dark mode immediately when the module is loaded
applySwalDarkMode();

// Predefined Swal configurations for common use cases
export const SwalConfig = {
    confirmDelete: (title, text) => {
        const isDarkMode = document.documentElement.classList.contains('dark');

        return MySwal.fire({
            title: title || 'Are you sure?',
            text: text || 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6', // blue-500
            cancelButtonColor: '#ef4444', // red-500
            confirmButtonText: 'Yes, delete it!',
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#111827',
        });
    },

    confirmCancel: (title, text) => {
        const isDarkMode = document.documentElement.classList.contains('dark');

        return MySwal.fire({
            title: title || 'Cancel?',
            text: text || 'All unsaved changes will be lost.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444', // red-500
            cancelButtonColor: '#6b7280', // gray-500
            confirmButtonText: 'Yes, Cancel',
            cancelButtonText: 'No, Go Back',
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#111827',
        });
    },

    success: (title, text) => {
        const isDarkMode = document.documentElement.classList.contains('dark');

        return MySwal.fire({
            title: title || 'Success!',
            text: text || '',
            icon: 'success',
            confirmButtonColor: '#3b82f6', // blue-500
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#111827',
        });
    },

    error: (title, text) => {
        const isDarkMode = document.documentElement.classList.contains('dark');

        return MySwal.fire({
            title: title || 'Error!',
            text: text || 'Something went wrong!',
            icon: 'error',
            confirmButtonColor: '#3b82f6', // blue-500
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f9fafb' : '#111827',
        });
    }
};

export default MySwal;