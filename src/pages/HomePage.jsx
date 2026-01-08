import { useEffect } from "react";
import { motion } from "framer-motion";
import WelcomeMessage from "@/components/WelcomeMessage";
import ScrollContainer from "@/components/animations/ScrollContainer";

function HomePage() {
  //set the title of the page
  useEffect(() => {
    document.title =
      "53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος 6-9 Μαΐου 2026, Κεφαλονιά";
    return () => {
      document.title =
        "53ο Πανελλήνιο Συνέδριο Εθνικού Συνδέσμου Νοσηλευτών Ελλάδος"; // Reset on unmount
    };
  }, []);
  return (
    <div className="flex w-full flex-col items-start justify-start">
      {/*Desktop Banner*/}
      <div className="relative z-10 w-full items-start justify-start">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, once: true }}
          src="/webp/banner_desktop_bg.webp"
          alt="banner"
          className="absolute inset-0 -z-1 hidden h-full w-full object-contain lg:block"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, once: true }}
          src="/webp/banner_desktop_texts.webp"
          alt="banner"
          className="hidden h-full w-full object-contain lg:block"
        />

        {/*Mobile Banner*/}
        <div className="mx-auto mt-5 max-w-[600px] px-5 lg:hidden">
          <motion.img
            initial={{ opacity: 0, x: 2000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, once: true }}
            src="/webp/banner_mobile.webp"
            alt="banner"
            className="mx-auto h-full w-full rounded-xl border-2 border-white object-contain"
          />
        </div>
      </div>
      {/*Welcome Message*/}
      <ScrollContainer>
        <WelcomeMessage />
      </ScrollContainer>
    </div>
  );
}

export default HomePage;
