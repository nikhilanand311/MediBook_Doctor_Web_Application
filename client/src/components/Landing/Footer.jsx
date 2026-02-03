import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import landingAPI from '../../services/landingService';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (email) {
            try {
                const response = await landingAPI.subscribeNewsletter({ email });
                if (response.data && response.data.success) {
                    setSubscribed(true);
                    setEmail('');
                    setTimeout(() => setSubscribed(false), 3000);
                }
            } catch (error) {
                console.error('Subscription error:', error);
            }
        }
    };

    const footerLinks = {
        'Quick Links': [
            { name: 'Home', href: '#home' },
            { name: 'About Us', href: '#about' },
            { name: 'Our Doctors', href: '#doctors' },
            { name: 'Services', href: '#features' },
            { name: 'Contact', href: '#contact' }
        ],
        'Services': [
            { name: 'Find a Doctor', href: '#doctors' },
            { name: 'Video Consultation', href: '#features' },
            { name: 'Book Appointment', href: '#appointment' },
            { name: 'Health Records', href: '#features' },
            { name: 'Prescriptions', href: '#features' }
        ],
        'Support': [
            { name: 'Help Center', href: '#' },
            { name: 'FAQs', href: '#' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Feedback', href: '#contact' }
        ]
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            href: '#'
        },
        {
            name: 'Twitter',
            icon: (
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            href: '#'
        },
        {
            name: 'Instagram',
            icon: (
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
            ),
            href: '#'
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            href: '#'
        }
    ];

    const scrollTo = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer style={{ backgroundColor: '#0f172a', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="container py-5">
                <div className="row g-5">
                    {/* Brand */}
                    <div className="col-lg-4">
                        <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="d-flex align-items-center gap-3 mb-4 text-decoration-none">
                            <div className="
                                d-flex align-items-center justify-content-center rounded-3
                            " style={{
                                    width: '3rem',
                                    height: '3rem',
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
                                    boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
                                }}>
                                <svg style={{ width: '1.75rem', height: '1.75rem', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                            </div>
                            <span className="fs-3 fw-bold text-white">
                                Med<span style={{ color: '#38bdf8' }}>Care</span>
                            </span>
                        </a>

                        <p className="mb-4" style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                            Your trusted partner in healthcare. We connect you with the best doctors
                            and provide seamless healthcare services at your fingertips.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-4">
                            <h4 className="h6 text-white fw-semibold mb-3">Subscribe to Newsletter</h4>
                            <form onSubmit={handleSubscribe} className="d-flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="form-control"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        borderColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        borderRadius: '0.75rem',
                                        padding: '0.75rem 1rem'
                                    }}
                                    required
                                />
                                <Button type="submit" variant="primary">
                                    {subscribed ? '✓' : 'Subscribe'}
                                </Button>
                            </form>
                        </div>

                        {/* Social Links */}
                        <div className="d-flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="
                                        d-flex align-items-center justify-content-center rounded-3
                                    "
                                    style={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#94a3b8',
                                        transition: 'all 0.3s ease'
                                    }}
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="col-lg-2 offset-lg-0 col-md-4 col-sm-6">
                            <h4 className="h6 text-white fw-semibold mb-4">{title}</h4>
                            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => link.href.startsWith('#') && scrollTo(e, link.href)}
                                            style={{ color: '#94a3b8', transition: 'color 0.3s ease', textDecoration: 'none' }}
                                            onMouseEnter={(e) => e.target.style.color = '#38bdf8'}
                                            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p className="small mb-0" style={{ color: '#64748b' }}>
                        © 2026 MedCare. All rights reserved.
                    </p>
                    <div className="d-flex align-items-center gap-4">
                        <Link to="/login" className="small text-decoration-none" style={{ color: '#94a3b8' }}>
                            Login
                        </Link>
                        <Link to="/register" className="small text-decoration-none" style={{ color: '#94a3b8' }}>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
