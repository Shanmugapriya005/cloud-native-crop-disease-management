# 🌿 Cloud Native Crop Disease Management System

A cloud-native web application that helps farmers detect crop diseases, maintain scan history, and manage disease records. The system is deployed on AWS EC2 using Docker and monitored with Prometheus and Grafana.

---

## 🚀 Features

### 👨‍🌾 User Module

* User Registration and Login
* JWT Authentication
* Upload Crop Images
* Disease Prediction Results
* Scan History
* Feedback Module

### 👨‍💼 Admin Module

* Admin Login
* Admin Dashboard
* View User Uploads
* Disease Management

### ☁ Cloud Features

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
| Backend          | Node.js, Express.js             |
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
tomato-crop-disease-management
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

### Clone Repository

```bash
git clone https://github.com/Shanmugapriya005/tomato-crop-disease-management.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 🐳 Docker Commands

### Build Docker Image

```bash
docker build -t shanmugapri/cloudnativeapp:latest .
```

### Push Image

```bash
docker push shanmugapri/cloudnativeapp:latest
```

### Run Container

```bash
docker run -d -p 5001:5001 --name crop-disease-app shanmugapri/cloudnativeapp:latest
```

---

# ☁ AWS Deployment

* AWS EC2 Instance
* Nginx Web Server
* Docker Container
* MongoDB Atlas Database
* Cloudinary Image Storage

---

# 📊 Monitoring

### Prometheus

Collects:

* CPU Usage
* Memory Usage
* Disk Usage
* Network Usage

### Grafana

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
       ┌───────────┴───────────┐
       ▼                       ▼
 MongoDB Atlas            Cloudinary
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

<img width="1360" height="668" alt="Image" src="https://github.com/user-attachments/assets/26ceb6a5-667c-463b-a57c-feee6827831a" />

## Login Page

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/3ccb4468-71df-4885-a587-fd332ae96648" />

## User Dashboard

<img width="1365" height="629" alt="Image" src="https://github.com/user-attachments/assets/fd993e20-397f-4c70-bb15-f846772d5fd5" />


## Upload Crop Image

<img width="1365" height="674" alt="Image" src="https://github.com/user-attachments/assets/fe39becb-efc4-4689-bb71-99907c07916a" />

## Prediction Result

<img width="1364" height="603" alt="Image" src="https://github.com/user-attachments/assets/ced6089a-29ea-4bb7-8e70-c19c9130dc4f" />

## Admin Dashboard

<img width="1360" height="675" alt="image" src="https://github.com/user-attachments/assets/2604ae1b-0a7c-4f30-a77a-ff0020833b08" />


## AWS EC2

![EC2](screenshots/ec2-instance.png)

## Prometheus Dashboard

![Prometheus](screenshots/prometheus-dashboard.png)

## Grafana Dashboard

![Grafana](screenshots/grafana-dashboard.png)

---

# 📈 Future Enhancements

* Mobile Application
* Email Notifications
* AI-based Disease Prediction
* Kubernetes Deployment
* CI/CD using GitHub Actions

---

# 👩‍💻 Author

**Shanmugapriya**

B.Tech Information Technology
Sri Shakthi Institute of Engineering and Technology


