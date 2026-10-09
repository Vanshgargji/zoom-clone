"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { AvatarMenu } from "@/components/layout/AvatarMenu";
import { NotAvailable } from "@/components/ui/Tooltip";
import { useStartMeeting } from "@/hooks/useStartMeeting";

// Zoom's marketing links. Shown on wide screens only, as placeholders.
const MARKETING_LINKS = ["Products", "Solutions", "Resources", "Plans & Pricing"];

// Adjusted to match the screenshot (slightly smaller text, tight layout)
const NAV_ITEM_CLASSES = "flex items-center gap-1 rounded text-[15px] font-semibold text-gray-700 hover:text-zoom-blue transition-colors";

/** The white top bar of the web portal. */
export function TopNav() {
  const { pending, startNewMeeting } = useStartMeeting();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-black/10 bg-white px-4 md:px-6">
      {/* A plain text wordmark in Zoom's blue, mimicking Zoom's logo. */}
      <Link
        href="/"
        aria-label="Zoom home"
        className="rounded text-[42px] leading-none font-bold tracking-[-0.06em] text-[#0b5cff]"
      >
        zoom
      </Link>

      <nav aria-label="Zoom website" className="ml-10 hidden items-center gap-8 lg:flex">
        {MARKETING_LINKS.map((label) => (
          <NotAvailable key={label}>
            <button
              type="button"
              aria-disabled="true"
              className="rounded text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {label}
            </button>
          </NotAvailable>
        ))}
      </nav>

      <nav aria-label="Meetings" className="ml-auto flex items-center gap-5 md:gap-7 pr-4">
        <Link href="/schedule" className={NAV_ITEM_CLASSES}>
          Schedule
        </Link>
        
        <Link href="/join" className={NAV_ITEM_CLASSES}>
          Join
        </Link>
        
        {/* Host button with dropdown arrow to match design */}
        <button
          type="button"
          onClick={startNewMeeting}
          disabled={pending}
          className={`${NAV_ITEM_CLASSES} disabled:cursor-wait`}
        >
          Host <ChevronDown size={14} strokeWidth={2.5} className="text-gray-500 mt-0.5" />
        </button>

        {/* Web App button placeholder with dropdown arrow */}
        <NotAvailable>
          <button
            type="button"
            className={NAV_ITEM_CLASSES}
          >
            Web App <ChevronDown size={14} strokeWidth={2.5} className="text-gray-500 mt-0.5" />
          </button>
        </NotAvailable>
      </nav>

      {/* Far right profile avatar */}
      <div className="flex items-center border-l border-transparent pl-2">
        <AvatarMenu />
      </div>
    </header>
  );
}
