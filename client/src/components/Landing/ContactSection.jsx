import React, { useState } from 'react';
import SectionTitle from '../UI/SectionTitle';
import Button from '../UI/Button';
import Input from '../UI/Input';
import landingAPI from '../../services/landingService';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await landingAPI.contactUs(formData);
            if (response.data && response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                }, 3000);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Our Location',
            details: ['MedCare Healthcare Center', '123 Medical District, Mumbai', 'Maharashtra 400001'],
            color: '#0ea5e9'
        },
        {
            icon: (
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Phone Number',
            details: ['+91 1800-MEDCARE', '+91 22 2345 6789'],
            color: '#8b5cf6'
        },
        {
            icon: (
                <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email Address',
            details: ['contact@medcare.com', 'support@medcare.com'],
            color: '#06b6d4'
        }
    ];

    return (
        <section id="contact" className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
            {/* Background */}
            <div
                className="position-absolute top-0 start-0 end-0 bottom-0"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.05), transparent)' }}
            />

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <SectionTitle
                    badge="Contact Us"
                    title="Get In Touch"
                    description="Have questions or need assistance? Our team is here to help. Reach out to us anytime."
                />

                <div className="row g-4">
                    {/* Contact Cards */}
                    <div className="col-lg-4">
                        <div className="d-flex flex-column gap-4">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-4 card-glass-light card-hover-lift"
                                    style={{ transition: 'all 0.3s ease' }}
                                >
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                                        style={{
                                            width: '3.5rem',
                                            height: '3.5rem',
                                            backgroundColor: `${info.color}1A`,
                                            color: info.color
                                        }}
                                    >
                                        {info.icon}
                                    </div>
                                    <h3 className="h6 fw-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{info.title}</h3>
                                    {info.details.map((detail, i) => (
                                        <p key={i} className="mb-1" style={{ color: 'var(--text-secondary)' }}>{detail}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="col-lg-8">
                        <div className="p-4 p-md-5 rounded-4 card-glass-light">
                            {success ? (
                                <div className="text-center py-5">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
                                        style={{
                                            width: '5rem',
                                            height: '5rem',
                                            backgroundColor: 'rgba(16, 185, 129, 0.2)'
                                        }}
                                    >
                                        <svg style={{ width: '2.5rem', height: '2.5rem', color: '#34d399' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Message Sent!</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <Input
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <Input
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label form-label-custom">
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Tell us more about your inquiry..."
                                            className="form-control form-control-custom"
                                            style={{ resize: 'none' }}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-100 w-md-auto"
                                        loading={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
