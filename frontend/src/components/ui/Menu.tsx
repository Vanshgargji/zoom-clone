"use client";

// Styled wrappers around Radix's dropdown menu, which handles opening, closing
// on Escape or an outside click, and arrow-key navigation.

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const Menu = DropdownMenu.Root;
export const MenuTrigger = DropdownMenu.Trigger;

export function MenuContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align="end"
        sideOffset={6}
        className={clsx("z-50 min-w-44 rounded-xl border border-black/10 bg-white py-1 text-text-primary shadow-[0_4px_24px_rgba(0,0,0,0.12)]", className)}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

type MenuItemProps = {
  icon?: LucideIcon;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  danger?: boolean;
  rightElement?: ReactNode;
};

export function MenuItem({ icon: Icon, label, onSelect, disabled, danger, rightElement }: MenuItemProps) {
  return (
    <DropdownMenu.Item
      disabled={disabled}
      onSelect={onSelect}
      className={clsx(
        // The highlighted background is the focus indicator, so no outline.
        "flex cursor-pointer items-center justify-between px-3 py-2 text-sm outline-none",
        "data-highlighted:bg-surface-active data-disabled:cursor-not-allowed data-disabled:opacity-50",
        danger && "text-zoom-red",
      )}
    >
      <div className="flex items-center gap-2.5">
        {Icon ? <Icon size={18} aria-hidden="true" strokeWidth={1.5} className="text-gray-600" /> : <div className="w-[18px]" />}
        <span className={clsx("text-[15px]", !Icon && "text-gray-800")}>{label}</span>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </DropdownMenu.Item>
  );
}

export function MenuSeparator() {
  return <DropdownMenu.Separator className="my-1 h-px bg-black/10" />;
}
