"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Heart,
  Shield,
  AlertTriangle,
  Pill,
  FileText,
  ArrowLeft,
  User,
  Clock,
} from "lucide-react";
import {
  UIContainer,
  UITag,
  UIAvatar,
  UIInfoCard,
  UIDivider,
  UISectionHeader,
  UIEmptyState,
  UIBadge,
  UIButton,
  UIButtonSecondary,
  UIGrid,
} from "@/app/components/ui/general/UIComponent";
import { formatBloodType, formatDateTime } from "@/lib/utils";

interface PatientProfileClientProps {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    gender: string | null;
    bloodType: string | null;
    medicalHistory: string[];
    allergies: string[];
    medications: string[];
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
    profilePhoto: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function PatientProfileClient({ patient }: PatientProfileClientProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const fullName = `${patient.firstName} ${patient.lastName}`;
  const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-mediqr-accent/5 via-white to-mediqr-accent/5">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-mediqr via-mediqr-dark to-mediqr text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              {patient.profilePhoto ? (
                <div className="relative w-32 h-32 rounded-2xl border-4 border-white/30 shadow-2xl overflow-hidden">
                  <Image
                    src={patient.profilePhoto}
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl border-4 border-white/30 shadow-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">{initials}</span>
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-mediqr-success rounded-full p-2 border-4 border-white shadow-lg">
                <Shield size={20} className="text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{fullName}</h1>
              <p className="text-white/80 mb-4">Patient ID: {patient.id}</p>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Mail size={16} />
                  <span className="text-sm">{patient.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Phone size={16} />
                  <span className="text-sm">{patient.phone}</span>
                </div>
              </div>
            </div>

            <Link href="/fill-your-information">
              <UIButton className="bg-white text-mediqr hover:bg-white/90 shadow-xl">
                <Edit size={18} />
                Edit Profile
              </UIButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-8">
        {/* Quick Stats */}
        <UIGrid cols={4} gap="md" className="mb-8">
          <UIInfoCard
            icon={Calendar}
            label="Age"
            value={`${calculateAge(patient.dateOfBirth)} years`}
            description={formatDate(patient.dateOfBirth)}
          />
          <UIInfoCard
            icon={Heart}
            label="Blood Type"
            value={patient.bloodType ? formatBloodType(patient.bloodType) : "Not set"}
            description="Emergency info"
          />
          <UIInfoCard
            icon={Users}
            label="Gender"
            value={patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : "Not set"}
            description="Demographic"
          />
          <UIInfoCard
            icon={FileText}
            label="Medical Records"
            value={patient.medicalHistory.length}
            description="Conditions recorded"
          />
        </UIGrid>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <UIContainer>
              <UISectionHeader
                title="Personal Information"
                description="Basic demographic and contact details"
              />
              <UIGrid cols={2} gap="md">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Date of Birth
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-mediqr-accent" />
                    <p className="font-semibold text-mediqr-dark">
                      {formatDate(patient.dateOfBirth)}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Gender
                  </p>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-mediqr-accent" />
                    <p className="font-semibold text-mediqr-dark">
                      {patient.gender
                        ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)
                        : "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Blood Type
                  </p>
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-mediqr-accent" />
                    <p className="font-semibold text-mediqr-dark">
                      {patient.bloodType ? formatBloodType(patient.bloodType) : "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Address
                  </p>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-mediqr-accent mt-1" />
                    <p className="font-semibold text-mediqr-dark">{patient.address}</p>
                  </div>
                </div>
              </UIGrid>
            </UIContainer>

            {/* Emergency Contact */}
            <UIContainer>
              <UISectionHeader
                title="Emergency Contact"
                description="Contact information for medical emergencies"
                action={
                  <UIBadge variant="danger" size="sm">
                    <AlertTriangle size={12} className="mr-1" />
                    Emergency
                  </UIBadge>
                }
              />
              <UIGrid cols={3} gap="md">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Name
                  </p>
                  <p className="font-semibold text-mediqr-dark">
                    {patient.emergencyContact.name || "Not provided"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Phone
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-mediqr-accent" />
                    <p className="font-semibold text-mediqr-dark">
                      {patient.emergencyContact.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-mediqr-text/60 uppercase tracking-wide">
                    Relationship
                  </p>
                  <p className="font-semibold text-mediqr-dark">
                    {patient.emergencyContact.relationship || "Not provided"}
                  </p>
                </div>
              </UIGrid>
            </UIContainer>

            {/* Medical History */}
            <UIContainer>
              <UISectionHeader
                title="Medical History"
                description="Past medical conditions and diagnoses"
              />
              {patient.medicalHistory.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.medicalHistory.map((history, index) => (
                    <UIBadge key={index} variant="info">
                      {history}
                    </UIBadge>
                  ))}
                </div>
              ) : (
                <UIEmptyState
                  icon={FileText}
                  title="No Medical History"
                  description="No past medical conditions have been recorded yet."
                />
              )}
            </UIContainer>
          </div>

          {/* Right Column - Medical Info */}
          <div className="space-y-6">
            {/* Allergies */}
            <UIContainer>
              <UISectionHeader
                title="Allergies"
                description="Known allergies and adverse reactions"
                action={
                  <UIBadge variant="danger" size="sm">
                    Critical
                  </UIBadge>
                }
              />
              {patient.allergies.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {patient.allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertTriangle size={16} className="text-red-600 flex-shrink-0" />
                      <span className="font-medium text-red-800">{allergy}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <UIEmptyState
                  icon={Shield}
                  title="No Known Allergies"
                  description="No allergies have been recorded."
                />
              )}
            </UIContainer>

            {/* Current Medications */}
            <UIContainer>
              <UISectionHeader
                title="Current Medications"
                description="Medications currently being taken"
              />
              {patient.medications.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {patient.medications.map((medication, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <Pill size={16} className="text-green-600 flex-shrink-0" />
                      <span className="font-medium text-green-800">{medication}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <UIEmptyState
                  icon={Pill}
                  title="No Current Medications"
                  description="No medications are currently being taken."
                />
              )}
            </UIContainer>

            {/* Account Info */}
            <UIContainer>
              <UISectionHeader
                title="Account Information"
                description="Profile metadata"
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-mediqr-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-mediqr-accent" />
                    <span className="text-sm text-mediqr-text/60">Created</span>
                  </div>
                  <span className="text-sm font-medium text-mediqr-dark">
                    {formatDateTime(patient.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-mediqr-accent/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-mediqr-accent" />
                    <span className="text-sm text-mediqr-text/60">Last Updated</span>
                  </div>
                  <span className="text-sm font-medium text-mediqr-dark">
                    {formatDateTime(patient.updatedAt)}
                  </span>
                </div>
              </div>
            </UIContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
