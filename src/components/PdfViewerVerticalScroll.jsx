import React, { useEffect, useState } from "react";
import FetchDataForComponents from "./FetchDataForComponents";
import Loader from "./ui/Loader";
import { FaDownload } from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { motion } from "framer-motion";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js`;
function PdfViewerVerticalScroll({ url }) {
  //control zoom in and out
  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const zoomIn = () => {
    setZoom(zoom + 0.25);
  };
  const zoomOut = () => {
    setZoom(zoom - 0.25);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    // Smooth scroll to the "agenda" and "scprogram" div when the component mounts
    const pdfviewer = document.getElementById("pdfviewer");

    if (pdfviewer) {
      pdfviewer.scrollIntoView({ behavior: "smooth" });
    }

    // Determine the appropriate scale based on the screen width
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setZoom(0.5); // Mobile devices
      } else if (screenWidth < 1024) {
        setZoom(1.0); // Tablets
      } else {
        setZoom(1.5); // Desktops
      }
    };

    // Set the initial scale
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [url]);

  const { data, loading, error } = FetchDataForComponents(url);

  if (loading)
    return (
      <div className="z-100 my-20 flex h-screen flex-col items-center justify-center">
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
    data.link && (
      <div
        className="relative mx-auto mt-20 h-screen w-full md:mt-5"
        id="pdfviewer"
        data-lenis-prevent
      >
        <div
          className={`fixed right-5 bottom-[20px] z-99 flex flex-col items-center justify-center gap-2 py-2 md:right-10 md:bottom-[30px]`}
        >
          {/* Zoom Controls */}
          <div className="mb-2 flex gap-2">
            <button
              onClick={zoomOut}
              disabled={zoom <= 0.5}
              className="flex items-center justify-center rounded-full bg-gray-600 px-3 py-1 text-white disabled:opacity-50"
            >
              -
            </button>
            <span className="flex items-center rounded bg-gray-800 px-2 text-sm text-white">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              disabled={zoom >= 3}
              className="flex items-center justify-center rounded-full bg-gray-600 px-3 py-1 text-white disabled:opacity-50"
            >
              +
            </button>
          </div>

          {/* Download Button */}
          <motion.a
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            href={data.link}
            target="_blank"
            download={data.filename || "document.pdf"}
            rel="noreferrer"
            className="border-accent-color bg-main-color flex items-center justify-center rounded-full border-2 px-5 py-2 text-lg font-bold text-white"
          >
            <span className="text-base text-white">Λήψη</span>
            <FaDownload className="ml-2" />
          </motion.a>
        </div>
        {data.temporary && (
          <h2 className="w-full bg-red-600 py-5 text-center text-base text-white">
            {" "}
            Προκαταρκτικό Πρόγραμμα
          </h2>
        )}

        <div
          className={`${data.temporary ? "h-[84vh]" : "h-[95vh]"} mx-auto w-full overflow-auto`}
        >
          <Document
            file={data.link}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<Loader />}
            className="flex flex-col items-center"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                scale={zoom}
                className="mb-4 shadow-lg"
              />
            ))}
          </Document>
          <div className="from-main-color absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t to-transparent" />
        </div>
      </div>
    )
  );
}

export default PdfViewerVerticalScroll;
