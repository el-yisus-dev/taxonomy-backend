# Entity Relationship Diagram


```bash
Taxon
 ├── id
 ├── name
 ├── rank (ENUM)
 ├── parentId (nullable FK -> Taxon.id)
 ├── conservationStatus (ENUM)
 ├── images (JSON / ARRAY STRING)
 ├── createdAt
 ├── updatedAt
 ├── deletedAt (nullable)

Observation
 ├── id
 ├── taxonId (nullable FK -> Taxon.id)
 ├── userId (FK -> User.id)
 ├── latitude
 ├── longitude
 ├── imageUrl
 ├── status (ENUM: pending, under_review, identified)
 ├── observedAt
 ├── createdAt
 ├── updatedAt
 ├── deletedAt (nullable)

User
 ├── id
 ├── email (unique)
 ├── password
 ├── cellphone
 ├── createdAt
 ├── updatedAt
 ├── deletedAt (nullable)

```

# Taxon

**Tabla:** Taxon

| Columna             | Tipo                                   | Null | Clave / Comentario                               |
|--------------------|---------------------------------------|------|--------------------------------------------------|
| id                  | INTEGER                               | NO   | PK, autoincremental                               |
| name                | STRING                                | NO   | Nombre del taxón                                  |
| rank                | ENUM                                  | NO   | "kingdom","phylum","class","order","family","genus","species" |
| parentId            | INTEGER                               | SÍ   | FK -> Taxon.id (autorreferencia para jerarquía) |
| conservationStatus  | ENUM                                  | SÍ   | "LC","NT","CD","VU","EN","CR","EW","EX","DD","NE" |
| images              | JSON / ARRAY STRING                    | SÍ   | URLs de imágenes                                  |
| createdAt           | DATETIME                              | NO   | Fecha de creación                                 |
| updatedAt           | DATETIME                              | NO   | Fecha de actualización                             |
| deletedAt           | DATETIME                              | SÍ   | Fecha de eliminación lógica (paranoid)          |

# Observation

**Tabla:** Observation
| Columna    | Tipo         | Null | Clave / Comentario                                    |
| ---------- | ------------ | ---- | ----------------------------------------------------- |
| id         | INTEGER      | NO   | PK, autoincremental                                   |
| taxonId    | INTEGER      | SÍ   | FK -> Taxon.id, puede ser nulo si aún no identificado |
| userId     | INTEGER      | NO   | FK -> User.id                                         |
| latitude   | DECIMAL(9,6) | NO   | Latitud de la observación                             |
| longitude  | DECIMAL(9,6) | NO   | Longitud de la observación                            |
| imageUrl   | STRING       | SÍ   | URL de la foto tomada                                 |
| status     | ENUM         | NO   | "pending", "under_review", "identified"               |
| observedAt | DATETIME     | NO   | Fecha en que se realizó la observación                |
| createdAt  | DATETIME     | NO   | Fecha de creación                                     |
| updatedAt  | DATETIME     | NO   | Fecha de actualización                                |
| deletedAt  | DATETIME     | SÍ   | Fecha de eliminación lógica                           |

# User

**Table:** User
| Columna   | Tipo     | Null | Clave / Comentario          |
| --------- | -------- | ---- | --------------------------- |
| id        | INTEGER  | NO   | PK, autoincremental         |
| email     | STRING   | NO   | Único, correo del usuario   |
| password  | STRING   | NO   | Hash de la contraseña       |
| cellphone | STRING   | SÍ   | Número de celular           |
| createdAt | DATETIME | NO   | Fecha de creación           |
| updatedAt | DATETIME | NO   | Fecha de actualización      |
| deletedAt | DATETIME | SÍ   | Fecha de eliminación lógica |
