"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/auth-actions";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const CreateAccountClient = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      const res = await signUp(formData.email, formData.password);

      if (!res) {
        throw new Error(res || "Registration failed");
      }
      // Redirect to login after "successful registration"
      router.push("/fill-your-information");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-mediqr-accent-light/40 to-mediqr-neutral/60 px-6 py-20 relative overflow-hidden">
      {/* Decorative blur shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-mediqr/20 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-mediqr-accent-light/30 rounded-full blur-3xl opacity-80"></div>

      <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl p-10 space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-mediqr-dark">
            Create Account
          </h2>
          <p className="mt-2 text-mediqr-text/70 text-sm">
            Sign up to securely access your medical records
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-mediqr-dark">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-mediqr-accent/50 
              bg-white/70 shadow-sm placeholder-mediqr-text/40
              focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-mediqr transition-all"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-mediqr-dark">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-mediqr-accent/50 
              bg-white/70 shadow-sm placeholder-mediqr-text/40
              focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-mediqr transition-all"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-mediqr-dark">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 rounded-xl border border-mediqr-accent/50 
              bg-white/70 shadow-sm placeholder-mediqr-text/40
              focus:outline-none focus:ring-2 focus:ring-mediqr focus:border-mediqr transition-all"
              placeholder="Re-enter your password"
            />
          </div>

          {error && (
            <div className="text-sm text-mediqr-danger text-center">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-semibold
            bg-mediqr shadow-lg hover:bg-mediqr-dark transition-all
            disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          {/* Footnote */}
          <p className="text-center text-sm text-mediqr-text/70">
            Already have an account?{" "}
            <Link
              href="/dashboard"
              className="text-mediqr font-semibold hover:text-mediqr-dark"
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountClient;
