"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, Smartphone, QrCode } from "lucide-react";

export default function LandingPage() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      desc: "Your records are encrypted and only accessible by you or authorized people.",
    },
    {
      icon: Smartphone,
      title: "Access Anywhere",
      desc: "Your complete medical history is available whenever and wherever you need it.",
    },
    {
      icon: QrCode,
      title: "Instant QR Sharing",
      desc: "Share life-saving information during emergencies with a single scan.",
    },
  ];

  const steps = [
    {
      title: "Create Your Account",
      desc: "Sign up and provide your basic personal information securely.",
    },
    {
      title: "View Your Records",
      desc: "Access and manage your health information in one dashboard.",
    },
    {
      title: "Use Your QR Code",
      desc: "Share medical details instantly during appointments or emergencies.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-mediqr-accent-light/40 to-mediqr-neutral/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <header className="py-6 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-mediqr-dark flex items-center gap-2">
            <HeartPulse className="w-7 h-7 text-mediqr" />
            MediQr
          </h1>

          <nav className="flex space-x-5 items-center">
            <Link
              href="/sign-in"
              className="text-mediqr font-medium hover:text-mediqr-dark transition"
            >
              Login
            </Link>
            <Link
              href="/create-account"
              className="text-white bg-mediqr px-4 py-2 rounded-xl shadow hover:bg-mediqr-dark transition"
            >
              Sign Up
            </Link>
          </nav>
        </header>

        {/* HERO */}
        <section className="text-center py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-mediqr-dark mb-4 leading-tight">
              Your Health Information
              <br />
              <span className="text-mediqr">Made Simple</span>
            </h2>

            <p className="max-w-2xl mx-auto text-lg text-mediqr-text/80 mb-10">
              Access and share your medical history instantly — whether for
              routine checkups or emergency situations.
            </p>

            <Link
              href="/create-account"
              className="inline-block px-10 py-4 bg-mediqr text-white text-lg font-semibold rounded-xl shadow-xl hover:bg-mediqr-dark transition"
            >
              Get Started
            </Link>
          </motion.div>

          <div className="absolute top-0 left-0 w-40 h-40 bg-mediqr-accent-light/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-mediqr/20 rounded-full blur-3xl"></div>
        </section>

        {/* BENEFITS */}
        <section className="py-20">
          <h3 className="text-4xl font-bold text-mediqr-dark text-center mb-14">
            Why Choose MediQr?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center border border-mediqr-accent-light/40"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-mediqr" />
                <h4 className="text-xl font-semibold text-mediqr-dark mb-2">
                  {item.title}
                </h4>
                <p className="text-mediqr-text/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-20 relative">
          <h3 className="text-4xl font-bold text-mediqr-dark text-center mb-16">
            How It Works
          </h3>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l-2 border-dashed border-mediqr/40"></div>

            <div className="space-y-16">
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-5 h-5 bg-mediqr-accent-light border-4 border-white rounded-full shadow absolute left-1/2 -translate-x-1/2 -top-2"></div>

                  <div className="bg-white mt-6 p-6 rounded-2xl shadow-md w-full max-w-md border border-mediqr-accent-light/40">
                    <h4 className="text-xl font-semibold text-mediqr-dark mb-2">
                      {item.title}
                    </h4>
                    <p className="text-mediqr-text/70">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="my-20 px-4">
          <div className="max-w-5xl mx-auto bg-mediqr rounded-2xl p-10 text-center shadow-xl">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Take Control of Your Health
            </h3>

            <p className="text-white/80 max-w-2xl mx-auto mb-6 text-lg">
              Create your MediQr account and securely access your health
              information anytime.
            </p>

            <Link
              href="/patient/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white 
              text-mediqr font-semibold rounded-xl shadow hover:bg-mediqr-accent-light 
              hover:text-white transition-all text-lg"
            >
              Join MediQr
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-mediqr-dark text-white pt-16 pb-8 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-2xl font-bold mb-3">MediQr</h4>
            <p className="text-white/70">
              Your secure digital medical record system — easy to access and
              share.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/patient/login" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/patient/register" className="hover:text-white">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>Email: support@mediqr.ph</li>
              <li>Hotline: (02) 1234-5678</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-white/40 text-sm mt-12">
          © {new Date().getFullYear()} MediQr — All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
