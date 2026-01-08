import { motion } from "framer-motion";
import { FaInfoCircle, FaExclamationCircle } from "react-icons/fa";
function RegistrationTable(props) {
  return (
    <div className="max-w-[1176px] rounded-xl border border-black/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
      <h1 className="text-titles-color mb-2 text-center text-2xl font-extrabold">
        <FaInfoCircle className="mr-2 inline-block text-3xl" />
        {props.data.title}
      </h1>
      <table
        className={`w-full overflow-hidden rounded-t-xl p-5 px-2 md:min-w-[50vw] ${props.data.registrationUrl ? "" : "rounded-b-xl"} ${props.headerColor}`}
      >
        <thead className="p-2 md:p-5">
          <tr>
            {props.data.regTableHeaders.map((item) => (
              <th
                key={item}
                className={`${props.headerTextColor} text-md p-5 text-center ${props.headerColor} border-b border-b-gray-200`}
                dangerouslySetInnerHTML={{ __html: item }}
              ></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.registrationFees.map((item) => (
            <tr
              key={item.name}
              className="my-5 mb-2 border-b border-b-gray-200 p-5"
            >
              <td className="text-titles-color mx-auto p-2">
                <p className="font-bold">{item.name}</p>
                <br />{" "}
                <p
                  className="text-left text-sm font-normal italic"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                />
              </td>
              <td className="mx-auto border border-gray-300 p-2 text-center font-bold text-white">
                {item.earlyPrice}
              </td>
              <td className="mx-auto p-2 text-center font-bold text-white">
                {item.latePrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        className="p-5 text-left text-base text-white italic"
        dangerouslySetInnerHTML={{ __html: props.data?.includes }}
      />
      {props.data.registrationUrl && (
        <div
          className={`${props.headerColor} flex w-full flex-col items-center justify-center rounded-b-xl p-5 py-5`}
        >
          <p
            className={`mt-2 text-center text-base italic ${props.headerTextColor}`}
            dangerouslySetInnerHTML={{ __html: props.data.contact.textHelp }}
          ></p>
          <a
            href={`mailto:${props.data.contact.link}`}
            className={` ${props.headerTextColor} ml-2 text-base font-bold underline`}
          >
            {props.data.contact.linkText}
          </a>
          <a href={props.data.registrationUrl} target="_blank" className="mt-5">
            <motion.button
              initial={{ scale: 1, rotate: "0deg" }}
              whileHover={{ scale: 1.1, rotate: "5deg" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`glow-on-hover bg-titles-color mx-auto rounded-xl px-5 py-2 text-base font-bold text-black transition-colors duration-300 ease-linear`}
            >
              Εγγραφή
            </motion.button>
          </a>
        </div>
      )}
    </div>
  );
}

export default RegistrationTable;
