import React, { useState, useRef, useEffect } from "react";

const UniversalTimePicker = ({
    label,
    id,
    name,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    loading = false,
    className = "",
}) => {
    const [open, setOpen] = useState(false);
    const pickerRef = useRef(null);

    // --- Helpers ---
    const getCurrentTime = () => {
        const now = new Date();
        let hh = now.getHours();
        let mm = String(now.getMinutes()).padStart(2, "0");
        let period = hh >= 12 ? "PM" : "AM";

        hh = hh % 12 || 12;
        hh = String(hh).padStart(2, "0");

        return `${hh}:${mm} ${period}`;
    };

    // Default load current time
    useEffect(() => {
        if (!value) {
            onChange({
                target: {
                    name,
                    value: getCurrentTime(),
                },
            });
        }
    }, []);

    const parseTime = (val) => {
        if (!val) return { hh: "12", mm: "00", period: "AM" };
        const [time, period] = val.split(" ");
        const [h, m] = time.split(":");
        return { hh: h, mm: m, period };
    };

    const { hh, mm, period } = parseTime(value);

    // Update time
    const updateTime = (part, newVal) => {
        const updated = { hh, mm, period, [part]: newVal };
        onChange({
            target: {
                name, // ✅ Include name
                value: `${updated.hh}:${updated.mm} ${updated.period}`,
            },
        });
    };

    // Proper outside click detection (safe with modals)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => document.removeEventListener("click", handleClickOutside, true);
    }, []);

    if (loading) {
        return (
            <div className={`relative mb-4 ${className}`}>
                {label && (
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                )}
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className={`relative mb-4 ${className}`} ref={pickerRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* INPUT BUTTON */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setOpen(!open)}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-lg border 
          shadow-sm transition 
          ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
          ${disabled
                        ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-500 dark:text-gray-400"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
            >
                {value || "Select time"}
                <span>🕒</span>
            </button>

            {/* DROPDOWN */}
            {open && !disabled && (
                <>
                    {/* Keeps dropdown visually above modals */}
                    <div
                        className="
              absolute z-[99999]
              mt-2 w-full 
              bg-white dark:bg-gray-800 
              border border-gray-300 dark:border-gray-700 
              rounded-lg shadow-lg p-3 
              grid grid-cols-3 gap-2
            "
                    >
                        {/* HOURS */}
                        <div className="max-h-48 overflow-auto">
                            {Array.from({ length: 12 }, (_, i) => {
                                const hour = String(i + 1).padStart(2, "0");
                                return (
                                    <div
                                        key={hour}
                                        onClick={() => updateTime("hh", hour)}
                                        className={`cursor-pointer px-2 py-1 rounded
                      ${hh === hour
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                                            }`}
                                    >
                                        {hour}
                                    </div>
                                );
                            })}
                        </div>

                        {/* MINUTES */}
                        <div className="max-h-48 overflow-auto">
                            {Array.from({ length: 60 }, (_, m) => {
                                const minute = String(m).padStart(2, "0");
                                return (
                                    <div
                                        key={minute}
                                        onClick={() => updateTime("mm", minute)}
                                        className={`cursor-pointer px-2 py-1 rounded
                      ${mm === minute
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                                            }`}
                                    >
                                        {minute}
                                    </div>
                                );
                            })}
                        </div>

                        {/* AM/PM */}
                        <div className="flex flex-col gap-2">
                            {["AM", "PM"].map((p) => (
                                <div
                                    key={p}
                                    onClick={() => updateTime("period", p)}
                                    className={`cursor-pointer px-2 py-2 rounded text-center
                    ${period === p
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                                        }`}
                                >
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export default UniversalTimePicker;