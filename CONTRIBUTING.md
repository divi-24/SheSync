🤝 Contributing to SheSync

Welcome to SheSync — a women's health and wellness platform. We're excited to have you here and appreciate your interest in contributing!

This guide will walk you through the process of contributing, from setting up the project to submitting your pull request, with a beginner-friendly, step-by-step approach.

📄 What’s Inside This Guide

Quick Start for Contributors

Step-by-step Project Setup (Frontend + Backend)

Setting up .env files with example values

Common issues & troubleshooting tips

Branch naming conventions & commit message guidelines

Pull request process & review expectations

Code formatting & community guidelines

Good First Issue strategy for beginners

🚀 Quick Start for Contributors

Follow these 5 simple steps to start contributing:

Fork & Clone the repo to your GitHub account

Install dependencies for frontend & backend

Set up .env files with example values

Run the development servers locally

Start contributing by picking an issue or adding a feature

For detailed steps, refer to the sections below.

🛠️ Step-by-Step Project Setup
1. Fork the Repository

Click the Fork button on the top-right of SheSync Repo
 to create a copy under your GitHub account.

2. Clone Your Fork
git clone https://github.com/<your-username>/SheSync.git
cd SheSync

3. Set Up the Frontend
cd frontend
npm install
npm run dev

4. Set Up the Backend
cd backend
npm install
npm run dev

5. Setting Up .env Files

Create .env in frontend and backend with the following example values:

Frontend .env

VITE_SERVER_URL=https://shesync.onrender.com/
VITE_GEMINI_API_KEY=your_google_gemini_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key


Backend .env

MONGO_URI=mongodb://localhost:27017/shesync
CLERK_API_KEY=your_clerk_api_key
PORT=5000

6. Running With Docker (Optional)

Frontend

docker build -t shesync-frontend .
docker run -it -p 5173:5173 shesync-frontend


Backend

cd backend
docker build -t shesync-backend .
docker run -it -p 3000:3000 shesync-backend


Both Together

docker-compose up --build
docker-compose up

⚠️ Common Issues & Troubleshooting
Issue	Fix
Clerk authentication errors	Check .env keys & restart server
MongoDB connection errors	Make sure MongoDB is running locally and URI is correct
Port conflicts	Change PORT value in .env
NPM install errors	Delete node_modules & package-lock.json then npm install
🛠️ Branching

Always create a new branch from main before making changes:

git checkout -b feature/<your-feature-name>


Examples:

feature/period-tracker-enhancement
fix/login-auth-issue
✍️ Commit Message Guidelines

Use clear, descriptive commit messages:

<type>: <description>


Examples:

feat: add Gemini AI integration

fix: resolve Clerk login bug

docs: update CONTRIBUTING.md

🔁 Pull Request Workflow

Push your branch:

git push origin feature/<your-feature-name>


Go to your fork and click Compare & pull request

Fill in PR details (description, screenshots if any)

Submit PR and wait for review

Make sure your branch is up-to-date with main before opening a PR.

✅ Code Formatting & Reviews

Follow project structure & naming conventions

Write clean, modular React components

Use TailwindCSS utility classes

Add basic tests for new features

Be ready for PR review & feedback

🏷️ Good First Issue Strategy

Label beginner-friendly issues as good first issue

Examples: fixing typos, adding validation, small UI fixes

Helps new contributors get started quickly

🌐 Community Guidelines & Code of Conduct

Use welcoming & inclusive language

Be respectful of opinions

Accept constructive feedback gracefully

Prioritize community well-being

🙌 Thank You

Thank you for contributing to SheSync 💜

Every bug report, feature, or documentation update helps make SheSync better for everyone!