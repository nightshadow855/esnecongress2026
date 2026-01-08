import React from "react";
import Countdown from "react-countdown";

const CountdownTimer = ({ endDate }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    } else {
      return (
        <div className="mt-5 text-nowrap text-sm font-bold text-main-color">
          <span>Expires in : {days}d </span>
          <span>{hours}h </span>
          <span>{minutes}m </span>
        </div>
      );
    }
  };

  return <Countdown date={endDate} renderer={renderer} />;
};

export default CountdownTimer;
