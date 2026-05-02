import React, { useState, useEffect } from 'react';
import { patientRecordAPI } from '../../services/api';
import './QualityAssurance.css';

function QualityAssurance() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showQAModal, setShowQAModal] = useState(false);
  const [qaData, setQAData] = useState({
    reviewStatus: 'IN_PROGRESS',
    findings: '',
    overallRating: '',
    requiresFollowUp: false,
    followUpNotes: '',
  });
  const [filters, setFilters] = useState({
    status: 'ALL',
    reviewStatus: 'ALL',
    dateFrom: '',
    dateTo: '',
  });

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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...records];

      if (filters.status !== 'ALL') {
        filtered = filtered.filter(r => r.status === filters.status);
      }

      if (filters.reviewStatus !== 'ALL') {
        filtered = filtered.filter(r => 
          r.qualityAssurance?.reviewStatus === filters.reviewStatus
        );
      }

      if (filters.dateFrom) {
        filtered = filtered.filter(r => 
          new Date(r.transportDateTime) >= new Date(filters.dateFrom)
        );
      }

      if (filters.dateTo) {
        filtered = filtered.filter(r => 
          new Date(r.transportDateTime) <= new Date(filters.dateTo)
        );
      }

      setFilteredRecords(filtered);
    };

    applyFilters();
  }, [filters, records]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openQAModal = (record) => {
    setSelectedRecord(record);
    if (record.qualityAssurance) {
      setQAData({
        reviewStatus: record.qualityAssurance.reviewStatus || 'IN_PROGRESS',
        findings: record.qualityAssurance.findings?.join('\n') || '',
        overallRating: record.qualityAssurance.overallRating || '',
        requiresFollowUp: record.qualityAssurance.requiresFollowUp || false,
        followUpNotes: record.qualityAssurance.followUpNotes || '',
      });
    }
    setShowQAModal(true);
  };

  const handleQASubmit = async (e) => {
    e.preventDefault();
    try {
      const qaPayload = {
        ...qaData,
        findings: qaData.findings.split('\n').filter(f => f.trim()),
      };
      await patientRecordAPI.updateQA(selectedRecord.id, qaPayload);
      setShowQAModal(false);
      fetchRecords();
    } catch (error) {
      console.error('Error updating QA:', error);
    }
  };

  const stats = {
    total: records.length,
    pending: records.filter(r => !r.qualityAssurance || r.qualityAssurance.reviewStatus === 'PENDING').length,
    inProgress: records.filter(r => r.qualityAssurance?.reviewStatus === 'IN_PROGRESS').length,
    completed: records.filter(r => r.qualityAssurance?.reviewStatus === 'COMPLETED').length,
  };

  if (loading) {
    return <div className="loading">Loading quality assurance data...</div>;
  }

  return (
    <div className="quality-assurance">
      <div className="page-header">
        <h1>Quality Assurance & Quality Improvement</h1>
      </div>

      <div className="qa-stats">
        <div className="qa-stat-card">
          <div className="qa-stat-value">{stats.total}</div>
          <div className="qa-stat-label">Total Records</div>
        </div>
        <div className="qa-stat-card">
          <div className="qa-stat-value">{stats.pending}</div>
          <div className="qa-stat-label">Pending Review</div>
        </div>
        <div className="qa-stat-card">
          <div className="qa-stat-value">{stats.inProgress}</div>
          <div className="qa-stat-label">In Progress</div>
        </div>
        <div className="qa-stat-card">
          <div className="qa-stat-value">{stats.completed}</div>
          <div className="qa-stat-label">Completed</div>
        </div>
      </div>

      <div className="qa-filters">
        <h3>Filters</h3>
        <div className="filter-grid">
          <div className="form-group">
            <label>Record Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="FLAGGED">Flagged</option>
            </select>
          </div>
          <div className="form-group">
            <label>QA Review Status</label>
            <select name="reviewStatus" value={filters.reviewStatus} onChange={handleFilterChange}>
              <option value="ALL">All Review Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date From</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label>Date To</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Patient Records for Review</h2>
        {filteredRecords.length === 0 ? (
          <p>No records found matching the selected filters.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Transport Date</th>
                <th>Organization</th>
                <th>Record Status</th>
                <th>QA Status</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{`${record.firstName} ${record.lastName}`}</td>
                  <td>{new Date(record.transportDateTime).toLocaleDateString()}</td>
                  <td>{record.organizationName}</td>
                  <td>
                    <span className={`badge badge-${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${getQAStatusColor(record.qualityAssurance?.reviewStatus)}`}>
                      {record.qualityAssurance?.reviewStatus || 'PENDING'}
                    </span>
                  </td>
                  <td>{record.qualityAssurance?.overallRating || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => openQAModal(record)} 
                      className="btn btn-primary btn-sm"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showQAModal && (
        <div className="qa-modal">
          <div className="qa-modal-content">
            <div className="qa-modal-header">
              <h2>Quality Assurance Review</h2>
              <button className="close-button" onClick={() => setShowQAModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleQASubmit}>
              <div className="form-group">
                <label>Review Status *</label>
                <select
                  value={qaData.reviewStatus}
                  onChange={(e) => setQAData({...qaData, reviewStatus: e.target.value})}
                  required
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Findings (one per line)</label>
                <textarea
                  value={qaData.findings}
                  onChange={(e) => setQAData({...qaData, findings: e.target.value})}
                  rows="5"
                  placeholder="Enter findings, one per line"
                />
              </div>
              <div className="form-group">
                <label>Overall Rating</label>
                <select
                  value={qaData.overallRating}
                  onChange={(e) => setQAData({...qaData, overallRating: e.target.value})}
                >
                  <option value="">Select Rating</option>
                  <option value="EXCELLENT">Excellent</option>
                  <option value="GOOD">Good</option>
                  <option value="SATISFACTORY">Satisfactory</option>
                  <option value="NEEDS_IMPROVEMENT">Needs Improvement</option>
                  <option value="UNSATISFACTORY">Unsatisfactory</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={qaData.requiresFollowUp}
                    onChange={(e) => setQAData({...qaData, requiresFollowUp: e.target.checked})}
                  />
                  {' '}Requires Follow-up
                </label>
              </div>
              {qaData.requiresFollowUp && (
                <div className="form-group">
                  <label>Follow-up Notes</label>
                  <textarea
                    value={qaData.followUpNotes}
                    onChange={(e) => setQAData({...qaData, followUpNotes: e.target.value})}
                    rows="3"
                  />
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save QA Review
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowQAModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case 'DRAFT': return 'warning';
    case 'SUBMITTED': return 'info';
    case 'UNDER_REVIEW': return 'warning';
    case 'APPROVED': return 'success';
    case 'FLAGGED': return 'danger';
    default: return 'info';
  }
}

function getQAStatusColor(status) {
  switch (status) {
    case 'PENDING': return 'warning';
    case 'IN_PROGRESS': return 'info';
    case 'COMPLETED': return 'success';
    default: return 'warning';
  }
}

export default QualityAssurance;
