import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SpinnerProps {
  size?: number;
  borderWidth?: number;
  borderColor?: string;
}

const ReusableSpinner: React.FC<SpinnerProps> = ({
  size = 30,
  borderWidth = 4,
  borderColor = "custom-blue-green",
}) => {
  const [spinnerColor, setSpinnerColor] = useState(borderColor);

  useEffect(() => {
    // Update border color dynamically
    const interval = setInterval(() => {
      setSpinnerColor((prevColor) =>
        prevColor === borderColor ? "custom-teal" : borderColor
      );
    }, 200); // Change color every 0.2 seconds
    return () => clearInterval(interval);
  }, [borderColor]);

  return (
    <div className="relative flex justify-center items-center">
      <div
        className={`absolute animate-spin rounded-full h-${size} w-${size} border-t-${borderWidth} border-b-${borderWidth} border-${spinnerColor}`}
      ></div>
      <img src="/static/images/aim.jpg" className="rounded-full h-24 w-24" />
    </div>
  );
};

export default ReusableSpinner;
