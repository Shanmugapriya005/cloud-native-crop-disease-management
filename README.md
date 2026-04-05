# 🌿 Tomato Crop Disease Management System

A full-stack web application that uses machine learning to detect and manage crop diseases from leaf images.

## 🚀 Live Demo

> Run locally — see setup instructions below.

## 📸 Features

- 🔍 **ML-powered disease detection** — upload a crop leaf image and get instant prediction
- 📊 **Admin Dashboard** — view all users, scans, and feedback
- 👤 **User Dashboard** — scan history, prediction results, and remedies
- 🔐 **Role-based authentication** — separate admin and user flows
- 💬 **Feedback system** — users can submit feedback, admins can manage it
- 🖼️ **Scan history** — all scans saved with crop, disease, severity, and confidence

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| ML Service | Spring Boot (Java), TensorFlow/DJL |
| Auth | JWT |

## 📁 Project Structure

```
├── frontend/          # React.js frontend
├── backend/           # Node.js + Express API
├── crop-disease-ml/   # Spring Boot ML service
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (running locally)
- Java 17+
- Maven

### 1. Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/crop_disease_db
JWT_SECRET=your_jwt_secret
```
```bash
node server.js
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

### 3. ML Service
```bash
cd crop-disease-ml
./mvnw spring-boot:run
```

## 🌐 Ports

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5001 |
| ML Service | http://localhost:8080 |

## 👩‍💻 Author

**Shanmugapriya** — [GitHub](https://github.com/Shanmugapriya005)
