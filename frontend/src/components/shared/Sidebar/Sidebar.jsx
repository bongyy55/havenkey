"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import {
  LayoutGrid,
  Building2,
  Heart,
  ClipboardCheck,
  MessageSquare,
  Bell,
  KeyRound,
  CreditCard,
  Wrench,
  User,
  Settings,
  LifeBuoy,
  LogOut,
  X,
} from "lucide-react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
});

const navSections = [
  {
    label: "Discover",
    items: [
      { name: "Properties", href: "/dashboard/client/properties", icon: Building2 },
      { name: "Saved Properties", href: "/dashboard/client/saved-properties", icon: Heart },
    ],
  },
  {
    label: "Activity",
    items: [
      { name: "Inspections", href: "#inspections", icon: ClipboardCheck },
      { name: "Messages", href: "#", icon: MessageSquare },
      { name: "Notifications", href: "#", icon: Bell },
    ],
  },
  {
    label: "My Home",
    items: [
      { name: "My Tenancy", href: "#", icon: KeyRound },
      { name: "Payments", href: "#payment", icon: CreditCard },
      { name: "Maintenance", href: "#", icon: Wrench },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Profile", href: "#", icon: User },
      { name: "Settings", href: "#", icon: Settings },
    ],
  },
];

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // flat index across all links, used to stagger the entrance animation
  let animIndex = 0;

  return (
    <>
      <aside
        className={`${manrope.variable} font-sans fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#0f0f0f] border-r border-[#111111]/10 dark:border-white/10 flex flex-col shadow-[4px_0_24px_-8px_rgba(17,17,17,0.06)] lg:shadow-none transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="relative p-6 border-b border-[#111111]/10 dark:border-white/10 overflow-visible flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="B'Narch"
              width={220}
              height={220}
              className="h-16 w-auto object-contain -my-2"
              priority
            />
          </Link>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden p-1.5 rounded-full text-[#2B2B2B]/60 dark:text-white/60 hover:text-[#111111] dark:hover:text-white hover:bg-[#F5F1E8] dark:hover:bg-[#1a1a1a] transition-colors duration-200"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
          <SidebarLink
            href="/dashboard/client"
            label="Overview"
            icon={LayoutGrid}
            isActive={pathname === "/dashboard/client"}
            mounted={mounted}
            index={animIndex++}
          />

          {navSections.map((section) => (
            <div key={section.label}>
              <p
                className={`px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2B2B2B]/45 dark:text-white/45 mb-2.5 transition-opacity duration-500 ${
                  mounted ? "opacity-100" : "opacity-0"
                }`}
              >
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <SidebarLink
                    key={item.name}
                    href={item.href}
                    label={item.name}
                    icon={item.icon}
                    isActive={pathname === item.href}
                    mounted={mounted}
                    index={animIndex++}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="p-4 border-t border-[#111111]/10 dark:border-white/10 space-y-1">
          <a
            href="#"
            className="group flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-[#2B2B2B] dark:text-white/80 hover:bg-[#F5F1E8] dark:hover:bg-[#1a1a1a] rounded-md transition-colors duration-200"
          >
            <LifeBuoy
              size={17}
              strokeWidth={2}
              className="text-[#2B2B2B]/50 dark:text-white/50 group-hover:text-[#C9975C] transition-colors duration-200"
            />
            Help &amp; Support
          </a>

          <button
            onClick={onLogout}
            className="group flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors duration-200"
          >
            <LogOut
              size={17}
              strokeWidth={2}
              className="text-red-400 group-hover:text-red-500 transition-colors duration-200"
            />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-20 lg:hidden bg-[#111111]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <style jsx global>{`
        @keyframes sidebarItemIn {
          from {
            opacity: 0;
            transform: translateX(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

function SidebarLink({ href, label, icon: Icon, isActive, mounted, index }) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all duration-200 ${
        isActive
          ? "bg-[#F5F1E8] dark:bg-[#1a1a1a] text-[#111111] dark:text-white font-bold"
          : "text-[#2B2B2B] dark:text-white/70 font-medium hover:bg-[#F5F1E8]/70 dark:hover:bg-[#1a1a1a]/70 hover:translate-x-0.5"
      }`}
      style={
        mounted
          ? {
              animation: "sidebarItemIn 0.4s ease-out both",
              animationDelay: `${index * 45}ms`,
            }
          : { opacity: 0 }
      }
    >
      {/* Active indicator bar */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full bg-[#C9975C] transition-all duration-300 ease-out ${
          isActive ? "h-5 opacity-100" : "h-0 opacity-0"
        }`}
      />

      {Icon && (
        <Icon
          size={17}
          strokeWidth={isActive ? 2.4 : 2}
          className={`shrink-0 transition-colors duration-200 ${
            isActive ? "text-[#C9975C]" : "text-[#2B2B2B]/45 dark:text-white/45 group-hover:text-[#C9975C]/80"
          }`}
        />
      )}
      <span>{label}</span>
    </Link>
  );
}