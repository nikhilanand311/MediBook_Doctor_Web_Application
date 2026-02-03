import React, { useState, useEffect, useRef } from 'react';

const stats = [
    {
        value: 500,
        suffix: '+',
        label: 'Expert Doctors',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        color: 'sky'
    },
    {
        value: 50000,
        suffix: '+',
        label: 'Happy Patients',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'violet'
    },
    {
        value: 100000,
        suffix: '+',
        label: 'Appointments',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        color: 'cyan'
    },
    {
        value: 98,
        suffix: '%',
        label: 'Satisfaction Rate',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        color: 'emerald'
    }
];

const colorStyles = {
    sky: {
        bg: 'rgba(14, 165, 233, 0.1)',
        text: '#0ea5e9',
        glow: 'rgba(14, 165, 233, 0.2)'
    },
    violet: {
        bg: 'rgba(139, 92, 246, 0.1)',
        text: '#8b5cf6',
        glow: 'rgba(139, 92, 246, 0.2)'
    },
    cyan: {
        bg: 'rgba(6, 182, 212, 0.1)',
        text: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.2)'
    },
    emerald: {
        bg: 'rgba(16, 185, 129, 0.1)',
        text: '#10b981',
        glow: 'rgba(16, 185, 129, 0.2)'
    }
};

const CountUp = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
        }
        return num.toString();
    };

    return (
        <span ref={ref}>
            {formatNumber(count)}{suffix}
        </span>
    );
};

const StatsSection = () => {
    return (
        <section className="py-5 position-relative overflow-hidden" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            {/* Background */}
            <div
                className="position-absolute top-0 start-0 end-0 bottom-0"
                style={{
                    background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.05))'
                }}
            />

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <div className="row g-4">
                    {stats.map((stat, index) => {
                        const colors = colorStyles[stat.color];
                        return (
                            <div key={index} className="col-6 col-lg-3 text-center">
                                {/* Icon */}
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3 mx-auto mb-3"
                                    style={{
                                        width: '4rem',
                                        height: '4rem',
                                        backgroundColor: colors.bg,
                                        color: colors.text,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {stat.icon}
                                </div>

                                {/* Value */}
                                <h3 className="display-6 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </h3>

                                {/* Label */}
                                <p className="mb-0 fw-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
