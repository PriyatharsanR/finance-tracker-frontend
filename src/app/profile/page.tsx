"use client";

import { useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import { userService, UserProfile } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const { logout, login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const openEditor = () => {
    if (profile) {
      setEditForm({ name: profile.name, email: profile.email });
      setSaveError("");
      setIsEditing(true);
    }
  };

  const saveProfile = async () => {
    if (!editForm.name.trim() || !editForm.email.trim()) {
      setSaveError("Name and Email cannot be empty.");
      return;
    }
    
    setIsSaving(true);
    setSaveError("");
    try {
      const response = await userService.updateUserProfile(editForm);
      setProfile(response.data);
      if (user) {
         login({ ...user, name: response.data.name, email: response.data.email });
      }
      setIsEditing(false);
    } catch (err: any) {
      setSaveError(err.message || "Unable to save profile changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </AppShell>
    );
  }

  if (error || !profile) {
    return (
      <AppShell>
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-error font-medium text-lg">{error || "Profile not found."}</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto w-full p-4 md:p-8 space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-on-surface tracking-tight">Account Settings</h1>
            <p className="text-on-surface-variant mt-1 text-sm">
              Manage your personal information and preferences.
            </p>
          </div>
        </div>

        {/* Top Profile Card */}
        <div className="bg-surface border border-outline-variant rounded-2xl shadow-sm overflow-hidden">
          <div className="h-32 bg-primary/10 w-full relative">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-transparent"></div>
          </div>
          <div className="px-6 md:px-10 pb-8 relative">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 md:-mt-16">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-surface-container border-4 border-surface shadow-md flex items-center justify-center relative">
                  <span className="material-symbols-outlined text-5xl md:text-6xl text-primary opacity-80">
                    person
                  </span>
                </div>
                
                <div className="text-center md:text-left mt-4 md:mt-0 pb-1">
                  <h2 className="text-2xl font-bold text-on-surface">{profile.name}</h2>
                  <p className="text-on-surface-variant">{profile.email}</p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 w-full md:w-auto flex justify-center md:justify-end">
                <button
                  onClick={openEditor}
                  className="w-full md:w-auto px-5 py-2.5 bg-surface border border-outline-variant text-on-surface rounded-xl hover:bg-surface-container-low transition-colors text-sm font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit Profile
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Information Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-surface border border-outline-variant rounded-2xl shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">badge</span>
               Personal Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div className="flex flex-col">
                <span className="text-sm text-on-surface-variant font-medium mb-1">Full Name</span>
                <span className="text-base text-on-surface">{profile.name}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-on-surface-variant font-medium mb-1">Email Address</span>
                <span className="text-base text-on-surface">{profile.email}</span>
              </div>
              
              <div className="flex flex-col pt-4 border-t border-outline-variant/30">
                <span className="text-sm text-on-surface-variant font-medium mb-1">Access Role</span>
                <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md bg-primary-container text-on-primary-container text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  {profile.role}
                </span>
              </div>
              
              <div className="flex flex-col pt-4 border-t border-outline-variant/30">
                <span className="text-sm text-on-surface-variant font-medium mb-1">Member Since</span>
                <span className="text-base text-on-surface">{formatDate(profile.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions / Side Panel */}
          <div className="bg-surface border border-outline-variant rounded-2xl shadow-sm p-6 md:p-8 flex flex-col">
            <h3 className="text-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">security</span>
               Security & Access
            </h3>
            
            <div className="flex-1 space-y-4">
               <div className="p-4 rounded-xl border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="font-medium text-sm text-on-surface">Password</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">Change your password</p>
                     </div>
                     <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
               </div>
               
               <div className="p-4 rounded-xl border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group">
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="font-medium text-sm text-on-surface">Two-step Verification</p>
                        <p className="text-xs text-on-surface-variant mt-0.5">Not enabled</p>
                     </div>
                     <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant">
              <button 
                onClick={handleLogout}
                className="w-full py-2.5 bg-error-container/50 text-on-error-container rounded-xl hover:bg-error-container transition-colors text-sm font-medium flex justify-center items-center gap-2 group"
              >
                <span className="material-symbols-outlined text-[18px] group-hover:text-error">logout</span>
                Sign Out
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "480px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">edit_document</span>
                 Update Personal Details
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors flex items-center justify-center p-1.5"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="p-6 space-y-5 flex-1 overflow-y-auto w-full">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter your full name"
                  disabled={isSaving}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-surface border border-outline-variant rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="you@example.com"
                  disabled={isSaving}
                />
              </div>

              {saveError && (
                <div className="p-3 bg-error-container border border-error/20 text-on-error-container rounded-lg text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <p>{saveError}</p>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                disabled={isSaving}
                className="px-6 py-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary/90 shadow-sm transition-all text-sm font-medium flex items-center justify-center min-w-[100px]"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
