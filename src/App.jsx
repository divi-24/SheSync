import { useState } from "react";
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
import { ModernTeamShowcase } from "./components/ModernTeamShowcase";
import { SymptomAnalysis } from "./components/SymptomAnalysis";
import { ParentDashboard } from "./components/ParentDashboard";
import { Diagnosis } from "./components/PartnerDashboard";
import { ThemeProvider } from "./context/ThemeContext";

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
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
