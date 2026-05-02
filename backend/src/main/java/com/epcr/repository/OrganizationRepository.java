package com.epcr.repository;

import com.epcr.model.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends MongoRepository<Organization, String> {
    Optional<Organization> findByName(String name);
    List<Organization> findByActive(boolean active);
    List<Organization> findByType(String type);
    boolean existsByName(String name);
}
