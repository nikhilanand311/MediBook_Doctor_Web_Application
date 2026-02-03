import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    department: {
        type: String,
        required: false,
        trim: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: false
    },
    date: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    time: {
        type: String,
        required: [true, 'Appointment time is required']
    },
    message: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
