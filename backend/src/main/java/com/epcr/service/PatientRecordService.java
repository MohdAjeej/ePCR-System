package com.epcr.service;

import com.epcr.model.PatientRecord;
import com.epcr.repository.PatientRecordRepository;
import com.epcr.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PatientRecordService {
    
    @Autowired
    private PatientRecordRepository patientRecordRepository;
    
    public PatientRecord createPatientRecord(PatientRecord patientRecord, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        patientRecord.setCreatedBy(userPrincipal.getId());
        patientRecord.setOrganizationId(userPrincipal.getOrganizationId());
        patientRecord.setStatus("DRAFT");
        
        // Add audit entry
        PatientRecord.AuditEntry auditEntry = new PatientRecord.AuditEntry();
        auditEntry.setTimestamp(LocalDateTime.now());
        auditEntry.setUserId(userPrincipal.getId());
        auditEntry.setUserName(userPrincipal.getUsername());
        auditEntry.setAction("CREATED");
        patientRecord.getAuditTrail().add(auditEntry);
        
        return patientRecordRepository.save(patientRecord);
    }
    
    public PatientRecord updatePatientRecord(String id, PatientRecord updatedRecord, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Optional<PatientRecord> existingRecord = patientRecordRepository.findById(id);
        if (existingRecord.isEmpty()) {
            throw new RuntimeException("Patient record not found");
        }
        
        PatientRecord record = existingRecord.get();
        
        // Check access - users can only update records from their organization
        if (!hasAccessToRecord(record, userPrincipal)) {
            throw new RuntimeException("Access denied");
        }
        
        // Update fields
        record.setLastModifiedBy(userPrincipal.getId());
        
        // Add audit entry
        PatientRecord.AuditEntry auditEntry = new PatientRecord.AuditEntry();
        auditEntry.setTimestamp(LocalDateTime.now());
        auditEntry.setUserId(userPrincipal.getId());
        auditEntry.setUserName(userPrincipal.getUsername());
        auditEntry.setAction("UPDATED");
        record.getAuditTrail().add(auditEntry);
        
        // Copy updated fields
        if (updatedRecord.getChiefComplaint() != null) record.setChiefComplaint(updatedRecord.getChiefComplaint());
        if (updatedRecord.getSymptoms() != null) record.setSymptoms(updatedRecord.getSymptoms());
        if (updatedRecord.getVitalSigns() != null) record.setVitalSigns(updatedRecord.getVitalSigns());
        if (updatedRecord.getMedications() != null) record.setMedications(updatedRecord.getMedications());
        if (updatedRecord.getProcedures() != null) record.setProcedures(updatedRecord.getProcedures());
        if (updatedRecord.getAssessments() != null) record.setAssessments(updatedRecord.getAssessments());
        if (updatedRecord.getDiagnosis() != null) record.setDiagnosis(updatedRecord.getDiagnosis());
        if (updatedRecord.getTreatmentPlan() != null) record.setTreatmentPlan(updatedRecord.getTreatmentPlan());
        if (updatedRecord.getStatus() != null) record.setStatus(updatedRecord.getStatus());
        
        return patientRecordRepository.save(record);
    }
    
    public List<PatientRecord> getRecordsByOrganization(String organizationId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        // Check if user has system-wide access or only organization access
        if (hasSystemWideAccess(userPrincipal)) {
            return patientRecordRepository.findByOrganizationId(organizationId);
        } else if (userPrincipal.getOrganizationId().equals(organizationId)) {
            return patientRecordRepository.findByOrganizationId(organizationId);
        } else {
            throw new RuntimeException("Access denied");
        }
    }
    
    public List<PatientRecord> getAllRecords(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (hasSystemWideAccess(userPrincipal)) {
            return patientRecordRepository.findAll();
        } else {
            return patientRecordRepository.findByOrganizationId(userPrincipal.getOrganizationId());
        }
    }
    
    public Optional<PatientRecord> getRecordById(String id, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<PatientRecord> record = patientRecordRepository.findById(id);
        
        if (record.isPresent() && hasAccessToRecord(record.get(), userPrincipal)) {
            return record;
        }
        
        return Optional.empty();
    }
    
    public PatientRecord updateQualityAssurance(String id, PatientRecord.QualityAssurance qa, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Optional<PatientRecord> existingRecord = patientRecordRepository.findById(id);
        if (existingRecord.isEmpty()) {
            throw new RuntimeException("Patient record not found");
        }
        
        PatientRecord record = existingRecord.get();
        
        // Check QA access
        if (!hasQAAccess(record, userPrincipal)) {
            throw new RuntimeException("Access denied for quality assurance");
        }
        
        qa.setReviewedBy(userPrincipal.getId());
        qa.setReviewedAt(LocalDateTime.now());
        record.setQualityAssurance(qa);
        
        // Add audit entry
        PatientRecord.AuditEntry auditEntry = new PatientRecord.AuditEntry();
        auditEntry.setTimestamp(LocalDateTime.now());
        auditEntry.setUserId(userPrincipal.getId());
        auditEntry.setUserName(userPrincipal.getUsername());
        auditEntry.setAction("QA_REVIEW");
        record.getAuditTrail().add(auditEntry);
        
        return patientRecordRepository.save(record);
    }
    
    private boolean hasAccessToRecord(PatientRecord record, UserPrincipal userPrincipal) {
        return hasSystemWideAccess(userPrincipal) || 
               record.getOrganizationId().equals(userPrincipal.getOrganizationId());
    }
    
    private boolean hasQAAccess(PatientRecord record, UserPrincipal userPrincipal) {
        // System admins and QA managers have access to all records
        // Organization users have access to their own records
        return hasSystemWideAccess(userPrincipal) || 
               userPrincipal.getAuthorities().stream()
                   .anyMatch(auth -> auth.getAuthority().equals("ROLE_QA_MANAGER")) ||
               record.getOrganizationId().equals(userPrincipal.getOrganizationId());
    }
    
    private boolean hasSystemWideAccess(UserPrincipal userPrincipal) {
        return userPrincipal.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_SYSTEM_ADMIN") || 
                                 auth.getAuthority().equals("ROLE_SYSTEM_QA"));
    }
}
