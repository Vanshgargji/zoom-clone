"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const ABOUT_LINKS = [
  "Zoom Blog", "Customers", "Our Team", "Careers", "Integrations", "Partners", "Investors", "Press", "Sustainability & ESG", "Zoom Cares", "Media Kit", "How to Videos", "Developer Platform", "Zoom Ventures", "Zoom Merchandise Store"
];

const DOWNLOAD_LINKS = [
  "Zoom Workplace App", "Zoom Rooms Client", "Browser Extension", "Outlook Plug-in", "Zoom Plugin for HCL Notes", "Zoom Plugin Admin Tool for HCL Notes", "Android App", "Zoom Virtual Backgrounds"
];

const SALES_LINKS = [
  "0008000503335", "Contact Sales", "Plans & Pricing", "Request a Demo", "Webinars and Events", "Zoom Experience Center"
];

const SUPPORT_LINKS = [
  "Test Zoom", "Account", "Support Center", "Learning Center", "Zoom Community", "Feedback", "Contact Us", "Accessibility", "Developer support", "Privacy, Security, Legal Policies,\nand Modern Slavery Act\nTransparency Statement"
];

const LEGAL_LINKS = [
  "Terms", "Privacy", "Trust Center", "Acceptable Use Guidelines", "Legal & Compliance", "Your Privacy Choices", "Cookie Preferences"
];

export function Footer() {
  return (
    <footer className="bg-[#303342] pt-14 pb-12 px-6 md:px-8 font-sans">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 gap-10 lg:grid-cols-5">
        
        {/* Column 1: About */}
        <div className="flex flex-col gap-2.5">
          <h3 className="mb-2 text-[15px] font-bold text-white">About</h3>
          {ABOUT_LINKS.map(link => (
            <Link key={link} href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>

        {/* Column 2: Download */}
        <div className="flex flex-col gap-2.5">
          <h3 className="mb-2 text-[15px] font-bold text-white">Download</h3>
          {DOWNLOAD_LINKS.map(link => (
            <Link key={link} href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>

        {/* Column 3: Sales */}
        <div className="flex flex-col gap-2.5">
          <h3 className="mb-2 text-[15px] font-bold text-white">Sales</h3>
          {SALES_LINKS.map(link => (
            <Link key={link} href="#" className="text-[13px] text-gray-300 hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>

        {/* Column 4: Support */}
        <div className="flex flex-col gap-2.5 lg:pr-8">
          <h3 className="mb-2 text-[15px] font-bold text-white">Support</h3>
          {SUPPORT_LINKS.map(link => (
            <Link key={link} href="#" className="text-[13px] leading-tight text-gray-300 hover:text-white transition-colors whitespace-pre-wrap">
              {link}
            </Link>
          ))}
        </div>

        {/* Column 5: Language, Currency, Socials */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="mb-3 text-[15px] font-bold text-white">Language</h3>
            <button className="flex w-[120px] items-center justify-between rounded border border-gray-500 bg-transparent px-3 py-1.5 text-[13px] text-gray-300 transition-colors hover:border-gray-300 hover:text-white">
              English <ChevronDown size={14} />
            </button>
          </div>
          <div>
            <h3 className="mb-3 text-[15px] font-bold text-white">Currency</h3>
            <button className="flex w-[150px] items-center justify-between rounded border border-gray-500 bg-transparent px-3 py-1.5 text-[13px] text-gray-300 transition-colors hover:border-gray-300 hover:text-white">
              Indian Rupee ₹ <ChevronDown size={14} />
            </button>
          </div>
          
          <div className="flex gap-2.5">
            {/* Simple SVGs / letters simulating the social icons */}
            <a href="#" aria-label="WordPress" className="flex size-8 items-center justify-center rounded-full bg-[#414557] text-white hover:bg-[#5b6078] transition-colors">
              <span className="font-serif font-bold text-[15px]">W</span>
            </a>
            <a href="#" aria-label="LinkedIn" className="flex size-8 items-center justify-center rounded-full bg-[#414557] text-white hover:bg-[#5b6078] transition-colors">
              <span className="font-bold text-[13px]">in</span>
            </a>
            <a href="#" aria-label="X (Twitter)" className="flex size-8 items-center justify-center rounded-full bg-[#414557] text-white hover:bg-[#5b6078] transition-colors">
              <span className="font-bold text-[15px]">X</span>
            </a>
            <a href="#" aria-label="YouTube" className="flex size-8 items-center justify-center rounded-full bg-[#414557] text-white hover:bg-[#5b6078] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="flex size-8 items-center justify-center rounded-full bg-[#414557] text-white hover:bg-[#5b6078] transition-colors">
              <span className="font-bold text-[16px]">f</span>
            </a>
            <a href="#" aria-label="Instagram" className="flex size-8 items-center justify-center rounded-full bg-[#414557] text-white hover:bg-[#5b6078] transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-2 gap-y-3 text-[13px] text-gray-300">
        <span className="text-white mr-2">Copyright ©2026 Zoom Communications, Inc. All rights reserved.</span>
        
        {LEGAL_LINKS.map((link, i) => (
          <div key={link} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-500">|</span>}
            {i === 0 && <span className="text-gray-500">|</span>}
            <Link href="#" className="hover:text-white transition-colors">
              {link === "Your Privacy Choices" ? (
                <span className="flex items-center gap-1.5">
                  {/* Small simulation of the Privacy Choices blue toggle icon */}
                  <span className="flex h-3 w-[22px] items-center rounded-full bg-blue-600 px-0.5 shadow-inner">
                    <span className="flex size-2 items-center justify-center rounded-full bg-white text-[5px] font-bold text-blue-600">✓</span>
                  </span>
                  {link}
                </span>
              ) : (
                link
              )}
            </Link>
          </div>
        ))}
      </div>
    </footer>
  );
}
