import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workflowAPI } from '../../services/api';
import './Workflows.css';

function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const response = await workflowAPI.getAll();
      setWorkflows(response.data);
    } catch (error) {
      console.error('Error fetching workflows:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading workflows...</div>;
  }

  return (
    <div className="workflows">
      <div className="page-header">
        <h1>Workflow Configurations</h1>
        <Link to="/workflows/new" className="btn btn-primary">
          Create New Workflow
        </Link>
      </div>

      <div className="container">
        {workflows.length === 0 ? (
          <p>No workflows found. Create your first workflow to get started.</p>
        ) : (
          <div className="workflow-grid">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="workflow-card">
                <div className="workflow-header">
                  <h3>{workflow.name}</h3>
                  <span className={`badge ${workflow.active ? 'badge-success' : 'badge-danger'}`}>
                    {workflow.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="workflow-description">{workflow.description}</p>
                <div className="workflow-meta">
                  <div className="meta-item">
                    <strong>Type:</strong> {workflow.type}
                  </div>
                  <div className="meta-item">
                    <strong>Version:</strong> {workflow.version}
                  </div>
                  <div className="meta-item">
                    <strong>Steps:</strong> {workflow.steps?.length || 0}
                  </div>
                  <div className="meta-item">
                    <strong>Deployed to:</strong> {workflow.deployedToOrganizations?.length || 0} organizations
                  </div>
                </div>
                <div className="workflow-actions">
                  <Link to={`/workflows/${workflow.id}`} className="btn btn-secondary btn-sm">
                    View Details
                  </Link>
                  <Link to={`/workflows/${workflow.id}/edit`} className="btn btn-primary btn-sm">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkflowList;
