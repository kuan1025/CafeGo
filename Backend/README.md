# CafeGo - Online Coffee Ordering System 

## Purpose

CafeGo is an online coffee ordering system that includes:
- A customer-facing frontend for placing online orders
- An admin dashboard for managing products

Future development will include a full billing system with support for Apple Pay, Google Pay, and other digital payment methods.

---

## How to Contribute

We welcome contributions to the development of the CafeGo API. Here's how you can contribute:

1. **Fork** the repository and clone it to your local machine.
2. **Create a new branch** for your feature or bug fix.
3. Make your changes and **commit** them with clear, descriptive commit messages.
4. **Push** your changes to your forked repository.
5. Submit a **Pull Request (PR)** to the main repository.

If you'd like to contribute to this project, please contact me via email:  n11233885@qut.edu.au


---



## API Endpoints

### User Management
- `POST /api/auth` – Register a new user
- `POST /api/auth/login` – Login an existing user

For the following endpoints, access to a product is restricted to the admin users:
- `GET /api/user/` – Retrieve all user 
- `GET /api/user/:id` – Retrieve a specific user by ID.
- `POST /api/user` – Create a new user
- `PUT /api/user/:id` – Update a user by ID.
- `DELETE /api/user/:id` – Delete a user by ID.

### Product Management
- `GET /api/product/` – Retrieve all product 
- `GET /api/product/:id` – Retrieve a specific product by ID.

For the following endpoints, access to a product is restricted to the admin users:
- `POST /api/product` – Create a new product
- `PUT /api/product/:id` – Update a product by ID.
- `DELETE /api/product/:id` – Delete a product by ID.

###  Categories
- `GET /api/category` – Retrieve all categories.
- `GET /api/category/:id` – Update a  category by ID
- `POST /api/category` – Create a new category
- `PUT /api/category/:id` – Update a  category by ID
- `DELETE /api/category/:id` – Delete a category by ID

###  extra options 
- `GET /api/extraOption` – Retrieve all extraOptions.
- `GET /api/extraOption/:id` – Update a extraOption by ID
- `POST /api/cateextraOptiongory` – Create a new extraOption
- `PUT /api/extraOption/:id` – Update a  extraOption by ID
- `DELETE /api/extraOption/:id` – Delete a extraOption by ID

To be updated...

---

## Features

- Google OAuth2 authentication support
- Admin and customer role-based access
- Modular backend structure with scalable design
- File upload support for product images
- Future support for online payments (Apple Pay, Google Pay, etc.)

---

## Installation

Simply run `npm install` in the root directory of the project

## Dependencies
- cookie-parser: Middleware to handle cookies

- cors: Middleware to enable Cross-Origin Resource Sharing

- dotenv: Loads environment variables from a .env file

- express: Web framework for building the backend

- express-rate-limit: Middleware for limiting repeated requests

- express-session: Middleware to manage session state

- jsonwebtoken: For generating and verifying JWT tokens

- mongoose: MongoDB ODM (Object Data Modeling)

- multer: Middleware for handling file uploads

- passport: Authentication middleware

- passport-google-oauth20: Google OAuth2 authentication strategy for Passport.js

## Architecture

Database: NoSQL (MongoDB) with Mongoose ODM

Backend: Node.js with Express

Authentication: Passport.js (Google OAuth2)

### Folder Structure:
```
/controllers     # Controller files handling business logic for user and cafeGo management
/models          # Mongoose models for the user, cafeGo, and categories
/routes          # API route definitions for user and cafeGo endpoints
/middleware      # Middlewares for authentication, error handling, and validation
/utils           # Helper-functions that are not middleware nor belong elsewhere
upload           # product image
```

## How to Report Issues

If you encounter any issues, please contact me via email at: n11233885@qut.edu.au.



To report an issue with the **CafeGo API**, follow these steps:

1. **Check the Issues page** on GitHub to see if the issue has already been reported
2. If it hasn't been reported, create a new issue with the following information:

   - **Description of the issue**.
   - **Steps to reproduce** the issue.
   - **Expected behavior** and **actual behavior**.
   - Any relevant **error logs** or **screenshot**.

3. We will review your issue and respond as soon as possible.

