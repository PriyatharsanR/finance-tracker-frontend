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

export const MONTHLY_REPORTS = [
  { month: "January", income: 11200, expense: 6400 },
  { month: "February", income: 10800, expense: 5900 },
  { month: "March", income: 15500, expense: 7200 },
  { month: "April", income: 12100, expense: 6100 },
  { month: "May", income: 14300, expense: 8500 },
];

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
