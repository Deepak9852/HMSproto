import React, { useMemo, useState } from 'react';
import patientsData from '../data/patients';

export default function Patients() {
  const [searchQ, setSearchQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [selectedPatients, setSelectedPatients] = useState(new Set());

  const filteredPatients = useMemo(() => {
    let result = patientsData;

    // Filter by search
    if (searchQ) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQ.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQ.toLowerCase()) ||
        p.phone.includes(searchQ)
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'lastVisit') {
      result.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit));
    } else if (sortBy === 'age') {
      result.sort((a, b) => a.age - b.age);
    }

    return result;
  }, [searchQ, statusFilter, sortBy]);

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedPatients);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPatients(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedPatients.size === filteredPatients.length) {
      setSelectedPatients(new Set());
    } else {
      setSelectedPatients(new Set(filteredPatients.map(p => p.id)));
    }
  };

  const activeCount = patientsData.filter(p => p.status === 'Active').length;
  const inactiveCount = patientsData.filter(p => p.status === 'Inactive').length;

  return (
    <div className="patients-container">
      {/* Header */}
      <div className="patients-header">
        <div>
          <h1>Patients Management</h1>
          <p className="muted">Manage patient records and medical information</p>
        </div>
        <button className="btn-primary">+ Add Patient</button>
      </div>

      {/* Stats */}
      <div className="patients-stats">
        <div className="stat-box">
          <div className="stat-number">{patientsData.length}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#10b981' }}>{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#ef4444' }}>{inactiveCount}</div>
          <div className="stat-label">Inactive</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="patients-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, ID, email or phone..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
            <option value="name">Sort by Name</option>
            <option value="lastVisit">Sort by Last Visit</option>
            <option value="age">Sort by Age</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>{filteredPatients.length} results found</span>
        {selectedPatients.size > 0 && (
          <span style={{ marginLeft: '16px', color: 'var(--accent)' }}>
            {selectedPatients.size} selected
          </span>
        )}
      </div>

      {/* Table */}
      <div className="patients-table-wrapper">
        <table className="patients-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedPatients.size === filteredPatients.length && filteredPatients.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Last Visit</th>
              <th>Doctor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <tr key={p.id} className={selectedPatients.has(p.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPatients.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                    />
                  </td>
                  <td className="patient-id">{p.id}</td>
                  <td className="patient-name">
                    <div>{p.name}</div>
                    <div className="patient-email">{p.email}</div>
                  </td>
                  <td>{p.gender}</td>
                  <td>{p.age}</td>
                  <td>{p.condition}</td>
                  <td>
                    <span className={`status-pill status-${p.status.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="date-cell">{p.lastVisit}</td>
                  <td className="doctor-cell">{p.assignedDoctor}</td>
                  <td className="actions-cell">
                    <button className="action-btn view-btn" title="View">👁️</button>
                    <button className="action-btn edit-btn" title="Edit">✏️</button>
                    <button className="action-btn delete-btn" title="Delete">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedPatients.size > 0 && (
        <div className="bulk-actions">
          <span>{selectedPatients.size} patient(s) selected</span>
          <button className="action-secondary">Export Selected</button>
          <button className="action-danger">Delete Selected</button>
        </div>
      )}
    </div>
  );
}
