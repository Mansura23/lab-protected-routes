"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900">
          PostHub
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/posts" className="text-sm text-slate-600 hover:text-indigo-600">
            Posts
          </Link>
          {isAuthenticated && user?.role === "ADMIN" && (
            <Link href="/admin" className="text-sm text-slate-600 hover:text-indigo-600">
              Admin
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <span className="text-sm text-slate-700">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={logout}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}