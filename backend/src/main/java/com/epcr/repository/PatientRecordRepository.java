package com.epcr.repository;

import com.epcr.model.PatientRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PatientRecordRepository extends MongoRepository<PatientRecord, String> {
    List<PatientRecord> findByOrganizationId(String organizationId);
    List<PatientRecord> findByPatientId(String patientId);
    List<PatientRecord> findByTransportId(String transportId);
    List<PatientRecord> findByStatus(String status);
    
    @Query("{ 'organizationId': ?0, 'status': ?1 }")
    List<PatientRecord> findByOrganizationIdAndStatus(String organizationId, String status);
    
    @Query("{ 'transportDateTime': { $gte: ?0, $lte: ?1 } }")
    List<PatientRecord> findByTransportDateTimeBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("{ 'organizationId': ?0, 'transportDateTime': { $gte: ?1, $lte: ?2 } }")
    List<PatientRecord> findByOrganizationIdAndDateRange(String organizationId, LocalDateTime startDate, LocalDateTime endDate);
}
