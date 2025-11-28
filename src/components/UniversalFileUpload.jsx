import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { HiOutlineCloudUpload, HiX } from 'react-icons/hi';

const UniversalFileUpload = forwardRef(({
    label,
    id,
    name,
    value,
    onChange,
    error,
    disabled,
    required,
    loading = false,
    className = '',
    placeholder = 'Choose a file',
    accept = '*',
    multiple = false,
    showPreview = true,
    oldImageUrl = null,
    ...props
}, ref) => {
    const [files, setFiles] = useState([]); // Store all files with type info
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    // Helper function to check if a file is an image
    const isImageFile = (file) => {
        return file.type.startsWith('image/');
    };

    // Helper function to check if a URL points to an image based on extension
    const isImageUrl = (url) => {
        if (!url) return false;
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
        const lowerUrl = url.toLowerCase();
        return imageExtensions.some(ext => lowerUrl.endsWith(ext));
    };

    // Clean up object URLs when component unmounts
    useEffect(() => {
        return () => {
            files.forEach(item => {
                if (item.isImage && item.url && item.url.startsWith('blob:')) {
                    URL.revokeObjectURL(item.url);
                }
            });
        };
    }, [files]);

    const handleFiles = (fileList) => {
        if (disabled) return;

        const newFiles = Array.from(fileList).map(file => ({
            file,
            name: file.name,
            isImage: isImageFile(file),
            id: Math.random(), // Simple ID for tracking
            url: isImageFile(file) ? URL.createObjectURL(file) : null
        }));

        setFiles(prev => multiple ? [...prev, ...newFiles] : newFiles);

        if (onChange) {
            const fileObjects = newFiles.map(item => item.file);
            const value = multiple ? fileObjects : fileObjects[0] || null;
            onChange({
                target: {
                    name: name || id,
                    value
                }
            });
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files.length) {
            handleFiles(e.target.files);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleRemoveFile = (fileId) => {
        if (disabled) return;

        setFiles(prev => {
            const fileToRemove = prev.find(item => item.id === fileId);
            if (!fileToRemove) return prev;

            // Clean up object URL if it's an image
            if (fileToRemove.isImage && fileToRemove.url && fileToRemove.url.startsWith('blob:')) {
                URL.revokeObjectURL(fileToRemove.url);
            }

            return prev.filter(item => item.id !== fileId);
        });

        if (onChange) {
            const remainingFiles = files.filter(item => item.id !== fileId).map(item => item.file);
            const value = multiple ? remainingFiles : remainingFiles[0] || null;
            onChange({
                target: {
                    name: name || id,
                    value
                }
            });
        }
    };

    const triggerFileInput = () => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Separate image and non-image files for display
    const imageFiles = files.filter(item => item.isImage);
    const nonImageFiles = files.filter(item => !item.isImage);

    if (loading) {
        return (
            <div className={`mb-4 relative ${className}`}>
                {label && (
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                )}
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className={`mb-4 relative ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : error
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    } ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-800'}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
            >
                <input
                    ref={(node) => {
                        fileInputRef.current = node;
                        if (typeof ref === 'function') {
                            ref(node);
                        } else if (ref) {
                            ref.current = node;
                        }
                    }}
                    id={id}
                    name={name || id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    disabled={disabled}
                    className="hidden"
                    {...props}
                />

                <div className="flex flex-col items-center justify-center">
                    <HiOutlineCloudUpload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                            Click to upload
                        </span>{' '}
                        or drag and drop
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {placeholder}
                    </p>

                    {files.length > 0 && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Selected: {files.map(f => f.name).join(', ')}
                        </div>
                    )}
                </div>
            </div>

            {/* Preview section for images */}
            {showPreview && ((imageFiles.length > 0) || oldImageUrl) && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {/* Old image URL if present */}
                    {oldImageUrl && (
                        isImageUrl(oldImageUrl) ? (
                            <div className="relative group">
                                <img
                                    src={oldImageUrl}
                                    alt="Old preview"
                                    className="w-full h-24 object-cover rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(oldImageUrl, '_blank', 'noopener,noreferrer');
                                    }}
                                />
                                <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                                    Old
                                </div>
                            </div>
                        ) : (
                            <div className="relative group">
                                <div className="w-full h-24 flex flex-col items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-2">
                                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">
                                        {oldImageUrl.split('/').pop()}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        File
                                    </div>
                                </div>
                                <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                                    Old
                                </div>
                            </div>
                        )
                    )}

                    {/* New image previews */}
                    {imageFiles.map((item) => (
                        <div key={`img-${item.id}`} className="relative group">
                            <img
                                src={item.url}
                                alt={`Preview ${item.name}`}
                                className="w-full h-24 object-cover rounded-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(item.url, '_blank', 'noopener,noreferrer');
                                }}
                            />
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFile(item.id);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <HiX className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Display for non-image files */}
            {showPreview && nonImageFiles.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {nonImageFiles.map((item) => (
                        <div key={`file-${item.id}`} className="relative group">
                            <div className="w-full h-24 flex flex-col items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-2">
                                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">
                                    {item.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {item.file.type.split('/')[1] || 'File'}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {(item.file.size / 1024).toFixed(1)} KB
                                </div>
                            </div>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFile(item.id);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <HiX className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    );
});

UniversalFileUpload.displayName = 'UniversalFileUpload';

export default UniversalFileUpload;
