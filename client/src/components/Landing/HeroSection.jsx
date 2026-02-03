import React from "react";
import Button from "../UI/Button";

const HeroSection = () => {
  const scrollToBooking = () => {
    document
      .querySelector("#appointment")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="position-relative min-vh-100 d-flex align-items-center overflow-hidden gradient-hero"
    >
      {/* Animated Background */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0">
        {/* Floating Blobs */}
        <div
          className="position-absolute rounded-circle animate-pulse"
          style={{
            top: "5rem",
            left: "2.5rem",
            width: "18rem",
            height: "18rem",
            backgroundColor: "rgba(14, 165, 233, 0.2)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="position-absolute rounded-circle animate-pulse"
          style={{
            bottom: "10rem",
            right: "2.5rem",
            width: "24rem",
            height: "24rem",
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            filter: "blur(120px)",
            animationDelay: "1s",
          }}
        />
        <div
          className="position-absolute rounded-circle animate-pulse"
          style={{
            top: "50%",
            left: "33%",
            width: "16rem",
            height: "16rem",
            backgroundColor: "rgba(6, 182, 212, 0.1)",
            filter: "blur(80px)",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row g-5 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 text-center text-lg-start">
            {/* Badge */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-2 mb-4 rounded-pill animate-fade-in"
              style={{
                backgroundColor: "rgba(14, 165, 233, 0.1)",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}
            >
              <span
                className="rounded-circle animate-pulse"
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                  backgroundColor: "#34d399",
                }}
              />
              <span
                className="small fw-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Trusted by 50,000+ Patients
              </span>
            </div>

            {/* Heading */}
            <h1
              className="display-3 fw-bold mb-4 animate-slide-up"
              style={{ lineHeight: 1.1 }}
            >
              <span style={{ color: "var(--text-primary)" }}>Your Health,</span>
              <br />
              <span className="text-gradient-primary">Our Priority</span>
            </h1>

            {/* Subtext */}
            <p
              className="fs-5 mb-4 mx-auto mx-lg-0 animate-slide-up"
              style={{
                maxWidth: "36rem",
                color: "var(--text-secondary)",
                animationDelay: "100ms",
              }}
            >
              Experience world-class healthcare with our expert doctors. Book
              appointments, consult online, and manage your health seamlessly.
            </p>

            {/* CTA Buttons */}
            <div
              className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToBooking}
                icon={
                  <svg
                    style={{ width: "1.25rem", height: "1.25rem" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
              >
                Book Appointment
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToFeatures}
                icon={
                  <svg
                    style={{ width: "1.25rem", height: "1.25rem" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              className="d-flex flex-wrap gap-4 mt-5 justify-content-center justify-content-lg-start animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="rounded-circle d-flex align-items-center justify-content-center text-white fw-medium small"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        marginLeft: i > 1 ? "-0.5rem" : 0,
                        background:
                          "linear-gradient(135deg, #475569 0%, #334155 100%)",
                        border: "2px solid #0f172a",
                      }}
                    >
                      {["JD", "SK", "AM", "RK"][i - 1]}
                    </div>
                  ))}
                </div>
                <div>
                  <p
                    className="mb-0 fw-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    500+
                  </p>
                  <p
                    className="mb-0 small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Expert Doctors
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex" style={{ color: "#facc15" }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      style={{ width: "1.25rem", height: "1.25rem" }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <p
                    className="mb-0 fw-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    4.9/5
                  </p>
                  <p
                    className="mb-0 small"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Patient Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Illustration */}
          <div className="col-lg-6 d-none d-lg-block position-relative animate-slide-in-right">
            {/* Main Card */}
            <div className="position-relative" style={{ zIndex: 10 }}>
              <div
                className="p-4 rounded-4 shadow-lg"
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                {/* Doctor Profile */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 text-white fs-4 fw-bold"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      background:
                        "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)",
                    }}
                  >
                    DR
                  </div>
                  <div className="flex-grow-1">
                    <h3
                      className="mb-1 fs-5 fw-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Dr. Sarah Johnson
                    </h3>
                    <p
                      className="mb-0"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Cardiologist • 15 Years Exp.
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-pill small fw-medium"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#34d399",
                    }}
                  >
                    Available
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="row g-3 mb-4">
                  <div className="col-4">
                    <div
                      className="text-center p-3 rounded-3"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <p
                        className="mb-0 fs-4 fw-bold"
                        style={{ color: "#38bdf8" }}
                      >
                        2500+
                      </p>
                      <p
                        className="mb-0 small"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Patients
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="text-center p-3 rounded-3"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <p
                        className="mb-0 fs-4 fw-bold"
                        style={{ color: "#22d3ee" }}
                      >
                        4.9
                      </p>
                      <p
                        className="mb-0 small"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Rating
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="text-center p-3 rounded-3"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <p
                        className="mb-0 fs-4 fw-bold"
                        style={{ color: "#a78bfa" }}
                      >
                        98%
                      </p>
                      <p
                        className="mb-0 small"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Success
                      </p>
                    </div>
                  </div>
                </div>

                {/* Appointment Preview */}
                <div
                  className="p-3 rounded-3"
                  style={{
                    backgroundColor: "rgba(14, 165, 233, 0.1)",
                    border: "1px solid rgba(14, 165, 233, 0.2)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span style={{ color: "#7dd3fc" }} className="fw-medium">
                      Next Available
                    </span>
                    <span
                      style={{ color: "var(--text-primary)" }}
                      className="fw-semibold"
                    >
                      Today, 2:00 PM
                    </span>
                  </div>
                  <Button variant="primary" className="w-100">
                    Scroll Down for Booking 
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div
              className="position-absolute p-3 rounded-3 animate-float"
              style={{
                top: "-1rem",
                right: "-1rem",
                background: "var(--bg-card)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
            ></div>

            <div
              className="position-absolute p-3 rounded-3 animate-float"
              style={{
                bottom: "-1rem",
                left: "-1rem",
                background: "var(--bg-card)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
                animationDelay: "1s",
              }}
            >
              <div className="d-flex align-items-center gap-3"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="position-absolute start-50 translate-middle-x"
        style={{ bottom: "2rem", animation: "bounce 1s infinite" }}
      >
        <div
          className="rounded-pill d-flex align-items-start justify-content-center pt-2"
          style={{
            width: "2rem",
            height: "3rem",
            border: "2px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            className="rounded-pill animate-pulse"
            style={{
              width: "0.375rem",
              height: "0.75rem",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
