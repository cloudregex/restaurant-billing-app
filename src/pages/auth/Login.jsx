import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [pin, setPin] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    const handleChange = (index, value) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const newPin = [...pin];
        for (let i = 0; i < pastedData.length; i++) {
            newPin[i] = pastedData[i];
        }
        setPin(newPin);

        const focusIndex = Math.min(pastedData.length, 3);
        inputRefs[focusIndex].current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPin = pin.join('');
        if (fullPin.length !== 4) {
            alert('Please enter 4-digit PIN');
            return;
        }
        console.log('Login PIN:', fullPin);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <div className="relative z-10 min-h-full flex flex-col items-center justify-center py-40">
                <div className="flex flex-col items-center">
                    <div className="mb-6">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
                            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-3xl font-light text-white mb-8">Restaurant Admin</h2>

                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="mb-6">
                            <div className="flex justify-center gap-4 mb-4">
                                {pin.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="password"
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        className="w-16 h-16 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-center text-3xl font-light focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-200 shadow-lg"
                                        maxLength="1"
                                        inputMode="numeric"
                                        pattern="\d"
                                        required
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="flex gap-6 mt-8">
                        <Link to="/forgot-password" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                            I forgot my PIN
                        </Link>
                        <span className="text-white/40">|</span>
                        <Link to="/register" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                            Create account
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

export default Login;
