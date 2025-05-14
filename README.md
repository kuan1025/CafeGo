# CafeGo - Online Coffee Ordering System

## Purpose
CafeGo is an online coffee ordering system that includes:

- Customer Frontend – allows users to browse and order drinks online

- Admin Backend – allows admins to manage products, categories, extras, and more

Future integration will include a complete billing system supporting Apple Pay, Google Pay, and other digital payment methods

## API Endpoints

### **User Management**
- `POST /api/auth` – Register a new user
- `POST /api/auth/login` – Log in a user

Admin-only endpoints:
- `GET /api/user/` – Get all users

- `GET /api/user/:id` – Get user by ID

- `POST /api/user` – Create a new user

- `PUT /api/user/:id` – Update user

- `DELETE /api/user/:id` – Delete user

### **Product Management**
- `GET /api/product/` – Get all products

- `GET /api/product/:id` – Get product by ID

For the following endpoints, access to a product is restricted to the admin users:

- `POST /api/product` – Create a new product
- `PUT /api/product/:id` – Update a product by ID.
- `DELETE /api/product/:id` – Delete a product by ID.

### **Categories**

- `GET /api/category` – Retrieve all categories
- `GET /api/category/:id` – Update a  category by ID

For the following endpoints, access to a category is restricted to the admin users:

- `POST /api/category` – Create a new category
- `PUT /api/category/:id` – Update a  category by ID
- `DELETE /api/category/:id` – Delete a category by ID

###  extra options 
- `GET /api/extraOption` – Retrieve all extraOptions
- `GET /api/extraOption/:id` – Update a extraOption by ID

For the following endpoints, access to a extraOption is restricted to the admin users:

- `POST /api/extraOption` – Create a new extraOption
- `PUT /api/extraOption/:id` – Update a  extraOption by ID
- `DELETE /api/extraOption/:id` – Delete a extraOption by ID

## How to Contribute

We welcome contributions to the development of the CafeGo API. Here's how you can contribute:

1. **Fork** the repository and clone it to your local machine.
2. **Create a new branch** for your feature or bug fix.
3. Make your changes and **commit** them with clear, descriptive commit messages.
4. **Push** your changes to your forked repository.
5. Submit a **Pull Request (PR)** to the main repository.

If you'd like to contribute to this project, please contact me via email:  n11233885@qut.edu.au

## Features

- **User Authentication:** Register, login users  and Google OAuth2 Authentication (Role-based permission)
- **product Management:** Create, edit, delete, and view product.
- **Categorization:** Create different categories


## Dependencies

This app requires the following dependencies:

### **Server (Node.js)**
1. **express** – Web framework

2. **mongoose** – MongoDB ODM

3. **dotenv** – Environment variable manager

4. **cookie-parser** – Cookie handling

5. **cors** – Cross-Origin Resource Sharing

6. **jsonwebtoken** – JSON Web Token authentication

7. **express-session** – Session management

8. **passport** + passport-google-oauth20 – Google OAuth2 login

9. **multer** – Image upload handling

10. **express-rate-limit** – Request throttling

### **Client (Vite + React)**

1. **react** – UI library

2. **vite** – Build tool for React apps

3. **axios** – HTTP client

4. **@mantine/core** – UI component library

5. **@mantine/hooks** – UI hooks

6. **@mantine/notifications** – Toast notification system

7. **@mantine/dropzone** – Drag and drop file upload

8. **@tabler/icons-react** – Icon pack

9. **axios-rate-limit** – Rate-limited HTTP requests

## To install dependencies:

```bash
# Server
cd server
npm install

# client
cd client
npm install
```

## Application Architecture

The application follows a **client-server architecture**:

client: Built using React + Mantine UI. Communicates with backend APIs via Axios.

Backend: Node.js + Express RESTful API. Uses MongoDB for data storage.

Authentication: Google OAuth2 with session-based login using Passport.js and JWT

## Deployment

Using Caddy, both applications can be deployed behind a reverse proxy on a single server.

Here is a sample Caddyfile.

```bash
$cat /etc/caddy/Caddyfile

ifn666.com {
        handle /cafeGo/api/* {
                uri strip_prefix /cafeGo
                reverse_proxy localhost:5001
        }
        handle /cafeGo/* {
                root * /var/www/html/cafeGo
                uri strip_prefix /cafeGo
                try_files {path} /index.html
                file_server
        }
}
```

## Reporting Issues

If you encounter any issues, please contact me via email at: n11233885@qut.edu.au.



To report an issue with the **CafeGo API**, follow these steps:

1. **Check the Issues page** on GitHub to see if the issue has already been reported
2. If it hasn't been reported, create a new issue with the following information:

   - **Description of the issue**.
   - **Steps to reproduce** the issue.
   - **Expected behavior** and **actual behavior**.
   - Any relevant **error logs** or **screenshot**.

3. We will review your issue and respond as soon as possible
