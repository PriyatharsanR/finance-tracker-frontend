export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  joinedYear: number;
  isPremium: boolean;
  phone?: string;
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: "income" | "expense";
  status: "active" | "inactive";
}

export interface Transaction {
  id: string;
  date: string;
  category: string;
  categoryIcon: string;
  note: string;
  type: "income" | "expense";
  amount: number;
  status?: "completed" | "pending";
  paymentMethod?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  filledIcon?: boolean;
}

export type PageName =
  | "dashboard"
  | "categories"
  | "transactions"
  | "reports"
  | "profile";
