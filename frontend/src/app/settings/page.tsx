"use client";

import { Info, Search, X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { PortalLayout } from "@/components/layout/PortalLayout";

// ------------------------------------------------------------------
// Custom UI Components for Settings Page
// ------------------------------------------------------------------

function Toggle({ checked = false }: { checked?: boolean }) {
  return (
    <div
      className={`relative flex h-5 w-[38px] shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors ${
        checked ? "bg-[#0b5cff]" : "bg-gray-400"
      }`}
    >
      <div
        className={`size-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-0"
        }`}
      />
    </div>
  );
}

function Radio({ checked = false, label, tooltip }: { checked?: boolean; label: string; tooltip?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <div
        className={`flex size-4 items-center justify-center rounded-full border ${
          checked ? "border-[#0b5cff]" : "border-gray-400"
        }`}
      >
        {checked && <div className="size-2 rounded-full bg-[#0b5cff]" />}
      </div>
      <span className="text-[14px] text-gray-700">{label}</span>
      {tooltip && <Info size={14} className="text-gray-400" />}
    </label>
  );
}

function Checkbox({ checked = false, label, tooltip }: { checked?: boolean; label: string; tooltip?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-2 mt-1">
      <div
        className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded border ${
          checked ? "border-[#0b5cff] bg-[#0b5cff]" : "border-gray-400"
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="text-[14px] text-gray-700">{label}</span>
      {tooltip && <Info size={14} className="mt-0.5 text-gray-400" />}
    </label>
  );
}

function SettingBlock({
  title,
  isNew,
  description,
  checked,
  children,
}: {
  title: string;
  isNew?: boolean;
  description?: ReactNode;
  checked?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col border-b border-gray-100 py-6 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {isNew && (
              <span className="rounded-full border border-blue-200 px-1.5 py-[1px] text-[10px] font-bold uppercase leading-none tracking-wide text-zoom-blue">
                New
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">
              {description}
            </p>
          )}
        </div>
        <Toggle checked={checked} />
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-[18px] font-bold text-gray-900">{title}</h2>
      <div className="rounded-2xl border border-gray-200 px-6 bg-white shadow-sm">
        {children}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Page Component
// ------------------------------------------------------------------

const TOP_TABS = [
  "Zoom AI", "General", "Meeting", "Recording", "Mail & Calendar", "Scheduler",
  "Audio Conferencing", "Zoom Apps", "Whiteboard", "My Notes"
];

const SIDE_NAV = [
  "Conversations", "Meeting", "ZoomMate", "Clips", "My Notes", "Canvas", "Paper", "Sheets", "Slides"
];

export default function SettingsPage() {
  return (
    <PortalLayout>
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8">
        
        {/* Search Bar */}
        <div className="relative mb-6 w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search settings"
            className="block w-full rounded-full border border-gray-300 py-1.5 pl-9 pr-4 text-[14px] placeholder:text-gray-500 focus:border-zoom-blue focus:outline-none focus:ring-1 focus:ring-zoom-blue"
          />
        </div>

        {/* Top Horizontal Tabs */}
        <div className="mb-6 flex gap-6 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
          {TOP_TABS.map((tab, i) => (
            <button
              key={tab}
              className={`pb-3 text-[16px] transition-colors ${
                i === 0
                  ? "border-b-2 border-gray-900 text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-900 font-medium"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <p className="mb-8 text-[15px] text-gray-600">
          Responsible AI is at the core of our generative AI capabilities.
        </p>

        {/* Main Body Layout (Sidebar + Content) */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[220px] shrink-0 sticky top-24 hidden lg:block">
            <nav className="flex flex-col">
              {SIDE_NAV.map((nav, i) => (
                <div key={nav} className="flex relative">
                  {i === 0 && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#0b5cff] rounded-r-md" />
                  )}
                  <button
                    className={`w-full text-left py-2.5 pl-4 pr-2 text-[14px] transition-colors ${
                      i === 0 ? "font-semibold text-gray-900" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {nav}
                  </button>
                </div>
              ))}
            </nav>
            
            {/* Resources Card */}
            <div className="mt-8 rounded-2xl bg-[#f7f9fa] p-5">
              <h4 className="font-semibold text-gray-900 mb-4 text-[14px]">Resources</h4>
              <ul className="flex flex-col gap-4 text-[14px]">
                <li><Link href="#" className="text-zoom-blue hover:underline">Whitepaper</Link></li>
                <li><Link href="#" className="text-zoom-blue hover:underline">Getting started guide</Link></li>
                <li><Link href="#" className="text-zoom-blue hover:underline">Onboarding Center</Link></li>
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full flex-1 min-w-0">
            
            {/* Conversations Section */}
            <SettingsSection title="Conversations">
              <SettingBlock
                title="Show conversational AI"
                checked={true}
                description="Account members can interact with Zoom AI through side-panel conversations on the Zoom Workplace app or web. Zoom AI will be able to access Zoom data according to user permissions, as well as enabled third-party data sources. All conversation history with Zoom AI will be retained unless configured in the conversation retention settings."
              />
              <SettingBlock
                title="Show ZoomMate"
                isNew
                checked={false}
              >
                <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-[#F2F7FF] px-4 py-3 text-[13px] text-gray-800">
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-zoom-blue shrink-0" />
                    <p>
                      This setting needs to be configured in the <Link href="#" className="text-zoom-blue hover:underline">ZoomMate</Link> section.
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
                </div>
              </SettingBlock>
              <SettingBlock
                title="Workflows"
                isNew
                checked={true}
                description={
                  <>
                    Users can create their own personal agentic workflows to automate multi-step tasks, and share workflows<br />
                    <span className="mt-1 block text-[13px]">NOTE: <strong>Workflow Automation</strong> setting in the <Link href="#" className="text-zoom-blue hover:underline">Workflow Automation Tab</Link> needs to be enabled, together with the sub setting <strong>Create & Share | Allow users to create and manage workflows</strong>, to fully enable Workflow in ZoomMate.</span>
                  </>
                }
              />
            </SettingsSection>

            {/* Meeting Section */}
            <SettingsSection title="Meeting">
              <SettingBlock
                title="Participants can request the host to start in-meeting AI features"
                checked={true}
              />
              <SettingBlock
                title="Restrict Zoom AI features and transcription when external users join"
                checked={false}
                description="Automatically restrict Zoom AI and transcription features when external users or groups join a meeting."
              />
              <SettingBlock
                title="Allow users to ask questions in-meeting with AI"
                checked={true}
                description={
                  <>
                    Zoom AI answers the meeting questions based on what is said in the meeting. If a transcript is retained, participants with access will be able to ask questions after the meeting based on that transcript. <Info size={14} className="inline text-gray-400" />
                  </>
                }
              >
                <div className="ml-2 flex flex-col gap-4">
                  <Checkbox label="Auto-start when the meeting starts" checked={false} />
                  
                  <div>
                    <p className="mb-2 font-semibold text-gray-900 text-[14px] flex items-center gap-1.5">
                      Who can ask questions about the meeting: <Info size={14} className="text-gray-400" />
                    </p>
                    <div className="flex flex-col gap-2 ml-1">
                      <Radio label="All participants and invitees" />
                      <Radio label="All participants only from when they join" checked />
                      <Radio label="Participants and invitees in our organization" />
                      <Radio label="Participants in our organization only from when they join" />
                      <Radio label="Only meeting host" />
                    </div>
                  </div>
                </div>
              </SettingBlock>
              <SettingBlock
                title="Meeting summary with AI"
                checked={true}
                description={
                  <>
                    Allow hosts to generate a summary. Summaries are sent based on sharing permissions after the meeting has ended. <Info size={14} className="inline text-gray-400" />
                  </>
                }
              >
                <div className="ml-2 flex flex-col gap-4">
                  <Checkbox label="Auto-start when meeting starts" checked={false} />
                  <div>
                    <Checkbox label="Send an email notification when sharing with participants" checked={true} />
                    <div className="mt-2 ml-7">
                      <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-[14px] text-gray-700 bg-white w-[300px] outline-none focus:border-zoom-blue">
                        <option>Include summary text in the email</option>
                      </select>
                    </div>
                  </div>
                  <Checkbox label="Restrict users from sharing summaries" checked={false} tooltip />
                  
                  <div className="mt-2">
                    <p className="mb-2 font-semibold text-gray-900 text-[14px] flex items-center gap-1.5">
                      Automatically share summary with: <Info size={14} className="text-gray-400" />
                    </p>
                    <div className="flex flex-col gap-2 ml-1">
                      <Radio label="Only me (meeting host)" checked tooltip />
                      <Radio label="Only meeting host, co-hosts, and alternative hosts" />
                      <Radio label="Only me (meeting host) and meeting invitees in our organization" tooltip />
                      <Radio label="All meeting invitees including those outside of our organization" tooltip />
                    </div>
                  </div>
                </div>
              </SettingBlock>
              <SettingBlock
                title="Catch up with AI when joining late"
                checked={false}
                description={
                  <>
                    When you join a meeting late, you'll get a prompt for AI to summarize what's been discussed so far. <Info size={14} className="inline text-gray-400" />
                  </>
                }
              />
              <SettingBlock
                title="Use full display names for meeting assets generated by AI"
                checked={false}
              />
            </SettingsSection>

            {/* Canvas Section */}
            <SettingsSection title="Canvas">
              <SettingBlock
                title="Canvas content generation and revision with AI"
                checked={true}
                description="Allow users to use AI to generate and revise content in Canvas. Meeting transcripts from meeting summaries will be shown to hosts and can be used to create document content."
              />
              <SettingBlock
                title="Canvas sentence completion with AI"
                checked={true}
                description="Allow users to have predictive writing suggestions appear while writing."
              />
            </SettingsSection>

            {/* Paper Section */}
            <SettingsSection title="Paper">
              <SettingBlock
                title="Paper content generation and revision with AI"
                checked={false}
                description="Allow users to use AI to generate and revise content in Zoom Paper. Meeting transcripts from meeting summaries will be shown to hosts and can be used to create documents."
              />
            </SettingsSection>

            {/* Sheets Section */}
            <SettingsSection title="Sheets">
              <SettingBlock
                title="Sheets content generation and revision with AI"
                checked={false}
              />
            </SettingsSection>

          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
