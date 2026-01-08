import React from "react";
import { motion, spring } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function SpeakerCard({ name, affiliation, image, bioUrl }) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      spring={{ type: "spring", stiffness: 500, damping: 30 }}
      key={`id-${name}`}
      className="l glow-on-hover flex w-[350px] max-w-[450px] flex-col items-center justify-start gap-2 rounded-xl bg-white bg-opacity-70 p-5 drop-shadow-xl xs:min-h-[400px] md:w-[400px]"
    >
      <LazyLoadImage
        src={image || "/jpg/unknown.jpg"}
        alt={`${name}`}
        className="max-w-[160px] rounded-full border-2 border-main-color object-contain"
        effect="blur"
      />
      <p className="text-center text-lg font-bold text-main-color">
        {`${name} ` || "Name"}
      </p>

      <p className={`text-center text-sm italic text-main-color`}>
        {" "}
        {affiliation}
      </p>
      {bioUrl && (
        <a href={bioUrl} target="_blank" rel="noreferrer">
          <motion.button
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`l-2 glow-on-hover max-w-[400px] rounded-xl bg-main-color px-5 py-2 font-bold text-white transition-colors duration-300 ease-linear lg:text-base`}
          >
            Short Bio
          </motion.button>
        </a>
      )}
    </motion.div>
  );
}

export default SpeakerCard;
