import { useState, useEffect } from "react";
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { appRoutes } from "./routes/appRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import SheSyncLoader from "./components/loader";

const local_url = "http://localhost:5174/";
const render_url = "https://shesync.onrender.com/";
const server_url = import.meta.env.VITE_SERVER_URL || render_url;

export function ProtectedRouteWrapper({ Component }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
}

const router = createBrowserRouter(appRoutes);

function App() {
  const [loading, setLoading] = useState(() => {
    // 🔥 Only show the loader once per session
    return !sessionStorage.getItem("loaderShown");
  });

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    async function webhook() {
      try {
        const savedUser = await axios.post(
          import.meta.env.VITE_NODE_ENV === "production"
            ? `${server_url}api/auth/clerk-webhook`
            : `${local_url}api/auth/clerk-webhook`,
          {
            clerkId: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            email: user.emailAddresses?.[0]?.emailAddress,
          }
        );
        console.log("User saved successfully", savedUser);
      } catch (error) {
        console.log("Frontend Webhook Error in App.jsx", error);
      }
    }
    webhook();
  }, [user]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("loaderShown", "true"); // 🧠 Remember it
      }, 6000);
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
