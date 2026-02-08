import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const roles = ['Admin', 'Doctor', 'Nurse', 'Receptionist', 'Patient'];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!username || !password || !role) {
      setError('Please fill in all fields');
      return;
    }
    login({ name: username, password, role });
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>HMS Prototype</h1>
        <p className="login-subtitle">Hospital Management System</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          {error && <div className="error-msg">{error}</div>}
          
          <button type="submit" className="btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  );
}
