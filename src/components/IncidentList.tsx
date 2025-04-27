// src/components/IncidentList.tsx
import React from 'react';
import IncidentCard from './IncidentCard';

type IncidentListProps = {
  incidents: {
    id: number;
    title: string;
    description: string;
    severity: string;
    reported_at: string;
  }[];
  filter: string;
  sortOrder: string;
  expandedIncidents: number[];
  toggleDescription: (id: number) => void;
};

const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  filter,
  sortOrder,
  expandedIncidents,
  toggleDescription
}) => {
  // Filter incidents based on severity
  const filteredIncidents = incidents.filter((incident) =>
    filter === 'All' || incident.severity === filter
  );

  // Sort incidents based on reported date
  const sortedIncidents = filteredIncidents.sort((a, b) => {
    const aDate = new Date(a.reported_at).getTime();
    const bDate = new Date(b.reported_at).getTime();

    return sortOrder === 'Newest' ? bDate - aDate : aDate - bDate;
  });

  return (
    <div className="incident-list">
      {sortedIncidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          toggleDescription={toggleDescription}
          expandedIncidents={expandedIncidents}
        />
      ))}
    </div>
  );
};

export default IncidentList;
