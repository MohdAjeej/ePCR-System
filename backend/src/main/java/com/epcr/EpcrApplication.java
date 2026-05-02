package com.epcr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class EpcrApplication {
    public static void main(String[] args) {
        SpringApplication.run(EpcrApplication.class, args);
    }
}
