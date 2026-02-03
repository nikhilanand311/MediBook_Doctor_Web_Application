import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../UI/Button';
import Input from '../UI/Input';
import landingAPI from '../../services/landingService';

const AppointmentSection = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        doctor: '',
        date: '',
        time: '',
        message: ''
    });

    // Pre-fill form when user logs in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, [user]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await landingAPI.getDoctors();
                if (response.data && response.data.success) {
                    setDoctors(response.data.data);
                }
            } catch (err) {
                console.error('Error fetching doctors for appointment:', err);
            }
        };
        fetchDoctors();
    }, []);

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
            const response = await landingAPI.bookAppointment(formData);
            if (response.data && response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        doctor: '',
                        date: '',
                        time: '',
                        message: ''
                    });
                }, 3000);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="appointment" className="py-5 position-relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
            {/* Background */}
            <div
                className="position-absolute top-0 start-0 end-0 bottom-0"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(14, 165, 233, 0.05), transparent)' }}
            />

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <div className="row g-5 align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-6">
                        <span
                            className="d-inline-block px-3 py-2 mb-3 rounded-pill small fw-medium"
                            style={{
                                color: '#38bdf8',
                                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                                border: '1px solid rgba(14, 165, 233, 0.2)'
                            }}
                        >
                            Book Appointment
                        </span>

                        <h2 className="display-5 fw-bold mb-4" style={{ lineHeight: 1.2, color: 'var(--text-primary)' }}>
                            Schedule Your Visit
                            <span className="d-block text-gradient-primary">
                                Today
                            </span>
                        </h2>

                        <p className="fs-5 mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            Don't wait for your health concerns. Book an appointment with our expert doctors
                            and get the care you deserve. We're committed to providing you with the best
                            healthcare experience.
                        </p>

                        {/* Contact Info Cards */}
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-3 p-3 rounded-3 card-glass-light">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        backgroundColor: 'rgba(14, 165, 233, 0.1)'
                                    }}
                                >
                                    <svg style={{ width: '1.5rem', height: '1.5rem', color: '#0ea5e9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-0 small" style={{ color: 'var(--text-muted)' }}>24/7 Emergency</p>
                                    <p className="mb-0 fw-semibold" style={{ color: 'var(--text-primary)' }}>+91 1800-MEDCARE</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-3 p-3 rounded-3 card-glass-light">
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        backgroundColor: 'rgba(139, 92, 246, 0.1)'
                                    }}
                                >
                                    <svg style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-0 small" style={{ color: 'var(--text-muted)' }}>Working Hours</p>
                                    <p className="mb-0 fw-semibold" style={{ color: 'var(--text-primary)' }}>Mon - Sat: 8:00 AM - 10:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="col-lg-6">
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
                                    <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>Appointment Booked!</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>We'll send you a confirmation shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <Input
                                                label="Full Name"
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

                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <Input
                                                label="Phone Number"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 000-0000"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label form-label-custom">
                                                Select Doctor
                                            </label>
                                            <select
                                                name="doctor"
                                                value={formData.doctor}
                                                onChange={handleChange}
                                                className="form-select form-control-custom"
                                            >
                                                <option value="">Select a Specialist (Optional)</option>
                                                {doctors.map(doc => (
                                                    <option key={doc._id} value={doc._id}>
                                                        {doc.name} - {doc.specialty}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 mb-3">
                                        <div className="col-md-6">
                                            <Input
                                                label="Preferred Date"
                                                name="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Input
                                                label="Preferred Time"
                                                name="time"
                                                type="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label form-label-custom">
                                            Additional Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Describe your health concern..."
                                            className="form-control form-control-custom"
                                            style={{ resize: 'none' }}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="w-100"
                                        loading={loading}
                                    >
                                        {loading ? 'Booking...' : 'Book Appointment'}
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

export default AppointmentSection;
