import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import ThemeToggle from '../UI/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isDark } = useTheme();
    const { user, logout } = useAuth(); // Get auth state

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Features', href: '#features' },
        { name: 'About', href: '#about' },
        { name: 'Doctors', href: '#doctors' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false); // Close mobile menu if open
    };

    const navbarStyle = {
        transition: 'all 0.5s ease',
        backgroundColor: isScrolled
            ? isDark
                ? 'rgba(15, 23, 42, 0.9)'
                : 'rgba(255, 255, 255, 0.9)'
            : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled
            ? isDark
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.1)'
            : 'none',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
    };

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top"
            style={navbarStyle}
        >
            <div className="container">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, '#home')}
                    className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
                >
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)',
                            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
                        }}
                    >
                        <svg className="text-white" style={{ width: '1.5rem', height: '1.5rem' }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                    </div>
                    <span className={`fs-5 fw-bold ${isDark ? 'text-white' : 'text-dark'}`}>
                        Med<span style={{ color: '#0EA5E9' }}>Care</span>
                    </span>
                </a>

                {/* Mobile Toggle */}
                <button
                    className={`navbar-toggler border-0 ${isDark ? 'text-white' : 'text-dark'}`}
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto gap-4">
                        {navLinks.map((link) => (
                            <li key={link.name} className="nav-item">
                                <a
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className={`nav-link fw-medium position-relative ${isDark ? 'text-light' : 'text-secondary'}`}
                                    style={{ transition: 'color 0.3s ease' }}
                                    onMouseEnter={(e) => e.target.style.color = '#0EA5E9'}
                                    onMouseLeave={(e) => e.target.style.color = isDark ? '#cbd5e1' : '#6c757d'}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Theme Toggle & Auth Buttons */}
                    <div className="d-flex align-items-center gap-3">
                        <ThemeToggle />
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <Link to="/dashboard" className="text-decoration-none">
                                    <div
                                        className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill"
                                        style={{
                                            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center text-white small fw-bold"
                                            style={{
                                                width: '2rem',
                                                height: '2rem',
                                                background: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)'
                                            }}
                                        >
                                            {getInitials(user.name)}
                                        </div>
                                        <span className={`fw-medium ${isDark ? 'text-light' : 'text-dark'}`}>
                                            Dashboard
                                        </span>
                                    </div>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="text-danger"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`position-absolute top-100 start-0 end-0 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                }}
            >
                <div className="container py-4 d-flex flex-column gap-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-light text-decoration-none fw-medium py-2"
                            style={{ transition: 'color 0.3s ease' }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="d-flex flex-column gap-3 pt-3 border-top border-secondary border-opacity-25">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="w-100" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-100">
                                        <span className="me-2">Dashboard</span>
                                        <span className="badge bg-white text-primary rounded-pill">
                                            {getInitials(user.name)}
                                        </span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="w-100 text-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="w-100">
                                    <Button variant="secondary" className="w-100">Login</Button>
                                </Link>
                                <Link to="/register" className="w-100">
                                    <Button variant="primary" className="w-100">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
