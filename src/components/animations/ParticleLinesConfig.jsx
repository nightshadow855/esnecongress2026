export const LinesConfig = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff", // White particles
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff", // White connections
      opacity: 0.1, // Slightly reduced opacity to be less harsh on dark background
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.05, // Reduced triangle opacity for dark background
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.05,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 0.3,
        },
      },
      push: {
        particles_nb: 4,
      },
    },
  },
  retina_detect: true,
};
