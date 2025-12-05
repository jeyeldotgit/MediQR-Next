import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// API Simulation Utilities
export const simulateApiCall = async <T>(
  data: T,
  delay: number = 1000,
  shouldFail: boolean = false
): Promise<{ success: boolean; data?: T; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ success: false, error: "Simulated API error" });
      } else {
        resolve({ success: true, data });
      }
    }, delay);
  });
};

export const generateMockRecords = (patientId: string): any[] => [
  {
    id: "1",
    patientId: "" + patientId,
    staffId: "staff1",
    date: "2024-01-15T10:00:00Z",
    type: "consultation",
    title: "Annual Checkup",
    description: "Routine annual health checkup",
    diagnosis:
      "Patient is healthy. Blood pressure and cholesterol levels are within normal range.",
    treatment: "Continue current medications and maintain healthy lifestyle.",
    medications: ["Metformin 500mg", "Lisinopril 10mg"],
    notes:
      "Patient is doing well. Blood pressure under control. Advised regular exercise and balanced diet.",
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: 72,
      temperature: 36.7,
      weight: 70,
    },
    attachments: ["blood-test-2024.pdf", "xray-2024.png"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    patientId: "" + patientId,
    staffId: "staff2",
    date: "2024-01-10T14:30:00Z",
    type: "lab_result",
    title: "Blood Test Results",
    description: "Complete blood count and metabolic panel",
    diagnosis: "All values within normal range",
    treatment: "No treatment needed",
    medications: [],
    notes:
      "No abnormal values detected. Patient advised to maintain current lifestyle.",
    vitals: {
      bloodPressure: "118/76 mmHg",
      heartRate: 70,
      temperature: 36.6,
      weight: 69.5,
    },
    attachments: ["cbc-2024.pdf", "metabolic-panel-2024.pdf"],
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z",
  },
];

export const formatDateTime = (date: string | Date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const generateRecordDetails = (patientId: string, recordId: string) => {
  // Get all mock records for the patient
  const allRecords = generateMockRecords(patientId);

  // Find the record matching the given recordId
  const record = allRecords.find((r) => r.id === recordId) || null;

  return record;
};

// Blood Type Formatting Utilities
export const formatBloodType = (bloodType: string): string => {
  const mapping: Record<string, string> = {
    A_Pos: 'A+',
    A_Neg: 'A-',
    B_Pos: 'B+',
    B_Neg: 'B-',
    AB_Pos: 'AB+',
    AB_Neg: 'AB-',
    O_Pos: 'O+',
    O_Neg: 'O-',
  };
  return mapping[bloodType] || bloodType;
};

export const parseBloodType = (displayValue: string): string => {
  const mapping: Record<string, string> = {
    'A+': 'A_Pos',
    'A-': 'A_Neg',
    'B+': 'B_Pos',
    'B-': 'B_Neg',
    'AB+': 'AB_Pos',
    'AB-': 'AB_Neg',
    'O+': 'O_Pos',
    'O-': 'O_Neg',
  };
  return mapping[displayValue] || displayValue;
};