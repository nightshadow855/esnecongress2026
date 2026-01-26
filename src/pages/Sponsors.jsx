import { useEffect } from "react";
import { motion } from "framer-motion";
import FetchDataForComponents from "@/components/FetchDataForComponents";
import Loader from "@/components/ui/Loader";

function Agenda() {
  //set the title of the page
  useEffect(() => {
    document.title =
      "Χορηγοί | 53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος 6-9 Μαΐου 2026, Κεφαλονιά";
    return () => {
      document.title =
        "53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος"; // Reset on unmount
    };
  }, []);
  const { data, loading, error } = FetchDataForComponents(
    "/data/sponsors.json",
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
  if (!data || data.length === 0 || data.tba === true)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="mx-auto flex min-h-[60vh] max-w-[1276px] flex-col items-center justify-center gap-5 px-2 py-10"
      >
        <p className="text-center text-2xl font-extrabold text-white">
          Οι Χορηγοί
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
      className="mx-auto flex min-h-[60vh] max-w-[1276px] grid-cols-1 flex-col items-center justify-center gap-5 px-2 py-10 md:mt-32"
    >
      {data.goldSponsors && data.goldSponsors.length > 0 && (
        <p className="my-5 text-center text-2xl font-extrabold text-white">
          {data.goldSponsors.length > 1 ? "Χρυσοί Χορηγοί" : "Χρυσός Χορηγός"}
        </p>
      )}
      <div className="mx-auto mt-5 flex max-w-[1248px] flex-wrap items-center justify-center gap-5 py-5">
        {data.goldSponsors.map((sponsor) => (
          <a
            href={sponsor.url}
            key={sponsor.name}
            target="_blank"
            rel="noreferrer nofollow"
          >
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, spring: 0.1 }}
              src={sponsor.imageSrc}
              alt={sponsor.name}
              className="border-main-color max-w-[300px] rounded-xl border-[5px] object-contain drop-shadow-md"
            />
          </a>
        ))}
      </div>
      {data.sponsors && data.sponsors.length > 0 && (
        <p className="my-5 text-center text-2xl font-extrabold text-white">
          {data.sponsors.length > 1 ? "Χορηγοί" : "Χορηγός"}
        </p>
      )}
      <div className="mx-auto mt-5 flex max-w-[1248px] flex-wrap items-center justify-center gap-5 py-5">
        {data.sponsors.map((sponsor) => (
          <a
            href={sponsor.url}
            key={sponsor.name}
            target="_blank"
            rel="noreferrer nofollow"
          >
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, spring: 0.1 }}
              src={sponsor.imageSrc}
              alt={sponsor.name}
              className="border-main-color max-w-[300px] rounded-xl border-[5px] object-contain drop-shadow-md"
            />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default Agenda;
