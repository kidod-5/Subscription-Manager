# 📦 Subscription Management Tool

A **MERN stack** application for managing personal subscriptions. This tool helps users track their recurring services, monitor spending, and (in future iterations) receive monthly notifications summarizing their subscription costs. Built with a clean, modular structure, it demonstrates secure backend practices and extensibility for future features.

🗓️ **Status**: Backend complete, frontend in progress  
📁 **Stack**: MongoDB, Express.js, React, Node.js  

---

## 🌟 Highlights

-  **Modular File Structure** – Separate folders for models, routes, and middleware  
-  **Secure Authorization** – Middleware for authentication and role-based access  
-  **Error Handling** – Centralized error middleware for robust request handling  
-  **Environment Configurations** – `.env` files for dev/production to keep secrets safe  
-  **Tested API** – Routes validated using [httpie](https://httpie.io/)  


---

## 📖 Overview

The subscription manager allows users to register, authenticate, and manage their subscriptions.  
It is designed with modularity and scalability in mind, making it simple to extend functionality (e.g., add payment integrations or notifications).

### Current Functionality

- **Users**
  - Create and manage accounts  
  - Authentication and secure route access  

- **Subscriptions**
  - Add, update, delete, and view subscriptions  
  - Store essential details (name, price, billing cycle, etc.)  

- **Authorization & Middleware**
  - Protects routes with user authentication  
  - Error handling middleware for consistent response structure  
  - [Arcjet](https://arcjet.com/) middleware for additional security checks  

---

## 🧰 Technologies Used

- **Backend**  
  - Node.js & Express.js for RESTful API  
  - MongoDB + Mongoose models for users & subscriptions  
  - Middleware for authentication, error handling, and Arcjet  

- **Frontend** *(in progress)*  
  - React.js (to be integrated)  

- **Testing**  
  - [httpie](https://httpie.io/) for manual route testing  

- **Configuration**  
  - `.env` for secrets (development & production configs)  

---

## 🚀 Future Improvement

- **Email Notification** - Detailing the monthly spending.
- **Dashboard** - Creating an intuitive dashboard capable clearly conveying the spending in an easy to understand way.
- **AI** - Incorporate AI powered recommendations on how users can optimize spending.

