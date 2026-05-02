package com.epcr.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "patient_records")
public class PatientRecord {
    @Id
    private String id;
    
    @Indexed
    private String patientId;
    
    @Indexed
    private String transportId;
    
    // Patient Demographics
    private String firstName;
    private String lastName;
    private String dateOfBirth;
    private String gender;
    private String ssn;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    
    // Transport Information
    @Indexed
    private String organizationId;
    private String organizationName;
    private String transportType; // PRIMARY_CARE, CRITICAL_CARE, EMERGENCY, etc.
    private LocalDateTime transportDateTime;
    private String pickupLocation;
    private String dropoffLocation;
    
    // Clinical Information
    private String chiefComplaint;
    private List<String> symptoms = new ArrayList<>();
    private List<VitalSigns> vitalSigns = new ArrayList<>();
    private List<Medication> medications = new ArrayList<>();
    private List<Procedure> procedures = new ArrayList<>();
    private List<Assessment> assessments = new ArrayList<>();
    private String diagnosis;
    private String treatmentPlan;
    
    // Medical Personnel
    private List<MedicalPersonnel> medicalPersonnel = new ArrayList<>();
    
    // Custom Form Data
    private Map<String, Object> customFormData;
    
    // Quality Assurance
    private QualityAssurance qualityAssurance;
    
    // Status and Workflow
    private String status; // DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, FLAGGED
    private String workflowId;
    
    // Audit Trail
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String lastModifiedBy;
    private List<AuditEntry> auditTrail = new ArrayList<>();
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VitalSigns {
        private LocalDateTime timestamp;
        private Integer heartRate;
        private String bloodPressure;
        private Integer respiratoryRate;
        private Double temperature;
        private Integer oxygenSaturation;
        private String painLevel;
        private String recordedBy;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Medication {
        private String name;
        private String dosage;
        private String route;
        private LocalDateTime administeredAt;
        private String administeredBy;
        private String reason;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Procedure {
        private String name;
        private String description;
        private LocalDateTime performedAt;
        private String performedBy;
        private String outcome;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Assessment {
        private String type;
        private String findings;
        private LocalDateTime assessedAt;
        private String assessedBy;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MedicalPersonnel {
        private String userId;
        private String name;
        private String role; // PARAMEDIC, EMT, NURSE, PHYSICIAN, etc.
        private String certificationLevel;
        private LocalDateTime involvedAt;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QualityAssurance {
        private String reviewStatus; // PENDING, IN_PROGRESS, COMPLETED
        private String reviewedBy;
        private LocalDateTime reviewedAt;
        private List<String> findings = new ArrayList<>();
        private String overallRating;
        private boolean requiresFollowUp;
        private String followUpNotes;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuditEntry {
        private LocalDateTime timestamp;
        private String userId;
        private String userName;
        private String action;
        private String fieldChanged;
        private String oldValue;
        private String newValue;
    }
}
