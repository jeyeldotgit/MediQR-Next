"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  UIContainer,
  UITag,
  UICard,
} from "@/app/components/ui/general/UIComponent";
import {
  formatDateTime,
  generateMockRecords,
  simulateApiCall,
  generateRecordDetails,
} from "@/lib/utils";
import type { MedicalRecord } from "../page";

const SlugPatientRecordClient = () => {
  const { id } = useParams();
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecord();
  }, [id]);

  const loadRecord = async () => {
    setLoading(true);
    try {
      const res = await simulateApiCall(generateMockRecords("P-001"));
      if (res.success && res.data) {
        const found = res.data.find((r) => r.id === id) || null;
        setRecord(found);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-mediqr-text/60">
        Loading record...
      </div>
    );

  if (!record)
    return (
      <div className="min-h-screen flex items-center justify-center text-mediqr-text/60">
        Record not found
      </div>
    );

  return (
    <div className="min-h-screen bg-mediqr-accent/10 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Report Header */}
        <div className="bg-mediqr-accent px-6 py-5 text-white">
          <h1 className="text-3xl font-bold">Medical Checkup Report</h1>
          <p className="text-sm mt-1">
            Patient ID:{" "}
            <span className="font-semibold">{record.patientId}</span>
          </p>
        </div>

        {/* Administrative Details */}
        <section className="p-6 border-b border-mediqr-accent-light">
          <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-4">
            📝 Administrative Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-mediqr-text">
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Patient Name:</span> John Doe
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Date of Birth:</span> 1990-01-01
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Sex/Gender:</span> Male
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Date of Visit:</span>{" "}
                {formatDateTime(record.date)}
              </p>
            </div>
          </div>
        </section>

        {/* Vitals */}
        {record.vitals && (
          <section className="p-6 border-b border-mediqr-accent-light">
            <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-4">
              ❤️ Vitals
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-mediqr-text">
              {record.vitals.bloodPressure && (
                <p>
                  <span className="font-semibold">Blood Pressure:</span>{" "}
                  {record.vitals.bloodPressure}
                </p>
              )}
              {record.vitals.heartRate && (
                <p>
                  <span className="font-semibold">Heart Rate:</span>{" "}
                  {record.vitals.heartRate} bpm
                </p>
              )}
              {record.vitals.temperature && (
                <p>
                  <span className="font-semibold">Temperature:</span>{" "}
                  {record.vitals.temperature} °C
                </p>
              )}
              {record.vitals.weight && (
                <p>
                  <span className="font-semibold">Weight:</span>{" "}
                  {record.vitals.weight} kg
                </p>
              )}
            </div>
          </section>
        )}

        {/* Diagnosis */}
        {record.diagnosis && (
          <section className="p-6 border-b border-mediqr-accent-light">
            <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-3">
              🩺 Diagnosis
            </h2>
            <p className="text-mediqr-text leading-relaxed">
              {record.diagnosis}
            </p>
          </section>
        )}

        {/* Treatment */}
        {record.treatment && (
          <section className="p-6 border-b border-mediqr-accent-light">
            <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-3">
              💊 Treatment
            </h2>
            <p className="text-mediqr-text leading-relaxed">
              {record.treatment}
            </p>
          </section>
        )}

        {/* Medications */}
        {(record.medications?.length ?? 0) > 0 && (
          <section className="p-6 border-b border-mediqr-accent-light">
            <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-3">
              💊 Medications
            </h2>
            <div className="flex flex-wrap gap-2">
              {record.medications!.map((med, i) => (
                <UITag key={i} label={med} color="mediqr" />
              ))}
            </div>
          </section>
        )}

        {/* Notes */}
        {record.notes && (
          <section className="p-6 border-b border-mediqr-accent-light">
            <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-3">
              🗒 Notes
            </h2>
            <p className="text-mediqr-text leading-relaxed">{record.notes}</p>
          </section>
        )}

        {/* Attachments */}
        {(record.attachments?.length ?? 0) > 0 && (
          <section className="p-6">
            <h2 className="flex items-center gap-2 bg-mediqr-accent text-white px-3 py-1 font-semibold rounded mb-3">
              📎 Attachments
            </h2>
            <div className="flex flex-wrap gap-2">
              {record.attachments!.map((att, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-mediqr-neutral text-mediqr-text hover:bg-mediqr-accent-light transition-colors"
                >
                  {att}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SlugPatientRecordClient;
