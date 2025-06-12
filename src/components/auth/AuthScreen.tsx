
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../../hooks/use-toast';
import { Eye, UserPlus, LogIn } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>, role: 'patient' | 'doctor') => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      role: 'patient' as const
    };

    const success = await register(userData);
    
    if (success) {
      toast({
        title: "Registration Successful",
        description: "Welcome to EyeCare Clinic!",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-blue-light to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Eye className="h-12 w-12 text-medical-blue mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">EyeCare Clinic</h1>
          </div>
          <p className="text-gray-600">Advanced Eye Care Management System</p>
        </div>

        <Tabs defaultValue="patient-login" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient-login">Patient</TabsTrigger>
            <TabsTrigger value="doctor-login">Doctor</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="patient-login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Patient Login
                </CardTitle>
                <CardDescription>
                  Access your medical records and appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'patient')} className="space-y-4">
                  <div>
                    <Label htmlFor="patient-email">Email</Label>
                    <Input
                      id="patient-email"
                      name="email"
                      type="email"
                      placeholder="patient@demo.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="patient-password">Password</Label>
                    <Input
                      id="patient-password"
                      name="password"
                      type="password"
                      placeholder="demo123"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full medical-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctor-login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Doctor Login
                </CardTitle>
                <CardDescription>
                  Access your patient dashboard and appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'doctor')} className="space-y-4">
                  <div>
                    <Label htmlFor="doctor-email">Email</Label>
                    <Input
                      id="doctor-email"
                      name="email"
                      type="email"
                      placeholder="dr.smith@eyeclinic.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor-password">Password</Label>
                    <Input
                      id="doctor-password"
                      name="password"
                      type="password"
                      placeholder="demo123"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full medical-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Demo Doctors:</strong><br />
                    dr.smith@eyeclinic.com (Retina)<br />
                    dr.johnson@eyeclinic.com (Glaucoma)<br />
                    dr.chen@eyeclinic.com (Cornea)<br />
                    Password: demo123
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Patient Registration
                </CardTitle>
                <CardDescription>
                  Create your patient account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full medical-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
