"use client";

import { Calendar, FileText, PackageOpen, Search } from "lucide-react";

import { PortalLayout } from "@/components/layout/PortalLayout";

const PRIMARY_TABS = [
  { label: "My Notes", active: true, isNew: true },
  { label: "Classic Notes", active: false, isNew: false },
];

const SECONDARY_TABS = ["My notes", "Shared with me", "Starred", "Trash"];

export default function NotesPage() {
  return (
    <PortalLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Header */}
        <h1 className="text-[24px] font-bold text-gray-900">Notes</h1>

        {/* Primary Tabs */}
        <div className="mt-6 flex gap-6 border-b border-gray-200">
          {PRIMARY_TABS.map((tab) => (
            <button
              key={tab.label}
              className={`flex items-center pb-3 text-[16px] transition-colors ${
                tab.active
                  ? "border-b-2 border-zoom-blue text-zoom-blue font-medium"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {tab.isNew && (
                <span className="ml-2 rounded-full border border-blue-200 px-1.5 py-[2px] text-[10px] font-bold uppercase leading-none tracking-wide text-zoom-blue">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Secondary Navigation & Search */}
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-1 text-[14px] font-medium">
            {SECONDARY_TABS.map((tab, i) => (
              <button
                key={tab}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  i === 0
                    ? "bg-[#E6F0FF] text-zoom-blue"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-[280px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-full rounded-lg border border-gray-300 py-1.5 pl-9 pr-4 text-[14px] placeholder:text-gray-500 focus:border-zoom-blue focus:outline-none focus:ring-1 focus:ring-zoom-blue"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6">
          <div className="flex w-fit items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-[14px] text-gray-500">
            <Calendar size={16} />
            <input
              type="text"
              placeholder="Start date"
              className="w-[80px] bg-transparent placeholder:text-gray-400 focus:outline-none"
            />
            <span>-</span>
            <input
              type="text"
              placeholder="End date"
              className="w-[80px] bg-transparent placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Data Table Header */}
        <div className="mt-6 flex items-center bg-[#F7F9FA] px-4 py-3.5 text-[14px] font-medium text-gray-800 rounded-t-sm">
          <div className="w-[48px]">
            {/* Empty space for checkbox alignment */}
          </div>
          <div className="flex-1">Name</div>
          <div className="w-[200px] text-left">Modified time</div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="relative mb-6 text-zoom-blue">
            <PackageOpen
              size={90}
              strokeWidth={1.2}
              className="opacity-90 drop-shadow-sm"
            />
            {/* Using yellow FileText icons to simulate the yellow notes flying out of the box */}
            <FileText
              size={24}
              strokeWidth={1.5}
              className="absolute -right-4 -top-2 rotate-12 text-[#FFD54F]"
            />
            <FileText
              size={20}
              strokeWidth={1.5}
              className="absolute -top-6 left-2 -rotate-12 text-[#FFD54F]"
            />
          </div>
          <p className="text-[15px] text-gray-500">No notes found</p>
        </div>
      </div>
    </PortalLayout>
  );
}
