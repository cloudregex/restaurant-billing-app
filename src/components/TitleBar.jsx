import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const TitleBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);

    const notificationRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check if current page is an auth page
    const isAuthPage = ['/', '/register', '/otp', '/forgot-password', '/reset-password'].includes(location.pathname);

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Add Bill', path: '/billing' },
        { name: 'Supplier', path: '/supplier' },
        { name: 'Table', path: '/table' },
        { name: 'Menu', path: '/menu' },
        { name: 'Category', path: '/category' },
        { name: 'Tax', path: '/tax' },
        { name: 'Customer', path: '/customer' },
        { name: 'Income', path: '/income' },
        { name: 'Expense', path: '/expense' },
        { name: 'Reports', path: '/reports' },
        { name: 'Employee', path: '/employee' },
        { name: 'Transactions', path: '/transactions' },
    ];

    const handleMinimize = async () => {
        try {
            const { getCurrentWindow } = await import('@tauri-apps/api/window');
            await getCurrentWindow().minimize();
        } catch (error) {
            console.error('Failed to minimize:', error);
        }
    };

    const handleMaximize = async () => {
        try {
            const { getCurrentWindow } = await import('@tauri-apps/api/window');
            await getCurrentWindow().toggleMaximize();
        } catch (error) {
            console.error('Failed to maximize:', error);
        }
    };

    const handleCloseClick = () => {
        setShowCloseConfirm(true);
    };

    const handleCloseConfirm = async () => {
        try {
            const { getCurrentWindow } = await import('@tauri-apps/api/window');
            await getCurrentWindow().close();
        } catch (error) {
            console.error('Failed to close:', error);
        }
    };

    const handleCloseCancel = () => {
        setShowCloseConfirm(false);
    };

    const handleLogout = () => {
        navigate('/');
    };

    // Conditional classes based on page type
    const bgClass = isAuthPage
        ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900'
        : 'bg-gray-200 dark:bg-gray-900';

    const borderClass = isAuthPage
        ? 'border-white/20'
        : 'border-gray-300 dark:border-gray-700';

    const textClass = isAuthPage
        ? 'text-white'
        : 'text-gray-800 dark:text-white';

    const iconClass = isAuthPage
        ? 'text-white'
        : 'text-gray-700 dark:text-white';

    const hoverClass = isAuthPage
        ? 'hover:bg-white/10'
        : 'hover:bg-gray-300 dark:hover:bg-gray-700';

    return (
        <>
            <div data-tauri-drag-region className={`h-10 flex-none flex items-center justify-between px-3 select-none z-50 border-b ${bgClass} ${borderClass}`}>
                <div data-tauri-drag-region className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className={`text-sm font-medium ${textClass} whitespace-nowrap`}>Restaurant Billing</span>
                </div>

                {/* Navigation Menu - Only on non-auth pages */}
                {!isAuthPage && (
                    <div className="flex-1 flex items-center justify-center px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        <div className="flex items-center gap-1">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : `${textClass} hover:bg-gray-300 dark:hover:bg-gray-700`
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {/* Show theme toggle, notifications, and profile only on Dashboard */}
                    {!isAuthPage && (
                        <div className="flex items-center gap-1">
                            <button onClick={toggleTheme} className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${hoverClass}`} title="Toggle Dark/Light Mode">
                                {theme === 'dark' ? (
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className={`w-5 h-5 ${iconClass}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </button>

                            <div className="relative" ref={notificationRef}>
                                <button onClick={() => setShowNotifications(!showNotifications)} className={`w-10 h-10 flex items-center justify-center rounded transition-colors relative ${hoverClass}`} title="Notifications">
                                    <svg className={`w-5 h-5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                                {showNotifications && (
                                    <div className="absolute top-full right-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Notifications</p>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            <div className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                                                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">New order received</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="relative" ref={profileRef}>
                                <button onClick={() => setShowProfile(!showProfile)} className={`w-10 h-10 flex items-center justify-center rounded transition-colors ${hoverClass}`} title="Profile">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </button>
                                {showProfile && (
                                    <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Admin</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">admin@restaurant.com</p>
                                        </div>
                                        <button className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">My Profile</button>
                                        <button className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Settings</button>
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                        <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Logout</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center">
                        <button onClick={handleMinimize} className={`w-12 h-10 flex items-center justify-center transition-colors ${hoverClass}`} title="Minimize">
                            <svg className={`w-4 h-4 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <button onClick={handleMaximize} className={`w-12 h-10 flex items-center justify-center transition-colors ${hoverClass}`} title="Maximize/Restore">
                            <svg className={`w-3.5 h-3.5 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
                            </svg>
                        </button>
                        <button onClick={handleCloseClick} className={`w-12 h-10 flex items-center justify-center hover:bg-red-600 transition-colors`} title="Close">
                            <svg className={`w-4 h-4 ${iconClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {showCloseConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm w-full mx-4 animate-scale-in">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Close Application?</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Are you sure you want to exit?</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleCloseCancel} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleCloseConfirm} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                                Close App
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TitleBar;
