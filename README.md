🧁 Sweet Bakery – React App

A modern bakery web application built with React.
The system allows users to browse products, filter by category, and interact with the platform based on their role and permissions.

🚀 Features

📦 Product catalog with categories

🔍 Filtering and searching products

📄 Product details view

👤 User authentication system

🛒 Role-based permissions

➕ Add new products (authorized users only)

💬 Add comments to products (authorized users only)

📑 Pagination support

🔄 API integration (JSON Server / backend API)

📱 Responsive UI

🔐 Authorization Logic

The application includes role-based access control:

Regular users

View products

Add comments

Authorized users / Managers

Add new products

Manage content based on role permissions

Access to specific actions is restricted according to the user's role.

🛠️ Tech Stack

React

TypeScript (if applicable)

SCSS

Axios

React Router

JSON Server / REST API

Role-based authorization logic

📂 Project Structure (Main Concepts)

components/ – UI components

pages/ – Main application pages

models/ – Data models

services/ – API communication

auth/ – Authentication & authorization logic

⚙️ Installation
npm install
npm start

If using JSON Server:

npx json-server --watch db.json --port 3000
🎯 Purpose

This project demonstrates:

State management in React

API communication

Pagination logic

Role-based authorization

Clean component structure

Scalable frontend architecture