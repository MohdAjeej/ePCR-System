import React, { useState } from 'react';
import axios from 'axios';

function TestConnection() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult('Testing connection...');
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
      setResult(`Testing: ${apiUrl}/auth/login\n\n`);
      
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username: 'admin',
        password: 'password123'
      });
      
      setResult(prev => prev + `✅ SUCCESS!\n\nResponse: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      let errorMsg = '❌ ERROR:\n\n';
      
      if (error.response) {
        errorMsg += `Status: ${error.response.status}\n`;
        errorMsg += `Data: ${JSON.stringify(error.response.data, null, 2)}`;
      } else if (error.request) {
        errorMsg += 'No response from server!\n';
        errorMsg += 'Backend might not be running or CORS issue.\n\n';
        errorMsg += `Request URL: ${error.config?.url}\n`;
        errorMsg += `Request Method: ${error.config?.method}`;
      } else {
        errorMsg += `Error: ${error.message}`;
      }
      
      setResult(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Backend Connection Test</h1>
      <p>Click the button below to test the connection to the backend server.</p>
      
      <button 
        onClick={testBackend} 
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      
      {result && (
        <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}>
          {result}
        </pre>
      )}
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>Configuration:</h3>
        <p><strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}</p>
        <p><strong>Environment:</strong> {process.env.REACT_APP_ENV || 'development'}</p>
      </div>
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e7f3ff', borderRadius: '8px' }}>
        <h3>Troubleshooting:</h3>
        <ul>
          <li>Make sure MongoDB is running: <code>./start-mongodb.bat</code></li>
          <li>Make sure backend is running: <code>./start-backend.bat</code></li>
          <li>Backend should be on: <code>http://localhost:8080</code></li>
          <li>Check backend terminal for errors</li>
          <li>Check browser console (F12) for CORS errors</li>
        </ul>
      </div>
    </div>
  );
}

export default TestConnection;
