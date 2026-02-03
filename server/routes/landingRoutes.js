import express from 'express';
import {
    submitContact,
    bookAppointment,
    subscribeNewsletter,
    getFeaturedDoctors,
    getDoctorById
} from '../controllers/landingController.js';

const router = express.Router();

// Contact form
router.post('/contact', submitContact);

// Appointment booking
router.post('/appointment', bookAppointment);

// Newsletter subscription
router.post('/newsletter', subscribeNewsletter);

// Doctors
router.get('/doctors', getFeaturedDoctors);
router.get('/doctors/:id', getDoctorById);

export default router;
