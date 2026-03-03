# Taxonomy & Citizen Science Platform

A secure, collaborative platform for registering, identifying, and validating biological observations across **all taxonomic kingdoms**—including extinct taxa—combining **citizen science**, **AI-assisted identification**, and **scientific data governance**.

This project is built as a **portfolio-grade, production-minded system**, applying a **Secure Software Development Life Cycle (S-SDLC)** from the earliest stages of design.

---

## 🎯 Vision

To create an open, extensible platform where users can:

* Register biological observations with images and geolocation
* Receive AI-assisted taxonomic identification
* Collaborate on validation and correction of records
* Explore biodiversity data through interactive maps
* Learn through curated, educational species profiles

The long-term vision includes:

* Full taxonomic coverage (Bacteria, Archaea, Eukarya)
* Extinct taxa and phylogenetic relationships
* Scientific traceability and data credibility
* Educational and research-oriented use cases

---

## 🧪 Core Concepts

* **Citizen Science**: community-driven data collection
* **AI-Assisted Identification**: probabilistic, explainable results
* **Scientific Confidence Levels**: transparent validation states
* **Security by Design**: privacy, integrity, and access control
* **Extensibility**: modular architecture and scalable domain model

---

## 🧩 MVP Scope (Initial Release)

The MVP is intentionally scoped to balance ambition and feasibility.

### Included in MVP

* User registration and authentication
* Role-based access control (RBAC – basic)
* Observation registration:

  * Image upload
  * Date & location
  * Free-text notes
* AI-assisted species suggestion (external model or API)
* Scientific confidence status:

  * 🟡 Probable
  * 🟢 Confirmed (by validators)
* Community interaction:

  * Comments
  * Identification votes
* Interactive map with basic filters
* Audit log for observation changes

### Explicitly Excluded from MVP

* Offline-first mode
* Gamification systems
* Advanced phylogenetic visualization
* Large-scale conservation analytics
* Complex reputation algorithms

These features are planned for later phases.

---

## 🏗️ High-Level Architecture

* **Client (Web)**: UI for observations, maps, and collaboration
* **Backend API**: business logic, security, validation workflows
* **AI Module**: image analysis and taxonomic suggestions
* **Database**: users, observations, taxonomy, audit trails
* **Map Services**: geospatial visualization and filtering

The system follows a **modular, service-oriented design** to support future scaling.

---

## 🔐 Security Approach (S-SDLC)

Security is integrated across all development stages:

* Secure authentication and session handling
* Role-based authorization (RBAC)
* Input validation and secure error handling
* Encrypted data at rest and in transit
* Privacy-aware geolocation handling
* Full auditability of scientific records

---

## 🛠️ Tech Stack (Planned)

> Final stack decisions may evolve as the project matures.

* **Backend**: Node.js (NestJS)
* **Database**: PostgreSQL
* **ORM**: Prisma or TypeORM
* **Auth**: JWT + RBAC
* **Maps**: OpenStreetMap / Mapbox
* **AI**: External ML model or API (initially)

---

## 📁 Backend Folder Structure (NestJS)

The backend follows a **domain-driven, modular NestJS structure**, designed for clarity, scalability, and security.

```
backend/
├── src/
│   ├── main.ts                 # Application entry point
│   ├── app.module.ts           # Root module
│   │
│   ├── config/                 # Environment & app configuration
│   │   ├── configuration.ts
│   │   └── validation.ts
│   │
│   ├── common/                 # Shared utilities
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   └── utils/
│   │
│   ├── auth/                   # Authentication & authorization
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   └── guards/
│   │
│   ├── users/                  # User management
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── entities/
│   │
│   ├── taxonomy/               # Taxonomic domain
│   │   ├── taxonomy.module.ts
│   │   ├── taxonomy.service.ts
│   │   ├── taxonomy.controller.ts
│   │   └── entities/
│   │
│   ├── observations/           # Biological observations
│   │   ├── observations.module.ts
│   │   ├── observations.controller.ts
│   │   ├── observations.service.ts
│   │   ├── dto/
│   │   └── entities/
│   │
│   ├── votes/                  # Community validation & voting
│   │   ├── votes.module.ts
│   │   ├── votes.service.ts
│   │   └── entities/
│   │
│   ├── ai/                     # AI integration layer
│   │   ├── ai.module.ts
│   │   ├── ai.service.ts
│   │   └── providers/
│   │
│   ├── audit/                  # Audit logs & traceability
│   │   ├── audit.module.ts
│   │   ├── audit.service.ts
│   │   └── entities/
│   │
│   └── database/               # ORM & database config
│       ├── prisma/             # or typeorm/
│       └── migrations/
│
├── test/                       # E2E & integration tests
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json
```

### Design Principles

* **One module per domain**
* **Explicit boundaries** between auth, taxonomy, and observations
* **Security-first defaults** (guards, validation, auditing)
* **Extensible structure** for future features (phylogeny, conservation data)

---

## 👥 Team Structure

This project is developed by a small team of software engineering students, with:

* One lead developer responsible for architecture, backend, and documentation
* Frontend development shared collaboratively
* Emphasis on learning real-world workflows and clean engineering practices

---

## 🌍 Language Policy

**English-only repository policy**:

* All source code, documentation, commits, and issues are written in English.
* Internal discussions and planning may occur in any language.

---

## 🚧 Project Status

This project is currently in **active development**.

Initial focus:

* Domain modeling
* Database schema design
* Secure backend foundation

---

## 📄 License

License to be defined.

---

## ✨ Motivation

This project is not intended as a clone of existing platforms.

It is an exploration of:

* Complex domain modeling
* Secure, collaborative systems
* AI-human interaction in scientific contexts
* Building production-grade software from first principles
Jalando ando xd
---

If you’re interested in contributing, discussing ideas, or reviewing the architecture, feel free to open an issue.
