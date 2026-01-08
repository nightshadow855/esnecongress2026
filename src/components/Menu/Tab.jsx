import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Tab = ({
  children,
  setPosition,
  mouseFunction = () => {},
  handleClick = () => {},
  itemId,
  itemLink,
  txtColor,
  activeSubMenu,
}) => {
  const ref = useRef(null);

  // Function that controls the active menu item
  const isActive = (itemId) => {
    if (location.pathname === "/" && itemId === "/")
      return `text-white bg-accent-color rounded-full p-3 font-bold`;
    else
      return location.pathname === itemId || activeSubMenu
        ? `text-white bg-accent-color rounded-full p-3 font-bold`
        : "";
  };

  return (
    <li
      ref={ref}
      onClick={() => handleClick()}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
        mouseFunction(itemId);
      }}
      className={`relative z-10 mx-1 block cursor-pointer ${txtColor} transition-colors duration-300 ease-in-out hover:text-white active:text-white lg:p-3 ${isActive(itemLink)}`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className={`bg-accent-color absolute z-0 h-5 rounded-full md:h-12`}
    />
  );
};

export { Tab, Cursor };
