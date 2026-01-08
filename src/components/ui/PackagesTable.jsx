import { FaInfo } from "react-icons/fa";

function PackagesTable({
  data,
  headerColor = "bg-[#1c468e]", // Default value for headerColor
  headerTextColor = "text-white text-center", // Default value for headerTextColor
  bodyColor = "bg-white", // Default value for bodyColor
  bodyTextColor = "text-black", // Default value for bodyTextColor
  tableTitle = "Ορίστε μια επικεφαλίδα!", // Default value for tableTitle
}) {
  const renderStars = (number) => {
    let stars = "";
    for (let i = 0; i < number; i++) {
      stars += "⭐"; // Unicode star character
    }
    return stars;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center text-2xl text-white">
        <FaInfo />
        <h3 className={`${headerTextColor} text-left font-extrabold`}>
          {tableTitle}
        </h3>
      </div>

      {/*Desktop Table*/}
      <table
        className={`mx-2 my-5 md:mx-5 ${headerColor} hidden w-full overflow-hidden rounded-xl border border-white px-2 pb-10 sm:table`}
      >
        <thead className="p-2 md:p-5">
          <tr>
            {data.header.map((item) => (
              <th
                key={item.id}
                className={`p-5 text-left ${headerTextColor} text-base`}
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.packageData.map((item) => (
            <tr
              key={item.id}
              className={`${bodyColor} my-5 mb-2 w-full border-b border-b-gray-200 p-2`}
            >
              <td className={`${bodyTextColor} p-5 text-center font-bold`}>
                {item.label.length > 30 ? <>{item.label}</> : item.label}
              </td>
              <td className={`${bodyTextColor} py-5 text-center`}>
                {item.rating.map((member) => (
                  <p key={member} className={`${bodyTextColor} m-4`}>
                    {renderStars(parseInt(member, 10))}
                  </p>
                ))}
              </td>
              <td className={`${bodyTextColor} p-5 text-left`}>
                {item.type.map((member, index) => (
                  <p
                    key={`type ${index}`}
                    className={`${bodyTextColor} border-b-2 border-gray-400`}
                    style={{
                      borderBottom:
                        index % 2 === 1 ? "2px solid #D1D5DB" : "none",
                    }}
                  >
                    {member}
                  </p>
                ))}
              </td>
              <td className={`${bodyTextColor} p-5 text-left`}>
                {item.price.map((member, index) => (
                  <p
                    key={`price ${index}`}
                    className={`${bodyTextColor} `}
                    style={{
                      borderBottom:
                        index % 2 === 1 ? "2px solid #D1D5DB" : "none",
                    }}
                  >
                    {member}
                  </p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Mobile Table*/}
      <div className="flex w-full flex-col text-xs text-white sm:hidden">
        <div className="flex w-full flex-row items-center justify-between gap-5 p-5">
          {data.header.slice(1).map((item) => (
            <p key={item.id} className={`text-base text-white underline`}>
              {item.label}
            </p>
          ))}
        </div>
        {data.packageData.map((item, index) => (
          <div
            key={`mobilecont-${index}`}
            className="flex w-full flex-row items-center justify-between gap-5 p-5"
          >
            <div className="justify-betwwen flex flex-col items-start">
              {item.rating.map((member) => (
                <p key={`mobile-${member}`} className={`m-4 text-lg`}>
                  {renderStars(parseInt(member, 10))}
                </p>
              ))}
            </div>
            <div>
              {item.type.map((member, index) => (
                <p
                  key={`type-mobile-${index}`}
                  className={`my-2 border-b-2 border-gray-400 text-white`}
                  style={{
                    borderBottom:
                      index % 2 === 1 ? "2px solid #D1D5DB" : "none",
                  }}
                >
                  {member}
                </p>
              ))}
            </div>
            <div>
              {item.price.map((member, index) => (
                <p
                  key={`mobile-price${index}`}
                  className={`my-2 border-b-2 border-gray-400 text-white`}
                  style={{
                    borderBottom:
                      index % 2 === 1 ? "2px solid #D1D5DB" : "none",
                  }}
                >
                  {member}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackagesTable;
