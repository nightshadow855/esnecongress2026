import { motion, useScroll, useTransform } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";

const ScrollScaleImage = ({
  src,
  alt,
  initialScale = 1,
  finalScale = 0.8,
  endTarget = 1,
}) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(
    scrollYProgress,
    [0, endTarget],
    [initialScale, finalScale],
  );

  return (
    <motion.div className="fixed inset-0 z-[-2] overflow-hidden">
      <motion.div
        style={{
          scale,
          transformOrigin: "left top",
        }}
        className="relative"
      >
        <LazyLoadImage
          src={src}
          alt={alt}
          className="min-h-screen w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

ScrollScaleImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  initialScale: PropTypes.number,
  finalScale: PropTypes.number,
};

export default ScrollScaleImage;
