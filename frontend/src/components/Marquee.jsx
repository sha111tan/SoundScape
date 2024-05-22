import React from "react";
import "../index.css";

const Marquee = ({ phrases }) => {
  return (
    <div className="overflow-hidden text-white bg-black mb-5 py-3 whitespace-nowrap">
      <div className="marquee">
        {phrases.map((phrase, index) => (
          <span key={index} className="mr-16">
            {phrase}
          </span>
        ))}
        {phrases.map((phrase, index) => (
          <span key={`duplicate-${index}`} className="mr-10">
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
