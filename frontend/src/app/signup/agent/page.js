"use client";

import { API_URL } from "@/lib/api";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Building2,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowRight,
  Loader2,
} from "lucide-react";
import AuthImage from "@/components/images/AuthImage.jpeg";
import { useToast } from "@/components/shared/Toast/ToastProvider";

const countryCodes = [
  { code: "+234", country: "Nigeria", iso: "ng" },
  { code: "+1", country: "United States", iso: "us" },
  { code: "+44", country: "United Kingdom", iso: "gb" },
  { code: "+233", country: "Ghana", iso: "gh" },
  { code: "+254", country: "Kenya", iso: "ke" },
  { code: "+27", country: "South Africa", iso: "za" },
];

export default function AgentSignup() {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    years_experience: "",
    password: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // slide-transition state: where this panel enters from, and where it exits to
  const [initialX] = useState(() => {
    if (typeof window === "undefined") return 0;
    return sessionStorage.getItem("authNavDir") === "toAgent" ? 48 : 0;
  });
  const [exitX, setExitX] = useState(null);

  useEffect(() => {
    sessionStorage.removeItem("authNavDir");
  }, []);

  // close the country dropdown on any click outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const goToClient = (e) => {
    e.preventDefault();
    sessionStorage.setItem("authNavDir", "toClient");
    setExitX(48);
    setTimeout(() => router.push("/signup/client"), 220);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fullPhoneNumber = `${selectedCountry.code}${form.phone}`;
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: fullPhoneNumber,
          password: form.password,
          role: "agent",
          business_name: form.business_name,
          years_experience: form.years_experience
            ? parseInt(form.years_experience, 10)
            : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(
          data.detail || "Something went wrong. Please try again.",
          "error",
        );
        setLoading(false);
        return;
      }

      showToast(
        "Account created successfully. Check your email to verify your account.",
        "success",
      );
      router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      showToast("Could not connect to the server. Please try again.", "error");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-[#111111]/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#111111] outline-none bg-white hover:border-[#111111]/30 focus:border-[#C9975C] focus:ring-2 focus:ring-[#C9975C]/20 focus:scale-[1.01] transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-serif">
      {/* Changed rounded-3xl to rounded-2xl on the main card container below */}
      <div className="w-full max-w-5xl bg-[#FCFBF7] rounded-2xl shadow-2xl border border-[#111111]/10 overflow-hidden flex flex-col lg:flex-row">
        {/* ================= LEFT COLUMN: Pure Image Layout (Hidden on Mobile) ================= */}
        <div className="hidden lg:block lg:w-1/2 relative min-h-[750px] overflow-hidden group">
          <Image
            src={AuthImage}
            alt="Find Inspect Own with Confidence"
            fill
            className="object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ================= RIGHT COLUMN: Interactive Form Container ================= */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center relative">
          <motion.div
            initial={{ x: initialX, opacity: initialX !== 0 ? 0 : 1 }}
            animate={{
              x: exitX !== null ? exitX : 0,
              opacity: exitX !== null ? 0 : 1,
            }}
            transition={{
              duration: exitX !== null ? 0.22 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col"
          >
            {/* Client / Agent Switcher Tabs */}
            <div className="relative inline-flex w-full bg-[#F5F1E8] border border-[#111111]/10 rounded-xl p-1 mb-5 flex-shrink-0">
              <a
                href="/signup/client"
                onClick={goToClient}
                className="flex-1 py-2 text-sm font-medium rounded-lg text-center text-[#2B2B2B]/60 hover:text-[#111111] transition-colors duration-300 cursor-pointer"
              >
                Client
              </a>
              <span className="relative flex-1 py-2 text-sm font-semibold rounded-lg text-center text-[#111111] z-10">
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
                Agent
              </span>
            </div>

            {/* Heading Header */}
            <div className="mb-4">
              <h2 className="text-2xl sm:text-3xl text-[#111111] mb-1 tracking-tight">
                Become an agent
              </h2>
              <p className="text-xs text-[#2B2B2B]/60">
                List properties and reach thousands of clients.
              </p>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name + Email, side by side to save vertical space */}
              <div className="grid grid-cols-2 gap-3">
                <div className="group">
                  <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={loading}
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                    Email address
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={loading}
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone Number with Custom Country Dropdown */}
              <div className="relative">
                <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                  Phone number
                </label>
                <div className="flex border border-[#111111]/15 rounded-xl bg-white hover:border-[#111111]/30 focus-within:border-[#C9975C] focus-within:ring-2 focus-within:ring-[#C9975C]/20 transition-all duration-300">
                  {/* Dropdown Trigger */}
                  <div className="relative flex-shrink-0" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 py-2.5 h-full bg-[#F5F1E8]/60 border-r border-[#111111]/10 text-xs font-semibold text-[#111111] cursor-pointer hover:bg-[#F5F1E8] transition-colors rounded-l-xl"
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${selectedCountry.iso}.png`}
                        alt={selectedCountry.country}
                        className="w-4 h-3 rounded-sm object-cover"
                      />
                      <span>{selectedCountry.code}</span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="flex items-center"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    </button>

                    {/* Dropdown List */}
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-[#111111]/15 rounded-xl shadow-xl z-50 py-1 origin-top"
                      >
                        {countryCodes.map((item) => (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(item);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left text-[#111111] hover:bg-[#F5F1E8] cursor-pointer transition-colors"
                          >
                            <img
                              src={`https://flagcdn.com/24x18/${item.iso}.png`}
                              alt={item.country}
                              className="w-4 h-3 rounded-sm object-cover"
                            />
                            <span className="font-medium">{item.country}</span>
                            <span className="ml-auto text-[#2B2B2B]/50">
                              {item.code}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="relative flex items-center w-full">
                    <input
                      type="tel"
                      name="phone"
                      required
                      disabled={loading}
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 text-sm text-[#111111] outline-none bg-transparent"
                      placeholder="08012345678"
                    />
                  </div>
                </div>
              </div>

              {/* Business / Agency Name + Years of Experience, side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="group">
                  <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                    Business / Agency Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                      <Building2 className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="business_name"
                      required
                      disabled={loading}
                      value={form.business_name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Doe Realty Ltd"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                    Years of Experience
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <input
                      type="number"
                      name="years_experience"
                      min="0"
                      required
                      disabled={loading}
                      value={form.years_experience}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-[11px] font-semibold text-[#2B2B2B]/70 mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 z-10 text-[#2B2B2B]/40 transition-colors group-focus-within:text-[#C9975C] pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    disabled={loading}
                    minLength={6}
                    value={form.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[11px] font-semibold text-[#2B2B2B]/50 hover:text-[#C9975C] cursor-pointer transition-colors px-2 py-1 flex items-center gap-1"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Validation helper text */}
                <div className="mt-1 text-[10px] text-[#2B2B2B]/60">
                  <span
                    className={
                      form.password.length >= 6
                        ? "text-emerald-600 font-semibold"
                        : ""
                    }
                  >
                    ✓ At least 6 characters required
                  </span>
                </div>
              </div>

              {/* Agent review notice */}
              <div className="bg-[#F5F1E8] border border-[#C9975C]/30 rounded-xl px-3 py-2 text-[11px] text-[#2B2B2B]/80">
                Agent accounts are reviewed by our team before activation.
                You&apos;ll be notified once approved.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9975C] text-white font-medium py-3 rounded-lg hover:bg-[#111111] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Agent Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#111111]/10"></div>
              </div>
              <span className="relative bg-white px-3 text-[11px] text-[#2B2B2B]/40 uppercase tracking-widest font-medium">
                or
              </span>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-[#111111]/15 py-2.5 rounded-xl hover:bg-[#F5F1E8]/40 hover:border-[#111111]/30 active:scale-[0.98] transition-all duration-300 text-sm font-medium text-[#111111] cursor-pointer shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Footer Navigation Link */}
            <p className="text-center text-xs text-[#2B2B2B]/70 mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#C9975C] font-semibold hover:underline cursor-pointer transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
