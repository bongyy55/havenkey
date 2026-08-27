"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List as ListIcon,
  SlidersHorizontal,
  RotateCcw,
  ShieldCheck,
  Lock,
  UserCheck,
  Headset,
} from "lucide-react";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import Navbar from "@/components/shared/Navbar/Navbar";

const allProperties = [
  { id: 1, tag: "For Rent", price: "₦2,800,000", period: "/ year", title: "2 Bedroom Flat", location: "Yaba, Lagos", beds: 2, baths: 2, sqm: 24, type: "Apartment", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80" },
  { id: 2, tag: "For Sale", price: "₦95,000,000", period: "", title: "4 Bedroom Detached", location: "Ikoyi, Lagos", beds: 4, baths: 5, sqm: 450, type: "Detached Duplex", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
  { id: 3, tag: "For Rent", price: "₦1,900,000", period: "/ year", title: "1 Bedroom Studio", location: "Wuse 2, Abuja", beds: 1, baths: 1, sqm: 12, type: "Studio Apartment", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" },
  { id: 4, tag: "For Sale", price: "₦65,000,000", period: "", title: "3 Bedroom Terrace", location: "Chevron, Lagos", beds: 3, baths: 4, sqm: 300, type: "Terrace Duplex", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" },
];

const whyChoose = [
  { icon: ShieldCheck, title: "Verified Listings", detail: "All properties are thoroughly verified" },
  { icon: Lock, title: "Secure Payments", detail: "Your payments are safe and encrypted" },
  { icon: UserCheck, title: "Trusted Agents", detail: "Work with experienced and verified agents" },
  { icon: Headset, title: "24/7 Support", detail: "We're here to help anytime, anywhere" },
];

const filterFields = [
  { label: "Location", placeholder: "Any Location" },
  { label: "Property Type", placeholder: "Any Type" },
  { label: "Price Range", placeholder: "Any Price" },
  { label: "Bedrooms", placeholder: "Any" },
  { label: "Bathrooms", placeholder: "Any" },
];

export default function PropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("Newest First");

  const tabs = ["All", "For Rent", "For Sale"];

  const filtered =
    activeTab === "All"
      ? allProperties
      : allProperties.filter((p) => p.tag === activeTab);

  return (
    <div className="h-screen bg-[#F5F1E8] flex overflow-hidden">
      <div className="h-screen overflow-y-auto flex-shrink-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <Navbar notificationCount={6} onMenuClick={() => setSidebarOpen(true)} />

        <main className="px-6 py-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="font-display text-3xl text-[#111111]">Properties</h1>
            <p className="text-sm text-[#2B2B2B]/60 mt-1">Find your perfect property</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="inline-flex bg-white border border-[#111111]/10 rounded-sm p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-sm transition ${
                    activeTab === tab
                      ? "bg-[#C9975C] text-[#111111]"
                      : "text-[#2B2B2B]/60 hover:text-[#111111]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex bg-white border border-[#111111]/10 rounded-sm p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-sm transition ${
                    viewMode === "grid" ? "bg-[#F5F1E8] text-[#111111]" : "text-[#2B2B2B]/50"
                  }`}
                >
                  <LayoutGrid size={14} strokeWidth={1.75} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-sm transition ${
                    viewMode === "list" ? "bg-[#F5F1E8] text-[#111111]" : "text-[#2B2B2B]/50"
                  }`}
                >
                  <ListIcon size={14} strokeWidth={1.75} />
                  List
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#111111]/10 rounded-sm pl-3 pr-8 py-2 text-sm text-[#111111] focus:outline-none focus:border-[#C9975C]"
                >
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <ChevronDown size={14} strokeWidth={1.75} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2B2B2B]/50 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="relative mb-6">
            <Search size={16} strokeWidth={1.75} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2B2B2B]/40" />
            <input
              type="text"
              placeholder="Search properties, locations..."
              className="w-full bg-white border border-[#111111]/10 rounded-sm pl-10 pr-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#C9975C]"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {filterFields.map(({ label, placeholder }) => (
              <div key={label} className="relative">
                <button className="w-full text-left bg-white border border-[#111111]/10 rounded-sm px-3 py-2.5 hover:border-[#C9975C] transition">
                  <span className="block text-[10px] font-medium text-[#2B2B2B]/50">{label}</span>
                  <span className="flex items-center justify-between text-sm text-[#111111] mt-0.5">
                    {placeholder}
                    <ChevronDown size={14} strokeWidth={1.75} className="text-[#2B2B2B]/40" />
                  </span>
                </button>
              </div>
            ))}
            <button className="flex items-center justify-center gap-2 bg-[#F5F1E8] border border-[#111111]/10 rounded-sm px-3 py-2.5 text-sm font-medium text-[#111111] hover:border-[#C9975C] transition">
              <SlidersHorizontal size={14} strokeWidth={1.75} />
              More Filters
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#2B2B2B]/60">
              <span className="font-medium text-[#111111]">{filtered.length}</span> properties found
            </p>
            <button
              onClick={() => setActiveTab("All")}
              className="flex items-center gap-1.5 text-xs font-medium text-[#C9975C] hover:underline"
            >
              <RotateCcw size={12} strokeWidth={1.75} />
              Clear all
            </button>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
                : "flex flex-col gap-4 mb-8"
            }
          >
            {filtered.map((p) => (
              <a
                key={p.id}
                href="#"
                className={
                  viewMode === "grid"
                    ? "bg-white border border-[#111111]/10 rounded-sm overflow-hidden hover:shadow-lg transition"
                    : "bg-white border border-[#111111]/10 rounded-sm overflow-hidden hover:shadow-lg transition flex"
                }
              >
                <div className={viewMode === "grid" ? "relative h-44" : "relative w-56 flex-shrink-0"}>
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                  <span
                    className={`absolute top-3 left-3 text-[9px] font-medium uppercase tracking-wide px-2 py-1 rounded-sm ${
                      p.tag === "For Rent" ? "bg-[#111111] text-white" : "bg-[#C9975C] text-[#111111]"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition">
                    <Heart size={13} strokeWidth={2} className="text-[#111111]" />
                  </button>
                </div>

                <div className="p-4 flex-1">
                  <p className="font-display text-lg text-[#111111]">
                    {p.price}
                    {p.period && <span className="text-xs text-[#2B2B2B]/50 font-sans"> {p.period}</span>}
                  </p>
                  <p className="text-sm text-[#2B2B2B]/70 mt-1">{p.title}</p>
                  <p className="flex items-center gap-1 text-xs text-[#2B2B2B]/45 mt-1">
                    <MapPin size={12} strokeWidth={1.75} />
                    {p.location}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#2B2B2B]/50 mt-3 pt-3 border-t border-[#111111]/10">
                    <span className="flex items-center gap-1">
                      <BedDouble size={13} strokeWidth={1.75} />
                      {p.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={13} strokeWidth={1.75} />
                      {p.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Maximize size={13} strokeWidth={1.75} />
                      {p.sqm} sqm
                    </span>
                  </div>

                  <span className="inline-block mt-3 text-[11px] font-medium text-[#2B2B2B]/60 bg-[#F5F1E8] px-2 py-1 rounded-sm">
                    {p.type}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mb-10">
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-[#111111]/10 text-[#2B2B2B]/50 hover:border-[#C9975C] transition">
              <ChevronLeft size={14} strokeWidth={1.75} />
            </button>
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 flex items-center justify-center rounded-sm text-sm font-medium transition ${
                  n === 1
                    ? "bg-[#C9975C] text-[#111111]"
                    : "border border-[#111111]/10 text-[#2B2B2B]/60 hover:border-[#C9975C]"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-[#2B2B2B]/40 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-[#111111]/10 text-sm font-medium text-[#2B2B2B]/60 hover:border-[#C9975C] transition">
              16
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-[#111111]/10 text-[#2B2B2B]/50 hover:border-[#C9975C] transition">
              <ChevronRight size={14} strokeWidth={1.75} />
            </button>
          </div>

          <section className="bg-white border border-[#111111]/10 rounded-sm p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {whyChoose.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-sm bg-[#F5F1E8] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} strokeWidth={1.75} className="text-[#C9975C]" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#111111]">{title}</p>
                    <p className="text-xs text-[#2B2B2B]/50 mt-0.5">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}