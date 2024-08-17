# To-Do Application API

This is a simple RESTful API for a to-do application built with Node.js, Express, and MongoDB. The API allows users to manage their tasks, including creating, updating, deleting, and viewing tasks. JWT authentication is used to secure the endpoints.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Task Routes](#task-routes)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- User Registration and Login with JWT Authentication
- Create, Read, Update, and Delete (CRUD) operations for tasks
- Data validation using `express-validator`
- Secure routes with JWT middleware
- MongoDB for database management

## Tech Stack

- **Node.js**: Backend JavaScript runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ORM for Node.js
- **express-validator**: Request data validation
- **jsonwebtoken (JWT)**: Secure user authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ad-Abhishek/To-Do-Application.git
   cd To-Do-Application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up MongoDB and configure environment variables (see below).

4. Run the application:

   ```bash
   npm start
   ```

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=7070
```

## API Endpoints

### User Routes

| Method | Endpoint          | Description            | Protected | Request Body                                                                                | Response                        |
| ------ | ----------------- | ---------------------- | --------- | ------------------------------------------------------------------------------------------- | ------------------------------- |
| POST   | `/users/register` | Register a new user    | No        | `{ "username": "yourUsername", "email": "yourEmail@mail.com", "password": "yourPassword" }` |
| POST   | `/users/login`    | Login an existing user | No        | `{ "email": "yourEmail@mail.com", "password": "yourPassword" }`                             | `{ "token": "your_jwt_token" }` |
| GET    | `/users/me`       | Get user details       | Yes       | `Header: "x-auth-token: "your_jwt_token"`                                                   |                                 |

### Task Routes

```bash
/**
 * @usage : Create a Task
 * @url : http://localhost:7070/tasks
 * @params : title, description, status
 * @method : POST
 * @access : PRIVATE
 */

 /**
 * @usage : Get Tasks
 * @url : http://localhost:7070/tasks
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */

 /**
 * @usage : Update a Task
 * @url : http://localhost:7070/tasks/:taskId
 * @urlparams: taskId
 * @params : title, description, status
 * @method : PUT
 * @access : PRIVATE
 */

 /**
 * @usage : Delete a Task by taskId
 * @url : http://localhost:7070/tasks/:taskId
 * @urlparams: taskId
 * @params : none
 * @method : DELETE
 * @access : PRIVATE
 */

 /**
 * @usage : Admin Get All Tasks
 * @url : http://localhost:7070/tasks/admin
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */
```

### Address Routes

```bash
/**
 * @usage : Create Address
 * @url : http://localhost:7070/addresses/new/
 * @params : street, city, state, zipcode, country
 * @method : POST
 * @access : PRIVATE
 */

 /**
 * @usage : Get Address
 * @url : http://localhost:7070/addresses/me/
 * @params : none
 * @method : GET
 * @access : PRIVATE
 */

 /**
 * @usage : Delete Address
 * @url : http://localhost:7070/addresses/delete/
 * @params : none
 * @method : DELETE
 * @access : PRIVATE
 */
```
