"use client";

import { useEffect, useState } from "react";
import { UIContainer, UITag } from "@/app/components/ui/general/UIComponent";
import {
  formatDateTime,
  generateMockRecords,
  simulateApiCall,
} from "@/lib/utils";
import { useRouter } from "next/navigation";

export type MedicalRecord = {
  id: string;
  patientId: string;
  staffId: string;
  date: string;
  type: string;
  title: string;
  description: string;
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes?: string;
  attachments?: string[];
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
};

const PatientRecordsClient = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await simulateApiCall(generateMockRecords("P-001"));
      if (res.success && res.data) setRecords(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRecordTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      consultation: "Consultation",
      prescription: "Prescription",
      lab_result: "Lab Result",
      procedure: "Procedure",
      other: "Other",
    };
    return labels[type] || "Other";
  };

  const getRecordTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      consultation: "bg-mediqr-accent-light text-mediqr",
      prescription: "bg-mediqr-success/20 text-mediqr-success",
      lab_result: "bg-mediqr-warning/20 text-mediqr-warning",
      procedure: "bg-mediqr-accent/20 text-mediqr-accent",
      other: "bg-mediqr-neutral text-mediqr-text",
    };
    return colors[type] || colors.other;
  };

  const filteredRecords = records.filter(
    (r) => filter === "all" || r.type === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-mediqr-accent/10 to-mediqr-dark/10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-mediqr-text">
            My Medical Records
          </h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-mediqr-accent rounded-md shadow-sm focus:ring-mediqr focus:border-mediqr sm:text-sm"
          >
            <option value="all">All Records</option>
            <option value="consultation">Consultations</option>
            <option value="prescription">Prescriptions</option>
            <option value="lab_result">Lab Results</option>
            <option value="procedure">Procedures</option>
            <option value="other">Other</option>
          </select>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-mediqr-text/70">
            No records found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <UIContainer
                key={record.id}
                className="border border-mediqr-accent-light hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(`/patient-records/${record.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-mediqr-text">
                      {record.title}
                    </h3>
                    <p className="text-sm text-mediqr-text/70">
                      {record.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <UITag
                      label={getRecordTypeLabel(record.type)}
                      color={
                        getRecordTypeColor(record.type).includes("bg-green")
                          ? "green"
                          : getRecordTypeColor(record.type).includes("bg-red")
                          ? "red"
                          : "mediqr"
                      }
                    />
                    <span className="text-sm text-mediqr-text/60">
                      {formatDateTime(record.date)}
                    </span>
                  </div>
                </div>
              </UIContainer>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRecordsClient;
