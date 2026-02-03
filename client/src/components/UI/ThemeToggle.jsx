import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`btn p-0 border position-relative ${className}`}
            style={{
                width: '3.5rem',
                height: '1.75rem',
                borderRadius: '9999px',
                backgroundColor: isDark ? '#334155' : '#e0f2fe',
                borderColor: isDark ? '#475569' : '#bae6fd',
                transition: 'all 0.3s ease'
            }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Toggle Circle */}
            <div
                className="position-absolute rounded-circle d-flex align-items-center justify-content-center"
                style={{
                    top: '2px',
                    left: isDark ? '2px' : 'calc(100% - 26px)',
                    width: '1.5rem',
                    height: '1.5rem',
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                }}
            >
                {/* Sun Icon */}
                <svg
                    style={{
                        width: '1rem',
                        height: '1rem',
                        color: '#eab308',
                        opacity: isDark ? 0 : 1,
                        transform: isDark ? 'scale(0)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        position: 'absolute'
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                    />
                </svg>

                {/* Moon Icon */}
                <svg
                    style={{
                        width: '1rem',
                        height: '1rem',
                        color: '#fde047',
                        opacity: isDark ? 1 : 0,
                        transform: isDark ? 'scale(1)' : 'scale(0)',
                        transition: 'all 0.3s ease',
                        position: 'absolute'
                    }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            </div>
        </button>
    );
};

export default ThemeToggle;
