"use client";

import React, { useState } from "react";
import { useRole } from "@/context/RoleContext";
import safetyTips from "@/data/safetyTips.json";
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Clock, Info } from "lucide-react";

export default function GuestPage() {
  const { addIncident } = useRole();
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastIncident, setLastIncident] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    type: "Medical",
    description: "",
    affectedCount: 1,
  });
  const [openTips, setOpenTips] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const incident = addIncident(formData);
    setLastIncident(incident);
    setShowConfirmation(true);
    setShowForm(false);
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 animate-in fade-in zoom-in duration-500">
        <div className="bg-gray-900 border-2 border-green-500 rounded-3xl p-10 text-center shadow-2xl shadow-green-500/10">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-24 h-24 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Alert Received</h1>
          <p className="text-xl text-gray-400 mb-8">
            Your emergency report has been sent to hotel staff and the command center. Help is on the way.
          </p>
          
          <div className="bg-black/40 rounded-2xl p-6 mb-8 text-left border border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Incident ID</p>
                <p className="text-white font-mono text-lg">{lastIncident?.id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1">Status</p>
                <p className="text-red-500 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Dispatched
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <p className="text-gray-300">Staff notified — ETA 3 minutes</p>
            </div>
          </div>

          <button
            onClick={() => setShowConfirmation(false)}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Emergency Assistance</h1>
        <p className="text-gray-400">If you are in immediate danger, please use the button below.</p>
      </div>

      {!showForm ? (
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setShowForm(true)}
            className="group relative flex flex-col items-center"
          >
            <div className="absolute -inset-4 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="bg-red-600 hover:bg-red-700 text-white w-64 h-64 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all active:scale-95 border-8 border-red-500/20">
              <AlertTriangle className="w-20 h-20 mb-2" />
              <span className="text-2xl font-black uppercase tracking-tighter">Report</span>
              <span className="text-xl font-bold uppercase tracking-tighter">Emergency</span>
            </div>
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-12 animate-in slide-in-from-bottom duration-500">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Quick Report Form</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-white"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Location</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Room 204 or Pool Area"
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Emergency Type</label>
                <select
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {Object.keys(safetyTips).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Description (Optional)</label>
              <textarea
                placeholder="Briefly describe what is happening..."
                rows="3"
                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">People Affected</label>
              <input
                type="number"
                min="0"
                className="w-40 bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                value={formData.affectedCount}
                onChange={(e) => setFormData({ ...formData, affectedCount: parseInt(e.target.value) })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-xl shadow-red-600/10"
            >
              Submit Urgent Report
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-500" />
          Immediate Safety Tips
        </h3>
        
        {Object.entries(safetyTips).map(([type, tips]) => (
          <div 
            key={type} 
            className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenTips(openTips === type ? null : type)}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
            >
              <span className={`font-semibold ${formData.type === type ? "text-red-500" : "text-gray-300"}`}>
                {type} Instructions
              </span>
              {openTips === type ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {openTips === type && (
              <div className="px-6 py-4 bg-black/30 border-t border-gray-800 animate-in slide-in-from-top duration-300">
                <ul className="space-y-3">
                  {tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                      <span className="text-red-500 font-bold">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
