# jitterbitDesafio1

# Order Management API

## Description
This project is a simple Order Management API built with Node.js, Express, and MongoDB. It provides endpoints for user authentication and managing orders, including creating, reading, updating, and deleting orders. The API uses JWT for authentication and includes documentation for testing with Postman.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Orders](#orders)
- [Endpoints](#endpoints)
- [Testing](#testing)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JVSadan/jitterbitDesafio1.git
   cd jitterbitDesafio1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   

## Usage
### Authentication
- **Register:** `POST /auth/register`
  - Request Body: `{ "username": "your_username", "password": "your_password" }`
  - Response: `201 Created`

- **Login:** `POST /auth/login`
  - Request Body: `{ "username": "your_username", "password": "your_password" }`
  - Response: `200 OK` with JWT token

### Orders
- **Create Order:** `POST /order`
  - Request Header: `Authorization: Bearer <your_jwt_token>`
  - Request Body:
    ```json
    {
      "numeroPedido": "12345",
      "valorTotal": 100,
      "dataCriacao": "2024-07-07T00:00:00Z",
      "items": [
        {
          "idItem": "item1",
          "quantidadeItem": 2,
          "valorItem": 50
        }
      ]
    }
    ```
  - Response: `201 Created`

- **Get Order:** `GET /order/:orderId`
  - Request Header: `Authorization: Bearer <your_jwt_token>`
  - Response: `200 OK`

- **List Orders:** `GET /order/list`
  - Request Header: `Authorization: Bearer <your_jwt_token>`
  - Response: `200 OK`

- **Update Order:** `PUT /order/:orderId`
  - Request Header: `Authorization: Bearer <your_jwt_token>`
  - Request Body:
    ```json
    {
      "numeroPedido": "12345",
      "valorTotal": 150,
      "dataCriacao": "2024-07-07T00:00:00Z",
      "items": [
        {
          "idItem": "item1",
          "quantidadeItem": 3,
          "valorItem": 50
        }
      ]
    }
    ```
  - Response: `200 OK`

- **Delete Order:** `DELETE /order/:orderId`
  - Request Header: `Authorization: Bearer <your_jwt_token>`
  - Response: `200 OK`

## Endpoints
Detailed information about the endpoints can be found in the Postman collection in the `postman` directory.

## Testing
To test the API endpoints, import the Postman collection found in the `postman` directory into Postman.
