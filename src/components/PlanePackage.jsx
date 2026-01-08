import React from "react";
import Loader from "./ui/Loader";
import PackagesTable from "./ui/PackagesTable";
import FetchDataForComponents from "./FetchDataForComponents";

function PlanePackage({ jsonUrl, title, color }) {
  const { data, loading, error } = FetchDataForComponents(jsonUrl);
  if (loading)
    return (
      <div className="my-20 flex h-screen flex-col items-center justify-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="my-20 flex flex-col items-center justify-center text-white">
        Error: {error}
      </div>
    );
  if (!data || data.length === 0) return null;

  // Render component with fetched data
  return (
    <div className="mx-auto my-5 w-full overflow-x-auto rounded-xl">
      <PackagesTable data={data[0]} tableTitle={title} headerColor={color} />
    </div>
  );
}

export default PlanePackage;
