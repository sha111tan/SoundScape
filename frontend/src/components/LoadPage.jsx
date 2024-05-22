import React, { useState, useEffect } from "react";
import "../index.css"; // Здесь хранятся стили Tailwind CSS

const LoadPage = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="text-white text-6xl opacity-0 transition-opacity duration-1000 ease-in-out">
        {showText && "SOUNDSCAPE"}
      </div>
    </div>
  );
};

export default LoadPage;
