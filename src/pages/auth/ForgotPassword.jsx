import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mobile || mobile.length < 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        console.log('Forgot PIN Mobile:', mobile);
        navigate('/otp', { state: { from: 'forgot-password', mobile } });
    };

    return (
        <div className="min-h-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
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

            <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-40">
                <div className="flex flex-col items-center w-full max-w-md">
                    <div className="mb-6">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
                            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-light text-white mb-8">Forgot PIN</h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div>
                            <label className="block text-white/80 text-sm mb-3 text-center">Mobile Number</label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-full bg-white/10 backdrop-blur-md border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-200 shadow-lg text-center text-lg"
                                placeholder="Enter 10-digit mobile number"
                                maxLength="10"
                                inputMode="numeric"
                                pattern="[0-9]{10}"
                                required
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
                        >
                            Send OTP
                        </button>
                    </form>

                    <div className="mt-6">
                        <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                            Back to Sign in
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/60 text-sm">Restaurant Billing System.  Version 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
