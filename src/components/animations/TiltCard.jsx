import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { FaCalendarCheck } from "react-icons/fa";
import CountdownTimer from "../ui/CountdownTimer";

function TiltCard({ dateItem, index }) {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;
  const ref = useRef(null);
  {
    /* Initial x,y*/
  }
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  {
    /* Add Spring Effect to x,y*/
  }
  const springX = useSpring(x);
  const springY = useSpring(y);

  {
    /* Convert Motion Values with useTransform so that they can be used in rotation*/
  }

  const transform = useMotionTemplate`rotateX(${springX}deg) rotateY(${springY}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];
    {
      /* Get Card width and height on hover*/
    }
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    {
      /* Calculate Mouse Positioning Within the card*/
    }
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    {
      /* Calculate Percentages. Hover over width or Height*/
    }
    const xPct = mouseX / width - HALF_ROTATION_RANGE;
    const yPct = mouseY / height - HALF_ROTATION_RANGE;
    {
      /* Set x,y on mouse moue*/
    }
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      key={`Containerdate-${index}`}
      ref={ref}
      style={{ transformStyle: "preserve-3d", transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-96 w-72 rounded-xl bg-linear-to-br from-main-color to-accent-color"
    >
      <div
        key={`SubContainerdate-${index}`}
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white p-5 shadow-lg"
      >
        <FaCalendarCheck
          className={`mx-auto mb-2 text-3xl ${dateItem.date ? "text-main-color" : "text-red-500"}`}
        />
        {dateItem.date ? (
          <h3
            className="text-center text-lg font-bold text-black"
            dangerouslySetInnerHTML={{ __html: dateItem.date }}
          ></h3>
        ) : (
          <h3 className="text-center text-lg font-bold text-red-500">TBA</h3>
        )}

        <p className="mt-2 text-center text-base text-black">
          {dateItem.description}
        </p>
        <div className="flex flex-col items-center justify-center px-5">
          {dateItem.countDownDate && (
            <CountdownTimer endDate={dateItem.countDownDate} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default TiltCard;
