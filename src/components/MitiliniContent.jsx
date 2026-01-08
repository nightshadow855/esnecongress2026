import React from "react";

function MitiliniContent({ data }) {
  return (
    <>
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            className="content-container flex w-full flex-col justify-center px-5"
          >
            <h1
              key={`title-${index}`}
              className="mb-2 text-center text-2xl font-extrabold text-white"
            >
              {item.title}
            </h1>
            <div className="mx-auto my-5 grid grid-cols-1 items-center justify-center gap-5 rounded-xl bg-black bg-opacity-50 md:grid-cols-2">
              <img
                src={item.image.src}
                alt={item.image.alt}
                loading="lazy"
                className="h-full w-full object-cover md:rounded-l-xl"
              />
              <p
                className="my-5 p-5 text-left text-base text-white"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />
            </div>
          </div>
        ))}
    </>
  );
}

export default MitiliniContent;
