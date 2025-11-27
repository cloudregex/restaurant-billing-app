import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        // Auto finish after 3 seconds
        const timer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo/Icon */}
                <div className="mb-8 animate-pulse">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white/30">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>

                {/* App Name */}
                <h1 className="text-4xl font-light text-white mb-2 tracking-wide">
                    Restaurant Billing
                </h1>
                <p className="text-white/70 text-lg mb-8">Management System</p>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Loading Text */}
                <p className="text-white/60 text-sm mt-4">Loading...</p>
            </div>
        </div>
    );
};

export default SplashScreen;
