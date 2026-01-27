import Gmap from "./ui/Gmap";

import { motion } from "framer-motion";

function VenueContent({ data }) {
  return (
    <div className="content-container flex w-full flex-col justify-center px-5">
      <h1 className="mb-2 text-center text-2xl font-extrabold text-white">
        {data.venueTitle}
      </h1>
      <div className="my-5 flex flex-wrap items-center justify-center gap-5">
        {data.venueImages &&
          data.venueImages.map((item, index) => (
            <img
              key={`venueimg-${index}`}
              src={item.image}
              alt={item.caption}
              loading="lazy"
              className="h-400px w-full rounded-xl border-[3px] border-white object-cover sm:max-w-[400px] md:max-w-[500px]"
            />
          ))}
      </div>
      {data.venueDescription &&
        data.venueDescription.map((item, index) => (
          <p
            key={`venuep-${index}`}
            className="my-2 text-left text-base text-white"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      <div className="my-5 w-full">
        <Gmap url={data.venueMapUrl} height={400} />
      </div>
      <a
        href={data.venueButtonLink}
        className="mt-5"
        target="_blank"
        rel="noreferrer"
      >
        <motion.button
          initial={{ scale: 1, rotate: "0deg" }}
          whileHover={{ scale: 1.1, rotate: "5deg" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`glow-on-hover ml-2 max-w-[400px] cursor-pointer rounded-full bg-white p-5 text-base font-bold text-black transition-colors duration-300 ease-linear`}
        >
          {data.venueButtonTxt}
        </motion.button>
      </a>
    </div>
  );
}

export default VenueContent;
