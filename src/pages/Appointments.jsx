import React, { useMemo, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import appointments from '../data/appointments';

export default function Appointments() {
  const [allAppointments, setAllAppointments] = useState(appointments);
  const [searchQ, setSearchQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const filteredAppointments = useMemo(() => {
    let result = allAppointments;

    // Filter by search
    if (searchQ) {
      result = result.filter((a) =>
        a.patient.toLowerCase().includes(searchQ.toLowerCase()) ||
        a.doctor.toLowerCase().includes(searchQ.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQ.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter((a) => a.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'All') {
      result = result.filter((a) => a.type === typeFilter);
    }

    // Sort
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'patient') {
      result.sort((a, b) => a.patient.localeCompare(b.patient));
    } else if (sortBy === 'doctor') {
      result.sort((a, b) => a.doctor.localeCompare(b.doctor));
    }

    return result;
  }, [searchQ, statusFilter, typeFilter, sortBy, allAppointments]);

  const handleCreate = (appt) => {
    const newAppt = {
      id: `APT${String(allAppointments.length + 1).padStart(3, '0')}`,
      patient: appt.patient,
      doctor: appt.doctor,
      date: appt.date,
      time: appt.time || '09:00',
      type: appt.type || 'Consultation',
      status: 'Scheduled',
      notes: appt.notes || '',
      duration: appt.duration || '30 mins',
    };
    setAllAppointments([...allAppointments, newAppt]);
  };

  const completedCount = allAppointments.filter(a => a.status === 'Completed').length;
  const scheduledCount = allAppointments.filter(a => a.status === 'Scheduled').length;
  const cancelledCount = allAppointments.filter(a => a.status === 'Cancelled').length;
  const appointmentTypes = [...new Set(allAppointments.map(a => a.type))];

  return (
    <div className="appointments-container">
      {/* Header */}
      <div className="appointments-header">
        <div>
          <h1>Appointments Management</h1>
          <p className="muted">Schedule and manage patient appointments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="appointments-stats">
        <div className="stat-box">
          <div className="stat-number">{allAppointments.length}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#10b981' }}>{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#3b82f6' }}>{scheduledCount}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-box">
          <div className="stat-number" style={{ color: '#ef4444' }}>{cancelledCount}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      {/* New Appointment Form */}
      <div className="appointment-form-wrapper">
        <h3>Book New Appointment</h3>
        <AppointmentForm onCreate={handleCreate} />
      </div>

      {/* Filters & Search */}
      <div className="appointments-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by patient, doctor or appointment ID..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="filter-select">
            <option value="All">All Types</option>
            {appointmentTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
            <option value="date">Sort by Date</option>
            <option value="patient">Sort by Patient</option>
            <option value="doctor">Sort by Doctor</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <span>{filteredAppointments.length} appointments found</span>
      </div>

      {/* Appointments Table */}
      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a) => (
                <tr key={a.id}>
                  <td className="appointment-id">{a.id}</td>
                  <td className="patient-name">{a.patient}</td>
                  <td className="doctor-name">{a.doctor}</td>
                  <td className="date-time">{a.date} {a.time}</td>
                  <td className="appointment-type">{a.type}</td>
                  <td className="duration">{a.duration}</td>
                  <td>
                    <span className={`status-pill status-${a.status.toLowerCase().replace('-', '-')}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="notes-cell" title={a.notes}>{a.notes}</td>
                  <td className="actions-cell">
                    <button className="action-btn edit-btn" title="Edit">✏️</button>
                    <button className="action-btn delete-btn" title="Delete">🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
