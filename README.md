# Rapid Crisis Response & Coordination Platform

A high-performance Next.js application designed for hospitality venues (hotels, resorts, event spaces) to detect, report, and coordinate emergency responses in real-time.

## 🌟 Overview

During an emergency, information fragmentation is the greatest barrier to safety. This platform bridges the gap between guests, on-site staff, and management by providing a unified, role-based interface for crisis management—all without the need for complex backends or authentication in a prototype environment.

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **State Management** | React Context API |
| **Data** | Local JSON + In-memory State |

## 🚀 Key Features

### 1. Guest Portal (`/guest`)
- **Single-Tap Reporting**: Large SOS button for immediate distress signaling.
- **Quick Report Form**: Fast data entry for incident type, location, and severity.
- **Immediate Guidance**: Contextual safety tips based on the reported emergency type.
- **Live ETA**: Visual confirmation that help is on the way.

### 2. Staff Dashboard (`/staff`)
- **Live Alert Feed**: Real-time incident list with 5-second auto-refresh simulation.
- **Incident Ownership**: Staff can claim "New" incidents and track their active assignments.
- **Quick Actions**: One-click activity logging (e.g., "Authorities Notified", "Area Cordoned").
- **Status Tracking**: Visual indicators for `New`, `Assigned`, and `Resolved` states.

### 3. Command Center (`/command`)
- **Situational Awareness**: Live stats bar for active incidents and staff deployment.
- **SVG Venue Map**: Interactive floor plan with pulsing red markers on active incident zones.
- **Data Visualization**: Recharts integration for incident distribution and hourly trends.
- **Detail Drawer**: Full incident history and escalation controls (e.g., "Escalate to 911").

### 4. Protocols Library (`/protocols`)
- **Searchable SOPs**: Quick access to Standard Operating Procedures.
- **Step-by-Step Instructions**: Clear, actionable items for different emergency tiers.

## 📁 Project Structure

```text
/app
  /guest      - Guest emergency portal
  /staff      - Staff response dashboard
  /command    - Management command center
  /protocols  - Emergency SOP library
/components   - Reusable UI (Navbar, Cards, Map, Stats)
/context      - RoleContext for global state management
/data         - Mock JSON data for incidents and protocols
```

## ⚙️ Getting Started

This project is a standalone prototype. No external databases or API keys are required.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚠️ Important Note

This is a **frontend-only prototype**. 
- **Authentication**: Role switching is handled via the UI for demonstration purposes.
- **Persistence**: Data resets on page refresh (initial state is seeded from `data/mockIncidents.json`).
- **Real-time**: Simulated using React state and polling intervals.

---
*Built for the Grand Horizon Hotel — Emergency Response System.*
