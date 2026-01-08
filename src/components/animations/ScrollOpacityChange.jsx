import { motion, useScroll, useTransform } from "framer-motion";
import PropTypes from "prop-types";

const ScrollOpacityChange = ({
  color = "bg-black",
  initialOpacity = 0,
  finalOpacity = 0.5,
  endTarget = 0.4,
}) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, endTarget],
    [initialOpacity, finalOpacity],
  );

  return (
    <div className="fixed inset-0 z-[-2] h-screen w-screen overflow-hidden">
      <motion.div
        style={{
          opacity,
        }}
        className={`h-full w-full ${color}`}
      />
    </div>
  );
};

ScrollOpacityChange.propTypes = {
  color: PropTypes.string,
  initialOpacity: PropTypes.number,
  finalOpacity: PropTypes.number,
  endTarget: PropTypes.number,
};

export default ScrollOpacityChange;
