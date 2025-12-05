"use server";

import { prisma } from "@/lib/prisma";

import type { Patient } from "@/types/patient-information-types";

type CreatePatientInput = Omit<
  Patient,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

import { Gender, BloodType } from "@/generated/prisma/enums";

export const createPatientRecord = async (
  data: CreatePatientInput,
  userId: string
) => {
  return await prisma.patient.create({
    data: {
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,

      // FIX ENUMS
      gender: data.gender ? (data.gender as Gender) : null,
      bloodType: data.bloodType ? (data.bloodType as BloodType) : null,

      dateOfBirth: new Date(data.dateOfBirth),
      address: data.address,
      emergencyContact: data.emergencyContact,
      medicalHistory: data.medicalHistory,
      allergies: data.allergies,
      medications: data.medications,
    },
  });
};
