import express from 'express';
import {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor
} from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctor);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.post('/', upload.single('image'), createDoctor);
router.put('/:id', upload.single('image'), updateDoctor);
router.delete('/:id', deleteDoctor);

export default router;
