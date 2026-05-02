import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientRecordAPI } from '../../services/api';
import './PatientRecords.css';

function PatientRecordList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await patientRecordAPI.getAll();
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = filter === 'ALL' 
    ? records 
    : records.filter(r => r.status === filter);

  if (loading) {
    return <div className="loading">Loading patient records...</div>;
  }

  return (
    <div className="patient-records">
      <div className="page-header">
        <h1>Patient Records</h1>
        <Link to="/patient-records/new" className="btn btn-primary">
          New Patient Record
        </Link>
      </div>

      <div className="container">
        <div className="filter-bar">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="ALL">All Records</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="APPROVED">Approved</option>
            <option value="FLAGGED">Flagged</option>
          </select>
        </div>

        {filteredRecords.length === 0 ? (
          <p>No patient records found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date of Birth</th>
                <th>Transport Date</th>
                <th>Transport Type</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{`${record.firstName} ${record.lastName}`}</td>
                  <td>{record.dateOfBirth}</td>
                  <td>{new Date(record.transportDateTime).toLocaleString()}</td>
                  <td>{record.transportType}</td>
                  <td>{record.organizationName}</td>
                  <td>
                    <span className={`badge badge-${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/patient-records/${record.id}`} className="btn btn-secondary btn-sm">
                      View
                    </Link>
                    {record.status === 'DRAFT' && (
                      <Link 
                        to={`/patient-records/${record.id}/edit`} 
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: '8px' }}
                      >
                        Edit
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'DRAFT':
      return 'warning';
    case 'SUBMITTED':
      return 'info';
    case 'UNDER_REVIEW':
      return 'warning';
    case 'APPROVED':
      return 'success';
    case 'FLAGGED':
      return 'danger';
    default:
      return 'info';
  }
}

export default PatientRecordList;
