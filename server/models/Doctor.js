import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        default: true
    },
    color: {
        type: String,
        required: true,
        default: 'from-blue-500 to-cyan-500'
    },
    bio: {
        type: String,
    },
    education: {
        type: String,
    },
    languages: [{
        type: String
    }]
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
