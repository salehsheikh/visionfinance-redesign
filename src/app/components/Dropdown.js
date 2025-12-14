'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Dropdown({
    label,
    value,
    options = [],
    placeholder = 'Select...',
    onChange,
    onClear,
    disabled = false,
    className = '',
    formatLabel = (value) => value
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown  clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const displayValue = value ? formatLabel(value) : placeholder;

    return (
        <div className={`relative  ${className}`} ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    w-full px-3 py-2.5 cursor-pointer border rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    flex items-center justify-between
                    transition-colors
                    ${disabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                        : value
                            ? 'border-gray-300 bg-white text-gray-800 hover:border-gray-400'
                            : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400'
                    }
                `}
            >
                <span className={`truncate ${value ? 'font-medium' : ''}`}>
                    {displayValue}
                </span>

                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="py-1">
                        {/* Reset  */}
                        <button
                            type="button"
                            onClick={() => {
                                onClear();
                                setIsOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            {placeholder}
                        </button>

                        {options.map((option) => {
                            const optionValue =
                                typeof option === 'object' ? option.value : option;
                            const optionLabel =
                                typeof option === 'object' ? option.label : option;

                            return (
                                <button
                                    key={optionValue}
                                    type="button"
                                    onClick={() => handleSelect(optionValue)}
                                    className={`
                                        w-full px-3 py-2 text-left transition-colors
                                        ${optionValue === value
                                            ? 'bg-blue-50 text-blue-700 font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {optionLabel}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
