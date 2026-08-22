import Link from "next/link";
import Image from "next/image";

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
  },
];

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
  return (
    <div className="min-h-screen bg-white">
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
            <Link href="#" className="hover:text-[#C9975C] transition">Buy</Link>
            <Link href="#" className="hover:text-[#C9975C] transition">Rent</Link>
            <Link href="#" className="hover:text-[#C9975C] transition">New Developments</Link>
            <Link href="#" className="hover:text-[#C9975C] transition">About Us</Link>
            <Link href="#" className="hover:text-[#C9975C] transition">Resources</Link>
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
        <div
          className="h-[560px] md:h-[640px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(17,17,17,0.55), rgba(17,17,17,0.35)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000')",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 w-full">
            <p className="text-[#C9975C] text-xs tracking-[0.3em] uppercase mb-4">
              Find · Inspect · Own
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-white leading-tight max-w-2xl">
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
              <select className="px-3 py-2 text-sm text-[#111111] outline-none border-l border-[#111111]/10">
                <option>Buy</option>
                <option>Rent</option>
              </select>
              <select className="px-3 py-2 text-sm text-[#111111] outline-none border-l border-[#111111]/10">
                <option>Any price</option>
                <option>Under ₦50m</option>
                <option>₦50m – ₦150m</option>
                <option>₦150m+</option>
              </select>
              <button className="bg-[#111111] text-white text-sm font-medium px-6 py-2.5 rounded-sm hover:bg-[#C9975C] transition">
                Search
              </button>
            </div>
          </div>
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
              <p className="font-display text-2xl text-[#C9975C]">{stat}</p>
              <p className="text-white/70 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured properties */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl text-[#111111]">
              Featured Properties
            </h2>
            <Link
              href="#"
              className="text-sm text-[#C9975C] hover:text-[#111111] transition"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((p) => (
              <Link
                href="#"
                key={p.id}
                className="group block border border-[#111111]/10 rounded-sm overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-40 bg-[#F5F1E8] flex items-center justify-center text-[#C9975C] text-xs">
                  Property Image
                </div>
                <div className="p-4">
                  <span className="inline-block text-[10px] uppercase tracking-wide text-[#C9975C] mb-2">
                    {p.tag}
                  </span>
                  <p className="font-display text-lg text-[#111111]">
                    {p.price}
                  </p>
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
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Dual CTA */}
      <section className="bg-[#F5F1E8]">
        <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-sm p-8 border border-[#111111]/10">
            <h3 className="font-display text-2xl text-[#111111] mb-2">
              Looking for a home?
            </h3>
            <p className="text-sm text-[#2B2B2B]/80 mb-6">
              Browse verified listings, book inspections, and pay securely —
              all in one place.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-[#C9975C] transition"
            >
              Browse Properties
            </Link>
          </div>

          <div className="bg-[#111111] rounded-sm p-8">
            <h3 className="font-display text-2xl text-white mb-2">
              Are you an agent?
            </h3>
            <p className="text-sm text-white/70 mb-6">
              List your properties, reach thousands of clients, and grow your
              business with B'Narch.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#C9975C] text-[#111111] text-sm font-medium px-6 py-3 rounded-sm hover:bg-white transition"
            >
              Become an Agent
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] text-white/70">
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <span className="font-display text-xl text-white tracking-wide">
              B'NARCH
            </span>
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
    </div>
  );
}