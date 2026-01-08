import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSolidChevronDown } from "react-icons/bi";
import MobileMenu from "./MobileMenu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Tab, Cursor } from "./Tab";
import { FaArrowAltCircleRight, FaFacebook, FaInstagram } from "react-icons/fa";

function Menu({
  data,
  bgColor,
  txtColor,
  hoverColor,
  mobileBgColor,
  mobileTxtColor,
  subMenuHoverColor,
}) {
  // tabs animation state
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();

  const [isHome, setIsHome] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  //scroll to top after clicking menu function
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //states that controls the sub menu
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Function to handle mouse enter on main menu item
  const handleMouseEnter = (itemId) => {
    setActiveSubMenu(itemId);
  };

  // Function to handle mouse leave on main menu item
  const handleMouseLeave = () => {
    setActiveSubMenu(null);
  };

  // Function for active sub menu
  const isSubMenuActive = (itemId) => {
    return location.pathname === itemId
      ? `${hoverColor} font-bold`
      : `${txtColor}`;
  };

  // Function to check if any submenus are active
  const isAnySubMenuActive = (subMenuItems) => {
    if (!subMenuItems) return false;
    return subMenuItems.some((subMenuItem) => {
      return (
        location.pathname === subMenuItem.link ||
        location.hash === `#${subMenuItem.link}`
      );
    });
  };

  // useEffect that controls the styling of the desktop menu
  useEffect(() => {
    const checkIfHome = () => {
      setIsHome(location.pathname === "/");
    };
    checkIfHome();
  }, [location.pathname]); // Use location.pathname directly in the dependency array

  // Show/hide menu on scroll for desktop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //change bg color based on screen size
  const [menuMainColor, setMenuMainColor] = useState(bgColor);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1920) {
        setMenuMainColor(bgColor); //not changing for now
      } else {
        setMenuMainColor(bgColor);
      }
    });
    //cleanup
    window.removeEventListener("resize", () => {});
  }, [window.innerWidth]);

  return (
    <AnimatePresence mode="wait">
      <nav>
        {/* Desktop Menu*/}
        <motion.div
          key={`${isFixed ? "fixed" : "absolute"}-menu`}
          initial={
            isFixed ? { y: -100, translateX: "-50%", left: "50%" } : false
          }
          animate={isFixed ? { y: 0, translateX: "-50%", left: "50%" } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`top-0 z-40 flex w-full flex-row items-center justify-between md:justify-center ${
            isFixed
              ? "bg-main-color/75 fixed shadow-lg shadow-md backdrop-blur-md"
              : isHome
                ? "bg-main-color absolute"
                : "absolute bg-transparent"
          }`}
        >
          <motion.a
            href="https://esne.gr"
            target="_blank"
            initial={{ scale: 1, rotate: "0deg" }}
            whileHover={{ scale: 1.1, rotate: "5deg" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img
              src="/webp/esne-logo.webp"
              alt="esne-logo"
              className="mx-2 my-5 max-h-[80px] object-contain"
            />
          </motion.a>
          <motion.ul
            className="relative hidden px-2 py-5 xl:flex xl:flex-row xl:items-center xl:justify-between"
            onMouseLeave={() => {
              setPosition((pv) => ({
                ...pv,
                opacity: 0,
              }));
            }}
          >
            {data &&
              Array.isArray(data) &&
              data.map((item) => (
                <ul key={item.id} onMouseLeave={handleMouseLeave}>
                  {item.link ? (
                    item.link.startsWith("http") ||
                    item.link.startsWith("https") ? (
                      <a href={item.link} target="_blank" rel="nofollow">
                        <Tab
                          setPosition={setPosition}
                          txtColor={txtColor}
                          itemLink={item.link}
                          itemId={item.id}
                        >
                          {item.label}
                        </Tab>
                      </a>
                    ) : item.link.startsWith("#") ? (
                      <ScrollLink
                        to={item.link.substring(1)}
                        smooth="easeInOutQuint" // Use a more sophisticated easing function
                        duration={800} // Longer duration for smoother scroll
                        offset={-20} // Slight offset to account for header
                        spyThrottle={100}
                      >
                        <Tab
                          setPosition={setPosition}
                          txtColor={txtColor}
                          itemId={item.id}
                          itemLink={item.link}
                        >
                          {item.label}
                        </Tab>
                      </ScrollLink>
                    ) : (
                      <RouterLink to={item.link}>
                        <Tab
                          setPosition={setPosition}
                          txtColor={txtColor}
                          itemId={item.id}
                          itemLink={item.link}
                          handleClick={handleClick}
                        >
                          {item.label}
                        </Tab>
                      </RouterLink>
                    )
                  ) : (
                    <Tab
                      setPosition={setPosition}
                      mouseFunction={handleMouseEnter}
                      txtColor={txtColor}
                      itemId={item.id}
                      itemLink={item.link}
                      activeSubMenu={isAnySubMenuActive(item.subMenu)}
                    >
                      {item.label}

                      {item.subMenu.length > 0 && (
                        <BiSolidChevronDown className={`inline text-sm`} />
                      )}
                    </Tab>
                  )}
                  {/* Submenus */}
                  {item.subMenu.length > 0 && activeSubMenu === item.id && (
                    <AnimatePresence>
                      <motion.ul
                        key="smenu"
                        className={`absolute z-50 overflow-hidden ${bgColor} border-secondaryColor min-w-[300px] rounded-xl border-2 p-2 drop-shadow-xl ${
                          activeSubMenu === item.id ? "block" : "hidden"
                        }`}
                        initial={{ opacity: 0, height: 0 }} // Initial height of the menu
                        animate={{ opacity: 1, height: "auto" }} // Animated height based on isOpen state
                        transition={{ duration: 0.8, opacity: { delay: 0.2 } }} // Delay opacity animation
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {item.subMenu.map((subMenuItem) => (
                          <div key={subMenuItem.id}>
                            {subMenuItem.link.startsWith("http") ||
                            subMenuItem.link.startsWith("https") ? (
                              <a
                                href={subMenuItem.link}
                                target="_blank"
                                rel="nofollow"
                              >
                                <li
                                  className={`my-4 rounded-full p-2 transition-all duration-300 ease-in-out ${txtColor} ${subMenuHoverColor} ${isSubMenuActive(
                                    subMenuItem.link,
                                    subMenuItem.id,
                                  )} transition-all duration-300 ease-linear`}
                                >
                                  <FaArrowAltCircleRight className="mr-2 inline" />
                                  {subMenuItem.label}
                                </li>
                              </a>
                            ) : subMenuItem.link.startsWith("#") ? (
                              <ScrollLink
                                to={subMenuItem.link.substring(1)}
                                smooth="easeInOutQuint" // Use a more sophisticated easing function
                                duration={800} // Longer duration for smoother scroll
                                offset={-20} // Slight offset to account for header
                                spyThrottle={100}
                              >
                                <li
                                  className={`my-4 cursor-pointer rounded-full p-2 transition-all duration-300 ease-in-out ${txtColor} ${subMenuHoverColor} ${isSubMenuActive(
                                    subMenuItem.link,
                                    subMenuItem.id,
                                  )} transition-all duration-300 ease-linear`}
                                  onClick={handleClick}
                                >
                                  <FaArrowAltCircleRight className="mr-2 inline" />
                                  {subMenuItem.label}
                                </li>
                              </ScrollLink>
                            ) : (
                              <RouterLink to={subMenuItem.link}>
                                <li
                                  className={`my-4 rounded-full p-2 transition-all duration-300 ease-in-out ${txtColor} ${subMenuHoverColor} ${isSubMenuActive(
                                    subMenuItem.link,
                                    subMenuItem.id,
                                  )} transition-all duration-300 ease-linear`}
                                  onClick={handleClick}
                                >
                                  <FaArrowAltCircleRight className="mr-2 inline" />
                                  {subMenuItem.label}
                                </li>
                              </RouterLink>
                            )}
                          </div>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
                  )}
                </ul>
              ))}
            <Cursor position={position} />
            <RouterLink to="/register" target="_self">
              <motion.button
                initial={{ scale: 1, rotate: "0deg" }}
                whileHover={{ scale: 1.1, rotate: "5deg" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`glow-on-hover bg-titles-color text-main-color ml-2 max-w-[400px] rounded-xl px-5 py-2 text-sm font-bold transition-colors duration-300 ease-linear lg:text-base`}
              >
                Εγγραφή
              </motion.button>
            </RouterLink>
          </motion.ul>
          {/* Social Media Icons 
          <div className="mr-5 hidden lg:flex lg:items-center">
            <a href="https://www.facebook.com/ekve69/" target="_blank">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ml-2 mr-3 flex cursor-pointer text-2xl text-accent-color"
              >
                <FaFacebook />
              </motion.div>
            </a>
            <a href="https://www.instagram.com/ekbe1969" target="_blank">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ml-2 mr-3 flex cursor-pointer items-center text-2xl text-accent-color"
              >
                <FaInstagram />
              </motion.div>
            </a>
          </div> */}
          {/*------ Mobile Menu----------------*/}
          <MobileMenu
            data={data}
            hoverColor={subMenuHoverColor}
            mobileBgColor={mobileBgColor}
            mobileTxtColor={mobileTxtColor}
            bgColor={bgColor}
            location={location}
            isHome={isHome}
          />
        </motion.div>
      </nav>
    </AnimatePresence>
  );
}

export default Menu;
