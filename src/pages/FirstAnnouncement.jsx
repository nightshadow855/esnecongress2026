import { useEffect } from "react";
import PdfViewerGdrive from "@/components/PdfViewerGdrive";
import { motion } from "framer-motion";
import PdfViewerVerticalScroll from "@/components/PdfViewerVerticalScroll";

function FirstAnnouncement() {
  //set the title of the page
  useEffect(() => {
    document.title =
      "Α' Ανακοίνωση | 53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος 6-9 Μαΐου 2026, Κεφαλονιά";
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
      className="min-h-screen w-full py-10"
    >
      <PdfViewerVerticalScroll url="/data/first-announcement.json" />
    </motion.div>
  );
}

export default FirstAnnouncement;
