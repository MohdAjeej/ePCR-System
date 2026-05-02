import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { workflowAPI } from '../../services/api';
import './Workflows.css';

function WorkflowForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'EPCR',
    version: '1.0',
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await workflowAPI.create(formData);
      navigate('/workflows');
    } catch (error) {
      setError('Error creating workflow configuration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workflow-form">
      <div className="page-header">
        <h1>Create New Workflow Configuration</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Workflow Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Standard ePCR Workflow"
            />
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the purpose and scope of this workflow"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Workflow Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="EPCR">Electronic Patient Care Record</option>
                <option value="INCIDENT_REPORT">Incident Report</option>
                <option value="SAFETY_REPORT">Safety Report</option>
                <option value="CLINICAL_SERVICES">Clinical Services</option>
                <option value="MEDICATION">Medication</option>
                <option value="COLLISION_REPORT">Collision Report</option>
              </select>
            </div>
            <div className="form-group">
              <label>Version *</label>
              <input
                type="text"
                name="version"
                value={formData.version}
                onChange={handleChange}
                required
                placeholder="e.g., 1.0"
              />
            </div>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
              {' '}Active
            </label>
          </div>
        </div>

        <div className="form-section">
          <h2>Workflow Configuration</h2>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            After creating the workflow, you can configure steps, form fields, validation rules, 
            and conditional logic in the workflow editor.
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Workflow'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/workflows')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkflowForm;
