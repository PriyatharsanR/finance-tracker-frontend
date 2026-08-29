"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/services/authService";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const response = await authService.register({ name: data.fullName, email: data.email, password: data.password });
      setSuccessMsg(response.message || "Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (err: any) {
      setErrorMsg(err.message || err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(33,112,228,0.05)_0%,rgba(249,249,255,0)_70%)] top-[-100px] left-[-100px] z-[-1] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(146,71,0,0.03)_0%,rgba(249,249,255,0)_70%)] bottom-[-50px] right-[-50px] z-[-1] pointer-events-none" />

      <main className="w-full max-w-[440px] px-md md:px-0 relative z-10">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-lg md:p-xl relative overflow-hidden group">
          {/* Top highlight line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-fixed-dim to-primary" />

          {/* Header */}
          <div className="text-center mb-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-container text-on-primary-container mb-md shadow-sm">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}
              >
                account_balance
              </span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
              Create your account
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join FinTrack to manage your premium finance.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-md p-3 bg-error-container text-error rounded-md font-label-sm text-label-sm">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-md p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-label-sm text-label-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {successMsg}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
            {/* Full Name */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-on-surface-variant">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    person
                  </span>
                </div>
                <input
                  {...register("fullName")}
                  className="block w-full pl-[36px] pr-sm py-sm font-body-md text-body-md bg-surface-container-low border border-outline-variant rounded-md text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150"
                  id="fullName"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              {errors.fullName && (
                <p className="text-error font-label-sm text-label-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-on-surface-variant">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    mail
                  </span>
                </div>
                <input
                  {...register("email")}
                  className="block w-full pl-[36px] pr-sm py-sm font-body-md text-body-md bg-surface-container-low border border-outline-variant rounded-md text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150"
                  id="email"
                  placeholder="you@company.com"
                  type="email"
                />
              </div>
              {errors.email && (
                <p className="text-error font-label-sm text-label-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-on-surface-variant">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    lock
                  </span>
                </div>
                <input
                  {...register("password")}
                  className="block w-full pl-[36px] pr-sm py-sm font-body-md text-body-md bg-surface-container-low border border-outline-variant rounded-md text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              {errors.password && (
                <p className="text-error font-label-sm text-label-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-xs">
              <label
                className="block font-label-md text-label-md text-on-surface"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-on-surface-variant">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    lock_reset
                  </span>
                </div>
                <input
                  {...register("confirmPassword")}
                  className="block w-full pl-[36px] pr-sm py-sm font-body-md text-body-md bg-surface-container-low border border-outline-variant rounded-md text-on-surface focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-150"
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-error font-label-sm text-label-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-sm pb-sm">
              <div className="flex items-center h-5">
                <input
                  {...register("terms")}
                  className="focus:ring-primary h-4 w-4 text-primary border-outline-variant rounded bg-surface-container-low cursor-pointer"
                  id="terms"
                  type="checkbox"
                />
              </div>
              <div className="ml-sm font-body-md text-body-md">
                <label className="text-on-surface-variant" htmlFor="terms">
                  I agree to the{" "}
                  <a
                    className="font-label-md text-primary hover:text-primary-container transition-colors duration-150"
                    href="#"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    className="font-label-md text-primary hover:text-primary-container transition-colors duration-150"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
            </div>
            {errors.terms && (
              <p className="text-error font-label-sm text-label-sm">
                {errors.terms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              className="w-full flex justify-center items-center gap-sm py-sm px-md border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-primary hover:bg-surface-tint focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150 mt-md"
              type="submit"
            >
              Register
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                arrow_forward
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-lg text-center font-body-md text-body-md text-on-surface-variant border-t border-outline-variant pt-lg">
            Already have an account?{" "}
            <Link
              className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors duration-150"
              href="/login"
            >
              Log in here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
