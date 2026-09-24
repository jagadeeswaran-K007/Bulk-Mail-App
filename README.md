# 📬 Bulk Mail – Email Management System

A full-stack MERN application engineered to streamline bulk email dispatching. The platform features dynamic Excel sheet parsing (`.xlsx`), dual email delivery modes, interactive email history logging, and a secure multi-database architecture backed by MongoDB Atlas.

![Project Banner](https://img.shields.io/badge/Stack-MERN-3366ff?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React_18-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)

---

## 🔗 Live Links

* **Live Frontend Demo**: [https://bulk-mail-app-frontend-zeta.vercel.app/](https://bulk-mail-app-frontend-zeta.vercel.app/)
* **GitHub Repository**: [https://github.com/jagadeeswaran-K007/Bulk-Mail-App](https://github.com/jagadeeswaran-K007/Bulk-Mail-App)

---

## ✨ Features

* **📁 Excel File Parsing**: Integrated **SheetJS (`xlsx`)** to parse uploaded recipient list files on the client side instantly.
* **✉️ Dual Dispatch Modes**: Support for uploading batch contact lists via spreadsheets or making fast single/manual email submissions.
* **🗄️ Multi-Database Architecture**: Utilizes 3 separate MongoDB Atlas connections (`Login`, `passkey`, `Email`) to maintain strict data separation and operational security.
* **📜 Real-Time History Tracking**: Keeps detailed delivery logs with recipient addresses, precise timestamps, subject headers, and transmission statuses.
* **🎨 Deep Midnight Blue UI**: Styled with Tailwind CSS, custom high-contrast blue (`#3366ff`) borders, soft ice blue inputs (`#eaebfe`), interactive scale animations (`hover:scale-105`), and a custom mobile drawer navigation below `680px`.

---

## 🛠️ Tech Stack

### **Frontend**
* **React.js** – UI Component Framework
* **Tailwind CSS** – Styling and Responsive Layout Design
* **FontAwesome** – Vector Icon Suites
* **SheetJS (`xlsx`)** – Client-side Spreadsheet Data Extraction

### **Backend**
* **Node.js & Express.js** – RESTful API Engine
* **Mongoose** – ODM for Multi-Database Connections
* **Nodemailer** – SMTP Email Dispatch Engine
* **CORS & Dotenv** – Cross-Origin Resource Handling & Environment Variable Management

### **Deployment**
* **Vercel** – Frontend Static Hosting & Serverless Backend Microservice
* **MongoDB Atlas** – Cloud Database Engine

---

## 📂 Directory & Folder Structure

```text
Bulk-Mail-App/
├── client/                      # React Frontend Sub-Application
│   ├── public/                  # Static assets and index.html
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── Navbar.jsx       # Header & Responsive Drawer Navigation
│   │   │   ├── SendMail.jsx     # Excel upload & manual form entry UI
│   │   │   ├── Login.jsx        # Login page for authentication
|   |   |   └── History.jsx      # Sent email history log display
│   │   ├── App.jsx              # Main app entry & active tab controller
│   │   ├── index.css            # Tailwind directives & global styling
│   │   └── index.js             # DOM root rendering file
│   ├── package.json             # Frontend dependency configurations
│   └── vercel.json              # Single Page Application (SPA) rewrite rules
│
├── server/                      # Node/Express Backend Sub-Application
│   ├── index.js                 # Server entry point, API routes & Nodemailer setup
│   ├── package.json             # Backend dependencies & Vercel build script
│   ├── vercel.json              # Serverless function router (@vercel/node)
│   └── .env.example             # Template file for required environment secrets
│
├── .gitignore                   # Root gitignore blocking node_modules & .env
└── README.md                    # Project documentation
```
---

## 👤 Author

### **Jagadeeswaran K**
* **GitHub: @jagadeeswaran-K007**
---
