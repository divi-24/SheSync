import  {ProtectedRouteWrapper}  from "../App";
import {Landing} from "../components/Landing";
import {Forum} from "../components/Forum";
import {Blogs} from "../components/Blogs";
import OvulationCalculator from "../components/OvulationCalculator";
import {Consultations} from "../components/Consultations";
import {PeriodTracker} from "../components/PeriodTracker";
import PeriodProducts from "../components/PeriodProducts";
import {Ecom} from "../components/Ecom";
import {Signup} from "../components/Signup";
import {Login} from "../components/Login";
import {Chatbot} from "../components/Chatbot";
import {Dashboard} from "../components/Dashboard";
import {SymptomAnalysis} from "../components/SymptomAnalysis";
import {ParentDashboard} from "../components/ParentDashboard";
import {Diagnosis} from "../components/PartnerDashboard";
import Bliss from "../components/Bliss/Bliss";
import Quiz from "../components/Bliss/games/Quiz";
import Sudoku from "../components/Bliss/games/Sudoku";
import MemoryGamePage from "../components/Bliss/games/MemoryGame";
import QuoteJoke from "../components/Bliss/games/QuoteJoke";
import MoodMap from "../components/Bliss/games/Moodmap";
import SimonGame from "../components/Bliss/games/SimonGame";
import Contributors from "../components/Contributors";
import DietPlan from "../components/Diet-plan";
import Hangman from "../components/Bliss/games/Hangman";
import Globalchat from "../components/Globalchat";

export const appRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/forums",
    element: <ProtectedRouteWrapper Component={Forum} />,
  },
  {
    path: "/forums/globalchat",
    element: <ProtectedRouteWrapper Component={Globalchat} />,
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
    // element: <ProtectedRouteWrapper Component={Ecom} />,
    element: <Ecom/>,
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
    path: "/symptomsanalyzer",
    element: <ProtectedRouteWrapper Component={SymptomAnalysis} />,
  },
  {
    path: "/parents",
    element: <ProtectedRouteWrapper Component={ParentDashboard} />,
  },
  {
    path: "/periodproducts",
    element: <PeriodProducts/>,
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
    element: <ProtectedRouteWrapper Component={MemoryGamePage} />,
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
    path: "/bliss/Hangman",
    element: <ProtectedRouteWrapper Component={Hangman} />,
  },
  {
    path: "/bliss/simon",
    element: <ProtectedRouteWrapper Component={SimonGame} />,
  },
  {
    path: "/contributors",
    element: <Contributors />
  },
  {
    path: "/diet-plan",
    element: <DietPlan />
  },
];
