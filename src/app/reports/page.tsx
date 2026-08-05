"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import {
  MONTHLY_REPORTS,
  formatCurrencyShort,
} from "@/utils/constants";

const YEARS = Object.keys(MONTHLY_REPORTS).sort((a, b) => b.localeCompare(a));
const CHART_WIDTH = 800;
const CHART_HEIGHT = 300;
const CHART_X_MIN = 80;
const CHART_X_MAX = 770;
const CHART_Y_MIN = 30;
const CHART_Y_MAX = 280;

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    d += ` C ${mx},${p0.y} ${mx},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
}

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState(YEARS[0] ?? "2023");

  const monthly = useMemo(
    () => MONTHLY_REPORTS[selectedYear] ?? [],
    [selectedYear]
  );

  const totalIncome = monthly.reduce((s, m) => s + m.income, 0);
  const totalExpense = monthly.reduce((s, m) => s + m.expense, 0);
  const netIncome = totalIncome - totalExpense;

  const chart = useMemo(() => {
    const nets = monthly.map((m) => m.income - m.expense);
    const maxNet = Math.max(Math.ceil(Math.max(...nets, 1) / 1000) * 1000, 1);
    const yFor = (v: number) =>
      CHART_Y_MAX - (v / maxNet) * (CHART_Y_MAX - CHART_Y_MIN);

    const step = (CHART_X_MAX - CHART_X_MIN) / Math.max(nets.length - 1, 1);
    const points = nets.map((net, i) => ({
      x: CHART_X_MIN + i * step,
      y: yFor(net),
    }));

    const gridValues = [maxNet, maxNet * 0.75, maxNet * 0.5, maxNet * 0.25, 0];

    const labelIndexes = [0, 2, 4, 6, 8, 10, 11].filter(
      (i) => i < points.length
    );

    return {
      nets,
      maxNet,
      points,
      gridValues,
      labelIndexes,
      linePath: buildSmoothPath(points),
      areaPath:
        points.length > 1
          ? `${buildSmoothPath(points)} L ${
              points[points.length - 1].x
            },${CHART_Y_MAX} L ${points[0].x},${CHART_Y_MAX} Z`
          : "",
    };
  }, [monthly]);

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
              Comprehensive breakdown of income and expenses for {selectedYear}.
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
              Net Income Trend {selectedYear}
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
              {/* Grid Lines & Y-Axis Labels */}
              {chart.gridValues.map((value, i) => {
                const y = CHART_Y_MIN + (i * (CHART_Y_MAX - CHART_Y_MIN)) / 4;
                const isLast = i === chart.gridValues.length - 1;
                return (
                  <g key={`grid-${i}`}>
                    <line
                      className="stroke-outline-variant opacity-50"
                      style={{ strokeDasharray: isLast ? undefined : "4" }}
                      x1="50"
                      x2="780"
                      y1={y}
                      y2={y}
                    />
                    <text
                      className="fill-on-surface-variant"
                      style={{
                        fontFamily: "Geist, sans-serif",
                        fontSize: "12px",
                      }}
                      textAnchor="end"
                      x="40"
                      y={y + 4}
                    >
                      {value === 0 ? "$0" : formatCurrencyShort(value)}
                    </text>
                  </g>
                );
              })}
              {/* Area Path */}
              <path fill="url(#primary-gradient)" d={chart.areaPath} />
              {/* Line Path */}
              <path
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={chart.linePath}
              />
              {/* Data Points & X-Axis Labels */}
              {chart.labelIndexes.map((i) => (
                <g key={i}>
                  <circle
                    cx={chart.points[i].x}
                    cy={chart.points[i].y}
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
                    x={chart.points[i].x}
                    y="295"
                  >
                    {monthly[i]?.month.slice(0, 3)}
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
              Monthly Breakdown {selectedYear}
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
                {monthly.map((row) => (
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
