package com.epcr.repository;

import com.epcr.model.WorkflowConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkflowConfigurationRepository extends MongoRepository<WorkflowConfiguration, String> {
    List<WorkflowConfiguration> findByType(String type);
    List<WorkflowConfiguration> findByActive(boolean active);
    Optional<WorkflowConfiguration> findByTypeAndIsDefault(String type, boolean isDefault);
    List<WorkflowConfiguration> findByDeployedToOrganizationsContaining(String organizationId);
}
