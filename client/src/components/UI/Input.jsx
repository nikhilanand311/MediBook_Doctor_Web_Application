import React, { forwardRef } from 'react';

const Input = forwardRef(({
    label,
    error,
    icon,
    className = '',
    type = 'text',
    dark = false,
    ...props
}, ref) => {
    const inputClasses = `form-control form-control-custom ${dark ? 'form-control-dark' : ''} ${error ? 'is-invalid' : ''} ${icon ? 'ps-5' : ''} ${className}`;
    const labelClasses = `form-label form-label-custom ${dark ? 'form-label-dark' : ''}`;

    return (
        <div className="w-100">
            {label && (
                <label className={labelClasses}>
                    {label}
                </label>
            )}
            <div className="position-relative">
                {icon && (
                    <div
                        className="position-absolute top-50 translate-middle-y text-secondary"
                        style={{ left: '1rem' }}
                    >
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    type={type}
                    className={inputClasses}
                    {...props}
                />
            </div>
            {error && (
                <div className="invalid-feedback d-block mt-2">
                    {error}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
