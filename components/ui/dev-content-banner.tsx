import React, { useState } from "react";

const DevReusableBanner = () => {
  return (
    <div className="relative w-full h-96 bg-teal-950 overflow-hidden">
      <img
        src={"/static/images/dev-banner.jpg"}
        alt="Banner"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 text-center text-white p-4 ">
        <p>
          Discover what&apos;s new! Dive into the latest creations from our
          developers. Visit now for an exciting experience!
        </p>
      </div>
    </div>
  );
};

export default DevReusableBanner;
