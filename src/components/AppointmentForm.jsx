import React, { useState } from 'react';
import doctors from '../data/doctors';
import patients from '../data/patients';

export default function AppointmentForm({ onCreate }) {
  const patientNames = patients.map(p => p.name);
  const doctorNames = doctors.map(d => d.name);

  const [patient, setPatient] = useState(patientNames[0] || '');
  const [doctor, setDoctor] = useState(doctorNames[0] || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [type, setType] = useState('Consultation');
  const [duration, setDuration] = useState('30 mins');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function reset() {
    setDate(''); setTime('09:00'); setNotes(''); setError('');
  }

  function submit(e) {
    e.preventDefault();
    setError('');
    if (!patient || !doctor || !date || !time) {
      setError('Please fill patient, doctor, date and time');
      return;
    }

    const payload = { patient, doctor, date, time, type, duration, notes };
    onCreate(payload);
    setSuccess('Appointment scheduled');
    reset();
    setTimeout(() => setSuccess(''), 2500);
  }

  return (
    <form className="form" onSubmit={submit} style={{gap:12,alignItems:'flex-start'}}>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',width:'100%'}}>
        <div style={{flex:'1 1 220px'}}>
          <label>Patient</label>
          <input list="patients" value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Type or select patient" />
          <datalist id="patients">{patientNames.map(n => <option key={n} value={n} />)}</datalist>
        </div>

        <div style={{flex:'1 1 220px'}}>
          <label>Doctor</label>
          <input list="doctors" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Type or select doctor" />
          <datalist id="doctors">{doctorNames.map(n => <option key={n} value={n} />)}</datalist>
        </div>

        <div style={{flex:'0 0 160px'}}>
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div style={{flex:'0 0 120px'}}>
          <label>Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>

      <div style={{display:'flex',gap:12,marginTop:6,width:'100%'}}>
        <div style={{flex:1}}>
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Consultation</option>
            <option>Follow-up</option>
            <option>Surgery</option>
            <option>Telemedicine</option>
          </select>
        </div>

        <div style={{flex:1}}>
          <label>Duration</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option>15 mins</option>
            <option>30 mins</option>
            <option>45 mins</option>
            <option>60 mins</option>
          </select>
        </div>
      </div>

      <div style={{width:'100%'}}>
        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes" rows={2} />
      </div>

      {error && <div style={{color:'#ef4444',fontSize:13}}>{error}</div>}
      {success && <div className="toast success">{success}</div>}

      <div style={{display:'flex',gap:8}}>
        <button type="submit" className="btn-sm">Schedule</button>
        <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
      </div>
    </form>
  );
}
