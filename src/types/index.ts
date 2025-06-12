
export interface User {
  id: string;
  email: string;
  role: 'patient' | 'doctor';
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  insurance?: string;
  emergencyContact?: string;
  medicalHistory: MedicalRecord[];
  appointments: Appointment[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string[];
  experience: number;
  qualifications: string[];
  availability: TimeSlot[];
  rating: number;
  consultationFee: number;
  bio: string;
  patients: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescription?: string;
  notes?: string;
  doctorId: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  symptoms: string[];
  notes?: string;
  prescription?: string;
  followUp?: string;
}

export interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
  description?: string;
  relatedSpecializations: string[];
}

export interface Recommendation {
  doctor: Doctor;
  matchScore: number;
  matchedSymptoms: string[];
  reason: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
