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

export default function MobileBottomNav() {
  const pathname = usePathname();
  const activePage = PAGE_MAP[pathname] || "dashboard";

  const leftItems = NAV_ITEMS.slice(0, 2);
  const rightItems = NAV_ITEMS.slice(2, 4);

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-surface border-t border-outline-variant/30 pb-safe z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      <ul className="flex justify-around items-center h-16">
        {leftItems.map((item) => {
          const isActive = activePage === item.href.replace("/", "");
          return (
            <li key={item.href} className="flex-1 flex justify-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary transition-colors"
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
                <span className="font-label-sm text-[10px] leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}

        {/* Floating center add button */}
        <li className="flex-1 flex justify-center relative -top-4">
          <button className="w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </button>
        </li>

        {rightItems.map((item) => {
          const isActive = activePage === item.href.replace("/", "");
          return (
            <li key={item.href} className="flex-1 flex justify-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary transition-colors"
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
                <span className="font-label-sm text-[10px] leading-none">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
