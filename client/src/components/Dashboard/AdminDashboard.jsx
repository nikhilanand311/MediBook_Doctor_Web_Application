import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import landingAPI from '../../services/landingService';
import { appointmentAPI, doctorAPI } from '../../services/api'; // We will need to export doctorAPI

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings'); // bookings | doctors

    // Data States
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Doctor Form State
    const [showDoctorForm, setShowDoctorForm] = useState(false);
    const [doctorFormData, setDoctorFormData] = useState({
        name: '', specialty: '', experience: '', bio: '', available: true, rating: 4.5, reviews: 0
    });
    const [editingDoctorId, setEditingDoctorId] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Image upload state
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch data function - memoized with useCallback
    const fetchData = React.useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            if (activeTab === 'doctors') {
                const res = await landingAPI.getDoctors();
                if (res.data.success) setDoctors(res.data.data);
            } else {
                const res = await appointmentAPI.getAllAppointments();
                if (res.data.success) setAppointments(res.data.data);
            }
        } catch {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Appointment Actions
    const handleAppointmentStatus = async (id, status) => {
        try {
            await appointmentAPI.updateAppointment(id, { status });
            setSuccess(`Appointment ${status} successfully`);
            fetchData(); // Refresh
            setTimeout(() => setSuccess(''), 3000);
        } catch {
            setError('Failed to update status');
        }
    };

    // Doctor Actions
    const handleDoctorSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', doctorFormData.name);
            formData.append('specialty', doctorFormData.specialty);
            formData.append('experience', doctorFormData.experience);
            formData.append('bio', doctorFormData.bio);
            formData.append('available', doctorFormData.available);
            formData.append('rating', doctorFormData.rating);
            formData.append('reviews', doctorFormData.reviews);

            // Only append image if a new file is selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (editingDoctorId) {
                await doctorAPI.updateDoctor(editingDoctorId, formData);
                setSuccess('Doctor updated');
            } else {
                await doctorAPI.createDoctor(formData);
                setSuccess('Doctor created');
            }
            setShowDoctorForm(false);
            setEditingDoctorId(null);
            setDoctorFormData({ name: '', specialty: '', experience: '', bio: '', available: true, rating: 4.5, reviews: 0 });
            setImageFile(null);
            setImagePreview(null);
            fetchData();
        } catch {
            setError('Failed to save doctor');
        }
    };

    const handleEditDoctor = (doc) => {
        setDoctorFormData({
            name: doc.name,
            specialty: doc.specialty,
            experience: doc.experience,
            bio: doc.bio || '',
            available: doc.available,
            rating: doc.rating || 0,
            reviews: doc.reviews || 0
        });
        setEditingDoctorId(doc._id);
        setShowDoctorForm(true);
        // Set existing image as preview
        setImageFile(null);
        setImagePreview(doc.image ? `http://localhost:5000${doc.image}` : null);
    };

    const handleDeleteDoctor = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await doctorAPI.deleteDoctor(id);
            setSuccess('Doctor deleted');
            fetchData();
        } catch {
            setError('Failed to delete');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDoctorFormData({ ...doctorFormData, [e.target.name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="dashboard-page" style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
            <nav className="navbar navbar-dark bg-dark px-4 py-3">
                <span className="navbar-brand mb-0 h1">Admin Dashboard</span>
                <div className="d-flex text-white align-items-center gap-3">
                    <span>{user.name}</span>
                    <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
                </div>
            </nav>

            <div className="container mt-4">
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {/* Statistics Summary - Could be dynamic */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <div className="card text-center p-3">
                            <h3>{appointments.length}</h3>
                            <p>Total Bookings</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center p-3">
                            <h3>{appointments.filter(a => a.status === 'pending').length}</h3>
                            <p>Pending Requests</p>
                        </div>
                    </div>
                </div>

                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Booking Management</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>Doctor Management</button>
                    </li>
                </ul>

                {loading && <div className="text-center">Loading...</div>}

                {/* Detailed View Section */}
                {selectedAppointment && (
                    <div className="card border-0 shadow-sm mb-4 animate__animated animate__fadeIn">
                        <div className="card-header bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0 text-primary">Booking Details</h4>
                                <p className="text-muted small mb-0">ID: {selectedAppointment._id}</p>
                            </div>
                            <button className="btn btn-close" onClick={() => setSelectedAppointment(null)}></button>
                        </div>
                        <div className="card-body px-4 pb-4">
                            <div className="row g-4">
                                {/* Patient Info */}
                                <div className="col-md-4">
                                    <h6 className="text-uppercase text-secondary small fw-bold mb-3">Patient Information</h6>
                                    <div className="d-flex align-items-start mb-2">
                                        <div className="bg-light rounded-circle p-2 me-3 text-primary">
                                            <i className="bi bi-person-fill"></i>
                                        </div>
                                        <div>
                                            <p className="fw-bold mb-0">{selectedAppointment.name}</p>
                                            <p className="text-muted small mb-0">Patient</p>
                                        </div>
                                    </div>
                                    <div className="mb-2"><small className="text-muted d-block">Email</small> {selectedAppointment.email}</div>
                                    <div className="mb-2"><small className="text-muted d-block">Phone</small> {selectedAppointment.phone}</div>
                                </div>

                                {/* Appointment Info */}
                                <div className="col-md-4">
                                    <h6 className="text-uppercase text-secondary small fw-bold mb-3">Appointment Info</h6>
                                    <div className="mb-2">
                                        <small className="text-muted d-block">Date & Time</small>
                                        <span className="fw-medium">{new Date(selectedAppointment.date).toLocaleDateString()} at {selectedAppointment.time}</span>
                                    </div>
                                    <div className="mb-2">
                                        <small className="text-muted d-block">Department</small>
                                        {selectedAppointment.department || 'General'}
                                    </div>
                                    <div className="mb-2">
                                        <small className="text-muted d-block">Doctor</small>
                                        {selectedAppointment.doctor?.name || 'Not Assigned'}
                                    </div>
                                </div>

                                {/* Actions & Status */}
                                <div className="col-md-4">
                                    <h6 className="text-uppercase text-secondary small fw-bold mb-3">Status & Actions</h6>
                                    <div className="mb-3">
                                        <span className={`badge px-3 py-2 rounded-pill ${selectedAppointment.status === 'approved' ? 'bg-success' : selectedAppointment.status === 'rejected' ? 'bg-danger' : 'bg-warning'}`}>
                                            {selectedAppointment.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="p-3 bg-light rounded mb-3">
                                        <small className="text-muted d-block mb-1">Message from Patient</small>
                                        <p className="mb-0 fst-italic">"{selectedAppointment.message || 'No message provided'}"</p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-success grow" onClick={() => handleAppointmentStatus(selectedAppointment._id, 'approved')}>
                                            Approve
                                        </button>
                                        <button className="btn btn-outline-danger grow" onClick={() => handleAppointmentStatus(selectedAppointment._id, 'rejected')}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Booking Management */}
                {!loading && activeTab === 'bookings' && (
                    <div className="table-responsive bg-white p-3 rounded shadow-sm">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appt => (
                                    <tr
                                        key={appt._id}
                                        onClick={() => setSelectedAppointment(appt)}
                                        style={{ cursor: 'pointer', backgroundColor: selectedAppointment?._id === appt._id ? '#f0f4ff' : 'transparent' }}
                                    >
                                        <td><small className="text-muted">#{appt._id.substring(appt._id.length - 6)}</small></td>
                                        <td>
                                            <div className="fw-bold">{appt.name}</div>
                                            <small className="text-muted">{appt.email}</small>
                                        </td>
                                        <td>{appt.doctor?.name || <span className="text-muted fst-italic">Unassigned</span>}</td>
                                        <td>
                                            <div>{new Date(appt.date).toLocaleDateString()}</div>
                                            <small className="text-muted">{appt.time}</small>
                                        </td>
                                        <td>
                                            <span className={`badge ${appt.status === 'approved' ? 'bg-success' : appt.status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" onClick={(e) => e.stopPropagation()}>
                                                <button className="btn btn-sm btn-outline-success" title="Approve" onClick={() => handleAppointmentStatus(appt._id, 'approved')}>
                                                    <i className="bi bi-check-lg"></i> ✓
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger" title="Reject" onClick={() => handleAppointmentStatus(appt._id, 'rejected')}>
                                                    <i className="bi bi-x-lg"></i> ✕
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {appointments.length === 0 && (
                            <div className="text-center py-5">
                                <p className="text-muted">No appointments found.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Doctor Management */}
                {!loading && activeTab === 'doctors' && (
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Doctor Management</h4>
                            <button className="btn btn-primary" onClick={() => { setShowDoctorForm(true); setEditingDoctorId(null); setDoctorFormData({ name: '', specialty: '', experience: '', bio: '', available: true, rating: 4.5, reviews: 0 }); setImageFile(null); setImagePreview(null); }}>
                                + Add New Doctor
                            </button>
                        </div>

                        {showDoctorForm && (
                            <div className="card border-0 shadow mb-4 animate__animated animate__fadeIn">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">{editingDoctorId ? 'Edit Doctor' : 'Add New Doctor'}</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleDoctorSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Name</label>
                                                <input className="form-control" name="name" value={doctorFormData.name} onChange={handleInputChange} required placeholder="Dr. John Doe" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Specialty</label>
                                                <input className="form-control" name="specialty" value={doctorFormData.specialty} onChange={handleInputChange} required placeholder="Cardiology" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Experience</label>
                                                <input className="form-control" name="experience" value={doctorFormData.experience} onChange={handleInputChange} required placeholder="10 years" />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Doctor Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                    onChange={handleImageChange}
                                                />
                                                <small className="text-muted">Accepted formats: JPG, PNG, GIF, WebP (max 5MB)</small>
                                                {imagePreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
                                                            className="shadow-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Rating (0-5)</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="5"
                                                    className="form-control"
                                                    name="rating"
                                                    value={doctorFormData.rating}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Reviews Count</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    className="form-control"
                                                    name="reviews"
                                                    value={doctorFormData.reviews}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" name="available" id="availCheck" checked={doctorFormData.available} onChange={handleInputChange} />
                                                    <label className="form-check-label" htmlFor="availCheck">Available for booking</label>
                                                </div>
                                            </div>
                                            <div className="col-12 text-end">
                                                <button className="btn btn-light me-2" type="button" onClick={() => setShowDoctorForm(false)}>Cancel</button>
                                                <button className="btn btn-primary" type="submit">Save Doctor</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className="row g-4">
                            {doctors.map(doc => (
                                <div className="col-md-4" key={doc._id}>
                                    <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-3">
                                                <img
                                                    src={doc.image?.startsWith('/uploads') ? `http://localhost:5000${doc.image}` : doc.image}
                                                    alt={doc.name}
                                                    style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }}
                                                    className="me-3 shadow-sm"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=random`;
                                                    }}
                                                />
                                                <div>
                                                    <h6 className="mb-0 fw-bold">{doc.name}</h6>
                                                    <p className="text-primary small mb-0">{doc.specialty}</p>
                                                </div>
                                            </div>
                                            <p className="text-muted small mb-3"><i className="bi bi-briefcase me-1"></i> {doc.experience}</p>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className={`badge rounded-pill ${doc.available ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}>
                                                    <i className={`bi ${doc.available ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-1`}></i>
                                                    {doc.available ? 'Available' : 'Busy'}
                                                </span>
                                                <button
                                                    className={`btn btn-sm ${doc.available ? 'btn-outline-warning' : 'btn-outline-success'}`}
                                                    onClick={async () => {
                                                        try {
                                                            // Use JSON data for simple status toggle
                                                            await doctorAPI.updateDoctor(doc._id, { available: !doc.available });
                                                            fetchData();
                                                            setSuccess(`Updated status for ${doc.name}`);
                                                            setTimeout(() => setSuccess(''), 2000);
                                                        } catch {
                                                            setError('Failed to update status');
                                                        }
                                                    }}
                                                >
                                                    {doc.available ? 'Mark Busy' : 'Mark Available'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-white border-top-0 pt-0 d-flex justify-content-between">
                                            <button className="btn btn-link text-decoration-none p-0 text-muted" onClick={() => handleEditDoctor(doc)}>Edit details</button>
                                            <button className="btn btn-link text-decoration-none p-0 text-danger" onClick={() => handleDeleteDoctor(doc._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
