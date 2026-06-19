# 🌿 Cloud Native Crop Disease Management System

A cloud-native web application that helps farmers detect crop diseases, maintain scan history, and manage disease records. The system is deployed on AWS EC2 using Docker and monitored using Prometheus and Grafana.

---

# 🚀 Features

## 👨‍🌾 User Module

* User Registration and Login
* JWT Authentication
* Upload Crop Images
* Disease Prediction Results
* Scan History
* Feedback Module

## 👨‍💼 Admin Module

* Admin Login
* Admin Dashboard
* View User Uploads
* Disease Management

## ☁ Cloud Features

* AWS EC2 Deployment
* Docker Containerization
* MongoDB Atlas Database
* Cloudinary Image Storage
* Nginx Web Server
* Prometheus Monitoring
* Grafana Dashboard

---

# 🛠 Tech Stack

| Layer            | Technologies                    |
| ---------------- | ------------------------------- |
| Frontend         | React.js, HTML, CSS, JavaScript |
| Backend API      | Node.js, Express.js             |
| ML Service       | Java, Spring Boot               |
| Database         | MongoDB Atlas                   |
| Authentication   | JWT                             |
| Image Storage    | Cloudinary                      |
| Containerization | Docker                          |
| Web Server       | Nginx                           |
| Monitoring       | Prometheus, Grafana             |
| Infrastructure   | AWS EC2, Terraform              |

---

# 📂 Project Structure

```text
cloud-native-crop-disease-management
│
├── frontend
├── backend
├── mlservice
├── terraform
├── .github/workflows
├── deployment.yaml
└── README.md
```

---

# ⚙ Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5001

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME

CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET

SERVER_URL=http://localhost:5001
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Shanmugapriya005/cloud-native-crop-disease-management.git
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Spring Boot ML Service

```bash
cd mlservice
mvn spring-boot:run
```

---

# 🐳 Docker Commands

## Build Docker Image

```bash
docker build -t shanmugapri/cloudnativeapp:latest .
```

## Push Docker Image

```bash
docker push shanmugapri/cloudnativeapp:latest
```

## Run Docker Container

```bash
docker run -d -p 5001:5001 --name crop-disease-app shanmugapri/cloudnativeapp:latest
```

---

# ☁ AWS Deployment

* AWS EC2 Instance
* Docker Container
* Nginx Web Server
* MongoDB Atlas Database
* Cloudinary Image Storage

---

# 📊 Monitoring

## Prometheus

Collects:

* CPU Usage
* Memory Usage
* Disk Usage
* Network Usage

## Grafana

Visualizes:

* CPU Metrics
* Memory Metrics
* Network Traffic
* Disk Usage

---

# 🏗 System Architecture

```text
                Users
                   │
                   ▼
          React Frontend (Nginx)
                   │
                   ▼
       Node.js Backend (Docker)
                   │
                   ▼
      Java Spring Boot ML Service
                   │
          ┌────────┴────────┐
          ▼                 ▼
     MongoDB Atlas      Cloudinary
          │
          ▼
  Prometheus + Grafana
          │
          ▼
        AWS EC2
```

---

# 📸 Screenshots

## Home Page

<img width="1360" src="https://github.com/user-attachments/assets/26ceb6a5-667c-463b-a57c-feee6827831a">

## Login Page

<img width="1366" src="https://github.com/user-attachments/assets/3ccb4468-71df-4885-a587-fd332ae96648">

## User Dashboard

<img width="1365" src="https://github.com/user-attachments/assets/fd993e20-397f-4c70-bb15-f846772d5fd5">

## Upload Crop Image

<img width="1365" src="https://github.com/user-attachments/assets/fe39becb-efc4-4689-bb71-99907c07916a">

## Prediction Result

<img width="1364" src="https://github.com/user-attachments/assets/ced6089a-29ea-4bb7-8e70-c19c9130dc4f">

## Admin Dashboard

<img width="1360" src="https://github.com/user-attachments/assets/2604ae1b-0a7c-4f30-a77a-ff0020833b08">

## MongoDB Atlas Database

<img width="1365" src="https://github.com/user-attachments/assets/86330216-409f-43c2-bea3-354333205b63">

## AWS EC2 Instance

<img width="1365" src="https://github.com/user-attachments/assets/b73c3f2d-297c-4334-a0e2-d5fb54aae7be">

## Prometheus Dashboard

<img width="1366" src="https://github.com/user-attachments/assets/669d6730-88c8-465f-90a1-a41fc1ac863f">

## Grafana Service

<img width="1366" src="https://github.com/user-attachments/assets/821ae9ad-8b20-43ea-82d7-97765837b62d">

## Grafana Dashboard

<img width="1366" src="https://github.com/user-attachments/assets/4e69dcbc-34a9-49dc-8a84-9a8ece9b2be4">

---

# 🎥 Project Demo

The application was deployed on AWS EC2 using Docker and Nginx. Prometheus and Grafana were used for monitoring and MongoDB Atlas was used as the cloud database.

## Live Application

```text
http://100.31.52.224
```

<img width="1365" src="https://github.com/user-attachments/assets/323a77d6-d060-4a49-9421-d8db8af762c9">

---

# 📈 Future Enhancements

* Mobile Application
* Email Notifications
* AI-Based Disease Prediction
* Kubernetes Deployment
* CI/CD using GitHub Actions

---

# 👩‍💻 Author

**Shanmugapriya**

B.Tech Information Technology
Sri Shakthi Institute of Engineering and Technology

GitHub: https://github.com/Shanmugapriya005

---

⭐ If you found this project useful, please give it a star!
