import Link from "next/link";

export const ReusableNewReleases = ({
  NewReleasescardLink = "",
  imageSrc = "",
  text = "",
}) => {
  return (
    <Link
      href={NewReleasescardLink}
      className="relative border-2 border-black-800 h-[250px] w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] overflow-hidden m-2 hover:scale-110 hover:cursor-pointer"
    >
      <img
        src={imageSrc || "/static/images/developer.png"}
        className="absolute inset-0 h-full w-full object-cover"
        alt="img"
      />
      <div
        className="absolute bottom-0 left-0 right-0 bg-slate-900 h-[50px] text-white opacity-80 flex justify-center items-center md:h-[40px] lg:h-[50px] xl:h-[60px]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
          alignItems: "flex-end",
        }}
      >
        {text || "Game Name"}
      </div>
    </Link>
  );
};
