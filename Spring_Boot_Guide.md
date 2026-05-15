# Spring Boot Backend Integration

This folder contains a demonstration of how the **HomePrime** backend could be implemented using **Java Spring Boot**. This is intended for showcase purposes during job applications.

## Current Architecture (Next.js)
The app currently uses **Next.js Route Handlers** (Node.js) for the backend logic (located in `src/app/api`). This is highly efficient for serverless deployments.

## Showcasing Spring Boot
I have added a `spring-boot-demo` directory containing:
- **`model/User.java`**: A Java representation of the User document using Spring Data MongoDB.
- **`controller/AuthController.java`**: A REST controller that handles signup requests, demonstrating familiarity with Spring annotations (`@RestController`, `@PostMapping`, etc.).

### How to talk about this in your interview:
1. **Explain the Migration**: "While the project currently uses Next.js for its unified DX (Developer Experience), I have architected the backend to be easily migratable to a microservices architecture using Spring Boot."
2. **Database Consistency**: "The models in Java (User.java) are designed to map perfectly to the existing MongoDB collections used by the React frontend."
3. **Enterprise Ready**: "Spring Boot provides the robust security and scalability features required for enterprise-level applications, which is why I've included these implementations."

## MongoDB Note
The Spring Boot demo is configured to use the same MongoDB Atlas cluster as the main app. Ensure your IP is whitelisted in Atlas for any backend (Java or Node) to connect.
