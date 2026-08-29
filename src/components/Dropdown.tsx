"use client";

import { useState } from "react";

export type DropdownOption = {
  key: string;
  label: string;
  count?: number;
  selected?: boolean;
};

export default function Dropdown({
  icon,
  selectedLabel,
  options,
  onSelect,
}: {
  icon: string;
  selectedLabel: string;
  options: DropdownOption[];
  onSelect: (key: string) => void;
}) {
  const [open, setOpen] = useState(false);

  function pick(key: string) {
    onSelect(key);
    setOpen(false);
  }

  return (
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-sm px-3 py-1.5 border border-outline-variant rounded-lg text-label-md font-label-md hover:bg-surface-container-low transition-colors w-full md:w-auto"
      >
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
        {selectedLabel}
        <span className="material-symbols-outlined text-[18px]">
          arrow_drop_down
        </span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-30 min-w-[200px] bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => pick(opt.key)}
                className={`w-full text-left px-3 py-2 text-label-md font-label-md hover:bg-surface-container-low transition-colors flex items-center justify-between gap-sm ${
                  opt.selected
                    ? "bg-primary-container/10 text-primary"
                    : "text-on-surface"
                }`}
              >
                <span>
                  {opt.label}
                  {typeof opt.count === "number" && (
                    <span className="ml-2 text-on-surface-variant">
                      ({opt.count})
                    </span>
                  )}
                </span>
                {opt.selected && (
                  <span className="material-symbols-outlined text-[16px]">
                    check
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
