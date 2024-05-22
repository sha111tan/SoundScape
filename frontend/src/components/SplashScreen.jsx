import React, { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 500); // 500 milliseconds for the splash screen

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-transform duration-500 ${
        !visible && "transform -translate-y-full"
      }`}
    >
      <h1 className="text-white text-4xl">SoundScape</h1>
    </div>
  );
};

export default SplashScreen;
