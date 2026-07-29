"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import { MONTHLY_REPORTS, formatCurrency } from "@/utils/constants";

const YEARS = ["2023", "2022", "2021"];

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState("2023");

  const totalIncome = MONTHLY_REPORTS.reduce((s, m) => s + m.income, 0);
  const totalExpense = MONTHLY_REPORTS.reduce((s, m) => s + m.expense, 0);
  const netIncome = totalIncome - totalExpense;

  return (
    <AppShell>
      <div className="max-w-container-max mx-auto space-y-lg pb-3xl md:pb-lg">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface">
              Annual Overview
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Comprehensive breakdown of income and expenses.
            </p>
          </div>
          <div className="flex items-center gap-sm bg-surface dark:bg-surface-container-high p-1 rounded-lg border border-outline-variant">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-md text-label-md font-label-md transition-colors ${
                  selectedYear === year
                    ? "bg-surface-container dark:bg-surface-variant text-on-surface dark:text-on-secondary shadow-sm font-medium"
                    : "text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-variant"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Total Income */}
          <div className="bg-surface dark:bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div className="flex items-center gap-sm mb-md text-on-surface-variant dark:text-surface-variant">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed/50 dark:bg-secondary-fixed-dim/20 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_up
                </span>
              </div>
              <span className="text-label-md font-label-md">Total Income</span>
            </div>
            <div>
              <span className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface dark:text-on-secondary tracking-tighter">
                ${totalIncome.toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-surface dark:bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div className="flex items-center gap-sm mb-md text-on-surface-variant dark:text-surface-variant">
              <div className="w-8 h-8 rounded-full bg-error-container/50 dark:bg-error-container/20 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-error text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  trending_down
                </span>
              </div>
              <span className="text-label-md font-label-md">
                Total Expenses
              </span>
            </div>
            <div>
              <span className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface dark:text-on-secondary tracking-tighter">
                ${totalExpense.toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Net Income */}
          <div className="bg-primary dark:bg-primary-container p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
            <div className="flex items-center gap-sm mb-md text-on-primary/80 dark:text-on-primary-container/80 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-on-primary dark:text-on-primary-container text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_balance
                </span>
              </div>
              <span className="text-label-md font-label-md">Net Income</span>
            </div>
            <div className="relative z-10">
              <span className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-primary dark:text-on-primary-container tracking-tighter">
                ${netIncome.toLocaleString()}.00
              </span>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-surface dark:bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-lg">
            <h3 className="text-headline-md font-headline-md text-on-surface dark:text-on-secondary">
              Net Income Trend
            </h3>
            <button className="flex items-center gap-xs text-primary dark:text-inverse-primary text-label-sm font-label-sm hover:underline">
              <span className="material-symbols-outlined text-sm">
                download
              </span>{" "}
              Export
            </button>
          </div>
          <div className="w-full h-[300px] md:h-[400px] relative">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 800 300"
            >
              <defs>
                <linearGradient
                  id="primary-gradient"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-primary)"
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-primary)"
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line
                className="stroke-outline-variant stroke-1 opacity-50"
                style={{ strokeDasharray: "4" }}
                x1="50"
                x2="780"
                y1="20"
                y2="20"
              />
              <line
                className="stroke-outline-variant stroke-1 opacity-50"
                style={{ strokeDasharray: "4" }}
                x1="50"
                x2="780"
                y1="85"
                y2="85"
              />
              <line
                className="stroke-outline-variant stroke-1 opacity-50"
                style={{ strokeDasharray: "4" }}
                x1="50"
                x2="780"
                y1="150"
                y2="150"
              />
              <line
                className="stroke-outline-variant stroke-1 opacity-50"
                style={{ strokeDasharray: "4" }}
                x1="50"
                x2="780"
                y1="215"
                y2="215"
              />
              <line
                className="stroke-outline-variant stroke-1"
                x1="50"
                x2="780"
                y1="280"
                y2="280"
              />
              {/* Y-Axis Labels */}
              <text
                className="fill-on-surface-variant"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "12px",
                }}
                textAnchor="end"
                x="40"
                y="25"
              >
                $15k
              </text>
              <text
                className="fill-on-surface-variant"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "12px",
                }}
                textAnchor="end"
                x="40"
                y="90"
              >
                $10k
              </text>
              <text
                className="fill-on-surface-variant"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "12px",
                }}
                textAnchor="end"
                x="40"
                y="155"
              >
                $5k
              </text>
              <text
                className="fill-on-surface-variant"
                style={{
                  fontFamily: "Geist, sans-serif",
                  fontSize: "12px",
                }}
                textAnchor="end"
                x="40"
                y="220"
              >
                $0
              </text>
              {/* Area Path */}
              <path
                fill="url(#primary-gradient)"
                d="M 80,280 L 80,180 C 130,170 150,110 200,90 C 250,70 270,140 320,130 C 370,120 390,50 440,40 C 490,30 510,100 560,90 C 610,80 630,160 680,150 C 730,140 750,80 770,70 L 770,280 Z"
              />
              {/* Line Path */}
              <path
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 80,180 C 130,170 150,110 200,90 C 250,70 270,140 320,130 C 370,120 390,50 440,40 C 490,30 510,100 560,90 C 610,80 630,160 680,150 C 730,140 750,80 770,70"
              />
              {/* Data Points & X-Axis Labels */}
              {[
                { cx: 80, cy: 180, label: "Jan" },
                { cx: 200, cy: 90, label: "Mar" },
                { cx: 320, cy: 130, label: "May" },
                { cx: 440, cy: 40, label: "Jul" },
                { cx: 560, cy: 90, label: "Sep" },
                { cx: 680, cy: 150, label: "Nov" },
                { cx: 770, cy: 70, label: "Dec" },
              ].map((pt) => (
                <g key={pt.label}>
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    r="4"
                    fill="var(--color-surface)"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                  />
                  <text
                    className="fill-on-surface-variant"
                    style={{
                      fontFamily: "Geist, sans-serif",
                      fontSize: "12px",
                    }}
                    textAnchor="middle"
                    x={pt.cx}
                    y="295"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Monthly Data Table */}
        <div className="bg-surface dark:bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="p-md md:p-lg border-b border-outline-variant bg-surface-container-lowest dark:bg-surface-container-low">
            <h3 className="text-headline-md font-headline-md text-on-surface dark:text-on-secondary">
              Monthly Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-bright dark:bg-inverse-surface border-b border-outline-variant dark:border-outline text-label-sm font-label-sm text-on-surface-variant dark:text-surface-variant uppercase tracking-wider">
                  <th className="py-sm px-md md:px-lg font-medium">Month</th>
                  <th className="py-sm px-md md:px-lg font-medium text-right">
                    Income
                  </th>
                  <th className="py-sm px-md md:px-lg font-medium text-right">
                    Expense
                  </th>
                  <th className="py-sm px-md md:px-lg font-medium text-right">
                    Net Income
                  </th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md text-on-surface dark:text-on-secondary">
                {MONTHLY_REPORTS.map((row) => (
                  <tr
                    key={row.month}
                    className="border-b border-surface-container dark:border-outline-variant/30 hover:bg-surface-bright/50 dark:hover:bg-surface-variant/20 transition-colors"
                  >
                    <td className="py-md px-md md:px-lg font-medium">
                      {row.month}
                    </td>
                    <td className="py-md px-md md:px-lg text-right font-mono-data text-primary dark:text-primary-fixed-dim">
                      ${row.income.toLocaleString()}.00
                    </td>
                    <td className="py-md px-md md:px-lg text-right font-mono-data text-on-surface-variant dark:text-surface-variant">
                      ${row.expense.toLocaleString()}.00
                    </td>
                    <td className="py-md px-md md:px-lg text-right font-mono-data font-semibold">
                      ${(row.income - row.expense).toLocaleString()}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
