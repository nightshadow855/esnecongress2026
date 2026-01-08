import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollContainer = ({ children }) => {
  const [initialScale, setInitialScale] = useState(0.5);
  const [finalScale, setFinalScale] = useState(1);
  const [endTarget, setEndTarget] = useState(0.2);
  const { scrollYProgress } = useScroll();

  //change initial scale depending on screen size

  useEffect(() => {
    setInitialScale(window.innerWidth > 1024 ? 0.8 : 1);
    setEndTarget(window.innerWidth > 1024 ? 0.5 : 0);
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
      className="relative mx-auto h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default ScrollContainer;
