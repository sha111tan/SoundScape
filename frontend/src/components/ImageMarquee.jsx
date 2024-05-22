import React from "react";
import "../index.css"; // Подключаем стили

const ImageMarquee = ({ images }) => {
  return (
    <div className="overflow-hidden bg-transparent py-3 whitespace-nowrap">
      <div className="image-marquee">
        <div className="image-marquee-content">
          {images.map((image, index) => (
            <div key={index} className="mr-10 inline-block">
              <img
                src={image.src}
                alt={image.alt}
                className="h-16 md:h-20 opacity-75  transition-opacity duration-300"
              />
            </div>
          ))}
          {images.map((image, index) => (
            <div key={`duplicate-${index}`} className="mr-10 inline-block">
              <img
                src={image.src}
                alt={image.alt}
                className="h-16 md:h-20 opacity-75  transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageMarquee;
