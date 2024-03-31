import Image from "next/image";

export const ReusableDeveloperContent = ({ imageSrc = "", text = "" }) => {
  return (
    <div style={{ display: "full" }}>
      <div className="relative  h-[500px] w-[200px] m-2">
        <Image
          src={imageSrc || "/static/images/developer.png"}
          className="absolute inset-0 "
          alt={""}
        ></Image>
        <a
          className="absolute bottom-0 left-0 right-0  h-[500px] text-white opacity-80 text-center"
          style={{
            display: "responsive",
            justifyContent: "left",
          }}
        >
          {text || "Game Name"}
        </a>
      </div>
    </div>
  );
};
