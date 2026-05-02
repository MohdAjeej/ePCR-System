import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { patientRecordAPI } from '../../services/api';
import './PatientRecords.css';

function PatientRecordForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    transportType: 'PRIMARY_CARE',
    transportDateTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    chiefComplaint: '',
    symptoms: '',
    diagnosis: '',
    treatmentPlan: '',
    status: 'DRAFT'
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await patientRecordAPI.getById(id);
        const record = response.data;
        
        // Format the date for datetime-local input
        let formattedDateTime = '';
        if (record.transportDateTime) {
          const date = new Date(record.transportDateTime);
          formattedDateTime = date.toISOString().slice(0, 16);
        }
        
        setFormData({
          ...record,
          symptoms: record.symptoms?.join(', ') || '',
          transportDateTime: formattedDateTime,
        });
      } catch (error) {
        console.error('Error loading patient record:', error);
        setError('Error loading patient record. Please try again.');
      }
    };

    if (id) {
      fetchRecord();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName) {
        setError('First name and last name are required');
        setLoading(false);
        return;
      }

      if (!formData.dateOfBirth) {
        setError('Date of birth is required');
        setLoading(false);
        return;
      }

      if (!formData.gender) {
        setError('Gender is required');
        setLoading(false);
        return;
      }

      if (!formData.transportDateTime) {
        setError('Transport date and time is required');
        setLoading(false);
        return;
      }

      if (!formData.pickupLocation || !formData.dropoffLocation) {
        setError('Pickup and dropoff locations are required');
        setLoading(false);
        return;
      }

      if (!formData.chiefComplaint) {
        setError('Chief complaint is required');
        setLoading(false);
        return;
      }

      // Prepare data for submission
      const dataToSubmit = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber?.trim() || '',
        address: formData.address?.trim() || '',
        city: formData.city?.trim() || '',
        state: formData.state?.trim() || '',
        zipCode: formData.zipCode?.trim() || '',
        transportType: formData.transportType,
        transportDateTime: formData.transportDateTime,
        pickupLocation: formData.pickupLocation.trim(),
        dropoffLocation: formData.dropoffLocation.trim(),
        chiefComplaint: formData.chiefComplaint.trim(),
        symptoms: formData.symptoms 
          ? formData.symptoms.split(',').map(s => s.trim()).filter(s => s)
          : [],
        diagnosis: formData.diagnosis?.trim() || '',
        treatmentPlan: formData.treatmentPlan?.trim() || '',
        status: formData.status || 'DRAFT'
      };

      console.log('Submitting data:', dataToSubmit);

      if (id) {
        await patientRecordAPI.update(id, dataToSubmit);
      } else {
        await patientRecordAPI.create(dataToSubmit);
      }
      
      navigate('/patient-records');
    } catch (error) {
      console.error('Error saving patient record:', error);
      
      // More detailed error message
      if (error.response) {
        // Server responded with error
        const errorMsg = error.response.data?.message || error.response.data?.error || 'Server error occurred';
        setError(`Error saving patient record: ${errorMsg}`);
      } else if (error.request) {
        // Request made but no response
        setError('No response from server. Please check if the backend is running.');
      } else {
        // Something else happened
        setError('Error saving patient record. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="record-detail">
      <div className="page-header">
        <h1>{id ? 'Edit Patient Record' : 'New Patient Record'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="detail-section">
          <h2>Patient Demographics</h2>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select 
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                required
                disabled={loading}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Transport Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Transport Type *</label>
              <select 
                name="transportType" 
                value={formData.transportType} 
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="PRIMARY_CARE">Primary Care</option>
                <option value="CRITICAL_CARE">Critical Care</option>
                <option value="EMERGENCY">Emergency</option>
                <option value="NON_EMERGENCY">Non-Emergency</option>
              </select>
            </div>
            <div className="form-group">
              <label>Transport Date & Time *</label>
              <input
                type="datetime-local"
                name="transportDateTime"
                value={formData.transportDateTime}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pickup Location *</label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Dropoff Location *</label>
              <input
                type="text"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>Clinical Information</h2>
          <div className="form-group">
            <label>Chief Complaint *</label>
            <textarea
              name="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={handleChange}
              required
              disabled={loading}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Symptoms (comma-separated)</label>
            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="e.g., fever, cough, headache"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Diagnosis</label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              disabled={loading}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Treatment Plan</label>
            <textarea
              name="treatmentPlan"
              value={formData.treatmentPlan}
              onChange={handleChange}
              disabled={loading}
              rows="3"
            />
          </div>
        </div>

        {error && (
          <div className="error-message" style={{
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            color: '#c33',
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Record'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/patient-records')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientRecordForm;
