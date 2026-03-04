# Entity Relationship Diagram


```bash
User
 ├── id (PK)
 ├── email (unique)
 ├── password
 ├── role (ENUM: user, moderator)
 ├── cellphone
 ├── createdAt
 ├── updatedAt
 ├── deletedAt (nullable)

Taxon
 ├── id (PK)
 ├── name
 ├── rank (ENUM)
 ├── parentId (nullable FK -> Taxon.id)
 ├── conservationStatus (ENUM)
 ├── createdAt
 ├── updatedAt
 ├── deletedAt (nullable)

Observation
 ├── id (PK)
 ├── userId (FK -> User.id)
 ├── taxonId (nullable FK -> Taxon.id)  ← consenso final
 ├── latitude
 ├── longitude
 ├── imageUrl
 ├── status (ENUM: pending, identified)
 ├── observedAt
 ├── createdAt
 ├── updatedAt
 ├── deletedAt (nullable)

Identification
 ├── id (PK)
 ├── observationId (FK -> Observation.id)
 ├── taxonId (FK -> Taxon.id)
 ├── userId (FK -> User.id)
 ├── createdAt

```

# Taxon

**Tabla:** Taxon

| Campo              | Tipo     | Descripción                                           |
| ------------------ | -------- | ----------------------------------------------------- |
| id                 | INTEGER  | PK                                                    |
| name               | STRING   | Nombre científico                                     |
| rank               | ENUM     | kingdom, phylum, class, order, family, genus, species |
| parentId           | INTEGER  | FK autorreferencial                                   |
| conservationStatus | ENUM     | LC, NT, VU, EN, CR, EW, EX, DD, NE                    |
| createdAt          | DATETIME |                                                       |
| updatedAt          | DATETIME |                                                       |
| deletedAt          | DATETIME | Soft delete                                           |

# Observation

**Tabla:** Observation
| Campo      | Tipo         | Descripción                  |
| ---------- | ------------ | ---------------------------- |
| id         | INTEGER      | PK                           |
| userId     | INTEGER      | FK obligatorio               |
| taxonId    | INTEGER      | FK nullable (consenso final) |
| latitude   | DECIMAL(9,6) | Precisión ~10cm              |
| longitude  | DECIMAL(9,6) |                              |
| imageUrl   | STRING       | URL almacenamiento externo   |
| status     | ENUM         | pending, identified          |
| observedAt | DATETIME     | Fecha real del evento        |
| createdAt  | DATETIME     |                              |
| updatedAt  | DATETIME     |                              |
| deletedAt  | DATETIME     | Soft delete                  |


# User

**Table:** User
| Campo     | Tipo     | Restricciones    |
| --------- | -------- | ---------------- |
| id        | INTEGER  | PK               |
| email     | STRING   | UNIQUE, NOT NULL |
| password  | STRING   | NOT NULL (hash)  |
| role      | ENUM     | user / moderator |
| cellphone | STRING   | Opcional         |
| createdAt | DATETIME | NOT NULL         |
| updatedAt | DATETIME | NOT NULL         |
| deletedAt | DATETIME | Soft delete      |

# Identification
**Table:** Identification

| Campo         | Tipo     | Descripción    |
| ------------- | -------- | -------------- |
| id            | INTEGER  | PK             |
| observationId | INTEGER  | FK obligatorio |
| taxonId       | INTEGER  | FK obligatorio |
| userId        | INTEGER  | FK obligatorio |
| createdAt     | DATETIME |                |

