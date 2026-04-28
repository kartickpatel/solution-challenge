"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Share2, ShieldCheck } from "lucide-react";

export default function ProtocolCard({ protocol }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden transition-all hover:border-gray-700">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex justify-between items-center group"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 transition-colors">
            <ShieldCheck className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{protocol.title}</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{protocol.type} Protocol</span>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-6 h-6 text-gray-500" /> : <ChevronDown className="w-6 h-6 text-gray-500" />}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-gray-800 bg-black/20 animate-in slide-in-from-top duration-300">
          <div className="space-y-4 mb-6">
            {protocol.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  {idx + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => {
              alert("Protocol link copied to clipboard!");
            }}
            className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
          >
            <Share2 className="w-4 h-4" />
            Share with Team
          </button>
        </div>
      )}
    </div>
  );
}
