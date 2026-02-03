import React from 'react';
import SectionTitle from '../UI/SectionTitle';

const features = [
    {
        icon: (
            <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Easy Scheduling',
        description: 'Book appointments with your preferred doctor in just a few clicks. Choose your convenient time slot.',
        color: 'sky'
    },
    {
        icon: (
            <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Video Consultation',
        description: 'Connect with doctors from anywhere through secure HD video calls. Get expert advice from home.',
        color: 'violet'
    },
    {
        icon: (
            <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: 'Digital Records',
        description: 'Access your complete medical history, prescriptions, and test results anytime, anywhere.',
        color: 'cyan'
    },
    {
        icon: (
            <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        title: 'E-Prescription',
        description: 'Receive digital prescriptions directly from your doctor. Easy to access and share with pharmacies.',
        color: 'emerald'
    },
    {
        icon: (
            <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: '24/7 Support',
        description: 'Our healthcare team is available round the clock for emergencies and health queries.',
        color: 'amber'
    },
    {
        icon: (
            <svg style={{ width: '1.75rem', height: '1.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Secure & Private',
        description: 'Your health data is protected with enterprise-grade encryption and strict privacy policies.',
        color: 'rose'
    }
];

const colorStyles = {
    sky: {
        bg: 'rgba(14, 165, 233, 0.1)',
        text: '#0ea5e9'
    },
    violet: {
        bg: 'rgba(139, 92, 246, 0.1)',
        text: '#8b5cf6'
    },
    cyan: {
        bg: 'rgba(6, 182, 212, 0.1)',
        text: '#06b6d4'
    },
    emerald: {
        bg: 'rgba(16, 185, 129, 0.1)',
        text: '#10b981'
    },
    amber: {
        bg: 'rgba(245, 158, 11, 0.1)',
        text: '#f59e0b'
    },
    rose: {
        bg: 'rgba(244, 63, 94, 0.1)',
        text: '#f43f5e'
    }
};

const FeaturesSection = () => {
    return (
        <section id="features" className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
            {/* Background Elements */}
            <div className="position-absolute top-0 start-0 end-0 bottom-0">
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        top: '25%',
                        right: 0,
                        width: '24rem',
                        height: '24rem',
                        backgroundColor: 'rgba(14, 165, 233, 0.05)',
                        filter: 'blur(100px)'
                    }}
                />
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        bottom: 0,
                        left: '25%',
                        width: '20rem',
                        height: '20rem',
                        backgroundColor: 'rgba(139, 92, 246, 0.05)',
                        filter: 'blur(100px)'
                    }}
                />
            </div>

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <SectionTitle
                    badge="Why Choose Us"
                    title="Features That Make Healthcare Simple"
                    description="We combine cutting-edge technology with compassionate care to provide you with the best healthcare experience possible."
                />

                <div className="row g-4">
                    {features.map((feature, index) => {
                        const colors = colorStyles[feature.color];
                        return (
                            <div key={index} className="col-md-6 col-lg-4">
                                <div
                                    className="p-4 rounded-4 h-100 card-glass-light card-hover-lift"
                                    style={{
                                        transition: 'all 0.5s ease',
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    {/* Icon */}
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 mb-4"
                                        style={{
                                            width: '3.5rem',
                                            height: '3.5rem',
                                            backgroundColor: colors.bg,
                                            color: colors.text,
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        {feature.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="h5 fw-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        {feature.title}
                                    </h3>
                                    <p className="mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {feature.description}
                                    </p>

                                    {/* Hover Arrow */}
                                    <div className="d-flex align-items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                                        <span className="small fw-medium">Learn more</span>
                                        <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
