"use client";

import Link from "next/link";
import { Avatar } from "@/components/layout/Avatar";
import { useCurrentUser } from "@/components/layout/CurrentUserProvider";
import { Card } from "@/components/ui/Card";

/** The signed-in user's card at the top of Home. */
export function ProfileCard() {
  const user = useCurrentUser();

  return (
    <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 min-h-[120px]">
      {user !== null && (
        <>
          <div className="flex items-center gap-5 min-w-0">
            {/* Note: the Avatar component is used here, but you can swap this with an <img src="..."> for your custom graphic */}
            <Avatar
              name={user.name}
              color={user.avatar_color}
              className="size-[84px] rounded-2xl text-[40px] shadow-sm"
            />
            <div className="min-w-0">
              <h2 className="truncate text-[22px] font-bold text-gray-900">{user.name}</h2>
              <p className="mt-1 text-[15px] text-gray-500">
                Plan: <span className="font-semibold text-gray-800">Workplace Basic</span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <button className="rounded-full bg-[#F2F4F8] px-4 py-1.5 text-[14px] font-medium text-zoom-blue transition-colors hover:bg-gray-200">
              Manage Plan
            </button>
            <Link href="#" className="text-[14px] font-medium text-zoom-blue hover:underline sm:pr-2">
              View Plan Details
            </Link>
          </div>
        </>
      )}
    </Card>
  );
}
