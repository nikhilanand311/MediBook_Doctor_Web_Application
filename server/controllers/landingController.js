import Contact from '../models/Contact.js';
import Appointment from '../models/Appointment.js';
import Newsletter from '../models/Newsletter.js';
import Doctor from '../models/Doctor.js';

// @desc    Submit contact form
// @route   POST /api/landing/contact
// @access  Public
export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields'
            });
        }

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us. We will get back to you soon!',
            data: contact
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit contact form. Please try again.'
        });
    }
};

// @desc    Book appointment
// @route   POST /api/landing/appointment
// @access  Public
export const bookAppointment = async (req, res) => {
    try {
        console.log('Booking request body:', req.body);
        const { name, email, phone, doctor, date, time, message } = req.body;

        if (!name || !email || !phone || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        const appointmentData = {
            name,
            email,
            phone,
            doctor: doctor || null, // Handle empty string for doctor
            date,
            time,
            message: message ? message.trim() : ''
        };

        const appointment = await Appointment.create(appointmentData);

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully! We will send you a confirmation shortly.',
            data: appointment
        });
    } catch (error) {
        console.error('Appointment booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to book appointment. Please try again.'
        });
    }
};

// @desc    Subscribe to newsletter
// @route   POST /api/landing/newsletter
// @access  Public
export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Check if already subscribed
        const existing = await Newsletter.findOne({ email: email.toLowerCase() });

        if (existing) {
            if (existing.isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'This email is already subscribed to our newsletter'
                });
            } else {
                // Reactivate subscription
                existing.isActive = true;
                await existing.save();
                return res.status(200).json({
                    success: true,
                    message: 'Welcome back! Your subscription has been reactivated.'
                });
            }
        }

        await Newsletter.create({ email });

        res.status(201).json({
            success: true,
            message: 'Thank you for subscribing to our newsletter!'
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe. Please try again.'
        });
    }
};

// @desc    Get featured doctors
// @route   GET /api/landing/doctors
// @access  Public
export const getFeaturedDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        console.error('Get doctors error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctors'
        });
    }
};

// @desc    Get single doctor
// @route   GET /api/landing/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        console.error('Get doctor error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch doctor details'
        });
    }
};
