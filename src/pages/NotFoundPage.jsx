import { useEffect } from "react";
import { motion } from "framer-motion";
function NotFoundPage() {
  //set the title of the page
  useEffect(() => {
    document.title =
      "Η σελίδα δεν βρέθηκε | 53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος 6-9 Μαΐου 2026, Κεφαλονιά";
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
      className="z-10 flex min-h-screen w-full flex-col items-center justify-center"
    >
      <img src="/webp/404.webp" alt="404" className="object-contain" />
      <p className="text-4xl font-extrabold text-white">
        {" "}
        Η σελίδα δεν βρέθηκε
      </p>
    </motion.div>
  );
}

export default NotFoundPage;
