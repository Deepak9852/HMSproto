import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import doctors from '../data/doctors';
import patients from '../data/patients';
import appointments from '../data/appointments';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Home() {
  const { user } = useAuth();

  // Group doctors by specialty
  const departments = doctors.reduce((acc, d) => {
    (acc[d.specialty] = acc[d.specialty] || []).push(d);
    return acc;
  }, {});

  const deptData = Object.keys(departments).map((k) => ({ name: k, value: departments[k].length }));

  // Appointment counts by status
  const statusCounts = appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.keys(statusCounts).map((k) => ({ name: k, value: statusCounts[k] }));

  // Monthly appointments (simple aggregation)
  const monthly = [
    { month: 'Jan', value: 65 }, { month: 'Feb', value: 78 }, { month: 'Mar', value: 92 },
    { month: 'Apr', value: 85 }, { month: 'May', value: 110 }, { month: 'Jun', value: 130 }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Sample hospitals (for homepage cards)
  const hospitals = [
    { id: 'h1', name: 'City Care Hospital', location: 'Main St, Health District', rating: 4.6, beds: 180, tags: ['24x7', 'Emergency', 'Diagnostics'] },
    { id: 'h2', name: 'Green Valley Clinic', location: 'Oak Avenue', rating: 4.3, beds: 60, tags: ['Outpatient', 'Lab'] },
    { id: 'h3', name: 'Lakeside Medical Centre', location: 'Lakeside Blvd', rating: 4.8, beds: 220, tags: ['Surgery', 'ICU', 'Maternity'] }
  ];

  return (
    <div className="home-enterprise">
      <div className="home-hero">
        <div className="hero-banner">
          <div className="banner-image" style={{backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.28), rgba(2,6,23,0.12)), url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc123')`}}>
            <div className="banner-overlay">
              <div className="banner-left">
                <h1>Quality Care. Trusted Doctors. Near You.</h1>
                <p className="muted">Compare hospitals, view profiles, read verified reviews and book appointments instantly.</p>

                <div className="search-card">
                  <div className="search-fields">
                    <input className="search" placeholder="Search doctor, specialty or clinic" />
                    <input className="search" placeholder="Location (city or area)" />
                    <select className="filter-select"><option>Any specialty</option>{Object.keys(departments).map(s => <option key={s}>{s}</option>)}</select>
                    <button className="btn-sm">Find Doctors</button>
                  </div>
                  <div className="search-quick">Try: Cardiology, Pediatrics, Orthopedics</div>
                </div>

                <div className="hero-kpis">
                  <div className="kpi-card pulse"><div className="kpi-value">{doctors.length}</div><div className="kpi-label">Verified Doctors</div></div>
                  <div className="kpi-card"><div className="kpi-value">{patients.length}k</div><div className="kpi-label">Patients Served</div></div>
                  <div className="kpi-card"><div className="kpi-value">{appointments.length}+</div><div className="kpi-label">Appointments</div></div>
                </div>
              </div>

              <div className="banner-right">
                <FeaturedHospitalPanel hospitals={hospitals} />
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="home-body">
        {user?.role === 'Patient' ? (
          <>
            <section className="patient-hero">
              <div className="patient-hero-image" style={{backgroundImage: `url('https://images.unsplash.com/photo-1576765607921-1a6b9b0d4f5a?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8d6f1e2b4f4d6c2a7e1bb3e7c6e9f2a1')`}}>
                <div className="overlay">
                  <h1>City Care Hospital</h1>
                  <p>Compassionate care • Advanced treatments • 24/7 Service</p>
                </div>
              </div>
            </section>

            <section className="section">
              <h2>Hospitals</h2>
              <HospitalCards hospitals={hospitals} />
            </section>

            <section className="section">
              <h2>Gallery</h2>
              <PatientCarousel />
            </section>

            <section className="section">
              <h2>Doctors By Department</h2>
              <div className="departments-grid">
                {Object.keys(departments).map((dept) => (
                  <div key={dept} className="dept-card">
                    <h4>{dept} <span className="dept-count">({departments[dept].length})</span></h4>
                    <div className="doctors-row">
                      {departments[dept].map((d) => (
                        <div key={d.id} className="doctor-card-small">
                          <div className="doctor-avatar">👩‍⚕️</div>
                          <div className="doctor-info">
                            <div className="doc-name">{d.name}</div>
                            <div className="doc-spec">{d.qualification} • {d.experience} yrs</div>
                            <div className="doc-rating">{renderStars(d.rating)} <span className="rating-num">{d.rating}</span></div>
                          </div>
                          <div className="doc-actions">
                            <Link to="/appointments" className="btn-sm">Book</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
        <section className="section">
          <h2>Departments</h2>
          <div className="departments-grid">
            {Object.keys(departments).map((dept) => (
              <div key={dept} className="dept-card">
                <h4>{dept}</h4>
                <div className="dept-meta">{departments[dept].length} doctors</div>
                <ul className="dept-doctors">
                  {departments[dept].slice(0,4).map(d => (
                    <li key={d.id} className="dept-doctor-row">
                      <div className="doc-name">{d.name}</div>
                      <div className="doc-meta">{d.qualification} • {d.experience} yrs</div>
                    </li>
                  ))}
                </ul>
                <Link to="/doctors" className="quick-link">View all</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Featured Hospitals</h2>
          <HospitalCards hospitals={[
            { id: 'h1', name: 'City Care Hospital', location: 'Main St, Health District', rating: 4.6, beds: 180, tags: ['24x7','Emergency','Diagnostics'] },
            { id: 'h2', name: 'Green Valley Clinic', location: 'Oak Avenue', rating: 4.3, beds: 60, tags: ['Outpatient','Lab'] },
            { id: 'h3', name: 'Lakeside Medical Centre', location: 'Lakeside Blvd', rating: 4.8, beds: 220, tags: ['Surgery','ICU','Maternity'] }
          ]} />
        </section>

        <section className="section">
          <h2>Insights & Trends</h2>
          <div className="insights-grid">
            <div className="insight-large">
              <h4>Appointments Trend</h4>
              <div style={{ height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="insight-small">
              <h4>Top Doctors</h4>
              <ul>
                {doctors.sort((a,b) => b.rating - a.rating).slice(0,5).map(d => (
                  <li key={d.id}>{d.name} — ⭐{d.rating}</li>
                ))}
              </ul>
            </div>

            <div className="insight-small">
              <h4>Upcoming Appointments</h4>
              <ul>
                {appointments.slice(0,6).map(a => (
                  <li key={a.id}>{a.date} {a.time} — {a.patient} with {a.doctor}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
          </>
        )}
      </div>
    </div>
  );
}

// Simple carousel component for patient gallery
function PatientCarousel() {
  const images = [
    'https://images.unsplash.com/photo-1582719478250-1b8d9a6f0d8a?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e1a2b3c4d5f6a7b8c9d0e1f2a3b4c5d',
    'https://images.unsplash.com/photo-1580281657521-6f3c7b8f3c8b?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    'https://images.unsplash.com/photo-1576765607921-1a6b9b0d4f5a?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=8d6f1e2b4f4d6c2a7e1bb3e7c6e9f2a1'
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="patient-carousel">
      <div className="carousel-image" style={{backgroundImage: `url(${images[index]})`}} />
      <div className="carousel-controls">
        <button onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}>&larr;</button>
        <div className="dots">{images.map((_, i) => <span key={i} className={i===index? 'dot active':'dot'} />)}</div>
        <button onClick={() => setIndex((i) => (i + 1) % images.length)}>&rarr;</button>
      </div>
    </div>
  );
}

function renderStars(rating) {
  const full = Math.round(rating || 0);
  return Array.from({length: 5}).map((_, i) => i < full ? '★' : '☆').join('');
}

function SearchBox({ doctors }) {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const specialties = Array.from(new Set(doctors.map(d => d.specialty))).slice(0, 8);

  const results = doctors.filter(d => {
    const q = query.trim().toLowerCase();
    if (specialty && d.specialty !== specialty) return false;
    if (!q) return true;
    return d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q);
  }).slice(0,6);

  return (
    <div className="search-box-hero" style={{marginTop:16}}>
      <div style={{display:'flex',gap:8}}>
        <input className="search" placeholder="Search doctors, specialties, or hospitals" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="filter-select" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">All Specialities</option>
          {specialties.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn-ghost">Search</button>
      </div>

      {query || specialty ? (
        <div className="search-results" style={{marginTop:12,background:'#fff',padding:12,borderRadius:8,boxShadow:'0 6px 18px rgba(15,23,42,0.04)'}}>
          {results.length ? results.map(r => (
            <div key={r.id} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid #f3f4f6'}}>
              <div style={{fontSize:28}}>👨‍⚕️</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{r.name}</div>
                <div style={{fontSize:12,color:'#6b7280'}}>{r.specialty} • {r.experience} yrs</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{color:'#f59e0b'}}>{renderStars(r.rating)} <span style={{color:'#6b7280',marginLeft:6}}>{r.rating}</span></div>
                <Link to="/appointments" className="btn-sm" style={{marginTop:6,display:'inline-block'}}>Book</Link>
              </div>
            </div>
          )) : <div style={{color:'#6b7280'}}>No matches</div>}
        </div>
      ) : null}
    </div>
  );
}

function FeaturedDoctors({ doctors }) {
  const top = doctors.slice().sort((a,b) => b.rating - a.rating).slice(0,4);
  return (
    <div style={{display:'grid',gap:8}}>
      {top.map(d => (
        <div key={d.id} style={{display:'flex',alignItems:'center',gap:12,padding:8,borderRadius:8,border:'1px solid #f3f4f6',background:'#fff'}}>
          <div style={{fontSize:36}}>👩‍⚕️</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{d.name}</div>
            <div style={{fontSize:12,color:'#6b7280'}}>{d.specialty} • {d.experience} yrs</div>
            <div style={{marginTop:6,color:'#f59e0b'}}>{renderStars(d.rating)} <span style={{color:'#6b7280',marginLeft:8}}>{d.rating}</span></div>
          </div>
          <div>
            <Link to="/appointments" className="btn-sm">Book</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function HospitalCards({ hospitals = [] }) {
  const [saved, setSaved] = useState({});
  const [booked, setBooked] = useState({});

  function toggleSave(id) {
    setSaved(s => ({ ...s, [id]: !s[id] }));
  }

  function bookNow(id) {
    setBooked(b => ({ ...b, [id]: true }));
    setTimeout(() => setBooked(b => ({ ...b, [id]: false })), 2500);
  }

  return (
    <div className="hospital-cards">
      {hospitals.map(h => (
        <div key={h.id} className={`hospital-card ${saved[h.id] ? 'saved' : ''}`}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',gap:12}}>
            <div>
              <h4>{h.name}</h4>
              <div className="hospital-meta">{h.location} • {h.beds} beds</div>
              <div className="hospital-tags" style={{marginTop:8}}>{h.tags.map(t => <span key={t} className="trust-badge">{t}</span>)}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontWeight:700,color:'#111827'}}>{h.rating} <span style={{color:'#f59e0b'}}>{renderStars(h.rating)}</span></div>
              <div style={{marginTop:8}}>
                <button className="btn-sm" onClick={() => bookNow(h.id)}>{booked[h.id] ? 'Booked' : 'Book'}</button>
              </div>
              <div style={{marginTop:8}}>
                <button className="btn-ghost" onClick={() => toggleSave(h.id)}>{saved[h.id] ? 'Saved' : 'Save'}</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Testimonials({ items = [] }) {
  return (
    <div className="testimonials">
      {items.map((t, i) => (
        <div className="testimonial-card" key={i}>
          <div className="testimonial-text">"{t.text}"</div>
          <div className="testimonial-author">— {t.author}, {t.role}</div>
        </div>
      ))}
    </div>
  );
}

// Featured hospital rotating panel used in hero
function FeaturedHospitalPanel({ hospitals = [] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % hospitals.length), 4200);
    return () => clearInterval(t);
  }, [hospitals.length]);

  if (!hospitals.length) return null;
  const h = hospitals[idx];
  return (
    <div className="featured-hospital-card">
      <div className="fh-top">
        <div className="fh-image">🏥</div>
        <div className="fh-info">
          <div className="fh-name">{h.name}</div>
          <div className="fh-meta">{h.location} • {h.beds} beds</div>
          <div className="fh-rating">{renderStars(h.rating)} <span className="rating-num">{h.rating}</span></div>
        </div>
      </div>
      <div className="fh-tags">{h.tags.map(t=> <span key={t} className="trust-badge">{t}</span>)}</div>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button className="btn-sm">Book Appointment</button>
        <button className="btn-ghost">View Profile</button>
      </div>
    </div>
  );
}
