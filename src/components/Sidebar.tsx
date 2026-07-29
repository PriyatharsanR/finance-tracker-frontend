"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/utils/constants";
import type { PageName } from "@/types";

const PAGE_MAP: Record<string, PageName> = {
  "/dashboard": "dashboard",
  "/categories": "categories",
  "/transactions": "transactions",
  "/reports": "reports",
  "/profile": "profile",
};

export default function Sidebar() {
  const pathname = usePathname();
  const activePage = PAGE_MAP[pathname] || "dashboard";

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r border-outline-variant bg-surface-container-lowest py-lg px-md shrink-0">
      <div className="flex items-center gap-sm mb-2xl px-sm">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-sm">account_balance</span>
        </div>
        <div>
          <h1 className="text-headline-md font-headline-md font-extrabold text-primary">
            FinTrack
          </h1>
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            Premium Finance
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-sm">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.href.replace("/", "");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-md px-sm py-sm rounded-lg transition-colors duration-150 ${
                isActive
                  ? "text-primary font-bold bg-surface-container-low scale-95 transition-transform"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  isActive
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {item.icon}
              </span>
              <span className="text-label-md font-label-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-lg border-t border-outline-variant">
        <Link
          href="/login"
          className="flex items-center gap-md px-sm py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors duration-150"
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="text-label-md font-label-md">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
