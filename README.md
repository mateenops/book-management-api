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

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-management-api.git
cd book-management-api
