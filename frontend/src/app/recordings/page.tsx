"use client";

import { Check } from "lucide-react";
import Link from "next/link";

import { PortalLayout } from "@/components/layout/PortalLayout";
import { Button } from "@/components/ui/Button";

const TABS = [
  "Cloud recordings",
  "My Notes recordings",
  "Shared with me",
  "Computer recordings",
  "Trash",
];

const FEATURES = [
  "Record your live meetings to cloud storage for convenient downloading and streaming from a browser",
  "Access cloud recordings from any device and easily share them with others",
  "Secure your group chats and channels with cloud storage backup",
  "Capture your meetings in various recording layouts including active speaker, gallery view, and shared screen",
];

export default function RecordingsPage() {
  return (
    <PortalLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Header Section */}
        <h1 className="text-[22px] font-bold text-gray-900">Recordings</h1>

        {/* Tabs Section */}
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

        {/* Main Content (Split Layout) */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-8 items-start">
          
          {/* Left Column: Text & Features */}
          <div className="flex flex-col gap-6">
            <h2 className="text-[26px] leading-[1.3] font-bold text-gray-900">
              Store, stream, and download your video recordings directly from the Zoom Cloud
            </h2>
            
            <ul className="flex flex-col gap-5 mt-2">
              {FEATURES.map((feature, idx) => (
                <li key={idx} className="flex gap-3 text-[15px] leading-relaxed text-gray-800">
                  <div className="mt-0.5 shrink-0 flex items-center justify-center rounded-full bg-green-100 p-0.5 text-green-600 h-5 w-5">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Upgrade Card */}
            <div className="mt-4 rounded-xl bg-[#F5F7F9] p-5 border border-gray-100">
              <p className="text-[15px] text-gray-800 mb-5">
                Receive 10 GB of cloud storage and access to cloud recording by
                upgrading to Zoom Workplace Pro
              </p>
              <Button size="md" className="font-semibold rounded-lg px-5">
                Upgrade to Zoom Workplace Pro
              </Button>
            </div>
          </div>

          {/* Right Column: Promotional Image Placeholder */}
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-blue-50 flex flex-col items-center justify-center p-8 border border-blue-100">
            {/* Note: I added a placeholder for the image graphic on the right side of your screenshot */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center max-w-[280px]">
              <h3 className="font-bold text-zoom-blue mb-2">Promotional Graphic</h3>
              <p className="text-sm text-text-secondary">
                Replace this placeholder with an actual &lt;img&gt; tag for your recording illustration graphic!
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </PortalLayout>
  );
}
