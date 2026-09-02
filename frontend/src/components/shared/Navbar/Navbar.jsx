"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar({ user, notificationCount = 0, onMenuClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "there";
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-[#0f0f0f] border-b border-[#111111]/10 dark:border-white/10 px-4 sm:px-6 py-3">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#111111] dark:text-white flex-shrink-0"
          aria-label="Open menu"
        >
          <Menu size={22} strokeWidth={1.75} />
        </button>

        <div className="flex items-center gap-2 bg-[#F5F1E8] dark:bg-[#1a1a1a] rounded-sm px-3 py-2 flex-1 max-w-md">
          <Search size={16} strokeWidth={1.75} className="text-[#2B2B2B]/40 dark:text-white/40 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search properties, locations..."
            className="flex-1 text-sm text-[#111111] dark:text-white outline-none bg-transparent placeholder:text-[#2B2B2B]/40 dark:placeholder:text-white/40 min-w-0"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />

          <button
            className="relative w-9 h-9 rounded-sm border border-[#111111]/10 dark:border-white/10 flex items-center justify-center text-[#111111] dark:text-white hover:border-[#C9975C] hover:text-[#C9975C] transition"
            aria-label="Notifications"
          >
            <Bell size={17} strokeWidth={1.75} />
            {notificationCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C9975C] text-[10px] font-medium text-[#111111] flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2"
            >
              <span className="w-9 h-9 rounded-full bg-[#F5F1E8] dark:bg-[#1a1a1a] flex items-center justify-center text-xs font-medium text-[#111111] dark:text-white">
                {initial}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`hidden sm:block text-[#2B2B2B]/50 dark:text-white/50 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />

                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] border border-[#111111]/10 dark:border-white/10 rounded-sm shadow-lg z-20 py-1">
                  <p className="px-4 py-2 text-xs text-[#2B2B2B]/50 dark:text-white/50 border-b border-[#111111]/10 dark:border-white/10">
                    {user?.name || "Account"}
                  </p>

                  <Link
                    href="/dashboard/client#profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#2B2B2B] dark:text-white/80 hover:bg-[#F5F1E8] dark:hover:bg-[#0f0f0f] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User size={15} strokeWidth={1.75} />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard/client#settings"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#2B2B2B] dark:text-white/80 hover:bg-[#F5F1E8] dark:hover:bg-[#0f0f0f] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings size={15} strokeWidth={1.75} />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#F5F1E8] dark:hover:bg-[#0f0f0f] transition text-left"
                  >
                    <LogOut size={15} strokeWidth={1.75} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}