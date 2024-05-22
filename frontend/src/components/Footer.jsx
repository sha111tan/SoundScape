import React from "react";
import FadeIn from "../components/FadeIn";
import { motion } from "framer-motion";

export const Footer = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="my-10 px-10 md:px-40 ">
      <p className="text-center">Footer</p>
    </div>
  );
};
