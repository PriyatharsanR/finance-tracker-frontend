"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/categories": "Categories",
  "/transactions": "Transactions",
  "/reports": "Financial Reports",
  "/profile": "Profile",
};

export default function TopNav() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "FinTrack";

  return (
    <header className="flex justify-between items-center w-full px-lg h-16 max-w-container-max mx-auto bg-surface border-b border-outline-variant z-10 sticky top-0">
      {/* Mobile brand */}
      <div className="flex items-center gap-sm md:hidden">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-sm">account_balance</span>
        </div>
        <h1 className="text-headline-md font-headline-md font-black text-on-surface">
          FinTrack
        </h1>
      </div>

      {/* Desktop title or search */}
      <div className="hidden md:block">
        <h2 className="text-headline-md font-headline-md text-on-surface">
          {title}
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-md ml-auto">
        <button className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
          <div className="w-full h-full bg-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-secondary-container text-sm">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
