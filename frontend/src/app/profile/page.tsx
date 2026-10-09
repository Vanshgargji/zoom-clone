"use client";

import { Eye, Info, LogOut, UserCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Avatar } from "@/components/layout/Avatar";
import { useCurrentUser } from "@/components/layout/CurrentUserProvider";
import { PortalLayout } from "@/components/layout/PortalLayout";

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-2 mt-8 rounded-lg bg-[#f7f9fa] px-4 py-2.5 text-[15px] font-semibold text-gray-800">
      {title}
    </div>
  );
}

type ProfileRowProps = {
  label: ReactNode;
  value?: ReactNode;
  actionLabel?: string;
  hideAction?: boolean;
  children?: ReactNode;
};

function ProfileRow({
  label,
  value,
  actionLabel = "Edit",
  hideAction = false,
  children,
}: ProfileRowProps) {
  return (
    <div className="flex flex-col border-b border-gray-100 py-5 text-[14px] last:border-0 sm:flex-row sm:items-start">
      <div className="mb-2 flex w-full items-center gap-1.5 pr-4 text-gray-600 sm:mb-0 sm:w-[30%]">
        {label}
      </div>
      <div className="w-full pr-4 text-gray-900 sm:w-[55%]">
        {value}
        {children}
      </div>
      <div className="mt-2 flex w-full sm:mt-0 sm:w-[15%] sm:justify-end">
        {!hideAction && (
          <button className="text-[14px] text-zoom-blue hover:underline">
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const user = useCurrentUser();

  return (
    <PortalLayout>
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        {/* Info Banner */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-blue-200 bg-[#F2F7FF] p-4 text-[13px] leading-relaxed text-gray-700">
          <UserCheck size={18} className="mt-0.5 shrink-0 text-zoom-blue" />
          <p>
            When you join meetings, webinars, chats or channels hosted on Zoom,
            your profile information, including your name and profile picture,
            may be visible to other participants or members. Your name and email
            address will also be visible to the{" "}
            <Link href="#" className="text-zoom-blue hover:underline">
              account owner
            </Link>{" "}
            and host when you join meetings, webinars, chats or channels on their
            account while you're signed in. The account owner and others in the
            meeting, webinar, chat or channel can share this information with
            apps and others.
          </p>
        </div>

        {/* Profile Header */}
        <div className="mb-6 flex items-start justify-between sm:items-center">
          <div className="flex items-center gap-6">
            <Avatar
              name={user?.name ?? "Prithvi Garg"}
              color={user?.avatar_color ?? "#0b5cff"}
              className="size-[120px] rounded-[24px] text-[48px] shadow-sm"
            />
            <div>
              <h1 className="text-[24px] font-bold text-gray-900">
                {user?.name ?? "Prithvi Garg"}
              </h1>
              <p className="mt-1 text-[15px] text-gray-500">
                {user?.name ?? "Prithvi Garg"}
              </p>
            </div>
          </div>
          <button className="text-[14px] text-zoom-blue hover:underline">
            Edit
          </button>
        </div>

        {/* Personal Information */}
        <SectionTitle title="Personal information" />
        <ProfileRow
          label={
            <>
              Phone <Info size={14} className="text-gray-400" />
            </>
          }
          value="Not set"
          actionLabel="Add"
        />
        <ProfileRow label="Language" value="English" />
        <ProfileRow
          label="Time Zone"
          value="(GMT+5:30) Mumbai, Kolkata, New Delhi"
        />
        <ProfileRow
          label="Date Format"
          value={
            <div className="flex items-center gap-4">
              <span>mm/dd/yyyy</span>
              <span className="text-gray-500">Example: 10/09/2026</span>
            </div>
          }
        />
        <ProfileRow
          label="Time Format"
          value="Use 12-hour time (Example: 02:00 PM)"
        />

        {/* Meeting */}
        <SectionTitle title="Meeting" />
        <ProfileRow
          label="Personal Meeting ID"
          value={
            <div className="flex items-center gap-2">
              <span>*** *** *652</span>
              <button aria-label="Show ID">
                <Eye size={16} className="text-gray-500" />
              </button>
            </div>
          }
        >
          <div className="mt-4">
            <p className="break-all text-gray-900">
              https://us05web.zoom.us/j/*******652?pwd=Iew1mbrJZaN5AS6KlBvryiZFjeXPeM.1
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-gray-500">
              <span>×</span> Use this ID for instant meetings
            </p>
          </div>
        </ProfileRow>
        <ProfileRow
          label="Host Key"
          value={
            <div className="flex items-center gap-2">
              <span>********</span>
              <button aria-label="Show Host Key">
                <Eye size={16} className="text-gray-500" />
              </button>
            </div>
          }
        />

        {/* Account */}
        <SectionTitle title="Account" />
        <ProfileRow
          label="License"
          hideAction
          value={
            <Link href="#" className="text-zoom-blue hover:underline">
              Upgrade to get more features
            </Link>
          }
        >
          <div className="mt-4 flex flex-col gap-5">
            <div className="flex gap-4">
              <span className="w-40 font-semibold text-gray-800">
                Zoom Chat
              </span>
              <span>Enabled</span>
            </div>
            <div className="flex gap-4">
              <span className="w-40 font-semibold text-gray-800">
                Zoom Meetings
              </span>
              <div>
                <p>Basic</p>
                <p className="text-gray-500">
                  You can host up to 40 minutes per meeting.
                </p>
                <Link
                  href="#"
                  className="mt-1 flex items-center gap-1 text-zoom-blue hover:underline"
                >
                  Increase Meeting Capacity{" "}
                  <Info size={14} className="text-gray-400" />
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="w-40 font-semibold text-gray-800">
                Zoom Whiteboard
              </span>
              <span>3 editable boards with standard features</span>
            </div>
            <div className="flex gap-4">
              <span className="w-40 font-semibold text-gray-800">
                Zoom Scheduler
              </span>
              <span>Enabled</span>
            </div>
            <div className="flex gap-4">
              <span className="w-40 font-semibold text-gray-800">
                Zoom Clips Basic
              </span>
              <span>Enabled</span>
            </div>
            <div className="flex gap-4">
              <span className="w-40 font-semibold text-gray-800">
                Zoom Canvas
              </span>
              <span>Enabled</span>
            </div>
          </div>
        </ProfileRow>

        {/* Sign In */}
        <SectionTitle title="Sign In" />
        <ProfileRow
          label="Sign-In Email"
          value={
            <div className="flex items-center gap-2">
              <span>van***@gmail.com</span>
              <button aria-label="Show Email">
                <Eye size={16} className="text-gray-500" />
              </button>
            </div>
          }
        />
        <ProfileRow
          label={
            <>
              Sign-In Phone Number <Info size={14} className="text-gray-400" />
            </>
          }
          value="Not set"
          actionLabel="Add"
        />
        <ProfileRow label="Sign-In Password" value="********" />
        <ProfileRow
          label="Two-Step Verification"
          value="Off"
          actionLabel="Turn On"
        />
        <ProfileRow
          label={
            <>
              OTP Authentication <Info size={14} className="text-gray-400" />
            </>
          }
          value="On"
          actionLabel="Turn Off"
        />
        <ProfileRow
          label={
            <>
              Passkeys <Info size={14} className="text-gray-400" />
            </>
          }
          value="0 of 5 passkeys"
          actionLabel="Start using passkeys"
        />
        <ProfileRow label="Linked Accounts" value="Work Email, Google" hideAction />

        {/* Where you're logged in */}
        <SectionTitle title="Where you're logged in" />
        <div className="mt-4 overflow-x-auto text-[14px]">
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b border-gray-100 text-gray-600">
              <tr>
                <th className="pb-3 font-medium">Devices Name</th>
                <th className="pb-3 font-medium">OS</th>
                <th className="pb-3 font-medium">Last Login Location</th>
                <th className="pb-3 font-medium">Last Login Time</th>
                <th className="pb-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {/* Placeholder for the globe icon in the screenshot */}
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      🌐
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Chrome</p>
                      <p className="text-[13px] text-gray-500">Chrome 154.0</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-900">Windows</td>
                <td className="py-4 text-gray-900">Amritsar, Punjab, India</td>
                <td className="py-4 text-gray-900">10/08/2026 08:40 PM</td>
                <td className="py-4 text-right">
                  <button
                    aria-label="Sign out of device"
                    className="inline-flex size-8 items-center justify-center rounded-md bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200"
                  >
                    <LogOut size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="text-[14px] text-zoom-blue hover:underline">
            Sign me out of all sessions
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}
