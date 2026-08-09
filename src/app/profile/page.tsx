"use client";

import { useState, useRef } from "react";
import AppShell from "@/components/AppShell";
import Modal from "@/components/Modal";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    fullName: "Alex Carter",
    email: "alex.carter@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
  });
  const [draft, setDraft] = useState({ ...profile });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openEditor = () => {
    setDraft({ ...profile });
    setIsEditing(true);
  };

  const saveProfile = () => {
    setProfile({ ...draft });
    setIsEditing(false);
  };

  const openPasswordModal = () => {
    setPasswords({ current: "", new: "", confirm: "" });
    setPasswordError("");
    setIsChangingPassword(true);
  };

  const changePassword = () => {
    if (!passwords.current) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordError("");
    setIsChangingPassword(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setAvatar(URL.createObjectURL(file));
    e.target.value = "";
  };

  const inputClass =
    "w-full px-sm py-2 bg-surface-bright border border-outline-variant rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors";

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
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-on-secondary-container text-5xl">
                  person
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 bg-primary text-on-primary rounded-full shadow-md hover:bg-on-primary-fixed transition-colors duration-150"
              aria-label="Change profile picture"
            >
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">
              {profile.fullName}
            </h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mb-md">
              {profile.email}
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
                  {profile.fullName}
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Phone Number
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  {profile.phone}
                </div>
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Location
                </label>
                <div className="text-body-md font-body-md text-on-surface">
                  {profile.location}
                </div>
              </div>
            </div>
            <div className="mt-lg pt-md border-t border-outline-variant">
              <button
                onClick={openEditor}
                className="w-full py-2 bg-surface text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-150 text-label-md font-label-md flex justify-center items-center gap-sm"
              >
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
              <button
                onClick={openPasswordModal}
                className="w-full py-2 bg-primary text-on-primary rounded-lg hover:bg-on-primary-fixed transition-colors duration-150 text-label-md font-label-md flex justify-center items-center gap-sm"
              >
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

      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <div
            className="bg-surface rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
            style={{ maxWidth: 480 }}
          >
            <div className="flex justify-between items-center p-lg border-b border-outline-variant">
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Edit Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-lg space-y-md">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Full Name
                </label>
                <input
                  type="text"
                  value={draft.fullName}
                  onChange={(e) =>
                    setDraft({ ...draft, fullName: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Email
                </label>
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) =>
                    setDraft({ ...draft, email: e.target.value })
                  }
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={draft.phone}
                  onChange={(e) =>
                    setDraft({ ...draft, phone: e.target.value })
                  }
                  className={inputClass}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Location
                </label>
                <input
                  type="text"
                  value={draft.location}
                  onChange={(e) =>
                    setDraft({ ...draft, location: e.target.value })
                  }
                  className={inputClass}
                  placeholder="City, State"
                />
              </div>
            </div>
            <div className="p-lg pt-0 flex gap-sm">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-surface text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-150 text-label-md font-label-md"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="flex-1 py-2 bg-primary text-on-primary rounded-lg hover:bg-on-primary-fixed transition-colors duration-150 text-label-md font-label-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {isChangingPassword && (
        <Modal onClose={() => setIsChangingPassword(false)}>
          <div
            className="bg-surface rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
            style={{ maxWidth: 480 }}
          >
            <div className="flex justify-between items-center p-lg border-b border-outline-variant">
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Change Password
              </h3>
              <button
                onClick={() => setIsChangingPassword(false)}
                className="p-1 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-lg space-y-md">
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  className={inputClass}
                  placeholder="At least 8 characters"
                />
              </div>
              <div>
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-xs">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Re-enter new password"
                />
              </div>
              {passwordError && (
                <div className="px-sm py-2 bg-error-container text-on-error-container rounded-lg text-label-sm font-label-sm">
                  {passwordError}
                </div>
              )}
            </div>
            <div className="p-lg pt-0 flex gap-sm">
              <button
                onClick={() => setIsChangingPassword(false)}
                className="flex-1 py-2 bg-surface text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors duration-150 text-label-md font-label-md"
              >
                Cancel
              </button>
              <button
                onClick={changePassword}
                className="flex-1 py-2 bg-primary text-on-primary rounded-lg hover:bg-on-primary-fixed transition-colors duration-150 text-label-md font-label-md"
              >
                Update Password
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
