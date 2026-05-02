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
@Document(collection = "incident_reports")
public class IncidentReport {
    @Id
    private String id;
    
    @Indexed
    private String incidentNumber;
    
    @Indexed
    private String organizationId;
    private String organizationName;
    
    private String incidentType; // SAFETY, COLLISION, CLINICAL, EQUIPMENT, OTHER
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    
    private LocalDateTime incidentDateTime;
    private String location;
    
    private String description;
    private List<String> involvedPersonnel = new ArrayList<>();
    private List<String> witnesses = new ArrayList<>();
    
    // Related Records
    private String relatedTransportId;
    private String relatedPatientRecordId;
    
    // Investigation
    private String investigationStatus; // PENDING, IN_PROGRESS, COMPLETED, CLOSED
    private String investigatedBy;
    private LocalDateTime investigationDate;
    private String findings;
    private String rootCause;
    private List<String> correctiveActions = new ArrayList<>();
    
    // Custom Form Data
    private Map<String, Object> customFormData;
    
    // Status
    private String status; // DRAFT, SUBMITTED, UNDER_REVIEW, RESOLVED, CLOSED
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String lastModifiedBy;
}
