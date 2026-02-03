import React, { useState, useEffect } from "react";
import SectionTitle from "../UI/SectionTitle";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import landingAPI from "../../services/landingService";

const DoctorsSection = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await landingAPI.getDoctors();
        if (response.data && response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <section
        id="doctors"
        className="py-5 position-relative overflow-hidden"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="container text-center">
          <p style={{ color: "var(--text-secondary)" }}>
            Loading specialists...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="doctors"
        className="py-5 position-relative overflow-hidden"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="container text-center">
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="doctors"
      className="py-5 position-relative overflow-hidden"
      style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
    >
      {/* Background */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0">
        <div
          className="position-absolute rounded-circle"
          style={{
            bottom: 0,
            right: 0,
            width: "24rem",
            height: "24rem",
            backgroundColor: "rgba(139, 92, 246, 0.05)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            top: "25%",
            left: 0,
            width: "20rem",
            height: "20rem",
            backgroundColor: "rgba(14, 165, 233, 0.05)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <SectionTitle
          badge="Our Specialists"
          title="Meet Our Expert Doctors"
          description="Our team of highly qualified and experienced doctors are committed to providing you with the best possible care."
        />

        <div className="row g-4">
          {doctors.map((doctor, index) => (
            <div key={doctor._id || index} className="col-md-6 col-lg-4">
              <div
                className="p-4 rounded-4 card-glass-light card-hover-lift h-100"
                style={{ transition: "all 0.5s ease" }}
              >
                {/* Doctor Avatar */}
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div
                    className="overflow-hidden rounded-3 shadow-lg position-relative"
                    style={{
                      width: "5rem",
                      height: "5rem",
                      background: `linear-gradient(135deg, ${doctor.color || "#0ea5e9, #06b6d4"})`,
                    }}
                  >
                    <img
                      src={doctor.image?.startsWith('/uploads') ? `http://localhost:5000${doctor.image}` : doctor.image}
                      alt={doctor.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`;
                      }}
                    />
                  </div>
                  <div className="grow">
                    <h3
                      className="h6 fw-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {doctor.name}
                    </h3>
                    <p
                      className="small fw-medium mb-2"
                      style={{ color: "#0ea5e9" }}
                    >
                      {doctor.specialty}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="rounded-circle"
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          backgroundColor: doctor.available ? "#34d399" : "#ef4444",
                        }}
                      />
                      <span
                        className="small"
                        style={{
                          color: doctor.available ? "#34d399" : "#ef4444",
                        }}
                      >
                        {doctor.available ? "Available" : "Busy"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div
                  className="d-flex align-items-center gap-3 mb-4 py-3 border-top border-bottom"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  <div className="grow text-center">
                    <p
                      className="mb-0 fw-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {doctor.experience}
                    </p>
                    <p
                      className="mb-0 small"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Experience
                    </p>
                  </div>
                  <div
                    style={{
                      width: "1px",
                      height: "2rem",
                      backgroundColor: "var(--glass-border)",
                    }}
                  />
                  <div className="grow text-center">
                    <div className="d-flex align-items-center justify-content-center gap-1">
                      <svg
                        style={{
                          width: "1rem",
                          height: "1rem",
                          color: "#facc15",
                        }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span
                        className="fw-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {doctor.rating}
                      </span>
                    </div>
                    <p
                      className="mb-0 small"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {doctor.reviews} Reviews
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex gap-2">
                  <Button variant="secondary" size="sm" className="grow">
                    View Profile
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="grow"
                    disabled={!doctor.available}
                    onClick={() => navigate(`/book/${doctor._id}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-5">
          <Button variant="outline" size="lg">
            View All Doctors
            <svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
                marginLeft: "0.5rem",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
