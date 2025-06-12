"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const links = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Calender", href: "/calender" },
  { name: "Activities", href: "/activities" },
  { name: "Tasks", href: "/tasks" },
  { name: "Classes", href: "/classes" },
];
export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">
      <div className="flex gap-4">
        {links.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`hover:underline ${
              pathname === href ? "font-bold text-blue-400" : ""
            }`}
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm">
              Hello, {session.user.name || "User"}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
