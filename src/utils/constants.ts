import type { NavItem, Transaction, Category } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { label: "Categories", icon: "category", href: "/categories" },
  { label: "Transactions", icon: "receipt_long", href: "/transactions" },
  { label: "Reports", icon: "analytics", href: "/reports" },
  { label: "Profile", icon: "person", href: "/profile" },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    date: "Oct 24, 2023",
    category: "Housing",
    categoryIcon: "apartment",
    note: "Downtown Apartments",
    type: "expense",
    amount: -1250.0,
    status: "completed",
    paymentMethod: "ACH Transfer",
  },
  {
    id: "2",
    date: "Oct 20, 2023",
    category: "Salary",
    categoryIcon: "work",
    note: "TechCorp Inc.",
    type: "income",
    amount: 4200.0,
    status: "completed",
    paymentMethod: "Direct Deposit",
  },
  {
    id: "3",
    date: "Oct 18, 2023",
    category: "Food & Dining",
    categoryIcon: "shopping_cart",
    note: "Whole Foods Market",
    type: "expense",
    amount: -142.5,
    status: "completed",
    paymentMethod: "Debit Card *4092",
  },
  {
    id: "4",
    date: "Oct 15, 2023",
    category: "Utilities",
    categoryIcon: "bolt",
    note: "City Energy Co.",
    type: "expense",
    amount: -85.2,
    status: "pending",
    paymentMethod: "Auto-pay",
  },
  {
    id: "5",
    date: "Oct 14, 2023",
    category: "Transport",
    categoryIcon: "directions_car",
    note: "Shell Station",
    type: "expense",
    amount: -45.0,
    status: "completed",
    paymentMethod: "Credit Card *8812",
  },
  {
    id: "6",
    date: "Oct 12, 2023",
    category: "Groceries",
    categoryIcon: "shopping_cart",
    note: "Whole Foods Market",
    type: "expense",
    amount: -142.5,
  },
  {
    id: "7",
    date: "Oct 10, 2023",
    category: "Salary",
    categoryIcon: "work",
    note: "Tech Corp Inc.",
    type: "income",
    amount: 4250.0,
  },
  {
    id: "8",
    date: "Oct 08, 2023",
    category: "Housing",
    categoryIcon: "home",
    note: "Monthly Rent",
    type: "expense",
    amount: -1800.0,
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Housing", icon: "home", type: "expense", status: "active" },
  {
    id: "2",
    name: "Food & Dining",
    icon: "restaurant",
    type: "expense",
    status: "active",
  },
  {
    id: "3",
    name: "Salary",
    icon: "payments",
    type: "income",
    status: "active",
  },
  {
    id: "4",
    name: "Transport",
    icon: "directions_car",
    type: "expense",
    status: "active",
  },
  {
    id: "5",
    name: "Utilities",
    icon: "bolt",
    type: "expense",
    status: "active",
  },
  {
    id: "6",
    name: "Old Subscriptions",
    icon: "subscriptions",
    type: "expense",
    status: "inactive",
  },
];

export const EXPENSE_CATEGORIES = [
  { name: "Housing", percent: 40, color: "#2170e4" },
  { name: "Food", percent: 25, color: "#ffb786" },
  { name: "Transport", percent: 20, color: "#dce2f3" },
  { name: "Utilities", percent: 10, color: "#c2c6d6" },
  { name: "Fun", percent: 5, color: "#adc6ff" },
];

export type MonthlyReport = { month: string; income: number; expense: number };

export const MONTHLY_REPORTS: Record<string, MonthlyReport[]> = {
  "2023": [
    { month: "January", income: 11200, expense: 6400 },
    { month: "February", income: 10800, expense: 5900 },
    { month: "March", income: 15500, expense: 7200 },
    { month: "April", income: 12100, expense: 6100 },
    { month: "May", income: 14300, expense: 8500 },
    { month: "June", income: 13400, expense: 7200 },
    { month: "July", income: 15200, expense: 6800 },
    { month: "August", income: 12800, expense: 7400 },
    { month: "September", income: 14100, expense: 6300 },
    { month: "October", income: 14900, expense: 7900 },
    { month: "November", income: 13300, expense: 6500 },
    { month: "December", income: 16700, expense: 8800 },
  ],
  "2022": [
    { month: "January", income: 9800, expense: 6100 },
    { month: "February", income: 10100, expense: 5700 },
    { month: "March", income: 12400, expense: 6900 },
    { month: "April", income: 10900, expense: 5800 },
    { month: "May", income: 11800, expense: 7200 },
    { month: "June", income: 13100, expense: 6900 },
    { month: "July", income: 12200, expense: 6500 },
    { month: "August", income: 11500, expense: 7000 },
    { month: "September", income: 12900, expense: 6000 },
    { month: "October", income: 13600, expense: 7400 },
    { month: "November", income: 12400, expense: 6200 },
    { month: "December", income: 14900, expense: 8100 },
  ],
  "2021": [
    { month: "January", income: 8800, expense: 5600 },
    { month: "February", income: 9200, expense: 5300 },
    { month: "March", income: 11300, expense: 6600 },
    { month: "April", income: 9800, expense: 5500 },
    { month: "May", income: 10400, expense: 6800 },
    { month: "June", income: 11900, expense: 6400 },
    { month: "July", income: 11200, expense: 6100 },
    { month: "August", income: 10100, expense: 6600 },
    { month: "September", income: 11700, expense: 5800 },
    { month: "October", income: 12400, expense: 7100 },
    { month: "November", income: 11800, expense: 6000 },
    { month: "December", income: 13600, expense: 7700 },
  ],
};

export const CHART_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
export const CHART_INCOME = [60, 65, 70, 55, 80, 85];
export const CHART_EXPENSE = [30, 40, 35, 50, 45, 38];

export const CATEGORY_ICONS = [
  "bolt",
  "directions_car",
  "shopping_cart",
  "medical_services",
  "school",
  "home",
  "restaurant",
  "payments",
  "subscriptions",
  "work",
  "fitness_center",
  "flight",
];

export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-$${formatted}` : `+$${formatted}`;
}

export function formatCurrencyShort(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1000) {
    return `$${(abs / 1000).toFixed(1)}k`;
  }
  return `$${abs.toFixed(2)}`;
}
