"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Download,
  User,
  FileText,
  QrCode,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { signOut } from "@/lib/actions/auth-actions";

export default function DashboardClient() {
  const router = useRouter();

  const handleLogout = async () => {
    // For now, just redirect to login page
    const res = await signOut();

    if (res) {
      router.push("/sign-in");
    }

    return;
  };

  const dashboardItems = [
    {
      title: "Profile Information",
      description: "View and update your personal details and medical info.",
      icon: <User size={28} />,
      href: "/patient-profile",
      buttonText: "Go to Profile",
    },
    {
      title: "QR Code",
      description:
        "Generate and download your MediQR code for emergency access.",
      icon: <QrCode size={28} />,
      href: "/patient-qr",
      buttonText: "Open QR Code",
    },
    {
      title: "Medical Records",
      description: "View your medical history and logs (read-only).",
      icon: <FileText size={28} />,
      href: "/medical-records",
      buttonText: "View Records",
    },
    {
      title: "Download ID Card",
      description: "Save or print your digital MediQR identification card.",
      icon: <Download size={28} />,
      href: "/patient/download-id",
      buttonText: "Download ID",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-mediqr-accent/10 to-mediqr-dark/10 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-mediqr-dark">
              Welcome, Patient 👋
            </h1>
            <p className="text-mediqr-text/70 mt-1">
              Manage your MediQR profile and medical information
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {dashboardItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 
                         hover:shadow-xl hover:bg-white transition cursor-pointer flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-mediqr/10 text-mediqr">
                {item.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-mediqr-dark">
                  {item.title}
                </h2>
                <p className="text-mediqr-text/70 mt-1">{item.description}</p>
                <span className="flex items-center mt-3 text-mediqr font-medium">
                  {item.buttonText}
                  <ChevronRight
                    size={18}
                    className="ml-1 group-hover:translate-x-1 transition"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
