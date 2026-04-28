"use client";

import React, { useState } from "react";
import protocols from "@/data/protocols.json";
import ProtocolCard from "@/components/ProtocolCard";
import { BookOpen, Search } from "lucide-react";

export default function ProtocolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProtocols = protocols.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.steps.some(step => step.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-red-500/10 rounded-2xl mb-6">
          <BookOpen className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Emergency Protocols Library</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Standard Operating Procedures (SOPs) for all emergency scenarios. 
          Use the search bar to find specific instructions quickly.
        </p>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search protocols (e.g., 'Fire', 'Medical', 'Evacuation')..."
          className="w-full bg-gray-900 border border-gray-800 rounded-2xl pl-16 pr-6 py-5 text-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filteredProtocols.length > 0 ? (
          filteredProtocols.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-3xl">
            <p className="text-gray-500">No protocols found matching your search.</p>
          </div>
        )}
      </div>

      <div className="mt-16 p-8 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
        <h3 className="text-white font-bold mb-2">Need to report a missing protocol?</h3>
        <p className="text-gray-400 text-sm mb-4">
          If you identify a scenario not covered in this library, please notify management immediately.
        </p>
        <button className="text-blue-500 font-bold text-sm uppercase tracking-widest hover:text-blue-400 transition-colors">
          Contact Management →
        </button>
      </div>
    </div>
  );
}
