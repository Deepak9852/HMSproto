import React from 'react';
import { useAuth } from '../auth/AuthContext';
import patients from '../data/patients';
import doctors from '../data/doctors';
import appointments from '../data/appointments';
import analytics from '../data/analytics';
import Sparkline from '../components/Sparkline';
import {
  LineChart, Line, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush,
} from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();

  // Use shared analytics data
  const { monthlyData, admissionData, departmentData, statusData, statsTrends } = analytics;

  const stats = [
    { label: 'Total Patients', value: patients.length, color: '#3b82f6' },
    { label: 'Total Doctors', value: doctors.length, color: '#10b981' },
    { label: 'Appointments', value: appointments.length, color: '#f59e0b' },
    { label: 'Available Beds', value: 28, color: '#8b5cf6' },
  ];

  const recentAppointments = appointments.slice(0, 5);
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const scheduledCount = appointments.filter(a => a.status === 'Scheduled').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const statusColors = ['#10b981', '#3b82f6', '#ef4444', '#6b7280'];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="muted">Welcome, {user?.name} ({user?.role})</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-color-bar" style={{ background: s.color }}></div>
            <div className="stat-content">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-sparkline">
                <Sparkline data={statsTrends[s.label] || []} color={s.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Monthly Appointments Trend */}
        <div className="chart-card interactive-chart">
          <h3>Monthly Appointments Trend</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
              <Legend />
              <Area type="monotone" dataKey="appointments" stroke="#3b82f6" fill="url(#colorAppointments)" fillOpacity={1} />
              <Line type="monotone" dataKey="appointments" stroke="#1e40af" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Brush dataKey="month" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Admission & Discharge Trend */}
        <div className="chart-card">
          <h3>Weekly Admission & Discharge</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={admissionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
              <Legend />
              <Bar dataKey="admitted" fill="#10b981" radius={[6, 6, 0, 0]} animationDuration={800} />
              <Bar dataKey="discharged" fill="#f59e0b" radius={[6, 6, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="chart-card">
          <h3>Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Status */}
        <div className="chart-card">
          <h3>Appointment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="dashboard-bottom">
        {/* Recent Appointments */}
        <div className="activity-card">
          <h3>Recent Appointments</h3>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.patient}</td>
                  <td>{appt.doctor}</td>
                  <td>{appt.date}</td>
                  <td>
                    <span className={`status-badge status-${appt.status.toLowerCase().replace(' ', '-')}`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="quick-stat-item">
            <div className="quick-stat-label">Appointments Today</div>
            <div className="quick-stat-value">12</div>
          </div>
          <div className="quick-stat-item">
            <div className="quick-stat-label">Completed</div>
            <div className="quick-stat-value" style={{ color: '#10b981' }}>{completedCount}</div>
          </div>
          <div className="quick-stat-item">
            <div className="quick-stat-label">Scheduled</div>
            <div className="quick-stat-value" style={{ color: '#3b82f6' }}>{scheduledCount}</div>
          </div>
          <div className="quick-stat-item">
            <div className="quick-stat-label">Cancelled</div>
            <div className="quick-stat-value" style={{ color: '#ef4444' }}>{cancelledCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
