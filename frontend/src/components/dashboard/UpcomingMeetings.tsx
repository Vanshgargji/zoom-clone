"use client";

import Link from "next/link";
import { ListError, ListLoading } from "@/components/dashboard/ListStatus";
import { MeetingCard } from "@/components/dashboard/MeetingCard";
import { Card } from "@/components/ui/Card";
import { useDeleteMeeting } from "@/hooks/useDeleteMeeting";
import type { Resource } from "@/hooks/useResource";
import { groupUpcoming } from "@/lib/datetime";
import type { MeetingOut } from "@/types/api";

type UpcomingMeetingsProps = {
  resource: Resource<MeetingOut[]>;
  onRetry: () => void;
};

/** The right-hand card on Home: the user's live and scheduled meetings, by day. */
export function UpcomingMeetings(props: UpcomingMeetingsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-gray-900">Meetings</h2>
        <Link href="/meetings" className="text-[15px] font-medium text-zoom-blue hover:underline">
          Visit Meetings
        </Link>
      </div>
      <div className="mt-5">
        <UpcomingList {...props} />
      </div>
    </Card>
  );
}

function UpcomingList({ resource, onRetry }: UpcomingMeetingsProps) {
  // Hardcoded to always show the empty state, replacing the previous meeting list entirely.
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 w-full rounded-xl bg-[#f7f9fa] px-4 py-3">
        <p className="text-[15px] font-bold text-gray-900">No Upcoming Meetings</p>
      </div>
      <button className="rounded-full bg-[#f0f3f8] px-5 py-2 text-[14px] text-zoom-blue transition-colors hover:bg-gray-200">
        Test Audio and Video
      </button>
    </div>
  );
}
