# 🐘 Configuración Completa: Supabase PostgreSQL + Spring Boot

## 🎯 Objetivo

Usar Supabase **ÚNICAMENTE como hosting de PostgreSQL** y desarrollar todo el backend manualmente con Spring Boot (JWT, seguridad, API REST).

---

## ✅ Respuesta a tu Pregunta

**"¿Puedo usar solo la BD de Supabase y hacer el backend manual con Spring Boot sin usar las features de Supabase?"**

**SÍ, 100% posible.** Supabase es PostgreSQL bajo el capó. Puedes conectarte con JDBC como cualquier base de datos PostgreSQL normal.

---

## 📋 Checklist Rápido

- [ ] Obtener credenciales de Supabase (Settings → Database)
- [ ] Cambiar dependencia de MySQL a PostgreSQL en `pom.xml`
- [ ] Configurar `application.properties` con credenciales
- [ ] Cambiar dialecto de MySQL a PostgreSQL
- [ ] Probar conexión
- [ ] Decidir: ¿usar tablas existentes o crear nuevas?
- [ ] Desarrollar backend Spring Boot normalmente
- [ ] Ignorar completamente Supabase Auth, API, etc.

---

## 🔧 Paso a Paso Detallado

### 1. Obtener Credenciales de Supabase

Ve a: https://supabase.com/dashboard → Tu Proyecto → Settings → Database

**Connection Pooling (Recomendado):**
```
Host: aws-0-us-west-1.pooler.supabase.com
Port: 6543
Database: postgres
User: postgres.xxxxxxxxxxxx
Password: [tu password]
```

**Direct Connection (Alternativa):**
```
Host: db.xxxxxxxxxxxx.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: [tu password]
```

---

### 2. Configurar pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.7</version>
        <relativePath/>
    </parent>
    
    <groupId>com.keylab</groupId>
    <artifactId>keylab-backend</artifactId>
    <version>1.0.0</version>
    <name>KeyLab Backend</name>
    <description>Backend Spring Boot para KeyLab con Supabase PostgreSQL</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        
        <!-- Spring Data JPA -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        
        <!-- PostgreSQL Driver (IMPORTANTE: NO MySQL) -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        
        <!-- Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        
        <!-- Swagger/OpenAPI -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.2.0</version>
        </dependency>
        
        <!-- Spring Boot Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        
        <!-- Spring Security Test -->
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

---

### 3. Configurar application.properties

**src/main/resources/application.properties**

```properties
# ===================================================================
# KeyLab Backend - Configuración Spring Boot + Supabase PostgreSQL
# ===================================================================

# Nombre de la aplicación
spring.application.name=KeyLab

# Puerto del servidor
server.port=8080

# ===================================================================
# DATABASE - Supabase PostgreSQL
# ===================================================================
# Usa Connection Pooling para mejor rendimiento
spring.datasource.url=jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres
spring.datasource.username=postgres.xxxxxxxxxxxx
spring.datasource.password=TU_PASSWORD_AQUI

# Driver
spring.datasource.driver-class-name=org.postgresql.Driver

# ===================================================================
# JPA / HIBERNATE - PostgreSQL
# ===================================================================
# Dialecto PostgreSQL (IMPORTANTE: NO usar MySQL8Dialect)
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# Estrategia de generación de esquema
# - update: actualiza el esquema automáticamente (desarrollo)
# - validate: solo valida el esquema (producción)
# - create: crea el esquema desde cero (testing)
# - none: no hace nada con el esquema (usar tablas existentes)
spring.jpa.hibernate.ddl-auto=update

# Mostrar SQL en consola
spring.jpa.show-sql=true

# Formatear SQL para mejor legibilidad
spring.jpa.properties.hibernate.format_sql=true

# Configuración adicional para PostgreSQL
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

# ===================================================================
# CONNECTION POOL - HikariCP
# ===================================================================
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000

# ===================================================================
# LOGGING
# ===================================================================
logging.level.org.springframework.web=INFO
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE

# ===================================================================
# JWT CONFIGURATION
# ===================================================================
jwt.secret=TU_CLAVE_SECRETA_SUPER_SEGURA_MINIMO_256_BITS_CAMBIAR_EN_PRODUCCION
jwt.expiration=86400000
# 86400000 ms = 24 horas

# ===================================================================
# SWAGGER/OPENAPI
# ===================================================================
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
```

---

### 4. Variables de Entorno (Recomendado)

**Crear archivo `.env` (no subir a GitHub):**

```bash
# Supabase PostgreSQL
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.xxxxxxxxxxxx
DB_PASSWORD=tu_password_real_aqui

# JWT
JWT_SECRET=clave_secreta_super_segura_cambiar_en_produccion_256_bits
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080
```

**Modificar application.properties para usar variables:**

```properties
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:postgres}
spring.datasource.username=${DB_USER:postgres}
spring.datasource.password=${DB_PASSWORD}

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION:86400000}

server.port=${SERVER_PORT:8080}
```

**Cargar variables en desarrollo:**

```bash
# Linux/Mac
export $(cat .env | xargs) && ./mvnw spring-boot:run

# Windows PowerShell
Get-Content .env | ForEach-Object {
    $name, $value = $_.split('=')
    Set-Content env:\$name $value
}
./mvnw spring-boot:run
```

---

### 5. Perfiles (Dev / Prod)

**application-dev.properties**
```properties
# Desarrollo - Actualiza esquema automáticamente
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logs verbosos
logging.level.org.hibernate.SQL=DEBUG
logging.level.com.keylab=DEBUG

# CORS permisivo
cors.allowed.origins=http://localhost:5173,http://localhost:3000
```

**application-prod.properties**
```properties
# Producción - No modifica esquema
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Logs mínimos
logging.level.org.springframework.web=WARN
logging.level.com.keylab=INFO

# CORS restrictivo
cors.allowed.origins=https://tu-dominio-produccion.com
```

**Ejecutar con perfil:**
```bash
# Desarrollo
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Producción
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

---

### 6. Test de Conexión

**TestConnectionConfig.java**

```java
package com.keylab.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;

@Configuration
@Slf4j
public class TestConnectionConfig {
    
    @Bean
    CommandLineRunner testDatabaseConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                DatabaseMetaData metaData = connection.getMetaData();
                
                log.info("=================================================");
                log.info("✅ CONEXIÓN EXITOSA A SUPABASE POSTGRESQL");
                log.info("=================================================");
                log.info("📊 Database: {}", metaData.getDatabaseProductName());
                log.info("🔢 Version: {}", metaData.getDatabaseProductVersion());
                log.info("🔗 URL: {}", metaData.getURL());
                log.info("👤 Usuario: {}", metaData.getUserName());
                log.info("📂 Catalog: {}", connection.getCatalog());
                log.info("📋 Schema: {}", connection.getSchema());
                log.info("=================================================");
                
            } catch (Exception e) {
                log.error("❌ ERROR CONECTANDO A SUPABASE", e);
                log.error("Verifica:");
                log.error("  1. Credenciales en application.properties");
                log.error("  2. Firewall/red permita acceso a Supabase");
                log.error("  3. Contraseña correcta en Supabase Dashboard");
            }
        };
    }
}
```

---

### 7. Ejemplo de Entidad

```java
package com.keylab.backend.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 50)
    private String username;
    
    @Column(unique = true, nullable = false, length = 100)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false, length = 20)
    private String role; // ADMIN, VENDEDOR, CLIENTE
    
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private Boolean active = true;
}
```

---

## 🔄 Usar Tablas Existentes de KeyLabMobile

### Opción A: Mapear a Tablas Existentes

Si ya tienes tablas en Supabase:

```properties
# NO modificar esquema existente
spring.jpa.hibernate.ddl-auto=none
```

```java
@Entity
@Table(name = "products") // Nombre exacto de tu tabla en Supabase
@Data
public class Product {
    
    @Id
    @Column(name = "id") // Nombre exacto de tu columna
    private Long id;
    
    @Column(name = "name") // Mapea según nombres en Supabase
    private String nombre;
    
    @Column(name = "price")
    private Double precio;
    
    // ... resto de campos según tu esquema
}
```

### Opción B: Crear Esquema Nuevo

En Supabase SQL Editor:

```sql
-- Crear esquema separado
CREATE SCHEMA keylab_backend;

-- Otorgar permisos
GRANT ALL ON SCHEMA keylab_backend TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA keylab_backend TO postgres;

-- Configurar búsqueda
ALTER DATABASE postgres SET search_path TO keylab_backend, public;
```

En `application.properties`:
```properties
spring.jpa.properties.hibernate.default_schema=keylab_backend
```

---

## 🚫 Lo que NO Debes Usar de Supabase

**NO uses en tu backend Spring Boot:**

❌ Supabase Auth API (`supabase.auth.signIn()`)  
❌ Supabase Client Libraries (`@supabase/supabase-js`)  
❌ Supabase PostgREST API automática  
❌ Row Level Security de Supabase  
❌ Supabase Realtime subscriptions  

**Todo eso lo implementas manualmente en Spring Boot:**

✅ JWT con `io.jsonwebtoken`  
✅ Spring Security para autenticación  
✅ Controllers REST manuales  
✅ Seguridad con `@PreAuthorize`  
✅ WebSockets (si necesitas realtime)  

---

## ✅ Lo que SÍ Puedes Usar de Supabase

✅ **Supabase Dashboard → Table Editor**: Ver/editar datos  
✅ **Supabase Dashboard → SQL Editor**: Ejecutar queries  
✅ **Database Logs**: Monitorear queries  
✅ **Backups automáticos**: Respaldo de datos  
✅ **API Settings**: Ver credenciales de conexión  

---

## 🎯 Arquitectura Final

```
┌────────────────────────────────────────────┐
│          Frontend React (KeyLab)           │
│          http://localhost:5173             │
└─────────────────┬──────────────────────────┘
                  │
                  │ HTTP REST (axios)
                  │ /api/v1/*
                  │
┌─────────────────▼──────────────────────────┐
│    Backend Spring Boot (TU CÓDIGO)         │
│    ================================         │
│    ✅ Controllers (tuyos)                  │
│    ✅ Services (tuyos)                     │
│    ✅ JWT Authentication (tuyo)            │
│    ✅ Spring Security (tuyo)               │
│    ✅ Validaciones (tuyas)                 │
│    http://localhost:8080                   │
└─────────────────┬──────────────────────────┘
                  │
                  │ JDBC / JPA
                  │ (Hibernate)
                  │
┌─────────────────▼──────────────────────────┐
│   Supabase PostgreSQL (SOLO HOSTING BD)   │
│   ======================================   │
│   ❌ NO usas Supabase Auth                │
│   ❌ NO usas Supabase API                 │
│   ✅ SOLO PostgreSQL normal                │
│   Port: 6543 (pooler)                      │
└────────────────────────────────────────────┘
```

---

## 📝 Comandos Útiles

### Compilar y ejecutar
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Ver tablas en Supabase
```sql
-- En Supabase SQL Editor
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver columnas de una tabla
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users';
```

### Resetear base de datos
```sql
-- CUIDADO: Elimina todas las tablas
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

---

## 🎓 Resumen para el Profesor

**"¿Cómo demuestras que hiciste el backend manual?"**

1. ✅ **Código Spring Boot visible**: Todos tus Controllers, Services, Security
2. ✅ **JWT implementado manualmente**: Clase `JwtUtil`, filtros, etc.
3. ✅ **Spring Security configurado**: `SecurityConfig.java` con tus reglas
4. ✅ **API REST versionada**: `/api/v1/*` creada por ti
5. ✅ **Swagger documentado**: Endpoints documentados manualmente
6. ✅ **No hay código de Supabase Client**: Solo `org.postgresql.Driver`
7. ✅ **Commits en GitHub**: Muestran tu desarrollo progresivo

**Supabase es completamente invisible** - Solo aparece como string de conexión en `application.properties`.

---

## 🚀 Ventajas de Este Enfoque

1. ✅ **Cumple 100% con la rúbrica**: Backend manual en Spring Boot
2. ✅ **Sin instalaciones locales**: No necesitas PostgreSQL en tu PC
3. ✅ **Hosting gratuito**: Supabase free tier es generoso
4. ✅ **Backups automáticos**: Protección de datos
5. ✅ **Dashboard profesional**: Visualización de datos
6. ✅ **Escalable**: Fácil migrar a producción
7. ✅ **Reutilizas BD**: Aprovechas tu trabajo de KeyLabMobile

---

## 📚 Próximos Pasos

1. [ ] Copiar este `application.properties` adaptado
2. [ ] Cambiar `pom.xml` de MySQL a PostgreSQL
3. [ ] Obtener credenciales de Supabase
4. [ ] Ejecutar `./mvnw clean spring-boot:run`
5. [ ] Verificar conexión exitosa en logs
6. [ ] Crear tus entidades
7. [ ] Crear repositorios
8. [ ] Crear servicios
9. [ ] Crear controllers
10. [ ] Implementar JWT y seguridad

---

**¡Ahora puedes usar Supabase como simple PostgreSQL y hacer todo el backend Spring Boot manualmente! 🚀**

*Tu profesor verá que TODO el código es tuyo, Supabase es solo el hosting de la BD.*
