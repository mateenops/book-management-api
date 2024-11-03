# Book Management API

## Overview

The Book Management API is a RESTful service built using NestJS that allows users to manage a collection of books. This API provides endpoints for creating, reading, updating, and deleting book entries, complete with data validation and interactive documentation via Swagger.

## Features

- **CRUD Operations**: Manage books with endpoints for creating, retrieving, updating, and deleting book entries.
- **Data Validation**: Ensures that only valid data is processed using `class-validator`.
- **Swagger Integration**: Automatically generated API documentation available at `/api-docs`.
- **Error Handling**: Comprehensive error handling for common issues like missing records and invalid input.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### Build & Run Application

```bash
1- git clone https://github.com/mateenops/book-management-api.git
2- cd book-management-api
3- docker compose up -d
4- npm install

5- Create .env file in root directory and add these envs
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
POSTGRES_USERNAME="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DATABASE="books"

6- npm run start:dev

7- Open brower and navigate to http://localhost:3000/api/v1/api-docs