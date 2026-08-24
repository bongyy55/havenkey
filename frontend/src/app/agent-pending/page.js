"use client";

import Link from "next/link";
import Image from "next/image";

export default function AgentPendingPage() {
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
          <span className="text-2xl">📋</span>
        </div>

        <h1 className="font-display text-2xl text-[#111111] mb-2">
          Your agent account is under review
        </h1>

        <p className="text-sm text-[#2B2B2B]/70 mb-8">
          Thanks for signing up. Our team is reviewing your information.
        </p>

        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <p className="text-[10px] text-[#2B2B2B]/70 mt-2 text-center">
              Application Received
            </p>
          </div>

          <div className="flex-1 h-px bg-[#C9975C]/40 mb-6" />

          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#C9975C] text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <p className="text-[10px] text-[#111111] font-medium mt-2 text-center">
              Under Review
            </p>
          </div>

          <div className="flex-1 h-px bg-[#111111]/10 mb-6" />

          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#111111]/10 text-[#2B2B2B]/40 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <p className="text-[10px] text-[#111111]/40 mt-2 text-center">
              Approved
            </p>
          </div>
        </div>

        <div className="bg-[#F5F1E8] border border-[#C9975C]/30 rounded-sm px-4 py-3 mb-6">
          <p className="text-xs text-[#2B2B2B]/80">
            This usually takes 1 to 2 business days. We will notify you by
            email and SMS once approved.
          </p>
        </div>

        <Link
          href="/login"
          className="block w-full bg-[#111111] text-white font-medium py-3 rounded-sm hover:bg-[#C9975C] transition"
        >
          Back to Login
        </Link>

        <a
          href="mailto:hello@bnarch.com"
          className="block text-sm text-[#2B2B2B]/50 hover:text-[#C9975C] transition mt-4"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}