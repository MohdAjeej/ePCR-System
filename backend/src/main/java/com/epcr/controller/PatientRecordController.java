package com.epcr.controller;

import com.epcr.model.PatientRecord;
import com.epcr.service.PatientRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patient-records")
@CrossOrigin(origins = "*")
public class PatientRecordController {
    
    @Autowired
    private PatientRecordService patientRecordService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'CLINICIAN', 'PARAMEDIC', 'SYSTEM_ADMIN')")
    public ResponseEntity<?> createPatientRecord(
            @RequestBody PatientRecord patientRecord,
            Authentication authentication) {
        try {
            PatientRecord created = patientRecordService.createPatientRecord(patientRecord, authentication);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create patient record");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'CLINICIAN', 'PARAMEDIC', 'SYSTEM_ADMIN')")
    public ResponseEntity<?> updatePatientRecord(
            @PathVariable String id,
            @RequestBody PatientRecord patientRecord,
            Authentication authentication) {
        try {
            PatientRecord updated = patientRecordService.updatePatientRecord(id, patientRecord, authentication);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update patient record");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'CLINICIAN', 'PARAMEDIC', 'QA_MANAGER', 'SYSTEM_ADMIN', 'SYSTEM_QA')")
    public ResponseEntity<?> getAllRecords(Authentication authentication) {
        try {
            List<PatientRecord> records = patientRecordService.getAllRecords(authentication);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch patient records");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'CLINICIAN', 'PARAMEDIC', 'QA_MANAGER', 'SYSTEM_ADMIN', 'SYSTEM_QA')")
    public ResponseEntity<?> getRecordById(
            @PathVariable String id,
            Authentication authentication) {
        try {
            return patientRecordService.getRecordById(id, authentication)
                    .map(record -> ResponseEntity.ok((Object) record))
                    .orElseGet(() -> {
                        Map<String, String> error = new HashMap<>();
                        error.put("error", "Patient record not found");
                        error.put("message", "No record found with ID: " + id);
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                    });
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch patient record");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @GetMapping("/organization/{organizationId}")
    @PreAuthorize("hasAnyRole('QA_MANAGER', 'SYSTEM_ADMIN', 'SYSTEM_QA')")
    public ResponseEntity<?> getRecordsByOrganization(
            @PathVariable String organizationId,
            Authentication authentication) {
        try {
            List<PatientRecord> records = patientRecordService.getRecordsByOrganization(organizationId, authentication);
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to fetch organization records");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    @PutMapping("/{id}/quality-assurance")
    @PreAuthorize("hasAnyRole('QA_MANAGER', 'SYSTEM_ADMIN', 'SYSTEM_QA')")
    public ResponseEntity<?> updateQualityAssurance(
            @PathVariable String id,
            @RequestBody PatientRecord.QualityAssurance qa,
            Authentication authentication) {
        try {
            PatientRecord updated = patientRecordService.updateQualityAssurance(id, qa, authentication);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update quality assurance");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}
