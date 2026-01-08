"use client";
import React, { useState, useEffect } from "react";
import FetchDataForComponents from "./FetchDataForComponents";
import Loader from "./ui/Loader";
import { FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import { goBack } from "@/lib/utils";

function PdfViewerGdrive({ url }) {
  const [viewerVisible, setViewerVisible] = useState(false);
  useEffect(() => {
    // Smooth scroll to the "scprogram" div when the component mounts
    const scProgramDiv = document.getElementById("scprogram");
    if (scProgramDiv) {
      scProgramDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, [url]);
  const { data, loading, error } = FetchDataForComponents(url);

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

  // Render component with fetched data
  return (
    <div className="fixed top-0 left-0 z-150 flex h-screen w-full flex-col bg-black">
      {data.link ? (
        <div className="relative flex w-full flex-col">
          <div
            className={`${
              viewerVisible ? "hidden" : "block"
            } z-50 flex h-screen w-full flex-col items-center justify-center`}
          >
            <Loader />
          </div>
          {/*Download & close Button */}
          <div
            className={`absolute right-5 bottom-16 z-150 flex max-w-[150px] flex-col gap-2 py-2 md:right-16 ${
              viewerVisible ? "block" : "hidden"
            } `}
          >
            {/*Download Button */}
            <motion.a
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href={data.download}
              download={data.filename || "document.pdf"}
              rel="noreferrer"
              className="border-accent-color bg-main-color flex items-center justify-center rounded-full border-2 px-5 py-2 text-lg font-bold text-white"
            >
              <span className="text-base text-white">Λήψη</span>
              <FaDownload className="ml-2" />
            </motion.a>
            {/*Close Button */}
            <motion.a
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              href="/"
              rel="noreferrer"
              className="border-main-color bg-accent-color flex items-center justify-center rounded-full border-2 px-5 py-2 text-lg font-bold text-white"
            >
              <span className="text-base text-white">Κλείσιμο</span>
            </motion.a>
          </div>

          {data.temporary && (
            <h2 className="absolute top-0 w-full bg-red-600 py-5 text-center text-base text-white">
              Προκαταρκτικό Επιστημονικό Πρόγραμμα
            </h2>
          )}
          <iframe
            src={data.link}
            className={`h-screen w-full ${viewerVisible ? "block" : "hidden"}`}
            onLoad={() => {
              setViewerVisible(true);
            }}
          ></iframe>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="flex min-h-screen flex-col items-center justify-center gap-5 px-5 py-10"
        >
          <p className="text-center text-lg font-bold text-white">
            Το Επιστημονικό Πρόγραμμα Θα ανακοινωθεί σύντομα
          </p>
          <motion.button
            onClick={goBack}
            initial={{ scale: 1, rotate: "0deg" }}
            whileHover={{ scale: 1.05, rotate: "2deg" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-titles-color glow-on-hover rounded-full px-8 py-4 text-base font-bold text-black shadow-lg transition-all duration-300 ease-linear hover:shadow-xl"
          >
            Επιστροφή
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default PdfViewerGdrive;
