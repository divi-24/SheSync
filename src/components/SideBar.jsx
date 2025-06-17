import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  Gamepad2,
  AppWindowMac,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  HeartHandshake,
  Handshake , 
  Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton , SignUpButton} from "@clerk/clerk-react";

export default function SideBar({sidebarVisible , setSidebarVisible , activeLink}) {
    const navigate = useNavigate();

    const { width, height } = useScreenSize();

    const SidebarLink = ({ icon, label, onClick, active = false }) => {
        return (
            <button
            onClick={onClick}
            className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
                active
                ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
                : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
            }`}
            >
            {icon}
            <span>{label}</span>
            </button>
        );
    };

    useEffect( () => {
        if (width < 816) {
            setSidebarVisible(false);
        } else {
            setSidebarVisible(true);
        }
    } , []);
    
    let active = [false , false ,false , false , false , false , false , false , false , false , false , false , false , false];

    if (activeLink) { active[activeLink] = true; }  

    return (   
        (!sidebarVisible && width < 816 ) ?
        <div className="fixed top-0 left-0 w-fit p-2 my-6 mx-2 transition-all duration-300 ease-in-out bg-pink-100 rounded-3xl z-50">
            <Menu size={24} className="text-black" onClick={() => setSidebarVisible(true)} />
        </div>  :  
    <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 min-h-screen p-4 z-50 fixed transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="px-4 py-4 flex flex-col space-y-2">
            {width < 816 && (<Menu size={24} className="text-black dark:text-white" onClick={() => setSidebarVisible(false)} />)}
          
          <div className="flex items-start">
            <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 ">
              SheSync
            </h1>
            <div className="block ml-auto">
            <SignedIn>
              <UserButton/>
            </SignedIn>
            </div>
          </div>

           <SignedOut>
            <div className="flex my-4">
              <SignInButton className={`text-black dark:text-white dark:bg-pink-900 rounded-2xl py-2 w-[40%] block m-auto text-[0.8em]`} mode="modal"/>
              <SignUpButton className={`text-black dark:text-white dark:bg-pink-900 rounded-2xl py-2 w-[40%] block m-auto text-[0.8em]`} mode="modal"/>
            </div>
          </SignedOut>

          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
            active={active[0]}
          />
          <SidebarLink
            icon={<Home size={20} />}
            label="Home"
            onClick={() => navigate("/")}
            active={active[1]}
          />
          <SidebarLink
            icon={<GraduationCap size={20} />}
            label="Education"
            onClick={() => navigate("/blogs")}
            active={active[2]}
          />
          <SidebarLink
            icon={<ShoppingBag size={20} />}
            label="Shop"
            onClick={() => navigate("/Ecom")}
            active={active[3]}
          />
          <SidebarLink
            icon={<ActivitySquare size={20} />}
            label="Track Your Health"
            onClick={() => navigate("/tracker")}
            active={active[4]}
          />
          <SidebarLink
                      icon={<ClipboardList size={20} />}
                      label="PCOS Diagnosis"
                      onClick={() => navigate("/partner")}
                      active={active[5]}
                    />
          <SidebarLink
            icon={<Stethoscope size={20} />}
            label="Expert Consultation"
            onClick={() => navigate("/consultations")}
            active={active[6]}
          />
          <SidebarLink
            icon={<Bot size={20} />}
            label="Eve"
            onClick={() => navigate("/ChatBot")}
            active={active[7]}
          />
          <SidebarLink
            icon={<HeartPulse size={20} />}
            label="HealthLens"
            onClick={() => navigate("/symptomsanalyzer")}
            active={active[8]}
          />
          <SidebarLink
            icon={<AppWindowMac size={20} />}
            label="Parent's Dashboard"
            onClick={() => navigate("/parents")}
            active={active[9]}
          />
          <SidebarLink
            icon={<MessageSquare size={20} />}
            label="Forums"
            onClick={() => navigate("/forums")}
            active={active[10]}
          />
          <SidebarLink
            icon={<HeartHandshake size={20} />}
            label="ShareJoy"
            onClick={() => 
              window.open(
                "https://thepadproject.org/donate/"
                )  
              }
              active={active[11]}
          />
          <SidebarLink
            icon={<Gamepad2 size={20} />}
            label="Bliss"
            onClick={() =>
              window.open(
                "https://she-syncgame.vercel.app/",
                "_blank"
              )
            }
            active={active[12]}
          />
          <SidebarLink
            icon={<Handshake size={20} />}
            label="NGO's"
            onClick={() =>
              window.open(
                "https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html",
                "_blank"
              )
            }
            active={active[13]}
          />
        </div>
      </aside>
      );
}