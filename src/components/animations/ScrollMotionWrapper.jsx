import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ScrollMotionWrapper({ children }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // Adjust for desired effect
  });

  // Example transformations
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="relative flex h-[200vh] items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

export default ScrollMotionWrapper;
