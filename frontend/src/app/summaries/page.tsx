"use client";

import { Calendar, Info, PackageOpen, Search } from "lucide-react";
import Link from "next/link";

import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/Button";

const TABS = ["My Summaries", "Shared with me", "Trash"];

export default function SummariesPage() {
  return (
    <PortalLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Header */}
        <h1 className="text-[22px] font-bold text-gray-900">Summaries</h1>

        {/* Tabs */}
        <div className="mt-6 flex gap-6 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`pb-3 text-[15px] font-medium transition-colors ${
                i === 0
                  ? "border-b-2 border-zoom-blue text-zoom-blue"
                  : "text-text-secondary hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-[#F2F7FF] px-4 py-3.5 text-[14px] text-gray-800">
          <Info size={20} className="text-zoom-blue shrink-0" />
          <p>
            Enjoy limited access to meeting summary. You can also upgrade for
            unlimited access to meeting summary and more!{" "}
            <Link href="#" className="text-zoom-blue hover:underline">
              Upgrade
            </Link>
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px] max-w-[340px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by topic or Meeting ID"
              className="block w-full rounded-full border border-gray-300 py-1.5 pl-10 pr-4 text-[14px] placeholder:text-gray-400 focus:border-zoom-blue focus:outline-none focus:ring-1 focus:ring-zoom-blue"
            />
          </div>

          {/* Date Pickers */}
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-gray-600">From</span>
            <div className="relative">
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                className="block w-[140px] rounded-full border border-gray-300 py-1.5 pl-4 pr-10 text-[14px] placeholder:text-gray-400 focus:border-zoom-blue focus:outline-none focus:ring-1 focus:ring-zoom-blue"
              />
              <Calendar
                size={16}
                className="absolute right-3.5 top-2 text-gray-400 pointer-events-none"
              />
            </div>

            <span className="text-[14px] text-gray-600">To</span>
            <div className="relative">
              <input
                type="text"
                placeholder="MM/DD/YYYY"
                className="block w-[140px] rounded-full border border-gray-300 py-1.5 pl-4 pr-10 text-[14px] placeholder:text-gray-400 focus:border-zoom-blue focus:outline-none focus:ring-1 focus:ring-zoom-blue"
              />
              <Calendar
                size={16}
                className="absolute right-3.5 top-2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <Button size="sm" className="rounded-full px-6 h-[32px] text-[14px]">
            Search
          </Button>
        </div>

        {/* Data Table Header */}
        <div className="mt-8 border-b border-gray-200">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-4 px-2 pb-3 text-[14px] font-medium text-gray-600">
            <div className="flex items-center pr-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 bg-gray-100"
                disabled
              />
            </div>
            <div>Topic</div>
            <div>ID</div>
            <div>Host</div>
            <div>Date Created</div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 text-zoom-blue">
            {/* Using a Lucide package icon to simulate the 3D blue box illustration */}
            <PackageOpen size={90} strokeWidth={1} className="drop-shadow-sm opacity-90" />
          </div>
          <p className="text-[15px] font-bold text-gray-800">No Data</p>
        </div>
      </div>
    </PortalLayout>
  );
}
