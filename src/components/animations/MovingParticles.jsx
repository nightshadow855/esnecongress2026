import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";
import { LinesConfig } from "./ParticleLinesConfig";
import React, { useEffect } from "react";

function MovingParticles() {
  async function loadParticles(options) {
    await loadAll(tsParticles);

    await tsParticles.load({ id: "tsparticles", options });
  }
  useEffect(() => {
    loadParticles(LinesConfig);
  }, []);

  return <></>;
}

export default MovingParticles;
