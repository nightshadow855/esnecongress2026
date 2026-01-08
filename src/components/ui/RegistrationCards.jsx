import React from "react";
import { motion } from "framer-motion";
import { FaTicketAlt, FaInfoCircle, FaUser } from "react-icons/fa";

function RegistrationCards({ data }) {
  return (
    <div className="content-container flex w-full flex-col justify-center px-5">
      {/* Title */}
      <h1 className="text-titles-color mb-8 text-center text-3xl font-extrabold">
        {data.title}
      </h1>

      {/* Registration Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.registrationFees.map((fee, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 hover:shadow-xl"
          >
            {/* Icon */}
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-titles-color/20 rounded-full p-4">
                <FaUser className="text-3xl text-white" />
              </div>
            </div>

            {/* Registration Type */}
            <h3 className="mb-4 text-center text-xl font-bold text-white">
              {fee.name}
            </h3>

            {/* Pricing */}
            <div className="space-y-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="mb-1 text-center text-sm text-white/70">
                  Έως 22-03-2026
                </p>
                <p className="text-center text-2xl font-bold text-white">
                  {fee.earlyPrice}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="mb-1 text-center text-sm text-white/70">
                  Από 23-03-2026
                </p>
                <p className="text-center text-2xl font-bold text-white">
                  {fee.latePrice}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Includes Section */}
      <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <FaTicketAlt className="text-titles-color text-2xl" />
          <h3 className="text-titles-color text-xl font-bold">
            Η Εγγραφή Περιλαμβάνει
          </h3>
        </div>
        <p
          className="text-base leading-relaxed text-white"
          dangerouslySetInnerHTML={{ __html: data.includes }}
        />
      </div>

      {/* Registration Button */}
      <div className="mt-8 flex justify-center">
        <a
          href={data.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            initial={{ scale: 1, rotate: "0deg" }}
            whileHover={{ scale: 1.05, rotate: "2deg" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-titles-color glow-on-hover cursor-pointer rounded-full px-8 py-4 text-lg font-bold text-black shadow-lg transition-all duration-300 ease-linear hover:shadow-xl"
          >
            Εγγραφή Τώρα
          </motion.button>
        </a>
      </div>

      {/* Contact Information */}
      <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <FaInfoCircle className="text-titles-color text-2xl" />
          <h3 className="text-titles-color text-xl font-bold">Επικοινωνία</h3>
        </div>
        <p
          className="mb-3 inline text-base text-white"
          dangerouslySetInnerHTML={{ __html: data.contact.textHelp }}
        />
        <a
          href={data.contact.link}
          className="text-titles-color inline-block font-bold underline transition-colors hover:text-white"
        >
          {data.contact.linkText}
        </a>
      </div>
    </div>
  );
}

export default RegistrationCards;
