"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const verifyCode = async (code) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp_code: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Incorrect code. Please try again.");
        setDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setLoading(false);
        return;
      }

      router.push("/login?verified=true");
    } catch (err) {
      setError("Could not connect to the server. Please try again.");
      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setLoading(false);
    }
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit once all 6 digits are filled
    if (newDigits.every((d) => d !== "")) {
      verifyCode(newDigits.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newDigits = pasted.split("");
    while (newDigits.length < 6) newDigits.push("");
    setDigits(newDigits);

    const lastFilled = Math.min(pasted.length, 5);
    inputRefs.current[lastFilled]?.focus();

    if (newDigits.every((d) => d !== "")) {
      verifyCode(newDigits.join(""));
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-sm p-8 border border-[#111111]/10 text-center">
        <Link href="/" className="flex justify-center mb-6">
          <Image
            src="/logo.jpeg"
            alt="B'Narch"
            width={160}
            height={160}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-[#F5F1E8] flex items-center justify-center">
          <span className="text-2xl">✉️</span>
        </div>

        <h1 className="font-display text-2xl text-[#111111] mb-2">
          Check your inbox
        </h1>
        <p className="text-sm text-[#2B2B2B]/70 mb-8">
          Enter the 6-digit code we sent to{" "}
          <span className="font-medium text-[#111111]">{email}</span>. Code
          expires in 10 minutes.
        </p>

        <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={loading}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold border border-[#111111]/15 rounded-sm focus:outline-none focus:border-[#C9975C] disabled:opacity-50"
            />
          ))}
        </div>

        {loading && (
          <p className="text-sm text-[#2B2B2B]/60 mb-4">Verifying...</p>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Link
          href="/login"
          className="block mt-6 text-sm text-[#2B2B2B]/50 hover:text-[#C9975C] transition"
        >
          ← Back to login
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8]" />}>
      <VerifyEmailForm />
    </Suspense>
  );
}