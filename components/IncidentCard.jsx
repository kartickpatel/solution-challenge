"use client";

import { AlertCircle, CheckCircle2, MapPin, Users, Clock, ChevronRight } from "lucide-react";

export default function IncidentCard({ incident, onClaim, onResolve, staffName }) {
  const statusColors = {
    New: "border-red-500 text-red-500",
    Assigned: "border-yellow-400 text-yellow-400",
    Resolved: "border-green-500 text-green-500",
  };

  const typeColors = {
    Fire: "bg-red-500/10 text-red-500",
    Medical: "bg-blue-500/10 text-blue-500",
    "Security Threat": "bg-purple-500/10 text-purple-500",
    Flood: "bg-cyan-500/10 text-cyan-500",
    "Power Outage": "bg-yellow-500/10 text-yellow-400",
    Other: "bg-gray-500/10 text-gray-400",
  };

  return (
    <div className={`bg-gray-900 border-l-4 rounded-r-xl p-6 mb-4 transition-all hover:bg-gray-800/80 ${statusColors[incident.status] || "border-gray-700"}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-black tracking-widest uppercase opacity-50 font-mono">
              {incident.id}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeColors[incident.type]}`}>
              {incident.type}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 opacity-50" />
            {incident.location}
          </h3>
        </div>
        <div className="text-right">
          <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusColors[incident.status]}`}>
            {incident.status}
          </div>
          <div className="text-gray-500 text-xs flex items-center justify-end gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {new Date(incident.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
        {incident.description || "No additional details provided."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold">{incident.affectedCount} Affected</span>
          </div>
          {incident.assignedTo && (
            <div className="flex items-center gap-1.5 text-yellow-400">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-yellow-400/10 px-2 py-0.5 rounded">
                Assigned to: {incident.assignedTo}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {incident.status === "New" && (
            <button
              onClick={() => {
                const name = prompt("Enter your name to claim this incident:");
                if (name) onClaim(incident.id, name);
              }}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all"
            >
              Claim Incident
            </button>
          )}
          {incident.status === "Assigned" && (
            <button
              onClick={() => onResolve(incident.id)}
              className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all"
            >
              Mark Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
