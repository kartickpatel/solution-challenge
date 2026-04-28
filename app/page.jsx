"use client";

import Link from "next/link";
import { useRole } from "@/context/RoleContext";
import { ShieldAlert, Users, LayoutDashboard } from "lucide-react";

export default function Home() {
  const { setRole } = useRole();

  const roles = [
    {
      title: "Guest Portal",
      description: "Report an emergency quickly and get immediate assistance instructions.",
      icon: <ShieldAlert className="w-12 h-12 text-red-500" />,
      href: "/guest",
      roleValue: "guest",
      color: "hover:border-red-500",
    },
    {
      title: "Staff Dashboard",
      description: "View active alerts, claim incidents, and coordinate response efforts.",
      icon: <Users className="w-12 h-12 text-blue-500" />,
      href: "/staff",
      roleValue: "staff",
      color: "hover:border-blue-500",
    },
    {
      title: "Command Center",
      description: "Full situational overview and management of all ongoing incidents.",
      icon: <LayoutDashboard className="w-12 h-12 text-green-500" />,
      href: "/command",
      roleValue: "command",
      color: "hover:border-green-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
          Grand Horizon Hotel
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Rapid Crisis Response & Coordination Platform. 
          Please select your portal to begin.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {roles.map((role) => (
          <Link
            key={role.title}
            href={role.href}
            onClick={() => setRole(role.roleValue)}
            className={`bg-gray-900 border-2 border-gray-800 p-8 rounded-2xl transition-all duration-300 group ${role.color}`}
          >
            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
              {role.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-white">
              {role.title}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {role.description}
            </p>
            <div className="mt-8 inline-flex items-center text-sm font-bold text-white uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
              Enter Portal <span className="ml-2">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 p-8 bg-gray-900/50 border border-gray-800 rounded-2xl text-center">
        <h3 className="text-white font-semibold mb-2">Emergency Protocols</h3>
        <p className="text-gray-400 mb-6">Need to review standard operating procedures?</p>
        <Link 
          href="/protocols"
          className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          View Protocols Library
        </Link>
      </div>
    </div>
  );
}
