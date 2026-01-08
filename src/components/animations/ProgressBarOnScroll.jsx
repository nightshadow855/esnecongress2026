import React, { useEffect, useState } from "react";
import {
  color,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

function ProgressBarOnScroll({ children }) {
  const [color, setColor] = useState("#fffff");

  useEffect(() => {
    window.innerWidth <= 768 ? setColor("#ffffff") : setColor("#ffffff");
  }, []);

  const { scrollYProgress } = useScroll(); //get the scroll progress
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 90 }); //create a spring animation
  const backgroundColor = useTransform(scaleX, [0, 1], [color, color]); //change the background color based on the scroll progress
  return (
    <>
      <motion.div
        id="progressbar"
        className="fixed top-0 z-110 h-[5px] w-full origin-left opacity-100"
        style={{
          scaleX: scaleX,
          backgroundColor: backgroundColor,
        }}
      ></motion.div>
      {children}
    </>
  );
}

export default ProgressBarOnScroll;
