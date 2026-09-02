"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";

const featuredProperties = [
  {
    id: 1,
    tag: "For Rent",
    price: "₦2,500,000/yr",
    title: "3 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    beds: 3,
    baths: 3,
    parking: 2,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
  },
  {
    id: 2,
    tag: "For Sale",
    price: "₦120,000,000",
    title: "4 Bedroom Duplex",
    location: "Asokoro, Abuja",
    beds: 4,
    baths: 5,
    parking: 3,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
  },
  {
    id: 3,
    tag: "For Rent",
    price: "₦3,200,000/yr",
    title: "2 Bedroom Apartment",
    location: "Ikoyi, Lagos",
    beds: 2,
    baths: 2,
    parking: 1,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
  },
  {
    id: 4,
    tag: "For Sale",
    price: "₦85,000,000",
    title: "5 Bedroom Terraced Duplex",
    location: "Chevron, Lagos",
    beds: 5,
    baths: 5,
    parking: 3,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200",
  },
  {
    id: 5,
    tag: "For Rent",
    price: "₦4,800,000/yr",
    title: "Garden City Residence",
    location: "Victoria Island, Lagos",
    beds: 3,
    baths: 4,
    parking: 2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
  },
  {
    id: 6,
    tag: "For Sale",
    price: "₦210,000,000",
    title: "Modern Palm House",
    location: "Maitama, Abuja",
    beds: 5,
    baths: 6,
    parking: 4,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
  },
  {
    id: 7,
    tag: "For Rent",
    price: "₦6,000,000/yr",
    title: "The Ikoyi Terrace",
    location: "Ikoyi, Lagos",
    beds: 4,
    baths: 4,
    parking: 2,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
  },
  {
    id: 8,
    tag: "For Sale",
    price: "₦98,000,000",
    title: "Cedar Grove Duplex",
    location: "Gwarinpa, Abuja",
    beds: 4,
    baths: 4,
    parking: 3,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200",
  },
];

const developments = [
  {
    title: "The Meridian Court",
    location: "Eko Atlantic, Lagos",
    detail: "Waterfront apartments with considered spaces and city views.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400",
  },
  {
    title: "Aurelia Gardens",
    location: "Wuse 2, Abuja",
    detail: "A quiet collection of modern homes close to everything.",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1400",
  },
  {
    title: "Palmline Residences",
    location: "Lekki, Lagos",
    detail: "Contemporary living with room to grow and breathe.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1400",
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000",
];

const propertyTypes = ["Buy", "Rent"];
const priceRanges = ["Any price", "Under ₦50m", "₦50m – ₦150m", "₦150m+"];

function SearchDropdown({ value, options, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div className="relative min-w-[145px]" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        onClick={() => setIsOpen((open) => !open)}
        className="font-serif flex w-full cursor-pointer items-center justify-between gap-4 border-l border-[#111111]/10 px-3 py-2 text-left text-sm text-[#111111] transition-colors hover:text-[#C9975C]"
      >
        <span>{value}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.16 }}
          role="listbox"
          className="absolute left-0 top-full z-30 mt-2 w-full min-w-[180px] overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-1.5 font-serif shadow-xl"
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={value === option}
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#F5F1E8] hover:text-[#C9975C] ${
                value === option
                  ? "font-semibold text-[#C9975C]"
                  : "text-[#111111]"
              }`}
            >
              {option}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <span className="h-px w-16 bg-[#C9975C]/50" />
      <span className="text-[#C9975C] text-xs">✦</span>
      <span className="h-px w-16 bg-[#C9975C]/50" />
    </div>
  );
}

export default function Home() {
  const [propertyType, setPropertyType] = useState("Buy");
  const [priceRange, setPriceRange] = useState("Any price");
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const imageTimer = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroImages.length);
    }, 6500);
    const scrollHandler = () => setShowBackToTop(window.scrollY > 600);

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      window.clearInterval(imageTimer);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const handleSearch = () => {
    document
      .getElementById(propertyType === "Rent" ? "rent" : "buy")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div className="font-serif min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-[#111111]/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="B'Narch"
              width={160}
              height={160}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#2B2B2B]">
            <Link href="#buy" className="hover:text-[#C9975C] transition">
              Buy
            </Link>
            <Link href="#rent" className="hover:text-[#C9975C] transition">
              Rent
            </Link>
            <Link
              href="#developments"
              className="hover:text-[#C9975C] transition"
            >
              New Developments
            </Link>
            <Link href="#about" className="hover:text-[#C9975C] transition">
              About Us
            </Link>
            <Link href="#resources" className="hover:text-[#C9975C] transition">
              Resources
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#111111] hover:text-[#C9975C] transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-[#111111] text-white px-5 py-2.5 rounded-sm hover:bg-[#C9975C] transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative flex h-[560px] items-center overflow-hidden md:h-[640px]">
          <motion.div
            key={heroImageIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.58), rgba(17,17,17,0.38)), url('${heroImages[heroImageIndex]}')`,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-full max-w-7xl px-6"
          >
            <p className="text-[#C9975C] text-xs tracking-[0.3em] uppercase mb-4">
              Find · Inspect · Own
            </p>
            <h1 className="text-4xl md:text-6xl text-white leading-tight max-w-2xl">
              Find your next address with confidence.
            </h1>
            <p className="text-white/85 mt-4 max-w-lg">
              Verified homes, trusted agents, secure payments — for clients
              across Nigeria and the diaspora.
            </p>

            {/* Search bar */}
            <div className="mt-8 bg-white rounded-sm p-3 flex flex-col md:flex-row gap-3 max-w-2xl shadow-lg">
              <input
                type="text"
                placeholder="Location, e.g. Lekki, Lagos"
                className="flex-1 px-3 py-2 text-sm text-[#111111] outline-none"
              />
              <SearchDropdown
                value={propertyType}
                options={propertyTypes}
                onChange={setPropertyType}
                label="Choose whether to buy or rent"
              />
              <SearchDropdown
                value={priceRange}
                options={priceRanges}
                onChange={setPriceRange}
                label="Choose a price range"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#111111] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#C9975C]"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
            <div
              className="mt-5 flex items-center gap-2"
              aria-label="Hero image slides"
            >
              {heroImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show hero image ${index + 1}`}
                  onClick={() => setHeroImageIndex(index)}
                  className={`h-1.5 cursor-pointer rounded-full transition-all ${index === heroImageIndex ? "w-8 bg-[#C9975C]" : "w-3 bg-white/60 hover:bg-white"}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust stats bar */}
      <section className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["10,000+", "Verified listings"],
            ["3,500+", "Happy clients"],
            ["1,200+", "Verified agents"],
            ["100%", "Secure payments"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="text-2xl text-[#C9975C]">{stat}</p>
              <p className="text-white/70 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured properties */}
      <section id="buy" className="scroll-mt-8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl text-[#111111]">Featured Properties</h2>
            <Link
              href="#buy"
              className="text-sm text-[#C9975C] hover:text-[#111111] transition"
            >
              View all →
            </Link>
          </div>

          <div className="overflow-hidden -mx-6 px-6">
            <div className="property-marquee flex w-max gap-6 hover:[animation-play-state:paused]">
              {[...featuredProperties, ...featuredProperties].map(
                (p, index) => (
                  <Link
                    href="#buy"
                    key={`${p.id}-${index}`}
                    className="group block w-[275px] flex-shrink-0 overflow-hidden rounded-sm border border-[#111111]/10 bg-white transition hover:shadow-lg sm:w-[310px]"
                  >
                    <div
                      className="h-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${p.image})` }}
                      role="img"
                      aria-label={p.title}
                    >
                      <span className="sr-only">{p.title}</span>
                    </div>
                    <div className="p-4">
                      <span className="inline-block text-[10px] uppercase tracking-wide text-[#C9975C] mb-2">
                        {p.tag}
                      </span>
                      <p className="text-lg text-[#111111]">{p.price}</p>
                      <p className="text-sm text-[#2B2B2B] mt-1">{p.title}</p>
                      <p className="text-xs text-[#2B2B2B]/60 mt-1">
                        {p.location}
                      </p>
                      <div className="flex gap-4 mt-3 text-xs text-[#2B2B2B]/70">
                        <span>{p.beds} bed</span>
                        <span>{p.baths} bath</span>
                        <span>{p.parking} parking</span>
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <motion.section
        id="rent"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65 }}
        className="scroll-mt-8 bg-[#111111] text-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C9975C]">
              Rent with confidence
            </p>
            <h2 className="text-3xl">A better place to land.</h2>
            <p className="mt-2 max-w-xl text-sm text-white/65">
              From first apartment to family home, find verified rentals with
              clear pricing and trusted local guidance.
            </p>
          </div>
          <Link
            href="#buy"
            className="inline-flex cursor-pointer items-center rounded-sm bg-[#C9975C] px-5 py-3 text-sm font-medium text-[#111111] transition hover:bg-white"
          >
            Explore rentals
          </Link>
        </div>
      </motion.section>

      <motion.section
        id="developments"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65 }}
        className="scroll-mt-8 bg-[#F5F1E8]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C9975C]">
            Coming into view
          </p>
          <h2 className="text-3xl text-[#111111]">
            New developments, carefully selected.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#2B2B2B]/70">
            Discover thoughtfully planned communities and fresh addresses with
            the details you need before you make a move.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {developments.map((development) => (
              <article
                key={development.title}
                className="group overflow-hidden bg-white shadow-sm"
              >
                <div
                  className="h-52 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${development.image})` }}
                  role="img"
                  aria-label={development.title}
                />
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C9975C]">
                    {development.location}
                  </p>
                  <h3 className="mt-2 text-xl text-[#111111]">
                    {development.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#2B2B2B]/65">
                    {development.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65 }}
        className="scroll-mt-8 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#111111]/10 bg-[#F5F1E8] px-6 py-10 text-center shadow-sm sm:px-12">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C9975C]">
              Why B&apos;Narch
            </p>
            <h2 className="text-3xl text-[#111111]">
              Property decisions should feel grounded.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#2B2B2B]/70">
              B&apos;Narch is a more thoughtful way to find, inspect, and own
              property in Nigeria. Every listing, conversation, and payment
              should move you closer to feeling at home.
            </p>
            <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
              {[
                ["01", "Verified first", "Clear details and real homes."],
                [
                  "02",
                  "Human guidance",
                  "Trusted people when decisions matter.",
                ],
                [
                  "03",
                  "Built for distance",
                  "A confident way home for the diaspora.",
                ],
              ].map(([number, title, detail]) => (
                <div
                  key={number}
                  className="rounded-xl border border-[#111111]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-xs text-[#C9975C]">
                    {number}
                  </span>
                  <h3 className="mt-4 text-lg text-[#111111]">{title}</h3>
                  <p className="mt-1 text-sm leading-5 text-[#2B2B2B]/65">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="resources"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65 }}
        className="scroll-mt-8 bg-[#F5F1E8]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C9975C]">
              Resources
            </p>
            <h2 className="text-3xl text-[#111111]">
              A little more clarity before you commit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#2B2B2B]/65">
              Practical notes for every stage of the move, from your first
              search to the keys in your hand.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Buying guide", "Understand the steps from viewing to closing."],
              [
                "Inspection checklist",
                "Know what to ask when you walk through a home.",
              ],
              [
                "Diaspora support",
                "Make confident decisions from wherever you are.",
              ],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="group border border-[#111111]/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#C9975C]/50 hover:shadow-md"
              >
                <span className="text-2xl text-[#C9975C]">✦</span>
                <h3 className="mt-5 text-xl text-[#111111]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#2B2B2B]/65">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <Divider />

      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65 }}
        className="scroll-mt-8 bg-[#111111] text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#C9975C]">
              Let&apos;s talk property
            </p>
            <h2 className="text-3xl">Good moves start with a conversation.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
              Tell us what you&apos;re looking for and our team will help you
              take the next clear step.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:hello@bnarch.com"
              className="border border-white/15 p-5 transition hover:border-[#C9975C] hover:bg-white/5"
            >
              <span className="text-xs uppercase tracking-[0.16em] text-[#C9975C]">
                Email us
              </span>
              <span className="mt-2 block text-sm text-white">
                hello@bnarch.com
              </span>
            </a>
            <a
              href="tel:+2348000000000"
              className="border border-white/15 p-5 transition hover:border-[#C9975C] hover:bg-white/5"
            >
              <span className="text-xs uppercase tracking-[0.16em] text-[#C9975C]">
                Call us
              </span>
              <span className="mt-2 block text-sm text-white">
                +234 800 000 0000
              </span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Dual CTA */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.65 }}
        className="bg-[#F5F1E8]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-sm p-8 border border-[#111111]/10">
            <h3 className="text-2xl text-[#111111] mb-2">
              Looking for a home?
            </h3>
            <p className="text-sm text-[#2B2B2B]/80 mb-6">
              Browse verified listings, book inspections, and pay securely — all
              in one place.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-[#C9975C] transition"
            >
              Browse Properties
            </Link>
          </div>

          <div className="bg-[#111111] rounded-sm p-8">
            <h3 className="text-2xl text-white mb-2">Are you an agent?</h3>
            <p className="text-sm text-white/70 mb-6">
              List your properties, reach thousands of clients, and grow your
              business with B'Narch.
            </p>
            <Link
              href="/signup/agent"
              className="inline-block bg-[#C9975C] text-[#111111] text-sm font-medium px-6 py-3 rounded-sm hover:bg-white transition"
            >
              Become an Agent
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white/70">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <span className="text-xl text-white tracking-wide">B'NARCH</span>
            <p className="mt-3 text-white/50">
              Verified real estate for Nigeria and the diaspora.
            </p>
          </div>
          <div>
            <p className="text-white mb-3">Explore</p>
            <ul className="space-y-2 text-white/60">
              <li>Buy</li>
              <li>Rent</li>
              <li>New Developments</li>
            </ul>
          </div>
          <div>
            <p className="text-white mb-3">Company</p>
            <ul className="space-y-2 text-white/60">
              <li>About Us</li>
              <li>Resources</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <p className="text-white mb-3">Contact</p>
            <ul className="space-y-2 text-white/60">
              <li>hello@bnarch.com</li>
              <li>+234 800 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
          © 2026 B'Narch International. All rights reserved.
        </div>
      </footer>

      {showBackToTop && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-sm bg-[#111111] text-white shadow-lg transition hover:bg-[#C9975C] hover:text-[#111111]"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  );
}
