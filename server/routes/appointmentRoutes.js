import express from 'express';
import {
    getMyAppointments,
    getAllAppointments,
    updateAppointment,
    deleteAppointment
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/all', authorize('admin'), getAllAppointments);

router.route('/')
    .get(getMyAppointments);

router.route('/:id')
    .put(updateAppointment)
    .delete(deleteAppointment);

export default router;
