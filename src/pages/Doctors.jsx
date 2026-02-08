import React, { useMemo, useState } from 'react';
import doctors from '../data/doctors';

export default function Doctors() {
  const [searchQ, setSearchQ] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredDoctors = useMemo(() => {
    let result = doctors;

    // Filter by search
    if (searchQ) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(searchQ.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQ.toLowerCase()) ||
        d.email.toLowerCase().includes(searchQ.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchQ.toLowerCase())
      );
    }

    // Filter by specialty
    if (specialtyFilter !== 'All') {
      result = result.filter((d) => d.specialty === specialtyFilter);
    }

    // Filter by availability
    if (availabilityFilter !== 'All') {
      result = result.filter((d) => d.availability === availabilityFilter);
    }

    // Sort
    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'patients') {
      result.sort((a, b) => b.patients - a.patients);
    }

    return result;
  }, [searchQ, specialtyFilter, availabilityFilter, sortBy]);

  const specialties = [...new Set(doctors.map(d => d.specialty))];
  const activeCount = doctors.filter(d => d.status === 'Active').length;

  return (
    <div className="doctors-container">
      {/* Header */}
      <div className="doctors-header">
        <div>
          <h1>Doctors Management</h1>
          <p className="muted">Browse and manage doctor profiles</p>
        </div>
        <button className="btn-primary">+ Add Doctor</button>
      </div>

      {/* Stats */}
      <div className="doctors-stats">
        <div className="stat-box">
          <div className="stat-number">{doctors.length}</div>
          <div className="stat-label">Total Doctors</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#10b981' }}>{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#f59e0b' }}>{specialties.length}</div>
          <div className="stat-label">Specialties</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="doctors-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, ID, email or specialty..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} className="filter-select">
            <option value="All">All Specialties</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="filter-select">
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Leave">Leave</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
            <option value="name">Sort by Name</option>
            <option value="experience">Sort by Experience</option>
            <option value="rating">Sort by Rating</option>
            <option value="patients">Sort by Patients</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>{filteredDoctors.length} doctors found</span>
      </div>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((d) => (
            <div key={d.id} className="doctor-card-full">
              <div className="doctor-card-header">
                <div className="doctor-avatar-large">👨‍⚕️</div>
                <div className="doctor-name-section">
                  <h3>{d.name}</h3>
                  <p className="doctor-id">{d.id}</p>
                </div>
                <span className={`availability-badge availability-${d.availability.toLowerCase()}`}>
                  {d.availability}
                </span>
              </div>

              <div className="doctor-card-body">
                <div className="doctor-info-row">
                  <span className="label">Specialty</span>
                  <span className="value">{d.specialty}</span>
                </div>
                <div className="doctor-info-row">
                  <span className="label">Qualification</span>
                  <span className="value">{d.qualification}</span>
                </div>
                <div className="doctor-info-row">
                  <span className="label">Experience</span>
                  <span className="value">{d.experience} years</span>
                </div>
                <div className="doctor-info-row">
                  <span className="label">Email</span>
                  <span className="value">{d.email}</span>
                </div>
                <div className="doctor-info-row">
                  <span className="label">Phone</span>
                  <span className="value">{d.phone}</span>
                </div>
              </div>

              <div className="doctor-card-stats">
                <div className="stat-item">
                  <div className="stat-number">{d.patients}</div>
                  <div className="stat-name">Patients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">⭐{d.rating}</div>
                  <div className="stat-name">Rating</div>
                </div>
                <div className="stat-item">
                  <div className={`status-tag status-${d.status.toLowerCase()}`}>{d.status}</div>
                </div>
              </div>

              <div className="doctor-card-actions">
                <button className="action-secondary">View Profile</button>
                <button className="action-secondary">Schedule</button>
                <button className="action-secondary">Edit</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
            No doctors found
          </div>
        )}
      </div>
    </div>
  );
}
