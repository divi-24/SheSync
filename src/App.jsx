import { useState, useEffect } from "react";
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Landing } from "./components/Landing";
import { Forum } from "./components/Forum";
import { Blogs } from "./components/Blogs";
import { Consultations } from "./components/Consultations";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { PeriodTracker } from "./components/PeriodTracker";
import { Ecom } from "./components/Ecom";
import { Chatbot } from "./components/Chatbot";
import { Dashboard } from "./components/Dashboard";
import OvulationCalculator from "./components/OvulationCalculator";
import { ModernTeamShowcase } from "./components/ModernTeamShowcase";
import { SymptomAnalysis } from "./components/SymptomAnalysis";
import { ParentDashboard } from "./components/ParentDashboard";
import { Diagnosis } from "./components/PartnerDashboard";
import { ThemeProvider } from "./context/ThemeContext";
import SheSyncLoader from "./components/loader";
import Bliss from "./components/Bliss/Bliss";
import Quiz from "./components/Bliss/games/Quiz";
import Sudoku from "./components/Bliss/games/Sudoku";
import MemoryGame from "./components/Bliss/games/MemoryGame";
import QuoteJoke from "./components/Bliss/games/QuoteJoke";
import MoodMap from "./components/Bliss/games/Moodmap";
import SimonGame from "./components/Bliss/games/SimonGame";

function ProtectedRouteWrapper({ Component }) {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <Component />;
}

const ProtectedRoute = (Component) => {
  return () => <ProtectedRouteWrapper Component={Component} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/forums",
    element: <ProtectedRouteWrapper Component={Forum} />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/ovulationcalculator",
    element: <OvulationCalculator />,
  },
  {
    path: "/consultations",
    element: <ProtectedRouteWrapper Component={Consultations} />,
  },
  {
    path: "/tracker",
    element: <ProtectedRouteWrapper Component={PeriodTracker} />,
  },
  {
    path: "/Ecom",
    element: <ProtectedRouteWrapper Component={Ecom} />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/ChatBot",
    element: <ProtectedRouteWrapper Component={Chatbot} />,
  },
  {
    path: "/Dashboard",
    element: <ProtectedRouteWrapper Component={Dashboard} />,
  },
  {
    path: "/team",
    element: <ModernTeamShowcase />,
  },
  {
    path: "/symptomsanalyzer",
    element: <ProtectedRouteWrapper Component={SymptomAnalysis} />,
  },
  {
    path: "/parents",
    element: <ProtectedRouteWrapper Component={ParentDashboard} />,
  },
  {
    path: "/partner",
    element: <ProtectedRouteWrapper Component={Diagnosis} />,
  },
  {
    path: "/bliss",
    element: <ProtectedRouteWrapper Component={Bliss} />,
  },
  {
    path: "/bliss/quiz",
    element: <ProtectedRouteWrapper Component={Quiz} />,
  },
  {
    path: "/bliss/sudoku",
    element: <ProtectedRouteWrapper Component={Sudoku} />,
  },
  {
    path: "/bliss/memory-game",
    element: <ProtectedRouteWrapper Component={MemoryGame} />,
  },
  {
    path: "/bliss/joke-quote",
    element: <ProtectedRouteWrapper Component={QuoteJoke} />,
  },
  {
    path: "/bliss/mood-map",
    element: <ProtectedRouteWrapper Component={MoodMap} />,
  },
  {
    path: "/bliss/simon",
    element: <ProtectedRouteWrapper Component={SimonGame} />,
  },
]);

function App() {
  const [loading, setLoading] = useState(() => {
    // 🔥 Only show the loader once per session
    return !sessionStorage.getItem("loaderShown");
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loaderShown", "true"); // 🧠 Remember it
      }, 6000); // Adjust if needed
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <ThemeProvider>
      {loading ? <SheSyncLoader /> : <RouterProvider router={router} />}
    </ThemeProvider>
  );
}

export default App;
