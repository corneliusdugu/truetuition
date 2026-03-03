"use client";

// src/app/ui/SiteHeader.jsx
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken, getToken } from "../api/api";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-green-600 text-white font-black">
        TT
      </div>
      <div className="leading-tight">
        <div className="font-extrabold text-slate-900">
          True<span className="text-green-600">Tuition</span>
        </div>
        <div className="text-xs text-slate-500">SDG 4 • Quality Education</div>
      </div>
    </Link>
  );
}

function NavItem({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
        isActive ? "bg-green-50 text-green-700" : "text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const authed = Boolean(getToken());

  const logout = () => {
    clearToken();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          <NavItem href="/" label="Home" />
          <NavItem href="/sdg4" label="About SDG 4" />
          <NavItem href="/donate" label="Donate" />
          <NavItem href="/dashboard" label="Dashboard" />
        </nav>

        <div className="flex items-center gap-2">
          {!authed ? (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/donate"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Donate
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <Link className="text-sm font-semibold text-slate-700" href="/">
            Home
          </Link>
          <Link className="text-sm font-semibold text-slate-700" href="/sdg4">
            SDG4
          </Link>
          <Link className="text-sm font-semibold text-slate-700" href="/donate">
            Donate
          </Link>
          <Link className="text-sm font-semibold text-slate-700" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}