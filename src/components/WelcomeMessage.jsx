import FetchDataForComponents from "./FetchDataForComponents";
import React, { useEffect, useState } from "react";
import Loader from "./ui/Loader";
import { v4 as uuidv4 } from "uuid";
import Reveal from "./animations/Reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaInfoCircle } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
function WelcomeMessage() {
  const { data, loading, error } = FetchDataForComponents(
    "/data/welcomemessage.json",
  );

  if (loading)
    return (
      <div className="my-20 flex h-screen flex-col items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="my-20 flex flex-col items-center justify-center">
        Error: {error}
      </div>
    );
  if (!data || data.tba) return null;

  return (
    <article
      id="about"
      className="z-10 mx-auto mt-5 flex w-full max-w-[1176px] flex-col p-5"
    >
      {data.intro && (
        <Reveal key={uuidv4()}>
          <p key="intro" className="text-left text-base font-bold text-white">
            {data.intro}
          </p>
        </Reveal>
      )}
      {data.Paragraphs &&
        data.Paragraphs.length > 0 &&
        data.Paragraphs.map((paragraph, index) => (
          <Reveal key={uuidv4()}>
            <p
              key={`paragraph-${index}`}
              className="mt-5 text-justify text-base text-white sm:text-left"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          </Reveal>
        ))}

      {data.outro && (
        <Reveal key={uuidv4()}>
          <p
            className="mt-5 text-center text-base text-white italic"
            dangerouslySetInnerHTML={{ __html: data.outro }}
          ></p>
        </Reveal>
      )}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.signatures.length > 0 &&
          data.signatures.map((signature, index) => (
            <p
              key={`signature-${index}`}
              className="bg-titles-color text-main-color rounded-lg p-4 text-center text-base font-bold italic"
              dangerouslySetInnerHTML={{ __html: signature }}
            ></p>
          ))}
      </div>
      {data.buttonLink && data.buttonTxt && (
        <div className="mt-5 flex w-full items-center justify-center">
          <a href={data.buttonLink}>
            <motion.button
              initial={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              transition={{ duration: 0.3, ease: "easeInOut", spring: 300 }}
              className="bg-accent-color mx-auto rounded-lg px-5 py-2 text-base font-bold text-white"
            >
              {data.buttonTxt}
            </motion.button>
          </a>
        </div>
      )}
    </article>
  );
}

export default WelcomeMessage;
