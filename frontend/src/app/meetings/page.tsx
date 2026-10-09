"use client";

import Link from "next/link";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/Button";

const TABS = [
  "Upcoming",
  "Previous",
  "Attachments",
  "Personal Room",
  "Meeting Templates",
  "Meeting Agendas",
];

export default function MeetingsPage() {
  return (
    <PortalLayout>
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[22px] font-bold text-gray-900">Meetings</h1>
          
          {/* Split Button Group */}
          <div className="flex">
            <Link href="/schedule">
              <Button className="rounded-r-none pr-3">
                + Schedule a Meeting
              </Button>
            </Link>
            <Button 
              className="rounded-l-none border-l border-white/20 px-2" 
              aria-label="More scheduling options"
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 flex gap-8 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
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

        {/* Empty State Content */}
        <div className="mt-24 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-[22px] font-bold text-gray-900">
            Welcome to Zoom Meetings!
          </h2>
          <p className="mt-4 max-w-[600px] text-[15px] leading-relaxed text-gray-800">
            Schedule new and manage existing meetings all in one place. You are
            currently limited to 40 minutes per meeting. Upgrade now if you need
            more time.{" "}
            <Link href="#" className="text-zoom-blue hover:underline">
              Learn More
            </Link>
          </p>
          
          <div className="mt-8 flex gap-4">
            <Link href="/schedule">
              <Button size="md">Schedule a Meeting</Button>
            </Link>
            <button className="h-10 px-4 rounded-lg border border-gray-300 bg-white text-[15px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
