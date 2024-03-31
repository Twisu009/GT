import Image from "next/image";

export const ReusableNewReleases = ({
  NewReleasescardLink = "",
  imageSrc = "",
  text = "",
}) => {
  return (
    <div className="relative border-2 border-black-800 h-[300px] w-[300px] overflow-hidden m-2">
      <Image
        src={imageSrc || "/static/images/developer.png"}
        className="absolute inset-0"
        alt={""}
      />
      <a
        href={NewReleasescardLink}
        className="absolute bottom-0 left-0 right-0 bg-slate-900 h-[50px] text-white opacity-80 flex justify-center items-center"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
          alignItems: "flex-end",
        }}
      >
        {text || "Game Name"}
      </a>
    </div>
  );
};
