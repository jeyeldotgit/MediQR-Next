"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import {
  UIButton,
  UIContainer,
  UIInput,
  UIListItem,
  UIModal,
  UISidebar,
  UITag,
} from "../components/ui/general/UIComponent";
import { formatDateTime } from "@/lib/utils";

// Define a more complete MedicalRecord type
interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  status: "Active" | "Archived";
  vitals?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
  };
  diagnosis?: string;
  treatment?: string;
  medications?: string[];
  notes?: string;
  attachments?: string[];
}

const MedicalRecordsClient = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      patientName: "John Doe",
      patientId: "P-001",
      date: "2025-01-15T10:00:00Z",
      status: "Active",
      vitals: {
        bloodPressure: "120/80 mmHg",
        heartRate: 72,
        temperature: 36.7,
        weight: 70,
      },
      diagnosis: "Healthy",
      treatment: "Continue regular medications",
      medications: ["Metformin", "Lisinopril"],
      notes: "Patient doing well.",
      attachments: ["blood-test-2025.pdf"],
    },
    {
      id: "2",
      patientName: "Emma Castro",
      patientId: "P-002",
      date: "2024-12-03T14:30:00Z",
      status: "Archived",
    },
  ]);

  const handleAddRecord = (newRecord: MedicalRecord) => {
    setRecords([newRecord, ...records]);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-mediqr-accent/10 to-mediqr-dark/10 p-6 flex gap-6">
      {/* Sidebar */}
      <UISidebar
        items={[
          { label: "All Records" },
          { label: "Active" },
          { label: "Archived" },
        ]}
        onSelect={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto space-y-6">
        <UIContainer
          title="Medical Records"
          description="View, manage, and update patient medical documents"
          action={
            <UIButton onClick={() => setModalOpen(true)}>Add Record</UIButton>
          }
        >
          {/* Search */}
          <div className="flex gap-3 items-center">
            <Search className="text-mediqr-dark/60" />
            <UIInput placeholder="Search records..." />
          </div>
        </UIContainer>

        {/* List */}
        <div className="space-y-3">
          {records.map((rec) => (
            <UIListItem
              key={rec.id}
              title={`${rec.patientName} (${rec.patientId})`}
              subtitle={`Last Updated: ${formatDateTime(rec.date)}`}
              action={
                <UITag
                  label={rec.status}
                  color={rec.status === "Active" ? "green" : "red"}
                />
              }
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <UIModal open={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-3 text-mediqr-dark">
          Add Medical Record
        </h2>

        <UIInput placeholder="Patient Name" className="mb-3" />
        <UIInput placeholder="Patient ID" className="mb-3" />
        <UIInput placeholder="Diagnosis" className="mb-3" />
        <UIInput placeholder="Treatment" className="mb-3" />
        <UIInput placeholder="Notes" className="mb-3" />
        <UIInput placeholder="Medications (comma separated)" className="mb-3" />
        <UIInput placeholder="Attachments (comma separated)" className="mb-3" />

        <UIButton
          className="w-full"
          onClick={() =>
            handleAddRecord({
              id: Date.now().toString(),
              patientName: "New Patient",
              patientId: "P-XXX",
              date: new Date().toISOString(),
              status: "Active",
            })
          }
        >
          Save Record
        </UIButton>
      </UIModal>
    </div>
  );
};

export default MedicalRecordsClient;
