// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';

// Mock Incident Data
const mockIncidents = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

function App() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [expandedIncidents, setExpandedIncidents] = useState<number[]>([]);

  const toggleDescription = (id: number) => {
    setExpandedIncidents((prev) =>
      prev.includes(id) ? prev.filter((incidentId) => incidentId !== id) : [...prev, id]
    );
  };

  const addNewIncident = (incident: { title: string; description: string; severity: string }) => {
    const newIncidentWithId = {
      ...incident,
      id: incidents.length + 1,
      reported_at: new Date().toISOString(),
    };
    setIncidents((prev) => [...prev, newIncidentWithId]);
  };

  return (
    <div className="App">
      <h1>AI Safety Incident Dashboard</h1>

      {/* Filter Controls */}
      <div className="filter-section">
        <label>Filter by Severity:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Sorting Controls */}
      <div className="sort-section">
        <label>Sort by Reported Date:</label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {/* Incident List */}
      <IncidentList
        incidents={incidents}
        filter={filter}
        sortOrder={sortOrder}
        expandedIncidents={expandedIncidents}
        toggleDescription={toggleDescription}
      />

      {/* Report New Incident Form */}
      <IncidentForm addNewIncident={addNewIncident} />
    </div>
  );
}

export default App;
