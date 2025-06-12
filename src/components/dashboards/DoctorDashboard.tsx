
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, Users, LogOut, Stethoscope, Star } from 'lucide-react';
import { Doctor } from '../../types';
import { recentAppointments, mockPatient } from '../../data/mockData';

export const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'patients'>('dashboard');
  const doctor = user as Doctor;

  const doctorAppointments = recentAppointments.filter(apt => apt.doctorId === doctor.id);
  const todayAppointments = doctorAppointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0]
  );

  const TabButton: React.FC<{ 
    tab: string; 
    label: string; 
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
  }> = ({ tab, label, icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-medical-blue text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="ml-2 font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-medical-blue mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">EyeCare Doctor Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Dr. {doctor.firstName} {doctor.lastName}
                </p>
                <p className="text-xs text-gray-500">{doctor.specialization[0]}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          <TabButton
            tab="dashboard"
            label="Dashboard"
            icon={<Stethoscope className="h-4 w-4" />}
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton
            tab="appointments"
            label="Appointments"
            icon={<Calendar className="h-4 w-4" />}
            active={activeTab === 'appointments'}
            onClick={() => setActiveTab('appointments')}
          />
          <TabButton
            tab="patients"
            label="Patients"
            icon={<Users className="h-4 w-4" />}
            active={activeTab === 'patients'}
            onClick={() => setActiveTab('patients')}
          />
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Doctor Profile Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Welcome, Dr. {doctor.firstName} {doctor.lastName}
                </CardTitle>
                <CardDescription>{doctor.specialization.join(', ')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-medical-blue-light rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-medical-blue mr-3" />
                      <div>
                        <p className="text-lg font-semibold text-medical-blue-dark">
                          {todayAppointments.length}
                        </p>
                        <p className="text-sm text-gray-600">Today's Appointments</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-medical-green-light rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-medical-green mr-3" />
                      <div>
                        <p className="text-lg font-semibold text-medical-green">
                          {doctor.patients.length || 15}
                        </p>
                        <p className="text-sm text-gray-600">Total Patients</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-100 rounded-lg">
                    <div className="flex items-center">
                      <Star className="h-8 w-8 text-yellow-600 mr-3" />
                      <div>
                        <p className="text-lg font-semibold text-yellow-700">
                          {doctor.rating}
                        </p>
                        <p className="text-sm text-gray-600">Patient Rating</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Experience:</span> {doctor.experience} years
                    </div>
                    <div>
                      <span className="font-medium">Consultation Fee:</span> ${doctor.consultationFee}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Qualifications:</span> {doctor.qualifications.join(', ')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                {todayAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{appointment.time}</p>
                            <p className="text-xs text-gray-600">Patient ID: {appointment.patientId}</p>
                          </div>
                          <Badge 
                            variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                            className={appointment.status === 'completed' ? 'bg-medical-green' : ''}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">No appointments today</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctorAppointments.slice(0, 5).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Clock className="h-8 w-8 text-medical-blue" />
                        <div>
                          <p className="font-medium">Patient ID: {appointment.patientId}</p>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {appointment.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                        className={appointment.status === 'completed' ? 'bg-medical-green' : ''}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>Manage your appointment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {doctorAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-8 w-8 text-medical-blue" />
                      <div>
                        <p className="font-medium">Patient: {appointment.patientId}</p>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time} ({appointment.duration} minutes)
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {appointment.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={appointment.status === 'completed' ? 'default' : 'secondary'}
                        className={appointment.status === 'completed' ? 'bg-medical-green text-white' : ''}
                      >
                        {appointment.status}
                      </Badge>
                      {appointment.status === 'scheduled' && (
                        <div className="mt-2 space-x-2">
                          <Button size="sm" variant="outline">Complete</Button>
                          <Button size="sm" variant="outline">Reschedule</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <Card>
            <CardHeader>
              <CardTitle>Patient List</CardTitle>
              <CardDescription>Your assigned patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-medical-blue-light rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-medical-blue" />
                      </div>
                      <div>
                        <p className="font-medium">{mockPatient.firstName} {mockPatient.lastName}</p>
                        <p className="text-sm text-gray-600">{mockPatient.email}</p>
                        <p className="text-sm text-gray-500">DOB: {mockPatient.dateOfBirth}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Last Visit: {mockPatient.medicalHistory[0]?.date || 'No visits'}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        View Records
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
