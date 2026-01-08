"use client";

import { useEffect, useRef } from "react";
import { Gradient } from "./Gradient";

/**
 * Client-side Gradient Background Component
 * Wraps the Stripe-style WebGL gradient animation in a proper Next.js client component
 *
 * This component:
 * - Only renders on the client side (no SSR issues)
 * - Initializes the gradient after component mount
 * - Cleans up properly on unmount
 * - Uses the colors defined in globals.css
 */
export default function GradientBackground() {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    // Only initialize if we have a canvas element
    if (!canvasRef.current) return;

    // Check if gradient already exists to prevent double initialization
    if (gradientRef.current) return;

    // Initialize the gradient
    try {
      const gradient = new Gradient();
      gradient.initGradient("#gradient-canvas");
      gradientRef.current = gradient;

      console.log("✅ Gradient initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize gradient:", error);
    }

    // Cleanup function
    return () => {
      if (gradientRef.current) {
        try {
          // Disconnect the gradient (removes event listeners, etc.)
          if (typeof gradientRef.current.disconnect === "function") {
            gradientRef.current.disconnect();
          }
          // Pause the animation
          if (typeof gradientRef.current.pause === "function") {
            gradientRef.current.pause();
          }
          gradientRef.current = null;
          console.log("🧹 Gradient cleaned up");
        } catch (error) {
          console.error("⚠️ Error during gradient cleanup:", error);
        }
      }
    };
  }, []); // Empty dependency array = run once on mount

  return (
    <>
      <canvas
        ref={canvasRef}
        id="gradient-canvas"
        data-js-darken-top
        className="fixed top-0 left-0 -z-20 h-full w-full"
        style={{
          // CSS variables are defined in globals.css
          "--gradient-color-1": "#2f4aa0",
          "--gradient-color-2": "#00a1df",
          "--gradient-color-3": "#2f4aa0",
          "--gradient-color-4": "#00a1df",
        }}
      />
      {/* Overlay to darken top for better text contrast 
      <div className="fixed top-0 left-0 -z-10 h-full w-full bg-gradient-to-b from-[#f1f1e5] to-white opacity-50" />*/}
    </>
  );
}
