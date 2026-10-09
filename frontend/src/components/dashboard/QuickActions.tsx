"use client";

import clsx from "clsx";
import { Calendar, SquarePlus, Video } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { useStartMeeting } from "@/hooks/useStartMeeting";

const ACTION_CLASSES = "group flex flex-col items-center gap-2 rounded-xl p-1 hover:brightness-95";
const TILE_CLASSES = "flex size-13 items-center justify-center rounded-xl text-white";
const LABEL_CLASSES = "text-[13px] font-semibold text-text-secondary group-hover:underline";

/** The three big buttons at the top right of Home. */
export function QuickActions() {
  const { pending, startNewMeeting } = useStartMeeting();

  return (
    <Card className="flex flex-col px-4 py-6 pb-5">
      <div className="grid grid-cols-3 gap-2">
        <QuickActionLink href="/schedule" label="Schedule" icon={<ScheduleIcon />} />
        <QuickActionLink href="/join" label="Join" icon={<SquarePlus size={26} />} />
        <button
          type="button"
          onClick={startNewMeeting}
          disabled={pending}
          className={clsx(ACTION_CLASSES, "disabled:cursor-wait")}
        >
          <span className={clsx(TILE_CLASSES, "bg-zoom-orange")}>
            <Video size={28} fill="currentColor" />
          </span>
          <span className={LABEL_CLASSES}>Host</span>
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <h3 className="text-[15px] font-semibold text-gray-900">Personal Meeting ID</h3>
        <div className="mt-1 flex items-center gap-1.5 text-[15px] text-gray-600">
          <span>678 642 0652</span>
          <button aria-label="Copy meeting ID" className="hover:text-gray-900 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
        </div>
      </div>
    </Card>
  );
}

type QuickActionLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

function QuickActionLink({ href, label, icon }: QuickActionLinkProps) {
  return (
    <Link href={href} className={ACTION_CLASSES}>
      <span className={clsx(TILE_CLASSES, "bg-zoom-blue-bright")}>{icon}</span>
      <span className={LABEL_CLASSES}>{label}</span>
    </Link>
  );
}

/** A calendar with a day number on it, like Zoom's Schedule icon. */
function ScheduleIcon() {
  return (
    <span className="relative flex">
      <Calendar size={26} />
      <span className="absolute inset-x-0 bottom-1 text-center text-[9px] leading-none font-bold">
        19
      </span>
    </span>
  );
}
