"use client";

import { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import TransactionModal from "@/components/TransactionModal";
import {
  MOCK_TRANSACTIONS,
  EXPENSE_CATEGORIES,
  CHART_MONTHS,
  CHART_INCOME,
  CHART_EXPENSE,
  formatCurrency,
} from "@/utils/constants";
import type { Transaction } from "@/types";

export default function DashboardPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showAddModal, setShowAddModal] = useState(false);

  const topTransactions = transactions.slice(0, 5);

  function handleAddTransaction(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
  }

  return (
    <AppShell>
      <div className="max-w-container-max mx-auto w-full flex-1 flex flex-col gap-lg lg:gap-xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Overview
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Here&apos;s your financial summary for October 2023.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-md py-2 rounded-lg shadow-sm transition-colors flex items-center gap-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Transaction
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
          {/* Current Balance */}
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary-container/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">
                  account_balance_wallet
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md">
                Total
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">
              Current Balance
            </p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">
              $12,450.00
            </h3>
          </div>

          {/* Total Income */}
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className="font-label-sm text-label-sm text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  arrow_upward
                </span>{" "}
                12%
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">
              Total Income
            </p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              +$4,200.00
            </h3>
          </div>

          {/* Total Expense */}
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-error-container rounded-lg text-error">
                <span className="material-symbols-outlined">trending_down</span>
              </div>
              <span className="font-label-sm text-label-sm text-error bg-error-container px-2 py-1 rounded-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  arrow_upward
                </span>{" "}
                4%
              </span>
            </div>
            <p className="font-label-md text-label-md text-on-surface-variant mb-1">
              Total Expense
            </p>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              -$1,850.00
            </h3>
          </div>

          {/* Savings Rate */}
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-shadow group relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">savings</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-md">
                  Excellent
                </span>
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-1">
                Savings Rate
              </p>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                56%
              </h3>
              <div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "56%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md md:gap-lg">
          {/* Bar Chart */}
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Cash Flow
              </h3>
              <select className="bg-surface-container-low border-none rounded-lg font-label-sm text-label-sm text-on-surface-variant focus:ring-primary py-1.5 pl-3 pr-8">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 min-h-[240px] pt-4 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-label-sm text-on-surface-variant/50 pb-8 pointer-events-none">
                <span>$5k</span>
                <span>$2.5k</span>
                <span>$0</span>
              </div>
              {/* Grid lines */}
              <div className="absolute left-8 right-0 top-2 border-b border-outline-variant/20 border-dashed" />
              <div className="absolute left-8 right-0 top-1/2 border-b border-outline-variant/20 border-dashed -translate-y-4" />
              <div className="absolute left-8 right-0 bottom-8 border-b border-outline-variant/40" />

              {/* Bar Groups */}
              {CHART_MONTHS.map((month, i) => {
                const isCurrentMonth = month === "Oct";
                return (
                  <div
                    key={month}
                    className="flex-1 flex flex-col items-center justify-end group z-10 pl-8"
                  >
                    <div className="flex gap-1 w-full justify-center items-end">
                      <div
                        className={`w-1/3 rounded-t-sm transition-all duration-300 ${
                          isCurrentMonth
                            ? "bg-primary shadow-[0_0_8px_rgba(33,112,228,0.4)]"
                            : "bg-emerald-400 group-hover:opacity-100 opacity-80"
                        }`}
                        style={{ height: `${CHART_INCOME[i]}%` }}
                      />
                      <div
                        className={`w-1/3 rounded-t-sm transition-all duration-300 ${
                          isCurrentMonth
                            ? "bg-error shadow-[0_0_8px_rgba(186,26,26,0.3)]"
                            : "bg-error/70 group-hover:opacity-100 opacity-80"
                        }`}
                        style={{ height: `${CHART_EXPENSE[i]}%` }}
                      />
                    </div>
                    <span
                      className={`font-label-sm text-label-sm mt-2 ${
                        isCurrentMonth
                          ? "text-on-surface font-semibold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {month}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Income
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-error/70" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Expense
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-surface rounded-xl border border-outline-variant/50 p-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="w-full flex justify-between items-center mb-2 absolute top-lg left-lg right-lg pr-xl">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Expenses
              </h3>
              <button className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined text-sm">
                  more_horiz
                </span>
              </button>
            </div>
            {/* Donut Chart */}
            <div
              className="relative w-48 h-48 rounded-full mt-8"
              style={{
                background:
                  "conic-gradient(#2170e4 0% 40%, #ffb786 40% 65%, #dce2f3 65% 85%, #c2c6d6 85% 95%, #adc6ff 95% 100%)",
              }}
            >
              <div className="absolute inset-0 m-auto w-32 h-32 bg-surface rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Total
                </span>
                <span className="font-headline-md text-headline-md text-on-surface">
                  -$1.85k
                </span>
              </div>
            </div>
            {/* Category Legend */}
            <div className="w-full mt-6 grid grid-cols-2 gap-x-2 gap-y-3">
              {EXPENSE_CATEGORIES.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    {cat.name} ({cat.percent}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-lg border-b border-outline-variant/30 flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface">
              Recent Transactions
            </h3>
            <Link
              href="/transactions"
              className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright/50 border-b border-outline-variant/30">
                  <th className="py-3 px-lg font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Transaction
                  </th>
                  <th className="py-3 px-lg font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Date
                  </th>
                  <th className="py-3 px-lg font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Category
                  </th>
                  <th className="py-3 px-lg font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                    Amount
                  </th>
                  <th className="py-3 px-lg font-label-sm text-label-sm text-on-surface-variant font-medium text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono-data text-mono-data">
                {topTransactions.map((tx) => {
                  const isIncome = tx.type === "income";
                  const isPending = tx.status === "pending";

                  const categoryBg = isIncome
                    ? "bg-emerald-500/10"
                    : "bg-surface-container";
                  const categoryText = isIncome
                    ? "text-emerald-600"
                    : "text-on-surface-variant";
                  const categoryBorder = isIncome
                    ? "border-emerald-500/20"
                    : "border-outline-variant/20";

                  const badgeBg = isIncome
                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                    : "bg-surface-variant text-on-surface-variant border-outline-variant/30";

                  const amountColor = isIncome
                    ? "text-emerald-600"
                    : "text-on-surface";

                  const statusDot = isPending ? "bg-outline" : "bg-emerald-500";
                  const statusContainer = isPending
                    ? "text-on-surface-variant bg-surface-variant"
                    : "text-emerald-600 bg-emerald-500/10";
                  const statusLabel = isPending ? "Pending" : "Completed";

                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors group"
                    >
                      <td className="py-3 px-lg flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center border ${categoryBg} ${categoryText} ${categoryBorder}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {tx.categoryIcon}
                          </span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">
                            {tx.note}
                          </p>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            {tx.paymentMethod || "—"}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-lg text-on-surface-variant">
                        {tx.date}
                      </td>
                      <td className="py-3 px-lg">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-md font-label-sm text-label-sm border ${badgeBg}`}
                        >
                          {tx.category}
                        </span>
                      </td>
                      <td
                        className={`py-3 px-lg text-right font-medium ${amountColor}`}
                      >
                        {formatCurrency(tx.amount)}
                      </td>
                      <td className="py-3 px-lg text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-label-sm text-[11px] ${statusContainer}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusDot}`}
                          />
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && (
        <TransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTransaction}
        />
      )}
    </AppShell>
  );
}
