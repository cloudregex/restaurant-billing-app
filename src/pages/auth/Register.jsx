import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Step 1: Mobile, Step 2: PIN
    const [mobile, setMobile] = useState('');
    const [pin, setPin] = useState(['', '', '', '']);
    const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
    const pinRefs = [useRef(), useRef(), useRef(), useRef()];
    const confirmPinRefs = [useRef(), useRef(), useRef(), useRef()];

    const handlePinChange = (index, value, isPinField = true) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const refs = isPinField ? pinRefs : confirmPinRefs;
        const setter = isPinField ? setPin : setConfirmPin;
        const currentPin = isPinField ? pin : confirmPin;

        const newPin = [...currentPin];
        newPin[index] = value;
        setter(newPin);

        if (value && index < 3) {
            refs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e, isPinField = true) => {
        const refs = isPinField ? pinRefs : confirmPinRefs;
        const currentPin = isPinField ? pin : confirmPin;

        if (e.key === 'Backspace' && !currentPin[index] && index > 0) {
            refs[index - 1].current.focus();
        }
    };

    const handlePaste = (e, isPinField = true) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);
        if (!/^\d+$/.test(pastedData)) return;

        const refs = isPinField ? pinRefs : confirmPinRefs;
        const setter = isPinField ? setPin : setConfirmPin;
        const currentPin = isPinField ? pin : confirmPin;

        const newPin = [...currentPin];
        for (let i = 0; i < pastedData.length; i++) {
            newPin[i] = pastedData[i];
        }
        setter(newPin);

        const focusIndex = Math.min(pastedData.length, 3);
        refs[focusIndex].current.focus();
    };

    const handleMobileNext = (e) => {
        e.preventDefault();
        if (!mobile || mobile.length < 10) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPin = pin.join('');
        const fullConfirmPin = confirmPin.join('');

        if (fullPin.length !== 4) {
            alert('PIN must be 4 digits');
            return;
        }
        if (fullPin !== fullConfirmPin) {
            alert('PINs do not match!');
            return;
        }
        console.log('Register Data:', { mobile, pin: fullPin });
        navigate('/otp', { state: { from: 'register', mobile } });
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            navigate('/');
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
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white/20">
                            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-light text-white mb-2">Create New Account</h2>
                    <p className="text-white/60 text-sm mb-8">Step {step} of 2</p>

                    {step === 1 ? (
                        // Step 1: Mobile Number
                        <form onSubmit={handleMobileNext} className="w-full space-y-6">
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
                                Next
                            </button>

                            <div className="text-center mt-4">
                                <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                                    Already have an account? Sign in
                                </Link>
                            </div>
                        </form>
                    ) : (
                        // Step 2: PIN
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="text-center mb-4">
                                <p className="text-white/70 text-sm">Mobile: {mobile}</p>
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm mb-3 text-center">Create PIN</label>
                                <div className="flex justify-center gap-3 mb-4">
                                    {pin.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={pinRefs[index]}
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
                                Register
                            </button>
                        </form>
                    )}
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/60 text-sm">Restaurant Billing System.  Version 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
