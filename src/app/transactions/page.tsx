"use client";

import { useMemo, useState, useEffect } from "react";
import AppShell from "@/components/AppShell";
import TransactionModal from "@/components/TransactionModal";
import Dropdown, { type DropdownOption } from "@/components/Dropdown";
import {
  formatCurrency,
  getMonthKey,
} from "@/utils/constants";
import type { Transaction } from "@/types";
import { transactionService } from "@/services/transactionService";

type FilterType = "all" | "income" | "expense";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedYear, setSelectedYear] = useState<string>(
    String(new Date().getFullYear())
  );
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await transactionService.getAllTransactions();
        if (res.data) {
          const mapped: Transaction[] = res.data.map((t) => {
            const d = new Date(t.transactionDate);
            return {
              id: t.id.toString(),
              date: isNaN(d.getTime()) ? t.transactionDate : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              category: t.categoryName || "Category",
              categoryIcon: "receipt_long",
              note: t.note || "Transaction",
              type: t.type === "INCOME" ? "income" : "expense",
              amount: t.type === "EXPENSE" ? -t.amount : t.amount,
              status: "completed",
            };
          });
          mapped.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setTransactions(mapped);
        }
      } catch (err) {
        console.error("Failed to load transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const yearOptions: DropdownOption[] = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => ({
      key: String(y),
      label: String(y),
      selected: selectedYear === String(y),
    }));
  }, [selectedYear]);

  const monthOptions: DropdownOption[] = useMemo(() => {
    const activeYear = selectedYear || String(new Date().getFullYear());
    const counts = new Map<string, number>();
    for (const tx of transactions) {
      if (new Date(tx.date).getFullYear() !== Number(activeYear)) continue;
      const key = getMonthKey(tx.date);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return [
      { key: "", label: "All months", selected: !selectedMonth },
      ...months.map((name, i) => {
        const key = `${activeYear}-${String(i + 1).padStart(2, "0")}`;
        const count = counts.get(key) ?? 0;
        return {
          key,
          label: name,
          ...(count > 0 ? { count } : {}),
          selected: key === selectedMonth,
        };
      }),
    ];
  }, [transactions, selectedYear, selectedMonth]);

  const selectedYearLabel =
    yearOptions.find((o) => o.key === selectedYear)?.label ?? selectedYear;
  const selectedMonthLabel =
    monthOptions.find((o) => o.key === selectedMonth)?.label ?? selectedMonth;

  const filtered = transactions.filter((tx) => {
    if (selectedYear && new Date(tx.date).getFullYear() !== Number(selectedYear))
      return false;
    if (selectedMonth && getMonthKey(tx.date) !== selectedMonth) return false;
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
    setTransactions((prev) => [tx, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setCurrentPage(1);
  }

  function selectYear(key: string) {
    setSelectedYear(key);
    setSelectedMonth("");
    setCurrentPage(1);
  }

  function selectMonth(key: string) {
    setSelectedMonth(key);
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
          <div className="flex flex-col sm:flex-row gap-sm w-full md:w-auto">
            <Dropdown
              icon="calendar_month"
              selectedLabel={selectedMonthLabel}
              options={monthOptions}
              onSelect={selectMonth}
            />
            <Dropdown
              icon="calendar_view_month"
              selectedLabel={selectedYearLabel}
              options={yearOptions}
              onSelect={selectYear}
            />
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
                {paginated.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-on-surface-variant text-body-md font-body-md"
                    >
                      No transactions found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-outline-variant p-4 flex items-center justify-between bg-surface-container-lowest">
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              {filtered.length === 0
                ? "No entries"
                : `Showing ${(currentPage - 1) * perPage + 1} to ${Math.min(
                    currentPage * perPage,
                    filtered.length
                  )} of ${filtered.length} entries`}
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
