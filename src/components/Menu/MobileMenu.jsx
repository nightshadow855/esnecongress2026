import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "./Hamburger.css";
import { BiSolidChevronDown } from "react-icons/bi";
import { FaArrowAltCircleRight, FaFacebook, FaInstagram } from "react-icons/fa";

function MobileMenu({
  data,
  location,
  hoverColor,
  bgColor,
  mobileBgColor,
  mobileTxtColor,
  isFixed,
  isHome,
}) {
  // Function that controls the active menu item
  const isActive = (itemId) => {
    if (location.pathname === "/") {
      return itemId === "/";
    }

    return location.pathname === itemId;
  };

  // Function to check if any submenus are active
  const isAnySubMenuActive = (subMenuItems) => {
    return subMenuItems.some((subMenuItem) => {
      return (
        location.pathname === subMenuItem.link ||
        location.hash === `#${subMenuItem.link}`
      );
    });
  };

  //states for the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  //toggle menu function
  const toggleMenu = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  //arrow visible state
  const [arrowVisible, setArrowVisible] = useState(true);

  const toggleSubMenu = (itemId) => {
    setActiveSubMenu((prevActiveSubMenu) =>
      prevActiveSubMenu === itemId ? null : itemId,
    );
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
    window.scrollTo(0, 0);
  };
  //add dynamic classes to make the menu fixed
  const [menuOpen, setMenuOpen] = useState(isOpen);

  //scroll when a hashtag is used in the url
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  //submenu scrolling
  const submenuRef = useRef(null);

  const handleWheel = (e) => {
    const submenuContainer = submenuRef.current;
    if (!submenuContainer) return;

    // Check if the submenu content exceeds its container height
    const isOverflowing =
      submenuContainer.scrollHeight > submenuContainer.clientHeight;

    if (isOverflowing) {
      // Prevent the default scroll behavior of the page
      e.stopPropagation();
      //e.preventDefault();

      // Manually scroll the submenu
      submenuContainer.scrollTop += e.deltaY;
    }
  };

  useEffect(() => {
    setMenuOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setArrowVisible(false);
    }, 6000); // 6000 milliseconds is 6 seconds

    return () => clearTimeout(timeout); // This will clear the timeout when the component unmounts
  }, [arrowVisible]); // This dependency array ensures that the useEffect hook only runs when the arrowVisible state changes

  return (
    <div
      className={`relative z-50 flex ${isFixed ? "" : "min-h-[60px]"} flex-row items-center justify-between text-sm font-bold xl:hidden`}
    >
      <div
        id="mobile-menu"
        className={`glow-on-hover-burger bg-main-color fixed top-[20px] right-[20px] z-50 flex flex-col rounded-full border-2 border-white p-5`}
      >
        <label className="burger" htmlFor="burger">
          <input
            type="checkbox"
            id="burger"
            onClick={toggleMenu}
            checked={isOpen}
            onChange={() => {}}
          />
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      {/*------------Mobile Menu Items----------*/}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key={location}
            className={`bg-main-color fixed top-0 right-0 z-10 flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-center bg-no-repeat px-2 py-10 drop-shadow-xl md:max-w-[450px]`}
            initial={{ scaleX: 0, opacity: 0, transformOrigin: "right" }}
            animate={{
              scaleX: "100%",
              opacity: 1,
              transformOrigin: "right",
            }}
            exit={{
              scaleX: 0,
              opacity: 0, // Keep opacity until scale animation starts
              transformOrigin: "right",
            }}
            transition={{
              duration: 0.5,
              exit: { delay: 0.3 }, // Delay the parent's exit animation
            }}
          >
            <motion.ul
              key={`parentul-${location}`}
              ref={submenuRef}
              onWheel={handleWheel}
              className="flex max-h-[80vh] w-full max-w-[350px] flex-col items-start justify-center overflow-y-auto px-2 py-5"
              style={{
                WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                scrollbarWidth: "thin", // Thin scrollbar for Firefox
                scrollbarColor: "rgba(109,81,164,0.8) transparent", // Subtle scrollbar
                overscrollBehavior: "contain", // Prevent underlying page from scrolling
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: "auto",
              }}
              transition={{
                duration: 0.3,
                opacity: {
                  duration: 0.2, // Quick fade out
                },
                animate: {
                  delay: 1.3, // Delay appearance on enter
                },
              }}
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
                  className="mx-auto mb-5 w-full max-w-[300px] object-contain md:hidden"
                />
              </motion.a>
              {data.map((item) => (
                <li key={item.id}>
                  {/* Main menu items */}
                  {item.link && item.link.startsWith("https://") ? (
                    <a
                      href={item.link}
                      key={item.id}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p
                        className={`${hoverColor} my-2 rounded-full p-2 text-base transition-colors duration-300 ease-linear ${isActive(item.link) ? `text-md bg-white px-5 py-2 text-center font-bold text-black` : mobileTxtColor}`}
                        onClick={closeMenu}
                      >
                        {`${item.label}`}
                      </p>
                    </a>
                  ) : item.link && item.link.startsWith("#") ? (
                    <ScrollLink
                      to={item.link.substring(1)}
                      smooth={true}
                      duration={800}
                      offset={-50}
                      key={item.id}
                    >
                      <p
                        className={`${hoverColor} my-2 rounded-full p-2 text-base transition-colors duration-300 ease-linear ${isActive(item.link) ? `text-md bg-white px-5 py-2 text-center font-bold text-black` : mobileTxtColor}`}
                        onClick={closeMenu}
                      >
                        {`${item.label}`}
                      </p>
                    </ScrollLink>
                  ) : (
                    item.link && (
                      <RouterLink to={item.link} key={item.id}>
                        <p
                          className={`${hoverColor} my-2 rounded-full p-2 text-base transition-colors duration-300 ease-linear ${isActive(item.link) ? `text-md bg-white px-5 py-2 text-center font-bold text-black` : mobileTxtColor}`}
                          onClick={closeMenu}
                        >
                          {`${item.label}`}
                        </p>
                      </RouterLink>
                    )
                  )}
                  {!item.link && (
                    <p
                      className={`${hoverColor} my-2 cursor-pointer rounded-full p-2 text-base transition-colors duration-300 ease-linear ${isAnySubMenuActive(item.subMenu) ? `text-md bg-white px-5 py-2 text-center font-bold text-black` : mobileTxtColor}`}
                      onClick={() => toggleSubMenu(item.id)}
                    >
                      {item.label}
                      <BiSolidChevronDown className={`ml-1 inline`} />
                    </p>
                  )}
                  {/* Submenus */}
                  {item.subMenu.length > 0 && (
                    <AnimatePresence mode="wait">
                      {activeSubMenu === item.id && (
                        <motion.ul
                          key={`ul-${item.id}`}
                          className="w-full"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.3,
                            opacity: { delay: 0.2 },
                          }}
                        >
                          {item.subMenu.map((subMenuItem) =>
                            subMenuItem.link &&
                            subMenuItem.link.startsWith("https://") ? (
                              <a
                                href={subMenuItem.link}
                                key={subMenuItem.id}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <li
                                  className={`my-2 rounded-full p-2 text-base ${hoverColor} transition-colors duration-300 ease-linear ${isActive(subMenuItem.link) ? `text-md bg-white font-bold text-black` : mobileTxtColor}`}
                                  onClick={closeMenu}
                                >
                                  <FaArrowAltCircleRight className="mr-2 inline" />
                                  {`${subMenuItem.label}`}
                                </li>
                              </a>
                            ) : subMenuItem.link &&
                              subMenuItem.link.startsWith("#") ? (
                              <ScrollLink
                                to={subMenuItem.link.substring(1)}
                                smooth={true}
                                duration={800}
                                offset={-50}
                                key={subMenuItem.id}
                              >
                                <li
                                  className={`my-2 rounded-full p-2 text-base ${hoverColor} transition-colors duration-300 ease-linear ${isActive(subMenuItem.link) ? `text-md bg-white font-bold text-black` : mobileTxtColor}`}
                                  onClick={closeMenu}
                                >
                                  <FaArrowAltCircleRight className="mr-2 inline" />
                                  {`${subMenuItem.label}`}
                                </li>
                              </ScrollLink>
                            ) : (
                              <RouterLink
                                to={subMenuItem.link}
                                key={subMenuItem.id}
                              >
                                <li
                                  className={`my-2 rounded-full p-2 text-base ${hoverColor} transition-colors duration-300 ease-linear ${isActive(subMenuItem.link) ? `text-md bg-white font-bold text-black` : mobileTxtColor}`}
                                  onClick={closeMenu}
                                >
                                  <FaArrowAltCircleRight className="mr-2 inline" />
                                  {`${subMenuItem.label}`}
                                </li>
                              </RouterLink>
                            ),
                          )}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
              <a href="/register" target="_self">
                <motion.button
                  key="register-button-mobile"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 5 }}
                  whileActve={{ rotate: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`glow-on-hover bg-titles-color mx-auto mt-2 rounded-xl px-5 py-2 text-lg font-bold text-black`}
                >
                  Εγγραφή
                </motion.button>
              </a>
            </motion.ul>
            {/* Social Media Icons 
            <div className="mx-auto mt-5 flex items-center">
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
            </div>*/}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileMenu;
