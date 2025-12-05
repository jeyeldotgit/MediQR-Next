import { getCurrentUser } from "@/lib/actions/auth-actions";
import { getPatientByUserId } from "@/lib/actions/patient-actions";
import PatientProfileClient from "./PatientProfileClient";
import { redirect } from "next/navigation";

/**
 * Transforms Prisma JsonValue emergencyContact to the expected type
 * @param emergencyContact - The JsonValue from Prisma (can be null, object, array, etc.)
 * @returns A properly typed emergency contact object with default empty strings if invalid
 */
function transformEmergencyContact(
  emergencyContact: unknown
): { name: string; phone: string; relationship: string } {
  // Check if emergencyContact is a valid object with required properties
  if (
    emergencyContact &&
    typeof emergencyContact === "object" &&
    !Array.isArray(emergencyContact) &&
    emergencyContact !== null &&
    "name" in emergencyContact &&
    "phone" in emergencyContact &&
    "relationship" in emergencyContact
  ) {
    const contact = emergencyContact as Record<string, unknown>;
    return {
      name: String(contact.name || ""),
      phone: String(contact.phone || ""),
      relationship: String(contact.relationship || ""),
    };
  }

  // Return default empty values if data is invalid or missing
  return {
    name: "",
    phone: "",
    relationship: "",
  };
}

const PatientProfilePage = async () => {
  // Authenticate user
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Fetch patient data
  const patient = await getPatientByUserId(user.id);
  if (!patient) {
    redirect("/fill-your-information");
  }

  // Transform data for client component
  const transformedPatient = {
    ...patient,
    emergencyContact: transformEmergencyContact(patient.emergencyContact),
  };

  return <PatientProfileClient patient={transformedPatient} />;
};

export default PatientProfilePage;

