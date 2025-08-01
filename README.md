# SheSync 🌸

SheSync is a comprehensive women's health and wellness platform built with modern web technologies. The platform aims to provide a supportive environment for women to access health resources, connect with healthcare professionals, and engage with a community of like-minded individuals.

**Latest Updates (2025):**
- ✨ Enhanced Parent Dashboard 
- 🔒 Advanced Privacy Settings and Data Protection
- 📊 Real-time Health Analytics and Insights
- 🎯 Quick Actions Panel for Easy Navigation
- 🔍 Search and Filter Functionality
- 📱 Improved Mobile Responsiveness

## 🚀 Features

### Core Health Features
- **AI-Powered Health Assistant**: Get instant answers to your health-related questions
- **Period Tracking**: Monitor and understand your menstrual cycle with advanced analytics
- **Symptom Analysis**: AI-powered health symptom assessment and tracking
- **Health Alerts**: Real-time notifications for irregular patterns and health insights

### Community & Support
- **Community Forum**: Connect with other women and share experiences
- **Community Chat**: Real-time chat functionality for peer support
- **Educational Resources**: Access curated health and wellness information
- **Professional Consultation**: Connect with healthcare providers

### Enhanced Parent Dashboard
- **Multi-Child Management**: Track multiple children's health data
- **Privacy Controls**: Advanced data sharing and access controls
- **Communication Log**: Track doctor consultations and school meetings
- **Health Analytics**: Mood trends, sleep patterns, and wellness metrics
- **Quick Actions**: Easy access to common functions and settings
- **Search & Filter**: Find specific information quickly

### E-commerce & Services
- **Shop**: Access health and wellness products
- **Consultations**: Healthcare provider booking system

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
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add necessary environment variables:

```env
# Frontend Environment Variables
VITE_SERVER_URL=https://shesync.onrender.com/
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_API_NINJAS_KEY=your_api_ninjas_key_here
VITE_NODE_ENV=development

# Backend Environment Variables
MONGO_URL=
APP_NAME=shesync
FRONTEND_URL=
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
PORT=3000
```

4. Start the development server:

```bash
npm run dev
```
5. To use the Dockerfile, you need to have Docker installed on your machine. Follow these steps:

a. Build the Docker image by running the following command from the root directory of the project: <br/>
**For Frontend**:
```bash
    docker build -t shesync-frontend .
```
- to run Frontend:
```bash
    docker run -it -p 5173:5173 shesync-frontend
```

**For Backend** (You have to be in Backend folder) :
```bash
    docker build -t shesync-backend .
```
- to run Backend:
```bash
    docker run -it -p 3000:3000 shesync-backend
```
**To build both the docker Images at once**
```bash
    docker-compose up --build
```
**To run both the docker Images at once**
```bash
    docker-compose up
```

## 🏗️ Project Structure

```
src/
├── components/                    # Reusable UI components
│   ├── Landing.jsx              # Main landing page component
│   ├── Dashboard.jsx            # User dashboard interface
│   ├── ParentDashboard.jsx      # Enhanced parent dashboard 
│   ├── PartnerDashboard.jsx     # Partner-specific dashboard
│   ├── PeriodTracker.jsx        # Period tracking functionality
│   ├── SymptomAnalysis.jsx      # Health symptom analysis tool
│   ├── Chatbot.jsx              # AI-powered health assistant
│   ├── CommunityChat.jsx        # Community chat interface
│   ├── Forum.jsx                # Community forum component
│   ├── Blogs.jsx                # Health blog section
│   ├── Consultations.jsx        # Healthcare consultation booking
│   ├── Ecom.jsx                 # E-commerce shop interface
│   ├── Login.jsx                # User authentication
│   ├── Signup.jsx               # User registration
│   ├── Quiz.jsx                 # Health assessment quiz
│   ├── PrivacyForm.jsx          # Privacy policy form
│   ├── Bliss/                   # Wellness games and activities
│   │   ├── Bliss.jsx           # Main wellness hub
│   │   └── games/              # Interactive games
│   │       ├── Quiz.jsx        # Health quiz game
│   │       ├── Sudoku.jsx      # Brain training game
│   │       ├── MemoryGame.jsx  # Memory enhancement game
│   │       ├── Moodmap.jsx     # Mood tracking game
│   │       ├── SimonGame.jsx   # Pattern recognition game
│   │       ├── Hangman.jsx     # Word game
│   │       └── QuoteJoke.jsx   # Entertainment content

│
├── utils/                       # Utility functions and helpers
│   └── gemini.js               # Google Gemini AI integration
│
├── styles/                      # Global styles and CSS
│   └── index.css               # Main stylesheet
│
├── App.jsx                      # Main application component
├── main.jsx                     # Application entry point
└── index.css                    # Global styles

public/                          # Static assets
├── images/                      # Image assets
└── icons/                       # Icon assets

Backend/                         # Backend server code
├── controllers/                 # Route controllers
├── models/                      # Database models
├── routes/                      # API routes
└── config/                      # Configuration files
```

### Key Components Overview

#### Core Features

* **Landing Page**: Main entry point with feature showcase and navigation
* **Dashboard**: Personalized user interface with health metrics and quick actions
* **Period Tracker**: Menstrual cycle tracking and analysis
* **Symptom Analysis**: AI-powered health symptom assessment
* **Chatbot**: AI health assistant powered by Google Gemini

#### Community Features

* **Forum**: Community discussion platform
* **Community Chat**: Real-time chat functionality
* **Blogs**: Health and wellness articles


#### User Management

* **Login/Signup**: User authentication and registration with **Clerk** authentication system
* **PrivacyForm**: Privacy policy and data handling
* **Quiz**: Initial health assessment

#### Healthcare Services

* **Consultations**: Healthcare provider booking system
* **Ecom**: Health and wellness product marketplace

#### Specialized Dashboards

* **ParentDashboard**: Enhanced features for parents/guardians 
  - Multi-child health tracking
  - Privacy controls and data protection
  - Communication logs and analytics
  - Quick actions and search functionality
* **PartnerDashboard**: Features for partners/spouses

### Technology Stack Details

#### Frontend Architecture

* **React Components**: Modular, reusable UI components
* **State Management**: React hooks and context
* **Routing**: React Router for navigation
* **Styling**: TailwindCSS for responsive design
* **Animations**: Framer Motion for smooth transitions

#### Backend Integration

* **API Integration**: Axios for HTTP requests
* **Authentication**: Clerk middleware Authentication
* **Database**: MongoDB for data storage with Mongoose ODM
* **Real-time Features**: WebSocket integration
* **Health Analytics**: Advanced data processing and insights
* **Privacy Management**: Secure data handling and access controls

#### Development Tools

* **Build Tool**: Vite for fast development
* **Code Quality**: ESLint for code linting
* **Version Control**: Git for source control
* **Package Management**: npm for dependencies

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style Guidelines

* Follow the existing code style
* Use meaningful variable and function names
* Add comments for complex logic
* Write unit tests for new features
* Ensure all tests pass before submitting a PR
* Follow accessibility guidelines for inclusive design

## 📝 Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

* All contributors who have helped shape this project
* The open-source community for their invaluable tools and libraries
* Healthcare professionals who have provided guidance and expertise

## 🚀 Quick Start

### Running the Application

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env` file with all required API keys (see Installation section above)

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open `http://localhost:5173` in your browser

### Key Features to Explore

- **Enhanced Parent Dashboard**: Navigate to see Indian cultural integration
- **Health Analytics**: View mood trends and wellness metrics
- **Privacy Settings**: Configure data sharing and access controls
- **Quick Actions**: Easy access to common functions
- **Search & Filter**: Find information quickly

## 📞 Support

If you need help or have questions, please:

* Open an issue in the GitHub repository
* Contact the maintainers
* Join our community forum
* Check the [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines

---
