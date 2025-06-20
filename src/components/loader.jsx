"use client"

import { useState, useEffect } from "react"

function SheSyncLoader() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const positiveMessages = [
    "✨ Embracing your natural rhythm",
    "🌸 Your cycle is your superpower",
    "💖 Celebrating womanhood",
    "🦋 Syncing with your beautiful body",
    "🌺 Every cycle tells your story",
    "💕 You're perfectly you",
    "🌙 Honoring your feminine energy",
    "🌷 Blooming with confidence",
  ]

  const floatingEmojis = ["🌸", "🦋", "✨", "🌺", "💖", "🌙", "🌷", "💕", "🎀", "🌹"]

  useEffect(() => {
    const totalMessages = positiveMessages.length
    const totalDuration = 5000 // 5 seconds total
    const messageInterval = totalDuration / totalMessages
    const progressIncrement = 100 / totalMessages

    let messageIndex = 0
    let currentProgress = 0

    // Update progress smoothly
    const progressInterval = setInterval(() => {
      currentProgress += progressIncrement / 10 // Smooth progress updates
      setProgress(Math.min(currentProgress, 100))
    }, messageInterval / 10)

    // Update messages
    const messageTimer = setInterval(() => {
      messageIndex++
      if (messageIndex < totalMessages) {
        setCurrentMessage(messageIndex)
      } else {
        clearInterval(messageTimer)
        clearInterval(progressInterval)
        setProgress(100)
        setIsComplete(true)
        setShowSparkles(true)
      }
    }, messageInterval)

    return () => {
      clearInterval(messageTimer)
      clearInterval(progressInterval)
    }
  }, [positiveMessages.length])

  return (
    <>
      {/* Inline Styles */}
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(90deg); 
          }
        }
        
        @keyframes spin-slow {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }
        
        @keyframes spin-reverse {
          from { 
            transform: rotate(360deg); 
          }
          to { 
            transform: rotate(0deg); 
          }
        }
        
        @keyframes orbit-clockwise {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }
        
        @keyframes orbit-counter {
          from { 
            transform: rotate(360deg); 
          }
          to { 
            transform: rotate(0deg); 
          }
        }
        
        @keyframes fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        
        .animate-orbit-clockwise {
          animation: orbit-clockwise 4s linear infinite;
        }
        
        .animate-orbit-counter {
          animation: orbit-counter 6s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 3s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 3s ease-out forwards;
        }

        @media (max-width: 640px) {
          .mobile-padding {
            padding: 20px;
          }
          .mobile-text-sm {
            font-size: 14px;
          }
          .mobile-text-base {
            font-size: 16px;
          }
          .mobile-text-lg {
            font-size: 18px;
          }
        }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #fae8ff 75%, #fdf4ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        {/* Floating Background Elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="animate-float"
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: "clamp(20px, 4vw, 28px)",
                opacity: 0.15,
                color: ["#f472b6", "#ec4899", "#d946ef", "#c084fc"][i % 4],
                animationDelay: `${i * 5}s`,
                animationDuration: `${10 + Math.random() * 6}s`,
              }}
            >
              {floatingEmojis[i % floatingEmojis.length]}
            </div>
          ))}
        </div>

        {/* Sparkle Effect on Completion */}
        {showSparkles && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="animate-sparkle"
                style={{
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: "6px",
                  height: "6px",
                  background: "#fbbf24",
                  borderRadius: "50%",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        <div
          className="mobile-padding"
          style={{
            textAlign: "center",
            zIndex: 10,
            padding: "clamp(16px, 4vw, 32px)",
            maxWidth: "min(800px, 90vw)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          {/* Logo Section */}
          <div style={{ marginBottom: "clamp(32px, 6vh, 48px)" }}>
            <h1
              style={{
                fontSize: "clamp(48px, 12vw, 96px)",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #ec4899, #f43f5e, #a855f7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                marginBottom: "16px",
                lineHeight: 1.1,
              }}
            >
              SheSync
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: "clamp(16px, 3vw, 20px)",
                fontWeight: "500",
              }}
            >
              Your Journey to Confident Cycles
            </p>
          </div>

          {/* Animated Cycle Visual */}
          <div style={{ marginBottom: "clamp(32px, 6vh, 48px)", position: "relative" }}>
            <div
              style={{
                width: "clamp(96px, 20vw, 160px)",
                height: "clamp(96px, 20vw, 160px)",
                margin: "0 auto",
                position: "relative",
              }}
            >
              {/* Outer rotating ring */}
              <div
                className="animate-spin-slow"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: "4px solid #fbcfe8",
                  borderRadius: "50%",
                }}
              />

              {/* Inner counter-rotating ring */}
              <div
                className="animate-spin-reverse"
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  right: "8px",
                  bottom: "8px",
                  border: "3px solid #f9a8d4",
                  borderRadius: "50%",
                }}
              />

              {/* Pulsing center */}
              <div
                className="animate-pulse"
                style={{
                  position: "absolute",
                  top: "clamp(16px, 4vw, 24px)",
                  left: "clamp(16px, 4vw, 24px)",
                  right: "clamp(16px, 4vw, 24px)",
                  bottom: "clamp(16px, 4vw, 24px)",
                  background: "linear-gradient(135deg, #f472b6, #f43f5e, #a855f7)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "clamp(24px, 6vw, 40px)",
                  }}
                >
                  🌸
                </div>
              </div>


            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              marginBottom: "clamp(32px, 6vh, 48px)",
              height: "clamp(48px, 8vh, 64px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <p
              className="animate-fade-in"
              key={currentMessage}
              style={{
                fontSize: "clamp(16px, 3.5vw, 20px)",
                fontWeight: "500",
                color: "#374151",
                padding: "0 16px",
                textAlign: "center",
                maxWidth: "100%",
              }}
            >
              {positiveMessages[currentMessage]}
            </p>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: "clamp(300px, 80vw, 500px)",
              margin: "0 auto 24px auto",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "clamp(12px, 3vw, 16px)",
                backgroundColor: "#fbcfe8",
                borderRadius: "50px",
                overflow: "hidden",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #f472b6, #f43f5e, #a855f7)",
                  borderRadius: "50px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "width 0.3s ease-out",
                }}
              >
                <div
                  className="animate-shimmer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "clamp(12px, 2.5vw, 14px)",
                color: isComplete ? "#10b981" : "#6b7280",
                marginTop: "8px",
                fontWeight: "500",
              }}
            >
              {isComplete ? "🎉 Ready to sync!" : `${Math.round(progress)}% Complete`}
            </p>
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: "clamp(16px, 4vh, 32px)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(18px, 4vw, 20px)",
                  fontWeight: "600",
                  color: "#ec4899",
                  marginBottom: "16px",
                }}
              >
                ✨ Welcome to your journey! ✨
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  color: "#6b7280",
                }}
              >
                Redirecting to SheSync...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SheSyncLoader