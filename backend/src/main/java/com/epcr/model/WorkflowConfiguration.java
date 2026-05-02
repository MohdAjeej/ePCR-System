package com.epcr.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "workflow_configurations")
public class WorkflowConfiguration {
    @Id
    private String id;
    
    private String name;
    private String description;
    private String type; // EPCR, INCIDENT_REPORT, SAFETY_REPORT, CLINICAL_SERVICES, MEDICATION, COLLISION_REPORT
    private String version;
    
    private boolean active = true;
    private boolean isDefault = false;
    
    // Organizations this workflow is deployed to
    private List<String> deployedToOrganizations = new ArrayList<>();
    
    // Workflow Steps
    private List<WorkflowStep> steps = new ArrayList<>();
    
    // Form Fields Configuration
    private List<FormField> formFields = new ArrayList<>();
    
    // Validation Rules
    private List<ValidationRule> validationRules = new ArrayList<>();
    
    // Conditional Logic
    private List<ConditionalRule> conditionalRules = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    private String createdBy;
    private String lastModifiedBy;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class WorkflowStep {
        private String id;
        private String name;
        private String description;
        private int order;
        private boolean required;
        private List<String> allowedRoles = new ArrayList<>();
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FormField {
        private String id;
        private String label;
        private String fieldType; // TEXT, NUMBER, DATE, SELECT, CHECKBOX, TEXTAREA, etc.
        private boolean required;
        private String defaultValue;
        private List<String> options = new ArrayList<>();
        private Map<String, Object> validation;
        private String section;
        private int order;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ValidationRule {
        private String fieldId;
        private String ruleType; // REQUIRED, MIN_LENGTH, MAX_LENGTH, PATTERN, CUSTOM
        private String ruleValue;
        private String errorMessage;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConditionalRule {
        private String triggerFieldId;
        private String condition; // EQUALS, NOT_EQUALS, CONTAINS, GREATER_THAN, etc.
        private String triggerValue;
        private String actionType; // SHOW, HIDE, REQUIRE, DISABLE
        private List<String> targetFieldIds = new ArrayList<>();
    }
}
