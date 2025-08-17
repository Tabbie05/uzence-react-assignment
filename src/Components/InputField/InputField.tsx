import React, { useState, useId } from 'react';
import clsx from 'clsx';

export type InputFieldProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number';
  clearable?: boolean;
  passwordToggle?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  required?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable = false,
  passwordToggle = false,
  className,
  id,
  name,
  autoFocus,
  required,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || useId();
  const helpId = helperText || errorMessage ? `${inputId}-help` : undefined;

  const handleClear = () => {
    if (!disabled && onChange) {
      const event = {
        target: { value: '' },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const getInputClasses = () => {
    return clsx(
      'w-full transition-all duration-200 outline-none font-medium',
      
      // Size variants
      {
        'text-sm px-3 py-2 rounded-md': size === 'sm',
        'text-base px-4 py-3 rounded-lg': size === 'md',
        'text-lg px-5 py-4 rounded-xl': size === 'lg',
      },

      // Variant styles
      {
        // Filled variant
        'bg-gray-100 dark:bg-gray-800 border border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400': 
          variant === 'filled' && !disabled && !invalid,
        'hover:bg-gray-50 dark:hover:bg-gray-750 focus:bg-white dark:focus:bg-gray-900': 
          variant === 'filled' && !disabled && !invalid,
        
        // Outlined variant
        'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400': 
          variant === 'outlined' && !disabled && !invalid,
        'hover:border-gray-400 dark:hover:border-gray-500': 
          variant === 'outlined' && !disabled && !invalid,
        
        // Ghost variant
        'bg-transparent border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800': 
          variant === 'ghost' && !disabled && !invalid,
      },

      // Focus states
      {
        'ring-2 ring-blue-500/20 border-blue-500 dark:ring-blue-400/20 dark:border-blue-400': 
          focused && !invalid && !disabled && variant !== 'ghost',
        'ring-2 ring-blue-500/20 bg-gray-50 dark:bg-gray-800 dark:ring-blue-400/20': 
          focused && !invalid && !disabled && variant === 'ghost',
      },

      // Invalid states
      {
        'border-red-500 dark:border-red-400 ring-2 ring-red-500/20 dark:ring-red-400/20': 
          invalid && !disabled,
        'bg-red-50 dark:bg-red-900/10': 
          invalid && !disabled && variant === 'filled',
      },

      // Disabled states
      {
        'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500': 
          disabled,
      },

      // Padding adjustments for buttons
      {
        'pr-12': (clearable && value && !disabled) || ((type === 'password' || passwordToggle) && !disabled),
        'pr-16': (clearable && value && !disabled) && ((type === 'password' || passwordToggle) && !disabled),
        'pr-10': loading && !((clearable && value) || (type === 'password' || passwordToggle)),
      },
      
      className
    );
  };

  const actualInputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col space-y-2" data-variant={variant} data-size={size}>
      {label && (
        <label
          htmlFor={inputId}
          className={clsx(
            'text-sm font-semibold select-none',
            disabled 
              ? 'text-gray-400 dark:text-gray-500' 
              : 'text-gray-700 dark:text-gray-300'
          )}
        >
          {label}
          {required && (
            <span 
              className="ml-1 text-red-500 dark:text-red-400" 
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        <input
          type={actualInputType}
          id={inputId}
          name={name}
          className={getInputClasses()}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={invalid}
          aria-describedby={helpId}
          aria-disabled={disabled}
          aria-busy={loading}
          autoFocus={autoFocus}
          required={required}
        />
        
        {/* Button container */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {/* Loading spinner */}
          {loading && (
            <div 
              className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"
              aria-label="Loading"
              role="status"
            />
          )}
          
          {/* Clear button */}
          {clearable && value && !disabled && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors"
              tabIndex={0}
              aria-label="Clear input"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Password toggle */}
          {(passwordToggle || type === 'password') && !disabled && !loading && (
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors"
              tabIndex={0}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-1.414-1.414M14.12 14.12l1.414 1.414M14.12 14.12L18 18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Helper text or error message */}
      {(errorMessage || helperText) && (
        <div 
          id={helpId} 
          className={clsx(
            'text-sm',
            errorMessage 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-600 dark:text-gray-400'
          )}
          role={errorMessage ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
};

export default InputField;