"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import mockIncidentsData from "@/data/mockIncidents.json";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("guest");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Load initial data from JSON
    setIncidents(mockIncidentsData);
  }, []);

  const addIncident = (newIncident) => {
    const incidentWithId = {
      ...newIncident,
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      reportedAt: new Date().toISOString(),
      status: "New",
      assignedTo: null,
      activityLog: [
        {
          time: new Date().toLocaleTimeString(),
          note: "Incident reported by guest",
        },
      ],
    };
    setIncidents((prev) => [incidentWithId, ...prev]);
    return incidentWithId;
  };

  const claimIncident = (id, staffName) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: "Assigned",
              assignedTo: staffName,
              activityLog: [
                ...inc.activityLog,
                {
                  time: new Date().toLocaleTimeString(),
                  note: `Claimed by ${staffName}`,
                },
              ],
            }
          : inc
      )
    );
  };

  const resolveIncident = (id) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: "Resolved",
              activityLog: [
                ...inc.activityLog,
                {
                  time: new Date().toLocaleTimeString(),
                  note: "Incident resolved",
                },
              ],
            }
          : inc
      )
    );
  };

  const logActivity = (id, note) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              activityLog: [
                ...inc.activityLog,
                {
                  time: new Date().toLocaleTimeString(),
                  note: note,
                },
              ],
            }
          : inc
      )
    );
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        incidents,
        addIncident,
        claimIncident,
        resolveIncident,
        logActivity,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
