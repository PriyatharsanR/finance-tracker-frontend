"use client";

import { useState, useMemo, useEffect } from "react";
import Modal from "./Modal";
import { MOCK_CATEGORIES } from "@/utils/constants";
import type { Category, Transaction } from "@/types";

function formatDateForDisplay(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TransactionModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (tx: Transaction) => void;
}) {
  const [date, setDate] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [categoryId, setCategoryId] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const categories = useMemo(
    () => MOCK_CATEGORIES.filter((c) => c.status === "active" && c.type === type),
    [type]
  );

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryId((prev) =>
        categories.some((c) => c.id === prev) ? prev : categories[0].id
      );
    }
  }, [categories]);

  const selectedCategory: Category | undefined = categories.find(
    (c) => c.id === categoryId
  );

  function handleSave() {
    const amountNum = parseFloat(amount);
    if (!date) {
      setError("Please select a date.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const signedAmount = type === "expense" ? -amountNum : amountNum;

    onAdd({
      id: Date.now().toString(),
      date: formatDateForDisplay(date),
      category: selectedCategory?.name || "",
      categoryIcon: selectedCategory?.icon || "receipt_long",
      note: note.trim() || selectedCategory?.name || "Transaction",
      type,
      amount: signedAmount,
      status: "completed",
    });
    onClose();
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/40 outline-none";

  const labelClass = "block text-label-md font-label-md text-on-surface mb-sm";

  return (
    <Modal onClose={onClose}>
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
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px 16px",
            borderBottom: "1px solid #c2c6d6",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                backgroundColor: "rgba(33,112,228,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0058be",
              }}
            >
              <span className="material-symbols-outlined text-[20px]">
                add_card
              </span>
            </div>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#151c27",
                  margin: 0,
                }}
              >
                New Transaction
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#424754",
                  margin: 0,
                }}
              >
                Record an income or expense
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#424754",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Type Selector */}
          <div>
            <label className={labelClass}>Transaction Type</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
              }}
            >
              <button
                type="button"
                onClick={() => setType("expense")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "2px solid",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  ...(type === "expense"
                    ? {
                        borderColor: "#ba1a1a",
                        backgroundColor: "rgba(255,218,214,0.6)",
                        color: "#93000a",
                      }
                    : {
                        borderColor: "#c2c6d6",
                        backgroundColor: "#f0f3ff",
                        color: "#424754",
                      }),
                }}
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_downward
                </span>
                Expense
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "2px solid",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  ...(type === "income"
                    ? {
                        borderColor: "#16a34a",
                        backgroundColor: "#dcfce7",
                        color: "#166534",
                      }
                    : {
                        borderColor: "#c2c6d6",
                        backgroundColor: "#f0f3ff",
                        color: "#424754",
                      }),
                }}
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_upward
                </span>
                Income
              </button>
            </div>
          </div>

          {/* Date & Amount */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <label className={labelClass} htmlFor="tx-date">
                Date
              </label>
              <input
                id="tx-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="tx-amount">
                Amount
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
                  style={{ color: "#424754" }}
                >
                  attach_money
                </span>
                <input
                  id="tx-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-body-md text-on-surface transition-colors outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelClass} htmlFor="tx-category">
              Category
            </label>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px]"
                style={{ color: "#424754" }}
              >
                {selectedCategory?.icon || "category"}
              </span>
              <select
                id="tx-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-body-md text-on-surface transition-colors outline-none appearance-none"
              >
                {categories.length === 0 && <option value="">No categories</option>}
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <span
                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[20px] pointer-events-none"
                style={{ color: "#424754" }}
              >
                arrow_drop_down
              </span>
            </div>
            {categories.length === 0 && (
              <p className="text-label-sm font-label-sm text-on-surface-variant mt-xs">
                No {type} categories exist. Add one in Categories first.
              </p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className={labelClass} htmlFor="tx-note">
              Note
            </label>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px]"
                style={{ color: "#424754" }}
              >
                notes
              </span>
              <input
                id="tx-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-outline-variant bg-surface-bright focus:ring-2 focus:ring-primary focus:border-primary text-body-md font-body-md text-on-surface transition-colors outline-none"
                placeholder="e.g. Grocery shopping, Salary"
              />
            </div>
          </div>

          {error && (
            <p
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#93000a",
                backgroundColor: "#ffdad6",
                padding: "8px 12px",
                borderRadius: "8px",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #c2c6d6",
            backgroundColor: "#f9f9ff",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-md py-2.5 rounded-xl border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-md py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm active:scale-95"
          >
            Save Transaction
          </button>
        </div>
      </div>
    </Modal>
  );
}
