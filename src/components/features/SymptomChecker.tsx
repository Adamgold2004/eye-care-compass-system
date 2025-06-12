
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertTriangle, CheckCircle, Star, Clock, User } from 'lucide-react';
import { symptoms, doctors } from '../../data/mockData';
import { RecommendationEngine } from '../../utils/recommendationEngine';
import { Symptom, Recommendation } from '../../types';
import { toast } from '../../hooks/use-toast';

export const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [emergencyLevel, setEmergencyLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.some(selected => selected.id === symptom.id)
  );

  const addSymptom = (symptom: Symptom) => {
    setSelectedSymptoms(prev => [...prev, symptom]);
    setSearchTerm('');
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s.id !== symptomId));
  };

  const updateSymptomSeverity = (symptomId: string, severity: 'mild' | 'moderate' | 'severe') => {
    setSelectedSymptoms(prev =>
      prev.map(s => s.id === symptomId ? { ...s, severity } : s)
    );
  };

  useEffect(() => {
    if (selectedSymptoms.length > 0) {
      const recs = RecommendationEngine.generateRecommendations(doctors, selectedSymptoms);
      setRecommendations(recs);
      
      const emergencyLvl = RecommendationEngine.getEmergencyLevel(selectedSymptoms);
      setEmergencyLevel(emergencyLvl);

      if (emergencyLvl === 'high') {
        toast({
          title: "Urgent Care Recommended",
          description: "Your symptoms may require immediate medical attention. Please consider seeking urgent care.",
          variant: "destructive",
        });
      }
    } else {
      setRecommendations([]);
      setEmergencyLevel('low');
    }
  }, [selectedSymptoms]);

  const handleGetRecommendations = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No Symptoms Selected",
        description: "Please select at least one symptom to get recommendations.",
        variant: "destructive",
      });
      return;
    }
    setShowRecommendations(true);
  };

  const getEmergencyColor = () => {
    switch (emergencyLevel) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getEmergencyMessage = () => {
    switch (emergencyLevel) {
      case 'high': return 'Urgent care recommended - seek immediate medical attention';
      case 'medium': return 'Schedule an appointment soon';
      default: return 'Routine care - schedule appointment when convenient';
    }
  };

  return (
    <div className="space-y-6">
      {/* Symptom Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-6 w-6 mr-2 text-medical-blue" />
            Symptom Assessment
          </CardTitle>
          <CardDescription>
            Select your symptoms to get personalized doctor recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search for symptoms */}
          <div>
            <Label htmlFor="symptom-search">Search Symptoms</Label>
            <Input
              id="symptom-search"
              placeholder="Type to search for symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
            
            {searchTerm && filteredSymptoms.length > 0 && (
              <div className="mt-2 border rounded-lg max-h-40 overflow-y-auto">
                {filteredSymptoms.slice(0, 5).map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => addSymptom(symptom)}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="font-medium">{symptom.name}</div>
                    <div className="text-sm text-gray-600">{symptom.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected symptoms */}
          {selectedSymptoms.length > 0 && (
            <div>
              <Label>Selected Symptoms</Label>
              <div className="mt-2 space-y-3">
                {selectedSymptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{symptom.name}</h4>
                      <p className="text-sm text-gray-600">{symptom.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Select
                        value={symptom.severity}
                        onValueChange={(value: 'mild' | 'moderate' | 'severe') =>
                          updateSymptomSeverity(symptom.id, value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Mild</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSymptom(symptom.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Assessment */}
          {selectedSymptoms.length > 0 && (
            <div className={`p-4 rounded-lg flex items-center ${getEmergencyColor()}`}>
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">{getEmergencyMessage()}</span>
            </div>
          )}

          {/* Get Recommendations Button */}
          <Button 
            onClick={handleGetRecommendations}
            className="w-full medical-button"
            disabled={selectedSymptoms.length === 0}
          >
            Get Doctor Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {showRecommendations && recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-6 w-6 mr-2 text-medical-blue" />
              Recommended Doctors
            </CardTitle>
            <CardDescription>
              Based on your symptoms, here are the best-matched specialists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <div
                  key={recommendation.doctor.id}
                  className="doctor-card p-6 relative"
                >
                  {index === 0 && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-medical-blue">
                        Best Match
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-medical-blue-light flex items-center justify-center">
                        <User className="h-8 w-8 text-medical-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          Dr. {recommendation.doctor.firstName} {recommendation.doctor.lastName}
                        </h3>
                        <p className="text-medical-blue font-medium">
                          {recommendation.doctor.specialization.join(', ')}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{recommendation.doctor.rating}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {recommendation.doctor.experience} years experience
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-medical-blue mb-1">
                        {Math.round(recommendation.matchScore)}%
                      </div>
                      <div className="text-sm text-gray-600">Match Score</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Why this doctor?</h4>
                    <p className="text-gray-700 text-sm">{recommendation.reason}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Matching Symptoms</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.matchedSymptoms.map((symptom, idx) => (
                        <Badge key={idx} variant="secondary" className="symptom-tag">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-1">Consultation Fee</h4>
                      <p className="text-lg font-semibold text-medical-blue">
                        ${recommendation.doctor.consultationFee}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Availability</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {recommendation.doctor.availability.length} days/week
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 medical-button">
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showRecommendations && recommendations.length === 0 && selectedSymptoms.length > 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">
              No specific doctor recommendations found for your symptoms. 
              Please consider booking with our general ophthalmologist.
            </p>
            <Button className="mt-4 medical-button">
              Book General Consultation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
