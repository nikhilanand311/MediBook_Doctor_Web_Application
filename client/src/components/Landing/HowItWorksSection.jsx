import React from 'react';
import SectionTitle from '../UI/SectionTitle';

const steps = [
    {
        number: '01',
        title: 'Create Account',
        description: 'Sign up with your email or phone number. Complete your health profile for personalized care.',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
        ),
        color: 'sky'
    },
    {
        number: '02',
        title: 'Find Your Doctor',
        description: 'Browse through our network of certified specialists. Filter by specialty, rating, and availability.',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        color: 'violet'
    },
    {
        number: '03',
        title: 'Book Appointment',
        description: 'Choose your preferred date and time slot. Get instant confirmation for your appointment.',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        color: 'cyan'
    },
    {
        number: '04',
        title: 'Get Treatment',
        description: 'Consult via video call or visit in-person. Receive prescriptions and follow-up care digitally.',
        icon: (
            <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: 'emerald'
    }
];

const colorStyles = {
    sky: {
        bg: '#0ea5e9',
        bgLight: 'rgba(14, 165, 233, 0.1)',
        text: '#0ea5e9',
        shadow: 'rgba(14, 165, 233, 0.3)'
    },
    violet: {
        bg: '#8b5cf6',
        bgLight: 'rgba(139, 92, 246, 0.1)',
        text: '#8b5cf6',
        shadow: 'rgba(139, 92, 246, 0.3)'
    },
    cyan: {
        bg: '#06b6d4',
        bgLight: 'rgba(6, 182, 212, 0.1)',
        text: '#06b6d4',
        shadow: 'rgba(6, 182, 212, 0.3)'
    },
    emerald: {
        bg: '#10b981',
        bgLight: 'rgba(16, 185, 129, 0.1)',
        text: '#10b981',
        shadow: 'rgba(16, 185, 129, 0.3)'
    }
};

const HowItWorksSection = () => {
    return (
        <section className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'linear-gradient(180deg, transparent 0%, rgba(241, 245, 249, 0.5) 50%, transparent 100%)' }}>
            <div className="container position-relative" style={{ zIndex: 10 }}>
                <SectionTitle
                    badge="How It Works"
                    title="Getting Started is Easy"
                    description="Follow these simple steps to access quality healthcare from anywhere. Your health journey is just a few clicks away."
                />

                <div className="position-relative">
                    {/* Connection Line (Desktop) */}
                    <div className="d-none d-lg-block position-absolute start-0 end-0" style={{ top: '7rem', height: '2px' }}>
                        <div
                            className="w-100 h-100"
                            style={{
                                background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6, #06b6d4, #10b981)',
                                opacity: 0.3
                            }}
                        />
                    </div>

                    <div className="row g-4">
                        {steps.map((step, index) => {
                            const colors = colorStyles[step.color];
                            return (
                                <div key={index} className="col-md-6 col-lg-3 position-relative">
                                    {/* Step Card */}
                                    <div
                                        className="p-4 rounded-4 glass-card card-hover-lift"
                                        style={{ transition: 'all 0.5s ease' }}
                                    >
                                        {/* Number Badge */}
                                        <div
                                            className="position-absolute d-flex align-items-center justify-content-center rounded-3 text-white fw-bold small"
                                            style={{
                                                top: '-1rem',
                                                left: '1.5rem',
                                                width: '2.5rem',
                                                height: '2.5rem',
                                                backgroundColor: colors.bg,
                                                boxShadow: `0 4px 15px ${colors.shadow}`
                                            }}
                                        >
                                            {step.number}
                                        </div>

                                        {/* Icon */}
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-3 mt-3 mb-4"
                                            style={{
                                                width: '4rem',
                                                height: '4rem',
                                                backgroundColor: colors.bgLight,
                                                color: colors.text,
                                                transition: 'transform 0.3s ease'
                                            }}
                                        >
                                            {step.icon}
                                        </div>

                                        {/* Content */}
                                        <h3 className="h5 fw-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                                            {step.title}
                                        </h3>
                                        <p className="mb-0" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Arrow (Desktop Only) */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className="d-none d-lg-block position-absolute"
                                            style={{
                                                top: '7rem',
                                                right: '-1rem',
                                                zIndex: 10,
                                                transform: 'translateX(50%)'
                                            }}
                                        >
                                            <svg style={{ width: '2rem', height: '2rem', color: 'rgba(255, 255, 255, 0.2)' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
