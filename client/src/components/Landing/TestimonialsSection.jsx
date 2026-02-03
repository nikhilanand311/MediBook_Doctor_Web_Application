import React, { useState, useEffect } from 'react';
import SectionTitle from '../UI/SectionTitle';

const testimonials = [
    {
        name: 'Priya Sharma',
        role: 'IT Professional',
        image: 'PS',
        rating: 5,
        text: 'The video consultation feature is a game-changer. I got expert medical advice without leaving my home. The doctors are incredibly professional and caring.',
        color: '#f43f5e, #ec4899'
    },
    {
        name: 'Rajesh Kumar',
        role: 'Business Owner',
        image: 'RK',
        rating: 5,
        text: 'Booking appointments is so easy now. No more waiting in long queues. The app sends timely reminders too. Highly recommended for busy professionals.',
        color: '#0ea5e9, #06b6d4'
    },
    {
        name: 'Anita Desai',
        role: 'Teacher',
        image: 'AD',
        rating: 5,
        text: 'Found an excellent pediatrician for my daughter through MedCare. The doctor profile with ratings helped me make an informed decision. Great service!',
        color: '#8b5cf6, #a855f7'
    },
    {
        name: 'Suresh Patel',
        role: 'Engineer',
        image: 'SP',
        rating: 5,
        text: 'The digital prescription feature is fantastic. I can access my prescriptions anytime and share them with any pharmacy. Very convenient!',
        color: '#10b981, #14b8a6'
    },
    {
        name: 'Meera Reddy',
        role: 'Homemaker',
        image: 'MR',
        rating: 5,
        text: 'Managing health records for my entire family is now easy with MedCare. Everything is organized and accessible in one place. Love it!',
        color: '#f59e0b, #f97316'
    }
];

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const goTo = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    return (
        <section id="testimonials" className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
            {/* Background */}
            <div className="position-absolute top-0 start-0 end-0 bottom-0">
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50rem',
                        height: '50rem',
                        backgroundColor: 'rgba(139, 92, 246, 0.05)',
                        filter: 'blur(120px)'
                    }}
                />
            </div>

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <SectionTitle
                    badge="Testimonials"
                    title="What Our Patients Say"
                    description="Real stories from real patients. See how MedCare is transforming healthcare experiences."
                />

                <div className="mx-auto" style={{ maxWidth: '56rem' }}>
                    {/* Main Testimonial Card */}
                    <div className="position-relative">
                        <div
                            className="p-4 p-md-5 rounded-4 glass-card"
                            style={{ transition: 'all 0.5s ease' }}
                        >
                            {/* Quote Icon */}
                            <div
                                className="position-absolute d-flex align-items-center justify-content-center rounded-3"
                                style={{
                                    top: '-1rem',
                                    left: '2rem',
                                    width: '3rem',
                                    height: '3rem',
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
                                }}
                            >
                                <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            {/* Stars */}
                            <div className="d-flex gap-1 mb-4 justify-content-center">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <svg key={i} style={{ width: '1.5rem', height: '1.5rem', color: '#facc15' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="fs-5 text-center mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                "{testimonials[currentIndex].text}"
                            </p>

                            {/* Author */}
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                    style={{
                                        width: '3.5rem',
                                        height: '3.5rem',
                                        background: `linear-gradient(135deg, ${testimonials[currentIndex].color})`
                                    }}
                                >
                                    {testimonials[currentIndex].image}
                                </div>
                                <div>
                                    <h4 className="mb-0 fw-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="mb-0" style={{ color: 'var(--text-muted)' }}>
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prev}
                            className="btn position-absolute rounded-circle d-flex align-items-center justify-content-center glass-card"
                            style={{
                                left: 0,
                                top: '50%',
                                transform: 'translate(-1rem, -50%)',
                                width: '3rem',
                                height: '3rem',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="btn position-absolute rounded-circle d-flex align-items-center justify-content-center glass-card"
                            style={{
                                right: 0,
                                top: '50%',
                                transform: 'translate(1rem, -50%)',
                                width: '3rem',
                                height: '3rem',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="d-flex justify-content-center gap-2 mt-4">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                className="btn p-0 rounded-pill"
                                style={{
                                    width: currentIndex === index ? '2rem' : '0.75rem',
                                    height: '0.75rem',
                                    backgroundColor: currentIndex === index ? '#0ea5e9' : 'rgba(148, 163, 184, 0.3)',
                                    transition: 'all 0.3s ease',
                                    border: 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
