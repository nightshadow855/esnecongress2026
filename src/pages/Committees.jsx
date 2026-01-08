import { useEffect } from "react";
import { motion } from "framer-motion";
import FetchDataForComponents from "@/components/FetchDataForComponents";
import Loader from "@/components/ui/Loader";
import CommitteesContent from "@/components/CommitteesContent";

function Committees() {
  //set the title of the page
  useEffect(() => {
    document.title =
      " Επιτροπές | 53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος 6-9 Μαΐου 2026, Κεφαλονιά";
    return () => {
      document.title =
        "53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος"; // Reset on unmount
    };
  }, []);
  const { data, loading, error } = FetchDataForComponents(
    "/data/committees.json",
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
  if (!data || !data.committees || data.tba)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="mx-auto flex min-h-[60vh] max-w-[1276px] flex-col items-center justify-center gap-5 px-2 py-10"
      >
        <p className="text-center text-2xl font-extrabold text-white">
          Οι επιτροπές
        </p>
        <p className="text-lg font-bold text-white">Θα ανακοινωθούν σύντομα</p>
      </motion.div>
    );

  // Render component with fetched data
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="mx-auto flex min-h-[60vh] max-w-[1276px] flex-col items-center justify-center gap-5 px-2 py-10"
    >
      <CommitteesContent data={data} />
    </motion.div>
  );
}

export default Committees;
