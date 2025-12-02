# Guía de Backend Spring Boot - Proyecto KeyLab

## 📋 Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Arquitectura del Backend](#arquitectura-del-backend)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Configuración y Requisitos](#configuración-y-requisitos)
6. [Base de Datos](#base-de-datos)
7. [Endpoints API REST](#endpoints-api-rest)
8. [Conexión con el Frontend](#conexión-con-el-frontend)
9. [Guía de Implementación](#guía-de-implementación)
10. [Comandos Útiles](#comandos-útiles)
11. [Adaptación para KeyLab](#adaptación-para-keylab)

---

## 📖 Resumen del Proyecto

Este es un proyecto ejemplo de **Spring Boot** que implementa una API REST completa con operaciones CRUD. Sirve como base para implementar el backend del proyecto **KeyLab**.

### Características Principales:
- ✅ API REST con Spring Boot 3.5.7
- ✅ Persistencia de datos con JPA/Hibernate
- ✅ Base de datos MySQL
- ✅ CORS configurado para frontend React
- ✅ Arquitectura en capas (Controller, Service, Repository)
- ✅ Lombok para reducir código boilerplate

---

## 🏗️ Arquitectura del Backend

El proyecto sigue el patrón **MVC (Model-View-Controller)** con arquitectura en capas:

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)          │
│         Puerto: 5175                     │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
                 │ (axios)
┌────────────────▼────────────────────────┐
│         Controller Layer                 │
│    @RestController + @CrossOrigin        │
│    (PersonaController.java)              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Service Layer                    │
│    @Service (PersonaService.java)        │
│    Lógica de negocio                     │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Repository Layer                 │
│    JpaRepository                         │
│    (PersonaRepository.java)              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Database (MySQL)                 │
│    Base de datos: mibase2                │
│    Puerto: 3306                          │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tecnologías Utilizadas

### Backend (Spring Boot)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Spring Boot** | 3.5.7 | Framework principal |
| **Java** | 17 (mínimo) | Lenguaje de programación |
| **Spring Data JPA** | Incluido | ORM y persistencia |
| **Hibernate** | Incluido | Implementación JPA |
| **MySQL Connector** | Runtime | Driver de base de datos |
| **Lombok** | Latest | Reducción de código boilerplate |
| **Maven** | 3.x | Gestión de dependencias |

### Frontend (React + Vite)
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.2.0 | Framework UI |
| **Vite** | 7.2.2 | Build tool |
| **Axios** | 1.13.2 | Cliente HTTP |

---

## 📁 Estructura del Proyecto

```
BackEnd/
├── .mvn/                          # Maven wrapper
│   └── wrapper/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/backend/BackEnd/
│   │   │       ├── BackEndApplication.java      # Clase principal
│   │   │       ├── controller/
│   │   │       │   └── PersonaController.java   # Endpoints REST
│   │   │       ├── model/
│   │   │       │   └── Persona.java             # Entidad JPA
│   │   │       ├── repository/
│   │   │       │   └── PersonaRepository.java   # Interfaz JPA
│   │   │       └── service/
│   │   │           └── PersonaService.java      # Lógica de negocio
│   │   └── resources/
│   │       └── application.properties           # Configuración
│   └── test/                      # Tests unitarios
├── target/                        # Compilados (generado)
├── pom.xml                        # Dependencias Maven
├── mvnw                          # Maven wrapper (Linux/Mac)
├── mvnw.cmd                      # Maven wrapper (Windows)
└── HELP.md                       # Documentación Spring

frontEnd/
├── src/
│   ├── api_rest.jsx              # Funciones de comunicación API
│   ├── App.jsx                   # Componente principal
│   └── main.jsx                  # Entry point
├── package.json                  # Dependencias npm
└── vite.config.js               # Configuración Vite
```

---

---

## 🐘 OPCIÓN: Usar Supabase PostgreSQL con Spring Boot

### ¿Por qué usar Supabase solo como BD?

**Ventajas:**
- ✅ Ya tienes tu BD de KeyLabMobile creada
- ✅ Hosting gratuito de PostgreSQL
- ✅ Backups automáticos
- ✅ Dashboard SQL para queries
- ✅ No necesitas instalar PostgreSQL localmente

**Lo que NO usarás de Supabase:**
- ❌ Supabase Auth (harás JWT manual en Spring Boot)
- ❌ Supabase API automática (crearás tu API REST manual)
- ❌ Supabase Storage (opcional)
- ❌ Supabase Realtime (opcional)

### Paso 1: Obtener Credenciales de Conexión

1. Ve a tu proyecto Supabase: https://supabase.com/dashboard
2. Navega a: **Settings** → **Database**
3. En **Connection String**, copia la opción **"Connection Pooling"** (recomendado para producción)

Ejemplo:
```
postgresql://postgres.xxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**Componentes de la URL:**
- **Host**: `aws-0-us-west-1.pooler.supabase.com`
- **Puerto**: `6543` (pooler) o `5432` (directo)
- **Database**: `postgres`
- **Usuario**: `postgres.xxxxxxxxxxxx`
- **Password**: Tu password de Supabase

### Paso 2: Agregar Dependencia PostgreSQL en Spring Boot

En tu `pom.xml`, **reemplaza** MySQL por PostgreSQL:

```xml
<!-- Eliminar o comentar MySQL -->
<!-- 
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
-->

<!-- Agregar PostgreSQL Driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Paso 3: Configurar application.properties

**Opción A: Usando URL completa**
```properties
spring.application.name=KeyLab
server.port=8080

# Configuración Supabase PostgreSQL
spring.datasource.url=jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres
spring.datasource.username=postgres.xxxxxxxxxxxx
spring.datasource.password=TU_PASSWORD_SUPABASE

# Configuración JPA/Hibernate para PostgreSQL
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# SSL (requerido por Supabase)
spring.datasource.hikari.connection-test-query=SELECT 1
```

**Opción B: Separando componentes (más limpio)**
```properties
spring.application.name=KeyLab
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

Luego crea un archivo `.env` o configura variables de entorno:
```bash
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
DB_NAME=postgres
DB_USER=postgres.xxxxxxxxxxxx
DB_PASSWORD=tu_password_aqui
```

### Paso 4: Configuración de Perfiles (Dev/Prod)

**application-dev.properties** (desarrollo local)
```properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.SQL=DEBUG
```

**application-prod.properties** (producción)
```properties
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.org.springframework.web=INFO
```

Ejecutar con perfil específico:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Paso 5: Verificar Conexión

Crea una clase de prueba:

```java
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
                System.out.println("✅ Conexión exitosa a Supabase PostgreSQL!");
                System.out.println("📊 Database: " + connection.getCatalog());
                System.out.println("🔗 URL: " + connection.getMetaData().getURL());
            } catch (Exception e) {
                System.err.println("❌ Error conectando a Supabase: " + e.getMessage());
            }
        };
    }
}
```

### Paso 6: Trabajar con Tablas Existentes de KeyLabMobile

Si ya tienes tablas en Supabase de tu proyecto móvil:

**Opción A: Reutilizar esquema existente**

Configura Hibernate para NO crear/modificar tablas:
```properties
spring.jpa.hibernate.ddl-auto=none
```

Mapea tus entidades Java a las tablas existentes:
```java
@Entity
@Table(name = "products", schema = "public")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String nombre;
    
    // Mapea según los nombres exactos de tus columnas en Supabase
}
```

**Opción B: Crear nuevo esquema para Spring Boot**

En Supabase SQL Editor, crea un esquema separado:
```sql
CREATE SCHEMA keylab_spring;

-- Configurar búsqueda de esquemas
ALTER DATABASE postgres SET search_path TO keylab_spring, public;
```

Luego en `application.properties`:
```properties
spring.jpa.properties.hibernate.default_schema=keylab_spring
```

### Paso 7: Ignorar Características de Supabase

**NO uses:**
- ❌ `@supabase/supabase-js` en backend (es para frontend)
- ❌ Supabase Auth API
- ❌ Supabase PostgREST API
- ❌ Row Level Security (RLS) de Supabase (tu seguridad será con JWT en Spring Boot)

**Puedes usar Supabase Dashboard para:**
- ✅ Ver datos (Table Editor)
- ✅ Ejecutar queries SQL (SQL Editor)
- ✅ Ver logs de base de datos
- ✅ Hacer backups

### Paso 8: Diferencias PostgreSQL vs MySQL

Si vienes de MySQL, ten en cuenta:

| MySQL | PostgreSQL |
|-------|------------|
| `AUTO_INCREMENT` | `SERIAL` o `GENERATED ALWAYS AS IDENTITY` |
| `TINYINT(1)` para boolean | `BOOLEAN` |
| `` backticks `` | `"double quotes"` |
| Case insensitive | Case sensitive en nombres |
| `LIMIT 10` | `LIMIT 10` (igual) |

**En JPA no hay diferencias**, solo cambia el dialecto:
```java
// Funciona igual para MySQL y PostgreSQL
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
```

### Paso 9: Ejemplo Completo de Entidad

```java
package com.keylab.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "users", schema = "public")
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password; // Encriptado con BCrypt
    
    @Column(nullable = false)
    private String role; // ADMIN, VENDEDOR, CLIENTE
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
```

### Paso 10: Testing de Conexión

Ejecuta tu aplicación:
```bash
./mvnw clean spring-boot:run
```

Deberías ver en los logs:
```
✅ Conexión exitosa a Supabase PostgreSQL!
📊 Database: postgres
🔗 URL: jdbc:postgresql://aws-0-us-west-1.pooler.supabase.com:6543/postgres
Hibernate: create table if not exists users (...)
```

### Troubleshooting Supabase + Spring Boot

**Error: "SSL connection required"**
```properties
spring.datasource.url=jdbc:postgresql://HOST:PORT/DB?sslmode=require
```

**Error: "Connection timeout"**
```properties
spring.datasource.hikari.connection-timeout=60000
spring.datasource.hikari.maximum-pool-size=5
```

**Error: "Authentication failed"**
- Verifica tu password en Supabase Settings → Database
- Asegúrate de usar el usuario completo: `postgres.xxxxxxxxxxxx`

**Ver queries en Supabase:**
- Ve a Supabase Dashboard → Logs → Database
- Filtra por tu IP o por queries específicas

### Ventajas de Este Enfoque

✅ **Cumples con la rúbrica**: Backend manual con Spring Boot  
✅ **Control total**: Implementas JWT, seguridad, endpoints tú mismo  
✅ **Aprovechas Supabase**: Como hosting de PostgreSQL profesional  
✅ **Demostrable**: El profesor ve que hiciste todo el backend  
✅ **Gratis**: Supabase free tier es suficiente para desarrollo  

### Resumen de Arquitectura

```
┌─────────────────────────────────────┐
│   Frontend React (KeyLab)           │
│   Puerto: 5173                      │
└──────────────┬──────────────────────┘
               │ axios/fetch
               │ HTTP REST
┌──────────────▼──────────────────────┐
│   Backend Spring Boot (TU CÓDIGO)   │
│   - Controllers                     │
│   - Services                        │
│   - JWT Authentication              │
│   - Spring Security                 │
│   Puerto: 8080                      │
└──────────────┬──────────────────────┘
               │ JDBC
               │ JPA/Hibernate
┌──────────────▼──────────────────────┐
│   Supabase PostgreSQL               │
│   (SOLO como hosting de BD)         │
│   - Tablas                          │
│   - Datos                           │
│   Puerto: 6543                      │
└─────────────────────────────────────┘
```

**Supabase es invisible para tu aplicación** - Solo es un PostgreSQL normal.

---

## ⚙️ Configuración y Requisitos

### Requisitos Previos

1. **Java Development Kit (JDK)**
   - Versión mínima: **Java 17**
   - Versión recomendada: **Java 17 o 21**
   - Verificar: `java -version`

2. **Maven**
   - Versión: **3.6+**
   - El proyecto incluye **Maven Wrapper** (mvnw), no necesitas instalar Maven
   - Uso: `./mvnw` (Linux/Mac) o `mvnw.cmd` (Windows)

3. **MySQL Server**
   - Versión: **8.0+**
   - Puerto por defecto: **3306**
   - Usuario: **root** (sin contraseña por defecto en el ejemplo)

4. **Node.js y npm** (para el frontend)
   - Node.js: **18+**
   - npm: **9+**

### Configuración del Backend

#### 1. Archivo `application.properties`

```properties
# Nombre de la aplicación
spring.application.name=BackEnd

# Puerto del servidor
server.port=8015

# Configuración de MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/mibase2?useSSL=false
spring.datasource.username=root
spring.datasource.password=

# Configuración de Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

**Parámetros importantes:**
- `server.port=8015`: Puerto donde corre el backend
- `spring.datasource.url`: URL de conexión a MySQL
- `spring.datasource.username`: Usuario de MySQL
- `spring.datasource.password`: Contraseña (vacía por defecto)
- `spring.jpa.hibernate.ddl-auto=update`: Crea/actualiza tablas automáticamente
- `spring.jpa.show-sql=true`: Muestra las queries SQL en consola

#### 2. Archivo `pom.xml` (Dependencias Maven)

Las dependencias principales ya están configuradas:

```xml
<dependencies>
    <!-- Spring Boot Web: Para crear REST APIs -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA: Para persistencia -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- MySQL Driver -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Lombok: Reduce código boilerplate -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    
    <!-- Spring Boot Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

---

## 🗄️ Base de Datos

### Configuración de MySQL

1. **Crear la base de datos:**

```sql
CREATE DATABASE mibase2;
```

2. **Verificar conexión:**

```bash
mysql -u root -p
USE mibase2;
SHOW TABLES;
```

3. **Hibernate creará automáticamente la tabla:**

```sql
-- Tabla generada automáticamente por Hibernate
CREATE TABLE persona (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    edad INT
);
```

### Modelo de Datos Ejemplo (Persona)

```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private int edad;
}
```

**Anotaciones importantes:**
- `@Entity`: Define que esta clase es una entidad JPA
- `@Id`: Define la clave primaria
- `@GeneratedValue`: Auto-incremento
- `@Data`: Lombok genera getters, setters, toString, equals, hashCode
- `@NoArgsConstructor`: Constructor sin parámetros
- `@AllArgsConstructor`: Constructor con todos los parámetros

---

## 🌐 Endpoints API REST

### Base URL
```
http://localhost:8015/api/personas
```

### CORS Configurado
```java
@CrossOrigin(origins = "http://localhost:5175")
```
Permite peticiones desde el frontend React en puerto 5175.

### Endpoints Disponibles

| Método | Endpoint | Descripción | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| **GET** | `/api/personas/all` | Obtener todas las personas | - | `List<Persona>` |
| **GET** | `/api/personas/find/{id}` | Buscar persona por ID | - | `Optional<Persona>` |
| **POST** | `/api/personas/save` | Crear nueva persona | `Persona` | `Persona` |
| **PUT** | `/api/personas/update/{id}` | Actualizar persona | `Persona` | `Optional<Persona>` |
| **DELETE** | `/api/personas/delete/{id}` | Eliminar persona | - | `void` |

### Ejemplos de Peticiones

#### 1. Obtener todas las personas
```bash
curl -X GET http://localhost:8015/api/personas/all
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "edad": 25
  },
  {
    "id": 2,
    "nombre": "María García",
    "edad": 30
  }
]
```

#### 2. Crear una persona
```bash
curl -X POST http://localhost:8015/api/personas/save \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Carlos López", "edad": 28}'
```

**Respuesta:**
```json
{
  "id": 3,
  "nombre": "Carlos López",
  "edad": 28
}
```

#### 3. Buscar persona por ID
```bash
curl -X GET http://localhost:8015/api/personas/find/1
```

#### 4. Actualizar persona
```bash
curl -X PUT http://localhost:8015/api/personas/update/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan Pérez Actualizado", "edad": 26}'
```

#### 5. Eliminar persona
```bash
curl -X DELETE http://localhost:8015/api/personas/delete/1
```

---

## 🔗 Conexión con el Frontend

### Configuración en React (api_rest.jsx)

```javascript
import axios from "axios";

const URL_API = "http://localhost:8015/api";

// Obtener todas las personas
export const getAllPersonas = async () => {
    const response = await axios.get(`${URL_API}/personas/all`);
    return response.data;
}

// Guardar persona
export const savePersona = async (persona) => {
    const response = await axios.post(`${URL_API}/personas/save`, persona);
    return response.data; 
}

// Buscar persona por ID
export const findPersonaId = async (id) => {
    const response = await axios.get(`${URL_API}/personas/find/${id}`)
    return response.data;
}
```

### Uso en Componente React (App.jsx)

```javascript
import { useState } from 'react'
import { findPersonaId, getAllPersonas, savePersona } from "./api_rest";

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState({id: 0, nombre: '', edad: 0})

  // Recuperar todas las personas
  const recuperarPersonas = async () => {
    try {
      const data = await getAllPersonas()
      setItems(data)
      console.log("Personas:", data)
    } catch (error) {
      console.log("Error: " + error)
    }
  }

  // Grabar nueva persona
  const grabarPersona = async () => {
    try {
      const response = await savePersona(newItem)
      console.log(response)
    } catch (error) {
      console.log("Error Grabar:", error)
    }
  }

  return (
    <>
      <h1>Página Consumo Spring Boot</h1>
      <button onClick={() => recuperarPersonas()}>Cargar Personas</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.nombre} - {item.edad}</li>
        ))}
      </ul>
    </>
  )
}
```

---

## 🚀 Guía de Implementación

### Paso 1: Configurar el Entorno

#### A. Instalar Java
```bash
# Verificar versión
java -version

# Si no está instalado o es menor a Java 17:
# Ubuntu/Debian:
sudo apt update
sudo apt install openjdk-17-jdk

# Fedora:
sudo dnf install java-17-openjdk-devel

# Verificar instalación
java -version
javac -version
```

#### B. Configurar MySQL
```bash
# Iniciar MySQL
sudo systemctl start mysqld    # Fedora/RHEL
sudo systemctl start mysql     # Ubuntu/Debian

# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE mibase2;
EXIT;
```

### Paso 2: Configurar el Proyecto

#### A. Clonar/Preparar el Proyecto
```bash
cd /home/nicolas/u/FS2/ProyectosV2/Proyectos/BackEnd
```

#### B. Configurar `application.properties`
```properties
spring.application.name=BackEnd
server.port=8015

# ⚠️ IMPORTANTE: Ajusta estos valores según tu configuración
spring.datasource.url=jdbc:mysql://localhost:3306/mibase2?useSSL=false
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD_AQUI

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### Paso 3: Compilar y Ejecutar

#### A. Usando Maven Wrapper (Recomendado)
```bash
# Linux/Mac
./mvnw clean install
./mvnw spring-boot:run

# Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

#### B. Usando Maven (si está instalado)
```bash
mvn clean install
mvn spring-boot:run
```

#### C. Ejecutar como JAR
```bash
# Compilar
./mvnw clean package

# Ejecutar
java -jar target/BackEnd-0.0.1-SNAPSHOT.jar
```

### Paso 4: Verificar el Backend

```bash
# Verificar que el servidor está corriendo
curl http://localhost:8015/api/personas/all

# Debería responder con [] (array vacío) o datos si ya hay registros
```

### Paso 5: Ejecutar el Frontend

```bash
cd /home/nicolas/u/FS2/ProyectosV2/Proyectos/frontEnd

# Instalar dependencias (solo la primera vez)
npm install

# Ejecutar en modo desarrollo
npm run dev

# El frontend correrá en http://localhost:5175
```

---

## 📝 Comandos Útiles

### Maven
```bash
# Limpiar proyecto
./mvnw clean

# Compilar
./mvnw compile

# Ejecutar tests
./mvnw test

# Empaquetar (crea JAR)
./mvnw package

# Instalar en repositorio local
./mvnw install

# Ejecutar aplicación
./mvnw spring-boot:run

# Limpiar y compilar
./mvnw clean install

# Limpiar sin tests
./mvnw clean install -DskipTests
```

### MySQL
```bash
# Conectar a MySQL
mysql -u root -p

# Dentro de MySQL
USE mibase2;
SHOW TABLES;
DESCRIBE persona;
SELECT * FROM persona;
INSERT INTO persona (nombre, edad) VALUES ('Test', 25);
```

### Logs y Debugging
```bash
# Ver logs en tiempo real
tail -f logs/spring-boot-application.log

# Ejecutar con logs más verbosos
./mvnw spring-boot:run --debug
```

---

## 🎯 Adaptación para KeyLab

### 1. Cambiar Nombres y Paquetes

#### A. Estructura de Paquetes
Reemplaza `com.example.backend.BackEnd` por tu estructura:
```
com.keylab.backend
├── KeyLabApplication.java
├── controller/
├── model/
├── repository/
├── service/
└── config/
```

#### B. Actualizar `application.properties`
```properties
spring.application.name=KeyLab
server.port=8080  # o el puerto que prefieras

spring.datasource.url=jdbc:mysql://localhost:3306/keylab_db?useSSL=false
spring.datasource.username=keylab_user
spring.datasource.password=tu_password
```

### 2. Definir Modelos para KeyLab

Ejemplo de modelos que podrías necesitar:

#### Modelo Usuario
```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;  // ⚠️ En producción usar hash
    private String rol;
    
    @CreatedDate
    private LocalDateTime fechaRegistro;
}
```

#### Modelo Teclado
```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teclado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String marca;
    private String modelo;
    private Double precio;
    private String tipo;  // mecánico, membrana, etc.
    private Integer stock;
    private String descripcion;
    
    @Lob
    private String imagen;  // URL o base64
}
```

#### Modelo Pedido
```java
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<DetallePedido> detalles;
    
    private Double total;
    private String estado;  // pendiente, enviado, entregado
    
    @CreatedDate
    private LocalDateTime fecha;
}
```

### 3. Crear Repositorios

```java
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
    Optional<Usuario> findByEmail(String email);
}

public interface TecladoRepository extends JpaRepository<Teclado, Long> {
    List<Teclado> findByMarca(String marca);
    List<Teclado> findByTipo(String tipo);
    List<Teclado> findByPrecioBetween(Double min, Double max);
}

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioId(Long usuarioId);
    List<Pedido> findByEstado(String estado);
}
```

### 4. Crear Servicios

```java
@Service
public class TecladoService {
    @Autowired
    private TecladoRepository tecladoRepository;
    
    public List<Teclado> getAllTeclados() {
        return tecladoRepository.findAll();
    }
    
    public Optional<Teclado> getTecladoById(Long id) {
        return tecladoRepository.findById(id);
    }
    
    public Teclado saveTeclado(Teclado teclado) {
        return tecladoRepository.save(teclado);
    }
    
    public void deleteTeclado(Long id) {
        tecladoRepository.deleteById(id);
    }
    
    public List<Teclado> buscarPorMarca(String marca) {
        return tecladoRepository.findByMarca(marca);
    }
}
```

### 5. Crear Controladores

```java
@RestController
@RequestMapping("/api/teclados")
@CrossOrigin(origins = "http://localhost:5173")  // Puerto de tu frontend KeyLab
public class TecladoController {
    
    @Autowired
    private TecladoService tecladoService;
    
    @GetMapping
    public List<Teclado> getAllTeclados() {
        return tecladoService.getAllTeclados();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Teclado> getTecladoById(@PathVariable Long id) {
        return tecladoService.getTecladoById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Teclado createTeclado(@RequestBody Teclado teclado) {
        return tecladoService.saveTeclado(teclado);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Teclado> updateTeclado(
            @PathVariable Long id, 
            @RequestBody Teclado teclado) {
        return tecladoService.getTecladoById(id)
            .map(existing -> {
                teclado.setId(id);
                return ResponseEntity.ok(tecladoService.saveTeclado(teclado));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeclado(@PathVariable Long id) {
        tecladoService.deleteTeclado(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/marca/{marca}")
    public List<Teclado> getTecladosByMarca(@PathVariable String marca) {
        return tecladoService.buscarPorMarca(marca);
    }
}
```

### 6. Configuración de CORS para Producción

```java
@Configuration
public class CorsConfig {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "http://localhost:5175",
                        "https://tu-dominio-produccion.com"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### 7. Seguridad Básica (Spring Security)

Para añadir autenticación, agrega esta dependencia en `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### 8. Validación de Datos

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

```java
@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El username es obligatorio")
    @Size(min = 3, max = 50)
    private String username;
    
    @Email(message = "Email inválido")
    @NotBlank
    private String email;
    
    @NotBlank
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;
}
```

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
```bash
# Verificar que MySQL está corriendo
sudo systemctl status mysqld

# Verificar credenciales en application.properties
# Probar conexión manual
mysql -u root -p
```

### Error: "Port 8015 already in use"
```bash
# Encontrar proceso usando el puerto
sudo lsof -i :8015

# Matar el proceso
kill -9 <PID>

# O cambiar el puerto en application.properties
server.port=8080
```

### Error: "Lombok not working"
```bash
# Asegurar que tu IDE tiene el plugin de Lombok
# IntelliJ IDEA: Settings > Plugins > Lombok
# Eclipse: Instalar lombok.jar

# Limpiar y recompilar
./mvnw clean install
```

### Error: "CORS policy blocked"
```bash
# Verificar que @CrossOrigin está configurado
# Verificar que el origen coincide con el puerto del frontend
@CrossOrigin(origins = "http://localhost:5175")
```

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Hibernate ORM](https://hibernate.org/orm/documentation/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Project Lombok](https://projectlombok.org/)

### Tutoriales Recomendados
- [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)

### Herramientas Útiles
- **Postman**: Para probar APIs REST
- **MySQL Workbench**: GUI para MySQL
- **IntelliJ IDEA**: IDE recomendado para Spring Boot
- **VS Code + Java Extension Pack**: Alternativa ligera

---

## ✅ Checklist de Implementación

### Fase 1: Configuración Inicial
- [ ] Instalar Java 17+
- [ ] Instalar MySQL
- [ ] Crear base de datos
- [ ] Configurar application.properties
- [ ] Verificar que el proyecto compila: `./mvnw clean install`

### Fase 2: Desarrollo Backend
- [ ] Definir modelos (Entities)
- [ ] Crear repositorios (Repositories)
- [ ] Implementar servicios (Services)
- [ ] Crear controladores (Controllers)
- [ ] Configurar CORS
- [ ] Probar endpoints con curl/Postman

### Fase 3: Integración Frontend
- [ ] Crear funciones API en frontend (axios)
- [ ] Conectar componentes React con backend
- [ ] Manejar estados y errores
- [ ] Probar flujo completo

### Fase 4: Mejoras
- [ ] Añadir validaciones
- [ ] Implementar manejo de errores
- [ ] Añadir logs
- [ ] Documentar API (Swagger/OpenAPI)
- [ ] Añadir tests unitarios

### Fase 5: Producción
- [ ] Configurar perfiles (dev, prod)
- [ ] Añadir Spring Security
- [ ] Configurar HTTPS
- [ ] Optimizar queries
- [ ] Deploy

---

## 🎓 Conceptos Clave para Entender

### 1. **Inyección de Dependencias (@Autowired)**
Spring crea y gestiona los objetos por ti. No necesitas hacer `new Service()`.

### 2. **Anotaciones Principales**
- `@Entity`: Clase que se mapea a tabla de BD
- `@RestController`: Controlador REST
- `@Service`: Lógica de negocio
- `@Repository`: Acceso a datos
- `@Autowired`: Inyección de dependencias
- `@GetMapping, @PostMapping, etc.`: Mapeo de endpoints

### 3. **JPA Repository**
Interface que proporciona métodos CRUD sin necesidad de implementación:
- `findAll()`, `findById()`, `save()`, `deleteById()`, etc.

### 4. **Hibernate/JPA**
ORM que convierte objetos Java a tablas SQL y viceversa.

### 5. **CORS (Cross-Origin Resource Sharing)**
Permite que tu frontend (React) en un puerto/dominio diferente pueda hacer peticiones al backend.

---

## 📌 Próximos Pasos para KeyLab

1. **Analiza los requerimientos** de tu proyecto KeyLab
2. **Diseña el modelo de datos** (entidades y relaciones)
3. **Crea un diagrama ER** de tu base de datos
4. **Implementa las entidades** en Java
5. **Crea los repositorios** necesarios
6. **Implementa los servicios** con la lógica de negocio
7. **Desarrolla los controladores** REST
8. **Integra con tu frontend** React existente
9. **Prueba cada endpoint** antes de continuar
10. **Itera y mejora** según necesidades

---

## 📋 TO-DO LIST - EVALUACIÓN PARCIAL 3 (40%)

### 🎯 Objetivos de la Evaluación
Desarrollar una aplicación web que integre backend Spring Boot con base de datos, implementar comunicación REST, lógica de negocio y seguridad de acceso.

---

### ✅ FASE 1: CONFIGURACIÓN DEL PROYECTO (Backend)

#### 1.1 Configuración Inicial Spring Boot
- [ ] Crear nuevo proyecto Spring Boot con Spring Initializr
- [ ] Agregar dependencias necesarias:
  - [ ] Spring Web
  - [ ] Spring Data JPA
  - [ ] Spring Security
  - [ ] MySQL Driver / Oracle / Firebase
  - [ ] JWT (JSON Web Tokens)
  - [ ] Lombok
  - [ ] Validation
  - [ ] Springdoc OpenAPI (Swagger)
- [ ] Configurar estructura de paquetes:
  ```
  com.keylab.backend
  ├── controller/
  ├── model/entity/
  ├── model/dto/
  ├── repository/
  ├── service/
  ├── security/
  ├── config/
  └── util/
  ```

#### 1.2 Configuración de Base de Datos
- [ ] Instalar y configurar MySQL / Oracle Cloud / Firebase / **Supabase PostgreSQL**
- [ ] Crear base de datos para KeyLab (o usar existente)
- [ ] Configurar `application.properties` con credenciales
- [ ] Configurar perfiles (dev, prod)
- [ ] Establecer conexión exitosa desde Spring Boot

**📌 NOTA IMPORTANTE - Uso de Supabase:**
Si usas Supabase, puedes aprovechar tu BD existente de KeyLabMobile **SOLO como hosting PostgreSQL**. Spring Boot se conectará directamente a PostgreSQL ignorando completamente las features automáticas de Supabase (Auth, API REST automática, etc.). Todo el backend (JWT, seguridad, endpoints) lo crearás manualmente en Spring Boot.

---

### ✅ FASE 2: MODELAMIENTO DE DATOS

#### 2.1 Diseño de Base de Datos (Según Propuesta)
Basado en el modelo propuesto en la evaluación:

**Tablas Requeridas:**
- [ ] **users** (usuarios del sistema)
  - [ ] id (PK)
  - [ ] username
  - [ ] password (encriptado)
  - [ ] email
  - [ ] role (ADMIN, VENDEDOR, CLIENTE)
  - [ ] fecha_registro
  - [ ] activo

- [ ] **products** (productos de la tienda)
  - [ ] id (PK)
  - [ ] nombre
  - [ ] descripcion
  - [ ] precio
  - [ ] stock
  - [ ] categoria
  - [ ] imagen_url
  - [ ] activo

- [ ] **orders** (órdenes de compra)
  - [ ] id (PK)
  - [ ] user_id (FK -> users)
  - [ ] fecha_orden
  - [ ] total
  - [ ] estado (PENDIENTE, PROCESANDO, ENVIADO, ENTREGADO, CANCELADO)
  - [ ] direccion_envio

- [ ] **order_items** (detalle de órdenes)
  - [ ] id (PK)
  - [ ] order_id (FK -> orders)
  - [ ] product_id (FK -> products)
  - [ ] cantidad
  - [ ] precio_unitario
  - [ ] subtotal

- [ ] **categories** (categorías de productos - opcional)
  - [ ] id (PK)
  - [ ] nombre
  - [ ] descripcion

#### 2.2 Crear Entidades JPA
- [ ] Crear entidad `User` con anotaciones JPA
- [ ] Crear entidad `Product` con anotaciones JPA
- [ ] Crear entidad `Order` con anotaciones JPA
- [ ] Crear entidad `OrderItem` con anotaciones JPA
- [ ] Crear entidad `Category` (si aplica)
- [ ] Definir relaciones:
  - [ ] User (1) -> Orders (N)
  - [ ] Order (1) -> OrderItems (N)
  - [ ] Product (1) -> OrderItems (N)
- [ ] Validar anotaciones: `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@ManyToOne`, `@OneToMany`

#### 2.3 Crear Repositorios
- [ ] `UserRepository extends JpaRepository<User, Long>`
  - [ ] `Optional<User> findByUsername(String username)`
  - [ ] `Optional<User> findByEmail(String email)`
  - [ ] `List<User> findByRole(String role)`
- [ ] `ProductRepository extends JpaRepository<Product, Long>`
  - [ ] `List<Product> findByCategoria(String categoria)`
  - [ ] `List<Product> findByActivoTrue()`
  - [ ] `List<Product> findByNombreContainingIgnoreCase(String nombre)`
- [ ] `OrderRepository extends JpaRepository<Order, Long>`
  - [ ] `List<Order> findByUserId(Long userId)`
  - [ ] `List<Order> findByEstado(String estado)`
  - [ ] `List<Order> findByFechaOrdenBetween(LocalDate inicio, LocalDate fin)`
- [ ] `OrderItemRepository extends JpaRepository<OrderItem, Long>`
  - [ ] `List<OrderItem> findByOrderId(Long orderId)`

#### 2.4 Crear Servicios
- [ ] `UserService` - gestión de usuarios
- [ ] `ProductService` - gestión de productos
- [ ] `OrderService` - gestión de órdenes
- [ ] `AuthService` - autenticación y autorización
- [ ] Implementar lógica de negocio en cada servicio
- [ ] Crear DTOs (Data Transfer Objects) para separar modelo de datos de API

---

### ✅ FASE 3: IMPLEMENTACIÓN DE LÓGICA DE NEGOCIO

#### 3.1 Lógica de Productos
- [ ] CRUD completo de productos (crear, leer, actualizar, eliminar)
- [ ] Validar stock antes de vender
- [ ] Buscar productos por nombre/categoría
- [ ] Filtrar productos activos/inactivos
- [ ] Actualizar stock después de una orden

#### 3.2 Lógica de Órdenes
- [ ] Crear nueva orden con items
- [ ] Calcular total de la orden
- [ ] Validar stock disponible antes de crear orden
- [ ] Actualizar estados de orden (pendiente -> procesando -> enviado -> entregado)
- [ ] Obtener historial de órdenes por usuario
- [ ] Obtener detalle completo de una orden

#### 3.3 Lógica de Usuarios
- [ ] Registro de nuevos usuarios
- [ ] Actualización de perfil
- [ ] Cambio de contraseña
- [ ] Gestión de roles

#### 3.4 Validaciones y Reglas de Negocio
- [ ] Validar datos de entrada (anotaciones `@Valid`, `@NotNull`, `@NotBlank`, etc.)
- [ ] Manejo de excepciones personalizadas
- [ ] Validar permisos según rol
- [ ] Implementar logs para tracking

#### 3.5 Testing
- [ ] Crear tests unitarios para servicios
- [ ] Crear tests de integración
- [ ] Validar casos de uso principales
- [ ] Probar manejo de errores

---

### ✅ FASE 4: DESARROLLO DE API REST

#### 4.1 Crear Controladores REST

**UserController** (`/api/v1/users`)
- [ ] `POST /api/v1/users/register` - Registrar usuario
- [ ] `GET /api/v1/users` - Listar usuarios (ADMIN)
- [ ] `GET /api/v1/users/{id}` - Obtener usuario por ID
- [ ] `PUT /api/v1/users/{id}` - Actualizar usuario
- [ ] `DELETE /api/v1/users/{id}` - Eliminar usuario (ADMIN)

**ProductController** (`/api/v1/products`)
- [ ] `GET /api/v1/products` - Listar todos los productos
- [ ] `GET /api/v1/products/{id}` - Obtener producto por ID
- [ ] `POST /api/v1/products` - Crear producto (ADMIN)
- [ ] `PUT /api/v1/products/{id}` - Actualizar producto (ADMIN)
- [ ] `DELETE /api/v1/products/{id}` - Eliminar producto (ADMIN)
- [ ] `GET /api/v1/products/search?nombre=` - Buscar productos
- [ ] `GET /api/v1/products/categoria/{categoria}` - Productos por categoría

**OrderController** (`/api/v1/orders`)
- [ ] `GET /api/v1/orders` - Listar todas las órdenes (ADMIN/VENDEDOR)
- [ ] `GET /api/v1/orders/{id}` - Obtener orden por ID
- [ ] `POST /api/v1/orders` - Crear nueva orden
- [ ] `PUT /api/v1/orders/{id}/estado` - Actualizar estado (ADMIN/VENDEDOR)
- [ ] `GET /api/v1/orders/user/{userId}` - Órdenes de un usuario
- [ ] `GET /api/v1/orders/{id}/items` - Detalle de items de una orden

**AuthController** (`/api/v1/auth`)
- [ ] `POST /api/v1/auth/login` - Iniciar sesión (retorna JWT)
- [ ] `POST /api/v1/auth/register` - Registrar nuevo usuario
- [ ] `POST /api/v1/auth/refresh` - Refrescar token
- [ ] `POST /api/v1/auth/logout` - Cerrar sesión

#### 4.2 Implementar Buenas Prácticas REST
- [ ] Usar versionado en URLs (`/api/v1/...`)
- [ ] Usar verbos HTTP correctos (GET, POST, PUT, DELETE)
- [ ] Retornar códigos HTTP apropiados (200, 201, 400, 401, 403, 404, 500)
- [ ] Implementar paginación para listas grandes
- [ ] Usar `ResponseEntity<>` para respuestas
- [ ] Crear clase para respuestas estandarizadas (ApiResponse)
- [ ] Implementar manejo global de excepciones (`@ControllerAdvice`)

#### 4.3 Configurar Swagger/OpenAPI
- [ ] Agregar dependencia `springdoc-openapi-ui`
- [ ] Configurar Swagger en aplicación
- [ ] Documentar cada endpoint con anotaciones:
  - [ ] `@Operation(summary = "...")`
  - [ ] `@ApiResponse`
  - [ ] `@Parameter`
- [ ] Verificar documentación en `http://localhost:8080/swagger-ui.html`
- [ ] Exportar documentación API en JSON/YAML

---

### ✅ FASE 5: INTEGRACIÓN CON FRONTEND

#### 5.1 Configurar CORS
- [ ] Crear clase `CorsConfig`
- [ ] Permitir orígenes del frontend (localhost:5173, etc.)
- [ ] Configurar métodos permitidos (GET, POST, PUT, DELETE, OPTIONS)
- [ ] Permitir headers necesarios (Authorization, Content-Type)

#### 5.2 Crear Servicios en Frontend (React)
- [ ] Crear archivo `api/auth.js` - funciones de autenticación
- [ ] Crear archivo `api/products.js` - funciones de productos
- [ ] Crear archivo `api/orders.js` - funciones de órdenes
- [ ] Crear archivo `api/users.js` - funciones de usuarios
- [ ] Configurar axios con baseURL e interceptors
- [ ] Implementar manejo de tokens JWT en headers

#### 5.3 Integración de Endpoints
- [ ] Conectar login del frontend con backend
- [ ] Listar productos desde backend
- [ ] Crear órdenes desde frontend
- [ ] Mostrar historial de órdenes
- [ ] Implementar carrito de compras
- [ ] Administración de productos (CRUD)

#### 5.4 Validación de Comunicación
- [ ] Probar todas las llamadas REST con Postman/Insomnia
- [ ] Validar respuestas JSON correctas
- [ ] Verificar manejo de errores
- [ ] Probar con diferentes roles de usuario
- [ ] Validar comunicación en red local

---

### ✅ FASE 6: AUTENTICACIÓN Y AUTORIZACIÓN

#### 6.1 Configurar Spring Security
- [ ] Crear clase `SecurityConfig extends WebSecurityConfigurerAdapter`
- [ ] Configurar autenticación basada en JWT
- [ ] Deshabilitar CSRF para API REST
- [ ] Configurar endpoints públicos y protegidos
- [ ] Crear `UserDetailsService` personalizado

#### 6.2 Implementar JWT (JSON Web Tokens)
- [ ] Agregar dependencia JWT (`io.jsonwebtoken:jjwt`)
- [ ] Crear clase `JwtUtil` para generar y validar tokens
- [ ] Configurar tiempo de expiración de tokens
- [ ] Crear filtro `JwtAuthenticationFilter`
- [ ] Incluir roles en el token JWT

#### 6.3 Implementar Roles y Permisos
**Roles del Sistema:**

**ROLE_ADMIN:**
- [ ] Acceso total al sistema
- [ ] CRUD de productos
- [ ] CRUD de usuarios
- [ ] Ver todas las órdenes
- [ ] Cambiar estados de órdenes
- [ ] Ver reportes y estadísticas

**ROLE_VENDEDOR:**
- [ ] Ver lista de productos y detalle (solo lectura)
- [ ] Ver lista de órdenes y detalle
- [ ] Cambiar estado de órdenes
- [ ] NO puede crear/editar/eliminar productos
- [ ] NO puede gestionar usuarios

**ROLE_CLIENTE:**
- [ ] Solo acceso a la tienda
- [ ] Ver productos
- [ ] Crear órdenes (comprar)
- [ ] Ver su historial de órdenes
- [ ] Ver su perfil

#### 6.4 Proteger Endpoints
- [ ] Aplicar `@PreAuthorize("hasRole('ADMIN')")` en endpoints de admin
- [ ] Aplicar `@PreAuthorize("hasAnyRole('ADMIN','VENDEDOR')")` en endpoints de vendedor
- [ ] Endpoints públicos: login, register, listar productos
- [ ] Validar que cada rol solo vea lo permitido

#### 6.5 Frontend - Manejo de Autenticación
- [ ] Almacenar JWT en localStorage o sessionStorage
- [ ] Implementar context de autenticación (AuthContext)
- [ ] Crear rutas protegidas (ProtectedRoute)
- [ ] Redireccionar según rol del usuario
- [ ] Implementar logout (limpiar token)
- [ ] Mostrar/ocultar opciones según permisos

---

### ✅ FASE 7: COLABORACIÓN Y REPOSITORIOS

#### 7.1 Configuración de GitHub - Backend
- [ ] Crear repositorio público en GitHub para backend
- [ ] Inicializar git en proyecto: `git init`
- [ ] Crear `.gitignore` para Java/Spring Boot
- [ ] Crear README.md con instrucciones
- [ ] Subir código inicial:
  ```bash
  git add .
  git commit -m "Initial commit: Spring Boot project setup"
  git branch -M main
  git remote add origin <URL>
  git push -u origin main
  ```

#### 7.2 Configuración de GitHub - Frontend
- [ ] Crear repositorio público en GitHub para frontend
- [ ] Crear `.gitignore` para Node/React
- [ ] Crear README.md con instrucciones
- [ ] Subir código inicial

#### 7.3 Buenas Prácticas Git
- [ ] Usar commits descriptivos y claros
- [ ] Formato: `tipo: descripción` (ej: `feat: add user authentication`)
- [ ] Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`
- [ ] Hacer commits frecuentes (no acumular cambios)
- [ ] Crear branches para features: `git checkout -b feature/nombre`
- [ ] Hacer pull requests antes de mergear a main

#### 7.4 Colaboración en Equipo
- [ ] Distribuir tareas equitativamente
- [ ] Usar Issues de GitHub para tracking
- [ ] Asignar responsables a cada tarea
- [ ] Revisar código de compañeros (code review)
- [ ] Comunicar cambios importantes
- [ ] Resolver conflictos de merge

---

### ✅ FASE 8: DOCUMENTACIÓN

#### 8.1 Documento ERS (Especificación de Requisitos de Software)
- [ ] **Portada**: Nombre proyecto, integrantes, fecha
- [ ] **1. Introducción**
  - [ ] Propósito del documento
  - [ ] Alcance del proyecto
  - [ ] Definiciones y acrónimos
- [ ] **2. Descripción General**
  - [ ] Perspectiva del producto
  - [ ] Funciones del producto
  - [ ] Usuarios y características
- [ ] **3. Requisitos Funcionales**
  - [ ] RF01: Gestión de usuarios
  - [ ] RF02: Autenticación y autorización
  - [ ] RF03: Gestión de productos
  - [ ] RF04: Gestión de órdenes
  - [ ] RF05: Carrito de compras
- [ ] **4. Requisitos No Funcionales**
  - [ ] Seguridad (JWT, roles)
  - [ ] Rendimiento
  - [ ] Usabilidad
- [ ] **5. Casos de Uso**
  - [ ] Diagramas de casos de uso
  - [ ] Descripción detallada
- [ ] **6. Diagrama de Clases**
- [ ] **7. Diagrama de Base de Datos (ER)**
- [ ] **8. Arquitectura del Sistema**

#### 8.2 Manual de Usuario
- [ ] **Introducción** al sistema KeyLab
- [ ] **Requisitos** para usar el sistema
- [ ] **Instalación** (si aplica)
- [ ] **Inicio de Sesión** (con pantallazos)
- [ ] **Panel de Usuario Cliente:**
  - [ ] Ver catálogo de productos (con imagen)
  - [ ] Buscar productos (con imagen)
  - [ ] Agregar al carrito (con imagen)
  - [ ] Realizar compra (con imagen)
  - [ ] Ver historial de órdenes (con imagen)
- [ ] **Panel de Vendedor:**
  - [ ] Ver productos (con imagen)
  - [ ] Ver órdenes (con imagen)
  - [ ] Cambiar estado de orden (con imagen)
- [ ] **Panel de Administrador:**
  - [ ] Gestionar productos (con imágenes)
  - [ ] Gestionar usuarios (con imágenes)
  - [ ] Ver todas las órdenes (con imágenes)
  - [ ] Reportes (con imágenes)
- [ ] **Preguntas Frecuentes (FAQ)**
- [ ] **Soporte técnico**

#### 8.3 Documentación de APIs
- [ ] **Exportar desde Swagger** (JSON/YAML)
- [ ] **Documento separado** con:
  - [ ] Descripción general de la API
  - [ ] Base URL: `http://localhost:8080/api/v1`
  - [ ] Autenticación: Cómo usar JWT
  - [ ] Lista de todos los endpoints
  - [ ] Para cada endpoint:
    - [ ] Método HTTP
    - [ ] URL completa
    - [ ] Parámetros (path, query, body)
    - [ ] Headers requeridos
    - [ ] Ejemplo de request
    - [ ] Ejemplo de response (success y error)
    - [ ] Códigos de estado HTTP
    - [ ] Roles permitidos

#### 8.4 Documento de Integración
- [ ] **1. Introducción**
  - [ ] Objetivo de la integración
  - [ ] Tecnologías usadas (Spring Boot + React)
- [ ] **2. Arquitectura de Integración**
  - [ ] Diagrama frontend-backend-BD
  - [ ] Flujo de comunicación
- [ ] **3. Modelo de Base de Datos**
  - [ ] Diagrama ER completo
  - [ ] Descripción de cada tabla
  - [ ] Relaciones entre tablas
  - [ ] Scripts SQL de creación
- [ ] **4. Endpoints Utilizados**
  - [ ] Lista de endpoints consumidos por frontend
  - [ ] Propósito de cada uno
  - [ ] Qué componente React los usa
- [ ] **5. Pruebas de Integración**
  - [ ] **Login:**
    - [ ] Request ejemplo
    - [ ] Response ejemplo
    - [ ] Pantallazo en Postman
    - [ ] Pantallazo en navegador
  - [ ] **Listar Productos:**
    - [ ] Request ejemplo
    - [ ] Response ejemplo
    - [ ] Pantallazos
  - [ ] **Crear Orden:**
    - [ ] Request ejemplo
    - [ ] Response ejemplo
    - [ ] Pantallazos
  - [ ] (Repetir para cada funcionalidad clave)
- [ ] **6. Resultados de Comunicación**
  - [ ] Pruebas exitosas (con evidencia)
  - [ ] Manejo de errores (con evidencia)
  - [ ] Tiempos de respuesta
- [ ] **7. Problemas Encontrados y Soluciones**
- [ ] **8. Conclusiones**

---

### ✅ FASE 9: PREPARACIÓN DE ENTREGA

#### 9.1 Repositorios GitHub
- [ ] Verificar que ambos repositorios sean públicos
- [ ] Incluir README.md completo con:
  - [ ] Descripción del proyecto
  - [ ] Tecnologías usadas
  - [ ] Instrucciones de instalación
  - [ ] Instrucciones de ejecución
  - [ ] Variables de entorno necesarias
  - [ ] Credenciales de prueba
- [ ] Verificar que todo el código esté subido
- [ ] Verificar que los commits tengan mensajes claros
- [ ] Tag de la versión final: `git tag v1.0.0`

#### 9.2 Comprimir Proyectos
- [ ] Limpiar proyecto backend (eliminar carpeta `target/`)
- [ ] Limpiar proyecto frontend (eliminar `node_modules/`)
- [ ] Comprimir backend: `backend-keylab.zip`
- [ ] Comprimir frontend: `frontend-keylab.zip`
- [ ] Verificar que los ZIP sean funcionales

#### 9.3 Preparar Documentos
- [ ] Documento ERS en PDF
- [ ] Manual de Usuario en PDF (con pantallazos)
- [ ] Documentación de APIs en PDF
- [ ] Documento de Integración en PDF
- [ ] Verificar formato y ortografía de todos los documentos
- [ ] Incluir portadas con datos del equipo

#### 9.4 Preparar Presentación
- [ ] Crear presentación PowerPoint/Google Slides
- [ ] Diapositivas (máximo 15 minutos):
  1. Portada (nombre proyecto, integrantes)
  2. Objetivos del proyecto
  3. Arquitectura del sistema
  4. Modelo de datos
  5. Funcionalidades principales
  6. Demo en vivo (integración frontend-backend)
  7. Aspectos técnicos destacados
  8. Dificultades y aprendizajes
  9. Conclusiones
- [ ] Preparar demo funcional
- [ ] Ensayar presentación con el equipo
- [ ] Preparar respuestas para preguntas frecuentes

---

### ✅ FASE 10: ENTREGA Y PRESENTACIÓN

#### 10.1 Checklist de Entrega
**Enlaces GitHub:**
- [ ] 🔗 URL repositorio frontend
- [ ] 🔗 URL repositorio backend

**Proyectos Comprimidos:**
- [ ] 📁 frontend-keylab.zip
- [ ] 📁 backend-keylab.zip

**Documentos:**
- [ ] 📘 ERS-KeyLab.pdf
- [ ] 📘 Manual-Usuario-KeyLab.pdf
- [ ] 📘 Documentacion-API-KeyLab.pdf
- [ ] 📘 Integracion-KeyLab.pdf

#### 10.2 Presentación del Caso
- [ ] Duración: 15 minutos + 5 minutos preguntas
- [ ] Mostrar desarrollo funcional integrado
- [ ] Demostrar los 3 roles:
  - [ ] Login como ADMIN
  - [ ] Login como VENDEDOR
  - [ ] Login como CLIENTE
- [ ] Mostrar operaciones CRUD
- [ ] Mostrar consultas en Swagger
- [ ] Mostrar base de datos con datos

#### 10.3 Preparación para Preguntas Abiertas
**Cada integrante debe poder responder:**
- [ ] ¿Qué es Spring Boot y por qué se usa?
- [ ] ¿Qué es JPA/Hibernate?
- [ ] ¿Cómo funciona JWT?
- [ ] ¿Qué es Spring Security?
- [ ] ¿Qué es CORS y por qué es necesario?
- [ ] ¿Qué son los roles y permisos?
- [ ] ¿Qué commits hiciste en GitHub? (demostrar)
- [ ] ¿Qué parte del código desarrollaste?
- [ ] ¿Qué endpoints creaste?
- [ ] ¿Cómo se comunica el frontend con el backend?
- [ ] ¿Qué problemas técnicos enfrentaste?
- [ ] ¿Cómo está estructurada la base de datos?

---

### 📊 CRITERIOS DE EVALUACIÓN (Rúbrica)

#### 1. Calidad del Backend (30%)
- [ ] Estructura clara y organizada de paquetes
- [ ] Lógica de negocio bien implementada
- [ ] Conexión exitosa a base de datos
- [ ] Uso correcto de JPA/Hibernate
- [ ] Manejo de excepciones
- [ ] Código limpio y comentado

#### 2. Integración REST (25%)
- [ ] API REST funcional
- [ ] Versionado implementado (`/api/v1`)
- [ ] Documentación con Swagger completa
- [ ] Buenas prácticas REST
- [ ] Respuestas HTTP correctas
- [ ] Comunicación frontend-backend exitosa

#### 3. Seguridad (25%)
- [ ] Spring Security configurado
- [ ] JWT implementado correctamente
- [ ] Autenticación funcional
- [ ] Autorización por roles (ADMIN, VENDEDOR, CLIENTE)
- [ ] Endpoints protegidos correctamente
- [ ] Contraseñas encriptadas

#### 4. Colaboración y Documentación (20%)
- [ ] Repositorio GitHub bien organizado
- [ ] Commits claros y frecuentes
- [ ] Distribución equitativa de trabajo
- [ ] Documentación completa (ERS, Manual, APIs, Integración)
- [ ] Manual de usuario con pantallazos
- [ ] Evidencia de trabajo en equipo

---

### 🎯 RECORDATORIOS FINALES

**⚠️ IMPORTANTE:**
- Probar TODO antes de entregar
- Verificar que los repositorios sean PÚBLICOS
- Incluir credenciales de prueba en README
- Verificar que los proyectos comprimidos funcionen
- Revisar ortografía en documentos
- Ensayar la presentación

**Credenciales de Prueba Sugeridas:**
```
Admin:
  username: admin
  password: admin123

Vendedor:
  username: vendedor
  password: vendedor123

Cliente:
  username: cliente
  password: cliente123
```

**Base de Datos:**
- Incluir datos de prueba (productos, órdenes)
- Mínimo 10 productos
- Mínimo 5 órdenes de ejemplo

---

**¡Éxito con tu proyecto KeyLab! 🚀**

*Documento creado: 2025-11-25*
*Última actualización: 2025-11-25*
