import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
function Footer({ bgColor, txtColor, logoDark }) {
  return (
    <motion.footer
      id="contact"
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
      className={`relative z-10 mx-auto mt-20 flex flex-col items-center justify-center bg-transparent px-5 py-5`}
      //style={{ backgroundImage: `url("/images/footer-bg.png")` }}
    >
      <div className="flex flex-col items-center justify-center">
        <p
          className={`${txtColor} mx-2 mt-5 inline text-center text-base font-bold sm:text-left`}
        >
          {" "}
          Οργανωτική Υποστήριξη:{" "}
          <img
            src="/webp/zitacongress.webp"
            alt="Zita Congress"
            className={`mx-auto my-2 inline max-w-[250px] object-contain sm:mx-2 ${logoDark ? "invert filter" : ""}`}
          />
        </p>

        <p className={`${txtColor} inline text-center text-sm`}>
          Θανάσης Λιάγκης, Τηλ.:{" "}
          <a href="tel:+302299440964">+30 229944 0964 | </a>
          E-mail.:{" "}
          <a href="mailto:tli@zita-congress.gr">tli@zita-congress.gr | </a>
          <a href="https://www.zita-congress.gr" target="_blank">
            www.zita-congress.gr
          </a>
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
