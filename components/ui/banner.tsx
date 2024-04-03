import React, { useState } from "react";

const ReusableBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerData = [
    {
      imageSrc: "/static/images/banner1.jpg",
      description:
        "Discover, Play, Repeat - Your Game Oasis - Welcome to G-Trove",
    },
    {
      imageSrc: "/static/images/banner2.jpg",
      description: "Next Slide Description",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === bannerData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? bannerData.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="relative w-full h-96 bg-teal-950 overflow-hidden">
      <img
        src={bannerData[currentSlide].imageSrc}
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 flex items-center h-full">
        <button onClick={prevSlide} className="text-white absolute left-4">
          Prev
        </button>
      </div>
      <div className="absolute top-0 right-0 flex items-center h-full">
        <button onClick={nextSlide} className="text-white absolute right-4">
          Next
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-center text-white p-4 bg-black bg-opacity-50">
        {bannerData[currentSlide].description}
      </div>
    </div>
  );
};

export default ReusableBanner;
