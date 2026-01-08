import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaUserGraduate, FaUser } from "react-icons/fa";

function CommitteesContent({ data }) {
  // Icon mapping based on role
  const getRoleIcon = (label) => {
    if (label.includes("Πρόεδρος") || label.includes("Πρόεδροι")) {
      return <FaUserTie className="text-titles-color text-2xl" />;
    } else if (label.includes("Αντιπρόεδρος")) {
      return <FaUserGraduate className="text-titles-color text-2xl" />;
    } else {
      return <FaUsers className="text-titles-color text-2xl" />;
    }
  };

  return (
    <div className="content-container flex w-full flex-col justify-center gap-8">
      {/* Conference Presidents Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <FaUserTie className="text-titles-color text-3xl" />
          <h2 className="text-titles-color text-2xl font-bold">
            {data.conferencePresidents.id}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {data.conferencePresidents.members.map((member, index) => (
            <div
              key={`conf-pres-${index}`}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              <FaUserTie className="text-titles-color flex-shrink-0 text-xl" />
              <span className="text-sm md:text-base">{member}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Epitropi Moriodotisis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <FaUsers className="text-titles-color text-3xl" />
          <h2 className="text-titles-color text-2xl font-bold">
            {data.epitropiMoriodotisis.id}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {data.epitropiMoriodotisis.members.map((member, index) => (
            <div
              key={`moriod-${index}`}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              <FaUser className="text-titles-color flex-shrink-0 text-lg" />
              <span className="text-sm md:text-base">{member}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Committees */}
      {data.committees.map((committee, committeeIndex) => (
        <motion.div
          key={committee.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + committeeIndex * 0.1 }}
          className="rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8"
        >
          {/* Committee Title */}
          <h2 className="text-titles-color mb-6 text-center text-2xl font-bold">
            {committee.id}
          </h2>

          {/* Committee Roles */}
          {committee.committeeData.map((roleGroup, roleIndex) => (
            <div key={roleGroup.id} className="mb-6 last:mb-0">
              {/* Role Header */}
              <div className="mb-4 flex items-center gap-3">
                {getRoleIcon(roleGroup.label)}
                <h3 className="text-titles-color text-xl font-bold">
                  {roleGroup.label}
                </h3>
                <span className="bg-titles-color/20 rounded-full px-3 py-1 text-sm font-semibold text-white">
                  {roleGroup.members.length}
                </span>
              </div>

              {/* Members Grid */}
              <div
                className={`grid gap-3 ${
                  roleGroup.members.length <= 4
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {roleGroup.members.map((member, memberIndex) => (
                  <motion.div
                    key={`${roleGroup.id}-${memberIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: roleIndex * 0.05 + memberIndex * 0.02,
                    }}
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 hover:shadow-lg"
                  >
                    {roleGroup.label.includes("Πρόεδρος") ||
                    roleGroup.label.includes("Πρόεδροι") ? (
                      <FaUserTie className="text-titles-color flex-shrink-0 text-lg" />
                    ) : roleGroup.label.includes("Αντιπρόεδρος") ? (
                      <FaUserGraduate className="text-titles-color flex-shrink-0 text-lg" />
                    ) : (
                      <FaUser className="text-titles-color flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium text-white md:text-base">
                      {member}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export default CommitteesContent;
