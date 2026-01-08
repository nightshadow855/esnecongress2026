import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ReactLenis, useLenis } from "lenis/react"; //smooth scroll
import GradientBackground from "./components/ui/GradientBackground";
import ProgressBarOnScroll from "./components/animations/ProgressBarOnScroll.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProgressBarOnScroll>
      <ReactLenis root>
        {/* <div id="tsparticles" className="fixed inset-0 z-[-1] hidden sm:block">
          <MovingParticles />
        </div>*/}
        {/* Background Overlay 
        <div className="fixed inset-0 z-[-1] h-screen w-full bg-black opacity-50 lg:hidden"></div>*/}
        <div className="z-[-2] mx-auto min-h-screen w-full overflow-hidden">
          <div className="bg-primary fixed inset-0 z-[-10] h-screen w-screen">
            <GradientBackground />
            {/*Overlay */}
            <div className="absolute inset-0 h-screen w-screen bg-black/20"></div>
          </div>
          <App />
        </div>
      </ReactLenis>
    </ProgressBarOnScroll>
  </React.StrictMode>,
);
