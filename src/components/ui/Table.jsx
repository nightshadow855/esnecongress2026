function Table({
  data,
  headerColor = "bg-[#1c468e]", // Default value for headerColor
  headerTextColor = "text-white", // Default value for headerTextColor
  bodyColor = "bg-white", // Default value for bodyColor
  bodyTextColor = "text-black", // Default value for bodyTextColor
  tableTitle = "Ορίστε μια επικεφαλίδα!", // Default value for tableTitle
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3
        className={`${headerTextColor} ${headerColor} mt-5 w-full rounded-t-xl py-5 text-center text-lg font-extrabold sm:w-[60vw]`}
      >
        {tableTitle}
      </h3>
      <table
        className={`mx-2 md:mx-5 ${headerColor} mb-5 w-full overflow-hidden rounded-b-xl px-2 pb-10 sm:w-[60vw]`}
      >
        <thead className="p-2 md:p-5"></thead>
        <tbody>
          {data.committeeData.map((item) => (
            <tr
              key={item.id}
              className={`${bodyColor} my-5 mb-2 border-b border-b-gray-200 p-2`}
            >
              <td
                className={`${bodyTextColor} p-5 text-left align-top font-bold`}
              >
                {item.label}
              </td>
              <td className={`${bodyTextColor} p-5 text-left`}>
                {item.members.map((member) => (
                  <p key={member} className={`${bodyTextColor}`}>
                    {member}
                  </p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
