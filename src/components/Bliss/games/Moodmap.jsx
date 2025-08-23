import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Sidebar from "../../SideBar";
import {
    ChevronRight,
    ArrowLeft,
    User,
    Smile,
    Frown,
    Flame,
    Zap,
    Skull,
    Ghost,
    Meh
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MoodMap() {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const [emotion, setEmotion] = useState("Neutral");
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    useEffect(() => {
        const MODEL_URL = "/bliss/models";

        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            ]);
        };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera access denied or not available:", err);
            }
        };

        const detect = async () => {
            const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });

            intervalRef.current = setInterval(async () => {
                if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;

                const result = await faceapi
                    .detectSingleFace(videoRef.current, options)
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withAgeAndGender();

                if (result) {
                    const expressions = result.expressions;
                    const maxExp = Object.entries(expressions).reduce((a, b) =>
                        a[1] > b[1] ? a : b
                    );
                    setEmotion(capitalize(maxExp[0]));
                    setAge(result.age.toFixed(0));
                    setGender(capitalize(result.gender));
                }
            }, 1500);
        };

        loadModels().then(async () => {
            await startVideo();
            await detect();
        });

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const getExpressionIcon = (expression) => {
        switch (expression.toLowerCase()) {
            case "happy":
                return <Smile />;
            case "sad":
                return <Frown />;
            case "angry":
                return <Flame />;
            case "surprised":
                return <Zap />;
            case "disgusted":
                return <Skull />;
            case "fearful":
                return <Ghost />;
            case "neutral":
            default:
                return <Meh />;
        }
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return (
        <div className="flex h-screen bg-pink-50 dark:bg-gray-950 overflow-hidden">
            <Sidebar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={16}
            />
            <button
                onClick={toggleSidebar}
                className="hidden lg:block fixed left-0 top-0 w-10 z-50 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                style={{
                    transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
                }}
                aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
            >
                <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 block m-auto ${sidebarVisible ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>
            <button
                onClick={() => navigate("/bliss")}
                className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Bliss Page
            </button>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarVisible ? "lg:ml-64" : "ml-0"} p-6 flex flex-col items-center justify-center text-center`}>
                <h1 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-6">
                    Mood Map
                </h1>

                {/* Webcam Feed */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    width="500"
                    height="350"
                    className="rounded-lg shadow-md border-4 border-pink-300 max-w-full"
                />

                {/* Result Info */}
                <div className="mt-6 text-2xl font-semibold text-pink-700 dark:text-pink-300 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        {getExpressionIcon(emotion)} You look: <span className="ml-1">{emotion}</span>
                    </div>
                    {age && gender && (
                        <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                            <User size={18} /> Estimated Age: {age} &nbsp; | &nbsp; Gender: {gender}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
