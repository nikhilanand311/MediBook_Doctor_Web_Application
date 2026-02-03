import React from 'react';
import Button from '../UI/Button';

const AboutSection = () => {
    const services = [
        { name: 'Cardiology', icon: '❤️' },
        { name: 'Neurology', icon: '🧠' },
        { name: 'Orthopedics', icon: '🦴' },
        { name: 'Pediatrics', icon: '👶' },
        { name: 'Dermatology', icon: '🩺' },
        { name: 'Dental Care', icon: '🦷' },
        { name: 'Eye Care', icon: '👁️' },
        { name: 'General Medicine', icon: '💊' },
    ];

    return (
        <section id="about" className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
            {/* Background */}
            <div className="position-absolute top-0 start-0 end-0 bottom-0">
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        top: 0,
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50rem',
                        height: '50rem',
                        backgroundColor: 'rgba(14, 165, 233, 0.05)',
                        filter: 'blur(120px)'
                    }}
                />
            </div>

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <div className="row g-5 align-items-center">
                    {/* Left - Image/Visual */}
                    <div className="col-lg-6 position-relative">
                        {/* Main Image Container */}
                        <div className="position-relative rounded-4 overflow-hidden">
                            <div
                                className="rounded-4"
                                style={{
                                    aspectRatio: '4/5',
                                    background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-dark) 100%)',
                                    border: '1px solid var(--glass-border)'
                                }}
                            >
                                {/* Medical Icon Grid */}
                                <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center p-4">
                                    <div className="row g-3 w-100">
                                        {[
                                            { icon: '🏥', label: 'Modern Facilities' },
                                            { icon: '👨‍⚕️', label: 'Expert Doctors' },
                                            { icon: '🔬', label: 'Advanced Tech' },
                                            { icon: '💙', label: 'Patient Care' },
                                        ].map((item, i) => (
                                            <div key={i} className="col-6">
                                                <div
                                                    className="p-4 rounded-3 d-flex flex-column align-items-center gap-2 text-center card-glass-light"
                                                    style={{ transition: 'all 0.3s ease' }}
                                                >
                                                    <span style={{ fontSize: '2.5rem' }}>{item.icon}</span>
                                                    <span className="fw-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div
                            className="position-absolute rounded-3"
                            style={{
                                top: '-1rem',
                                left: '-1rem',
                                width: '6rem',
                                height: '6rem',
                                border: '2px solid rgba(14, 165, 233, 0.3)'
                            }}
                        />
                        <div
                            className="position-absolute rounded-circle"
                            style={{
                                bottom: '-1rem',
                                left: '25%',
                                width: '4rem',
                                height: '4rem',
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                filter: 'blur(20px)'
                            }}
                        />
                    </div>

                    {/* Right - Content */}
                    <div className="col-lg-6">
                        <span
                            className="d-inline-block px-3 py-2 mb-3 rounded-pill small fw-medium"
                            style={{
                                color: '#0ea5e9',
                                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                                border: '1px solid rgba(14, 165, 233, 0.2)'
                            }}
                        >
                            About Us
                        </span>

                        <h2 className="display-5 fw-bold mb-4" style={{ lineHeight: 1.2, color: 'var(--text-primary)' }}>
                            Dedicated to Your
                            <span className="d-block text-gradient-primary">
                                Health & Wellness
                            </span>
                        </h2>

                        <p className="fs-5 mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            At MedCare, we believe healthcare should be accessible, convenient, and personalized.
                            Our platform connects you with top-rated doctors and provides comprehensive healthcare
                            services at your fingertips.
                        </p>

                        <p className="mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            With state-of-the-art technology and a patient-first approach, we're transforming
                            the way you experience healthcare. From online consultations to home visits,
                            we've got you covered.
                        </p>

                        {/* Services Grid */}
                        <div className="row g-2 mb-4">
                            {services.map((service, i) => (
                                <div key={i} className="col-3">
                                    <div
                                        className="p-2 rounded-3 text-center card-glass-light"
                                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                    >
                                        <span style={{ fontSize: '1.5rem' }} className="d-block mb-1">{service.icon}</span>
                                        <span className="d-block" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {service.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="primary" size="lg">
                            Learn More About Us
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
