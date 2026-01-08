import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function ScrollImage() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (isHomePage ? 800 : 100)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <motion.img
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 0.8, ease: "easeOut" },
      }}
      src="/webp/logo-graphic.webp"
      alt="Esne Graphic Logo"
      className="pointer-events-none fixed -right-20 bottom-0 -z-1 hidden h-auto max-w-[500px] object-contain xl:block"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 5%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%)",
      }}
    />
  );
}

export default ScrollImage;
