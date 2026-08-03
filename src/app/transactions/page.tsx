"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import TransactionModal from "@/components/TransactionModal";
import { MOCK_TRANSACTIONS, formatCurrency } from "@/utils/constants";
import type { Transaction } from "@/types";

type FilterType = "all" | "income" | "expense";

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  const perPage = 4;
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  function handleAddTransaction(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
    setCurrentPage(1);
  }

  return (
    <AppShell>
      <div className="max-w-container-max mx-auto space-y-lg">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
          <div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface">
              Transactions
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Manage and track your financial activity.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-on-primary hover:bg-surface-tint font-label-md text-label-md py-2 px-4 rounded-lg flex items-center justify-center gap-sm transition-colors shadow-sm whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Transaction
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col md:flex-row gap-md items-center justify-between shadow-sm">
          <div className="flex items-center gap-sm w-full md:w-auto">
            <button className="flex items-center gap-sm px-3 py-1.5 border border-outline-variant rounded-lg text-label-md font-label-md hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                calendar_month
              </span>
              October 2023
              <span className="material-symbols-outlined text-[18px]">
                arrow_drop_down
              </span>
            </button>
          </div>

          <div className="flex bg-surface-container-low p-1 rounded-lg w-full md:w-auto">
            {(["all", "income", "expense"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setCurrentPage(1);
                }}
                className={`flex-1 md:flex-none px-4 py-1.5 text-label-md font-label-md rounded-md transition-all ${
                  filter === f
                    ? "bg-surface-container-lowest shadow-sm text-on-surface"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Mobile Search */}
          <div className="md:hidden relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-body-md focus:outline-none focus:border-primary"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="py-3 px-4 text-label-md font-label-md text-on-surface-variant">
                    Date
                  </th>
                  <th className="py-3 px-4 text-label-md font-label-md text-on-surface-variant">
                    Category
                  </th>
                  <th className="py-3 px-4 text-label-md font-label-md text-on-surface-variant">
                    Note
                  </th>
                  <th className="py-3 px-4 text-label-md font-label-md text-on-surface-variant">
                    Type
                  </th>
                  <th className="py-3 px-4 text-label-md font-label-md text-on-surface-variant text-right">
                    Amount
                  </th>
                  <th className="py-3 px-4 text-label-md font-label-md text-on-surface-variant text-center w-16" />
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md">
                {paginated.map((tx) => {
                  const isIncome = tx.type === "income";
                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-outline-variant hover:bg-surface transition-colors group"
                    >
                      <td className="py-3 px-4 text-on-surface whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-sm">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              isIncome
                                ? "bg-primary-container/20"
                                : "bg-surface-container-high"
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                isIncome
                                  ? "text-primary-container"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {tx.categoryIcon}
                            </span>
                          </div>
                          <span className="text-on-surface font-medium">
                            {tx.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-on-surface-variant truncate max-w-[200px]">
                        {tx.note}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-label-sm font-label-sm ${
                            isIncome
                              ? "bg-primary-container/10 text-primary-container border border-primary-container/20"
                              : "bg-surface-variant text-on-surface-variant"
                          }`}
                        >
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </span>
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-mono-data text-mono-data ${
                          isIncome ? "text-primary-container" : "text-on-surface"
                        }`}
                      >
                        {formatCurrency(tx.amount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="text-outline hover:text-on-surface transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <span className="material-symbols-outlined text-[20px]">
                            more_vert
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-outline-variant p-4 flex items-center justify-between bg-surface-container-lowest">
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              Showing {(currentPage - 1) * perPage + 1} to{" "}
              {Math.min(currentPage * perPage, filtered.length)} of{" "}
              {filtered.length} entries
            </span>
            <div className="flex items-center gap-xs">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-surface-container-low text-on-surface-variant disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-label-md font-label-md flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? "bg-primary text-on-primary"
                        : "hover:bg-surface-container-low text-on-surface"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-surface-container-low text-on-surface-variant disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {showAddModal && (
          <TransactionModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddTransaction}
          />
        )}
      </div>
    </AppShell>
  );
}
