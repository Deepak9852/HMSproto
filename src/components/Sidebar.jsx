import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/patients">Patients</NavLink></li>
          <li><NavLink to="/doctors">Doctors</NavLink></li>
          <li><NavLink to="/appointments">Appointments</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
}
