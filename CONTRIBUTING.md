# 🤝 Contributing to SheSync

Welcome to **SheSync** — a women's health and wellness platform. We're excited to have you here and appreciate your interest in contributing!

This guide will walk you through the process of contributing, from setting up the project to submitting your pull request.

---

## 📄 Detailed Description

The document includes:

- Instructions for forking and cloning the repository  
- Steps to set up the project locally  
- Branch naming conventions and commit message format  
- Pull request workflow  
- Code formatting and review expectations  
- Community guidelines and code of conduct

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button on the top right of [SheSync Repo](https://github.com/divi-24/SheSync.git) to create a copy under your GitHub account.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/SheSync.git
cd SheSync
```
### 3. Set Up the Project Locally
Install dependencies:

```bash
npm install
```
Create a .env file in the root with the following variables:

```bash
VITE_SERVER_URL=https://shesync.onrender.com/
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
Run the development server:
```bash
npm run dev
```

### 4. To use the Dockerfile, you need to have Docker installed on your machine. Follow these steps:
Build the Docker image by running the following command from the root directory of the project:

- For Frontend:
```bash
docker build -t shesync-frontend .
```
to run Frontend:
```bash
docker run -it -p 5173:5173 shesync-frontend
```
- For Backend (You have to be in Backend folder) :
```bash
docker build -t shesync-backend .
```
to run Backend:
```bash
docker run -it -p 3000:3000 shesync-backend
```
- To build both the docker Images at once
```bash
docker-compose up --build
```
to run both the docker Images at once
```bash
docker-compose up
```
---
## 🛠️ Branching
Create a new branch from main before making changes:
```bash
git checkout -b feature/<your-feature-name>
```
Examples:
```bash
feature/period-tracker-enhancement
fix/login-auth-issue
```
---
## ✍️ Commit Message Guidelines
Use clear, descriptive commit messages following this format:

`<type>:<description>`

Examples:

- feat: add Gemini AI integration
- fix: resolve Clerk login bug
- docs: add CONTRIBUTING.md file

---
## 🔁 Submitting a Pull Request
Push your branch:
```bash
git push origin feature/<your-feature-name>
```
Go to your forked repo and click "Compare & pull request".

Fill in PR details.

Submit your PR.

---

## ✅ Code Formatting & Reviews
- Follow the code structure and naming conventions
- Write clean, modular React components
- Use TailwindCSS utility classes for styling
- All new features should ideally include basic tests
- Pull requests will undergo review — be ready to make changes

---

## 🌐 Community Guidelines & Code of Conduct
We follow a Code of Conduct to ensure a safe and inclusive space for everyone. Please:
- Use welcoming and inclusive language
- Be respectful of others’ opinions
- Accept constructive feedback gracefully
- Prioritize the community’s well-being

---

## 🙌 Thank You
Thank you for contributing to SheSync 💜

Whether it's bug reports, feature requests, documentation, or code — every bit helps improve the platform!






