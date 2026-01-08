import React from "react";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Hero() {
  return (
    <motion.div className="relative grid min-h-screen w-full grid-cols-1 gap-4 p-5 sm:grid-cols-[2fr_1fr] sm:p-0">
      <motion.div className="mt-32 flex w-full flex-col items-center justify-center sm:ml-12 sm:mt-0 sm:items-start">
        <LazyLoadImage
          src="/webp/header-title.webp"
          alt="Conference on `Corporate Governance, Sustainability & Diversity: Moving Forward `"
          className="hidden w-full object-contain md:block"
        />
        <LazyLoadImage
          src="/webp/header-title-mobile.webp"
          alt="Conference on `Corporate Governance, Sustainability & Diversity: Moving Forward `"
          className="w-full object-contain md:hidden"
        />
        <LazyLoadImage
          src="/webp/when-where.webp"
          alt="Conference on `Corporate Governance dates and place"
          className="mt-12 w-full object-contain sm:mt-10 sm:max-w-[600px]"
        />
        <LazyLoadImage
          src="/webp/co-organization.webp"
          alt="Coorganization logos"
          className="mt-12 w-full object-contain sm:mt-16 sm:max-w-[600px]"
        />
      </motion.div>
    </motion.div>
  );
}

export default Hero;
