import React, { useState } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";

function Gmap({ url, height = 400 }) {
  const [loading, setLoading] = useState(true);

  if (!url) {
    return (
      <div
        className="relative flex w-full flex-col items-center justify-center"
        style={{ height }}
      >
        <p className="text-center text-2xl font-extrabold text-white">
          No url provided, please provide a valid url
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoading(false)}
        className={loading ? "invisible" : "visible"}
      />
    </div>
  );
}

Gmap.propTypes = {
  url: PropTypes.string.isRequired,
  height: PropTypes.number,
};

export default Gmap;
