import React from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AboutSection from './AboutSection';
import HowItWorksSection from './HowItWorksSection';
import DoctorsSection from './DoctorsSection';
import StatsSection from './StatsSection';
import TestimonialsSection from './TestimonialsSection';
import AppointmentSection from './AppointmentSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const LandingPage = () => {
    return (
        <ThemeProvider>
            <div className="landing-page min-vh-100 overflow-hidden">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section */}
                <HeroSection />

                {/* Features Section */}
                <FeaturesSection />

                {/* About Section */}
                <AboutSection />

                {/* How It Works */}
                <HowItWorksSection />

                {/* Stats Section */}
                <StatsSection />

                {/* Doctors Section */}
                <DoctorsSection />

                {/* Testimonials */}
                <TestimonialsSection />

                {/* Appointment Booking */}
                <AppointmentSection />

                {/* FAQ Section */}
                <FAQSection />

                {/* Contact Section */}
                <ContactSection />

                {/* Footer */}
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default LandingPage;
