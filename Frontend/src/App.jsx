import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/forums",
    element: <Forum />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/consultations",
    element: <Consultations />,
  },
  {
    path: "/tracker",
    element: <PeriodTracker />,
  },
  {
    path: "/Ecom",
    element: <Ecom />,
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
    element: <Chatbot />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/team",
    element: <ModernTeamShowcase />,
  },
  {
    path: "/symptomsanalyzer",
    element: <SymptomAnalysis />,
  },
  {
    path: "/parents",
    element: <ParentDashboard />,
  },
  {
    path: "/partner",
    element: <Diagnosis />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
