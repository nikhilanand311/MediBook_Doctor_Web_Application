import Doctor from '../models/Doctor.js';
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '../config/cloudinaryConfig.js';

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

        // Handle file upload to Cloudinary
        if (req.file) {
            try {
                const result = await uploadToCloudinary(req.file.buffer, 'doctors');
                doctorData.image = result.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                // Fallback to placeholder if Cloudinary fails
                doctorData.image = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctorData.name || 'Doctor')}&background=random&size=200`;
            }
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

        // Handle file upload to Cloudinary
        if (req.file) {
            try {
                // Delete old image from Cloudinary if it exists
                const oldPublicId = getPublicIdFromUrl(doctor.image);
                if (oldPublicId) {
                    await deleteFromCloudinary(oldPublicId);
                }

                // Upload new image
                const result = await uploadToCloudinary(req.file.buffer, 'doctors');
                updateData.image = result.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                // Keep old image if upload fails
            }
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

        // Delete image from Cloudinary if it exists
        const publicId = getPublicIdFromUrl(doctor.image);
        if (publicId) {
            try {
                await deleteFromCloudinary(publicId);
            } catch (deleteError) {
                console.error('Error deleting image from Cloudinary:', deleteError);
                // Continue with doctor deletion even if image deletion fails
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
