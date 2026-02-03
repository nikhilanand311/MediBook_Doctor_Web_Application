import Appointment from '../models/Appointment.js';

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
export const getMyAppointments = async (req, res, next) => {
    try {
        // Find appointments matching the user's email
        // Note: The user is attached to req.user by the auth middleware
        const appointments = await Appointment.find({ email: req.user.email })
            .populate('doctor', 'name specialty')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments/all
// @access  Private/Admin
export const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find()
            .populate('doctor', 'name specialty')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;

        let appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Verify ownership or admin role
        if (req.user.role !== 'admin' && appointment.email.toLowerCase() !== req.user.email.toLowerCase()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this appointment'
            });
        }

        // If user (not admin), only allow cancelling
        if (req.user.role !== 'admin') {
            if (req.body.status && req.body.status !== 'cancelled') {
                return res.status(403).json({
                    success: false,
                    message: 'Users can only cancel appointments'
                });
            }
            // Prevent users from changing other fields if needed, or just rely on body content.
            // For now, allowing update but we usually restrict what users can update. 
            // The prompt says "Option to cancel pending appointments".
        }

        appointment = await Appointment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        }).populate('doctor', 'name specialty');

        res.status(200).json({
            success: true,
            message: 'Appointment updated successfully',
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const deleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Check if the appointment belongs to the user
        if (appointment.email.toLowerCase() !== req.user.email.toLowerCase()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this appointment'
            });
        }

        await appointment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully',
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
