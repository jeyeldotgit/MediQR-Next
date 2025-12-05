"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { UIContainer, UIButton, UILoading } from "../components/ui/general/UIComponent";
import { generateMockRecords, formatDateTime } from "@/lib/utils";

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
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

const PatientQRCodePage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    loadRecord();
  }, [id]);

  const loadRecord = async () => {
    // Use the patientId from the route if available, otherwise default
    const patientId = id ? `P-${id}` : "P-001";

    // Generate mock records for this patient
    const data = generateMockRecords(patientId);

    // Find the record by the route id
    const found = data.find((r) => r.id === id) || data[0]; // fallback to first record
    setRecord(found);

    if (found) {
      const qrPayload = {
        patientId: found.patientId,
        patientName: found.patientName,
        dateOfVisit: formatDateTime(found.date),
        vitals: found.vitals,
        diagnosis: found.diagnosis,
        treatment: found.treatment,
        medications: found.medications,
        notes: found.notes,
      };
      setQrData(JSON.stringify(qrPayload, null, 2));
      console.log("QR Data:", qrPayload);
    }
  };
  if (!record) {
    return <UILoading fullPage message="Loading patient QR code..." />;
  }

  return (
    <div className="min-h-screen bg-mediqr-accent/10 p-6 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-mediqr-dark">Patient QR Code</h1>
        <p className="text-mediqr-text text-center">
          Scan this QR code to access patient information and medical records
        </p>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <QRCodeSVG
            value={qrData}
            size={220}
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
          />
        </div>

        {/* Patient Info Summary */}
        <UIContainer title="Patient Info" description="">
          <p>
            <span className="font-semibold">Name:</span> {record.patientName}
          </p>
          <p>
            <span className="font-semibold">Patient ID:</span>{" "}
            {record.patientId}
          </p>
          <p>
            <span className="font-semibold">Date of Visit:</span>{" "}
            {formatDateTime(record.date)}
          </p>
          {record.diagnosis && (
            <p>
              <span className="font-semibold">Diagnosis:</span>{" "}
              {record.diagnosis}
            </p>
          )}
          {record.treatment && (
            <p>
              <span className="font-semibold">Treatment:</span>{" "}
              {record.treatment}
            </p>
          )}
        </UIContainer>

        <UIButton onClick={() => window.print()}>Print QR Code</UIButton>
      </div>
    </div>
  );
};

export default PatientQRCodePage;
