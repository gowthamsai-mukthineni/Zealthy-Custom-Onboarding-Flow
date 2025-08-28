# Zealthy — Full Stack App (React + Node.js + MongoDB)

A full-stack web application built with **React**, **Node.js**, **Express**, and **MongoDB** using **Mongoose** as the ORM.  
Includes a **multi-step onboarding wizard**, **admin panel for configuration**, and a **data view table** — all fully connected to a backend API.

---

##  Features
- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express + Mongoose  
- **Database:** MongoDB Atlas (cloud-hosted)  
- **API Integration:** Axios for frontend-backend communication  
- **Responsive UI:** Desktop & Mobile optimized  
- **Deployment Ready:** Can be hosted on Render, Vercel, or Netlify  

---
## Setup & Installation

### 1. Clone the Repository
```bash
git clone
cd ZEALTHY_GSM\Zealthy-Custom-Onboarding-Flow-main
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a .env file in the backend folder:
```bash
PORT=4000
MONGO_URI=your-mongodb-atlas-uri
NODE_ENV=development
```

```bash
npm start
```

Backend will be live at: http://localhost:4000

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a .env file in the frontend folder:
```bash
VITE_API_BASE_URL=http://localhost:4000
```

```bash
npm run dev
```

Frontend will be live at: http://localhost:5173

---
## API Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/config`    | Get app configuration    |
| POST   | `/api/config`    | Save app configuration   |
| GET    | `/api/data`      | Get stored data          |
| POST   | `/api/data`      | Save new data            |

---
## Author
**GOWTHAM SAI MUKTHINENI**  
Email: [gowthamsai.m@protectmymails.com](mailto:gowthamsai.m@protectmymails.com)  
Contact: +1 314-797-2771