package com.keylab.backend.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi keylabApi() {
        return GroupedOpenApi.builder()
                .group("keylab-api")
                .pathsToMatch("/api/v1/**")
                .build();
    }
}

// http://localhost:8080/swagger-ui/index.html