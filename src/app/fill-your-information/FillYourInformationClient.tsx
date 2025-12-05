"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { Patient } from "@/types/patient-information-types";
import TagInput from "../components/ui/fill-information/TagsInput";

import { createPatientRecord } from "@/lib/actions/patient-actions";

import { Gender, BloodType } from "@/generated/prisma/enums";

type FormValues = Omit<Patient, "id" | "createdAt" | "updatedAt"> & {
  profilePhoto: File | null;
};

interface User {
  id: string;
  email: string;
}

export default function FillPatientInfo({ user }: { user: User }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user.email,
      phone: "",
      dateOfBirth: "",
      address: "",
      emergencyContact: { name: "", phone: "", relationship: "" },
      medicalHistory: [],
      allergies: [],
      medications: [],
      gender: "",
      bloodType: "",
      profilePhoto: null,
    },
  });

  const profilePhoto = watch("profilePhoto");
  const emergencyContact = watch("emergencyContact");

  useEffect(() => {
    if (!profilePhoto) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(profilePhoto);
  }, [profilePhoto]);

  const handleFileChange = (file: File | null) => {
    setValue("profilePhoto", file);
  };

  const handleEmergencyChange = (
    key: keyof Patient["emergencyContact"],
    value: string
  ) => {
    setValue("emergencyContact", {
      ...emergencyContact,
      [key]: value,
    });
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await createPatientRecord(data, user.id);

      if (!res) {
        throw new Error("Failed to create patient record");
      }

      alert("Information submitted successfully!");
    } catch (err) {
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full px-4 py-3 rounded-xl border border-mediqr-accent/50 bg-white/70 shadow-sm placeholder-mediqr-text/40 focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-mediqr transition-all disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-500   disabled:cursor-not-allowed";

  const labelClass = "block text-sm font-medium text-mediqr-dark";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-mediqr-accent/10 to-mediqr-dark/10 px-4 py-12">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/40">
        <h2 className="text-3xl font-extrabold text-mediqr-dark text-center mb-2">
          Complete Your Profile
        </h2>
        <p className="text-mediqr-text/70 text-center mb-8">
          Fill in your information to generate your MediQR ID.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-36 h-36 rounded-full border border-mediqr-accent/50 shadow-sm overflow-hidden bg-gray-50 cursor-pointer group">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-mediqr-text/50">
                  Upload Photo
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </div>
            <p className="text-sm text-mediqr-text/60">Profile Picture</p>
          </div>

          {/* Name Section */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                {...register("firstName", { required: "First name required" })}
                className={inputClass}
              />
              {errors.firstName && (
                <p className="text-sm text-mediqr-danger mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                {...register("lastName", { required: "Last name required" })}
                className={inputClass}
              />
              {errors.lastName && (
                <p className="text-sm text-mediqr-danger mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number required" })}
              className={inputClass}
            />
            {errors.phone && (
              <p className="text-sm text-mediqr-danger mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* DOB / Email */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                {...register("dateOfBirth", { required: "Required" })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                {...register("email", { required: "Email required" })}
                className={inputClass}
                disabled
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>Address</label>
            <textarea
              {...register("address", { required: "Address required" })}
              rows={3}
              className={inputClass + " resize-none"}
            />
          </div>

          {/* Gender + Blood */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Gender</label>
              <select {...register("gender")} className={inputClass}>
                <option value="">Select Gender</option>
                {Object.values(Gender).map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Blood Type</label>
              <select {...register("bloodType")} className={inputClass}>
                <option value="">Select Blood Type</option>
                {Object.values(BloodType).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Medical History */}
          <TagInput
            label="Medical History"
            value={watch("medicalHistory")}
            onChange={(tags) => setValue("medicalHistory", tags)}
            suggestions={[
              "Diabetes",
              "Hypertension",
              "Asthma",
              "Heart Disease",
              "Stroke",
            ]}
          />

          <TagInput
            label="Allergies"
            value={watch("allergies")}
            onChange={(tags) => setValue("allergies", tags)}
            suggestions={["Peanuts", "Shellfish", "Pollen", "Dust", "Latex"]}
          />

          {/* Medications */}
          <TagInput
            label="Medications"
            value={watch("medications")}
            onChange={(tags) => setValue("medications", tags)}
            suggestions={[
              "Paracetamol",
              "Ibuprofen",
              "Omeprazole",
              "Metformin",
              "Aspirin",
            ]}
          />

          {/* Emergency Contact */}
          <div>
            <label className={labelClass}>Emergency Contact</label>
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <input
                className={inputClass}
                placeholder="Full Name"
                value={emergencyContact?.name ?? ""}
                onChange={(e) => handleEmergencyChange("name", e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Phone"
                value={emergencyContact?.phone ?? ""}
                onChange={(e) => handleEmergencyChange("phone", e.target.value)}
              />
              <input
                className={inputClass}
                placeholder="Relationship"
                value={emergencyContact?.relationship ?? ""}
                onChange={(e) =>
                  handleEmergencyChange("relationship", e.target.value)
                }
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-semibold bg-mediqr shadow-lg hover:bg-mediqr-dark transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Information"}
          </button>
        </form>
      </div>
    </div>
  );
}
