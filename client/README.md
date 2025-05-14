# CafeGo - Online Coffee Ordering System 

## Purpose

CafeGo’s client provides an online coffee ordering experience for customers and a dashboard for admins to manage products. The client integrates with the Server API to facilitate user authentication, product display, and order placement. In the future, the client will integrate with a billing system that supports Apple Pay, Google Pay, and other online payment methods

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


## Features

- Google OAuth2 authentication support
- Admin and customer role-based access
- File upload support for product images
- Future support for online payments (Apple Pay, Google Pay, etc.)

---

## Installation

Simply run `npm install` in the root directory of the project

## Dependencies
- @mantine/core: UI components and design system for building the client

- @mantine/dropzone: File drop zone component for handling file uploads

- @mantine/hooks: React hooks for efficient state management and UI behavior

- @mantine/notifications: Notification system for user alerts and messages

- @tabler/icons-react: React components for Tabler icons

- axios: For making HTTP requests to the server API

- react: JavaScript library for building user interfaces

- react-dom: React package for working with the DOM

- react-router-dom: Routing library for navigating within the React app

- axios-rate-limit: for rate limit



## Architecture

Client Framework: React

UI Library: Mantine for modern, customizable UI components

Routing: React Router for handling page navigation

HTTP Requests: Axios for making API requests to the server

State Management: React's useState, useContext, and hooks for efficient state management

### Folder Structure:
```
/src
  /components       # Reusable UI components 
  /context          # React context for managing global state (e.g., user, authentication)
  /pages            # Different pages of the app (e.g., homepage, product details)
  /styles           # Global styles and theme configurations
  /utils            # Utility functions for common operations

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

