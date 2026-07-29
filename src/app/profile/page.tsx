"use client";

import AppShell from "@/components/AppShell";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="max-w-container-max mx-auto w-full p-md md:p-lg xl:p-2xl gap-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-end mb-sm">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              Profile Settings
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
              Manage your personal information and security preferences.
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
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-md hover:bg-on-primary-fixed transition-colors duration-150">
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: "'FILL' 1",
                  fontSize: "16px",
                }}
              >
                edit
              </span>
            </button>
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              Alex Carter
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-md">
              alex.carter@example.com
            </p>
            <div className="flex items-center justify-center md:justify-start gap-sm">
              <span className="px-sm py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-label-sm">
                Premium Member
              </span>
              <span className="px-sm py-1 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-label-sm">
                Joined 2023
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-md">
          {/* Personal Information */}
          <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-primary">
                badge
              </span>
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Personal Information
              </h3>
            </div>
            <div className="space-y-md flex-1">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Full Name
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  Alex Carter
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Phone Number
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  +1 (555) 123-4567
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Location
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  San Francisco, CA
                </div>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-outline-variant">
              <button className="w-full py-2 bg-surface text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-150 text-label-md font-label-md flex justify-center items-center gap-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  edit_note
                </span>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex items-center gap-sm mb-lg">
              <span className="material-symbols-outlined text-primary">
                lock
              </span>
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Security
              </h3>
            </div>
            <div className="space-y-md flex-1">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Password
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  ••••••••••••
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Two-Factor Authentication
                </label>
                <div className="flex items-center gap-sm">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-body-md font-body-md text-on-surface">
                    Enabled via SMS
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Active Sessions
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  2 Devices
                </div>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-outline-variant">
              <button className="w-full py-2 bg-primary text-on-primary rounded-lg hover:bg-on-primary-fixed transition-colors duration-150 text-label-md font-label-md flex justify-center items-center gap-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  key
                </span>
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Logout */}
        <div className="md:hidden mt-lg flex justify-center">
          <button className="w-full py-3 bg-error-container text-on-error-container rounded-lg hover:bg-error hover:text-on-error transition-colors duration-150 text-label-md font-label-md flex justify-center items-center gap-sm font-bold">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </div>
    </AppShell>
  );
}
