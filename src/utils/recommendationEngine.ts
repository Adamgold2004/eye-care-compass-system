
import { Doctor, Symptom, Recommendation } from '../types';

export class RecommendationEngine {
  static calculateMatchScore(doctor: Doctor, symptoms: Symptom[]): number {
    if (!symptoms.length) return 0;

    let totalScore = 0;
    let maxPossibleScore = 0;

    symptoms.forEach(symptom => {
      maxPossibleScore += 100;
      
      // Check if doctor's specializations match symptom's related specializations
      const hasMatchingSpecialization = doctor.specialization.some(spec =>
        symptom.relatedSpecializations.some(relatedSpec =>
          spec.toLowerCase().includes(relatedSpec.toLowerCase()) ||
          relatedSpec.toLowerCase().includes(spec.toLowerCase())
        )
      );

      if (hasMatchingSpecialization) {
        let symptomScore = 60; // Base score for matching specialization

        // Boost score for severity
        switch (symptom.severity) {
          case 'severe':
            symptomScore += 30;
            break;
          case 'moderate':
            symptomScore += 20;
            break;
          case 'mild':
            symptomScore += 10;
            break;
        }

        // Boost score for doctor experience
        if (doctor.experience >= 15) {
          symptomScore += 10;
        } else if (doctor.experience >= 10) {
          symptomScore += 5;
        }

        totalScore += Math.min(symptomScore, 100);
      }
    });

    return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
  }

  static generateRecommendations(doctors: Doctor[], symptoms: Symptom[]): Recommendation[] {
    const recommendations: Recommendation[] = [];

    doctors.forEach(doctor => {
      const matchScore = this.calculateMatchScore(doctor, symptoms);
      
      if (matchScore > 0) {
        const matchedSymptoms = symptoms
          .filter(symptom =>
            doctor.specialization.some(spec =>
              symptom.relatedSpecializations.some(relatedSpec =>
                spec.toLowerCase().includes(relatedSpec.toLowerCase()) ||
                relatedSpec.toLowerCase().includes(spec.toLowerCase())
              )
            )
          )
          .map(s => s.name);

        const reason = this.generateRecommendationReason(doctor, matchedSymptoms, matchScore);

        recommendations.push({
          doctor,
          matchScore,
          matchedSymptoms,
          reason
        });
      }
    });

    // Sort by match score (highest first) and rating
    return recommendations.sort((a, b) => {
      if (Math.abs(a.matchScore - b.matchScore) < 5) {
        return b.doctor.rating - a.doctor.rating;
      }
      return b.matchScore - a.matchScore;
    });
  }

  private static generateRecommendationReason(doctor: Doctor, matchedSymptoms: string[], matchScore: number): string {
    const primarySpecialization = doctor.specialization[0];
    const experienceLevel = doctor.experience >= 15 ? 'highly experienced' : doctor.experience >= 10 ? 'experienced' : 'skilled';

    if (matchScore >= 80) {
      return `Excellent match! Dr. ${doctor.lastName} is a ${experienceLevel} ${primarySpecialization} who specializes in treating ${matchedSymptoms.join(', ').toLowerCase()}.`;
    } else if (matchScore >= 60) {
      return `Good match. Dr. ${doctor.lastName}'s expertise in ${primarySpecialization} makes them well-suited for your symptoms.`;
    } else {
      return `Dr. ${doctor.lastName} has relevant experience that may help with your condition.`;
    }
  }

  static getEmergencyLevel(symptoms: Symptom[]): 'low' | 'medium' | 'high' {
    const hasSevereSymptoms = symptoms.some(s => s.severity === 'severe');
    const hasSuddenOnset = symptoms.some(s => s.duration === 'sudden');
    const hasVisionThreateningSymptoms = symptoms.some(s => 
      ['Flashing Lights', 'Double Vision', 'Sudden Vision Loss'].includes(s.name)
    );

    if ((hasSevereSymptoms && hasSuddenOnset) || hasVisionThreateningSymptoms) {
      return 'high';
    } else if (hasSevereSymptoms || symptoms.length >= 3) {
      return 'medium';
    }
    return 'low';
  }
}
