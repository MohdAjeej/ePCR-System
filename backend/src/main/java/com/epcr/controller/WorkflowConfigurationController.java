package com.epcr.controller;

import com.epcr.model.WorkflowConfiguration;
import com.epcr.service.WorkflowConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflows")
@CrossOrigin(origins = "*")
public class WorkflowConfigurationController {
    
    @Autowired
    private WorkflowConfigurationService workflowConfigurationService;
    
    @PostMapping
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'WORKFLOW_ADMIN')")
    public ResponseEntity<WorkflowConfiguration> createWorkflow(
            @RequestBody WorkflowConfiguration workflow,
            Authentication authentication) {
        try {
            WorkflowConfiguration created = workflowConfigurationService.createWorkflow(workflow, authentication);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'WORKFLOW_ADMIN')")
    public ResponseEntity<WorkflowConfiguration> updateWorkflow(
            @PathVariable String id,
            @RequestBody WorkflowConfiguration workflow,
            Authentication authentication) {
        try {
            WorkflowConfiguration updated = workflowConfigurationService.updateWorkflow(id, workflow, authentication);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{workflowId}/deploy/{organizationId}")
    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'WORKFLOW_ADMIN')")
    public ResponseEntity<WorkflowConfiguration> deployToOrganization(
            @PathVariable String workflowId,
            @PathVariable String organizationId,
            Authentication authentication) {
        try {
            WorkflowConfiguration deployed = workflowConfigurationService.deployToOrganization(
                    workflowId, organizationId, authentication);
            return ResponseEntity.ok(deployed);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping
    public ResponseEntity<List<WorkflowConfiguration>> getAllWorkflows() {
        List<WorkflowConfiguration> workflows = workflowConfigurationService.getAllWorkflows();
        return ResponseEntity.ok(workflows);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WorkflowConfiguration> getWorkflowById(@PathVariable String id) {
        return workflowConfigurationService.getWorkflowById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/organization/{organizationId}")
    public ResponseEntity<List<WorkflowConfiguration>> getWorkflowsForOrganization(
            @PathVariable String organizationId) {
        List<WorkflowConfiguration> workflows = workflowConfigurationService.getWorkflowsForOrganization(organizationId);
        return ResponseEntity.ok(workflows);
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<WorkflowConfiguration>> getWorkflowsByType(@PathVariable String type) {
        List<WorkflowConfiguration> workflows = workflowConfigurationService.getWorkflowsByType(type);
        return ResponseEntity.ok(workflows);
    }
}
