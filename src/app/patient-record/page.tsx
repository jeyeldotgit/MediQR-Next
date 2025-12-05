"use client";

import { useEffect, useState } from "react";
import {
  UIContainer,
  UIBadge,
  UIEmptyState,
  UISectionHeader,
  UILoading,
} from "@/app/components/ui/general/UIComponent";
import {
  formatDateTime,
  generateMockRecords,
  simulateApiCall,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FileText, Calendar, Filter } from "lucide-react";

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

type RecordType = "all" | "consultation" | "prescription" | "lab_result" | "procedure" | "other";

/**
 * Gets the display label for a record type
 */
function getRecordTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    consultation: "Consultation",
    prescription: "Prescription",
    lab_result: "Lab Result",
    procedure: "Procedure",
    other: "Other",
  };
  return labels[type] || "Other";
}

/**
 * Gets the badge variant for a record type
 */
function getRecordTypeVariant(type: string): "default" | "success" | "warning" | "danger" | "info" {
  const variants: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
    consultation: "info",
    prescription: "success",
    lab_result: "warning",
    procedure: "default",
    other: "default",
  };
  return variants[type] || "default";
}

const PatientRecordsClient = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<RecordType>("all");
  const router = useRouter();

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await simulateApiCall(generateMockRecords("P-001"));
      if (res.success && res.data) {
        setRecords(res.data);
      }
    } catch (err) {
      console.error("Failed to load records:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(
    (record) => filter === "all" || record.type === filter
  );

  const handleRecordClick = (recordId: string) => {
    router.push(`/patient-records/${recordId}`);
  };

  if (loading) {
    return <UILoading fullPage message="Loading medical records..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mediqr-accent/5 via-white to-mediqr-accent/5">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <UISectionHeader
            title="My Medical Records"
            description="View and manage your complete medical history"
            action={
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-mediqr-text/60" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as RecordType)}
                  className="px-4 py-2 rounded-xl border border-mediqr/30 bg-white/90 focus:outline-none focus:ring-2 focus:ring-mediqr-accent/50 transition text-mediqr-dark text-sm font-medium cursor-pointer"
                >
                  <option value="all">All Records</option>
                  <option value="consultation">Consultations</option>
                  <option value="prescription">Prescriptions</option>
                  <option value="lab_result">Lab Results</option>
                  <option value="procedure">Procedures</option>
                  <option value="other">Other</option>
                </select>
              </div>
            }
          />
        </div>

        {/* Records List */}
        {filteredRecords.length === 0 ? (
          <UIContainer>
            <UIEmptyState
              icon={FileText}
              title="No Records Found"
              description={
                filter === "all"
                  ? "You don't have any medical records yet."
                  : `No ${getRecordTypeLabel(filter)} records found.`
              }
            />
          </UIContainer>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <UIContainer
                key={record.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-l-4 border-l-transparent hover:border-l-mediqr"
                onClick={() => handleRecordClick(record.id)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Record Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-mediqr-accent/10 text-mediqr-accent group-hover:bg-mediqr-accent/20 transition">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-mediqr-dark group-hover:text-mediqr transition">
                          {record.title}
                        </h3>
                        <p className="text-sm text-mediqr-text/70 mt-1 line-clamp-2">
                          {record.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Record Metadata */}
                  <div className="flex flex-col md:items-end gap-3">
                    <div className="flex items-center gap-2">
                      <UIBadge variant={getRecordTypeVariant(record.type)} size="sm">
                        {getRecordTypeLabel(record.type)}
                      </UIBadge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-mediqr-text/60">
                      <Calendar size={14} />
                      <span>{formatDateTime(record.date)}</span>
                    </div>
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
