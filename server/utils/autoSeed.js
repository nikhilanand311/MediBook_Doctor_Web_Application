import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

// Default admin user
const defaultAdmin = {
    name: 'MedCare Admin',
    email: 'admin@medcare.com',
    password: 'admin123',
    role: 'admin'
};

// Sample doctors with external image URLs (Cloudinary-ready)
const defaultDoctors = [
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
        available: true,
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

/**
 * Auto-seed the database if it's empty
 * Only runs if AUTO_SEED environment variable is set to 'true'
 */
export const runAutoSeed = async () => {
    // Check if auto-seed is enabled
    if (process.env.AUTO_SEED !== 'true') {
        console.log('⏭️  Auto-seed disabled (set AUTO_SEED=true to enable)');
        return;
    }

    try {
        // Check if database already has data
        const userCount = await User.countDocuments();
        const doctorCount = await Doctor.countDocuments();

        if (userCount > 0 || doctorCount > 0) {
            console.log('⏭️  Skipping auto-seed: Database already has data');
            console.log(`   Users: ${userCount}, Doctors: ${doctorCount}`);
            return;
        }

        console.log('🌱 Auto-seeding database...');

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultAdmin.password, salt);

        await User.create({
            ...defaultAdmin,
            password: hashedPassword
        });
        console.log('   ✅ Admin user created (admin@medcare.com / admin123)');

        // Create sample doctors
        await Doctor.insertMany(defaultDoctors);
        console.log(`   ✅ ${defaultDoctors.length} sample doctors created`);

        console.log('🎉 Auto-seeding complete!');
        console.log('');
        console.log('📋 Default Admin Credentials:');
        console.log('   Email: admin@medcare.com');
        console.log('   Password: admin123');
        console.log('');

    } catch (error) {
        console.error('❌ Auto-seed error:', error.message);
        // Don't throw - let the server continue even if seeding fails
    }
};

export default runAutoSeed;
