import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import landingAPI from "../services/landingService";
import { ThemeProvider } from "../context/ThemeContext";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  // Pre-fill form when user logs in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await landingAPI.getDoctorById(doctorId);
        if (response.data && response.data.success) {
          setDoctor(response.data.data);
        } else {
          setError("Doctor not found");
        }
      } catch (err) {
        setError("Failed to load doctor details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const response = await landingAPI.bookAppointment({
        ...formData,
        doctor: doctorId,
      });

      if (response.data && response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      // Handle error (show alert)
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-white">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white p-4 text-center">
        <h2 className="display-6 fw-bold mb-3 text-danger">Error</h2>
        <p className="lead mb-4">{error || "Doctor not found"}</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="landing-page min-vh-100 d-flex flex-column">
        <Navbar />

        <div
          className="grow d-flex align-items-center py-5"
          style={{ marginTop: "5rem" }}
        >
          <div className="container">
            <div className="row g-5 justify-content-center">
              {/* Doctor Profile Card */}
              <div className="col-lg-5">
                <div className="p-4 rounded-4 card-glass h-100">
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div
                      className="overflow-hidden rounded-circle shadow-lg position-relative"
                      style={{
                        width: "6rem",
                        height: "6rem",
                        background: `linear-gradient(135deg, ${doctor.color || "#0ea5e9, #06b6d4"})`,
                      }}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <h1
                        className="h3 fw-bold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {doctor.name}
                      </h1>
                      <p className="fs-5 mb-2" style={{ color: "#0ea5e9" }}>
                        {doctor.specialty}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-1">
                          Verified
                        </span>
                        <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 rounded-pill px-3 py-1">
                          {doctor.experience} Exp.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3
                      className="h6 fw-semibold mb-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      About Doctor
                    </h3>
                    <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
                      {doctor.name} is a highly experienced specialist with a
                      proven track record of successful treatments. Dedicated to
                      providing patient-centered care using the latest medical
                      advancements.
                    </p>
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <div
                        className="p-3 rounded-3 text-center"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      >
                        <p
                          className="h4 fw-bold mb-0"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {doctor.rating}
                        </p>
                        <p
                          className="small mb-0"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Rating
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div
                        className="p-3 rounded-3 text-center"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      >
                        <p
                          className="h4 fw-bold mb-0"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {doctor.reviews || "100+"}
                        </p>
                        <p
                          className="small mb-0"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="col-lg-7">
                <div className="p-4 p-md-5 rounded-4 card-glass">
                  {success ? (
                    <div className="text-center py-5">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4"
                        style={{
                          width: "5rem",
                          height: "5rem",
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                        }}
                      >
                        <svg
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            color: "#34d399",
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h2
                        className="h3 fw-bold mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Booking Confirmed!
                      </h2>
                      <p
                        className="mb-4"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Your appointment with {doctor.name} has been scheduled.
                        Redirecting to home page...
                      </p>
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Redirecting...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <h2
                          className="h4 fw-bold mb-2"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Book Appointment
                        </h2>
                        <p style={{ color: "var(--text-secondary)" }}>
                          Fill in your details to schedule a visit.
                        </p>
                      </div>

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
                            <div className="row g-2">
                              <div className="col-6">
                                <Input
                                  label="Date"
                                  name="date"
                                  type="date"
                                  value={formData.date}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="col-6">
                                <Input
                                  label="Time"
                                  name="time"
                                  type="time"
                                  value={formData.time}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label form-label-custom">
                            Reason for Visit
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Briefly describe your symptoms or reason for visit..."
                            className="form-control form-control-custom"
                            style={{ resize: "none" }}
                          />
                        </div>

                        <div className="d-flex gap-3">
                          <Button
                            type="button"
                            variant="ghost"
                            className="grow"
                            onClick={() => navigate("/")}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            variant="primary"
                            className="grow"
                            loading={bookingLoading}
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default BookingPage;
