// src/components/IncidentForm.tsx
import React, { useState } from 'react';

type IncidentFormProps = {
  addNewIncident: (incident: {
    title: string;
    description: string;
    severity: string;
  }) => void;
};

const IncidentForm: React.FC<IncidentFormProps> = ({ addNewIncident }) => {
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'Low',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.title || !newIncident.description) {
      alert('Please fill in all fields');
      return;
    }

    // Add the new incident
    addNewIncident(newIncident);

    // Clear the form
    setNewIncident({ title: '', description: '', severity: 'Low' });
  };

  return (
    <div className="form-container">
      <h2>Report New Incident</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={newIncident.title}
            onChange={handleInputChange}
            placeholder="Enter incident title"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={newIncident.description}
            onChange={handleInputChange}
            placeholder="Describe the incident"
            required
          />
        </div>
        <div>
          <label>Severity</label>
          <select
            name="severity"
            value={newIncident.severity}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Submit Incident</button>
      </form>
    </div>
  );
};

export default IncidentForm;