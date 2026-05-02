import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LoginNew from './components/Auth/LoginNew';
import RegisterNew from './components/Auth/RegisterNew';
import TestConnection from './components/TestConnection';
import Dashboard from './components/Dashboard/Dashboard';
import PatientRecordList from './components/PatientRecords/PatientRecordList';
import PatientRecordForm from './components/PatientRecords/PatientRecordForm';
import PatientRecordDetail from './components/PatientRecords/PatientRecordDetail';
import WorkflowList from './components/Workflows/WorkflowList';
import WorkflowForm from './components/Workflows/WorkflowForm';
import QualityAssurance from './components/QualityAssurance/QualityAssurance';
import Navbar from './components/Layout/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login-new" element={<LoginNew />} />
            <Route path="/register-new" element={<RegisterNew />} />
            <Route path="/test-connection" element={<TestConnection />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient-records"
              element={
                <PrivateRoute>
                  <PatientRecordList />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient-records/new"
              element={
                <PrivateRoute>
                  <PatientRecordForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient-records/:id"
              element={
                <PrivateRoute>
                  <PatientRecordDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/patient-records/:id/edit"
              element={
                <PrivateRoute>
                  <PatientRecordForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/workflows"
              element={
                <PrivateRoute>
                  <WorkflowList />
                </PrivateRoute>
              }
            />
            <Route
              path="/workflows/new"
              element={
                <PrivateRoute>
                  <WorkflowForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/quality-assurance"
              element={
                <PrivateRoute>
                  <QualityAssurance />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
