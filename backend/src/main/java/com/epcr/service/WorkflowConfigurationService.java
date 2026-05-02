package com.epcr.service;

import com.epcr.model.WorkflowConfiguration;
import com.epcr.repository.WorkflowConfigurationRepository;
import com.epcr.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkflowConfigurationService {
    
    @Autowired
    private WorkflowConfigurationRepository workflowConfigurationRepository;
    
    public WorkflowConfiguration createWorkflow(WorkflowConfiguration workflow, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (!hasAdminAccess(userPrincipal)) {
            throw new RuntimeException("Access denied - Admin access required");
        }
        
        workflow.setCreatedBy(userPrincipal.getId());
        return workflowConfigurationRepository.save(workflow);
    }
    
    public WorkflowConfiguration updateWorkflow(String id, WorkflowConfiguration updatedWorkflow, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (!hasAdminAccess(userPrincipal)) {
            throw new RuntimeException("Access denied - Admin access required");
        }
        
        Optional<WorkflowConfiguration> existing = workflowConfigurationRepository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Workflow not found");
        }
        
        WorkflowConfiguration workflow = existing.get();
        workflow.setLastModifiedBy(userPrincipal.getId());
        
        // Update fields
        if (updatedWorkflow.getName() != null) workflow.setName(updatedWorkflow.getName());
        if (updatedWorkflow.getDescription() != null) workflow.setDescription(updatedWorkflow.getDescription());
        if (updatedWorkflow.getSteps() != null) workflow.setSteps(updatedWorkflow.getSteps());
        if (updatedWorkflow.getFormFields() != null) workflow.setFormFields(updatedWorkflow.getFormFields());
        if (updatedWorkflow.getValidationRules() != null) workflow.setValidationRules(updatedWorkflow.getValidationRules());
        if (updatedWorkflow.getConditionalRules() != null) workflow.setConditionalRules(updatedWorkflow.getConditionalRules());
        
        return workflowConfigurationRepository.save(workflow);
    }
    
    public WorkflowConfiguration deployToOrganization(String workflowId, String organizationId, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (!hasAdminAccess(userPrincipal)) {
            throw new RuntimeException("Access denied - Admin access required");
        }
        
        Optional<WorkflowConfiguration> existing = workflowConfigurationRepository.findById(workflowId);
        if (existing.isEmpty()) {
            throw new RuntimeException("Workflow not found");
        }
        
        WorkflowConfiguration workflow = existing.get();
        if (!workflow.getDeployedToOrganizations().contains(organizationId)) {
            workflow.getDeployedToOrganizations().add(organizationId);
            workflow.setLastModifiedBy(userPrincipal.getId());
            return workflowConfigurationRepository.save(workflow);
        }
        
        return workflow;
    }
    
    public List<WorkflowConfiguration> getWorkflowsForOrganization(String organizationId) {
        return workflowConfigurationRepository.findByDeployedToOrganizationsContaining(organizationId);
    }
    
    public List<WorkflowConfiguration> getAllWorkflows() {
        return workflowConfigurationRepository.findAll();
    }
    
    public Optional<WorkflowConfiguration> getWorkflowById(String id) {
        return workflowConfigurationRepository.findById(id);
    }
    
    public List<WorkflowConfiguration> getWorkflowsByType(String type) {
        return workflowConfigurationRepository.findByType(type);
    }
    
    private boolean hasAdminAccess(UserPrincipal userPrincipal) {
        return userPrincipal.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_SYSTEM_ADMIN") || 
                                 auth.getAuthority().equals("ROLE_WORKFLOW_ADMIN"));
    }
}
