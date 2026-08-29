"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMsg("");
      const response = await authService.login({ email: data.email, password: data.password });
      if (response.data?.token) {
        login(response.data);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-md antialiased">
      <main className="w-full max-w-[420px]">
        {/* Brand Header */}
        <div className="text-center mb-xl">
          <h1 className="font-headline-lg text-headline-lg font-black text-primary mb-xs">
            FinTrack
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Premium Finance Experience
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl soft-shadow p-lg md:p-xl">
          <h2 className="font-headline-md text-headline-md mb-lg">
            Welcome back
          </h2>
          {errorMsg && (
            <div className="mb-md p-3 bg-error-container text-error rounded-md font-label-sm text-label-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
            {/* Email Field */}
            <div>
              <label
                className="block font-label-md text-label-md text-on-surface mb-xs"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">
                    mail
                  </span>
                </div>
                <input
                  {...register("email")}
                  className="w-full pl-xl pr-sm py-sm bg-surface-container-low border border-transparent rounded focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              {errors.email && (
                <p className="text-error font-label-sm text-label-sm mt-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block font-label-md text-label-md text-on-surface mb-xs"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">
                    lock
                  </span>
                </div>
                <input
                  {...register("password")}
                  className="w-full pl-xl pr-sm py-sm bg-surface-container-low border border-transparent rounded focus:bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-body-md font-body-md"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />
              </div>
              {errors.password && (
                <p className="text-error font-label-sm text-label-sm mt-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between pt-xs">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded bg-surface-container-low cursor-pointer"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-xs block font-body-md text-body-md text-on-surface-variant cursor-pointer"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-sm">
              <button
                className="w-full flex justify-center py-sm px-md border border-transparent rounded shadow-sm font-label-md text-label-md text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Footer Links */}
        <p className="mt-lg text-center font-body-md text-body-md text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link
            className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors ml-xs"
            href="/register"
          >
            Register here
          </Link>
        </p>
      </main>
    </div>
  );
}
