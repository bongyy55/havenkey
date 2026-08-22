import Link from "next/link";

export default function SignupRolePicker() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="font-display text-2xl text-[#111111] tracking-wide"
          >
            B<span className="text-[#C9975C]">'</span>Narch
          </Link>
          <h1 className="font-display text-3xl md:text-4xl text-[#111111] mt-6">
            Create your B'Narch account
          </h1>
          <p className="text-sm text-[#2B2B2B]/70 mt-2">
            Join thousands finding trusted homes across Nigeria and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Client card */}
          <Link
            href="/signup/client"
            className="group bg-[#111111] text-white rounded-sm p-8 hover:bg-[#C9975C] transition"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl">🏠</span>
              <span className="text-xl group-hover:translate-x-1 transition">→</span>
            </div>
            <h2 className="font-display text-xl mb-2">I'm looking for a home</h2>
            <p className="text-sm text-white/70 group-hover:text-[#111111]/80">
              Browse properties, book inspections, and pay rent securely.
            </p>
          </Link>

          {/* Agent card */}
          <Link
            href="/signup/agent"
            className="group bg-white border border-[#111111]/10 rounded-sm p-8 hover:border-[#C9975C] transition"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl">🧑‍💼</span>
              <span className="text-xl text-[#C9975C] group-hover:translate-x-1 transition">→</span>
            </div>
            <h2 className="font-display text-xl text-[#111111] mb-2">
              I'm an Agent
            </h2>
            <p className="text-sm text-[#2B2B2B]/70">
              List properties, reach more clients, and grow your business.
            </p>
          </Link>
        </div>

        <p className="text-center text-sm text-[#2B2B2B]/70 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C9975C] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}