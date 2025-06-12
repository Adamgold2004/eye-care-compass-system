
import { Doctor, Patient, Appointment, Symptom } from '../types';

export const symptoms: Symptom[] = [
  {
    id: '1',
    name: 'Blurred Vision',
    severity: 'moderate',
    duration: 'recent',
    description: 'Difficulty seeing clearly at distance or near',
    relatedSpecializations: ['Refractive Surgery', 'General Ophthalmology', 'Retina Specialist']
  },
  {
    id: '2',
    name: 'Eye Pain',
    severity: 'severe',
    duration: 'acute',
    description: 'Sharp or dull pain in or around the eye',
    relatedSpecializations: ['Glaucoma Specialist', 'Cornea Specialist', 'General Ophthalmology']
  },
  {
    id: '3',
    name: 'Red Eyes',
    severity: 'mild',
    duration: 'recent',
    description: 'Redness in the white part of the eye',
    relatedSpecializations: ['Cornea Specialist', 'General Ophthalmology']
  },
  {
    id: '4',
    name: 'Flashing Lights',
    severity: 'severe',
    duration: 'sudden',
    description: 'Seeing flashes of light or floaters',
    relatedSpecializations: ['Retina Specialist', 'Vitreoretinal Surgery']
  },
  {
    id: '5',
    name: 'Double Vision',
    severity: 'severe',
    duration: 'recent',
    description: 'Seeing two images of a single object',
    relatedSpecializations: ['Neuro-Ophthalmology', 'Strabismus Specialist']
  },
  {
    id: '6',
    name: 'Dry Eyes',
    severity: 'mild',
    duration: 'chronic',
    description: 'Eyes feel dry, scratchy, or irritated',
    relatedSpecializations: ['Dry Eye Specialist', 'General Ophthalmology']
  },
  {
    id: '7',
    name: 'Night Blindness',
    severity: 'moderate',
    duration: 'chronic',
    description: 'Difficulty seeing in low light conditions',
    relatedSpecializations: ['Retina Specialist', 'General Ophthalmology']
  },
  {
    id: '8',
    name: 'Halos Around Lights',
    severity: 'moderate',
    duration: 'recent',
    description: 'Seeing bright circles around light sources',
    relatedSpecializations: ['Glaucoma Specialist', 'Cornea Specialist']
  }
];

export const doctors: Doctor[] = [
  {
    id: '1',
    email: 'dr.smith@eyeclinic.com',
    role: 'doctor',
    firstName: 'Sarah',
    lastName: 'Smith',
    phone: '+1-555-0101',
    specialization: ['Retina Specialist', 'Vitreoretinal Surgery'],
    experience: 15,
    qualifications: ['MD', 'Fellowship in Vitreoretinal Surgery', 'Board Certified Ophthalmologist'],
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
    ],
    rating: 4.9,
    consultationFee: 250,
    bio: 'Specializing in complex retinal diseases and minimally invasive vitreoretinal surgery.',
    patients: [],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'dr.johnson@eyeclinic.com',
    role: 'doctor',
    firstName: 'Michael',
    lastName: 'Johnson',
    phone: '+1-555-0102',
    specialization: ['Glaucoma Specialist', 'General Ophthalmology'],
    experience: 12,
    qualifications: ['MD', 'Fellowship in Glaucoma', 'Board Certified Ophthalmologist'],
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '08:00', endTime: '16:00', isAvailable: true },
    ],
    rating: 4.8,
    consultationFee: 200,
    bio: 'Expert in glaucoma management and advanced surgical techniques for pressure control.',
    patients: [],
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    email: 'dr.chen@eyeclinic.com',
    role: 'doctor',
    firstName: 'Lisa',
    lastName: 'Chen',
    phone: '+1-555-0103',
    specialization: ['Cornea Specialist', 'Refractive Surgery'],
    experience: 10,
    qualifications: ['MD', 'Fellowship in Cornea and External Disease', 'LASIK Certified'],
    availability: [
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', isAvailable: true },
      { dayOfWeek: 6, startTime: '09:00', endTime: '15:00', isAvailable: true },
    ],
    rating: 4.7,
    consultationFee: 180,
    bio: 'Specializing in corneal transplants, LASIK, and treatment of corneal diseases.',
    patients: [],
    avatar: 'https://images.unsplash.com/photo-1594824475850-5ceaf6d74da0?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    email: 'dr.patel@eyeclinic.com',
    role: 'doctor',
    firstName: 'Raj',
    lastName: 'Patel',
    phone: '+1-555-0104',
    specialization: ['Neuro-Ophthalmology', 'Strabismus Specialist'],
    experience: 18,
    qualifications: ['MD', 'Fellowship in Neuro-Ophthalmology', 'Pediatric Ophthalmology Certified'],
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
    ],
    rating: 4.9,
    consultationFee: 300,
    bio: 'Expert in neurological eye disorders and complex eye movement abnormalities.',
    patients: [],
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    email: 'dr.brown@eyeclinic.com',
    role: 'doctor',
    firstName: 'Emily',
    lastName: 'Brown',
    phone: '+1-555-0105',
    specialization: ['General Ophthalmology', 'Dry Eye Specialist'],
    experience: 8,
    qualifications: ['MD', 'Board Certified Ophthalmologist', 'Dry Eye Therapy Certified'],
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 3, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00', isAvailable: true },
      { dayOfWeek: 5, startTime: '08:00', endTime: '16:00', isAvailable: true },
    ],
    rating: 4.6,
    consultationFee: 150,
    bio: 'Comprehensive eye care with expertise in dry eye management and routine eye health.',
    patients: [],
    avatar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockPatient: Patient = {
  id: 'patient-1',
  email: 'john.doe@email.com',
  role: 'patient',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1-555-0200',
  dateOfBirth: '1985-03-15',
  insurance: 'Blue Cross Blue Shield',
  emergencyContact: '+1-555-0201',
  medicalHistory: [
    {
      id: 'record-1',
      patientId: 'patient-1',
      date: '2024-05-15',
      diagnosis: 'Myopia',
      symptoms: ['Blurred Vision'],
      treatment: 'Corrective lenses prescribed',
      prescription: 'OD: -2.50, OS: -2.25',
      notes: 'Annual eye exam, vision stable',
      doctorId: '5'
    }
  ],
  appointments: [
    {
      id: 'apt-1',
      patientId: 'patient-1',
      doctorId: '1',
      date: '2024-06-20',
      time: '10:00',
      duration: 30,
      status: 'scheduled',
      symptoms: ['Flashing Lights', 'Blurred Vision'],
      notes: 'Follow-up for retinal evaluation'
    }
  ],
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
};

export const recentAppointments: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'patient-1',
    doctorId: '1',
    date: '2024-06-20',
    time: '10:00',
    duration: 30,
    status: 'scheduled',
    symptoms: ['Flashing Lights', 'Blurred Vision'],
    notes: 'Follow-up for retinal evaluation'
  },
  {
    id: 'apt-2',
    patientId: 'patient-2',
    doctorId: '2',
    date: '2024-06-18',
    time: '14:00',
    duration: 45,
    status: 'completed',
    symptoms: ['Eye Pain', 'Halos Around Lights'],
    notes: 'Glaucoma screening completed',
    prescription: 'Latanoprost eye drops'
  },
  {
    id: 'apt-3',
    patientId: 'patient-3',
    doctorId: '3',
    date: '2024-06-22',
    time: '11:30',
    duration: 60,
    status: 'scheduled',
    symptoms: ['Red Eyes', 'Dry Eyes'],
    notes: 'LASIK consultation'
  }
];
