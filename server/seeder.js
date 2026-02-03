import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Doctor from './models/Doctor.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config({ path: './server/.env' }); // Try explicit path relative to root run
// If that fails, fallback to default
if (!process.env.MONGODB_URI) dotenv.config();

console.log("URI:", process.env.MONGODB_URI); // Debug log

connectDB();

const users = [
    {
        name: 'MedCare Admin',
        email: 'admin@medcare.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
    }
];

const doctors = [
    {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiologist',
        experience: '15 Years',
        rating: 4.9,
        reviews: 234,
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        available: true,
        color: 'from-sky-500 to-cyan-500',
        bio: 'Specialized in cardiovascular diseases with over 15 years of experience.',
        education: 'MD - Cardiology, Harvard Medical School',
        languages: ['English', 'Hindi']
    },
    {
        name: 'Dr. Michael Chen',
        specialty: 'Neurologist',
        experience: '12 Years',
        rating: 4.8,
        reviews: 189,
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        available: true,
        color: 'from-violet-500 to-purple-500',
        bio: 'Expert in neurological disorders and brain health.',
        education: 'MD - Neurology, Stanford University',
        languages: ['English', 'Mandarin']
    },
    {
        name: 'Dr. Emily Williams',
        specialty: 'Pediatrician',
        experience: '10 Years',
        rating: 4.9,
        reviews: 312,
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        available: false,
        color: 'from-rose-500 to-pink-500',
        bio: 'Caring for children with compassion and expertise.',
        education: 'MD - Pediatrics, Johns Hopkins University',
        languages: ['English']
    },
    {
        name: 'Dr. James Anderson',
        specialty: 'Orthopedic',
        experience: '18 Years',
        rating: 4.7,
        reviews: 156,
        image: 'https://randomuser.me/api/portraits/men/75.jpg',
        available: true,
        color: 'from-emerald-500 to-teal-500',
        bio: 'Specialized in bone and joint surgeries.',
        education: 'MD - Orthopedics, UCLA Medical Center',
        languages: ['English', 'Spanish']
    },
    {
        name: 'Dr. Lisa Thompson',
        specialty: 'Dermatologist',
        experience: '8 Years',
        rating: 4.8,
        reviews: 201,
        image: 'https://randomuser.me/api/portraits/women/90.jpg',
        available: true,
        color: 'from-amber-500 to-orange-500',
        bio: 'Expert in skin care and cosmetic dermatology.',
        education: 'MD - Dermatology, NYU School of Medicine',
        languages: ['English', 'French']
    },
    {
        name: 'Dr. Robert Davis',
        specialty: 'General Medicine',
        experience: '20 Years',
        rating: 4.9,
        reviews: 445,
        image: 'https://randomuser.me/api/portraits/men/86.jpg',
        available: true,
        color: 'from-cyan-500 to-blue-500',
        bio: 'Comprehensive healthcare for all age groups.',
        education: 'MD - General Medicine, Yale School of Medicine',
        languages: ['English', 'Hindi']
    }
];

const importData = async () => {
    try {
        await Doctor.deleteMany();
        await User.deleteMany();

        await Doctor.insertMany(doctors);

        // Manually create users to trigger pre-save hooks (hashing password)
        for (const user of users) {
            // Check if user exists first to avoid duplicates if run multiple times without deleteMany logic (though we have deleteMany above)
            const newUser = new User(user);
            await newUser.save();
        }

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Doctor.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
