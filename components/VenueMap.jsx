"use client";

import React, { useState } from "react";

export default function VenueMap({ incidents }) {
  const [hoveredZone, setHoveredZone] = useState(null);

  const zones = [
    { id: "Lobby", x: 10, y: 70, w: 180, h: 120, label: "Lobby" },
    { id: "Restaurant", x: 200, y: 70, w: 150, h: 120, label: "Restaurant" },
    { id: "Conference Hall", x: 360, y: 70, w: 230, h: 120, label: "Conference" },
    { id: "Pool Area", x: 10, y: 200, w: 150, h: 180, label: "Pool" },
    { id: "Floors 1-5", x: 170, y: 200, w: 200, h: 180, label: "Guest Rooms" },
    { id: "Parking", x: 380, y: 200, w: 210, h: 180, label: "Parking" },
    { id: "Room 204", x: 180, y: 210, w: 40, h: 40, label: "R204", subzone: true },
    { id: "Room 305", x: 230, y: 210, w: 40, h: 40, label: "R305", subzone: true },
  ];

  const getActiveIncidentsInZone = (zoneId) => {
    return incidents.filter(inc => 
      (inc.location.includes(zoneId) || zoneId.includes(inc.location)) && 
      inc.status !== "Resolved"
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Live Venue Floor Plan</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-400 font-bold uppercase">Active Incident</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-700 rounded-full"></span>
            <span className="text-xs text-gray-400 font-bold uppercase">Clear Zone</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full">
        <svg viewBox="0 0 600 400" className="w-full h-full">
          {/* Background */}
          <rect x="0" y="0" width="600" height="400" fill="#000000" rx="12" />
          
          {/* Zones */}
          {zones.map((zone) => {
            const activeIncidents = getActiveIncidentsInZone(zone.id);
            const isActive = activeIncidents.length > 0;
            
            return (
              <g 
                key={zone.id} 
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredZone({ ...zone, incidents: activeIncidents })}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.w}
                  height={zone.h}
                  className={`transition-colors duration-300 ${
                    isActive 
                      ? "fill-red-500/10 stroke-red-500 stroke-2" 
                      : "fill-gray-900 stroke-gray-700 hover:fill-gray-800"
                  }`}
                  rx={zone.subzone ? "4" : "8"}
                />
                {!zone.subzone && (
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2}
                    textAnchor="middle"
                    className={`text-[10px] font-bold uppercase tracking-tighter pointer-events-none ${
                      isActive ? "fill-red-500" : "fill-gray-600 group-hover:fill-gray-400"
                    }`}
                  >
                    {zone.label}
                  </text>
                )}
                {isActive && (
                  <circle
                    cx={zone.x + zone.w / 2}
                    cy={zone.y + 20}
                    r="6"
                    className="fill-red-500 animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredZone && (
          <div 
            className="absolute z-10 bg-black border border-gray-700 p-4 rounded-xl shadow-2xl pointer-events-none w-48 animate-in fade-in zoom-in duration-200"
            style={{ 
              left: `${(hoveredZone.x / 600) * 100}%`, 
              top: `${(hoveredZone.y / 400) * 100 - 10}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <p className="text-white font-bold text-sm mb-1">{hoveredZone.id}</p>
            {hoveredZone.incidents.length > 0 ? (
              <div className="space-y-2">
                {hoveredZone.incidents.map(inc => (
                  <div key={inc.id} className="text-[10px] bg-red-500/10 text-red-500 p-1.5 rounded border border-red-500/20">
                    <p className="font-bold">{inc.type}</p>
                    <p className="opacity-70">{inc.id}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-[10px]">No active incidents</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
