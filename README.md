# SheSync

SheSync is a comprehensive women's health and wellness platform built with modern web technologies. The platform aims to provide a supportive environment for women to access health resources, connect with healthcare professionals, and engage with a community of like-minded individuals.

## 🚀 Features

- **AI-Powered Health Assistant**: Get instant answers to your health-related questions
- **Community Forum**: Connect with other women and share experiences
- **Educational Resources**: Access curated health and wellness information
- **Professional Consultation**: Connect with healthcare providers
- **Health Tracker**: Monitor menstrual cycles, symptoms, and wellness goals
- **Shop**: Access health and wellness products

## 🛠️ Technologies Used

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion (for animations)
- React Router DOM
- Google Maps API
- Google Generative AI
- **Clerk Authentication**: Secure user authentication with Clerk

### UI Components
- Headless UI
- Radix UI
- React Icons
- Lucide React
- React Feather

### Development Tools
- ESLint
- PostCSS
- Autoprefixer
- TypeScript support

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SheSync.git
cd SheSync
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory and add necessary environment variables:

env
Copy
Edit
VITE_SERVER_URL=https://shesync.onrender.com/

VITE_GEMINI_API_KEY=AIzaSyDC_nwnZggf8CYID3qvJfazEE8KBnqd9Ro
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YW11c2luZy1ob3JuZXQtOS5jbGVyay5hY2NvdW50cy5kZXYk

VITE_GOOGLE_MAPS_API_KEY=AIzaSyB5pTapWtBsb95f5qpxiadprABnynOIZdQ
Start the development server:

bash
Copy
Edit
npm run dev
To use the Dockerfile, you need to have Docker installed on your machine. Follow these steps:

Frontend:

bash
Copy
Edit
docker build -t shesync-frontend .
docker run -it -p 5173:5173 shesync-frontend
Backend (Inside the Backend folder):

bash
Copy
Edit
docker build -t shesync-backend .
docker run -it -p 3000:3000 shesync-backend
To build both Docker images at once:

bash
Copy
Edit
docker-compose up --build
To run both containers at once:

bash
Copy
Edit
docker-compose up
🏗️ Project Structure (Frontend & Backend with Health Tracker)
php
Copy
Edit
src/
├── components/                    
│   ├── Landing.jsx                # Main landing page component
│   ├── Dashboard.jsx              # User dashboard interface
│   ├── ParentDashboard.jsx        # Parent-specific dashboard
│   ├── PartnerDashboard.jsx       # Partner-specific dashboard
│   ├── HealthTracker.jsx          # Health and period tracking functionality
│   ├── SymptomAnalysis.jsx        # Health symptom analysis tool
│   ├── Chatbot.jsx                # AI-powered health assistant
│   ├── CommunityChat.jsx          # Community chat interface
│   ├── Forum.jsx                  # Community forum component
│   ├── Blogs.jsx                  # Health blog section
│   ├── Consultations.jsx          # Healthcare consultation booking
│   ├── Ecom.jsx                   # E-commerce shop interface
│   ├── Login.jsx                  # User authentication
│   ├── Signup.jsx                 # User registration
│   ├── Quiz.jsx                   # Health assessment quiz
│   ├── PrivacyForm.jsx            # Privacy policy form
│   └── ModernTeamShowcase.jsx     # Team member showcase
│
├── utils/                         
│   └── gemini.js                  # Google Gemini AI integration
│
├── styles/                        
│   └── index.css                  # Main stylesheet
│
├── App.jsx                        # Main application component
├── main.jsx                       # Application entry point
└── index.css                      # Global styles

public/                            
├── images/                        # Image assets
└── icons/                         # Icon assets

Backend/                           
├── controllers/                   # Route controllers
├── models/                        # Database models
├── routes/                        # API routes
└── config/                        # Configuration files
🔍 Key Components Overview
Core Features
Landing Page: Main entry point with feature showcase and navigation

Dashboard: Personalized user interface with health metrics and quick actions

Health Tracker: Menstrual cycle, symptom, and wellness tracking

Symptom Analysis: AI-powered health symptom assessment

Chatbot: AI health assistant powered by Google Gemini

Community Features
Forum: Community discussion platform

Community Chat: Real-time chat functionality

Blogs: Health and wellness articles

ModernTeamShowcase: Healthcare professional profiles

User Management
Login/Signup: User authentication and registration with Clerk authentication system

PrivacyForm: Privacy policy and data handling

Quiz: Initial health assessment

Healthcare Services
Consultations: Healthcare provider booking system

Ecom: Health and wellness product marketplace

Specialized Dashboards
ParentDashboard: Features for parents/guardians

PartnerDashboard: Features for partners/spouses

🧱 Technology Stack Details
Frontend Architecture
React Components: Modular, reusable UI components

State Management: React hooks and context

Routing: React Router for navigation

Styling: TailwindCSS for responsive design

Animations: Framer Motion for smooth transitions

Backend Integration
API Integration: Axios for HTTP requests

Authentication: Clerk middleware authentication

Database: MongoDB for data storage

Real-time Features: WebSocket integration

Development Tools
Build Tool: Vite for fast development

Code Quality: ESLint for code linting

Version Control: Git for source control

Package Management: npm for dependencies

🤝 Contributing
We welcome contributions from the community! Here's how you can help:

Fork the repository

Create a new branch (git checkout -b feature/amazing-feature)

Make your changes

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Code Style Guidelines
Follow the existing code style

Use meaningful variable and function names

Add comments for complex logic

Write unit tests for new features

Ensure all tests pass before submitting a PR

📝 Code of Conduct
Our Pledge
We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

Our Standards
Using welcoming and inclusive language

Being respectful of differing viewpoints and experiences

Gracefully accepting constructive criticism

Focusing on what is best for the community

Showing empathy towards other community members

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
All contributors who have helped shape this project

The open-source community for their invaluable tools and libraries

Healthcare professionals who have provided guidance and expertise

📞 Support
If you need help or have questions, please:

Open an issue in the GitHub repository

Contact the maintainers

Join our community forum