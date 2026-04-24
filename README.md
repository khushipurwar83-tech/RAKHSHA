# 🛡️ Rakhsha: Women Safety Navigation System

<p align="center">
  <strong>An intelligent, real-time safety and navigation ecosystem designed to empower and protect.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## 📖 About The Project

**Rakhsha** is a comprehensive, production-ready full-stack application aimed at enhancing personal safety. Born out of the need for reliable, technology-driven protection, Rakhsha combines smart navigation, real-time tracking, predictive crime analytics, and immediate emergency response into a unified platform. 

Whether it's finding the safest route home, alerting loved ones in an emergency, or recording tamper-proof evidence, Rakhsha serves as a digital guardian.

## ✨ Key Features

* 🗺️ **Smart Safe Routing:** AI-driven navigation that suggests the safest paths based on historical incident data, street lighting, and crowd density.
* 🚨 **Real-time SOS Alerts:** Instant emergency triggers that notify pre-set guardians and local authorities with live location data.
* 📍 **Live Guardian Tracking:** Allow trusted contacts to monitor your journey in real-time until you reach your destination safely.
* 🕵️ **Discreet 'Health Mode':** A camouflaged UI mode that hides the app's true purpose from potential aggressors while keeping emergency tools accessible.
* 🎤 **Audio-Driven Fake Call:** Simulate incoming calls with realistic audio scenarios to comfortably exit uncomfortable situations.
* ☁️ **Secure Evidence Vault:** Cloud-synced, tamper-proof storage for audio, video, and image evidence captured during emergencies.
* 🏢 **Web Dashboard:** A centralized portal for authorities and administrators to monitor active SOS alerts, manage 'Safe Haven' locations, and analyze incident heatmaps.

## 🏗️ Architecture

The project is structured as a monorepo containing multiple interconnected services:

* **`/mobile`**: The cross-platform mobile application built with React Native and Expo.
* **`/backend`**: The high-performance API server built for robust data handling and real-time sockets.
* **`/web`**: The administrative dashboard for real-time monitoring.
* **`/database`**: Scripts and schemas for PostgreSQL with PostGIS extensions for spatial queries.
* **`/docker`**: Containerization configurations for seamless local development and deployment.

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [Python](https://www.python.org/) (v3.10+)
* [Docker](https://www.docker.com/) & Docker Compose
* [Expo CLI](https://expo.dev/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/rakhsha.git
   cd rakhsha
   ```

2. **Start the backend and database (via Docker)**
   ```bash
   cd docker
   docker-compose up -d
   ```

3. **Run the Mobile App**
   ```bash
   cd mobile
   npm install
   npx expo start
   ```

4. **Run the Web Dashboard**
   ```bash
   cd web
   npm install
   npm run dev
   ```

## 🔐 Environment Variables

Please refer to the `.env.example` files located in the respective `/backend`, `/mobile`, and `/web` directories to set up your local environment variables (e.g., Maps API keys, Database URLs, JWT secrets).

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
