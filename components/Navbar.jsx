"use client";

import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { role, setRole } = useRole();
  const pathname = usePathname();

  const navLinks = [
    { name: "Guest", href: "/guest", roleValue: "guest" },
    { name: "Staff", href: "/staff", roleValue: "staff" },
    { name: "Command", href: "/command", roleValue: "command" },
    { name: "Protocols", href: "/protocols", roleValue: role }, // Protocols accessible by all, role stays same
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold text-red-500 tracking-tight">
          CRISIS<span className="text-white">RESPONSE</span>
        </Link>
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => link.roleValue !== role && setRole(link.roleValue)}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            System Live
          </span>
        </div>
        
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-800 text-white text-xs font-bold py-1.5 px-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="guest">GUEST VIEW</option>
          <option value="staff">STAFF VIEW</option>
          <option value="command">COMMAND VIEW</option>
        </select>
      </div>
    </nav>
  );
}
