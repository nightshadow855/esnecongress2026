import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollOutContainer = ({ children }) => {
  const [initialScale, setInitialScale] = useState(0.5);
  const [finalScale, setFinalScale] = useState(0.5);
  const [endTarget, setEndTarget] = useState(0.8);
  const { scrollYProgress } = useScroll();

  //change initial scale depending on screen size

  useEffect(() => {
    setInitialScale(window.innerWidth > 1024 ? 1 : 1);
    setEndTarget(window.innerWidth > 1024 ? 0.8 : 1);
  }, [window.innerWidth]);

  const scale = useTransform(
    scrollYProgress,
    [0, endTarget],
    [initialScale, finalScale],
  );

  return (
    <motion.div
      style={{
        scale,
        transformOrigin: "center",
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default ScrollOutContainer;
