// src/components/IncidentCard.tsx
import React from 'react';

type IncidentCardProps = {
  incident: {
    id: number;
    title: string;
    description: string;
    severity: string;
    reported_at: string;
  };
  toggleDescription: (id: number) => void;
  expandedIncidents: number[];
};

const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  toggleDescription,
  expandedIncidents
}) => {
  const isExpanded = expandedIncidents.includes(incident.id);

  return (
    <div className="incident-card">
      <h2>{incident.title}</h2>
      <p><strong>Severity:</strong> {incident.severity}</p>
      <p><strong>Reported At:</strong> {new Date(incident.reported_at).toLocaleString()}</p>

      {/* View Details Button */}
      <button onClick={() => toggleDescription(incident.id)}>
        {isExpanded ? 'Hide Details' : 'View Details'}
      </button>

      {/* Description Toggle */}
      {isExpanded && <p className="incident-description">{incident.description}</p>}
    </div>
  );
};

export default IncidentCard;
