"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ThankYou() {
  const searchParams = useSearchParams();

  // Read values from query string (Next replacement for react-router location.state)
  const amount = searchParams.get("amount");
  const createdAt = searchParams.get("createdAt");
  const message = searchParams.get("message");

  return (
    <section className="bg-gradient-to-b from-green-50 via-white to-white">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-green-100">
            True Tuition • Thank you
          </div>

          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
            Thank you for your donation 💚
          </h1>

          <p className="mt-2 text-slate-600">
            Your support helps children access better education in developing countries (SDG 4).
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-100">
              <p className="text-xs font-bold text-slate-500">Amount</p>
              <p className="mt-1 text-lg font-extrabold text-slate-900">
                £{amount ?? "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-100">
              <p className="text-xs font-bold text-slate-500">Date</p>
              <p className="mt-1 text-sm font-extrabold text-slate-900">
                {createdAt ? new Date(createdAt).toLocaleString() : "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-4 ring-1 ring-green-100">
              <p className="text-xs font-bold text-slate-500">Purpose</p>
              <p className="mt-1 text-sm font-extrabold text-slate-900">
                SDG4 • Quality Education
              </p>
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <p className="font-extrabold text-slate-900">Your message</p>
              <p className="mt-1 text-slate-600">{message}</p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-green-700 px-5 py-3 text-sm font-extrabold text-white hover:bg-green-800"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/donate"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Make another donation
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Back to Home
            </Link>
          </div>

          <div className="mt-7 rounded-2xl bg-green-50 p-4 text-sm text-slate-700 ring-1 ring-green-100">
            Contact: <b>c.dugu@rgu.ac.uk</b> • <b>07823950074</b>
          </div>
        </div>
      </div>
    </section>
  );
}