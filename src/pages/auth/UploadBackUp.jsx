import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCloudUpload } from 'react-icons/hi';
import showToast from '../../utils/toast';

const UploadBackUp = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Basic validation for file type if needed (e.g., .sql, .zip)
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            showToast.error('Please select a backup file');
            return;
        }

        setLoading(true);
        // Simulate upload process
        setTimeout(() => {
            console.log('Restoring backup from:', file.name);
            setLoading(false);
            showToast.success('Backup restored successfully!');
            navigate('/');
        }, 2000);
    };

    return (
        <div className="h-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <button
                onClick={() => navigate('/')}
                className="fixed top-14 left-6 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all duration-200 z-50 shadow-lg"
                aria-label="Go back"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center w-full max-w-md px-4">
                    <div className="mb-6">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
                            <HiCloudUpload className="w-16 h-16 text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-light text-white mb-2">Restore Backup</h2>
                    <p className="text-white/60 text-sm mb-8 text-center">Upload your backup file to restore the system data.</p>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-6">
                            <label
                                htmlFor="backup-file"
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-white/30 border-dashed rounded-xl cursor-pointer bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {file ? (
                                        <>
                                            <HiCloudUpload className="w-10 h-10 text-white mb-3" />
                                            <p className="mb-2 text-sm text-white font-medium">{file.name}</p>
                                            <p className="text-xs text-white/60">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </>
                                    ) : (
                                        <>
                                            <HiCloudUpload className="w-10 h-10 text-white/80 mb-3" />
                                            <p className="mb-2 text-sm text-white/80"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-white/60">SQL or ZIP files (MAX. 50MB)</p>
                                        </>
                                    )}
                                </div>
                                <input id="backup-file" type="file" className="hidden" onChange={handleFileChange} accept=".sql,.zip" />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Restoring...
                                </>
                            ) : (
                                'Restore Backup'
                            )}
                        </button>
                    </form>
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/60 text-sm">Restaurant Billing System. Version 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default UploadBackUp;
