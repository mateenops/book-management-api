Book Management API
This project is a NestJS-based RESTful API for managing a book inventory, complete with Swagger integration for easy documentation and testing.

Features
Swagger Integration: Interactive API documentation available at /api-docs.
CRUD Endpoints:
GET /books: Retrieve all books.
GET /books/:id: Retrieve a book by ID.
POST /books: Add a new book with title, author, and ISBN validation.
PUT /books/:id: Update a book by ID.
DELETE /books/:id: Delete a book by ID.
Data Validation: Enforced using class-validator.
Error Handling: Comprehensive error handling for missing records and invalid inputs.
Prerequisites
Docker and Docker Compose installed on your machine.
Getting Started
1. Clone the Repository