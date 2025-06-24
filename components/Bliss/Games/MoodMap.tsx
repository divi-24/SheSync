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
import { useRouter } from "next/router";

interface MoodMapProps {
    // Add any props if needed
}

type EmotionType = 'happy' | 'sad' | 'angry' | 'surprised' | 'disgusted' | 'fearful' | 'neutral';

const MoodMap: React.FC<MoodMapProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [emotion, setEmotion] = useState<EmotionType>('neutral');
    const [age, setAge] = useState<string | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const router = useRouter();
    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    useEffect(() => {
        const MODEL_URL = "/bliss/models";

        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
                ]);
            } catch (error) {
                console.error("Failed to load models:", error);
            }
        };

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 500, height: 350 } 
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera access denied or not available:", err);
            }
        };

        const detect = async () => {
            const options = new faceapi.TinyFaceDetectorOptions({ 
                inputSize: 224,
                scoreThreshold: 0.5
            });

            intervalRef.current = setInterval(async () => {
                if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;

                try {
                    const result = await faceapi
                        .detectSingleFace(videoRef.current, options)
                        .withFaceLandmarks()
                        .withFaceExpressions()
                        .withAgeAndGender();

                    if (result) {
                        // Create a new object with the expression values
                        const expressions = {
                            neutral: result.expressions.neutral,
                            happy: result.expressions.happy,
                            sad: result.expressions.sad,
                            angry: result.expressions.angry,
                            fearful: result.expressions.fearful,
                            disgusted: result.expressions.disgusted,
                            surprised: result.expressions.surprised
                        };

                        // Find the dominant expression
                        const maxExp = Object.entries(expressions).reduce(
                            (prev, current) => (prev[1] > current[1] ? prev : current)
                        );

                        setEmotion(maxExp[0] as EmotionType);
                        setAge(Math.round(result.age).toString());
                        setGender(result.gender);
                    }
                } catch (error) {
                    console.error("Face detection error:", error);
                }
            }, 1500);
        };

        const initialize = async () => {
            await loadModels();
            await startVideo();
            await detect();
        };

        initialize();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const getExpressionIcon = (expression: EmotionType) => {
        const iconProps = { className: "w-6 h-6" };

        switch (expression) {
            case "happy":
                return <Smile {...iconProps} />;
            case "sad":
                return <Frown {...iconProps} />;
            case "angry":
                return <Flame {...iconProps} />;
            case "surprised":
                return <Zap {...iconProps} />;
            case "disgusted":
                return <Skull {...iconProps} />;
            case "fearful":
                return <Ghost {...iconProps} />;
            case "neutral":
            default:
                return <Meh {...iconProps} />;
        }
    };

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="flex h-screen bg-pink-50 dark:bg-gray-950 overflow-hidden">
            <Sidebar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={13}
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
                    className={`transition-transform duration-300 block m-auto ${
                        sidebarVisible ? "rotate-180" : "rotate-0"
                    }`}
                />
            </button>
            <button
                onClick={() => router.push("/bliss")}
                className="fixed top-4 right-4 z-30 lg:z-40 flex items-center gap-2 bg-white text-pink-600 border border-pink-300 hover:bg-pink-100 dark:bg-gray-900 dark:text-pink-400 dark:border-pink-800 dark:hover:bg-gray-800 transition px-4 py-2 rounded-md text-sm shadow-md"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Bliss Page
            </button>

            <div
                className={`flex-1 transition-all duration-300 ${
                    sidebarVisible ? "lg:ml-64" : "ml-0"
                } p-6 flex flex-col items-center justify-center text-center`}
            >
                <h1 className="text-4xl font-bold text-pink-700 dark:text-pink-300 mb-6">
                    Mood Map
                </h1>

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    width={500}
                    height={350}
                    className="rounded-lg shadow-md border-4 border-pink-300 max-w-full"
                />

                <div className="mt-6 text-2xl font-semibold text-pink-700 dark:text-pink-300 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        {getExpressionIcon(emotion)} You look:{" "}
                        <span className="ml-1">{capitalize(emotion)}</span>
                    </div>
                    {age && gender && (
                        <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-300">
                            <User size={18} /> Estimated Age: {age} &nbsp; | &nbsp; Gender:{" "}
                            {capitalize(gender)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoodMap;