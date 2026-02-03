import React, { useState } from 'react';
import SectionTitle from '../UI/SectionTitle';

const faqs = [
    {
        question: 'How do I book an appointment?',
        answer: 'You can book an appointment by signing up on our platform, browsing through our list of doctors, selecting your preferred specialist, and choosing an available time slot. You\'ll receive an instant confirmation via email and SMS.'
    },
    {
        question: 'What are the consultation fees?',
        answer: 'Consultation fees vary depending on the doctor and specialty. You can view the fee before booking. We offer transparent pricing with no hidden charges. You can also use your health insurance for eligible consultations.'
    },
    {
        question: 'Can I consult a doctor online?',
        answer: 'Yes! We offer video consultations with all our doctors. You can choose between in-person visits or online consultations based on your preference and the nature of your health concern.'
    },
    {
        question: 'How do I access my prescriptions?',
        answer: 'All prescriptions are digitally available in your account under "My Prescriptions." You can view, download, and share them with any pharmacy. You\'ll also receive a copy via email after each consultation.'
    },
    {
        question: 'Is my health data secure?',
        answer: 'Absolutely. We use enterprise-grade encryption (256-bit SSL) and comply with healthcare data protection regulations. Your health records are stored securely and only accessible by you and your authorized healthcare providers.'
    },
    {
        question: 'Can I cancel or reschedule my appointment?',
        answer: 'Yes, you can cancel or reschedule your appointment up to 4 hours before the scheduled time without any charges. Go to "My Appointments" in your account to manage your bookings.'
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
            <div className="container position-relative" style={{ zIndex: 10 }}>
                <SectionTitle
                    badge="FAQ"
                    title="Frequently Asked Questions"
                    description="Got questions? We've got answers. Find all the information you need about our platform and services."
                />

                <div className="mx-auto" style={{ maxWidth: '48rem' }}>
                    <div className="accordion" id="faqAccordion">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`mb-3 rounded-4 overflow-hidden card-glass-light`}
                                style={{
                                    border: openIndex === index ? '1px solid rgba(14, 165, 233, 0.3)' : '1px solid var(--glass-border)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <button
                                    className="btn w-100 p-4 text-start d-flex align-items-center justify-content-between gap-3"
                                    onClick={() => toggle(index)}
                                    style={{ border: 'none', background: 'transparent' }}
                                >
                                    <span
                                        className="h6 mb-0 fw-semibold"
                                        style={{
                                            color: openIndex === index ? '#0ea5e9' : 'var(--text-primary)',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        {faq.question}
                                    </span>
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                                        style={{
                                            width: '2rem',
                                            height: '2rem',
                                            backgroundColor: openIndex === index ? '#0ea5e9' : 'rgba(241, 245, 249, 1)',
                                            transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <svg
                                            style={{
                                                width: '1.25rem',
                                                height: '1.25rem',
                                                color: openIndex === index ? 'white' : 'var(--text-muted)'
                                            }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div
                                    className="overflow-hidden"
                                    style={{
                                        maxHeight: openIndex === index ? '24rem' : '0',
                                        transition: 'max-height 0.3s ease'
                                    }}
                                >
                                    <div className="px-4 pb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
