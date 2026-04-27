import React from "react";
import { FaUserTie, FaUserGraduate, FaUsers } from "react-icons/fa";

function CommitteeCountsSummary({ committees }) {
  const normalizeName = (name) =>
    (name || "").replace(/\s+/g, " ").trim().toLowerCase();

  const getRoleType = (roleGroup) => {
    const label = (roleGroup?.label || "").toLowerCase();
    const id = (roleGroup?.id || "").toLowerCase();

    if (label.includes("αντιπρό") || id.includes("vp")) {
      return "vicePresidents";
    }

    if (label.includes("πρό") || id.includes("president")) {
      return "presidents";
    }

    return "members";
  };

  const globalRoleSets = {
    presidents: new Set(),
    vicePresidents: new Set(),
    members: new Set(),
  };
  const globalUniquePeople = new Set();

  const perCommitteeCounts = committees.map((committee) => {
    const roleSets = {
      presidents: new Set(),
      vicePresidents: new Set(),
      members: new Set(),
    };
    const committeeUniquePeople = new Set();

    committee.committeeData.forEach((roleGroup) => {
      const roleType = getRoleType(roleGroup);

      roleGroup.members.forEach((member) => {
        const normalized = normalizeName(member);
        if (!normalized) return;

        roleSets[roleType].add(normalized);
        committeeUniquePeople.add(normalized);

        globalRoleSets[roleType].add(normalized);
        globalUniquePeople.add(normalized);
      });
    });

    return {
      id: committee.id,
      presidents: roleSets.presidents.size,
      vicePresidents: roleSets.vicePresidents.size,
      members: roleSets.members.size,
      total: committeeUniquePeople.size,
    };
  });

  const totals = {
    presidents: globalRoleSets.presidents.size,
    vicePresidents: globalRoleSets.vicePresidents.size,
    members: globalRoleSets.members.size,
    total: globalUniquePeople.size,
  };

  return (
    <section className="rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:p-8">
      <h2 className="text-titles-color mb-6 text-center text-2xl font-bold">
        Σύνοψη Επιτροπών
      </h2>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <FaUserTie className="text-titles-color text-xl" />
          <div>
            <p className="text-sm text-white/70">Σύνολο Προέδρων</p>
            <p className="text-xl font-bold text-white">{totals.presidents}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <FaUserGraduate className="text-titles-color text-xl" />
          <div>
            <p className="text-sm text-white/70">Σύνολο Αντιπροέδρων</p>
            <p className="text-xl font-bold text-white">
              {totals.vicePresidents}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <FaUsers className="text-titles-color text-xl" />
          <div>
            <p className="text-sm text-white/70">Σύνολο Μελών</p>
            <p className="text-xl font-bold text-white">{totals.members}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <FaUsers className="text-titles-color text-xl" />
          <div>
            <p className="text-sm text-white/70">Γενικό Σύνολο (Μοναδικά)</p>
            <p className="text-xl font-bold text-white">{totals.total}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-left text-sm font-semibold text-white/80">
                Επιτροπή
              </th>
              <th className="text-left text-sm font-semibold text-white/80">
                Πρόεδροι
              </th>
              <th className="text-left text-sm font-semibold text-white/80">
                Αντιπρόεδροι
              </th>
              <th className="text-left text-sm font-semibold text-white/80">
                Μέλη
              </th>
              <th className="text-left text-sm font-semibold text-white/80">
                Σύνολο
              </th>
            </tr>
          </thead>
          <tbody>
            {perCommitteeCounts.map((committee) => (
              <tr key={committee.id} className="rounded-lg bg-white/5">
                <td className="rounded-l-lg px-3 py-3 text-sm font-semibold text-white md:text-base">
                  {committee.id}
                </td>
                <td className="px-3 py-3 text-sm text-white md:text-base">
                  {committee.presidents}
                </td>
                <td className="px-3 py-3 text-sm text-white md:text-base">
                  {committee.vicePresidents}
                </td>
                <td className="px-3 py-3 text-sm text-white md:text-base">
                  {committee.members}
                </td>
                <td className="rounded-r-lg px-3 py-3 text-sm font-bold text-white md:text-base">
                  {committee.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CommitteeCountsSummary;
