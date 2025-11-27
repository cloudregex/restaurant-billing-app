import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { HiCalendar, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const UniversalDatePicker = forwardRef(({
    label,
    id,
    value,
    onChange,
    error,
    disabled,
    required,
    className = '',
    placeholder = 'Select date',
    minDate,
    maxDate,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || '');
    const datePickerRef = useRef(null);
    const [displayDate, setDisplayDate] = useState(value ? new Date(value) : new Date());

    // Handle click outside to close the calendar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Update input value when value prop changes
    useEffect(() => {
        setInputValue(value || '');
        if (value) {
            // Parse date without timezone conversion
            const dateParts = value.split('-');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
            const day = parseInt(dateParts[2], 10);
            setDisplayDate(new Date(year, month, day));
        } else {
            setDisplayDate(new Date());
        }
    }, [value]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // If it's a valid date format, call onChange
        if (newValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
            onChange && onChange({ target: { name: props.name, value: newValue } });
        }
    };

    const handleDateSelect = (date) => {
        // Format date as YYYY-MM-DD without timezone conversion
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setInputValue(formattedDate);
        onChange && onChange({ target: { name: props.name, value: formattedDate } });
        setIsOpen(false);
    };

    const handleToggleCalendar = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = displayDate.getFullYear();
        const month = displayDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

        while (days.length < 42) {
            days.push(new Date(current.getFullYear(), current.getMonth(), current.getDate()));
            current.setDate(current.getDate() + 1);
        }

        return days;
    };

    // Check if date is within min and max range
    const isDateInRange = (date) => {
        if (minDate) {
            // Parse minDate without timezone conversion
            const minDateParts = minDate.split('-');
            const minYear = parseInt(minDateParts[0], 10);
            const minMonth = parseInt(minDateParts[1], 10) - 1; // Month is 0-indexed
            const minDay = parseInt(minDateParts[2], 10);
            const minDateObj = new Date(minYear, minMonth, minDay);
            if (date < minDateObj) return false;
        }
        if (maxDate) {
            // Parse maxDate without timezone conversion
            const maxDateParts = maxDate.split('-');
            const maxYear = parseInt(maxDateParts[0], 10);
            const maxMonth = parseInt(maxDateParts[1], 10) - 1; // Month is 0-indexed
            const maxDay = parseInt(maxDateParts[2], 10);
            const maxDateObj = new Date(maxYear, maxMonth, maxDay);
            if (date > maxDateObj) return false;
        }
        return true;
    };

    // Check if date is selected
    const isSelected = (date) => {
        if (!inputValue) return false;
        // Parse inputValue without timezone conversion
        const dateParts = inputValue.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
        const day = parseInt(dateParts[2], 10);
        const selectedDate = new Date(year, month, day);
        return date.toDateString() === selectedDate.toDateString();
    };

    // Navigation functions
    const navigateMonth = (direction) => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + direction, 1);

        // Ensure the date is within min/max range
        if (minDate) {
            // Parse minDate without timezone conversion
            const minDateParts = minDate.split('-');
            const minYear = parseInt(minDateParts[0], 10);
            const minMonth = parseInt(minDateParts[1], 10) - 1; // Month is 0-indexed
            const minDay = parseInt(minDateParts[2], 10);
            const minDateObj = new Date(minYear, minMonth, minDay);
            if (newDate < minDateObj) {
                newDate.setTime(minDateObj.getTime());
            }
        }
        if (maxDate) {
            // Parse maxDate without timezone conversion
            const maxDateParts = maxDate.split('-');
            const maxYear = parseInt(maxDateParts[0], 10);
            const maxMonth = parseInt(maxDateParts[1], 10) - 1; // Month is 0-indexed
            const maxDay = parseInt(maxDateParts[2], 10);
            const maxDateObj = new Date(maxYear, maxMonth, maxDay);
            if (newDate > maxDateObj) {
                newDate.setTime(maxDateObj.getTime());
            }
        }

        setDisplayDate(newDate);
    };

    const calendarDays = generateCalendarDays();
    const currentMonthYear = displayDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className={`relative  ${className}`} ref={datePickerRef}>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    ref={ref}
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={disabled}
                    readOnly
                    className={`w-full px-4 py-2 pr-12 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white'
                        } ${disabled ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : 'cursor-pointer'} bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900`}
                    onClick={handleToggleCalendar}
                    {...props}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                    onClick={handleToggleCalendar}
                    disabled={disabled}
                >
                    <HiCalendar className="h-5 w-5" />
                </button>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 w-64 border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out transform origin-top scale-100 opacity-100 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={() => navigateMonth(-1)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={minDate && new Date(inputValue) <= new Date(minDate)}
                        >
                            <HiChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <div className="text-base font-semibold text-gray-800 dark:text-gray-200">
                            {currentMonthYear}
                        </div>
                        <button
                            type="button"
                            onClick={() => navigateMonth(1)}
                            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={maxDate && new Date(inputValue) >= new Date(maxDate)}
                        >
                            <HiChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, index) => {
                            const isCurrentMonth = date.getMonth() === displayDate.getMonth() && date.getFullYear() === displayDate.getFullYear();
                            const isInRange = isDateInRange(date);
                            const isDisabled = !isCurrentMonth || !isInRange || disabled;
                            const isToday = date.toDateString() === new Date().toDateString();

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => !isDisabled && handleDateSelect(date)}
                                    className={`text-sm p-1.5 text-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSelected(date)
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : isCurrentMonth
                                            ? 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/50 dark:hover:to-blue-800/50'
                                            : 'text-gray-400 dark:text-gray-500'
                                        } ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${isToday && !isSelected(date) ? 'ring-1 ring-blue-500' : ''}`}
                                    disabled={isDisabled}
                                >
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}
        </div>
    );
});

UniversalDatePicker.displayName = 'UniversalDatePicker';

export default UniversalDatePicker;