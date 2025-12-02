package com.keylab.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class DatabaseConnectionTest {
    @Bean
    CommandLineRunner testConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
                System.out.println("✅ CONEXIÓN EXITOSA A SUPABASE POSTGRESQL! ✅");
                System.out.println("✅ DB URL: " + connection.getMetaData().getURL());
                System.out.println("✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");
            } catch (Exception e) {
                    System.err.println("❌❌❌ ERROR DE CONEXIÓN ❌❌❌");
                    System.err.println(e.getMessage());
            }
        };
    }
}


