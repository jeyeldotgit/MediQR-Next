export interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  bloodType: string;
  dateOfBirth: string; // will convert to Date
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
}
