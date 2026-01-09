import React from "react";
import { motion } from "framer-motion";
import {
  FaPlane,
  FaBed,
  FaCar,
  FaInfoCircle,
  FaUser,
  FaUsers,
  FaEnvelope,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";

function PackagesContent({ data }) {
  return (
    <div className="content-container flex w-full flex-col justify-center gap-8 px-5">
      {/* Title */}
      <h1 className="text-titles-color mb-4 text-center text-3xl font-extrabold">
        {data.title}
      </h1>

      {/* Packages */}
      {data.packages.map((packageItem, index) => (
        <motion.div
          key={packageItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-xl p-6 md:border md:border-white/10 md:bg-black/20 md:p-8 md:backdrop-blur-sm"
        >
          {/* Package Title with Icon */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <FaPlane className="text-titles-color text-3xl" />
            <h2 className="text-titles-color text-center text-lg font-bold">
              {packageItem.title}
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {packageItem.categories.map((category, catIndex) => (
              <motion.div
                key={`${packageItem.id}-${catIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + catIndex * 0.05,
                }}
                className="group rounded-lg p-5 transition-all duration-300 hover:bg-white/10 hover:shadow-lg md:border md:border-white/10 md:bg-white/5"
              >
                {/* Category Name */}
                <h3 className="mb-4 text-center text-lg font-bold text-white">
                  {category.name}
                </h3>

                {/* Pricing Options */}
                <div className="space-y-3">
                  {/* Single Room */}
                  <div className="rounded-lg border border-white/10 bg-black/10 p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <FaUser className="text-lg text-white" />
                      <p className="text-center text-sm text-white/70">
                        Άτομο σε μονόκλινο
                      </p>
                    </div>
                    <p className="text-center text-2xl font-bold text-white">
                      {category.singlePrice}
                    </p>
                  </div>

                  {/* Double Room */}
                  <div className="rounded-lg border border-white/10 bg-black/10 p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <FaUsers className="text-lg text-white" />
                      <p className="text-center text-sm text-white/70">
                        Κατ' άτομο σε δίκλινο
                      </p>
                    </div>
                    <p className="text-center text-2xl font-bold text-white">
                      {category.doublePrice}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Includes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl p-6 md:border md:border-white/10 md:bg-black/20 md:p-8 md:backdrop-blur-sm"
      >
        <div className="mb-4 flex items-center gap-3">
          <FaInfoCircle className="text-titles-color text-2xl" />
          <h3 className="text-titles-color text-xl font-bold">
            Τα Πακέτα Περιλαμβάνουν
          </h3>
        </div>
        <p className="text-base leading-relaxed text-white">{data.includes}</p>
      </motion.div>

      {/* Contact Information Section */}
      {data.contactInfo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="bg-titles-color text-main-color rounded-xl p-6 backdrop-blur-sm md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <FaUserTie className="text-2xl" />
            <h3 className="text-xl font-bold">Επικοινωνία για Κρατήσεις</h3>
          </div>
          <p className="mb-4 text-base leading-relaxed">
            {data.contactInfo.text}
          </p>
          <div className="yellow-container flex flex-col gap-3 md:flex-row md:gap-6">
            <a
              href={`mailto:${data.contactInfo.email}`}
              className="hover:text-main-color/80 flex items-center gap-2 transition-colors"
            >
              <FaEnvelope className="text-lg" />
              <span className="font-semibold">{data.contactInfo.email}</span>
            </a>
            <a
              href={`tel:${data.contactInfo.phone}`}
              className="hover:text-main-color/80 flex items-center gap-2 transition-colors"
            >
              <FaPhone className="text-lg" />
              <span className="font-semibold">{data.contactInfo.phone}</span>
            </a>
          </div>
        </motion.div>
      )}

      {/* Additional Icons Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-titles-color flex h-10 w-10 items-center justify-center gap-10 md:h-20 md:w-full md:gap-20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <div className="flex flex-col items-center gap-2">
          <FaPlane className="text-titles-color text-4xl" />
          <p className="text-sm text-white">Αεροπορικά</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaBed className="text-titles-color text-4xl" />
          <p className="text-sm text-white">Διαμονή</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaCar className="text-titles-color text-4xl" />
          <p className="text-sm text-white">Μεταφορές</p>
        </div>
      </motion.div>
    </div>
  );
}

export default PackagesContent;
