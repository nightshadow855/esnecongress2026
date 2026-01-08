import React from "react";
import { motion } from "framer-motion";
import { FaInfoCircle, FaExclamationCircle } from "react-icons/fa";

function AbstractsContent({ data }) {
  return (
    <div className="content-container flex w-full flex-col justify-center px-5">
      <h1 className="text-titles-color mb-2 text-center text-2xl font-extrabold">
        {data.title}
      </h1>
      <h2
        className="my-2 text-left text-base text-white"
        dangerouslySetInnerHTML={{ __html: data.intro }}
      />
      <h3
        className="bg-titles-color/85 text-main-color my-2 rounded-xl border border-white/10 p-6 text-left text-base font-extrabold backdrop-blur-sm md:p-8"
        dangerouslySetInnerHTML={{ __html: data.deadlineMessage }}
      />
      <div className="rounded-xl border border-white/10 bg-black/5 p-6 backdrop-blur-sm md:p-8">
        <div className="mt-5 flex items-center justify-start gap-2">
          <FaInfoCircle className="text-titles-color text-2xl" />
          <h3
            className="text-titles-color my-2 text-left text-xl font-extrabold"
            dangerouslySetInnerHTML={{ __html: data.subTitle }}
          />
        </div>
        <h3
          className="my-5 text-left text-base font-bold text-white"
          dangerouslySetInnerHTML={{ __html: data.guidelinesListIntro }}
        />
        <ul className="mb-5 list-inside list-disc text-base text-white">
          {data.guidelinesList.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
      {data.abstractsStructure.map((item, index) => (
        <div
          key={`${index}-structure`}
          className="bg-titles-color my-2 rounded-lg p-5 text-base"
        >
          <p className="text-main-color my-2 font-bold">{item.title}</p>
          <p className="text-main-color my-2">{item.subtitle}</p>
        </div>
      ))}
      <div className="rounded-xl border border-white/10 bg-black/5 p-6 backdrop-blur-sm md:p-8">
        <div className="mt-5 flex items-center justify-start gap-2">
          <FaInfoCircle className="text-titles-color text-2xl" />
          <h3
            className="text-titles-color my-2 text-left text-xl font-extrabold"
            dangerouslySetInnerHTML={{ __html: data.abstractSubjects.title }}
          />
        </div>
        <h3
          className="my-5 text-left text-base font-bold text-white"
          dangerouslySetInnerHTML={{ __html: data.abstractSubjects.subtitle }}
        />
        <ul className="mb-5 list-inside list-disc text-base text-white">
          {data.abstractSubjects.subjects.map((item, index) => (
            <li
              key={`${index}-subject`}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      </div>
      {data.abstractSubjects.outro.map((item, index) => (
        <div className="mt-5 flex flex-col items-center justify-start gap-2 rounded-xl border border-white/10 bg-black/10 p-5 backdrop-blur-sm md:p-8">
          <FaExclamationCircle className="text-titles-color text-4xl" />
          <p
            className="my-5 text-base leading-10 text-white italic"
            key={`${index}-outro`}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </div>
      ))}
      <div className="mt-5 flex items-center justify-start gap-2 rounded-xl border border-white/10 bg-black/10 p-6 backdrop-blur-sm md:p-8">
        <FaInfoCircle className="text-titles-color text-2xl" />
        <h3
          className="my-2 text-left text-xl font-extrabold text-white"
          dangerouslySetInnerHTML={{ __html: data.abstractsSubmission.title }}
        />
      </div>
      <ul className="mb-5 list-outside list-disc pl-5 text-base text-white">
        {data.abstractsSubmission.list.map((item, index) => (
          <li
            key={`${index}-submission`}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </ul>
      <a href={data.button.url}>
        <motion.button
          initial={{ scale: 1, rotate: "0deg" }}
          whileHover={{ scale: 1.1, rotate: "5deg" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`glow-on-hover ml-2 max-w-[400px] rounded-full bg-white p-5 text-base font-bold text-black transition-colors duration-300 ease-linear`}
        >
          {data.button.text}
        </motion.button>
      </a>
    </div>
  );
}

export default AbstractsContent;
