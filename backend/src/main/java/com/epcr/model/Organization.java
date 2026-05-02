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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "organizations")
public class Organization {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String name;
    
    private String type; // TRANSPORT_PROVIDER, HOSPITAL, CLINIC, etc.
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
    private String email;
    
    private String licenseNumber;
    private LocalDateTime licenseExpiry;
    
    private boolean active = true;
    
    // Contract Information
    private String contractNumber;
    private LocalDateTime contractStartDate;
    private LocalDateTime contractEndDate;
    
    // Assigned Workflows
    private List<String> assignedWorkflowIds = new ArrayList<>();
    
    // Settings
    private OrganizationSettings settings;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String lastModifiedBy;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrganizationSettings {
        private boolean allowQualityAssurance = true;
        private boolean allowRecordAccess = true;
        private List<String> allowedRecordTypes = new ArrayList<>();
        private int dataRetentionDays = 2555; // 7 years default
    }
}
