import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <div className="logo-icon">🏥</div>
          <div className="logo-text">
            <strong>HMS</strong>
            <span className="brand-muted">Pro</span>
          </div>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input className="search" placeholder="Search patients, doctors..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="nav-actions">
          {user && (
            <>
              <div className="notification-bell">
                <button className="icon-btn">🔔</button>
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </div>

              <div className="profile-dropdown">
                <button
                  className="profile-btn"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <div className="user-avatar">👤</div>
                  <div className="user-info">
                    <span className="username">{user.name}</span>
                    <span className="user-role">{user.role}</span>
                  </div>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {showProfile && (
                  <div className="profile-menu">
                    <div className="profile-menu-header">
                      <div className="profile-avatar">👤</div>
                      <div>
                        <p className="profile-name">{user.name}</p>
                        <p className="profile-role">{user.role}</p>
                      </div>
                    </div>
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                    <a href="#profile" className="menu-item">👤 My Profile</a>
                    <a href="#settings" className="menu-item">⚙️ Settings</a>
                    <a href="#help" className="menu-item">❓ Help & Support</a>
                    <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                    <button onClick={logout} className="menu-item logout-item">🚪 Logout</button>
                  </div>
                )}
              </div>
            </>
          )}

          {!user && (
            <button className="btn-primary">Sign In</button>
          )}
        </div>
      </div>
    </header>
  );
}
