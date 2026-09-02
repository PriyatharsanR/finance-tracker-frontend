"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { userService, UserProfile } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getCurrentUserProfile();
        setProfile(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const getJoinedYear = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).getFullYear();
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-full">
          <p className="text-body-lg text-on-surface-variant font-body-lg">
            Loading profile...
          </p>
        </div>
      </AppShell>
    );
  }

  if (error || !profile) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-full">
          <p className="text-body-lg text-error font-body-lg">
            {error || "Profile not found."}
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-container-max mx-auto w-full p-md md:p-lg xl:p-2xl gap-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-end mb-sm">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              Profile
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
              View your personal information connected to the database.
            </p>
          </div>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-surface border border-outline-variant rounded-xl p-lg md:p-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-lg">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-secondary-container flex items-center justify-center border-4 border-surface shadow-sm overflow-hidden">
              <span className="material-symbols-outlined text-on-secondary-container text-5xl">
                person
              </span>
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              {profile.name}
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-md">
              {profile.email}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-sm">
              <span className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-label-sm">
                Role: {profile.role}
              </span>
              <span className="px-sm py-1 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-label-sm">
                Joined {getJoinedYear(profile.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Database Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-md">
          <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-primary">
                database
              </span>
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Database Details
              </h3>
            </div>
            <div className="space-y-md flex-1">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Full Name
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  {profile.name}
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Email Address
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  {profile.email}
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Global Role
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  {profile.role}
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Joined Date
                </label>
                <div className="text-body-md font-body-md text-on-surface whitespace-pre-wrap">
                  {new Date(profile.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Logout */}
        <div className="md:hidden mt-lg flex justify-center">
          <button 
            onClick={handleLogout}
            className="w-full py-3 bg-error-container text-on-error-container rounded-lg hover:bg-error hover:text-on-error transition-colors duration-150 text-label-md font-label-md flex justify-center items-center gap-sm font-bold"
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </div>
    </AppShell>
  );
}
