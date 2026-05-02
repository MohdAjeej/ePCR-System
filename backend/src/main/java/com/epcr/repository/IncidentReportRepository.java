package com.epcr.repository;

import com.epcr.model.IncidentReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentReportRepository extends MongoRepository<IncidentReport, String> {
    Optional<IncidentReport> findByIncidentNumber(String incidentNumber);
    List<IncidentReport> findByOrganizationId(String organizationId);
    List<IncidentReport> findByIncidentType(String incidentType);
    List<IncidentReport> findByStatus(String status);
    List<IncidentReport> findByOrganizationIdAndStatus(String organizationId, String status);
}
