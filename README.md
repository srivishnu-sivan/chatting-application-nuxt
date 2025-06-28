# Real-Time Chat Application (Go + Nuxt 3)

[![Go Version](https://img.shields.io/badge/Go-1.19+-00ADD8.svg?style=for-the-badge&logo=go)](https://golang.org/)
[![Nuxt Version](https://img.shields.io/badge/Nuxt-3-00DC82.svg?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![CI/CD Status](https://img.shields.io/badge/CI/CD-Passing-brightgreen.svg?style=for-the-badge&logo=githubactions)](https://github.com/features/actions)

A full-stack, real-time chat application built to demonstrate modern backend and frontend development practices. The backend is powered by Go, leveraging its powerful concurrency model for handling WebSocket connections, while the frontend is a dynamic Single Page Application (SPA) built with Nuxt 3.

**This project serves as a portfolio piece to showcase:**
  Proficiency in Go for building concurrent, high-performance network services.
  Full-stack development capability, from database schema design to a responsive UI.
  Understanding of modern web architecture, including REST APIs, WebSockets, and JWT authentication.

---

## ✨ Key Features

  **🚀 Real-Time Messaging:** Instant message delivery using WebSockets for a seamless chat experience.
  **🔐 Secure Authentication:** User registration and login system secured with JSON Web Tokens (JWT).
  **🗂️ Message Persistence:** Chat history is saved to a PostgreSQL database and can be loaded on demand.
  **👥 Online User List:** A live list of currently connected users in the chat room.
  **🎨 Modern, Responsive UI:** A clean and intuitive user interface built with Nuxt 3 and styled with Tailwind CSS.
  **🐳 Dockerized Environment:** Includes a docker-compose.yml for easy setup of the PostgreSQL database.

## 🏗️ Architecture Overview

The application is architected with a clean separation between the backend service and the frontend client.

1.  **Go Backend (Gin Web Framework):**
    *   **REST API:** Provides stateless endpoints for user authentication (/register, /login) and fetching historical data (/api/messages). It's responsible for issuing JWTs upon successful login.
    *   **WebSocket Service:** A dedicated endpoint (/ws) handles WebSocket connections. Upon connection, it authenticates the user (via a token) and hands the connection over to a central, concurrent-safe "Hub".
    *   **Concurrent Hub:** The core of the real-time functionality. The Hub runs in a single goroutine and uses **channels** to safely manage client lifecycles (registration, un-registration) and broadcast messages. This channel-based approach prevents race conditions without the need for complex mutexes, showcasing idiomatic Go.

2.  **Nuxt 3 Frontend:**
    *   A modern Vue.js framework that handles all UI rendering and client-side logic.
    *   It communicates with the Go backend's REST API for authentication and fetches the initial chat state.
    *   It establishes and maintains a persistent WebSocket connection to receive and send real-time messages.
    *   **Pinia** is used for global state management, keeping track of the current user, message list, and online users.

---

## 🛠️ Technology Stack

| Area      | Technology                                                                                                                                                                                                                                                                                                                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | ![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) ![Gin](https://img.shields.io/badge/Gin-008ECF?style=for-the-badge&logo=gin&logoColor=white) ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![WebSockets](https://img.shields.io/badge/WebSockets-0197F6?style=for-the-badge&logo=websocket&logoColor=white) |
| **Frontend**  | ![Nuxt.js](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white) ![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D) ![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=vuedotjs&logoColor=black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)       |
| **DevOps**    | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)                                                                                                                                                                                                                                                                                              |

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

  Go (version 1.18 or newer)
  Node.js (version 16 or newer)
  Docker and Docker Compose

### 1. Clone the Repository

bash
git clone https://github.com/srivishnu-sivan/chatting-application-nuxt.git
cd chatting-application-nuxt