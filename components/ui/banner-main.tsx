import React from "react";
import Image from "next/image";

// interface BannerProps {
//   imageUrl: string;
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   buttonLink: string;
// }

const ReusableBanner = ({}) => {
  return (
    <div className="w-full h-96 bg-banner-bg bg-center">
      <div className="relative banner w-full h-96">
        <div style={{ width: "100%", height: "100%" }}>
          <Image
            src={"/static/images/bwBanner.jpg"}
            alt="banner"
            layout="fill"
            objectFit="cover"
            className="full"
          />
        </div>
      </div>
    </div>
  );
};

export default ReusableBanner;
