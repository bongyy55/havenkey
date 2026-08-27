"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Heart,
  CalendarCheck,
  CreditCard,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Clock,
  Phone,
  ChevronRight,
  Bell,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Lock,
  UserCheck,
  Headset,
  Search,
} from "lucide-react";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import Navbar from "@/components/shared/Navbar/Navbar";

const quickActions = [
  { label: "Find Property", description: "Search thousands of verified listings", icon: Search },
  { label: "Saved Properties", description: "View your saved properties", icon: Heart },
  { label: "My Inspections", description: "View and manage your scheduled inspections", icon: CalendarCheck },
  { label: "Payments", description: "View your payments and history", icon: CreditCard },
];

const recommended = [
  { id: 1, tag: "For Rent", price: "₦2,800,000", period: "/ year", title: "2 Bedroom Flat", location: "Yaba, Lagos", beds: 2, baths: 2, sqm: 24, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80" },
  { id: 2, tag: "For Sale", price: "₦95,000,000", period: "", title: "4 Bedroom Detached", location: "Ikoyi, Lagos", beds: 4, baths: 5, sqm: 450, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
  { id: 3, tag: "For Rent", price: "₦1,900,000", period: "/ year", title: "1 Bedroom Studio", location: "Wuse 2, Abuja", beds: 1, baths: 1, sqm: 12, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" },
  { id: 4, tag: "For Sale", price: "₦65,000,000", period: "", title: "3 Bedroom Terrace", location: "Chevron, Lagos", beds: 3, baths: 4, sqm: 300, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" },
];

const activity = [
  { icon: CheckCircle2, title: "Inspection confirmed", detail: "3 Bedroom Duplex, Lekki", time: "Today, 9:00 AM" },
  { icon: Bell, title: "Payment reminder", detail: "Rent payment of ₦3,500,000", time: "Yesterday, 10:30 AM" },
  { icon: MessageSquare, title: "New message", detail: "From Tobi Adeyemi", time: "Yesterday, 9:15 AM" },
  { icon: Home, title: "Property update", detail: "New matching properties", time: "Aug 24, 2025" },
];

const whyChoose = [
  { icon: ShieldCheck, title: "Verified listings", detail: "All properties are thoroughly verified" },
  { icon: Lock, title: "Secure payments", detail: "Your payments are safe and encrypted" },
  { icon: UserCheck, title: "Trusted agents", detail: "We work with experienced and verified agents" },
  { icon: Headset, title: "24/7 support", detail: "We're here to help anytime, anywhere" },
];

export default function ClientDashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return <div className="min-h-screen bg-[#F5F1E8]" />;
  }

  const firstName = user.name?.split(" ")[0] || "there";

  return (
    <div className="h-screen bg-[#F5F1E8] flex overflow-hidden">
      <div className="h-screen overflow-y-auto flex-shrink-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />
      </div>

      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <Navbar
          user={user}
          notificationCount={6}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />

        <main className="px-6 py-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-2xl text-[#111111]">Good morning, {firstName}</h1>
            <p className="text-sm text-[#2B2B2B]/60 mt-1">Find a place you&apos;ll love</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map(({ label, description, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="bg-white border border-[#111111]/10 rounded-sm p-4 flex items-start gap-3 hover:border-[#C9975C] transition"
              >
                <span className="w-10 h-10 rounded-sm bg-[#F5F1E8] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} strokeWidth={1.75} className="text-[#C9975C]" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-[#111111]">{label}</span>
                  <span className="block text-xs text-[#2B2B2B]/50 mt-0.5">{description}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <section className="lg:col-span-2 bg-white border border-[#111111]/10 rounded-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg text-[#111111]">Upcoming Inspection</h2>
                <a href="#" className="text-xs font-medium text-[#C9975C] hover:underline flex items-center gap-1">
                  View all <ChevronRight size={14} strokeWidth={2} />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-56 h-40 rounded-sm overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
                    alt="3 Bedroom Duplex in Lekki"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="font-display text-lg text-[#111111]">3 Bedroom Duplex</p>
                  <p className="flex items-center gap-1 text-sm text-[#2B2B2B]/60 mt-1">
                    <MapPin size={14} strokeWidth={1.75} />
                    Lekki Phase 1, Lagos
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#2B2B2B]/60 mt-3">
                    <span className="flex items-center gap-1">
                      <CalendarCheck size={14} strokeWidth={1.75} />
                      Sat, Aug 29, 2025
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} strokeWidth={1.75} />
                      11:00 AM
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80"
                        alt="Agent Tobi Adeyemi"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-[#2B2B2B]/50 leading-none">Agent</p>
                      <p className="text-xs font-medium text-[#111111] mt-0.5">Tobi Adeyemi</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-auto pt-4">
                    <button className="flex items-center gap-1 text-xs font-medium bg-[#111111] text-white px-4 py-2 rounded-sm hover:bg-[#C9975C] transition">
                      View Details
                    </button>
                    <button
                      aria-label="Call agent"
                      className="w-8 h-8 rounded-sm border border-[#111111]/15 flex items-center justify-center text-[#111111] hover:border-[#C9975C] hover:text-[#C9975C] transition"
                    >
                      <Phone size={14} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[#111111] rounded-sm p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-white/60">Next Payment</p>
                <span className="text-[10px] font-medium uppercase tracking-wide text-[#111111] bg-[#C9975C] px-2 py-0.5 rounded-sm">
                  Rent due
                </span>
              </div>

              <p className="font-display text-3xl text-[#C9975C] mb-1">₦3,500,000</p>
              <p className="text-xs text-white/50 mb-6">Due on Sep 30, 2025</p>

              <button className="w-full text-sm font-medium bg-[#C9975C] text-[#111111] py-2.5 rounded-sm hover:bg-white transition mb-4">
                Pay Now
              </button>

              <p className="flex items-center gap-1.5 text-[11px] text-white/40 mt-auto">
                <Lock size={12} strokeWidth={1.75} />
                Payments secured with bank-level encryption
              </p>
            </section>

            <section className="bg-white border border-[#111111]/10 rounded-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-base text-[#111111]">Recent Activity</h2>
                <a href="#" className="text-xs font-medium text-[#C9975C] hover:underline">
                  View all
                </a>
              </div>

              <ul className="space-y-4">
                {activity.map(({ icon: Icon, title, detail, time }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#F5F1E8] flex items-center justify-center flex-shrink-0">
                      <Icon size={14} strokeWidth={1.75} className="text-[#C9975C]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#111111]">{title}</p>
                      <p className="text-xs text-[#2B2B2B]/50 truncate">{detail}</p>
                      <p className="text-[10px] text-[#2B2B2B]/35 mt-0.5">{time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg text-[#111111]">Recommended For You</h2>
                <a href="#" className="text-xs font-medium text-[#C9975C] hover:underline flex items-center gap-1">
                  View all properties <ChevronRight size={14} strokeWidth={2} />
                </a>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {recommended.map((p) => (
                  <a
                    key={p.id}
                    href="#"
                    className="bg-white border border-[#111111]/10 rounded-sm overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="relative h-32">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                      <span
                        className={`absolute top-2 left-2 text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-sm ${
                          p.tag === "For Rent" ? "bg-[#111111] text-white" : "bg-[#C9975C] text-[#111111]"
                        }`}
                      >
                        {p.tag}
                      </span>
                      <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                        <Heart size={12} strokeWidth={2} className="text-[#111111]" />
                      </span>
                    </div>

                    <div className="p-3">
                      <p className="font-display text-sm text-[#111111]">
                        {p.price}
                        {p.period && <span className="text-xs text-[#2B2B2B]/50 font-sans"> {p.period}</span>}
                      </p>
                      <p className="text-xs text-[#2B2B2B]/70 mt-1">{p.title}</p>
                      <p className="flex items-center gap-1 text-[11px] text-[#2B2B2B]/45 mt-0.5">
                        <MapPin size={11} strokeWidth={1.75} />
                        {p.location}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-[#2B2B2B]/50 mt-2 pt-2 border-t border-[#111111]/10">
                        <span className="flex items-center gap-1">
                          <BedDouble size={12} strokeWidth={1.75} />
                          {p.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={12} strokeWidth={1.75} />
                          {p.baths}
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize size={12} strokeWidth={1.75} />
                          {p.sqm} sqm
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <section className="bg-white border border-[#111111]/10 rounded-sm p-5 flex flex-col items-center text-center justify-center">
              <div className="flex items-center justify-between w-full mb-2">
                <h2 className="font-display text-base text-[#111111]">Saved Properties</h2>
                <a href="#" className="text-xs font-medium text-[#C9975C] hover:underline">
                  View all
                </a>
              </div>

              <span className="w-12 h-12 rounded-full bg-[#F5F1E8] flex items-center justify-center my-3">
                <Heart size={20} strokeWidth={1.75} className="text-[#C9975C]" />
              </span>

              <p className="font-display text-3xl text-[#111111]">8</p>
              <p className="text-xs text-[#2B2B2B]/50 mt-1">properties saved</p>
              <p className="text-[11px] text-[#2B2B2B]/40 mt-2">Keep track of properties you love.</p>
            </section>
          </div>

          <section className="relative bg-[#111111] rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
              <div className="p-6 flex flex-col justify-center">
                <h2 className="font-display text-lg text-white mb-4">Why choose B&apos;NARCH</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {whyChoose.map(({ icon: Icon, title, detail }) => (
                    <div key={title} className="flex items-start gap-2">
                      <Icon size={16} strokeWidth={1.75} className="text-[#C9975C] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-white">{title}</p>
                        <p className="text-[11px] text-white/45 mt-0.5">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-40 lg:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
                  alt="Modern living room interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
