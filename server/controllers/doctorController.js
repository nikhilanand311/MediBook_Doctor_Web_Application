import Doctor from '../models/Doctor.js';
import fs from 'fs';
import path from 'path';

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctor = async (req, res, next) => {
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
        next(error);
    }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private/Admin
export const createDoctor = async (req, res, next) => {
    try {
        const doctorData = { ...req.body };

        // Handle file upload
        if (req.file) {
            doctorData.image = `/uploads/doctors/${req.file.filename}`;
        } else if (!doctorData.image) {
            // Generate a default placeholder if no image provided
            doctorData.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctorData.name || 'Doctor')}&background=random&size=200`;
        }

        const doctor = await Doctor.create(doctorData);

        res.status(201).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
export const updateDoctor = async (req, res, next) => {
    try {
        let doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        const updateData = { ...req.body };

        // Handle file upload
        if (req.file) {
            // Delete old image if it exists and is a local file
            if (doctor.image && doctor.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(process.cwd(), doctor.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            updateData.image = `/uploads/doctors/${req.file.filename}`;
        }

        doctor = await Doctor.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: doctor
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
export const deleteDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Delete image file if it exists and is a local file
        if (doctor.image && doctor.image.startsWith('/uploads/')) {
            const imagePath = path.join(process.cwd(), doctor.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await doctor.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
