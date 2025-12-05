"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  UIContainer,
  UIBadge,
  UILoading,
  UIEmptyState,
  UIGrid,
  UIReportHeader,
  UIDataField,
  UIVitalCard,
  UIContentSection,
} from "@/app/components/ui/general/UIComponent";
import {
  formatDateTime,
  generateMockRecords,
  simulateApiCall,
} from "@/lib/utils";
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Heart,
  Activity,
  Thermometer,
  Weight,
  Stethoscope,
  Pill,
  ClipboardList,
  Paperclip,
  AlertCircle,
  Download,
} from "lucide-react";
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
      console.error("Failed to load record:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <UILoading fullPage message="Loading record..." />;
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mediqr-accent/5 via-white to-mediqr-accent/5 flex items-center justify-center p-6">
        <UIContainer>
          <UIEmptyState
            icon={AlertCircle}
            title="Record Not Found"
            description="The medical record you're looking for doesn't exist or has been removed."
            action={
              <Link href="/patient-record">
                <button className="px-4 py-2 rounded-xl bg-mediqr text-white font-semibold hover:bg-mediqr-dark transition">
                  Back to Records
                </button>
              </Link>
            }
          />
        </UIContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mediqr-accent/5 via-white to-mediqr-accent/5">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation Header */}
        <div className="mb-8">
          <Link
            href="/patient-record"
            className="inline-flex items-center gap-2 text-mediqr-dark hover:text-mediqr transition group mb-6"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
            <span className="font-medium">Back to Records</span>
          </Link>

          {/* Report Header */}
          <UIReportHeader
            title="Medical Checkup Report"
            subtitle="Comprehensive patient examination record"
            icon={FileText}
            metadata={[
              {
                label: "Patient ID",
                value: record.patientId,
                icon: User,
              },
              {
                label: "Date of Visit",
                value: formatDateTime(record.date),
                icon: Calendar,
              },
            ]}
            badge={
              <UIBadge variant="info" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {formatDateTime(record.date)}
              </UIBadge>
            }
          />
        </div>

        <div className="space-y-6">
          {/* Administrative Details */}
          <UIContainer>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-mediqr-dark mb-2">Administrative Details</h2>
              <p className="text-sm text-mediqr-text/60">Patient and visit information</p>
            </div>
            <UIGrid cols={2} gap="md">
              <UIDataField
                label="Patient Name"
                value="John Doe"
                icon={User}
                iconColor="default"
              />
              <UIDataField
                label="Date of Birth"
                value="1990-01-01"
                icon={Calendar}
                iconColor="default"
              />
              <UIDataField
                label="Sex/Gender"
                value="Male"
                icon={User}
                iconColor="default"
              />
              <UIDataField
                label="Date of Visit"
                value={formatDateTime(record.date)}
                icon={Calendar}
                iconColor="default"
              />
            </UIGrid>
          </UIContainer>

          {/* Vitals */}
          {record.vitals && (
            <UIContainer>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-mediqr-dark mb-2">Vital Signs</h2>
                <p className="text-sm text-mediqr-text/60">Patient vital signs and measurements</p>
              </div>
              <UIGrid cols={2} gap="md" className="md:grid-cols-4">
                {record.vitals.bloodPressure && (
                  <UIVitalCard
                    label="Blood Pressure"
                    value={record.vitals.bloodPressure}
                    icon={Activity}
                    iconColor="red"
                  />
                )}
                {record.vitals.heartRate && (
                  <UIVitalCard
                    label="Heart Rate"
                    value={record.vitals.heartRate}
                    unit="bpm"
                    icon={Heart}
                    iconColor="red"
                  />
                )}
                {record.vitals.temperature && (
                  <UIVitalCard
                    label="Temperature"
                    value={record.vitals.temperature}
                    unit="°C"
                    icon={Thermometer}
                    iconColor="orange"
                  />
                )}
                {record.vitals.weight && (
                  <UIVitalCard
                    label="Weight"
                    value={record.vitals.weight}
                    unit="kg"
                    icon={Weight}
                    iconColor="blue"
                  />
                )}
              </UIGrid>
            </UIContainer>
          )}

          {/* Diagnosis */}
          {record.diagnosis && (
            <UIContentSection
              title="Diagnosis"
              description="Medical diagnosis and clinical findings"
              content={record.diagnosis}
              icon={Stethoscope}
              iconColor="default"
            />
          )}

          {/* Treatment */}
          {record.treatment && (
            <UIContentSection
              title="Treatment"
              description="Treatment plan and medical procedures"
              content={record.treatment}
              icon={Pill}
              iconColor="green"
            />
          )}

          {/* Medications */}
          {(record.medications?.length ?? 0) > 0 && (
            <UIContainer>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-mediqr-dark mb-2">Medications</h2>
                <p className="text-sm text-mediqr-text/60">Prescribed medications and dosages</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {record.medications!.map((med, i) => (
                  <UIBadge key={i} variant="info" size="md" className="text-base py-2 px-4">
                    <Pill size={14} className="mr-2" />
                    {med}
                  </UIBadge>
                ))}
              </div>
            </UIContainer>
          )}

          {/* Notes */}
          {record.notes && (
            <UIContentSection
              title="Clinical Notes"
              description="Additional notes and observations"
              content={record.notes}
              icon={ClipboardList}
              iconColor="default"
            />
          )}

          {/* Attachments */}
          {(record.attachments?.length ?? 0) > 0 && (
            <UIContainer>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-mediqr-dark mb-2">Attachments</h2>
                <p className="text-sm text-mediqr-text/60">Related documents and files</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {record.attachments!.map((att, i) => (
                  <a
                    key={i}
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-mediqr-accent/10 text-mediqr-dark border border-mediqr-accent/20 hover:bg-mediqr-accent/20 hover:border-mediqr-accent/30 transition-all shadow-sm hover:shadow-md"
                  >
                    <Paperclip size={16} />
                    {att}
                    <Download size={14} className="opacity-60" />
                  </a>
                ))}
              </div>
            </UIContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlugPatientRecordClient;
