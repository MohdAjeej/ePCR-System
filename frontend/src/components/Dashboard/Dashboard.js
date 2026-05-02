import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientRecordAPI } from '../../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalRecords: 0,
    draftRecords: 0,
    submittedRecords: 0,
    underReview: 0,
  });
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await patientRecordAPI.getAll();
      const records = response.data;

      setStats({
        totalRecords: records.length,
        draftRecords: records.filter(r => r.status === 'DRAFT').length,
        submittedRecords: records.filter(r => r.status === 'SUBMITTED').length,
        underReview: records.filter(r => r.status === 'UNDER_REVIEW').length,
      });

      setRecentRecords(records.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalRecords}</div>
          <div className="stat-label">Total Records</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.draftRecords}</div>
          <div className="stat-label">Draft Records</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.submittedRecords}</div>
          <div className="stat-label">Submitted</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.underReview}</div>
          <div className="stat-label">Under Review</div>
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <h2>Recent Patient Records</h2>
          <Link to="/patient-records/new" className="btn btn-primary">
            New Record
          </Link>
        </div>

        {recentRecords.length === 0 ? (
          <p>No patient records found.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Transport Date</th>
                <th>Transport Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRecords.map((record) => (
                <tr key={record.id}>
                  <td>{`${record.firstName} ${record.lastName}`}</td>
                  <td>{new Date(record.transportDateTime).toLocaleDateString()}</td>
                  <td>{record.transportType}</td>
                  <td>
                    <span className={`badge badge-${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/patient-records/${record.id}`} className="btn btn-secondary btn-sm">
                      View
                    </Link>
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

export default Dashboard;
