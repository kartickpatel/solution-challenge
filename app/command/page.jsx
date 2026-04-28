"use client";

import React, { useState } from "react";
import { useRole } from "@/context/RoleContext";
import StatCard from "@/components/StatCard";
import VenueMap from "@/components/VenueMap";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Users, 
  ArrowUpRight, 
  MoreVertical,
  X,
  PhoneCall,
  ShieldAlert
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  BarChart,
  Bar
} from "recharts";

export default function CommandPage() {
  const { incidents, logActivity } = useRole();
  const [selectedIncident, setSelectedIncident] = useState(null);

  const activeIncidents = incidents.filter(inc => inc.status !== "Resolved");
  const resolvedIncidents = incidents.filter(inc => inc.status === "Resolved");
  const staffDeployed = [...new Set(incidents.map(inc => inc.assignedTo).filter(Boolean))].length;

  const stats = [
    { title: "Active Incidents", value: activeIncidents.length, icon: <AlertCircle className="w-8 h-8" />, color: "bg-red-500/10 text-red-500" },
    { title: "Staff Deployed", value: staffDeployed, icon: <Users className="w-8 h-8" />, color: "bg-blue-500/10 text-blue-500" },
    { title: "Resolved Today", value: resolvedIncidents.length, icon: <CheckCircle2 className="w-8 h-8" />, color: "bg-green-500/10 text-green-500" },
    { title: "Avg Response", value: "4.2m", icon: <Clock className="w-8 h-8" />, color: "bg-yellow-500/10 text-yellow-500" },
  ];

  // Chart Data
  const typeData = Object.entries(
    incidents.reduce((acc, inc) => {
      acc[inc.type] = (acc[inc.type] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ["#ef4444", "#3b82f6", "#a855f7", "#06b6d4", "#eab308", "#6b7280"];

  const hourlyData = [
    { hour: "08:00", count: 2 },
    { hour: "09:00", count: 5 },
    { hour: "10:00", count: 3 },
    { hour: "11:00", count: 8 },
    { hour: "12:00", count: 4 },
    { hour: "13:00", count: 6 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Command Center Overview</h1>
          <p className="text-gray-500">Real-time situational awareness and resource coordination.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-red-600/20">
            <ShieldAlert className="w-5 h-5" />
            Full Site Lockdown
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <VenueMap incidents={incidents} />
        </div>
        
        <div className="space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 h-full">
            <h2 className="text-xl font-bold text-white mb-6">Incident Distribution</h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #374151', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {typeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-xs text-gray-400">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-8 overflow-hidden">
          <h2 className="text-xl font-bold text-white mb-8">Incident Management Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Incident</th>
                  <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                  <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Location</th>
                  <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="pb-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="text-white font-bold">{inc.id}</span>
                        <span className="text-[10px] text-gray-500">{new Date(inc.reportedAt).toLocaleTimeString()}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        inc.type === "Fire" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                      }`}>
                        {inc.type}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 font-medium">{inc.location}</td>
                    <td className="py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-bold ${
                        inc.status === "New" ? "text-red-500" : inc.status === "Assigned" ? "text-yellow-400" : "text-green-500"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          inc.status === "New" ? "bg-red-500 animate-pulse" : inc.status === "Assigned" ? "bg-yellow-400" : "bg-green-500"
                        }`}></span>
                        {inc.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button 
                        onClick={() => setSelectedIncident(inc)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-5 h-5 ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Activity Timeline</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <XAxis dataKey="hour" stroke="#4b5563" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">Incidents per hour (Simulated)</p>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedIncident && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setSelectedIncident(null)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-950 border-l border-gray-800 z-[101] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedIncident.id}</h3>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">{selectedIncident.type} Incident</p>
              </div>
              <button onClick={() => setSelectedIncident(null)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 flex-grow overflow-y-auto space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <p className="text-gray-500 text-[10px] font-black uppercase mb-1">Status</p>
                  <p className="text-white font-bold">{selectedIncident.status}</p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
                  <p className="text-gray-500 text-[10px] font-black uppercase mb-1">Assigned To</p>
                  <p className="text-white font-bold">{selectedIncident.assignedTo || "Unassigned"}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Activity Log</h4>
                <div className="space-y-4">
                  {selectedIncident.activityLog.map((log, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      {idx !== selectedIncident.activityLog.length - 1 && (
                        <div className="absolute left-[7px] top-6 w-[2px] h-full bg-gray-800"></div>
                      )}
                      <div className="w-4 h-4 rounded-full bg-red-500 mt-1.5 flex-shrink-0 z-10 border-4 border-black"></div>
                      <div>
                        <p className="text-white text-sm font-medium">{log.note}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-1">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    logActivity(selectedIncident.id, "Emergency Services Notified");
                    alert("Emergency services have been notified.");
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                >
                  <PhoneCall className="w-5 h-5" />
                  Escalate to 911
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded-xl transition-all">
                  Broadcast Alert to Guests
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
