import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function PageHeaderImage() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Don't render on home page
  if (isHomePage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      <img
        src="/webp/fasa.webp"
        alt="Header"
        className="mt-32 h-auto w-full object-cover lg:mt-20"
      />
    </motion.div>
  );
}

export default PageHeaderImage;
