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
  const { removedCodes, deleteMeeting } = useDeleteMeeting();

  if (resource.status === "loading") {
    return <ListLoading />;
  }
  if (resource.status === "error") {
    return <ListError message={resource.message} onRetry={onRetry} />;
  }

  // Deleted meetings disappear at once, before the server has answered.
  const meetings = resource.data.filter((meeting) => !removedCodes.has(meeting.meeting_code));
  if (meetings.length === 0) {
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

  const groups = groupUpcoming(meetings, new Date());
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <section key={group.label}>
          <h3 className="rounded-lg bg-surface-muted px-2.5 py-1.5 text-xl">{group.label}</h3>
          <ul className="mt-4 flex flex-col gap-4">
            {group.meetings.map((meeting) => (
              <li key={meeting.meeting_code}>
                <MeetingCard meeting={meeting} onDelete={deleteMeeting} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
