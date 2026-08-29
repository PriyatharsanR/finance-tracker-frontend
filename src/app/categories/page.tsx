"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import AppShell from "@/components/AppShell";
import { CATEGORY_ICONS } from "@/utils/constants";
import type { Category } from "@/types";
import { categoryService, type CategoryResponse } from "@/services/categoryService";

type ModalMode = "add" | "edit" | null;

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterText, setFilterText] = useState("");
  
  function fetchCategories() {
    categoryService.getAllCategories().then(res => {
      if (res.data) {
        setCategories(res.data.map(c => ({
          id: c.id.toString(),
          name: c.name,
          icon: "loyalty",
          type: c.type === "INCOME" ? "income" : "expense",
          status: c.active ? "active" : "inactive"
        })));
      }
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [catType, setCatType] = useState<"expense" | "income">("expense");
  const [selectedIcon, setSelectedIcon] = useState("bolt");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return categories.filter((cat) => {
      const matchesName = cat.name.toLowerCase().includes(filterText.toLowerCase());
      const matchesType = typeFilter === "all" || cat.type === typeFilter;
      const matchesStatus = statusFilter === "all" || cat.status === statusFilter;
      return matchesName && matchesType && matchesStatus;
    });
  }, [categories, filterText, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = categories.length;
    const income = categories.filter((c) => c.type === "income").length;
    const expense = categories.filter((c) => c.type === "expense").length;
    const active = categories.filter((c) => c.status === "active").length;
    return { total, income, expense, active };
  }, [categories]);

  function openAddModal() {
    setModalMode("add");
    setEditingId(null);
    setCategoryName("");
    setCatType("expense");
    setSelectedIcon("bolt");
  }

  function openEditModal(cat: Category) {
    setModalMode("edit");
    setEditingId(cat.id);
    setCategoryName(cat.name);
    setCatType(cat.type);
    setSelectedIcon(cat.icon);
  }

  function closeModal() {
    setModalMode(null);
    setEditingId(null);
    setCategoryName("");
    setCatType("expense");
    setSelectedIcon("bolt");
  }

  async function handleSave() {
    if (!categoryName.trim()) return;

    try {
      if (modalMode === "add") {
        await categoryService.createCategory({
          name: categoryName.trim(),
          type: catType === "income" ? "INCOME" : "EXPENSE"
        });
      } else if (modalMode === "edit" && editingId) {
        await categoryService.updateCategory(Number(editingId), {
          name: categoryName.trim(),
          type: catType === "income" ? "INCOME" : "EXPENSE"
        });
      }
      fetchCategories();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await categoryService.deleteCategory(Number(id));
      fetchCategories();
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleStatus(id: string) {
    console.warn("Toggle disabled: Backend does not natively expose toggle endpoint");
  }

  return (
    <>
      <AppShell>
        <div className="max-w-container-max mx-auto w-full space-y-lg">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-xs">
                Categories
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Manage and organize your financial classifications.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-sm bg-primary text-on-primary px-md py-sm rounded-lg hover:bg-primary-container transition-all shadow-sm font-label-md text-label-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Category
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-md">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">category</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Total</p>
                <p className="text-headline-md font-headline-md text-on-surface">{stats.total}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-[#dcfce7] flex items-center justify-center text-[#166534]">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Income</p>
                <p className="text-headline-md font-headline-md text-on-surface">{stats.income}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-error-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-[20px]">trending_down</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Expense</p>
                <p className="text-headline-md font-headline-md text-on-surface">{stats.expense}</p>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <div>
                <p className="text-label-sm font-label-sm text-on-surface-variant">Active</p>
                <p className="text-headline-md font-headline-md text-on-surface">{stats.active}</p>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row gap-md items-center justify-between shadow-sm">
            <div className="relative w-full sm:w-72">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-xl pr-sm py-sm rounded-lg border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-body-md transition-colors"
                placeholder="Search categories..."
                type="text"
              />
            </div>

            <div className="flex gap-sm flex-wrap">
              <div className="flex bg-surface-container-low p-0.5 rounded-lg">
                {(["all", "income", "expense"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypeFilter(f)}
                    className={`px-3 py-1.5 text-label-sm font-label-sm rounded-md transition-all ${
                      typeFilter === f
                        ? "bg-surface-container-lowest shadow-sm text-on-surface font-medium"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {f === "all" ? "All Types" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex bg-surface-container-low p-0.5 rounded-lg">
                {(["all", "active", "inactive"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 text-label-sm font-label-sm rounded-md transition-all ${
                      statusFilter === f
                        ? "bg-surface-container-lowest shadow-sm text-on-surface font-medium"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {f === "all" ? "All Status" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                      Category
                    </th>
                    <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                      Type
                    </th>
                    <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-medium">
                      Status
                    </th>
                    <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-body-md font-body-md divide-y divide-outline-variant">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                          <p className="text-body-md font-body-md">No categories found</p>
                          <p className="text-label-sm font-label-sm text-on-surface-variant/70">
                            Try adjusting your filters or add a new category
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((cat) => {
                      const isActive = cat.status === "active";
                      const isIncome = cat.type === "income";
                      return (
                        <tr
                          key={cat.id}
                          className="hover:bg-surface-bright/60 transition-colors group"
                        >
                          <td className="py-3 px-md">
                            <div className="flex items-center gap-sm">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                  isActive
                                    ? isIncome
                                      ? "bg-[#dcfce7] text-[#166534]"
                                      : "bg-primary-container/10 text-primary"
                                    : "bg-surface-container-high text-outline"
                                }`}
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  {cat.icon}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span
                                  className={`font-medium ${
                                    isActive ? "text-on-surface" : "text-on-surface-variant line-through decoration-outline/50"
                                  }`}
                                >
                                  {cat.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-md">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-label-sm font-medium ${
                                isIncome
                                  ? "bg-[#dcfce7] text-[#166534]"
                                  : "bg-error-container/70 text-on-error-container"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {isIncome ? "arrow_upward" : "arrow_downward"}
                              </span>
                              {cat.type.charAt(0).toUpperCase() + cat.type.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-md">
                            <button
                              onClick={() => toggleStatus(cat.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-label-sm font-label-sm font-medium cursor-pointer transition-all hover:shadow-sm ${
                                isActive
                                  ? "bg-secondary-container text-on-secondary-container"
                                  : "bg-surface-variant text-on-surface-variant"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isActive ? "bg-emerald-500" : "bg-outline"
                                }`}
                              />
                              {isActive ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="py-3 px-md">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                              <button
                                onClick={() => openEditModal(cat)}
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-container/10 transition-colors"
                                title="Edit"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                onClick={() => toggleStatus(cat.id)}
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-tertiary hover:bg-tertiary-container/10 transition-colors"
                                title={isActive ? "Deactivate" : "Activate"}
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  {isActive ? "toggle_off" : "toggle_on"}
                                </span>
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(cat.id)}
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors"
                                title="Delete"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-outline-variant px-md py-3 flex items-center justify-between bg-surface-container-lowest">
              <span className="text-label-sm font-label-sm text-on-surface-variant">
                Showing {filtered.length} of {categories.length} categories
              </span>
            </div>
          </div>
        </div>
      </AppShell>

      {/* Add/Edit Modal — rendered via portal outside AppShell */}
      {modalMode && (
        <Modal onClose={closeModal}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "448px",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            {/* Header */}
            <div className="px-lg pt-lg pb-md flex justify-between items-center border-b border-outline-variant">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    {modalMode === "add" ? "add_circle" : "edit"}
                  </span>
                </div>
                <div>
                  <h3 className="text-headline-md font-headline-md text-on-surface">
                    {modalMode === "add" ? "New Category" : "Edit Category"}
                  </h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    {modalMode === "add" ? "Add a new classification" : "Update category details"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-on-surface-variant hover:text-on-surface rounded-full p-2 hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="px-lg py-lg space-y-lg max-h-[70vh] overflow-y-auto">
              {/* Name */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-sm">
                  Category Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    label
                  </span>
                  <input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full pl-10 pr-sm py-2.5 rounded-xl border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/40"
                    placeholder="e.g. Groceries, Salary..."
                    type="text"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-sm">
                  Category Type
                </label>
                <div className="grid grid-cols-2 gap-sm">
                  <button
                    type="button"
                    onClick={() => setCatType("expense")}
                    className={`flex items-center justify-center gap-sm py-3 rounded-xl border-2 transition-all font-label-md text-label-md ${
                      catType === "expense"
                        ? "border-error bg-error-container/30 text-on-error-container shadow-sm"
                        : "border-outline-variant bg-surface-bright text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatType("income")}
                    className={`flex items-center justify-center gap-sm py-3 rounded-xl border-2 transition-all font-label-md text-label-md ${
                      catType === "income"
                        ? "border-[#16a34a] bg-[#dcfce7] text-[#166534] shadow-sm"
                        : "border-outline-variant bg-surface-bright text-on-surface-variant hover:border-outline"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                    Income
                  </button>
                </div>
              </div>

              {/* Icon Grid */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-sm">
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {CATEGORY_ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                        selectedIcon === icon
                          ? "border-2 border-primary bg-primary-container/10 text-primary shadow-sm scale-105"
                          : "border border-outline-variant bg-surface-bright hover:bg-surface-container-low text-on-surface-variant hover:scale-105"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-lg py-md border-t border-outline-variant bg-surface flex justify-end gap-sm">
              <button
                type="button"
                onClick={closeModal}
                className="px-md py-2.5 rounded-xl border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!categoryName.trim()}
                className="px-md py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                {modalMode === "add" ? "Create Category" : "Save Changes"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation — rendered via portal */}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "384px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <div className="p-lg text-center space-y-md">
              <div className="w-14 h-14 rounded-full bg-error-container/30 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-error text-[28px]">delete</span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-surface">
                Delete Category?
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant">
                This action cannot be undone. The category will be permanently removed.
              </p>
            </div>
            <div className="px-lg py-md border-t border-outline-variant bg-surface flex justify-center gap-sm">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-md py-2.5 rounded-xl border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-md py-2.5 rounded-xl bg-error text-on-error font-label-md text-label-md hover:bg-on-error-container transition-colors shadow-sm active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
