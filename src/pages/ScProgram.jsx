import { useEffect } from "react";
import PdfViewerGdrive from "@/components/PdfViewerGdrive";
import { motion } from "framer-motion";
import PdfViewerVerticalScroll from "@/components/PdfViewerVerticalScroll";

function ScProgram() {
  //set the title of the page
  useEffect(() => {
    document.title =
      "Επιστημονικό Πρόγραμμα | 53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος 6-9 Μαΐου 2026, Κεφαλονιά";
    return () => {
      document.title =
        "53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος"; // Reset on unmount
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="relative min-h-screen w-full py-10"
    >
      <PdfViewerGdrive url="/data/scprogram.json" />
    </motion.div>
  );
}

export default ScProgram;
