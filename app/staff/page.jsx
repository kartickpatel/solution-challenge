"use client";

import React, { useState, useEffect } from "react";
import { useRole } from "@/context/RoleContext";
import IncidentCard from "@/components/IncidentCard";
import { Activity, Bell, Filter, List, Search, UserCheck } from "lucide-react";

export default function StaffPage() {
  const { incidents, claimIncident, resolveIncident, logActivity } = useRole();
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate "live" updates checking
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredIncidents = incidents.filter((inc) => {
    const matchesFilter = filter === "All" || inc.status === filter;
    const matchesSearch = 
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const myAssignments = incidents.filter(inc => inc.status === "Assigned"); // Mocked "my" assignments

  const quickLogs = [
    "Contacted Guest",
    "First Aid Dispatched",
    "Authorities Notified",
    "Area Cordoned Off",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Feed */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Bell className="w-8 h-8 text-red-500" />
                Live Alert Feed
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>

            <div className="flex gap-2">
              {["All", "New", "Assigned", "Resolved"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                    filter === f
                      ? "bg-white text-black border-white"
                      : "bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by location, type, or ID..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredIncidents.length > 0 ? (
              filteredIncidents.map((inc) => (
                <IncidentCard
                  key={inc.id}
                  incident={inc}
                  onClaim={claimIncident}
                  onResolve={resolveIncident}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-gray-900/50 border border-gray-800 border-dashed rounded-2xl">
                <List className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500">No incidents match your current filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <UserCheck className="w-5 h-5 text-blue-500" />
              Active Assignments
            </h2>
            <div className="space-y-4">
              {myAssignments.length > 0 ? (
                myAssignments.map((inc) => (
                  <div key={inc.id} className="p-3 bg-black/40 border border-gray-800 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono text-gray-500">{inc.id}</span>
                      <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded uppercase">
                        {inc.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white mb-3">{inc.location}</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {quickLogs.map((log) => (
                        <button
                          key={log}
                          onClick={() => logActivity(inc.id, log)}
                          className="text-[10px] bg-gray-800 hover:bg-gray-700 text-gray-300 py-1.5 px-2 rounded font-semibold transition-colors text-left"
                        >
                          + {log}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm text-center py-4 italic">
                  No incidents assigned to you.
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-green-500" />
              Staff Resources
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-400">On-duty Security</span>
                <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">04</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-400">On-duty Medical</span>
                <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">02</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Facility Managers</span>
                <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">01</span>
              </li>
            </ul>
            <button className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors uppercase tracking-widest">
              Request Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
