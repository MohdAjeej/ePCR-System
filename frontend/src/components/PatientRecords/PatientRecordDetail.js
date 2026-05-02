import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { patientRecordAPI } from '../../services/api';
import './PatientRecords.css';

function PatientRecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await patientRecordAPI.getById(id);
        setRecord(response.data);
      } catch (error) {
        console.error('Error fetching record:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading patient record...</div>;
  }

  if (!record) {
    return <div className="error-message">Patient record not found</div>;
  }

  return (
    <div className="record-detail">
      <div className="page-header">
        <h1>Patient Record Details</h1>
        <div>
          {record.status === 'DRAFT' && (
            <Link to={`/patient-records/${id}/edit`} className="btn btn-primary">
              Edit Record
            </Link>
          )}
          <button onClick={() => navigate('/patient-records')} className="btn btn-secondary" style={{ marginLeft: '8px' }}>
            Back to List
          </button>
        </div>
      </div>

      <div className="detail-section">
        <h2>Patient Demographics</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Name</div>
            <div className="detail-value">{`${record.firstName} ${record.lastName}`}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Date of Birth</div>
            <div className="detail-value">{record.dateOfBirth}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Gender</div>
            <div className="detail-value">{record.gender}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Phone Number</div>
            <div className="detail-value">{record.phoneNumber || 'N/A'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Address</div>
            <div className="detail-value">
              {record.address ? `${record.address}, ${record.city}, ${record.state} ${record.zipCode}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2>Transport Information</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Transport Type</div>
            <div className="detail-value">{record.transportType}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Transport Date & Time</div>
            <div className="detail-value">{new Date(record.transportDateTime).toLocaleString()}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Organization</div>
            <div className="detail-value">{record.organizationName}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Status</div>
            <div className="detail-value">
              <span className={`badge badge-${getStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Pickup Location</div>
            <div className="detail-value">{record.pickupLocation}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Dropoff Location</div>
            <div className="detail-value">{record.dropoffLocation}</div>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2>Clinical Information</h2>
        <div className="detail-item">
          <div className="detail-label">Chief Complaint</div>
          <div className="detail-value">{record.chiefComplaint}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Symptoms</div>
          <div className="detail-value">{record.symptoms?.join(', ') || 'N/A'}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Diagnosis</div>
          <div className="detail-value">{record.diagnosis || 'N/A'}</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Treatment Plan</div>
          <div className="detail-value">{record.treatmentPlan || 'N/A'}</div>
        </div>
      </div>

      {record.vitalSigns && record.vitalSigns.length > 0 && (
        <div className="detail-section">
          <h2>Vital Signs</h2>
          <ul className="vital-signs-list">
            {record.vitalSigns.map((vital, index) => (
              <li key={index}>
                <strong>{new Date(vital.timestamp).toLocaleString()}</strong> - 
                HR: {vital.heartRate}, BP: {vital.bloodPressure}, 
                RR: {vital.respiratoryRate}, Temp: {vital.temperature}°F, 
                SpO2: {vital.oxygenSaturation}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {record.medications && record.medications.length > 0 && (
        <div className="detail-section">
          <h2>Medications</h2>
          <ul className="medication-list">
            {record.medications.map((med, index) => (
              <li key={index}>
                <strong>{med.name}</strong> - {med.dosage} ({med.route}) - 
                Administered: {new Date(med.administeredAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
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

export default PatientRecordDetail;
