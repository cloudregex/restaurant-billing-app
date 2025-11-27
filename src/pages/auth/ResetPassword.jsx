import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [newPin, setNewPin] = useState(['', '', '', '']);
    const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
    const newPinRefs = [useRef(), useRef(), useRef(), useRef()];
    const confirmPinRefs = [useRef(), useRef(), useRef(), useRef()];

    const handlePinChange = (index, value, isNewPin = true) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const refs = isNewPin ? newPinRefs : confirmPinRefs;
        const setter = isNewPin ? setNewPin : setConfirmPin;
        const currentPin = isNewPin ? newPin : confirmPin;

        const newPinArray = [...currentPin];
        newPinArray[index] = value;
        setter(newPinArray);

        if (value && index < 3) {
            refs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e, isNewPin = true) => {
        const refs = isNewPin ? newPinRefs : confirmPinRefs;
        const currentPin = isNewPin ? newPin : confirmPin;

        if (e.key === 'Backspace' && !currentPin[index] && index > 0) {
            refs[index - 1].current.focus();
        }
    };

    const handlePaste = (e, isNewPin = true) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const refs = isNewPin ? newPinRefs : confirmPinRefs;
        const setter = isNewPin ? setNewPin : setConfirmPin;
        const currentPin = isNewPin ? newPin : confirmPin;

        const newPinArray = [...currentPin];
        for (let i = 0; i < pastedData.length; i++) {
            newPinArray[i] = pastedData[i];
        }
        setter(newPinArray);

        const focusIndex = Math.min(pastedData.length, 3);
        refs[focusIndex].current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullNewPin = newPin.join('');
        const fullConfirmPin = confirmPin.join('');

        if (fullNewPin.length !== 4) {
            alert('PIN must be 4 digits');
            return;
        }
        if (fullNewPin !== fullConfirmPin) {
            alert('PINs do not match!');
            return;
        }
        console.log('Reset PIN:', fullNewPin);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <button
                onClick={() => navigate('/otp')}
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
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
                            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-light text-white mb-8">Reset PIN</h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div>
                            <label className="block text-white/80 text-sm mb-3 text-center">New PIN</label>
                            <div className="flex justify-center gap-3">
                                {newPin.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={newPinRefs[index]}
                                        type="password"
                                        value={digit}
                                        onChange={(e) => handlePinChange(index, e.target.value, true)}
                                        onKeyDown={(e) => handleKeyDown(index, e, true)}
                                        onPaste={index === 0 ? (e) => handlePaste(e, true) : undefined}
                                        className="w-14 h-14 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-center text-2xl font-light focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-200 shadow-lg"
                                        maxLength="1"
                                        inputMode="numeric"
                                        pattern="\d"
                                        required
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/80 text-sm mb-3 text-center">Confirm PIN</label>
                            <div className="flex justify-center gap-3 mb-6">
                                {confirmPin.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={confirmPinRefs[index]}
                                        type="password"
                                        value={digit}
                                        onChange={(e) => handlePinChange(index, e.target.value, false)}
                                        onKeyDown={(e) => handleKeyDown(index, e, false)}
                                        onPaste={index === 0 ? (e) => handlePaste(e, false) : undefined}
                                        className="w-14 h-14 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl text-white text-center text-2xl font-light focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all duration-200 shadow-lg"
                                        maxLength="1"
                                        inputMode="numeric"
                                        pattern="\d"
                                        required
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg"
                        >
                            Reset PIN
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

export default ResetPassword;
