"use client";

import { Book, ChevronRight, CreditCard, Download, Settings, User } from "lucide-react";
import Link from "next/link";

import { Avatar } from "@/components/layout/Avatar";
import { useCurrentUser } from "@/components/layout/CurrentUserProvider";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/Menu";
import { useToast } from "@/components/ui/Toast";
import { NOT_AVAILABLE } from "@/components/ui/Tooltip";

/** The avatar at the right of the top nav, with the expanded profile menu. */
export function AvatarMenu() {
  const user = useCurrentUser();
  const showToast = useToast();

  if (user === null) {
    return <span aria-hidden="true" className="size-8 rounded-lg bg-btn-disabled" />;
  }

  return (
    <Menu>
      <MenuTrigger asChild>
        <button type="button" aria-label="Open profile menu" className="rounded-xl ring-offset-2 focus:outline-none focus:ring-2 focus:ring-zoom-blue border-2 border-transparent hover:border-zoom-blue/20 transition-all p-0.5">
          <Avatar
            name={user.name}
            color={user.avatar_color}
            className="size-8 rounded-[10px] text-lg shadow-sm"
          />
        </button>
      </MenuTrigger>
      
      <MenuContent className="w-[280px] p-2">
        {/* Header Section */}
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <Avatar
            name={user.name}
            color={user.avatar_color}
            className="size-11 rounded-xl text-xl shadow-sm"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-[15px] text-gray-900">{user.name}</p>
            <p className="truncate text-[13px] text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <MenuSeparator />
        
        {/* Main Links */}
        <div className="py-1">
          <MenuItem 
            icon={User} 
            label="Profile" 
            onSelect={() => { window.location.href = "/profile"; }} 
          />
          <MenuItem icon={Settings} label="Settings" onSelect={() => showToast(NOT_AVAILABLE)} />
          <MenuItem icon={CreditCard} label="Plans and billing" onSelect={() => showToast(NOT_AVAILABLE)} />
          <MenuItem 
            icon={Book} 
            label="Help" 
            onSelect={() => showToast(NOT_AVAILABLE)} 
            rightElement={<ChevronRight size={16} strokeWidth={2} className="text-gray-500" />}
          />
        </div>
        
        <MenuSeparator />
        
        {/* Secondary Links */}
        <div className="py-1">
          <MenuItem label="Add account" onSelect={() => showToast(NOT_AVAILABLE)} />
          <MenuItem label="Sign out" onSelect={() => showToast(NOT_AVAILABLE)} />
        </div>
        
        {/* Upgrade Card */}
        <div className="mx-2 my-2 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
          <p className="font-bold text-gray-900 text-[15px]">Get more from Zoom</p>
          <p className="mt-1 text-[13px] leading-snug text-gray-700">
            Upgrade to Zoom Workplace Pro for unlimited meetings and more
          </p>
          <button className="mt-3 rounded-full bg-[#0b5cff] px-4 py-1.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-700">
            Upgrade now
          </button>
        </div>
        
        {/* Footer Link */}
        <div className="mt-1 pb-2 flex justify-center">
          <Link href="#" className="flex items-center gap-2 text-[14px] text-zoom-blue hover:underline">
            <Download size={16} strokeWidth={2} />
            Download the Zoom app
          </Link>
        </div>
      </MenuContent>
    </Menu>
  );
}
