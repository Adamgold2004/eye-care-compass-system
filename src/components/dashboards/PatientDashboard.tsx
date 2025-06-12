
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuth } from '../../context/AuthContext';
import { SymptomChecker } from '../features/SymptomChecker';
import { Calendar, Clock, User, LogOut, Stethoscope, FileText } from 'lucide-react';
import { Patient } from '../../types';
import { recentAppointments, doctors } from '../../data/mockData';

export const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'symptoms' | 'appointments' | 'records'>('dashboard');
  const patient = user as Patient;

  const upcomingAppointments = recentAppointments.filter(
    apt => apt.patientId === patient.id && apt.status === 'scheduled'
  );

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : 'Unknown Doctor';
  };

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
              <h1 className="text-xl font-semibold text-gray-900">EyeCare Patient Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-xs text-gray-500">{patient.email}</p>
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
            icon={<User className="h-4 w-4" />}
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton
            tab="symptoms"
            label="Symptom Checker"
            icon={<Stethoscope className="h-4 w-4" />}
            active={activeTab === 'symptoms'}
            onClick={() => setActiveTab('symptoms')}
          />
          <TabButton
            tab="appointments"
            label="Appointments"
            icon={<Calendar className="h-4 w-4" />}
            active={activeTab === 'appointments'}
            onClick={() => setActiveTab('appointments')}
          />
          <TabButton
            tab="records"
            label="Medical Records"
            icon={<FileText className="h-4 w-4" />}
            active={activeTab === 'records'}
            onClick={() => setActiveTab('records')}
          />
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, {patient.firstName}!</CardTitle>
                <CardDescription>
                  Here's your eye health overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-medical-blue-light rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-medical-blue mr-3" />
                      <div>
                        <p className="text-lg font-semibold text-medical-blue-dark">
                          {upcomingAppointments.length}
                        </p>
                        <p className="text-sm text-gray-600">Upcoming Appointments</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-medical-green-light rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-medical-green mr-3" />
                      <div>
                        <p className="text-lg font-semibold text-medical-green">
                          {patient.medicalHistory.length}
                        </p>
                        <p className="text-sm text-gray-600">Medical Records</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full medical-button"
                  onClick={() => setActiveTab('symptoms')}
                >
                  Check Symptoms
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('appointments')}
                >
                  View Appointments
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setActiveTab('records')}
                >
                  Medical History
                </Button>
              </CardContent>
            </Card>

            {/* Recent Appointments */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Calendar className="h-8 w-8 text-medical-blue" />
                          </div>
                          <div>
                            <p className="font-medium">{getDoctorName(appointment.doctorId)}</p>
                            <p className="text-sm text-gray-600">
                              {appointment.date} at {appointment.time}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {appointment.symptoms.map((symptom, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-medical-green text-white">
                          {appointment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Symptom Checker Tab */}
        {activeTab === 'symptoms' && <SymptomChecker />}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>Your appointment history and upcoming visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAppointments.filter(apt => apt.patientId === patient.id).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <Clock className="h-8 w-8 text-medical-blue" />
                      <div>
                        <p className="font-medium">{getDoctorName(appointment.doctorId)}</p>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time} ({appointment.duration} minutes)
                        </p>
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
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
            </CardContent>
          </Card>
        )}

        {/* Medical Records Tab */}
        {activeTab === 'records' && (
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Your complete eye health history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {patient.medicalHistory.map((record) => (
                  <div key={record.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{record.diagnosis}</h3>
                        <p className="text-sm text-gray-600">{record.date}</p>
                      </div>
                      <p className="text-sm text-gray-500">Dr. {getDoctorName(record.doctorId)}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Symptoms</h4>
                        <div className="flex flex-wrap gap-1">
                          {record.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Treatment</h4>
                        <p className="text-sm text-gray-700">{record.treatment}</p>
                      </div>
                    </div>
                    
                    {record.prescription && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Prescription</h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {record.prescription}
                        </p>
                      </div>
                    )}
                    
                    {record.notes && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Notes</h4>
                        <p className="text-sm text-gray-700">{record.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
