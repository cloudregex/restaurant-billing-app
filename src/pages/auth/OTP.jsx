import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const from = location.state?.from || 'register';

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs[focusIndex].current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) {
            alert('Please enter 6-digit OTP');
            return;
        }
        console.log('OTP:', fullOtp);

        if (from === 'forgot-password') {
            navigate('/reset-password');
        } else {
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (from === 'forgot-password') {
            navigate('/forgot-password');
        } else {
            navigate('/register');
        }
    };

    return (
        <div className="min-h-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <button
                onClick={handleBack}
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
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
                            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-light text-white mb-2">Verify OTP</h2>
                    <p className="text-white/70 text-sm mb-8">Enter the code sent to your mobile</p>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex justify-center gap-2 mb-6">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs[index]}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className="w-12 h-14 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-center text-2xl font-light focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-200 shadow-lg"
                                    maxLength="1"
                                    inputMode="numeric"
                                    pattern="\d"
                                    required
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
                        >
                            Verify & Continue
                        </button>
                    </form>
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/60 text-sm">Restaurant Billing System.  Version 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default OTP;
