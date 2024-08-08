# Store Payment Backend

## Overview

`store-payment-backend` is a backend service built with NestJS designed to handle payment processing for an e-commerce platform. It leverages TypeORM for database interactions and provides a robust API for managing payments, users, and products.

## Features

- **Hexagonal Architecture:** The project implements a hexagonal architecture, promoting separation of concerns and making it easier to adapt and extend the application with new features or integrations.

- **Adapters and Ports:** Utilizes a system of adapters and ports to facilitate communication between different layers of the application. This design enables a clear boundary between the core business logic and external services, enhancing testability and maintainability.

- **CQRS (Command Query Responsibility Segregation):** Employs the CQRS pattern to separate read and write operations, allowing for more efficient data handling and scalability. This approach optimizes the application for complex querying and improves performance by decoupling command and query responsibilities.

## Author

- [Anderson Vargas Sepulveda](andersonvargas383@gmail.com)


## Technologies Used
- **Node.js**
- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Axios**
- **Class-validator**
- **Class-transformer**
- **Moment.js**
- **AWS RDS**

## Getting Started

To get started with this project, follow the instructions below:

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- [Environment DEV](https://drive.google.com/drive/folders/1qYvME4A1AjxiqahVzYGhXz56ysQ3oxN_?usp=sharing) 

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anderson383/store-payment-backend.git

   # Navigate to the project directory:
   cd store-payment-backend

   #CREATE FOLDER FOR ENVIRONMENTS
   /env
   #PASTE FILE
   "Environment DEV" Link in Prerequisites
2. **Intall dependencies:**

   ```bash
   npm install
3. **Start the development server:**
   ```bash
   npm run start:dev
5. **Execute build:**
   ```bash
   npm run build
4. **Start the production server:**
   ```bash
   npm run start:prod
## Production Server

This project is currently located at the following URL.

- **Railway server:**
  - [Store payment backend](https://store-payment-backend-production.up.railway.app/)
