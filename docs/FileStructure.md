# API File Structure

This document explains the responsibility of each layer in the API architecture.

The project follows a layered architecture to separate responsibilities and keep the codebase maintainable and scalable.

**Request flow:** ```Routes → Controllers → Services → Repositories → Database```


## Routes

Purpose:
Define the available API endpoints.

Routes only map HTTP requests to controllers.
They do not contain business logic.

Responsibilities

Define endpoints

Map routes to controllers

Organize API paths

**Example:** ```router.post("/", createUser)
router.get("/:id", getUserById)```

## Controllers

Purpose:
Handle the HTTP layer of the application.

Controllers receive the request and response objects and call the corresponding service.

Responsibilities

Receive req and res

Extract params, query, and body

Call services

Return HTTP responses

Handle status codes

**Example flow:** 
```
HTTP Request
     ↓
Controller
     ↓
Service 
```
## Services

Purpose:
Contain the business logic of the application.

Services implement the rules of the system and coordinate data operations.

Services should not know anything about HTTP.

Responsibilities

Business logic

Data validation

Security logic (hashing passwords, etc.)

System rules

Orchestrate repository calls

## Repositories

**Purpose:**
Handle all database interactions.

Repositories abstract the database layer so the rest of the application doesn't depend directly on the ORM.

In this project, repositories interact with Prisma Client.

Responsibilities

Create records

Read records

Update records

Delete records

Query the database


## Request Flow Example

Example request: ```POST /users```

Execution flow:
```
user.routes.ts
     ↓
user.controller.ts
     ↓
user.service.ts
     ↓
user.repository.ts
     ↓
Prisma Client
     ↓
PostgreSQL
```