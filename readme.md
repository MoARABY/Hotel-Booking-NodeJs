# Hotelio - Backend

## Overview

The Hotelio App is a comprehensive Node.js application designed for managing hotel bookings. It features secure user authentication and authorization using JWT and bcrypt, with tokens stored in cookies. The app supports CRUD operations for rooms, hotels, and users, and provides advanced querying capabilities for hotels based on featured status, rating, type, and city.

## Features

### User Operations
- Allows CRUD operations for users
- User Registration and Login with JWT-based Authentication
- Secure Password Management with bcrypt
### Hotel Management
- Enables CRUD operations for hotels, including rooms and price management.
- Get Hotels by Featured Status or Rating
- Get Rooms within Each Hotel
- Get Hotels Count by Type or City
### Room Management
- Supports CRUD operations for rooms
### Application Featured
- Secure Cookie Management
- Input Validation and Error Handling
- Rate Limiting and Security Headers
- Logging and Monitoring

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- dotenv
- cors
- morgan
- helmet
- express-rate-limit
- cookie-parser
- nodemon

## License

This project is licensed under the [MIT License].
