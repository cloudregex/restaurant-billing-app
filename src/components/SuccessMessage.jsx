import { SwalConfig } from './SwalConfig';

/**
 * Reusable success message component for create/update operations
 * @param {string} entityType - The type of entity (e.g., 'Course', 'Category', 'Course Note', 'Reference')
 * @param {string} operation - The operation performed (e.g., 'created', 'updated', 'deleted')
 * @param {string} customTitle - Optional custom title for the message
 * @param {string} customMessage - Optional custom message
 */
export const showSuccessMessage = (entityType, operation, customTitle = null, customMessage = null) => {
    const title = customTitle || 'Success!';
    const message = customMessage || `${entityType} ${operation} successfully`;

    return SwalConfig.success(title, message);
};

/**
 * Reusable error message component for create/update operations
 * @param {string} entityType - The type of entity (e.g., 'Course', 'Category', 'Course Note', 'Reference')
 * @param {string} operation - The operation performed (e.g., 'create', 'update', 'delete')
 * @param {string} customTitle - Optional custom title for the message
 * @param {string} customMessage - Optional custom message
 */
export const showErrorMessage = (entityType, operation, customTitle = null, customMessage = null) => {
    const title = customTitle || 'Error!';
    const message = customMessage || `Failed to ${operation} ${entityType}`;

    return SwalConfig.error(title, message);
};

/**
 * Reusable delete confirmation component
 * @param {string} entityType - The type of entity (e.g., 'Course', 'Category', 'Course Note', 'Reference')
 * @param {string} entityName - The name of the specific entity being deleted
 * @param {string} customTitle - Optional custom title for the message
 * @param {string} customMessage - Optional custom message
 */
export const showDeleteConfirmation = (entityType, entityName, customTitle = null, customMessage = null) => {
    const title = customTitle || 'Are you sure?';
    const message = customMessage || `Do you want to delete the ${entityType} "${entityName}"?`;

    return SwalConfig.confirmDelete(title, message);
};

/**
 * Reusable delete success message component
 * @param {string} entityType - The type of entity (e.g., 'Course', 'Category', 'Course Note', 'Reference')
 * @param {string} entityName - The name of the specific entity being deleted
 * @param {string} customTitle - Optional custom title for the message
 * @param {string} customMessage - Optional custom message
 */
export const showDeleteSuccessMessage = (entityType, entityName, customTitle = null, customMessage = null) => {
    const title = customTitle || 'Deleted!';
    const message = customMessage || `The ${entityType} "${entityName}" has been deleted.`;

    return SwalConfig.success(title, message);
};

export default {
    showSuccessMessage,
    showErrorMessage,
    showDeleteConfirmation,
    showDeleteSuccessMessage
};