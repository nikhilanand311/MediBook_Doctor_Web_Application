import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { appointmentAPI } from '../../services/api';
import landingAPI from '../../services/landingService';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Edit State
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        phone: '',
        doctor: '',
        date: '',
        time: '',
        message: ''
    });

    useEffect(() => {
        fetchAppointments();
        fetchDoctorsList();

        const interval = setInterval(() => {
            fetchAppointments();
        }, 30000); // Poll every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const fetchDoctorsList = async () => {
        try {
            const response = await landingAPI.getDoctors();
            if (response.data.success) {
                setDoctors(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching doctors:', err);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await appointmentAPI.getMyAppointments();

            if (response && response.data && response.data.success) {
                setAppointments(response.data.data);
            } else {
                // Handle case where response structure might be different or success is false
                setAppointments([]);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
            // Don't show error to user immediately if it's just empty or network blip, 
            // but here we set it.
            setError('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDelete = async (id) => {
        // Confirmation prompt warning that action is irreversible
        if (window.confirm('Warning: This action is irreversible. Are you sure you want to delete this appointment?')) {
            try {
                await appointmentAPI.deleteAppointment(id);
                setSuccessMsg('Appointment deleted successfully');
                // Instantly update dashboard
                setAppointments(appointments.filter(appt => appt._id !== id));
                setTimeout(() => setSuccessMsg(''), 3000);
            } catch (err) {
                console.error('Delete error:', err);
                setError('Failed to delete appointment');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const handleEditClick = (appt) => {
        // Prompt to confirm editing functionality
        if (window.confirm('Do you want to edit this appointment?')) {
            setEditingAppointment(appt);
            // Format date for input (YYYY-MM-DD)
            const formattedDate = new Date(appt.date).toISOString().split('T')[0];
            setEditFormData({
                name: appt.name,
                email: appt.email,
                phone: appt.phone,
                doctor: appt.doctor?._id || appt.doctor || '',
                date: formattedDate,
                time: appt.time,
                message: appt.message || ''
            });
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to save these changes?')) {
            try {
                const response = await appointmentAPI.updateAppointment(editingAppointment._id, editFormData);
                if (response.data.success) {
                    setSuccessMsg('Appointment updated successfully');
                    // Instantly update dashboard
                    setAppointments(appointments.map(appt =>
                        appt._id === editingAppointment._id ? response.data.data : appt
                    ));
                    setEditingAppointment(null);
                    setTimeout(() => setSuccessMsg(''), 3000);
                }
            } catch (err) {
                console.error('Update error:', err);
                setError('Failed to update appointment');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const handleInputChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="badge bg-success">Approved</span>;
            case 'rejected': return <span className="badge bg-danger">Rejected</span>;
            case 'cancelled': return <span className="badge bg-secondary">Cancelled</span>;
            default: return <span className="badge bg-warning text-dark">Pending</span>;
        }
    };

    if (!user) return null;

    return (
        <div className="dashboard-page">
            {/* Navbar */}
            <nav className="dashboard-nav py-3">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="dashboard-nav-brand">
                        <div className="dashboard-nav-brand-icon">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        </div>
                        <span className="dashboard-nav-brand-text">MedCare User Dashboard</span>
                    </div>
                    <button onClick={handleLogout} className="dashboard-logout-btn">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="dashboard-content container">
                {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}

                <div className="dashboard-welcome mb-5 animate-slide-up">
                    <h1>Welcome back, {user.name}!</h1>
                    <p className="text-muted">Here's what's happening with your account today.</p>
                </div>

                {/* Profile Information Section */}
                <div className="card border-0 shadow-sm mb-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="card-body p-5">
                        <div className="d-flex align-items-center mb-4">
                            <h4 className="card-title mb-0 fw-bold text-dark">
                                <i className="bi bi-person-circle me-2 text-primary"></i>
                                Profile Information
                            </h4>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-6 border-bottom pb-3">
                                <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Full Name</small>
                                <span className="fs-5 fw-medium text-dark">{user.name}</span>
                            </div>
                            <div className="col-md-6 border-bottom pb-3">
                                <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Email Address</small>
                                <span className="fs-5 fw-medium text-dark">{user.email}</span>
                                <span className="badge bg-success-subtle text-success ms-2 rounded-pill px-3"><i className="bi bi-check-circle-fill me-1"></i>Verified</span>
                            </div>
                            <div className="col-md-6 border-bottom pb-3">
                                <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Account ID</small>
                                <span className="font-monospace text-secondary">{user._id}</span>
                            </div>
                            <div className="col-md-6 border-bottom pb-3">
                                <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Member Since</small>
                                <span className="fs-5 fw-medium text-dark">
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="d-flex gap-3">
                            <button className="btn btn-primary px-4 py-2" onClick={() => alert('Edit Profile feature coming soon!')}>
                                <i className="bi bi-pencil-square me-2"></i>Edit Profile
                            </button>
                            <button className="btn btn-light text-muted border px-4 py-2" onClick={() => alert('Change Password feature coming soon!')}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Appointments Section */}
                <div className="mb-5 animate-slide-up" style={{ animationDelay: '150ms' }}>
                    <h2 className="mb-4">My Appointments</h2>
                    {loading ? (
                        <p>Loading appointments...</p>
                    ) : appointments.length === 0 ? (
                        <div className="alert alert-info">No appointments booked yet.</div>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {appointments.map((appt) => (
                                <div key={appt._id} className="card border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-3 border-end">
                                                <h5 className="mb-1 text-primary">{appt.name}</h5>
                                                {getStatusBadge(appt.status)}
                                                {appt.doctor && (
                                                    <p className="text-info small mb-0 mt-2">
                                                        Dr. {appt.doctor.name}
                                                    </p>
                                                )}
                                                <p className="text-muted small mb-0 mt-1">
                                                    {new Date(appt.date).toLocaleDateString()} at {appt.time}
                                                </p>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="mb-1 fw-semibold text-secondary">Reason:</p>
                                                <p className="mb-0 text-muted">
                                                    {appt.message || 'No reason specified'}
                                                </p>
                                            </div>
                                            <div className="col-md-4 d-flex gap-2 justify-content-end">
                                                {appt.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditClick(appt)}
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(appt._id)}
                                                            className="btn btn-outline-danger btn-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {appt.status !== 'pending' && (
                                                    <span className="text-muted small">Cannot edit processed appointments</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Doctor Browsing Link - In a real app this might be a separate page or section here */}
                <div className="mb-5">
                    <h3>Need a doctor?</h3>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Doctors on Home Page</button>
                </div>

                {/* Edit Modal Overlay */}
                {editingAppointment && (
                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Appointment</h5>
                                    <button type="button" className="btn-close" onClick={() => setEditingAppointment(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleEditSubmit}>
                                        {/* Form content same as before */}
                                        <div className="mb-3">
                                            <label className="form-label">Message</label>
                                            <textarea
                                                className="form-control"
                                                name="message"
                                                value={editFormData.message}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Date</label>
                                            <input type="date" className="form-control" name="date" value={editFormData.date} onChange={handleInputChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Time</label>
                                            <input type="time" className="form-control" name="time" value={editFormData.time} onChange={handleInputChange} required />
                                        </div>
                                        <div className="d-flex justify-content-end gap-2">
                                            <button type="button" className="btn btn-secondary" onClick={() => setEditingAppointment(null)}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserDashboard;
